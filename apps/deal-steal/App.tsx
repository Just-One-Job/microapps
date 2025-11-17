import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@just-one-job/theme';
import { DealStealScreen } from './src/screens/DealStealScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider storageKey="@deal_steal_theme">
        <DealStealScreen />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

