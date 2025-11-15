import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/spacing';
import { triggerHaptic } from '../utils/haptics';

export const ThemeToggle: React.FC = () => {
  const { colors, isDark, toggleTheme } = useTheme();

  const handleToggle = () => {
    triggerHaptic('light');
    toggleTheme();
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={handleToggle}
      activeOpacity={0.7}
    >
      <View style={[styles.track, { backgroundColor: isDark ? colors.primary : colors.border }]}>
        <View
          style={[
            styles.thumb,
            {
              backgroundColor: colors.surface,
              transform: [{ translateX: isDark ? 20 : 0 }],
            },
          ]}
        />
      </View>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {isDark ? '🌙' : '☀️'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    borderWidth: 1,
  },
  track: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    padding: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 16,
  },
});

