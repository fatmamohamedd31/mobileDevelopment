import { Ionicons } from '@expo/vector-icons';
import { memo, useCallback, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { palette } from '../../theme';
import { Button, Card, Divider, ScreenHeader, Section, StatTile, type IconName } from '../components/ui';
import { FAVOURITES, VISITS } from '../data/mock';
import { fmtDuration } from '../lib/format';

const WEEK_ORDER = [6, 0, 1, 2, 3, 4, 5]; // Saturday-first; values are Date
const DAY_LABEL = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const BAR_MAX_HEIGHT = 80;

const PREF_ITEMS = [
  { key: 'alerts', label: 'Wait-time alerts', hint: 'Tell me when a saved branch gets quiet' },
  { key: 'bestTime', label: 'Best-time suggestions', hint: 'Weekly tips for my favourite branches' },
  { key: 'reminders', label: 'Check-in reminders', hint: 'Remind me to report the queue on arrival' },
] as const;
type PrefKey = (typeof PREF_ITEMS)[number]['key'];

const ACCOUNT_ITEMS: { icon: IconName; label: string }[] = [
  { icon: 'person-outline', label: 'Edit profile' },
  { icon: 'language-outline', label: 'Language' },
  { icon: 'lock-closed-outline', label: 'Change password' },
  { icon: 'shield-checkmark-outline', label: 'Privacy & data' },
];

const PrefRow = memo(function PrefRow({
  item,
  value,
  onToggle,
}: {
  item: (typeof PREF_ITEMS)[number];
  value: boolean;
  onToggle: (key: PrefKey) => void;
}) {
  return (
    <View className="flex-row items-center justify-between py-3">
      <View className="flex-1 pr-4">
        <Text className="text-sm font-semibold text-ink">{item.label}</Text>
        <Text className="text-xs text-muted">{item.hint}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={() => onToggle(item.key)}
        trackColor={{ false: palette.line, true: palette.tide }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
});

const AccountRow = memo(function AccountRow({ icon, label }: { icon: IconName; label: string }) {
  return (
    <Pressable className="flex-row items-center py-3.5 active:opacity-60">
      <Ionicons name={icon} size={20} color={palette['tide-dark']} />
      <Text className="ml-3 flex-1 text-sm font-semibold text-ink">{label}</Text>
      <Ionicons name="chevron-forward" size={16} color={palette.muted} />
    </Pressable>
  );
});

const WeeklyBars = memo(function WeeklyBars({ days }: { days: number[] }) {
  const max = Math.max(...days, 1);
  return (
    <View className="h-28 flex-row items-end justify-between">
      {WEEK_ORDER.map((d) => (
        <View key={d} className="flex-1 items-center">
          <View
            className={`w-5 rounded-t-md ${days[d] ? 'bg-tide' : 'bg-mist'}`}
            style={{ height: Math.max(6, (days[d] / max) * BAR_MAX_HEIGHT) }}
          />
          <Text className="mt-1 text-[10px] text-muted">{DAY_LABEL[d]}</Text>
        </View>
      ))}
    </View>
  );
});

export default function ProfileScreen() {
  // TODO: replace VISITS / FAVOURITES with GET /me/stats and GET /me/favourites
  const [prefs, setPrefs] = useState<Record<PrefKey, boolean>>({ alerts: true, bestTime: true, reminders: false });
  const [favourites, setFavourites] = useState(FAVOURITES);

  const stats = useMemo(() => {
    const perDay = new Array<number>(7).fill(0);
    const count = new Array<number>(7).fill(0);
    let total = 0;
    let saved = 0;
    for (const v of VISITS) {
      const d = new Date(v.date).getDay();
      perDay[d] += v.actualWait;
      count[d] += 1;
      total += v.actualWait;
      saved += Math.max(0, v.typicalWait - v.actualWait);
    }
    return {
      visits: VISITS.length,
      avg: Math.round(total / VISITS.length),
      saved,
      days: perDay.map((t, i) => (count[i] ? Math.round(t / count[i]) : 0)),
    };
  }, []);

  const togglePref = useCallback((k: PrefKey) => setPrefs((p) => ({ ...p, [k]: !p[k] })), []);
  const removeFavourite = useCallback(
    (id: string) => setFavourites((list) => list.filter((f) => f.id !== id)),
    [],
  );
  const logOut = useCallback(
    () =>
      Alert.alert('Log out', 'Are you sure you want to log out?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log out', style: 'destructive' }, // TODO: clear session + navigate to login
      ]),
    [],
  );

  return (
    <View className="flex-1 bg-sand">
      <ScreenHeader title="My activity" />
      <ScrollView contentContainerClassName="px-4 pb-12" showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <Card className="-mt-4 flex-row items-center">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-saffron">
            <Text className="text-xl font-bold text-ink">S</Text>
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-lg font-bold text-ink">Salma</Text>
            <Text className="text-sm text-muted">salma@example.com</Text>
          </View>
        </Card>

        <Section title="Your numbers">
          <View className="flex-row gap-3">
            <StatTile icon="walk-outline" label="Total visits" value={String(stats.visits)} />
            <StatTile icon="hourglass-outline" label="Avg. wait" value={`${stats.avg}m`} />
            <StatTile icon="flash-outline" label="Time saved (est.)" value={fmtDuration(stats.saved)} />
          </View>
        </Section>

        <Section title="Average wait by weekday">
          <Card>
            <WeeklyBars days={stats.days} />
          </Card>
        </Section>

        <Section title="Notifications">
          <Card className="py-1">
            {PREF_ITEMS.map((item, i) => (
              <View key={item.key}>
                {i > 0 && <Divider />}
                <PrefRow item={item} value={prefs[item.key]} onToggle={togglePref} />
              </View>
            ))}
          </Card>
        </Section>

        <Section title="Favourite branches">
          <Card className="py-1">
            {favourites.length === 0 ? (
              <Text className="py-4 text-center text-sm text-muted">No favourites yet.</Text>
            ) : (
              favourites.map((f, i) => (
                <View key={f.id}>
                  {i > 0 && <Divider />}
                  <View className="flex-row items-center py-3">
                    <Ionicons name="heart" size={18} color={palette.coral} />
                    <View className="ml-3 flex-1">
                      <Text className="text-sm font-semibold text-ink">{f.name}</Text>
                      <Text className="text-xs text-muted">{f.category}</Text>
                    </View>
                    <Pressable onPress={() => removeFavourite(f.id)} hitSlop={10}>
                      <Ionicons name="close-circle-outline" size={22} color={palette.muted} />
                    </Pressable>
                  </View>
                </View>
              ))
            )}
          </Card>
        </Section>

        <Section title="Account">
          <Card className="py-1">
            {ACCOUNT_ITEMS.map((item, i) => (
              <View key={item.label}>
                {i > 0 && <Divider />}
                <AccountRow icon={item.icon} label={item.label} />
              </View>
            ))}
          </Card>
          <View className="mt-4">
            <Button label="Log out" icon="log-out-outline" variant="danger" onPress={logOut} />
          </View>
        </Section>
      </ScrollView>
    </View>
  );
}
