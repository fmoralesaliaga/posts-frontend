import { renderHook, act } from '@testing-library/react';
import useDebounce, { useDebouncedSearch, useClickOutside } from '../useDebounce';
import { vi } from 'vitest';

describe('useDebounce hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial value', 500));
    expect(result.current).toBe('initial value');
  });

  test('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );

    // Change the value
    rerender({ value: 'new value', delay: 500 });
    
    // Value should not have changed yet
    expect(result.current).toBe('initial value');
    
    // Fast-forward time by 499ms
    act(() => {
      vi.advanceTimersByTime(499);
    });
    
    // Value should still not have changed
    expect(result.current).toBe('initial value');
    
    // Fast-forward the remaining 1ms
    act(() => {
      vi.advanceTimersByTime(1);
    });
    
    // Now the value should have changed
    expect(result.current).toBe('new value');
  });

  test('should reset the timer if value changes before delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );

    // Change the value
    rerender({ value: 'intermediate value', delay: 500 });
    
    // Fast-forward time by 400ms
    act(() => {
      vi.advanceTimersByTime(400);
    });
    
    // Change the value again
    rerender({ value: 'final value', delay: 500 });
    
    // Fast-forward time by another 400ms
    act(() => {
      vi.advanceTimersByTime(400);
    });
    
    // Value should still not have changed
    expect(result.current).toBe('initial value');
    
    // Fast-forward the remaining 100ms
    act(() => {
      vi.advanceTimersByTime(100);
    });
    
    // Now the value should have changed to the latest value
    expect(result.current).toBe('final value');
  });
});

describe('useDebouncedSearch hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should provide value, debouncedValue and setter', () => {
    const { result } = renderHook(() => useDebouncedSearch('initial', 500));
    
    expect(result.current.value).toBe('initial');
    expect(result.current.debouncedValue).toBe('initial');
    expect(typeof result.current.setValue).toBe('function');
  });

  test('should call callback when debounced value changes', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedSearch('initial', 500, callback));
    
    // Callback should be called initially
    expect(callback).toHaveBeenCalledWith('initial');
    
    // Change the value
    act(() => {
      result.current.setValue('new value');
    });
    
    // Callback should not have been called again yet
    expect(callback).toHaveBeenCalledTimes(1);
    
    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });
    
    // Callback should have been called with new value
    expect(callback).toHaveBeenCalledWith('new value');
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
