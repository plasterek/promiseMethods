export const promiseAll = <T>(arrayOfPromise: (() => Promise<T>)[]): Promise<Array<T>> => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve([]);
  }
  const [first, ...rest] = arrayOfPromise;
  return first()
    .then((result) => {
      return promiseAll(rest).then((remaining) => {
        return [result, ...remaining];
      });
    })
    .catch((err) => Promise.reject(err));
};
