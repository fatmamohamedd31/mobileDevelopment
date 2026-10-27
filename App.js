import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BestTimeScreen from './screens/BestTimeScreen';
import PlannerScreen from './screens/PlannerScreen';
import AlertsScreen from './screens/AlertsScreen';
import { BRANCHES, DAYS } from './data';
import s from './styles';

const TABS = ['Best Time', 'Planner', 'Alerts'];

export default function App() {
  const [tab, setTab] = useState(0);
  const [visits, setVisits] = useState([]);
  const [draft, setDraft] = useState({ branch: BRANCHES[0], date: DAYS[0].key, time: null });
  const [settings, setSettings] = useState({ queueChange: true, lessBusy: true, reminders: true });

  useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem('visits');
        const st = await AsyncStorage.getItem('settings');
        if (v) setVisits(JSON.parse(v));
        if (st) setSettings(JSON.parse(st));
      } catch (e) {}
    })();
  }, []);
  useEffect(() => { AsyncStorage.setItem('visits', JSON.stringify(visits)).catch(() => {}); }, [visits]);
  useEffect(() => { AsyncStorage.setItem('settings', JSON.stringify(settings)).catch(() => {}); }, [settings]);

  const saveVisit = (v) =>
    setVisits((p) => [...p, v].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)));
  const removeVisit = (id) => setVisits((p) => p.filter((v) => v.id !== id));
  const planFromBestTime = (d) => { setDraft(d); setTab(1); };

  return (
    <SafeAreaView style={s.safe}>
      <View style={{ flex: 1 }}>
        {tab === 0 && <BestTimeScreen onPlan={planFromBestTime} />}
        {tab === 1 && (
          <PlannerScreen draft={draft} setDraft={setDraft} visits={visits} saveVisit={saveVisit} removeVisit={removeVisit} />
        )}
        {tab === 2 && <AlertsScreen settings={settings} setSettings={setSettings} visits={visits} />}
      </View>
      <View style={s.tabBar}>
        {TABS.map((t, i) => (
          <TouchableOpacity key={t} style={s.tab} onPress={() => setTab(i)}>
            <Text style={[s.tabText, tab === i && { color: '#5b4bdb', fontWeight: '700' }]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}