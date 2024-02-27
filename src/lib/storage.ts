
export const getFromLocalStorage = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  if (!data) {
    return null;
  }
  return JSON.parse(data) as T;
};

export const setDataToLocalStorage = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data))
}
