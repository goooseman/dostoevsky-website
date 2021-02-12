import { LOCALE_CODES, Locale } from "src/config/locales";

export const getLocaleFromPath = (
  path: string,
  supportedLocales = LOCALE_CODES
): Locale | undefined => {
  const match = path.match(
    new RegExp(`^\/(${supportedLocales.join("|")})(\/|$)`)
  );
  if (!match) {
    return;
  }
  return match[1] as Locale;
};

export const isSupportedLocaleInPath = (
  path: string,
  supportedLocales = LOCALE_CODES
): boolean => {
  return !!getLocaleFromPath(path, supportedLocales);
};

export const getLinkForLocale = (
  locale: string,
  pathname: string,
  query?: string,
  supportedLocales = LOCALE_CODES
): string => {
  let pathWithoutLocale = pathname;
  for (const locale of supportedLocales) {
    pathWithoutLocale = pathWithoutLocale.replace(`/${locale}`, "");
  }
  return `/${locale}${pathWithoutLocale}${query ? query : ""}`;
};
