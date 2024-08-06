
export const getFromLocalStorage = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  if (!data) return null;

  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
};

export const setDataToLocalStorage = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data))
}
