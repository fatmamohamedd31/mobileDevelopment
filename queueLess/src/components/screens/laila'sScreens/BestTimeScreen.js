import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Chip from '../components/Chip';
import s from '../styles';
import {
  BRANCHES,
  TIMES,
  DAYS,
  forecast,
  level,
  COLORS,
} from '../data';

export default function BestTimeScreen({ onPlan }) {
  const [branch, setBranch] = useState(BRANCHES[0]);
  const [dayIdx, setDayIdx] = useState(0);

  const waits = useMemo(
    () => forecast(dayIdx, branch),
    [dayIdx, branch]
  );

  const best = waits.indexOf(Math.min(...waits));
  const max = Math.max(...waits);

  return (
    <ScrollView
      style={{ backgroundColor: '#F7F2EC' }}
      contentContainerStyle={s.pad}
      showsVerticalScrollIndicator={false}
    >
      <Text style={s.h1}>Best Time to Visit</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {BRANCHES.map((b) => (
          <Chip
            key={b}
            label={b}
            active={b === branch}
            onPress={() => setBranch(b)}
          />
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={s.horizontalList}
      >
        {DAYS.map((d, i) => (
          <Chip
            key={d.key}
            label={d.label}
            active={i === dayIdx}
            onPress={() => setDayIdx(i)}
          />
        ))}
      </ScrollView>

      <View style={s.card}>
        <Text style={s.muted}>Recommended</Text>

        <Text style={s.big}>
          {DAYS[dayIdx].label} · {TIMES[best]}
        </Text>

        <Text style={s.muted}>
          Expected wait ~{waits[best]} min at {branch}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={s.btn}
          onPress={() =>
            onPlan({
              branch,
              date: DAYS[dayIdx].key,
              time: TIMES[best],
            })
          }
        >
          <Text style={s.btnText}>Plan this visit</Text>
        </TouchableOpacity>
      </View>

      <Text style={s.h2}>Predicted waiting time</Text>

      {TIMES.map((t, i) => (
        <View key={t} style={s.row}>
          <Text style={s.time}>{t}</Text>

          <View style={s.barBg}>
            <View
              style={[
                s.bar,
                {
                  width: `${
                    max === 0 ? 0 : (waits[i] / max) * 100
                  }%`,
                  backgroundColor: COLORS[level(waits[i])],
                },
              ]}
            />
          </View>

          <Text style={s.min}>{waits[i]}m</Text>
        </View>
      ))}

      <Text style={s.h2}>Suggestions</Text>

      <Text style={s.tip}>
        • Early morning and mid-afternoon are usually the quietest.
      </Text>

      <Text style={s.tip}>
        • Avoid {TIMES[waits.indexOf(max)]}: forecast is the busiest slot.
      </Text>

      <Text style={s.tip}>
        • Based on historical averages adjusted by the forecast.
      </Text>
    </ScrollView>
  );
}