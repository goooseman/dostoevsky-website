// https://reedbarger.com/how-to-create-a-custom-usecopytoclipboard-react-hook/
import { useState, useCallback, useEffect } from "react";
import copy from "copy-to-clipboard";

export default function useCopyToClipboard(
  resetInterval?: number
): {
  isCopied: boolean;
  copy: (text: string) => void;
} {
  const [isCopied, setCopied] = useState(false);

  const handleCopy = useCallback((text: string) => {
    if (typeof text === "string" || typeof text == "number") {
      copy(text.toString());
      setCopied(true);
    } else {
      setCopied(false);
      console.error(
        `Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`
      );
    }
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isCopied && resetInterval) {
      timeout = setTimeout(() => setCopied(false), resetInterval);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied, resetInterval]);

  return { isCopied, copy: handleCopy };
}
