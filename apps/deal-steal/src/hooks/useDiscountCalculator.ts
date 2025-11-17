import { useState, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DiscountState, DiscountResult } from '../types';

const STORAGE_KEY = '@deal_steal_discount_percent';

const initialState: DiscountState = {
  markedPrice: 0,
  discountPercent: 0,
};

export const useDiscountCalculator = () => {
  const [state, setState] = useState<DiscountState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved discount percent on mount
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedDiscountPercent = await AsyncStorage.getItem(STORAGE_KEY);
        const discountPercent = savedDiscountPercent
          ? parseFloat(savedDiscountPercent)
          : 0;

        setState((prev) => ({
          ...prev,
          discountPercent: isNaN(discountPercent) ? 0 : Math.max(0, Math.min(100, discountPercent)),
        }));
      } catch (error) {
        console.error('Failed to load preferences:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadPreferences();
  }, []);

  const result: DiscountResult = useMemo(() => {
    const { markedPrice, discountPercent } = state;

    if (markedPrice <= 0 || discountPercent <= 0) {
      return {
        discountAmount: 0,
        finalPrice: markedPrice > 0 ? markedPrice : 0,
      };
    }

    // Clamp discount percent to 0-100
    const clampedDiscount = Math.max(0, Math.min(100, discountPercent));
    const discountAmount = (markedPrice * clampedDiscount) / 100;
    const finalPrice = markedPrice - discountAmount;

    return {
      discountAmount: Math.round(discountAmount * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
    };
  }, [state]);

  const setMarkedPrice = (price: number) => {
    setState((prev) => ({ ...prev, markedPrice: Math.max(0, price) }));
  };

  const setDiscountPercent = async (percent: number) => {
    // Clamp to 0-100
    const clampedPercent = Math.max(0, Math.min(100, percent));
    setState((prev) => ({ ...prev, discountPercent: clampedPercent }));
    try {
      await AsyncStorage.setItem(STORAGE_KEY, clampedPercent.toString());
    } catch (error) {
      console.error('Failed to save discount percent:', error);
    }
  };

  return {
    state,
    result,
    isLoaded,
    setMarkedPrice,
    setDiscountPercent,
  };
};

