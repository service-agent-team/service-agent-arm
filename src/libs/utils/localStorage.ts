export const getLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : null;
};

export const setLocalStorage = (key: string, value: string | boolean): void =>
  localStorage.setItem(key, JSON.stringify(value));

export const removeLocalStorage = (key: string): void => localStorage.removeItem(key);

export const clearLocalStorage = (): void => localStorage.clear();
