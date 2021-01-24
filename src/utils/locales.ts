import { LOCALE_CODES, Locale } from "src/config/locales";
import { globalHistory as history } from "@reach/router";

export const getLocale = (): Locale => {
  return getLocaleFromPath(history.location.pathname) as Locale;
};

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
  locale: Locale,
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

export const getLinkForCurrentLocale = (
  pathname: string,
  query?: string,
  supportedLocales = LOCALE_CODES
): string => {
  return getLinkForLocale(getLocale(), pathname, query, supportedLocales);
};
