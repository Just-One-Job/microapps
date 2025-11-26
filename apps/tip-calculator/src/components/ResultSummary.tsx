import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme, spacing } from '@just-one-job/theme';
import { TipResult } from '../types';

interface ResultSummaryProps {
  result: TipResult;
  splitCount: number;
}

export const ResultSummary: React.FC<ResultSummaryProps> = ({
  result,
  splitCount,
}) => {
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 380;
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
      <Text
        style={[
          styles.title,
          { color: colors.text },
          isSmallDevice && styles.titleSmall,
        ]}
      >
        Summary
      </Text>
      <View
        style={[
          styles.summaryCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
          isSmallDevice && styles.summaryCardSmall,
        ]}
      >
        <View style={styles.summaryRow}>
          <Text
            style={[
              styles.summaryLabel,
              { color: colors.textSecondary },
              isSmallDevice && styles.summaryLabelSmall,
            ]}
          >
            Tip Amount
          </Text>
          <Text
            style={[
              styles.summaryValue,
              { color: colors.text },
              isSmallDevice && styles.summaryValueSmall,
            ]}
          >
            {formatCurrency(result.tipAmount)}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.summaryRow}>
          <Text
            style={[
              styles.summaryLabel,
              { color: colors.textSecondary },
              isSmallDevice && styles.summaryLabelSmall,
            ]}
          >
            Total with Tip
          </Text>
          <Text
            style={[
              styles.summaryValue,
              { color: colors.text },
              isSmallDevice && styles.summaryValueSmall,
            ]}
          >
            {formatCurrency(result.totalWithTip)}
          </Text>
        </View>
        {splitCount > 1 && (
          <>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.summaryRow}>
              <Text
                style={[
                  styles.summaryLabel,
                  { color: colors.textSecondary },
                  isSmallDevice && styles.summaryLabelSmall,
                ]}
              >
                Per Person ({splitCount} {splitCount === 1 ? 'person' : 'people'})
              </Text>
              <Text
                style={[
                  styles.summaryValue,
                  styles.perPersonValue,
                  { color: colors.primary },
                  isSmallDevice && styles.perPersonValueSmall,
                ]}
              >
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
  titleSmall: {
    fontSize: 18,
  },
  summaryCard: {
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
  },
  summaryCardSmall: {
    padding: spacing.md,
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
  summaryLabelSmall: {
    fontSize: 15,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  summaryValueSmall: {
    fontSize: 17,
  },
  perPersonValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  perPersonValueSmall: {
    fontSize: 19,
  },
  divider: {
    height: 1,
    marginVertical: spacing.sm,
  },
});
