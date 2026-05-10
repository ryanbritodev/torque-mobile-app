import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Vehicle } from '@/types';

const WARRANTY: Record<string,{text:string;color:string}> = {
  active:        { text:'Garantia Ativa',     color:Colors.success },
  expired:       { text:'Garantia Expirada',  color:Colors.danger },
  expiring_soon: { text:'Garantia Expirando', color:Colors.warning },
};

export function VehicleCard({ vehicle, onPress }: { vehicle: Vehicle; onPress: () => void }) {
  const w = WARRANTY[vehicle.warrantyStatus];
  const rc = vehicle.riskScore >= 70 ? Colors.danger : vehicle.riskScore >= 40 ? Colors.warning : Colors.success;
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.top}>
        <View style={{flex:1}}>
          <Text style={styles.model}>{vehicle.model}</Text>
          <Text style={styles.sub}>{vehicle.year} · {vehicle.plate}</Text>
        </View>
        <View style={[styles.badge, {backgroundColor: vehicle.inFordNetwork ? Colors.success+'22' : Colors.danger+'22'}]}>
          <Ionicons name={vehicle.inFordNetwork ? 'checkmark-circle' : 'close-circle'} size={13}
            color={vehicle.inFordNetwork ? Colors.success : Colors.danger} />
          <Text style={[styles.badgeText, {color: vehicle.inFordNetwork ? Colors.success : Colors.danger}]}>
            {vehicle.inFordNetwork ? 'Na Rede' : 'Fora da Rede'}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Ionicons name="person-outline" size={13} color={Colors.gray500} />
          <Text style={styles.infoText}>{vehicle.owner}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="speedometer-outline" size={13} color={Colors.gray500} />
          <Text style={styles.infoText}>{vehicle.mileage.toLocaleString('pt-BR')} km</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={[styles.wBadge, {backgroundColor: w.color+'20'}]}>
          <Text style={[styles.wText, {color: w.color}]}>{w.text}</Text>
        </View>
        <View style={styles.riskRow}>
          <Text style={styles.riskLbl}>Risco</Text>
          <View style={styles.riskBg}>
            <View style={[styles.riskFill, {width:`${vehicle.riskScore}%` as any, backgroundColor:rc}]} />
          </View>
          <Text style={[styles.riskVal, {color:rc}]}>{vehicle.riskScore}%</Text>
        </View>
      </View>

      {vehicle.recalls.some(r => r.status === 'open') && (
        <View style={styles.recallBanner}>
          <Ionicons name="warning-outline" size={13} color={Colors.warning} />
          <Text style={styles.recallText}>Recall em aberto</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor:Colors.white, borderRadius:14, padding:15, marginBottom:12,
    shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.07, shadowRadius:10, elevation:3 },
  top: { flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 },
  model: { fontSize:16, fontWeight:'700', color:Colors.black },
  sub: { fontSize:12, color:Colors.gray500, marginTop:2 },
  badge: { flexDirection:'row', alignItems:'center', gap:4, paddingHorizontal:8, paddingVertical:3, borderRadius:20 },
  badgeText: { fontSize:11, fontWeight:'600' },
  divider: { height:1, backgroundColor:Colors.gray200, marginBottom:12 },
  infoRow: { flexDirection:'row', gap:16, marginBottom:12 },
  infoItem: { flexDirection:'row', alignItems:'center', gap:4 },
  infoText: { fontSize:12, color:Colors.gray700 },
  footer: { flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  wBadge: { paddingHorizontal:9, paddingVertical:3, borderRadius:20 },
  wText: { fontSize:11, fontWeight:'600' },
  riskRow: { flexDirection:'row', alignItems:'center', gap:5 },
  riskLbl: { fontSize:10, color:Colors.gray500 },
  riskBg: { width:55, height:5, backgroundColor:Colors.gray200, borderRadius:3, overflow:'hidden' },
  riskFill: { height:'100%', borderRadius:3 },
  riskVal: { fontSize:11, fontWeight:'700', minWidth:26 },
  recallBanner: { flexDirection:'row', alignItems:'center', gap:5, marginTop:10,
    backgroundColor:Colors.warning+'18', padding:7, borderRadius:8 },
  recallText: { fontSize:11, color:Colors.warning, fontWeight:'600' },
});
