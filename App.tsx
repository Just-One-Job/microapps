import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme/ThemeContext';
import { TipCalculatorScreen } from './src/screens/TipCalculatorScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TipCalculatorScreen />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
