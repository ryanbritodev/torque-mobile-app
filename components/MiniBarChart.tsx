import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Props {
  data: number[]; labels: string[];
  color?: string; height?: number; showValues?: boolean;
}
export function MiniBarChart({ data, labels, color=Colors.fordBlue, height=100, showValues=false }: Props) {
  const max = Math.max(...data) * 1.15;
  return (
    <View>
      <View style={[styles.chart, { height }]}>
        {data.map((val, i) => {
          const h = (val / max) * height;
          const isLast = i === data.length - 1;
          return (
            <View key={i} style={styles.barCol}>
              {showValues && isLast ? <Text style={[styles.valText,{color}]}>{val.toFixed(1)}</Text> : null}
              <View style={[styles.bar, { height:h, backgroundColor: isLast ? color : color+'55' }]} />
            </View>
          );
        })}
      </View>
      <View style={styles.labelsRow}>
        {labels.map((l,i) => (
          <Text key={i} style={[styles.lbl, i===labels.length-1 && {color, fontWeight:'700'}]}>{l}</Text>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  chart: { flexDirection:'row', alignItems:'flex-end', gap:5, marginBottom:4 },
  barCol: { flex:1, alignItems:'center', justifyContent:'flex-end' },
  bar: { width:'100%', borderRadius:4 },
  valText: { fontSize:9, fontWeight:'700', marginBottom:2 },
  labelsRow: { flexDirection:'row', gap:5 },
  lbl: { flex:1, textAlign:'center', fontSize:9, color:Colors.gray500 },
});
