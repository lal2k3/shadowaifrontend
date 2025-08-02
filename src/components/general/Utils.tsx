export const isEmpty = (value: string) => {
  if (value !== null || value !== undefined) {
    if (value.length > 0) {
      return false;
    }
  }

  return true;
};

export const isObjectEmpty = (obj: object | null | undefined): boolean => {
  if (obj === null || obj === undefined) {
    return true;
  }

  return Object.keys(obj).length === 0;
};
