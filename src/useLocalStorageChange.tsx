import { useState, useEffect } from 'react';

export const useLocalStorageChange = (key: string) => {
  const [value, setValue] = useState<string | null>(() => {
    return localStorage.getItem(key);
  });

  useEffect(() => {
    const updateValue = () => {
      setValue(localStorage.getItem(key));
    };

    // Handle storage event across tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        updateValue();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Save the original setItem function to restore later
    const originalSetItem = localStorage.setItem;

    // Override localStorage.setItem
    localStorage.setItem = function (newKey: string, newValue: string) {
      originalSetItem.call(this, newKey, newValue); // Call the original method
      if (newKey === key) {
        updateValue(); // Update state if the key matches
      }
    };

    // Cleanup on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      localStorage.setItem = originalSetItem; // Restore the original setItem function
    };
  }, [key]);

  return value;
};
