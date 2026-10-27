import { Ionicons } from '@expo/vector-icons';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { palette } from '../../theme';
import { Button, Card, Chip, ScreenHeader, Section, TONE, waitTone, type IconName } from '../components/ui';
import { LIVE_REPORTS, NEARBY_BRANCHES, type NearbyBranch } from '../data/mock';
import { mmss } from '../lib/format';

const MAX_DISTANCE_M = 200; // FR6: check-in only when the user is near the branch
const WAIT_OPTIONS = [5, 10, 15, 20, 30, 45, 60];
type Phase = 'idle' | 'waiting' | 'done';

/* Seconds since `startedAt`. Ticks once a second only while a check-in is running. */
function useElapsed(startedAt: number | null) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (startedAt === null) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [startedAt]);
  return startedAt === null ? 0 : Math.max(0, Math.floor((now - startedAt) / 1000));
}

/* ---------- branch picker row ---------- */
const BranchOption = memo(function BranchOption({
  branch,
  selected,
  locked,
  onPress,
}: {
  branch: NearbyBranch;
  selected: boolean;
  locked: boolean;
  onPress: (id: string) => void;
}) {
  const near = branch.distance <= MAX_DISTANCE_M;
  const tone = TONE[near ? 'sage' : 'coral'];
  return (
    <Pressable
      disabled={locked}
      onPress={() => onPress(branch.id)}
      className={`flex-row items-center rounded-2xl border p-4 ${selected ? 'border-tide bg-tide-soft' : 'border-line bg-card'} ${locked && !selected ? 'opacity-40' : ''}`}
    >
      <Ionicons
        name={selected ? 'radio-button-on' : 'radio-button-off'}
        size={22}
        color={selected ? palette.tide : palette.muted}
      />
      <View className="ml-3 flex-1">
        <Text className="text-base font-bold text-ink">{branch.name}</Text>
        <Text className="text-xs text-muted">{branch.category}</Text>
      </View>
      <View className={`rounded-full px-3 py-1 ${tone.bg}`}>
        <Text className={`text-xs font-bold ${tone.text}`}>
          {branch.distance} m · {near ? 'in range' : 'too far'}
        </Text>
      </View>
    </Pressable>
  );
});

/* ---------- queue-length stepper ---------- */
const RoundButton = ({ icon, onPress }: { icon: IconName; onPress: () => void }) => (
  <Pressable onPress={onPress} className="h-11 w-11 items-center justify-center rounded-full bg-tide active:bg-tide-dark">
    <Ionicons name={icon} size={22} color="#FFFFFF" />
  </Pressable>
);

const Stepper = memo(function Stepper({ value, onChange }: { value: number; onChange: (delta: number) => void }) {
  return (
    <View className="flex-row items-center justify-center gap-8">
      <RoundButton icon="remove" onPress={() => onChange(-1)} />
      <View className="items-center">
        <Text className="text-4xl font-bold text-ink">{value}</Text>
        <Text className="text-xs text-muted">people ahead</Text>
      </View>
      <RoundButton icon="add" onPress={() => onChange(1)} />
    </View>
  );
});

/* ---------- screen ---------- */
export default function CheckInScreen() {
  const [branchId, setBranchId] = useState(NEARBY_BRANCHES[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finalSeconds, setFinalSeconds] = useState(0);
  const [queue, setQueue] = useState(5);
  const [waitEst, setWaitEst] = useState(15);
  const [share, setShare] = useState(true);
  const [sent, setSent] = useState(false);

  const branch = useMemo(() => NEARBY_BRANCHES.find((b) => b.id === branchId)!, [branchId]);
  const inRange = branch.distance <= MAX_DISTANCE_M;
  const elapsed = useElapsed(phase === 'waiting' ? startedAt : null);
  const live = useMemo(() => LIVE_REPORTS.filter((r) => r.branchId === branchId), [branchId]);

  const checkIn = useCallback(() => {
    // TODO: POST /checkins { branchId, arrivedAt } - server re-verifies location
    setStartedAt(Date.now());
    setSent(false);
    setPhase('waiting');
  }, []);

  const submitReport = useCallback(() => {
    // TODO: POST /queue-reports { branchId, queue, waitEst, shared: share }
    setSent(true);
  }, []);

  const finish = useCallback(() => {
    // TODO: PATCH /checkins/:id { servedAt } - becomes a Visit + WaitObservation
    setFinalSeconds(elapsed);
    setPhase('done');
  }, [elapsed]);

  const reset = useCallback(() => {
    setPhase('idle');
    setStartedAt(null);
  }, []);

  const changeQueue = useCallback((d: number) => setQueue((q) => Math.max(0, q + d)), []);
  const pickWait = useCallback((label: string) => setWaitEst(parseInt(label, 10)), []);

  return (
    <View className="flex-1 bg-sand">
      <ScreenHeader title="Check in" subtitle="Help others by sharing the queue as it is right now" />
      <ScrollView contentContainerClassName="px-4 pb-12" showsVerticalScrollIndicator={false}>

        <Section title="Where are you?">
          <View className="gap-2">
            {NEARBY_BRANCHES.map((b) => (
              <BranchOption
                key={b.id}
                branch={b}
                selected={b.id === branchId}
                locked={phase !== 'idle'}
                onPress={setBranchId}
              />
            ))}
          </View>
        </Section>

        {phase === 'idle' && (
          <View className="mt-5 gap-2">
            <Button label={`Check in at ${branch.name}`} icon="location" onPress={checkIn} disabled={!inRange} />
            {!inRange && (
              <Text className="px-1 text-center text-xs text-coral-dark">
                You must be within {MAX_DISTANCE_M} m of the branch to check in.
              </Text>
            )}
          </View>
        )}

        {phase === 'waiting' && (
          <>
            <Card className="mt-5 items-center bg-ink">
              <Text className="text-xs font-bold uppercase tracking-widest text-tide-soft">Waiting for</Text>
              <Text className="mt-1 text-5xl font-bold text-white">{mmss(elapsed)}</Text>
              <Text className="mt-1 text-xs text-tide-soft">at {branch.name}</Text>
            </Card>

            <Section title="Report the queue">
              <Card className="gap-5">
                <Stepper value={queue} onChange={changeQueue} />
                <View>
                  <Text className="mb-2 text-sm font-semibold text-ink">Estimated wait (minutes)</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {WAIT_OPTIONS.map((m) => (
                      <Chip key={m} label={`${m}m`} active={m === waitEst} onPress={pickWait} />
                    ))}
                  </View>
                </View>
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 pr-4">
                    <Text className="text-sm font-semibold text-ink">Share live with others</Text>
                    <Text className="text-xs text-muted">Your report appears anonymously for this branch.</Text>
                  </View>
                  <Switch
                    value={share}
                    onValueChange={setShare}
                    trackColor={{ false: palette.line, true: palette.tide }}
                    thumbColor="#FFFFFF"
                  />
                </View>
                <Button
                  label={sent ? (share ? 'Report shared ✓' : 'Report saved ✓') : 'Submit report'}
                  icon={sent ? 'checkmark-circle' : 'send'}
                  onPress={submitReport}
                  disabled={sent}
                />
              </Card>
            </Section>

            <View className="mt-4">
              <Button label="I've been served" variant="outline" icon="flag" onPress={finish} />
            </View>
          </>
        )}

        {phase === 'done' && (
          <Card className="mt-5 items-center gap-2">
            <Ionicons name="checkmark-circle" size={48} color={palette.sage} />
            <Text className="text-lg font-bold text-ink">Visit logged</Text>
            <Text className="text-center text-sm text-muted">
              You waited {Math.max(1, Math.round(finalSeconds / 60))} min at {branch.name}. It now appears in your
              history and helps improve predictions.
            </Text>
            <View className="mt-3 self-stretch">
              <Button label="Start a new check-in" variant="outline" onPress={reset} />
            </View>
          </Card>
        )}

        <Section title="Live from others">
          <Card className="gap-3">
            {live.length === 0 ? (
              <Text className="text-sm text-muted">No live reports yet. Be the first to share.</Text>
            ) : (
              live.map((r) => {
                const t = TONE[waitTone(r.minutes)];
                return (
                  <View key={r.id} className="flex-row items-center">
                    <View className={`h-10 w-10 items-center justify-center rounded-full ${t.bg}`}>
                      <Ionicons name="people" size={18} color={t.icon} />
                    </View>
                    <View className="ml-3 flex-1">
                      <Text className="text-sm font-semibold text-ink">
                        {r.queue} ahead · ~{r.minutes} min
                      </Text>
                      <Text className="text-xs text-muted">{r.ago}</Text>
                    </View>
                  </View>
                );
              })
            )}
          </Card>
        </Section>
      </ScrollView>
    </View>
  );
}
