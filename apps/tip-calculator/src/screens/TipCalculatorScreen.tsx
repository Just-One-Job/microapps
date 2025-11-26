import React from "react";
import { View, StyleSheet, ScrollView, Text, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { BillInput } from "../components/BillInput";
import { TipPercentageSelector } from "../components/TipPercentageSelector";
import { SplitSelector } from "../components/SplitSelector";
import { ResultSummary } from "../components/ResultSummary";
import { ThemeToggle } from "../components/ThemeToggle";
import { useTipCalculator } from "../hooks/useTipCalculator";
import { useTheme, spacing } from "@just-one-job/theme";

export const TipCalculatorScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 380;
  const { colors, isDark } = useTheme();
  const {
    state,
    result,
    setBillAmount,
    setTipPercent,
    incrementSplit,
    decrementSplit,
    setSplitCount,
  } = useTipCalculator();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              { color: colors.text },
              isSmallDevice && styles.titleSmall,
            ]}
          >
            Tip & Split
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: colors.textSecondary },
              isSmallDevice && styles.subtitleSmall,
            ]}
          >
            Calculate tips and split bills
          </Text>
        </View>
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

        {state.billAmount > 0 && (
          <ResultSummary result={result} splitCount={state.splitCount} />
        )}

        <SplitSelector
          value={state.splitCount}
          onIncrement={incrementSplit}
          onDecrement={decrementSplit}
          onChange={setSplitCount}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: spacing.xs / 2,
  },
  titleSmall: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  subtitleSmall: {
    fontSize: 11,
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
