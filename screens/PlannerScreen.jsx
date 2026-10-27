import React, { useState } from 'react';
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
};

type PlannedVisit = {
  id: string;
  branch: string;
  date: string;
  time: string;
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

const TIMES = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
];

const NEXT_DAYS = Array.from({ length: 7 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() + index);

  return {
    value: date.toISOString().slice(0, 10),
    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
    number: date.getDate(),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
  };
});

export default function VisitPlannerScreen({ goBack }: Props) {
  const [branch, setBranch] = useState(BRANCHES[0]);
  const [selectedDate, setSelectedDate] = useState(NEXT_DAYS[1].value);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [showBranches, setShowBranches] = useState(false);
  const [visits, setVisits] = useState<PlannedVisit[]>([]);
  const [message, setMessage] = useState('');

  const saveVisit = () => {
    const chosenDate = NEXT_DAYS.find(
      (item) => item.value === selectedDate
    );

    if (!chosenDate) {
      setMessage('Please select a valid date.');
      return;
    }

    const newVisit: PlannedVisit = {
      id: `${Date.now()}`,
      branch,
      date: `${chosenDate.day}, ${chosenDate.month} ${chosenDate.number}`,
      time: selectedTime,
    };

    setVisits((previous) => [...previous, newVisit]);
    setMessage('Your visit has been added to your plans.');
  };

  const removeVisit = (id: string) => {
    setVisits((previous) => previous.filter((visit) => visit.id !== id));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.headerTitle}>Visit Planner</Text>
          <Text style={styles.headerSubtitle}>Make your next visit easier</Text>
        </View>
        <View style={styles.headerIcon}>
          <Text style={{ fontSize: 20 }}>▦</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.eyebrow}>SMART PLANNING</Text>
          <Text style={styles.title}>Plan your visit</Text>
          <Text style={styles.description}>
            Choose when and where you want to go.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.fieldLabel}>BRANCH</Text>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => setShowBranches(!showBranches)}
          >
            <Text style={styles.selectorIcon}>⌖</Text>
            <Text style={styles.selectorText}>{branch}</Text>
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
                      styles.selectorText,
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

          <View style={styles.labelRow}>
            <Text style={styles.fieldLabel}>CHOOSE A DATE</Text>
            <Text style={styles.timezone}>Next 7 days</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateList}
          >
            {NEXT_DAYS.map((date) => {
              const active = selectedDate === date.value;

              return (
                <TouchableOpacity
                  key={date.value}
                  style={[styles.dateItem, active && styles.dateActive]}
                  onPress={() => setSelectedDate(date.value)}
                >
                  <Text style={[styles.dateDay, active && styles.activeText]}>
                    {date.day}
                  </Text>
                  <Text style={[styles.dateNumber, active && styles.activeText]}>
                    {date.number}
                  </Text>
                  <Text style={[styles.dateMonth, active && styles.activeText]}>
                    {date.month}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <Text style={[styles.fieldLabel, { marginTop: 24 }]}>
            PREFERRED TIME
          </Text>

          <View style={styles.timeGrid}>
            {TIMES.map((time) => {
              const active = selectedTime === time;

              return (
                <TouchableOpacity
                  key={time}
                  style={[styles.timeOption, active && styles.timeActive]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[styles.timeText, active && styles.activeText]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.estimateCard}>
            <View style={styles.estimateIcon}>
              <Text style={{ fontSize: 20 }}>◷</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.estimateTitle}>Estimated waiting time</Text>
              <Text style={styles.estimateSubtitle}>
                Sample estimate for your selected slot
              </Text>
            </View>
            <Text style={styles.estimateValue}>
              {selectedTime.startsWith('12') || selectedTime.startsWith('1:')
                ? '35 min'
                : '12 min'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={saveVisit}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>＋  Save My Visit</Text>
          </TouchableOpacity>

          {!!message && (
            <Text style={styles.message}>{message}</Text>
          )}
        </View>

        <View style={styles.upcomingHeader}>
          <View>
            <Text style={styles.sectionTitle}>Upcoming visits</Text>
            <Text style={styles.sectionSubtitle}>
              Your saved plans in one place
            </Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{visits.length}</Text>
          </View>
        </View>

        {visits.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Text style={{ fontSize: 25 }}>▦</Text>
            </View>
            <Text style={styles.emptyTitle}>No visits planned yet</Text>
            <Text style={styles.emptyText}>
              Choose a branch, date, and time above to add your first visit.
            </Text>
          </View>
        ) : (
          visits.map((visit) => (
            <View key={visit.id} style={styles.visitCard}>
              <View style={styles.visitIcon}>
                <Text style={{ fontSize: 20 }}>⌖</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.visitBranch}>{visit.branch}</Text>
                <Text style={styles.visitDetail}>
                  {visit.date} · {visit.time}
                </Text>
                <View style={styles.savedBadge}>
                  <Text style={styles.savedText}>✓ Planned</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => removeVisit(visit.id)}
                style={styles.removeButton}
              >
                <Text style={styles.removeText}>×</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <Text style={styles.disclaimer}>
          Saved visits stay on this screen while the app is open. Persistent
          storage can be added later.
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
  headerTitle: { fontSize: 16, fontWeight: '800', color: INK },
  headerSubtitle: { fontSize: 12, color: MUTED, marginTop: 3 },
  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { padding: 18, paddingBottom: 35 },
  intro: { marginBottom: 20 },
  eyebrow: {
    color: GREEN,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 7,
  },
  title: { fontSize: 27, fontWeight: '800', color: INK },
  description: { color: MUTED, fontSize: 14, marginTop: 7 },
  formCard: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    padding: 16,
  },
  fieldLabel: {
    fontSize: 10,
    color: MUTED,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 10,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 13,
    padding: 13,
  },
  selectorIcon: { color: GREEN, fontSize: 21, marginRight: 10 },
  selectorText: { color: INK, fontSize: 13, fontWeight: '700', flex: 1 },
  chevron: { color: MUTED, fontSize: 21 },
  dropdown: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 6,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: BG,
  },
  check: { color: GREEN, fontSize: 18, fontWeight: '800' },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  timezone: { color: MUTED, fontSize: 10, marginBottom: 10 },
  dateList: { gap: 8, paddingBottom: 2 },
  dateItem: {
    width: 57,
    height: 82,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
  },
  dateActive: { backgroundColor: GREEN, borderColor: GREEN },
  dateDay: { fontSize: 10, color: MUTED, fontWeight: '700' },
  dateNumber: { fontSize: 20, color: INK, fontWeight: '800', marginVertical: 4 },
  dateMonth: { fontSize: 10, color: MUTED },
  activeText: { color: WHITE },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  timeOption: {
    width: '31%',
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: WHITE,
  },
  timeActive: { backgroundColor: GREEN, borderColor: GREEN },
  timeText: { fontSize: 11, color: INK, fontWeight: '700' },
  estimateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_GREEN,
    borderRadius: 14,
    padding: 12,
    marginTop: 22,
  },
  estimateIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  estimateTitle: { fontSize: 12, color: INK, fontWeight: '800' },
  estimateSubtitle: { color: MUTED, fontSize: 10, marginTop: 4 },
  estimateValue: { fontSize: 15, color: GREEN, fontWeight: '800' },
  primaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GREEN,
    borderRadius: 14,
    padding: 16,
    marginTop: 17,
  },
  primaryButtonText: { color: WHITE, fontWeight: '800', fontSize: 14 },
  message: {
    color: GREEN,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 18,
  },
  upcomingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 13,
  },
  sectionTitle: { color: INK, fontSize: 18, fontWeight: '800' },
  sectionSubtitle: { color: MUTED, fontSize: 11, marginTop: 5 },
  countBadge: {
    minWidth: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  countText: { color: GREEN, fontSize: 12, fontWeight: '800' },
  emptyCard: {
    backgroundColor: WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
    padding: 25,
  },
  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 19,
    backgroundColor: LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: { color: INK, fontSize: 14, fontWeight: '800', marginTop: 14 },
  emptyText: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 7,
  },
  visitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 17,
    padding: 14,
    marginBottom: 10,
  },
  visitIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  visitBranch: { color: INK, fontSize: 13, fontWeight: '800' },
  visitDetail: { color: MUTED, fontSize: 11, marginTop: 6 },
  savedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: LIGHT_GREEN,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 7,
  },
  savedText: { color: GREEN, fontSize: 10, fontWeight: '800' },
  removeButton: {
    width: 31,
    height: 31,
    borderRadius: 10,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  removeText: { fontSize: 22, color: MUTED },
  disclaimer: {
    color: MUTED,
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 15,
    marginTop: 16,
  },
});