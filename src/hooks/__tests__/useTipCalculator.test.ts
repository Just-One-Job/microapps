import { renderHook, act } from '@testing-library/react-native';
import { useTipCalculator } from '../useTipCalculator';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

describe('useTipCalculator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should calculate tip correctly for normal case', () => {
    const { result } = renderHook(() => useTipCalculator());

    act(() => {
      result.current.setBillAmount(100);
      result.current.setTipPercent(20);
    });

    expect(result.current.result.tipAmount).toBe(20);
    expect(result.current.result.totalWithTip).toBe(120);
    expect(result.current.result.perPersonTotal).toBe(120);
  });

  it('should calculate split correctly', () => {
    const { result } = renderHook(() => useTipCalculator());

    act(() => {
      result.current.setBillAmount(100);
      result.current.setTipPercent(20);
      result.current.setSplitCount(4);
    });

    expect(result.current.result.tipAmount).toBe(20);
    expect(result.current.result.totalWithTip).toBe(120);
    expect(result.current.result.perPersonTotal).toBe(30);
  });

  it('should handle rounding correctly', () => {
    const { result } = renderHook(() => useTipCalculator());

    act(() => {
      result.current.setBillAmount(100);
      result.current.setTipPercent(15);
      result.current.setSplitCount(3);
    });

    // 100 * 1.15 = 115, divided by 3 = 38.333... rounded to 38.33
    expect(result.current.result.totalWithTip).toBe(115);
    expect(result.current.result.perPersonTotal).toBe(38.33);
  });

  it('should handle edge case: bill amount is 0', () => {
    const { result } = renderHook(() => useTipCalculator());

    act(() => {
      result.current.setBillAmount(0);
      result.current.setTipPercent(20);
      result.current.setSplitCount(2);
    });

    expect(result.current.result.tipAmount).toBe(0);
    expect(result.current.result.totalWithTip).toBe(0);
    expect(result.current.result.perPersonTotal).toBe(0);
  });

  it('should handle edge case: very small bill amount', () => {
    const { result } = renderHook(() => useTipCalculator());

    act(() => {
      result.current.setBillAmount(0.01);
      result.current.setTipPercent(20);
    });

    expect(result.current.result.tipAmount).toBe(0);
    expect(result.current.result.totalWithTip).toBe(0.01);
  });

  it('should handle decimal tip percentages', () => {
    const { result } = renderHook(() => useTipCalculator());

    act(() => {
      result.current.setBillAmount(100);
      result.current.setTipPercent(17.5);
    });

    expect(result.current.result.tipAmount).toBe(17.5);
    expect(result.current.result.totalWithTip).toBe(117.5);
  });

  it('should handle large bill amounts', () => {
    const { result } = renderHook(() => useTipCalculator());

    act(() => {
      result.current.setBillAmount(99999.99);
      result.current.setTipPercent(20);
      result.current.setSplitCount(10);
    });

    expect(result.current.result.tipAmount).toBe(20000);
    expect(result.current.result.totalWithTip).toBe(119999.99);
    expect(result.current.result.perPersonTotal).toBe(12000);
  });

  it('should prevent split count from going below 1', () => {
    const { result } = renderHook(() => useTipCalculator());

    act(() => {
      result.current.setSplitCount(0);
    });

    expect(result.current.state.splitCount).toBe(1);
  });

  it('should increment and decrement split count correctly', () => {
    const { result } = renderHook(() => useTipCalculator());

    act(() => {
      result.current.incrementSplit();
    });
    expect(result.current.state.splitCount).toBe(2);

    act(() => {
      result.current.incrementSplit();
    });
    expect(result.current.state.splitCount).toBe(3);

    act(() => {
      result.current.decrementSplit();
    });
    expect(result.current.state.splitCount).toBe(2);

    act(() => {
      result.current.decrementSplit();
    });
    expect(result.current.state.splitCount).toBe(1);

    // Should not go below 1
    act(() => {
      result.current.decrementSplit();
    });
    expect(result.current.state.splitCount).toBe(1);
  });
});

