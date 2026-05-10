import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Props {
  title: string; value: string; subtitle?: string;
  color?: string; icon?: React.ReactNode;
}
export function MetricCard({ title, value, subtitle, color = Colors.fordBlue, icon }: Props) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        {icon}
      </View>
      <Text style={[styles.value, { color }]}>{value}</Text>
      {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor:Colors.white, borderRadius:12, padding:14, borderLeftWidth:4,
    shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.06, shadowRadius:8,
    elevation:3, flex:1, minWidth:140 },
  row: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:6 },
  title: { fontSize:10, fontWeight:'700', color:Colors.gray500, textTransform:'uppercase', letterSpacing:0.5, flex:1 },
  value: { fontSize:26, fontWeight:'800', marginBottom:2 },
  sub: { fontSize:11, color:Colors.gray500 },
});
