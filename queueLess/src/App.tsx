import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { BottomNav, styles } from './components/ui';
import type { Screen } from './components/ui';

import HomeScreen from "./components/screens/fatma'sScreens/HomeScreen";
import SearchScreen from "./components/screens/fatma'sScreens/searchScreen";
import BranchDetailsScreen from "./components/screens/fatma'sScreens/BranchDetailsScreen";

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const openBranch = () => {
    setScreen('branch');
  };

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

      <BottomNav
        active={screen}
        onSelect={setScreen}
      />
    </SafeAreaView>
  );
}