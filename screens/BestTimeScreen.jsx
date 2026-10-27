import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  goBack: () => void;
  onPlanVisit?: () => void;
};

const GREEN = '#16845B';
const LIGHT_GREEN = '#E8F5EE';
const INK = '#172B25';
const MUTED = '#75847D';
const BORDER = '#E5EBE7';
const WHITE = '#FFFFFF';
const BG = '#F7FAF8';

const BRANCHES = [
  'Nasr City Branch',
  'New Cairo Branch',
  'Maadi Branch',
  'Heliopolis Branch',
];

const DAYS = [
  { label: 'Mon', date: 26 },
  { label: 'Tue', date: 27 },
  { label: 'Wed', date: 28 },
  { label: 'Thu', date: 29 },
  { label: 'Fri', date: 30 },
  { label: 'Sat', date: 31 },
  { label: 'Sun', date: 1 },
];

const SLOTS = [
  { time: '9:00 AM', wait: 8, level: 'Low' },
  { time: '10:00 AM', wait: 12, level: 'Low' },
  { time: '11:00 AM', wait: 25, level: 'Medium' },
  { time: '12:00 PM', wait: 38, level: 'High' },
  { time: '1:00 PM', wait: 45, level: 'High' },
  { time: '2:00 PM', wait: 20, level: 'Medium' },
  { time: '3:00 PM', wait: 14, level: 'Low' },
  { time: '4:00 PM', wait: 10, level: 'Low' },
];

export default function BestTimeScreen({
  goBack,
  onPlanVisit,
}: Props) {
  const [branch, setBranch] = useState(BRANCHES[0]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [showBranches, setShowBranches] = useState(false);

  const bestSlot = useMemo(
    () => SLOTS.reduce((best, slot) =>
      slot.wait < best.wait ? slot : best
    ),
    []
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerTitle}>
          <Text style={styles.headerHeading}>Smart Planning</Text>
          <Text style={styles.headerSubtitle}>Find the perfect time to go</Text>
        </View>

        <View style={styles.headerIcon}>
          <Text style={{ fontSize: 21 }}>◷</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.eyebrow}>PLAN SMARTER</Text>
          <Text style={styles.title}>Best Time to Visit</Text>
          <Text style={styles.description}>
            Avoid busy hours and spend less time waiting.
          </Text>
        </View>

        <Text style={styles.sectionLabel}>SELECT BRANCH</Text>

        <TouchableOpacity
          style={styles.branchSelector}
          onPress={() => setShowBranches(!showBranches)}
          activeOpacity={0.8}
        >
          <View style={styles.branchIcon}>
            <Text style={{ fontSize: 20 }}>⌖</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.branchName}>{branch}</Text>
            <Text style={styles.smallText}>View predicted queue</Text>
          </View>
          <Text style={styles.chevron}>{showBranches ? '⌃' : '⌄'}</Text>
        </TouchableOpacity>

        {showBranches && (
          <View style={styles.dropdown}>
            {BRANCHES.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  setBranch(item);
                  setShowBranches(false);
                }}
              >
                <Text
                  style={[
                    styles.branchName,
                    item === branch && { color: GREEN },
                  ]}
                >
                  {item}
                </Text>
                {item === branch && (
                  <Text style={styles.check}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
          CHOOSE A DAY
        </Text>

        <View style={styles.daysRow}>
          {DAYS.map((day, index) => {
            const active = selectedDay === index;

            return (
              <TouchableOpacity
                key={`${day.label}-${day.date}`}
                style={[styles.dayItem, active && styles.dayActive]}
                onPress={() => setSelectedDay(index)}
              >
                <Text style={[styles.dayLabel, active && styles.activeText]}>
                  {day.label}
                </Text>
                <Text style={[styles.dayDate, active && styles.activeText]}>
                  {day.date}
                </Text>
                {index === 2 && <View style={styles.dayDot} />}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.recommendation}>
          <View style={styles.recommendationTop}>
            <View style={styles.recommendationIcon}>
              <Text style={{ fontSize: 23 }}>✦</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.recommendationEyebrow}>
                OUR RECOMMENDATION
              </Text>
              <Text style={styles.recommendationTitle}>
                Visit at {bestSlot.time}
              </Text>
            </View>
            <View style={styles.lowBadge}>
              <Text style={styles.lowBadgeText}>Quiet</Text>
            </View>
          </View>

          <View style={styles.recommendationBottom}>
            <View>
              <Text style={styles.waitNumber}>{bestSlot.wait} min</Text>
              <Text style={styles.smallText}>Estimated waiting time</Text>
            </View>
            <View style={styles.dividerVertical} />
            <View style={{ flex: 1 }}>
              <Text style={styles.goodText}>✓ Less crowded</Text>
              <Text style={styles.smallText}>Based on sample forecasts</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeadingRow}>
          <View>
            <Text style={styles.sectionTitle}>Waiting time forecast</Text>
            <Text style={styles.smallText}>
              Estimated waits throughout the day
            </Text>
          </View>
          <View style={styles.forecastBadge}>
            <Text style={styles.forecastBadgeText}>FORECAST</Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.chartArea}>
            {SLOTS.map((slot) => {
              const height = Math.max(14, (slot.wait / 45) * 112);
              const quiet = slot.wait <= 15;

              return (
                <View key={slot.time} style={styles.barColumn}>
                  <Text style={styles.barValue}>{slot.wait}</Text>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height,
                          backgroundColor: quiet ? GREEN : '#F0B85A',
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.barTime}>
                    {slot.time.replace(':00 ', '')}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: GREEN }]} />
              <Text style={styles.smallText}>Less busy</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F0B85A' }]} />
              <Text style={styles.smallText}>Busier</Text>
            </View>
          </View>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>💡</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>QueueLess tip</Text>
            <Text style={styles.tipText}>
              Early mornings and late afternoons are usually quieter in this
              sample forecast. Actual waiting times may change.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onPlanVisit}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Plan My Visit</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Demo predictions for UI testing only. Connect your queue data source
          for live forecasts.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: { fontSize: 32, lineHeight: 34, color: INK },
  headerTitle: { flex: 1, marginLeft: 12 },
  headerHeading: { fontSize: 16, fontWeight: '800', color: INK },
  headerSubtitle: { fontSize: 12, color: MUTED, marginTop: 3 },
  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { padding: 18, paddingBottom: 34 },
  intro: { marginBottom: 22 },
  eyebrow: {
    color: GREEN,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 7,
  },
  title: { fontSize: 27, fontWeight: '800', color: INK },
  description: { fontSize: 14, color: MUTED, marginTop: 7, lineHeight: 21 },
  sectionLabel: {
    color: MUTED,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 10,
  },
  branchSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 14,
  },
  branchIcon: {
    width: 43,
    height: 43,
    backgroundColor: LIGHT_GREEN,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  branchName: { color: INK, fontSize: 14, fontWeight: '700' },
  smallText: { fontSize: 11, color: MUTED, marginTop: 5, lineHeight: 16 },
  chevron: { fontSize: 23, color: MUTED, paddingHorizontal: 5 },
  dropdown: {
    backgroundColor: WHITE,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    marginTop: 6,
    paddingHorizontal: 13,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: BG,
  },
  check: { color: GREEN, fontSize: 18, fontWeight: '800' },
  daysRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 5 },
  dayItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    minHeight: 76,
    paddingVertical: 10,
  },
  dayActive: { backgroundColor: GREEN, borderColor: GREEN },
  dayLabel: { color: MUTED, fontSize: 11, fontWeight: '600' },
  dayDate: { color: INK, fontSize: 17, fontWeight: '800', marginTop: 5 },
  activeText: { color: WHITE },
  dayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F0B85A',
    position: 'absolute',
    bottom: 5,
  },
  recommendation: {
    marginTop: 22,
    padding: 17,
    backgroundColor: WHITE,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D8EDE0',
  },
  recommendationTop: { flexDirection: 'row', alignItems: 'center' },
  recommendationIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  recommendationEyebrow: {
    fontSize: 9,
    color: GREEN,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: INK,
    marginTop: 5,
  },
  lowBadge: {
    backgroundColor: LIGHT_GREEN,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  lowBadgeText: { color: GREEN, fontWeight: '800', fontSize: 11 },
  recommendationBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  waitNumber: { fontSize: 25, fontWeight: '800', color: GREEN },
  dividerVertical: {
    height: 42,
    width: 1,
    backgroundColor: BORDER,
    marginHorizontal: 18,
  },
  goodText: { fontSize: 13, fontWeight: '700', color: GREEN },
  sectionHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 12,
  },
  sectionTitle: { color: INK, fontSize: 17, fontWeight: '800' },
  forecastBadge: {
    backgroundColor: LIGHT_GREEN,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  forecastBadgeText: {
    color: GREEN,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  chartCard: {
    backgroundColor: WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 14,
  },
  chartArea: {
    height: 160,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  barColumn: { flex: 1, alignItems: 'center', height: '100%', justifyContent: 'flex-end' },
  barValue: { color: MUTED, fontSize: 9, marginBottom: 4 },
  barTrack: {
    height: 116,
    width: 15,
    justifyContent: 'flex-end',
    backgroundColor: BG,
    borderRadius: 7,
    overflow: 'hidden',
  },
  bar: { width: '100%', borderRadius: 7 },
  barTime: { color: MUTED, fontSize: 8, marginTop: 7 },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 17,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  tipCard: {
    flexDirection: 'row',
    padding: 15,
    marginTop: 16,
    backgroundColor: '#FFF8E9',
    borderRadius: 16,
    gap: 10,
  },
  tipIcon: { fontSize: 21 },
  tipTitle: { color: INK, fontSize: 13, fontWeight: '800' },
  tipText: { color: '#776A4D', fontSize: 12, lineHeight: 18, marginTop: 4 },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GREEN,
    padding: 16,
    borderRadius: 15,
    marginTop: 20,
  },
  primaryButtonText: { color: WHITE, fontSize: 15, fontWeight: '800' },
  buttonArrow: { color: WHITE, fontSize: 20, marginLeft: 9 },
  disclaimer: {
    color: MUTED,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 15,
    marginTop: 12,
  },
});