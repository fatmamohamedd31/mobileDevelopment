
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: 'QueueLess', headerShown: false }}
        />
        <Stack.Screen
          name="explore"
          options={{ title: 'Explore' }}
        />
      </Stack>
    </ThemeProvider>
  );
}
