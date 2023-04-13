export const promiseAll = <T>(arrayOfPromise: Array<Promise<T>>): Promise<Array<T>> => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve([]);
  }
  const [first, ...rest]: Promise<T>[] = arrayOfPromise;
  return first
    .then((result) => {
      return promiseAll(rest).then((remaining) => {
        return [result, ...remaining];
      });
    })
    .catch((err) => Promise.reject(err));
};
