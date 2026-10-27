import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  goBack: () => void;
};

type NotificationItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
  time: string;
  category: 'queue' | 'quiet' | 'reminder';
  unread: boolean;
};

const GREEN = '#16845B';
const LIGHT_GREEN = '#E8F5EE';
const INK = '#172B25';
const MUTED = '#75847D';
const BORDER = '#E5EBE7';
const WHITE = '#FFFFFF';
const BG = '#F7FAF8';

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    icon: '✓',
    title: 'Queue is getting shorter',
    description: 'Nasr City Branch now has an estimated 10-minute wait.',
    time: '5 min ago',
    category: 'quiet',
    unread: true,
  },
  {
    id: '2',
    icon: '◷',
    title: 'Queue status changed',
    description: 'New Cairo Branch is busier than it was earlier.',
    time: '25 min ago',
    category: 'queue',
    unread: true,
  },
  {
    id: '3',
    icon: '▦',
    title: 'Upcoming visit',
    description: 'Remember to check the queue before leaving for your visit.',
    time: 'Yesterday',
    category: 'reminder',
    unread: false,
  },
  {
    id: '4',
    icon: '✦',
    title: 'A quieter time is available',
    description: 'Maadi Branch may be less busy later this afternoon.',
    time: 'Yesterday',
    category: 'quiet',
    unread: false,
  },
];

export default function NotificationsScreen({ goBack }: Props) {
  const [queueAlerts, setQueueAlerts] = useState(true);
  const [quietBranchAlerts, setQuietBranchAlerts] = useState(true);
  const [visitReminders, setVisitReminders] = useState(true);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');

  const markAllRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({ ...item, unread: false }))
    );
  };

  const visibleNotifications = notifications.filter((item) => {
    if (filter === 'Unread') return item.unread;
    return true;
  });

  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.headerTitle}>Notifications & Alerts</Text>
          <Text style={styles.headerSubtitle}>Stay updated on queue changes</Text>
        </View>

        <View style={styles.headerIcon}>
          <Text style={{ fontSize: 20 }}>♧</Text>
          {unreadCount > 0 && <View style={styles.headerDot} />}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.eyebrow}>YOUR UPDATES</Text>
          <Text style={styles.title}>Never miss a better time</Text>
          <Text style={styles.description}>
            Get notified when queues change or a branch becomes less busy.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Text style={{ fontSize: 25 }}>♧</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.summaryTitle}>You're all caught up</Text>
            <Text style={styles.summarySubtitle}>
              {unreadCount === 0
                ? 'No unread notifications'
                : `You have ${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`}
            </Text>
          </View>
          <View style={styles.summaryCount}>
            <Text style={styles.summaryCountText}>{unreadCount}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Alert preferences</Text>
        <Text style={styles.sectionSubtitle}>
          Choose which updates you want to receive
        </Text>

        <View style={styles.preferencesCard}>
          <View style={styles.preferenceRow}>
            <View style={[styles.preferenceIcon, { backgroundColor: '#E9F2FF' }]}>
              <Text style={styles.preferenceEmoji}>◷</Text>
            </View>
            <View style={styles.preferenceCopy}>
              <Text style={styles.preferenceTitle}>Queue status changes</Text>
              <Text style={styles.preferenceDescription}>
                Know when a branch gets busier or quieter.
              </Text>
            </View>
            <Switch
              value={queueAlerts}
              onValueChange={setQueueAlerts}
              trackColor={{ false: '#D9E1DC', true: '#9BD4B5' }}
              thumbColor={queueAlerts ? GREEN : '#FFFFFF'}
            />
          </View>

          <View style={styles.preferenceDivider} />

          <View style={styles.preferenceRow}>
            <View style={[styles.preferenceIcon, { backgroundColor: LIGHT_GREEN }]}>
              <Text style={styles.preferenceEmoji}>✓</Text>
            </View>
            <View style={styles.preferenceCopy}>
              <Text style={styles.preferenceTitle}>Less busy branch alerts</Text>
              <Text style={styles.preferenceDescription}>
                Get a heads-up when waiting times drop.
              </Text>
            </View>
            <Switch
              value={quietBranchAlerts}
              onValueChange={setQuietBranchAlerts}
              trackColor={{ false: '#D9E1DC', true: '#9BD4B5' }}
              thumbColor={quietBranchAlerts ? GREEN : '#FFFFFF'}
            />
          </View>

          <View style={styles.preferenceDivider} />

          <View style={styles.preferenceRow}>
            <View style={[styles.preferenceIcon, { backgroundColor: '#FFF1DC' }]}>
              <Text style={styles.preferenceEmoji}>▦</Text>
            </View>
            <View style={styles.preferenceCopy}>
              <Text style={styles.preferenceTitle}>Visit reminders</Text>
              <Text style={styles.preferenceDescription}>
                Reminders for your planned visits.
              </Text>
            </View>
            <Switch
              value={visitReminders}
              onValueChange={setVisitReminders}
              trackColor={{ false: '#D9E1DC', true: '#9BD4B5' }}
              thumbColor={visitReminders ? GREEN : '#FFFFFF'}
            />
          </View>
        </View>

        <View style={styles.activityHeader}>
          <View>
            <Text style={styles.sectionTitle}>Recent notifications</Text>
            <Text style={styles.sectionSubtitle}>
              Updates about your branches and visits
            </Text>
          </View>
          <TouchableOpacity onPress={markAllRead}>
            <Text style={styles.markRead}>Mark all read</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          {(['All', 'Unread'] as const).map((item) => {
            const active = filter === item;

            return (
              <TouchableOpacity
                key={item}
                style={[styles.filterButton, active && styles.filterActive]}
                onPress={() => setFilter(item)}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>
                  {item}
                </Text>
                {item === 'Unread' && unreadCount > 0 && (
                  <View style={[styles.filterCount, active && styles.filterCountActive]}>
                    <Text style={[styles.filterCountText, active && { color: GREEN }]}>
                      {unreadCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {visibleNotifications.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={{ fontSize: 30 }}>✓</Text>
            <Text style={styles.emptyTitle}>You're all caught up!</Text>
            <Text style={styles.emptyText}>
              There are no unread notifications right now.
            </Text>
          </View>
        ) : (
          visibleNotifications.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              style={[
                styles.notificationCard,
                item.unread && styles.notificationUnread,
              ]}
              onPress={() => {
                setNotifications((previous) =>
                  previous.map((notification) =>
                    notification.id === item.id
                      ? { ...notification, unread: false }
                      : notification
                  )
                );
              }}
            >
              <View
                style={[
                  styles.notificationIcon,
                  item.category === 'quiet' && { backgroundColor: LIGHT_GREEN },
                  item.category === 'queue' && { backgroundColor: '#E9F2FF' },
                  item.category === 'reminder' && { backgroundColor: '#FFF1DC' },
                ]}
              >
                <Text style={styles.notificationEmoji}>{item.icon}</Text>
              </View>

              <View style={styles.notificationCopy}>
                <View style={styles.notificationTitleRow}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  {item.unread && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notificationDescription}>
                  {item.description}
                </Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
                {item.unread && (
                  <Text style={styles.tapHint}>Tap to mark as read</Text>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ⓘ</Text>
          <Text style={styles.infoText}>
            These are sample notifications for your project demo. The switches
            update their on-screen state; real push notifications require
            notification service integration.
          </Text>
        </View>
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
  headerTitle: { fontSize: 15, fontWeight: '800', color: INK },
  headerSubtitle: { fontSize: 11, color: MUTED, marginTop: 4 },
  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerDot: {
    position: 'absolute',
    right: 7,
    top: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F05A5A',
    borderWidth: 1,
    borderColor: WHITE,
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
  title: { color: INK, fontSize: 25, fontWeight: '800', lineHeight: 32 },
  description: { color: MUTED, fontSize: 13, lineHeight: 20, marginTop: 7 },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_GREEN,
    padding: 15,
    borderRadius: 18,
    marginBottom: 26,
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  summaryTitle: { color: INK, fontSize: 14, fontWeight: '800' },
  summarySubtitle: { color: MUTED, fontSize: 11, marginTop: 5 },
  summaryCount: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryCountText: { color: WHITE, fontWeight: '800', fontSize: 12 },
  sectionTitle: { color: INK, fontSize: 17, fontWeight: '800' },
  sectionSubtitle: { color: MUTED, fontSize: 11, marginTop: 5, lineHeight: 16 },
  preferencesCard: {
    backgroundColor: WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 13,
    marginTop: 13,
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  preferenceIcon: {
    width: 41,
    height: 41,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  preferenceEmoji: { fontSize: 20, color: GREEN, fontWeight: '800' },
  preferenceCopy: { flex: 1, paddingRight: 6 },
  preferenceTitle: { color: INK, fontSize: 12, fontWeight: '800' },
  preferenceDescription: {
    color: MUTED,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 5,
  },
  preferenceDivider: { height: 1, backgroundColor: BORDER },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 14,
  },
  markRead: { color: GREEN, fontSize: 11, fontWeight: '800' },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 13 },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: WHITE,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 9,
  },
  filterActive: { backgroundColor: GREEN, borderColor: GREEN },
  filterText: { color: MUTED, fontSize: 12, fontWeight: '700' },
  filterTextActive: { color: WHITE },
  filterCount: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  filterCountActive: { backgroundColor: WHITE },
  filterCountText: { color: GREEN, fontSize: 9, fontWeight: '800' },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 13,
    marginBottom: 10,
  },
  notificationUnread: {
    borderColor: '#C8E7D5',
    backgroundColor: '#FCFFFD',
  },
  notificationIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  notificationEmoji: { fontSize: 19, color: GREEN, fontWeight: '800' },
  notificationCopy: { flex: 1 },
  notificationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  notificationTitle: { color: INK, fontSize: 12, fontWeight: '800', flex: 1 },
  notificationDescription: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 6,
  },
  notificationTime: { color: MUTED, fontSize: 10, marginTop: 8 },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: GREEN,
  },
  tapHint: { color: GREEN, fontSize: 9, marginTop: 6, fontWeight: '700' },
  emptyCard: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: WHITE,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: BORDER,
  },
  emptyTitle: { color: INK, fontSize: 14, fontWeight: '800', marginTop: 10 },
  emptyText: {
    color: MUTED,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 6,
  },
  infoBox: {
    flexDirection: 'row',
    gap: 9,
    padding: 13,
    borderRadius: 14,
    backgroundColor: '#EEF3F0',
    marginTop: 12,
  },
  infoIcon: { color: GREEN, fontSize: 17, fontWeight: '800' },
  infoText: { flex: 1, color: MUTED, fontSize: 10, lineHeight: 16 },
});