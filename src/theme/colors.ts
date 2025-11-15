export const lightColors = {
  primary: '#007AFF',
  primaryDark: '#0051D5',
  secondary: '#5856D6',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#6D6D70',
  border: '#C6C6C8',
  success: '#34C759',
  error: '#FF3B30',
  disabled: '#C7C7CC',
};

export const darkColors = {
  primary: '#0A84FF',
  primaryDark: '#0051D5',
  secondary: '#5E5CE6',
  background: '#000000',
  surface: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#98989D',
  border: '#38383A',
  success: '#30D158',
  error: '#FF453A',
  disabled: '#48484A',
};

export type ColorScheme = 'light' | 'dark';

export const getColors = (scheme: ColorScheme) => {
  return scheme === 'dark' ? darkColors : lightColors;
};

