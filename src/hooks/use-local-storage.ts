"use client";

import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const isClient = typeof window !== 'undefined';

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isClient) {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (isClient) {
      try {
        const item = window.localStorage.getItem(key);
        // Only set the item in localStorage if it doesn't already exist or if the storedValue is different
        // This check is to prevent overwriting existing data with initial data on hydration
        if (item === null || JSON.stringify(storedValue) !== item) {
          window.localStorage.setItem(key, JSON.stringify(storedValue));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [key, storedValue, isClient]);

  useEffect(() => {
    if (isClient) {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.log(error);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, isClient]);


  return [storedValue, setStoredValue];
}

export default useLocalStorage;
