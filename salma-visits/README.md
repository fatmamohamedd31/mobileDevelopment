# QueueLess - Screens 10-12 (Visits & User Activity)

React Native (Expo Router) + NativeWind v4.

| Screen | File |
|---|---|
| 10 - Visit History | `src/screens/VisitHistoryScreen.tsx` |
| 11 - Check-In & Queue Report | `src/screens/CheckInScreen.tsx` |
| 12 - Personal Statistics & Profile Settings | `src/screens/ProfileScreen.tsx` |

## Run it

```bash
npx create-expo-app@latest queueless      # pick the SDK that matches your Expo Go app
cd queueless
npm run reset-project                      # answer "n" (delete the example files)

npx expo install nativewind react-native-reanimated react-native-safe-area-context
npm install -D tailwindcss@^3.4.17

# copy this folder's contents into the project, replacing files:
#   theme.js, tailwind.config.js, babel.config.js, metro.config.js, global.css,
#   nativewind-env.d.ts, src/

npx expo start -c
```

Routes live in `src/app` (the current Expo template uses `src/app`, not `app`).
If your project has a root `app/` folder AND `src/app/`, delete the root one.

## Project layout

```
theme.js                 colour palette ("Tide & Saffron") - single source of truth
tailwind.config.js       feeds the palette into Tailwind class names
src/app/                 routes only (each file re-exports a screen)
src/screens/             the 3 screens
src/components/ui.tsx    shared Button, Card, Chip, StatTile, ScreenHeader ...
src/data/mock.ts         mock data + types (swap for API calls, see TODO comments)
src/lib/format.ts        date / duration helpers
```
