import { useEffect } from "react";

const useBodyOverflowLock = (isOpened: boolean): void => {
  useEffect(() => {
    const unregister = () => {
      document.body.style.overflowY = "unset";
    };
    if (!isOpened) {
      unregister();
      return;
    }
    document.body.style.overflowY = "hidden";
    return unregister;
  }, [isOpened]);
};

export default useBodyOverflowLock;
