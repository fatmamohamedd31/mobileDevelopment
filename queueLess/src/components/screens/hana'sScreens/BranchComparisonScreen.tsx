import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
const { green, ink } = require('../../ui') as { green: string; ink: string };

type Props = { goBack: () => void; openQueue: () => void };
const options = [
  { name: 'NBE — Zamalek', type: 'Bank · 26 July Street', wait: '12', distance: '0.8 km', hours: '8:30 am – 3 pm', icon: 'bank' as const, recommended: true, tint: '#EAF3EC', color: green },
  { name: 'Banque Misr — Dokki', type: 'Bank · Tahrir Street', wait: '19', distance: '1.6 km', hours: '8:30 am – 3 pm', icon: 'bank' as const, recommended: false, tint: '#F1F0E9', color: '#9A7A43' },
  { name: 'CIB — Mohandessin', type: 'Bank · Lebanon Square', wait: '24', distance: '2.4 km', hours: '8:30 am – 3 pm', icon: 'bank' as const, recommended: false, tint: '#E9EDF6', color: '#607EAE' },
];

export default function BranchComparisonScreen({ goBack, openQueue }: Props) {
  const [sortByWait, setSortByWait] = useState(true);
  const sortedOptions = useMemo(
    () =>
      [...options].sort((a, b) =>
        sortByWait
          ? Number(a.wait) - Number(b.wait)
          : Number.parseFloat(a.distance) - Number.parseFloat(b.distance),
      ),
    [sortByWait],
  );

  return <ScrollView style={s.page} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
    {React.createElement(
      View,
      { style: s.top },
      React.createElement(
        TouchableOpacity,
        { style: s.back, onPress: goBack },
        React.createElement(Ionicons, { name: 'arrow-back', size: 20, color: ink }),
      ),
      React.createElement(Text, { style: s.kicker }, 'BRANCH COMPARISON'),
      React.createElement(
        TouchableOpacity,
        { style: s.back },
        React.createElement(Ionicons, { name: 'map-outline', size: 19, color: ink }),
      ),
    )}
    <Text style={s.title}>Choose the{ '\n' }better queue.</Text><Text style={s.subtitle}>Nearby bank branches compared at a glance.</Text>
    <View style={s.location}><Ionicons name="location" size={15} color={green} /><Text style={s.locationText}>Around Zamalek, Cairo</Text><Ionicons name="chevron-down" size={14} color="#85928B" /></View>
    <View style={s.recommend}><View style={s.recommendIcon}><Ionicons name="sparkles" size={17} color="#A2773E" /></View><View style={{ flex: 1 }}><Text style={s.recommendOver}>OUR PICK FOR YOU</Text><Text style={s.recommendTitle}>NBE Zamalek is quickest nearby</Text><Text style={s.recommendCopy}>Save about 7 minutes compared with the next branch.</Text></View></View>
      <View style={s.tableHeader}><Text style={s.tableTitle}>3 branches nearby</Text><TouchableOpacity style={s.sort} onPress={() => setSortByWait((current) => !current)}><Text style={s.sortText}>{sortByWait ? 'Shortest wait' : 'Nearest'}</Text><Ionicons name="swap-vertical" size={13} color={green} /></TouchableOpacity></View>
    {sortedOptions.map((b) => <TouchableOpacity key={b.name} style={[s.card, b.recommended && s.cardRecommended]} onPress={openQueue} activeOpacity={0.8}>
      {b.recommended && <View style={s.recommendedTag}><Ionicons name="checkmark-circle" size={13} color={green} /><Text style={s.recommendedText}>RECOMMENDED</Text></View>}
      <View style={s.cardHead}><View style={[s.bankIcon, { backgroundColor: b.tint }]}><MaterialCommunityIcons name={b.icon} size={21} color={b.color} /></View><View style={{ flex: 1 }}><Text style={s.branchName}>{b.name}</Text><Text style={s.branchType}>{b.type}</Text></View><Ionicons name="chevron-forward" size={17} color="#9AA49F" /></View>
      <View style={s.metrics}><View style={s.metric}><Text style={[s.metricValue, b.recommended && { color: green }]}>{b.wait}<Text style={s.metricUnit}> min</Text></Text><Text style={s.metricLabel}>WAIT</Text></View><View style={s.metricDivider} /><View style={s.metric}><Text style={s.metricValue}>{b.distance}</Text><Text style={s.metricLabel}>DISTANCE</Text></View><View style={s.metricDivider} /><View style={s.metric}><Text style={s.hours}>{b.hours}</Text><Text style={s.metricLabel}>TODAY</Text></View></View>
      {b.recommended && <View style={s.openLine}><View style={s.dot} /><Text style={s.openNow}>Open now</Text><Text style={s.openDetail}>· Queue moving well</Text></View>}
    </TouchableOpacity>)}
    <Text style={s.footnote}>Wait times and branch hours are sample estimates for this prototype.</Text>
  </ScrollView>;
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F6F7F2' }, content: { padding: 22, paddingBottom: 32 }, top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 19 }, back: { width: 42, height: 42, borderRadius: 15, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E9EDE6' }, kicker: { color: '#819089', fontSize: 10, letterSpacing: 1.4, fontWeight: '700' }, title: { color: ink, fontSize: 30, lineHeight: 32, fontWeight: '700', letterSpacing: -1 }, subtitle: { color: '#78867F', fontSize: 12, marginTop: 7, marginBottom: 15 }, location: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E9EDE6', borderRadius: 18, paddingHorizontal: 11, paddingVertical: 8, marginBottom: 16 }, locationText: { color: '#586A61', fontSize: 10, fontWeight: '600' }, recommend: { flexDirection: 'row', gap: 10, backgroundColor: '#F7F1E6', borderRadius: 16, padding: 13, marginBottom: 21 }, recommendIcon: { width: 34, height: 34, borderRadius: 11, backgroundColor: '#F1E5CC', alignItems: 'center', justifyContent: 'center' }, recommendOver: { color: '#A17B3D', fontSize: 8, letterSpacing: 1, fontWeight: '700' }, recommendTitle: { color: '#5C4A2F', fontSize: 11, fontWeight: '700', marginTop: 4 }, recommendCopy: { color: '#8A795B', fontSize: 9, marginTop: 3 }, tableHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }, tableTitle: { color: ink, fontSize: 15, fontWeight: '700' }, sort: { flexDirection: 'row', alignItems: 'center', gap: 4 }, sortText: { color: green, fontSize: 10, fontWeight: '600' }, card: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E8ECE5', borderRadius: 17, padding: 13, marginBottom: 10 }, cardRecommended: { borderColor: '#AFCFBA', borderWidth: 1.5 }, recommendedTag: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start', backgroundColor: '#EAF3EC', borderRadius: 7, paddingHorizontal: 7, paddingVertical: 5, marginBottom: 9 }, recommendedText: { color: green, fontSize: 8, fontWeight: '700', letterSpacing: 0.6 }, cardHead: { flexDirection: 'row', alignItems: 'center', gap: 10 }, bankIcon: { width: 41, height: 41, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, branchName: { color: ink, fontSize: 12, fontWeight: '700' }, branchType: { color: '#8B9690', fontSize: 9, marginTop: 4 }, metrics: { flexDirection: 'row', alignItems: 'center', marginTop: 14, paddingVertical: 11, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#F0F2ED' }, metric: { flex: 1, alignItems: 'center' }, metricValue: { color: ink, fontSize: 14, fontWeight: '700' }, metricUnit: { fontSize: 9, fontWeight: '600' }, metricLabel: { color: '#96A19B', fontSize: 8, letterSpacing: 0.8, marginTop: 4, fontWeight: '700' }, metricDivider: { width: 1, height: 28, backgroundColor: '#E9EDE6' }, hours: { color: '#43574D', fontSize: 9, fontWeight: '600' }, openLine: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 9 }, dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: green }, openNow: { color: green, fontSize: 9, fontWeight: '700' }, openDetail: { color: '#89958E', fontSize: 9 }, footnote: { color: '#9AA49F', fontSize: 9, lineHeight: 14, textAlign: 'center', marginTop: 5 },
});