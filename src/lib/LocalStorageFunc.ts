type LocalStorageWithExpiry<T> = {
  value: T;
  expiresAt: number;
};

export const handleGetLocalStorage = <T = any>(
  storageName: string,
): T | null => {
  const storedData = localStorage.getItem(storageName);

  if (!storedData) return null;

  try {
    const parsed = JSON.parse(storedData);

    // Normal localStorage item without expiry
    if (
      !parsed ||
      typeof parsed !== "object" ||
      !("expiresAt" in parsed) ||
      !("value" in parsed)
    ) {
      return parsed as T;
    }

    if (Date.now() >= parsed.expiresAt) {
      localStorage.removeItem(storageName);
      return null;
    }

    return parsed.value as T;
  } catch {
    return null;
  }
};

export const handleSetToLocalStorage = (storageName: string, content: any) => {
  localStorage.setItem(storageName, JSON.stringify(content));
};

export const handleSetLocalStorageWithExpiry = (
  storageName: string,
  content: any,
  expiryInMs: number,
) => {
  const data = {
    value: content,
    expiresAt: Date.now() + expiryInMs,
  };

  localStorage.setItem(storageName, JSON.stringify(data));
};

export const handleDeleteLocalStorage = (storageName: string) => {
  localStorage.removeItem(storageName);
};
