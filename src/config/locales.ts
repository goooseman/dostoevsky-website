export const LOCALE_CODES = ["en-GB", "ru"] as const;
export type Locale = typeof LOCALE_CODES[number];
export const DEFAULT_LOCALE = "ru";
