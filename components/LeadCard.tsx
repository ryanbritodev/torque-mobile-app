import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Lead } from '@/types';

const PC = {
  high:   { label:'Alta',   color:Colors.danger,  icon:'flame'           as const },
  medium: { label:'Média',  color:Colors.warning, icon:'time'            as const },
  low:    { label:'Baixa',  color:Colors.success, icon:'checkmark-circle' as const },
};

export function LeadCard({ lead, onToggle }: { lead:Lead; onToggle:(id:string)=>void }) {
  const p = PC[lead.priority];

  const call = () => {
    const url = `tel:${lead.ownerPhone.replace(/\D/g,'')}`;
    Linking.canOpenURL(url).then(ok => { if(ok) Linking.openURL(url); else Alert.alert('Erro','Não foi possível ligar'); });
  };

  const whatsapp = () => {
    const phone = lead.ownerPhone.replace(/\D/g,'');
    const msg = encodeURIComponent(`Olá ${lead.ownerName.split(' ')[0]}, aqui é da Concessionária Ford! Gostaríamos de agendar a revisão do seu ${lead.vehicleModel}. Posso te ajudar?`);
    Linking.openURL(`https://wa.me/55${phone}?text=${msg}`);
  };

  return (
    <View style={[styles.card, lead.contacted && { opacity:0.55 }]}>
      <View style={styles.head}>
        <View style={[styles.pBadge, { backgroundColor: p.color+'20' }]}>
          <Ionicons name={p.icon} size={11} color={p.color} />
          <Text style={[styles.pText, { color:p.color }]}>{p.label}</Text>
        </View>
        <Text style={styles.revenue}>R$ {lead.estimatedRevenue.toLocaleString('pt-BR')}</Text>
      </View>

      <Text style={styles.name}>{lead.ownerName}</Text>
      <Text style={styles.vehicleModel}>{lead.vehicleModel}</Text>

      <View style={styles.infoBox}>
        <Ionicons name="information-circle-outline" size={13} color={Colors.fordLightBlue} />
        <Text style={styles.infoText}>{lead.reason}</Text>
      </View>
      <View style={styles.tipBox}>
        <Ionicons name="bulb-outline" size={13} color={Colors.warning} />
        <Text style={styles.tipText}>{lead.suggestedAction}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.callBtn} onPress={call}>
            <Ionicons name="call-outline" size={15} color={Colors.white} />
            <Text style={styles.btnText}>Ligar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.waBtn} onPress={whatsapp}>
            <Ionicons name="logo-whatsapp" size={15} color={Colors.white} />
            <Text style={styles.btnText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => onToggle(lead.id)} style={{padding:4}}>
          <Ionicons name={lead.contacted ? 'checkmark-circle' : 'ellipse-outline'} size={22}
            color={lead.contacted ? Colors.success : Colors.gray300} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor:Colors.white, borderRadius:14, padding:15, marginBottom:12,
    shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.07, shadowRadius:10, elevation:3 },
  head: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:8 },
  pBadge: { flexDirection:'row', alignItems:'center', gap:4, paddingHorizontal:8, paddingVertical:3, borderRadius:20 },
  pText: { fontSize:11, fontWeight:'700' },
  revenue: { fontSize:15, fontWeight:'800', color:Colors.fordBlue },
  name: { fontSize:16, fontWeight:'700', color:Colors.black },
  vehicleModel: { fontSize:12, color:Colors.gray500, marginBottom:10 },
  infoBox: { flexDirection:'row', gap:6, backgroundColor:Colors.fordLightBlue+'15',
    padding:8, borderRadius:8, marginBottom:6 },
  infoText: { fontSize:12, color:Colors.fordBlue, flex:1, lineHeight:17 },
  tipBox: { flexDirection:'row', gap:6, backgroundColor:Colors.warning+'15',
    padding:8, borderRadius:8, marginBottom:12 },
  tipText: { fontSize:12, color:Colors.gray700, flex:1, lineHeight:17 },
  footer: { flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  actions: { flexDirection:'row', gap:8 },
  callBtn: { flexDirection:'row', alignItems:'center', gap:5, backgroundColor:Colors.fordBlue,
    paddingHorizontal:14, paddingVertical:8, borderRadius:20 },
  waBtn: { flexDirection:'row', alignItems:'center', gap:5, backgroundColor:'#25D366',
    paddingHorizontal:14, paddingVertical:8, borderRadius:20 },
  btnText: { fontSize:12, color:Colors.white, fontWeight:'600' },
});
