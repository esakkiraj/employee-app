export const extractValueFromQuerySearch = (searchString, key) => {
  if (!searchString || searchString === "") return;

  const parsedValues = new URLSearchParams(searchString.substring());
  return parsedValues.get(key);
};
