export type Feature = "langs" | "analytics";

const useFeatureFlag = (feature: Feature): boolean => {
  const whitelist: Feature[] = ["analytics", "langs"];
  if (whitelist.includes(feature)) {
    return true;
  }
  if (typeof window === `undefined` || window.location?.search === undefined) {
    return false;
  }
  const lsKey = `ff-${feature}`;
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has(feature)) {
    return localStorage.getItem(lsKey) === "true";
  }
  let value = false;
  if (urlParams.get(feature) === "true" || urlParams.get(feature) === "1") {
    value = true;
  }
  localStorage.setItem(lsKey, value.toString());
  return value;
};

export default useFeatureFlag;
