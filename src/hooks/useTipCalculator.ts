import { useState, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TipState, TipResult } from '../types';

const STORAGE_KEYS = {
  TIP_PERCENT: '@tip_calculator_tip_percent',
  SPLIT_COUNT: '@tip_calculator_split_count',
};

const initialState: TipState = {
  billAmount: 0,
  tipPercent: 15,
  splitCount: 1,
};

export const useTipCalculator = () => {
  const [state, setState] = useState<TipState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const [savedTipPercent, savedSplitCount] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.TIP_PERCENT),
          AsyncStorage.getItem(STORAGE_KEYS.SPLIT_COUNT),
        ]);

        const tipPercent = savedTipPercent ? parseFloat(savedTipPercent) : 15;
        const splitCount = savedSplitCount ? parseInt(savedSplitCount, 10) : 1;

        setState((prev) => ({
          ...prev,
          tipPercent: isNaN(tipPercent) ? 15 : tipPercent,
          splitCount: isNaN(splitCount) ? 1 : Math.max(1, splitCount),
        }));
      } catch (error) {
        console.error('Failed to load preferences:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadPreferences();
  }, []);

  const result: TipResult = useMemo(() => {
    const { billAmount, tipPercent, splitCount } = state;
    
    if (billAmount <= 0) {
      return {
        tipAmount: 0,
        totalWithTip: 0,
        perPersonTotal: 0,
      };
    }

    const tipAmount = (billAmount * tipPercent) / 100;
    const totalWithTip = billAmount + tipAmount;
    const perPersonTotal = splitCount > 0 ? totalWithTip / splitCount : totalWithTip;

    return {
      tipAmount: Math.round(tipAmount * 100) / 100,
      totalWithTip: Math.round(totalWithTip * 100) / 100,
      perPersonTotal: Math.round(perPersonTotal * 100) / 100,
    };
  }, [state]);

  const setBillAmount = (amount: number) => {
    setState((prev) => ({ ...prev, billAmount: amount }));
  };

  const setTipPercent = async (percent: number) => {
    setState((prev) => ({ ...prev, tipPercent: percent }));
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TIP_PERCENT, percent.toString());
    } catch (error) {
      console.error('Failed to save tip percent:', error);
    }
  };

  const setSplitCount = async (count: number) => {
    const newCount = Math.max(1, count);
    setState((prev) => ({ ...prev, splitCount: newCount }));
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SPLIT_COUNT, newCount.toString());
    } catch (error) {
      console.error('Failed to save split count:', error);
    }
  };

  const incrementSplit = async () => {
    setState((prev) => {
      const newCount = prev.splitCount + 1;
      AsyncStorage.setItem(STORAGE_KEYS.SPLIT_COUNT, newCount.toString()).catch(
        (error) => console.error('Failed to save split count:', error)
      );
      return { ...prev, splitCount: newCount };
    });
  };

  const decrementSplit = async () => {
    setState((prev) => {
      const newCount = Math.max(1, prev.splitCount - 1);
      AsyncStorage.setItem(STORAGE_KEYS.SPLIT_COUNT, newCount.toString()).catch(
        (error) => console.error('Failed to save split count:', error)
      );
      return { ...prev, splitCount: newCount };
    });
  };

  return {
    state,
    result,
    isLoaded,
    setBillAmount,
    setTipPercent,
    setSplitCount,
    incrementSplit,
    decrementSplit,
  };
};

