export const debounce = (cb, delay = 1000) => {
  let timeout;

  const debounced = (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
  };

  return debounced;
};
