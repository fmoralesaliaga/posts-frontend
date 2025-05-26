import { useState, useEffect, useRef } from 'react';

/**
 * A custom hook for debouncing values
 * Useful for search inputs and other scenarios where you want to delay processing
 * 
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 500ms)
 * @returns The debounced value
 */
function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    // Cleanup: clear the timeout if value changes or component unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

/**
 * Hook for managing a debounced search input
 * 
 * @param initialValue - The initial search term
 * @param delay - The debounce delay in milliseconds (default: 500ms)
 * @param callback - Optional callback function to execute when the debounced value changes
 * @returns Object containing current value, debounced value, and a setter function
 */
export function useDebouncedSearch<T>(
  initialValue: T,
  delay = 500,
  callback?: (value: T) => void
) {
  const [value, setValue] = useState<T>(initialValue);
  const debouncedValue = useDebounce<T>(value, delay);
  
  // Call the callback when the debounced value changes
  useEffect(() => {
    if (callback) {
      callback(debouncedValue);
    }
  }, [debouncedValue, callback]);
  
  return {
    value,
    debouncedValue,
    setValue,
  };
}

/**
 * Hook to detect clicks outside of a specified element
 * 
 * @param initialIsVisible - Whether the element is initially visible
 * @returns Object containing ref to attach to the element, isVisible state, and setIsVisible function
 */
export function useClickOutside<T extends HTMLElement = HTMLDivElement>(
  initialIsVisible: boolean
): {
  ref: React.RefObject<T | null>;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const [isVisible, setIsVisible] = useState(initialIsVisible);
  const ref = useRef<T>(null);
  
  useEffect(() => {
    // Function to handle clicks outside the referenced element
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };
    
    // Add event listener if the element is visible
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);
  
  return { ref, isVisible, setIsVisible };
}

export default useDebounce;
