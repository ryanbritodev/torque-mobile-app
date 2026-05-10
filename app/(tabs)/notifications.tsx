import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface Notification {
  id: string; title: string; body: string; time: string;
  type: 'recall' | 'service' | 'risk' | 'lead';
  read: boolean;
}

const INITIAL: Notification[] = [
  { id:'n1', title:'Recall em Aberto — Maverick 2020', body:'Fernanda Oliveira (CWB-9P01) possui recall de freios sem correção. Ação urgente necessária.', time:'Agora', type:'recall', read:false },
  { id:'n2', title:'Garantia Expirando em 28 dias', body:'Ford Territory 2021 de Ana Beatriz Santos (RJO-5K33). Envie oferta de revisão preventiva.', time:'2h atrás', type:'risk', read:false },
  { id:'n3', title:'Revisão Vencida — Maverick 2020', body:'Último serviço há 7 meses. Cliente pode estar usando outra rede. Contato imediato recomendado.', time:'5h atrás', type:'service', read:false },
  { id:'n4', title:'Novo Lead Gerado — Ford Edge 2022', body:'Marcos Pereira está próximo dos 30.000 km. Lead de média prioridade criado automaticamente.', time:'Ontem', type:'lead', read:true },
  { id:'n5', title:'Meta VIN Share Próxima', body:'VIN Share atual: 64.3%. Meta Ford é 70%. Faltam 5.7pp. Foque nos veículos fora da rede.', time:'2 dias', type:'risk', read:true },
  { id:'n6', title:'Ranger 2022 — Revisão em 60 dias', body:'Carlos Silva (BRA-2E19) se aproxima dos 50.000 km. Ideal para contato proativo.', time:'3 dias', type:'service', read:true },
];

const TYPE_CONFIG = {
  recall:  { icon:'warning'          as const, color:Colors.danger  },
  service: { icon:'construct'        as const, color:Colors.fordBlue },
  risk:    { icon:'shield-half'      as const, color:Colors.warning  },
  lead:    { icon:'flash'            as const, color:Colors.success  },
};

export default function NotificationsScreen() {
  const [items, setItems] = useState<Notification[]>(INITIAL);

  const markRead = (id: string) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, read:true } : n));
  };

  const markAll = () => setItems(prev => prev.map(n => ({ ...n, read:true })));

  const unread = items.filter(n => !n.read).length;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerCount}>
          {unread > 0 ? `${unread} não lidas` : 'Tudo em dia ✓'}
        </Text>
        {unread > 0 && (
          <TouchableOpacity onPress={markAll}>
            <Text style={styles.markAll}>Marcar todas como lidas</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={{ padding:16, paddingBottom:32 }}>
        {items.map(n => {
          const cfg = TYPE_CONFIG[n.type];
          return (
            <TouchableOpacity key={n.id} style={[styles.card, !n.read && styles.cardUnread]}
              onPress={() => markRead(n.id)} activeOpacity={0.85}>
              {!n.read && <View style={styles.unreadDot} />}
              <View style={[styles.iconBox, { backgroundColor: cfg.color+'20' }]}>
                <Ionicons name={cfg.icon} size={20} color={cfg.color} />
              </View>
              <View style={styles.body}>
                <Text style={[styles.title, !n.read && { color:Colors.black }]}>{n.title}</Text>
                <Text style={styles.bodyText}>{n.body}</Text>
                <Text style={styles.time}>{n.time}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex:1, backgroundColor:Colors.gray100 },
  header: { flexDirection:'row', justifyContent:'space-between', alignItems:'center',
    paddingHorizontal:16, paddingVertical:12, backgroundColor:Colors.white,
    borderBottomWidth:1, borderBottomColor:Colors.gray200 },
  headerCount: { fontSize:13, fontWeight:'700', color:Colors.gray700 },
  markAll: { fontSize:12, color:Colors.fordLightBlue, fontWeight:'600' },
  card: { flexDirection:'row', backgroundColor:Colors.white, borderRadius:14, padding:14,
    marginBottom:10, gap:12, alignItems:'flex-start',
    shadowColor:'#000', shadowOffset:{width:0,height:1}, shadowOpacity:0.05, shadowRadius:4, elevation:2 },
  cardUnread: { borderLeftWidth:3, borderLeftColor:Colors.fordBlue },
  unreadDot: { position:'absolute', top:14, right:14, width:8, height:8,
    borderRadius:4, backgroundColor:Colors.fordSkyBlue },
  iconBox: { width:42, height:42, borderRadius:21, alignItems:'center', justifyContent:'center' },
  body: { flex:1 },
  title: { fontSize:14, fontWeight:'600', color:Colors.gray700, marginBottom:3 },
  bodyText: { fontSize:12, color:Colors.gray500, lineHeight:18, marginBottom:4 },
  time: { fontSize:10, color:Colors.gray300, fontWeight:'600' },
});
