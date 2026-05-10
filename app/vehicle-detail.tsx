import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { MOCK_VEHICLES } from '@/services/mockData';
import { fetchRecallsByVin } from '@/services/api';
import { NHTSARecall, Vehicle } from '@/types';

export default function VehicleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const vehicle: Vehicle | undefined = MOCK_VEHICLES.find(v => v.id === id);
  const [recalls, setRecalls] = useState<NHTSARecall[]>([]);
  const [loadingRecalls, setLoadingRecalls] = useState(false);

  useEffect(() => {
    if (vehicle) {
      setLoadingRecalls(true);
      fetchRecallsByVin(vehicle.vin).then(r => { setRecalls(r); setLoadingRecalls(false); });
    }
  }, [vehicle?.vin]);

  if (!vehicle) {
    return (
      <View style={styles.notFound}>
        <Ionicons name="car-outline" size={48} color={Colors.gray300} />
        <Text style={styles.notFoundText}>Veículo não encontrado</Text>
      </View>
    );
  }

  const riskColor = vehicle.riskScore >= 70 ? Colors.danger : vehicle.riskScore >= 40 ? Colors.warning : Colors.success;

  const call = () => Linking.openURL(`tel:${vehicle.ownerPhone.replace(/\D/g,'')}`);
  const whatsapp = () => {
    const phone = vehicle.ownerPhone.replace(/\D/g,'');
    const msg = encodeURIComponent(`Olá ${vehicle.owner.split(' ')[0]}, aqui é da Concessionária Ford. Como posso te ajudar?`);
    Linking.openURL(`https://wa.me/55${phone}?text=${msg}`);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom:40 }}>
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.heroModel}>{vehicle.model}</Text>
          <Text style={styles.heroSub}>{vehicle.year} · {vehicle.plate} · {vehicle.mileage.toLocaleString('pt-BR')} km</Text>
          <Text style={styles.heroVin}>VIN: {vehicle.vin}</Text>
        </View>
        <View style={[styles.riskCircle, { borderColor: riskColor }]}>
          <Text style={[styles.riskNum, { color: riskColor }]}>{vehicle.riskScore}</Text>
          <Text style={styles.riskLbl}>risco</Text>
        </View>
      </View>

      <View style={styles.statusRow}>
        <View style={[styles.statusBadge, { backgroundColor: vehicle.inFordNetwork ? Colors.success+'20' : Colors.danger+'20' }]}>
          <Ionicons name={vehicle.inFordNetwork ? 'checkmark-circle' : 'close-circle'} size={14}
            color={vehicle.inFordNetwork ? Colors.success : Colors.danger} />
          <Text style={[styles.statusText, { color: vehicle.inFordNetwork ? Colors.success : Colors.danger }]}>
            {vehicle.inFordNetwork ? 'Na Rede Ford' : 'Fora da Rede Ford'}
          </Text>
        </View>
        <View style={[styles.statusBadge, {
          backgroundColor:
            vehicle.warrantyStatus === 'active' ? Colors.success+'20' :
            vehicle.warrantyStatus === 'expiring_soon' ? Colors.warning+'20' : Colors.danger+'20'
        }]}>
          <Text style={[styles.statusText, {
            color:
              vehicle.warrantyStatus === 'active' ? Colors.success :
              vehicle.warrantyStatus === 'expiring_soon' ? Colors.warning : Colors.danger
          }]}>
            {vehicle.warrantyStatus === 'active' ? 'Garantia Ativa' :
             vehicle.warrantyStatus === 'expiring_soon' ? 'Garantia Expirando' : 'Garantia Expirada'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Proprietário</Text>
        <View style={styles.ownerCard}>
          <View style={styles.ownerIcon}>
            <Ionicons name="person" size={22} color={Colors.fordBlue} />
          </View>
          <View style={{ flex:1 }}>
            <Text style={styles.ownerName}>{vehicle.owner}</Text>
            <Text style={styles.ownerPhone}>{vehicle.ownerPhone}</Text>
          </View>
          <View style={styles.ownerActions}>
            <TouchableOpacity style={styles.iconBtn} onPress={call}>
              <Ionicons name="call" size={18} color={Colors.fordBlue} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconBtn, { backgroundColor:'#25D366'+'20' }]} onPress={whatsapp}>
              <Ionicons name="logo-whatsapp" size={18} color="#25D366" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Serviços</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Último serviço</Text>
            <Text style={styles.infoValue}>{new Date(vehicle.lastService).toLocaleDateString('pt-BR')}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Próximo serviço</Text>
            <Text style={[styles.infoValue, { color: new Date(vehicle.nextServiceDue) < new Date() ? Colors.danger : Colors.success }]}>
              {new Date(vehicle.nextServiceDue).toLocaleDateString('pt-BR')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Histórico de Serviços</Text>
        {vehicle.serviceHistory.map(s => (
          <View key={s.id} style={styles.historyItem}>
            <View style={styles.historyLeft}>
              <View style={[styles.historyDot, { backgroundColor: s.atFordDealer ? Colors.success : Colors.danger }]} />
              <View style={{ flex:1 }}>
                <Text style={styles.historyType}>{s.type}</Text>
                <Text style={styles.historyDesc}>{s.description}</Text>
                <Text style={styles.historyDate}>{new Date(s.date).toLocaleDateString('pt-BR')} · {s.atFordDealer ? 'Rede Ford' : 'Terceiros'}</Text>
              </View>
            </View>
            <Text style={styles.historyCost}>R$ {s.cost.toLocaleString('pt-BR')}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recalls NHTSA (API Oficial)</Text>
        {loadingRecalls ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator color={Colors.fordBlue} />
            <Text style={styles.loadingText}>Consultando API NHTSA...</Text>
          </View>
        ) : recalls.length > 0 ? (
          recalls.slice(0, 3).map((r, i) => (
            <View key={i} style={styles.recallItem}>
              <Ionicons name="warning-outline" size={16} color={Colors.warning} />
              <View style={{ flex:1 }}>
                <Text style={styles.recallComponent}>{r.Component}</Text>
                <Text style={styles.recallSummary} numberOfLines={2}>{r.Summary}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noRecalls}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.noRecallsText}>Nenhum recall encontrado para este VIN</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex:1, backgroundColor:Colors.gray100 },
  notFound: { flex:1, alignItems:'center', justifyContent:'center', gap:12 },
  notFoundText: { fontSize:16, color:Colors.gray500 },
  hero: { backgroundColor:Colors.fordBlue, padding:20, flexDirection:'row', alignItems:'center', justifyContent:'space-between' },
  heroContent: { flex:1 },
  heroModel: { fontSize:22, fontWeight:'800', color:Colors.white },
  heroSub: { fontSize:13, color:Colors.white+'BB', marginTop:4 },
  heroVin: { fontSize:11, color:Colors.fordSkyBlue, marginTop:6, fontFamily:'monospace' },
  riskCircle: { width:58, height:58, borderRadius:29, borderWidth:3, alignItems:'center', justifyContent:'center' },
  riskNum: { fontSize:20, fontWeight:'900' },
  riskLbl: { fontSize:8, color:Colors.white+'88', fontWeight:'600' },
  statusRow: { flexDirection:'row', gap:8, padding:14 },
  statusBadge: { flexDirection:'row', alignItems:'center', gap:5, paddingHorizontal:10, paddingVertical:5, borderRadius:20 },
  statusText: { fontSize:12, fontWeight:'600' },
  section: { paddingHorizontal:16, marginBottom:16 },
  sectionTitle: { fontSize:11, fontWeight:'800', color:Colors.gray500, textTransform:'uppercase', letterSpacing:0.5, marginBottom:8 },
  card: { backgroundColor:Colors.white, borderRadius:12, padding:14,
    shadowColor:'#000', shadowOffset:{width:0,height:1}, shadowOpacity:0.05, shadowRadius:4, elevation:2 },
  infoRow: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:4 },
  infoLabel: { fontSize:13, color:Colors.gray500 },
  infoValue: { fontSize:13, fontWeight:'700', color:Colors.black },
  divider: { height:1, backgroundColor:Colors.gray200, marginVertical:6 },
  ownerCard: { backgroundColor:Colors.white, borderRadius:12, padding:14, flexDirection:'row',
    alignItems:'center', gap:12, shadowColor:'#000', shadowOffset:{width:0,height:1},
    shadowOpacity:0.05, shadowRadius:4, elevation:2 },
  ownerIcon: { width:44, height:44, borderRadius:22, backgroundColor:Colors.fordBlue+'20', alignItems:'center', justifyContent:'center' },
  ownerName: { fontSize:15, fontWeight:'700', color:Colors.black },
  ownerPhone: { fontSize:12, color:Colors.gray500, marginTop:2 },
  ownerActions: { flexDirection:'row', gap:8 },
  iconBtn: { width:36, height:36, borderRadius:18, backgroundColor:Colors.fordBlue+'20', alignItems:'center', justifyContent:'center' },
  historyItem: { backgroundColor:Colors.white, borderRadius:12, padding:12, marginBottom:8,
    flexDirection:'row', alignItems:'flex-start', justifyContent:'space-between',
    shadowColor:'#000', shadowOffset:{width:0,height:1}, shadowOpacity:0.04, shadowRadius:3, elevation:1 },
  historyLeft: { flexDirection:'row', gap:10, flex:1 },
  historyDot: { width:10, height:10, borderRadius:5, marginTop:4 },
  historyType: { fontSize:13, fontWeight:'700', color:Colors.black },
  historyDesc: { fontSize:11, color:Colors.gray500, marginTop:2 },
  historyDate: { fontSize:10, color:Colors.gray300, marginTop:3 },
  historyCost: { fontSize:13, fontWeight:'700', color:Colors.fordBlue },
  loadingBox: { backgroundColor:Colors.white, borderRadius:12, padding:20,
    alignItems:'center', gap:10, flexDirection:'row', justifyContent:'center' },
  loadingText: { fontSize:13, color:Colors.gray500 },
  recallItem: { backgroundColor:Colors.warning+'15', borderRadius:10, padding:12,
    flexDirection:'row', gap:10, marginBottom:8, alignItems:'flex-start' },
  recallComponent: { fontSize:12, fontWeight:'700', color:Colors.gray700, marginBottom:3 },
  recallSummary: { fontSize:11, color:Colors.gray500, lineHeight:16 },
  noRecalls: { backgroundColor:Colors.success+'15', borderRadius:10, padding:14,
    flexDirection:'row', gap:10, alignItems:'center' },
  noRecallsText: { fontSize:13, color:Colors.success, fontWeight:'600' },
});
