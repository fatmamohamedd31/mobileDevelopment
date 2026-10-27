import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
} from 'react-native';

import s, { colors } from '../styles';

const TOGGLES = [
  ['queueChange', 'Queue status changes'],
  ['lessBusy', 'Branch becomes less busy'],
  ['reminders', 'Reminders for planned visits'],
];

export default function AlertsScreen({
  settings,
  setSettings,
  visits,
}) {
  const feed = [
    {
      id: 'a1',
      text: 'City Mall queue is now Low (12 min)',
      type: 'lessBusy',
    },
    {
      id: 'a2',
      text: 'Downtown queue changed to High (48 min)',
      type: 'queueChange',
    },
    ...visits.map((v) => ({
      id: 'r' + v.id,
      text: `Reminder: ${v.branch} on ${v.date} at ${v.time}`,
      type: 'reminders',
    })),
  ].filter((n) => settings[n.type]);

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={s.pad}
      showsVerticalScrollIndicator={false}
    >
      <Text style={s.h1}>Notifications & Alerts</Text>

      <Text style={s.sectionLabel}>NOTIFICATION SETTINGS</Text>

      <View style={s.card}>
        {TOGGLES.map(([key, label], index) => (
          <View
            key={key}
            style={[
              s.settingRow,
              index === TOGGLES.length - 1 && {
                borderBottomWidth: 0,
              },
            ]}
          >
            <View style={s.rowBetween}>
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={s.bold}>{label}</Text>

                <Text style={s.settingDescription}>
                  {key === 'queueChange'
                    ? 'Get updates when queue times change'
                    : key === 'lessBusy'
                    ? 'Know when a branch gets quieter'
                    : 'Stay on track with planned visits'}
                </Text>
              </View>

              <Switch
                value={!!settings[key]}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    [key]: value,
                  })
                }
                trackColor={{
                  false: colors.inactive,
                  true: colors.primary,
                }}
                thumbColor={colors.surface}
              />
            </View>
          </View>
        ))}
      </View>

      <Text style={s.sectionLabel}>RECENT NOTIFICATIONS</Text>

      {feed.length === 0 ? (
        <View style={s.card}>
          <Text style={s.emptyText}>
            Nothing to show. You're all caught up!
          </Text>
        </View>
      ) : (
        feed.map((n) => (
          <View key={n.id} style={[s.card, s.notificationRow]}>
            <View style={s.notificationIcon}>
              <Text style={s.notificationIconText}>
                {n.type === 'reminders'
                  ? '◷'
                  : n.type === 'lessBusy'
                  ? '↓'
                  : '↻'}
              </Text>
            </View>

            <Text
              style={[s.bold, s.notificationText, { marginLeft: 12 }]}
            >
              {n.text}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}