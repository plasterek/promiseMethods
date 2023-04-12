export const promiseLast = <T>(arrayOfPromise: (() => Promise<T>)[]): Promise<[] | T> => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve([]);
  }
  let counter: number = 0;
  return new Promise((resolve, reject) => {
    const promiseResultArray: T[] = [];
    const promiseErrors: T[] = [];
    for (const promise of arrayOfPromise) {
      promise()
        .then((result) => {
          promiseResultArray.push(result);
          counter++;
        })
        .catch((error) => {
          promiseErrors.push(error);
          counter++;
        })
        .finally(() => {
          if (counter === arrayOfPromise.length) {
            if (promiseErrors.length > 0) {
              return reject(promiseErrors[0]);
            }
            return resolve(promiseResultArray[promiseResultArray.length - 1]);
          }
        });
    }
  });
};
