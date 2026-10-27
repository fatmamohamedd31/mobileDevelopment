import type { ComponentProps } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '../../../theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

// Static config: defined once, not on every render.
const TAB_ICONS: Record<string, IconName> = {
  history: 'time-outline',
  checkin: 'location-outline',
  profile: 'person-outline',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: palette.tide,
        tabBarInactiveTintColor: palette.muted,
        tabBarStyle: { backgroundColor: palette.card, borderTopColor: palette.line },
        tabBarLabelStyle: { fontWeight: '600', fontSize: 11 },
        tabBarIcon: ({ color, size }) => <Ionicons name={TAB_ICONS[route.name]} size={size} color={color} />,
      })}
    >
      <Tabs.Screen name="history" options={{ title: 'History' }} />
      <Tabs.Screen name="checkin" options={{ title: 'Check in' }} />
      <Tabs.Screen name="profile" options={{ title: 'Me' }} />
    </Tabs>
  );
}
