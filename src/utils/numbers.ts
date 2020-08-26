export const formatNumber = (number: number): string =>
  new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 1,
  }).format(number);
