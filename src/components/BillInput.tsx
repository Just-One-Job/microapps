import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';
import { triggerHaptic } from '../utils/haptics';

interface BillInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const BillInput: React.FC<BillInputProps> = ({ value, onChange }) => {
  const { colors } = useTheme();
  const [displayValue, setDisplayValue] = useState(value > 0 ? value.toString() : '');

  const handleNumberPress = (num: string) => {
    triggerHaptic('light');
    const newValue = displayValue + num;
    // Limit to reasonable bill amount (max $999,999.99)
    const numericValue = parseFloat(newValue) || 0;
    if (numericValue <= 999999.99) {
      setDisplayValue(newValue);
      onChange(numericValue);
    } else {
      // Provide haptic feedback for invalid input
      triggerHaptic('error');
    }
  };

  const handleBackspace = () => {
    triggerHaptic('light');
    const newValue = displayValue.slice(0, -1);
    setDisplayValue(newValue);
    const numericValue = parseFloat(newValue) || 0;
    onChange(numericValue);
  };

  const handleClear = () => {
    triggerHaptic('medium');
    setDisplayValue('');
    onChange(0);
  };

  const handleDecimal = () => {
    triggerHaptic('light');
    // Only allow decimal if there's already a number and no decimal exists
    if (displayValue && !displayValue.includes('.')) {
      const newValue = displayValue + '.';
      setDisplayValue(newValue);
    } else if (!displayValue) {
      // If empty, start with "0."
      const newValue = '0.';
      setDisplayValue(newValue);
      onChange(0);
    }
  };

  const formatCurrency = (amount: number): string => {
    if (amount === 0) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const numericButtons = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '⌫'],
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>Bill Amount</Text>
      <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.currencySymbol, { color: colors.text }]}>$</Text>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={displayValue}
          onChangeText={(text) => {
            // Remove non-numeric characters except decimal
            let numericText = text.replace(/[^0-9.]/g, '');
            // Prevent multiple decimals
            const parts = numericText.split('.');
            if (parts.length > 2) {
              numericText = parts[0] + '.' + parts.slice(1).join('');
            }
            // Limit to reasonable amount
            const numericValue = parseFloat(numericText) || 0;
            if (numericValue <= 999999.99) {
              setDisplayValue(numericText);
              onChange(numericValue);
            }
          }}
          placeholder="0.00"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        {value > 0 && (
          <Text style={[styles.formattedValue, { color: colors.textSecondary }]}>{formatCurrency(value)}</Text>
        )}
      </View>

      <View style={styles.keypad}>
        {numericButtons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keypadRow}>
            {row.map((button) => {
              if (button === '⌫') {
                return (
                  <TouchableOpacity
                    key={button}
                    style={[styles.keypadButton, { backgroundColor: colors.background, borderColor: colors.border }]}
                    onPress={handleBackspace}
                    onLongPress={handleClear}
                  >
                    <Text style={[styles.keypadButtonText, { color: colors.text }]}>{button}</Text>
                  </TouchableOpacity>
                );
              }
              if (button === '.') {
                return (
                  <TouchableOpacity
                    key={button}
                    style={[styles.keypadButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
                    onPress={handleDecimal}
                  >
                    <Text style={[styles.keypadButtonText, { color: colors.text }]}>{button}</Text>
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity
                  key={button}
                  style={[styles.keypadButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
                  onPress={() => handleNumberPress(button)}
                >
                  <Text style={[styles.keypadButtonText, { color: colors.text }]}>{button}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '600',
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    minWidth: 100,
  },
  formattedValue: {
    fontSize: 18,
    marginLeft: spacing.sm,
  },
  keypad: {
    gap: spacing.sm,
  },
  keypadRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  keypadButton: {
    flex: 1,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    minHeight: 60,
  },
  keypadButtonText: {
    fontSize: 24,
    fontWeight: '600',
  },
});

