import { useEffect } from "react";

const useEscButtonHandler = (
  onEscButtonPress: () => void,
  isEnabled: boolean
): void => {
  const handleKeyUp = (ev: KeyboardEvent) => {
    if (ev.keyCode === 27) {
      onEscButtonPress();
    }
  };

  useEffect(() => {
    const unregister = () => {
      window.removeEventListener("keyup", handleKeyUp, false);
    };
    if (!isEnabled) {
      unregister();
      return;
    }
    window.addEventListener("keyup", handleKeyUp, false);
    return unregister;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled, onEscButtonPress]);
};

export default useEscButtonHandler;
