import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { PriceInput } from '../components/PriceInput';
import { DiscountSelector } from '../components/DiscountSelector';
import { ResultDisplay } from '../components/ResultDisplay';
import { ThemeToggle } from '../components/ThemeToggle';
import { useDiscountCalculator } from '../hooks/useDiscountCalculator';
import { useTheme, spacing } from '@just-one-job/theme';

export const DealStealScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const { state, result, setMarkedPrice, setDiscountPercent } =
    useDiscountCalculator();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            Deal & Steal
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Get the deal, steal the price
          </Text>
        </View>
        <ThemeToggle />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <PriceInput value={state.markedPrice} onChange={setMarkedPrice} />

        <DiscountSelector
          value={state.discountPercent}
          onChange={setDiscountPercent}
        />

        {state.markedPrice > 0 && (
          <ResultDisplay
            result={result}
            markedPrice={state.markedPrice}
          />
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.xs / 2,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingTop: 0,
    paddingBottom: spacing.xl,
  },
});

