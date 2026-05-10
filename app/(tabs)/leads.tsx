import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { LeadCard } from '../../components/LeadCard';
import { MOCK_LEADS } from '@/services/mockData';
import { Lead } from '@/types';

type PFilter = 'all' | 'high' | 'medium' | 'low';

export default function LeadsScreen() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [filter, setFilter] = useState<PFilter>('all');
  const [showContacted, setShowContacted] = useState(false);

  const toggle = (id: string) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, contacted: !l.contacted } : l));
  };

  const shown = leads.filter(l => {
    if (!showContacted && l.contacted) return false;
    if (filter !== 'all' && l.priority !== filter) return false;
    return true;
  });

  const totalRevenue = leads.filter(l => !l.contacted).reduce((s, l) => s + l.estimatedRevenue, 0);

  const filterBtns: { key: PFilter; label: string; color: string }[] = [
    { key:'all',    label:'Todos',  color:Colors.fordBlue },
    { key:'high',   label:'Alta',   color:Colors.danger },
    { key:'medium', label:'Média',  color:Colors.warning },
    { key:'low',    label:'Baixa',  color:Colors.success },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.banner}>
        <View>
          <Text style={styles.bannerLabel}>RECEITA POTENCIAL</Text>
          <Text style={styles.bannerValue}>R$ {totalRevenue.toLocaleString('pt-BR')}</Text>
        </View>
        <View style={styles.bannerStats}>
          <Text style={styles.bannerStat}>{leads.filter(l=>!l.contacted).length} pendentes</Text>
          <Text style={styles.bannerStat}>{leads.filter(l=>l.contacted).length} contactados</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap:8 }}>
          {filterBtns.map(f => (
            <TouchableOpacity key={f.key}
              style={[styles.filterBtn, filter === f.key && { backgroundColor:f.color, borderColor:f.color }]}
              onPress={() => setFilter(f.key)}>
              <Text style={[styles.filterText, filter === f.key && { color:Colors.white }]}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={[styles.showContactedBtn, showContacted && { backgroundColor:Colors.fordBlue+'20' }]}
          onPress={() => setShowContacted(s => !s)}>
          <Ionicons name={showContacted ? 'eye' : 'eye-off-outline'} size={16}
            color={showContacted ? Colors.fordBlue : Colors.gray500} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={{ padding:16, paddingTop:8, paddingBottom:32 }}>
        {shown.map(l => <LeadCard key={l.id} lead={l} onToggle={toggle} />)}
        {shown.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="flash-outline" size={48} color={Colors.gray300} />
            <Text style={styles.emptyText}>Nenhum lead nesta categoria</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex:1, backgroundColor:Colors.gray100 },
  banner: { flexDirection:'row', justifyContent:'space-between', alignItems:'center',
    backgroundColor:Colors.fordBlue, margin:16, borderRadius:14, padding:16 },
  bannerLabel: { fontSize:9, color:Colors.fordSkyBlue, fontWeight:'700', letterSpacing:1, marginBottom:4 },
  bannerValue: { fontSize:26, fontWeight:'900', color:Colors.white },
  bannerStats: { gap:4, alignItems:'flex-end' },
  bannerStat: { fontSize:11, color:Colors.white+'99', fontWeight:'600' },
  filterRow: { flexDirection:'row', alignItems:'center', paddingHorizontal:16, paddingBottom:8, gap:8 },
  filterBtn: { paddingHorizontal:14, paddingVertical:6, borderRadius:20,
    backgroundColor:Colors.white, borderWidth:1.5, borderColor:Colors.gray200 },
  filterText: { fontSize:12, fontWeight:'600', color:Colors.gray500 },
  showContactedBtn: { padding:8, borderRadius:20, backgroundColor:Colors.white },
  list: { flex:1 },
  empty: { alignItems:'center', paddingTop:60, gap:12 },
  emptyText: { fontSize:15, color:Colors.gray500 },
});
