export const promiseAllASync = async <T>(arrayOfPromise: Promise<T>[]): Promise<Array<T>> => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve([]);
  }
  const [first, ...rest]: Promise<T>[] = arrayOfPromise;
  try {
    const result: Awaited<T> = await first;
    const remaining: T[] = await promiseAllASync(rest);
    return [result, ...remaining];
  } catch (err) {
    return Promise.reject(err);
  }
};
