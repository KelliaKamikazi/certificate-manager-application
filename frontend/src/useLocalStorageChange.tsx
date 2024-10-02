import { useState, useEffect } from "react";

export const useLocalStorageChange = (key: string) => {
  const [value, setValue] = useState<{ id: number; firstName: string } | null>(
    () => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    }
  );

  useEffect(() => {
    const updateValue = () => {
      const storedValue = localStorage.getItem(key);
      setValue(storedValue ? JSON.parse(storedValue) : null);
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        updateValue();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const originalSetItem = localStorage.setItem;

    localStorage.setItem = function (newKey: string, newValue: string) {
      originalSetItem.call(this, newKey, newValue);
      if (newKey === key) {
        updateValue();
      }
    };
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      localStorage.setItem = originalSetItem;
    };
  }, [key]);

  return value;
};
