export const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

export const setNestedValue = (obj, path, value) => {
  const keys = path.split(".");
  const lastKey = keys.pop();

  const deepClone = JSON.parse(JSON.stringify(obj));
  let current = deepClone;
  for (let key of keys) {
    if (!current[key]) current[key] = {};
    current = current[key];
  }
  current[lastKey] = value;

  return deepClone;
};

export const convertMonthsToYearsAndMonths = (totalMonths) => {
  if (!Number.isInteger(totalMonths) || totalMonths < 0) {
    return "Invalid input";
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) {
    return `${months} month${months !== 1 ? "s" : ""}`;
  }
  if (months === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  }
  return `${years} year${years !== 1 ? "s" : ""}, ${months} month${
    months !== 1 ? "s" : ""
  }`;
};
