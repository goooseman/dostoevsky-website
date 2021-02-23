import React from "react";
import { TProps, useLocale } from "react-targem";

type TnHtmlProps = TProps;

/**
 * Unsafe version of <T />, which allows HTML tags
 */
const T: React.FC<TnHtmlProps> = ({
  message,
  messagePlural,
  count,
  scope,
}: TnHtmlProps) => {
  const { t, tn } = useLocale();
  if (!message) {
    return null;
  }
  let htmlString;
  if (messagePlural && count !== undefined) {
    htmlString = tn(message, messagePlural, count, scope);
  } else {
    htmlString = t(message, scope);
  }
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: htmlString,
      }}
    ></span>
  );
};

export default React.memo(T);
