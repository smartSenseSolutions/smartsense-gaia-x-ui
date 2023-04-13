export const truncateFromMiddle = (
  rawString: string,
  allowedLength: number,
  separator: string,
  frontChars: number,
  backChars: number
): string => {
  if (rawString.length <= allowedLength) return rawString;
  return (
      rawString.substr(0, frontChars) +
      separator +
      rawString.substr(rawString.length - backChars)
  );
};

/**
 * To check value is Empty or not
 * @param {string | T | Record<string, T2> | null | undefined} value Value to check is Empty
 * @returns {boolean} Value is Empty or not
 */
export function isEmptyValue<T1, T2>(
  value: string | T1 | Record<string, T2> | null | undefined
) {
  if (value === null || value === undefined) {
      return true;
  } else if (typeof value === 'string' && value === '') {
      return true;
  } else if (Array.isArray(value) && value.length === 0) {
      return true;
  } else if (
      value['constructor'] === Object &&
      Object.entries(value).length === 0
  ) {
      return true;
  }
  return false;
}


/**
 * Log Method
 * @param {T} message Message to Log
 * @param {unknown} optionalParams optional Parameters to Log
 */
export function appLog<T>(message: T, ...optionalParams: unknown[]): void {
  const isLocalENV = window.location.origin.includes('localhost');
  if (isLocalENV) {
      /* eslint-disable */
      console.log(message, ...optionalParams); /* eslint-enable */
  }
}
