export const formatNumber = (number: number): string => {
  if (isNaN(number)) {
    return "0";
  }
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 1,
  }).format(number);
};
