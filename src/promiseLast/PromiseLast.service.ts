export const promiseLast = <T>(arrayOfPromise: Promise<T>[]): Promise<T | []> => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve([]);
  }
  let counter: number = 0;
  const promiseResultArray: T[] = [];
  const promiseErrors: T[] = [];
  return new Promise((resolve, reject) => {
    for (const promise of arrayOfPromise) {
      promise
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
              const rejecetion: T = promiseErrors[0];
              return reject(rejecetion);
            }
            const arrayLenght: number = promiseResultArray.length;
            const resolved: T = promiseResultArray[arrayLenght - 1];
            resolve(resolved);
          }
        });
    }
  });
};
