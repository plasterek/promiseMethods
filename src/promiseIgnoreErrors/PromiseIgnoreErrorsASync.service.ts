export const promiseIgnoreErrorsASync = async <T>(arrayOfPromise: (() => Promise<T>)[]): Promise<Array<T>> => {
  const resultArray: any[] = [];
  for (const promise of arrayOfPromise) {
    await promise()
      .then((data) => {
        resultArray.push(data);
      })
      .catch((err: any) => {});
  }
  return resultArray;
};
