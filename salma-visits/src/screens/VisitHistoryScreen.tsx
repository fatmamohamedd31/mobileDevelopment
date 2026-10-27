import { Ionicons } from '@expo/vector-icons';
import { memo, useCallback, useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import { palette } from '../../theme';
import { Button, Card, Chip, Divider, ScreenHeader, WaitBadge } from '../components/ui';
import { VISITS, type Visit } from '../data/mock';
import { fmtDate } from '../lib/format';

const FILTERS = ['All', 'Clinic', 'Bank', 'Government'] as const;
type Filter = (typeof FILTERS)[number];

const keyOf = (v: Visit) => v.id;
const Separator = () => <View className="h-3" />;

const VisitRow = memo(function VisitRow({ visit, onPress }: { visit: Visit; onPress: (v: Visit) => void }) {
  return (
    <Pressable onPress={() => onPress(visit)} className="active:opacity-80">
      <Card>
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-base font-bold text-ink" numberOfLines={1}>{visit.branch}</Text>
            <Text className="mt-0.5 text-sm text-muted">{visit.service}</Text>
          </View>
          <WaitBadge minutes={visit.actualWait} />
        </View>
        <View className="mt-3 flex-row items-center gap-1.5">
          <Ionicons name="calendar-outline" size={14} color={palette.muted} />
          <Text className="text-xs text-muted">{fmtDate(visit.date)} · {visit.arrivedAt}</Text>
          <Text className="ml-auto text-xs font-semibold text-tide">Details</Text>
          <Ionicons name="chevron-forward" size={14} color={palette.tide} />
        </View>
      </Card>
    </Pressable>
  );
});

const Filters = memo(function Filters({ value, onChange }: { value: Filter; onChange: (v: string) => void }) {
  return (
    <View className="flex-row flex-wrap gap-2 pb-4 pt-5">
      {FILTERS.map((f) => (
        <Chip key={f} label={f} active={f === value} onPress={onChange} />
      ))}
    </View>
  );
});

const DetailLine = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between py-3">
    <Text className="text-sm text-muted">{label}</Text>
    <Text className="text-sm font-semibold text-ink">{value}</Text>
  </View>
);

function VisitDetailSheet({ visit, onClose }: { visit: Visit | null; onClose: () => void }) {
  const diff = visit ? visit.actualWait - visit.predictedWait : 0;
  const saved = visit ? Math.max(0, visit.typicalWait - visit.actualWait) : 0;

  return (
    <Modal visible={!!visit} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-ink/50" onPress={onClose} />
      {visit ? (
        <View className="rounded-t-3xl bg-sand px-5 pb-8 pt-3">
          <View className="mb-4 h-1 w-10 self-center rounded-full bg-line" />
          <Text className="text-xl font-bold text-ink">{visit.branch}</Text>
          <Text className="mt-0.5 text-sm text-muted">{visit.address}</Text>

          <View className="mt-4 rounded-2xl border border-line bg-card px-4">
            <DetailLine label="Service" value={visit.service} />
            <Divider />
            <DetailLine label="Date" value={fmtDate(visit.date)} />
            <Divider />
            <DetailLine label="Arrived → served" value={`${visit.arrivedAt} → ${visit.servedAt}`} />
            <Divider />
            <DetailLine label="Actual wait" value={`${visit.actualWait} min`} />
            <Divider />
            <DetailLine label="Predicted wait" value={`${visit.predictedWait} min`} />
            <Divider />
            <DetailLine
              label="Prediction error"
              value={diff === 0 ? 'Exact' : `${diff > 0 ? '+' : ''}${diff} min`}
            />
            <Divider />
            <DetailLine label="Time saved vs. busy hours" value={`${saved} min`} />
          </View>

          <View className="mt-5">
            <Button label="Close" variant="outline" onPress={onClose} />
          </View>
        </View>
      ) : null}
    </Modal>
  );
}

export default function VisitHistoryScreen() {
  const [filter, setFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<Visit | null>(null);

  const data = useMemo(
    () => (filter === 'All' ? VISITS : VISITS.filter((v) => v.category === filter)),
    [filter],
  );

  const onFilter = useCallback((v: string) => setFilter(v as Filter), []);
  const onOpen = useCallback((v: Visit) => setSelected(v), []);
  const onClose = useCallback(() => setSelected(null), []);
  const renderItem = useCallback(
    ({ item }: { item: Visit }) => <VisitRow visit={item} onPress={onOpen} />,
    [onOpen],
  );

  const header = useMemo(() => <Filters value={filter} onChange={onFilter} />, [filter, onFilter]);

  return (
    <View className="flex-1 bg-sand">
      <ScreenHeader title="Visit history" subtitle={`${VISITS.length} visits logged`} />
      <FlatList
        data={data}
        keyExtractor={keyOf}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={header}
        ListEmptyComponent={<Text className="py-10 text-center text-muted">No visits in this category yet.</Text>}
        contentContainerClassName="px-4 pb-10"
        initialNumToRender={8}
        windowSize={7}
      />
      <VisitDetailSheet visit={selected} onClose={onClose} />
    </View>
  );
}
