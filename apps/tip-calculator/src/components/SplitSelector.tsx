import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, useWindowDimensions } from 'react-native';
import { useTheme, spacing } from '@just-one-job/theme';
import { triggerHaptic } from '@just-one-job/utils';

interface SplitSelectorProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (value: number) => void;
}

export const SplitSelector: React.FC<SplitSelectorProps> = ({
  value,
  onIncrement,
  onDecrement,
  onChange,
}) => {
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 380;
  const { colors } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value.toString());

  const handleIncrement = () => {
    triggerHaptic('light');
    onIncrement();
  };

  const handleDecrement = () => {
    triggerHaptic('light');
    onDecrement();
  };

  const handleEditPress = () => {
    triggerHaptic('light');
    setIsEditing(true);
    setEditValue(value.toString());
  };

  const handleEditSubmit = () => {
    const numValue = parseInt(editValue, 10);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 1000) {
      triggerHaptic('success');
      onChange(numValue);
      setIsEditing(false);
    } else {
      // Reset to current value if invalid
      setEditValue(value.toString());
      setIsEditing(false);
    }
  };

  const handleEditBlur = () => {
    handleEditSubmit();
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          { color: colors.text },
          isSmallDevice && styles.labelSmall,
        ]}
      >
        Split Bill
      </Text>
      <View
        style={[
          styles.selectorContainer,
          { backgroundColor: colors.surface, borderColor: colors.border },
          isSmallDevice && styles.selectorContainerSmall,
        ]}
      >
        <TouchableOpacity
          style={[
            styles.button,
            isSmallDevice && styles.buttonSmall,
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
        <TouchableOpacity
          style={styles.valueContainer}
          onPress={handleEditPress}
          activeOpacity={0.7}
        >
          {isEditing ? (
            <TextInput
              style={[
                styles.valueInput,
                { color: colors.text },
                isSmallDevice && styles.valueInputSmall,
              ]}
              value={editValue}
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, '');
                if (numericText === '' || (parseInt(numericText, 10) >= 1 && parseInt(numericText, 10) <= 1000)) {
                  setEditValue(numericText);
                }
              }}
              onBlur={handleEditBlur}
              onSubmitEditing={handleEditSubmit}
              keyboardType="number-pad"
              autoFocus
              selectTextOnFocus
            />
          ) : (
            <>
              <Text
                style={[
                  styles.valueText,
                  { color: colors.text },
                  isSmallDevice && styles.valueTextSmall,
                ]}
              >
                {value}
              </Text>
              <Text
                style={[
                  styles.valueLabel,
                  { color: colors.textSecondary },
                  isSmallDevice && styles.valueLabelSmall,
                ]}
              >
                {value === 1 ? 'person' : 'people'}
              </Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }, isSmallDevice && styles.buttonSmall]}
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
  labelSmall: {
    fontSize: 15,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: spacing.sm,
    borderWidth: 1,
  },
  selectorContainerSmall: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSmall: {
    width: 44,
    height: 44,
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
  valueTextSmall: {
    fontSize: 28,
  },
  valueInput: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    minWidth: 80,
  },
  valueInputSmall: {
    fontSize: 28,
    minWidth: 70,
  },
  valueLabel: {
    fontSize: 14,
    marginTop: spacing.xs,
  },
  valueLabelSmall: {
    fontSize: 13,
  },
});
