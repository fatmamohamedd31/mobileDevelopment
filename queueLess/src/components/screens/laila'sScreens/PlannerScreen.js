import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Chip from '../components/Chip';
import s from '../styles';
import { BRANCHES, TIMES, DAYS } from '../data';

export default function PlannerScreen({
  draft,
  setDraft,
  visits,
  saveVisit,
  removeVisit,
}) {
  const { branch, date, time } = draft;
  const canSave = branch && date && time;

  return (
    <ScrollView
      contentContainerStyle={s.pad}
      showsVerticalScrollIndicator={false}
    >
      <Text style={s.h1}>Visit Planner</Text>

      <Text style={s.h2}>Branch</Text>

      <View style={s.wrap}>
        {BRANCHES.map((b) => (
          <Chip
            key={b}
            label={b}
            active={b === branch}
            onPress={() =>
              setDraft({ ...draft, branch: b })
            }
          />
        ))}
      </View>

      <Text style={s.h2}>Date</Text>

      <View style={s.wrap}>
        {DAYS.map((d) => (
          <Chip
            key={d.key}
            label={d.label}
            active={d.key === date}
            onPress={() =>
              setDraft({ ...draft, date: d.key })
            }
          />
        ))}
      </View>

      <Text style={s.h2}>Preferred time</Text>

      <View style={s.wrap}>
        {TIMES.map((t) => (
          <Chip
            key={t}
            label={t}
            active={t === time}
            onPress={() =>
              setDraft({ ...draft, time: t })
            }
          />
        ))}
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          s.btn,
          !canSave && s.btnDisabled,
        ]}
        disabled={!canSave}
        onPress={() =>
          saveVisit({
            id: Date.now().toString(),
            branch,
            date,
            time,
          })
        }
      >
        <Text style={s.btnText}>Save visit</Text>
      </TouchableOpacity>

      <Text style={s.h2}>Upcoming visits</Text>

      {visits.length === 0 ? (
        <View style={s.card}>
          <Text style={s.emptyText}>
            No planned visits yet.
          </Text>
        </View>
      ) : (
        visits.map((v) => (
          <View
            key={v.id}
            style={[s.card, s.visitRow]}
          >
            <View style={s.visitDetails}>
              <Text style={s.bold}>{v.branch}</Text>

              <Text style={s.muted}>
                {v.date} · {v.time}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => removeVisit(v.id)}
            >
              <Text style={s.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}