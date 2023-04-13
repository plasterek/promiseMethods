export const promiseIgnoreErrorsASync = async <T>(arrayOfPromise: Promise<T>[]): Promise<Array<T>> => {
  const resultArray: T[] = [];
  for (const promise of arrayOfPromise) {
    try {
      const result: Awaited<T> = await promise;
      resultArray.push(result);
    } catch (err) {}
  }
  return resultArray;
};
