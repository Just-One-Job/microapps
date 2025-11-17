import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useTheme, spacing } from '@just-one-job/theme';
import { triggerHaptic } from '@just-one-job/utils';

interface DiscountSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const PRESET_DISCOUNTS = [10, 20, 30, 40, 50];

export const DiscountSelector: React.FC<DiscountSelectorProps> = ({
  value,
  onChange,
}) => {
  const { colors } = useTheme();
  const [displayValue, setDisplayValue] = useState(
    value > 0 ? value.toString() : ''
  );
  const [showValidationError, setShowValidationError] = useState(false);

  const handlePresetPress = (percent: number) => {
    triggerHaptic('light');
    setDisplayValue(percent.toString());
    onChange(percent);
    setShowValidationError(false);
  };

  const handleManualInput = (text: string) => {
    // Remove non-numeric characters except decimal
    let numericText = text.replace(/[^0-9.]/g, '');
    // Prevent multiple decimals
    const parts = numericText.split('.');
    if (parts.length > 2) {
      numericText = parts[0] + '.' + parts.slice(1).join('');
    }

    setDisplayValue(numericText);
    const numericValue = parseFloat(numericText) || 0;

    if (numericValue > 100) {
      setShowValidationError(true);
      // Clamp to 100
      onChange(100);
    } else {
      setShowValidationError(false);
      onChange(numericValue);
    }
  };

  const handleClear = () => {
    triggerHaptic('medium');
    setDisplayValue('');
    onChange(0);
    setShowValidationError(false);
  };

  const isPresetSelected = (preset: number) => {
    return Math.abs(value - preset) < 0.01;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>Discount %</Text>

      {/* Preset buttons */}
      <View style={styles.presetContainer}>
        {PRESET_DISCOUNTS.map((preset) => {
          const isSelected = isPresetSelected(preset);
          return (
            <TouchableOpacity
              key={preset}
              style={[
                styles.presetButton,
                {
                  backgroundColor: isSelected
                    ? colors.primary
                    : colors.surface,
                  borderColor: isSelected ? colors.primary : colors.border,
                },
              ]}
              onPress={() => handlePresetPress(preset)}
            >
              <Text
                style={[
                  styles.presetButtonText,
                  {
                    color: isSelected
                      ? colors.surface
                      : colors.text,
                    fontWeight: isSelected ? '700' : '600',
                  },
                ]}
              >
                {preset}%
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Manual input */}
      <View
          style={[
          styles.inputContainer,
          {
            backgroundColor: colors.surface,
            borderColor: showValidationError
              ? colors.error
              : colors.border,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={displayValue}
          onChangeText={handleManualInput}
          placeholder="Enter %"
          placeholderTextColor={colors.textSecondary}
          keyboardType="decimal-pad"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        {displayValue.length > 0 && (
          <Text style={[styles.percentSymbol, { color: colors.text }]}>%</Text>
        )}
        {displayValue.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            style={styles.clearButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.clearButtonText, { color: colors.textSecondary }]}>
              ✕
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {showValidationError && (
        <Text style={[styles.validationError, { color: colors.error }]}>
          Discount can't exceed 100%
        </Text>
      )}
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
  presetContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
    flexWrap: 'wrap',
  },
  presetButton: {
    flex: 1,
    minWidth: '18%',
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    minHeight: 50,
  },
  presetButtonText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
  },
  percentSymbol: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  clearButton: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },
  clearButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  validationError: {
    fontSize: 12,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});

