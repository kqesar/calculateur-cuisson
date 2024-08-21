
export const getFromLocalStorage = <T>(key: string): T => {
  const data = localStorage.getItem(key);
  if (!data) return '' as unknown as T;

  try {
    return JSON.parse(data) as T;
  } catch {
    return '' as unknown as T;
  }
};

export const setDataToLocalStorage = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data))
}
