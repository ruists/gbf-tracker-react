export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function sortAlphabetically(a, b) {
  if (a.name > b.name) {
    return 1;
  } else if (a.name < b.name) {
    return -1;
  }

  return 0;
}

export function removeNeutralRarity(arr) {
  return arr.filter(item => item.name != "N");
}

export function removeAnyElement(arr) {
  return arr.filter(item => item.name != "Any");
}