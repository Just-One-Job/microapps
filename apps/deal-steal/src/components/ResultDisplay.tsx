import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, spacing } from '@just-one-job/theme';
import { DiscountResult } from '../types';

interface ResultDisplayProps {
  result: DiscountResult;
  markedPrice: number;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  markedPrice,
}) => {
  const { colors } = useTheme();

  const formatCurrency = (amount: number): string => {
    if (amount === 0 && markedPrice === 0) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const hasValidCalculation = markedPrice > 0 && result.discountAmount > 0;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={styles.resultSection}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          Final Price
        </Text>
        <Text style={[styles.finalPrice, { color: colors.text }]}>
          {formatCurrency(result.finalPrice)}
        </Text>
      </View>

      {hasValidCalculation && (
        <View
          style={[
            styles.savingsSection,
            { borderTopColor: colors.border },
          ]}
        >
          <Text style={[styles.savingsLabel, { color: colors.textSecondary }]}>
            You save
          </Text>
          <Text style={[styles.savingsAmount, { color: colors.primary }]}>
            {formatCurrency(result.discountAmount)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderWidth: 1,
    gap: spacing.lg,
  },
  resultSection: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  finalPrice: {
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: -1,
  },
  savingsSection: {
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
  },
  savingsLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  savingsAmount: {
    fontSize: 32,
    fontWeight: '700',
  },
});

