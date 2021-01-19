import { LOCALE_CODES } from "src/config/locales";

export const getLocaleFromPath = (
  path: string,
  supportedLocales = LOCALE_CODES
): string | undefined => {
  const match = path.match(
    new RegExp(`^\/(${supportedLocales.join("|")})(\/|$)`)
  );
  if (!match) {
    return;
  }
  return match[1];
};

export const isSupportedLocaleInPath = (
  path: string,
  supportedLocales = LOCALE_CODES
): boolean => {
  return !!getLocaleFromPath(path, supportedLocales);
};
