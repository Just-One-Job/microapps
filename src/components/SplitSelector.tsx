import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';
import { triggerHaptic } from '../utils/haptics';

interface SplitSelectorProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const SplitSelector: React.FC<SplitSelectorProps> = ({
  value,
  onIncrement,
  onDecrement,
}) => {
  const { colors } = useTheme();

  const handleIncrement = () => {
    triggerHaptic('light');
    onIncrement();
  };

  const handleDecrement = () => {
    triggerHaptic('light');
    onDecrement();
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>Split Bill</Text>
      <View style={[styles.selectorContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: value <= 1 ? colors.disabled : colors.primary },
          ]}
          onPress={handleDecrement}
          disabled={value <= 1}
        >
          <Text
            style={[
              styles.buttonText,
              { color: value <= 1 ? colors.textSecondary : colors.surface },
            ]}
          >
            −
          </Text>
        </TouchableOpacity>
        <View style={styles.valueContainer}>
          <Text style={[styles.valueText, { color: colors.text }]}>{value}</Text>
          <Text style={[styles.valueLabel, { color: colors.textSecondary }]}>
            {value === 1 ? 'person' : 'people'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleIncrement}
        >
          <Text style={[styles.buttonText, { color: colors.surface }]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: spacing.sm,
    borderWidth: 1,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
  },
  valueContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  valueText: {
    fontSize: 32,
    fontWeight: '700',
  },
  valueLabel: {
    fontSize: 14,
    marginTop: spacing.xs,
  },
});

