import { useEffect } from "react";

const useBodyOverflowLock = (isOpened: boolean): void => {
  useEffect(() => {
    const unregister = () => {
      document.body.style.overflow = "unset";
    };
    if (!isOpened) {
      unregister();
      return;
    }
    document.body.style.overflow = "hidden";
    return unregister;
  }, [isOpened]);
};

export default useBodyOverflowLock;
