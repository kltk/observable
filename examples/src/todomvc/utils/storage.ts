const STORAGE_KEY = 'todos-tsx-observable';

function getStorage() {
  const text = localStorage.getItem(STORAGE_KEY);
  try {
    return JSON.parse(text || 'undefined') || {};
  } catch (e) {
    return {};
  }
}

function setStorage(json: any) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
}

function subscribe(cb: Function) {
  window.addEventListener('storage', e => {
    if (e.key === STORAGE_KEY) {
      cb(getStorage());
    }
  });
}

export { getStorage, setStorage, subscribe };
