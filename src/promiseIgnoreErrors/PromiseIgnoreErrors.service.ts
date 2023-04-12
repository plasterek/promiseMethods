export const promiseIgnoreErrors = <T>(arrayOfPromise: (() => Promise<T>)[]): Promise<Array<T>> => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve([]);
  }
  const [first, ...rest]: (() => Promise<T>)[] = arrayOfPromise;
  return first()
    .then((result: T) => {
      return promiseIgnoreErrors(rest).then((remaining: any) => {
        return [result, ...remaining];
      });
    })
    .catch((err: any) => {
      return promiseIgnoreErrors(rest).then((remaining: any) => {
        return [...remaining];
      });
    });
};
