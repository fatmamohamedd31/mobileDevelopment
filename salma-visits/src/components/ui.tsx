import { memo, type ComponentProps, type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette } from '../../theme';

export type IconName = ComponentProps<typeof Ionicons>['name'];

/* ---------- wait-time tone (green / amber / red) ---------- */
export type Tone = 'sage' | 'saffron' | 'coral';

// Full class names must be written out so Tailwind can see them.
export const TONE: Record<Tone, { bg: string; text: string; icon: string }> = {
  sage: { bg: 'bg-sage-soft', text: 'text-sage-dark', icon: palette['sage-dark'] },
  saffron: { bg: 'bg-saffron-soft', text: 'text-saffron-dark', icon: palette['saffron-dark'] },
  coral: { bg: 'bg-coral-soft', text: 'text-coral-dark', icon: palette['coral-dark'] },
};

export const waitTone = (minutes: number): Tone =>
  minutes <= 15 ? 'sage' : minutes <= 30 ? 'saffron' : 'coral';

/* ---------- layout ---------- */
export function ScreenHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { top } = useSafeAreaInsets();
  return (
    <View className="bg-tide px-5 pb-6 rounded-b-3xl" style={{ paddingTop: top + 12 }}>
      <Text className="text-2xl font-bold text-white">{title}</Text>
      {subtitle ? <Text className="mt-1 text-sm text-tide-soft">{subtitle}</Text> : null}
    </View>
  );
}

export const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <View className={`rounded-2xl border border-line bg-card p-4 ${className}`}>{children}</View>
);

export const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <View className="mt-6">
    <Text className="mb-2 px-1 text-xs font-bold uppercase tracking-widest text-muted">{title}</Text>
    {children}
  </View>
);

/* ---------- small pieces ---------- */
export const Chip = memo(function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: (label: string) => void;
}) {
  return (
    <Pressable
      onPress={() => onPress(label)}
      className={`rounded-full px-4 py-2 ${active ? 'bg-tide' : 'bg-mist'}`}
    >
      <Text className={`text-sm font-semibold ${active ? 'text-white' : 'text-tide-dark'}`}>{label}</Text>
    </Pressable>
  );
});

export const WaitBadge = memo(function WaitBadge({ minutes }: { minutes: number }) {
  const t = TONE[waitTone(minutes)];
  return (
    <View className={`rounded-full px-3 py-1 ${t.bg}`}>
      <Text className={`text-sm font-bold ${t.text}`}>{minutes} min</Text>
    </View>
  );
});

export const StatTile = memo(function StatTile({
  icon,
  label,
  value,
}: {
  icon: IconName;
  label: string;
  value: string;
}) {
  return (
    <View className="flex-1 items-center rounded-2xl bg-tide-soft px-2 py-4">
      <Ionicons name={icon} size={22} color={palette['tide-dark']} />
      <Text className="mt-2 text-xl font-bold text-ink">{value}</Text>
      <Text className="mt-0.5 text-center text-xs text-muted">{label}</Text>
    </View>
  );
});

type Variant = 'solid' | 'outline' | 'danger';
const BTN: Record<Variant, string> = {
  solid: 'bg-tide active:bg-tide-dark',
  outline: 'border border-tide',
  danger: 'bg-coral-soft',
};
const BTN_TEXT: Record<Variant, string> = {
  solid: 'text-white',
  outline: 'text-tide-dark',
  danger: 'text-coral-dark',
};
const BTN_ICON: Record<Variant, string> = {
  solid: '#FFFFFF',
  outline: palette['tide-dark'],
  danger: palette['coral-dark'],
};

export function Button({
  label,
  onPress,
  icon,
  variant = 'solid',
  disabled,
}: {
  label: string;
  onPress: () => void;
  icon?: IconName;
  variant?: Variant;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`flex-row items-center justify-center gap-2 rounded-2xl px-5 py-4 ${BTN[variant]} ${disabled ? 'opacity-40' : ''}`}
    >
      {icon ? <Ionicons name={icon} size={20} color={BTN_ICON[variant]} /> : null}
      <Text className={`text-base font-bold ${BTN_TEXT[variant]}`}>{label}</Text>
    </Pressable>
  );
}

export const Divider = () => <View className="h-px bg-line" />;
