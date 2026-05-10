import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { MetricCard } from '../../components/MetricCard';
import { MiniBarChart } from '../../components/MiniBarChart';
import { MOCK_METRICS, MOCK_LEADS, MONTHS_SHORT } from '@/services/mockData';

export default function DashboardScreen() {
  const [metrics, setMetrics] = useState(MOCK_METRICS);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setMetrics(m => ({ ...m, vinShare: +(m.vinShare + (Math.random()*0.4-0.2)).toFixed(1) }));
      setRefreshing(false);
    }, 1200);
  };

  const vc = metrics.vinShare >= 70 ? Colors.success : metrics.vinShare >= 55 ? Colors.warning : Colors.danger;
  const highLeads = MOCK_LEADS.filter(l => l.priority === 'high' && !l.contacted).length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.fordSkyBlue} />}>

      <View style={styles.dealerBanner}>
        <View>
          <Text style={styles.dealerLabel}>CONCESSIONÁRIA</Text>
          <Text style={styles.dealerName}>Ford Autosul SP</Text>
        </View>
        <View style={styles.dateBadge}>
          <Ionicons name="calendar-outline" size={12} color={Colors.fordSkyBlue} />
          <Text style={styles.dateText}>{new Date().toLocaleDateString('pt-BR', { month:'short', day:'numeric' })}</Text>
        </View>
      </View>

      <View style={styles.vinCard}>
        <View style={styles.vinLeft}>
          <Text style={styles.vinLabel}>VIN SHARE</Text>
          <Text style={[styles.vinValue, { color:vc }]}>{metrics.vinShare}%</Text>
          <View style={styles.vinTrend}>
            <Ionicons name="trending-up" size={14} color={vc} />
            <Text style={[styles.vinTrendText, { color:vc }]}>
              +{(metrics.vinShare - MOCK_METRICS.vinShareTrend[0]).toFixed(1)}pp (6 meses)
            </Text>
          </View>
          <View style={styles.vinBarBg}>
            <View style={[styles.vinBarFill, { width:`${metrics.vinShare}%` as any, backgroundColor:vc }]} />
          </View>
          <Text style={styles.vinMeta}>Meta Ford: 70%</Text>
        </View>
        <View style={{ flex:1 }}>
          <MiniBarChart data={metrics.vinShareTrend} labels={MONTHS_SHORT} color={vc} height={85} showValues />
        </View>
      </View>

      {highLeads > 0 && (
        <TouchableOpacity style={styles.alertStrip} onPress={() => router.push('/(tabs)/leads')}>
          <Ionicons name="flame" size={16} color={Colors.white} />
          <Text style={styles.alertText}>{highLeads} lead{highLeads>1?'s':''} de alta prioridade aguardando contato</Text>
          <Ionicons name="chevron-forward" size={16} color={Colors.white} />
        </TouchableOpacity>
      )}

      <Text style={styles.sectionTitle}>Resumo do Mês</Text>
      <View style={styles.grid}>
        <MetricCard title="Frota Ativa" value={metrics.activeVehicles.toLocaleString('pt-BR')}
          subtitle={`de ${metrics.totalVehicles.toLocaleString('pt-BR')} veículos`}
          color={Colors.fordBlue} icon={<Ionicons name="car" size={16} color={Colors.fordBlue} />} />
        <MetricCard title="Em Risco" value={metrics.atRiskVehicles.toString()}
          subtitle="podem sair da rede"
          color={Colors.danger} icon={<Ionicons name="alert-circle" size={16} color={Colors.danger} />} />
      </View>
      <View style={styles.grid}>
        <MetricCard title="Leads Abertos" value={metrics.openLeads.toString()}
          subtitle="aguardando ação"
          color={Colors.warning} icon={<Ionicons name="flash" size={16} color={Colors.warning} />} />
        <MetricCard title="Conversão" value={`${metrics.conversionRate}%`}
          subtitle="média dos últimos 30d"
          color={Colors.success} icon={<Ionicons name="trending-up" size={16} color={Colors.success} />} />
      </View>

      <Text style={styles.sectionTitle}>Receita de Serviços (R$)</Text>
      <View style={styles.chartCard}>
        <MiniBarChart
          data={metrics.monthlyRevenueTrend}
          labels={MONTHS_SHORT}
          color={Colors.fordBlue}
          height={110}
        />
        <Text style={styles.chartFooter}>
          Último mês: R$ {metrics.monthlyRevenue.toLocaleString('pt-BR')}
        </Text>
      </View>


      <Text style={styles.sectionTitle}>Ações Rápidas</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/(tabs)/vehicles')}>
          <View style={[styles.actionIcon, { backgroundColor:Colors.fordBlue+'20' }]}>
            <Ionicons name="car-sport" size={22} color={Colors.fordBlue} />
          </View>
          <Text style={styles.actionLabel}>Ver Frota</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/(tabs)/leads')}>
          <View style={[styles.actionIcon, { backgroundColor:Colors.danger+'20' }]}>
            <Ionicons name="flash" size={22} color={Colors.danger} />
          </View>
          <Text style={styles.actionLabel}>Ver Leads</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/(tabs)/notifications')}>
          <View style={[styles.actionIcon, { backgroundColor:Colors.warning+'20' }]}>
            <Ionicons name="notifications" size={22} color={Colors.warning} />
          </View>
          <Text style={styles.actionLabel}>Alertas</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex:1, backgroundColor:Colors.gray100 },
  content: { padding:16, paddingBottom:32 },
  dealerBanner: { flexDirection:'row', justifyContent:'space-between', alignItems:'center',
    backgroundColor:Colors.fordBlue, borderRadius:14, padding:14, marginBottom:14 },
  dealerLabel: { fontSize:9, color:Colors.fordSkyBlue, fontWeight:'700', letterSpacing:1 },
  dealerName: { fontSize:17, color:Colors.white, fontWeight:'800' },
  dateBadge: { flexDirection:'row', alignItems:'center', gap:5, backgroundColor:Colors.white+'20',
    paddingHorizontal:10, paddingVertical:5, borderRadius:20 },
  dateText: { fontSize:12, color:Colors.white, fontWeight:'600' },
  vinCard: { backgroundColor:Colors.white, borderRadius:14, padding:16, flexDirection:'row',
    gap:12, marginBottom:12, shadowColor:'#000', shadowOffset:{width:0,height:2},
    shadowOpacity:0.07, shadowRadius:10, elevation:3 },
  vinLeft: { flex:1 },
  vinLabel: { fontSize:10, fontWeight:'700', color:Colors.gray500, letterSpacing:1, marginBottom:4 },
  vinValue: { fontSize:38, fontWeight:'900', lineHeight:44 },
  vinTrend: { flexDirection:'row', alignItems:'center', gap:4, marginBottom:10 },
  vinTrendText: { fontSize:11, fontWeight:'600' },
  vinBarBg: { height:6, backgroundColor:Colors.gray200, borderRadius:3, overflow:'hidden', marginBottom:6 },
  vinBarFill: { height:'100%', borderRadius:3 },
  vinMeta: { fontSize:10, color:Colors.gray500 },
  alertStrip: { flexDirection:'row', alignItems:'center', gap:8, backgroundColor:Colors.danger,
    borderRadius:12, padding:12, marginBottom:12 },
  alertText: { flex:1, fontSize:12, color:Colors.white, fontWeight:'600' },
  sectionTitle: { fontSize:13, fontWeight:'800', color:Colors.gray700, marginBottom:10, marginTop:4,
    textTransform:'uppercase', letterSpacing:0.5 },
  grid: { flexDirection:'row', gap:10, marginBottom:10 },
  chartCard: { backgroundColor:Colors.white, borderRadius:14, padding:16, marginBottom:14,
    shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.06, shadowRadius:8, elevation:3 },
  chartFooter: { fontSize:12, color:Colors.gray500, marginTop:8, textAlign:'right' },
  actionsRow: { flexDirection:'row', justifyContent:'space-around', backgroundColor:Colors.white,
    borderRadius:14, padding:16, shadowColor:'#000', shadowOffset:{width:0,height:2},
    shadowOpacity:0.06, shadowRadius:8, elevation:3 },
  actionBtn: { alignItems:'center', gap:8 },
  actionIcon: { width:50, height:50, borderRadius:25, alignItems:'center', justifyContent:'center' },
  actionLabel: { fontSize:11, fontWeight:'600', color:Colors.gray700 },
});
