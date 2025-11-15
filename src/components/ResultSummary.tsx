import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';
import { TipResult } from '../types';

interface ResultSummaryProps {
  result: TipResult;
  splitCount: number;
}

export const ResultSummary: React.FC<ResultSummaryProps> = ({
  result,
  splitCount,
}) => {
  const { colors } = useTheme();

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Summary</Text>
      <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Tip Amount</Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>{formatCurrency(result.tipAmount)}</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Total with Tip</Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {formatCurrency(result.totalWithTip)}
          </Text>
        </View>
        {splitCount > 1 && (
          <>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                Per Person ({splitCount} {splitCount === 1 ? 'person' : 'people'})
              </Text>
              <Text style={[styles.summaryValue, styles.perPersonValue, { color: colors.primary }]}>
                {formatCurrency(result.perPersonTotal)}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  summaryCard: {
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  perPersonValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginVertical: spacing.sm,
  },
});

