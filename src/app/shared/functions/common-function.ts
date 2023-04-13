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
