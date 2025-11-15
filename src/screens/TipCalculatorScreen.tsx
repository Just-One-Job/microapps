import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BillInput } from '../components/BillInput';
import { TipPercentageSelector } from '../components/TipPercentageSelector';
import { SplitSelector } from '../components/SplitSelector';
import { ResultSummary } from '../components/ResultSummary';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTipCalculator } from '../hooks/useTipCalculator';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';

export const TipCalculatorScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const {
    state,
    result,
    setBillAmount,
    setTipPercent,
    incrementSplit,
    decrementSplit,
  } = useTipCalculator();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={styles.header}>
        <ThemeToggle />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <BillInput value={state.billAmount} onChange={setBillAmount} />

        <TipPercentageSelector
          value={state.tipPercent}
          onChange={setTipPercent}
        />

        <SplitSelector
          value={state.splitCount}
          onIncrement={incrementSplit}
          onDecrement={decrementSplit}
        />

        {state.billAmount > 0 && (
          <ResultSummary result={result} splitCount={state.splitCount} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: spacing.md,
    paddingBottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
});

