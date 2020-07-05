export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

export const customMedia = {
  "--viewport-xs-max": `(max-width: ${breakpoints.sm - 1}px)`,
  "--viewport-xs-min": `(min-width: ${breakpoints.xs}px)`,
  "--viewport-sm-max": `(max-width: ${breakpoints.md - 1}px)`,
  "--viewport-sm-min": `(min-width: ${breakpoints.sm}px)`,
  "--viewport-md-max": `(max-width: ${breakpoints.lg - 1}px)`,
  "--viewport-md-min": `(min-width: ${breakpoints.md}px)`,
  "--viewport-lg-max": `(max-width: ${breakpoints.xl - 1}px)`,
  "--viewport-lg-min": `(min-width: ${breakpoints.lg}px)`,
  "--viewport-xl-min": `(min-width: ${breakpoints.xl}px)`,
};
