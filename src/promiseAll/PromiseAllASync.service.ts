export const promiseAllASync = async <T>(arrayOfPromise: (() => Promise<T>)[]): Promise<Array<T>> => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve([]);
  }
  const [first, ...rest]: (() => Promise<T>)[] = arrayOfPromise;
  const result: Awaited<T> = await first()
    .then((result) => result)
    .catch((err) => Promise.reject(err));
  const remaining: T[] = await promiseAllASync(rest);
  return [result, ...remaining];
};
