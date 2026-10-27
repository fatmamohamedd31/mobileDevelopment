
import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { BottomNav, styles } from '../components/ui';
import type { Screen } from '../components/ui';

import BranchDetailsScreen from "../components/screens/fatma'sScreens/BranchDetailsScreen";
import HomeScreen from "../components/screens/fatma'sScreens/HomeScreen";
import SearchScreen from "../components/screens/fatma'sScreens/searchScreen";

import BranchComparisonScreen from "../components/screens/hana'sScreens/BranchComparisonScreen";
import LiveQueueStatusScreen from "../components/screens/hana'sScreens/LiveQueueStatusScreen";
import QueueTrendsScreen from "../components/screens/hana'sScreens/QueueTrendsScreen";

import BestTimeScreen from "../components/screens/laila'sScreens/BestTimeScreen";
import VisitPlannerScreen from "../components/screens/laila'sScreens/PlannerScreen";
import NotificationsScreen from "../components/screens/laila'sScreens/AlertsScreen";

export default function Index() {
  const [screen, setScreen] = useState<Screen>('home');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const openBranch = () => setScreen('branch');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {screen === 'home' && (
        <HomeScreen
          setScreen={setScreen}
          setCategory={setCategory}
          openBranch={openBranch}
          query={query}
          setQuery={setQuery}
        />
      )}

      {screen === 'search' && (
        <SearchScreen
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          openBranch={openBranch}
        />
      )}

      {screen === 'branch' && (
        <BranchDetailsScreen
          goBack={() => setScreen('search')}
        />
      )}

      {screen === 'queue' && (
        <LiveQueueStatusScreen
          goBack={() => setScreen('home')}
        />
      )}

      {screen === 'compare' && (
        <BranchComparisonScreen
          goBack={() => setScreen('home')}
          openQueue={() => setScreen('queue')}
        />
      )}

      {screen === 'trends' && (
        <QueueTrendsScreen
          goBack={() => setScreen('queue')}
        />
      )}

      {(screen as string) === 'bestTime' && (
        <BestTimeScreen
          goBack={() => setScreen('home')}
          onPlanVisit={() => setScreen('planner' as Screen)}
        />
      )}

      {(screen as string) === 'planner' && (
        <VisitPlannerScreen
          goBack={() => setScreen('bestTime' as Screen)}
        />
      )}

      {(screen as string) === 'notifications' && (
        <NotificationsScreen
          goBack={() => setScreen('home')}
        />
      )}

      <BottomNav
        active={screen}
        onSelect={setScreen}
      />
    </SafeAreaView>
  );
}
