// Sets an item with a Key to local storage
const saveStorage = function (key: string, data: object) {
  localStorage.setItem(key, JSON.stringify(data));
};

// Looks for a local storage item and returns if present
const getStorage = function (key: string, item: string) {
  const result = localStorage.getItem(key);
  if (result && item) {
    const data = JSON.parse(result);
    return data[item];
  } else if (result) {
    return result;
  }
};

// Clear a single item or the whole local storage
const clearStorage = function (key = "false") {
  if (key) {
    localStorage.removeItem(key);
  } else {
    localStorage.clear();
  }
};
// Exports all avaliable functions on the script
export { getStorage, saveStorage, clearStorage };
