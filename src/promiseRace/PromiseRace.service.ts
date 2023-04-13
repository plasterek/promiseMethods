export const promiseRace = <T>(arrayOfPromise: Promise<T>[]): Promise<T | { status: string }> => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve({ status: "pending" }); // nie mam pojęcia jak wywołać Promise ze statusem pending :D
  }
  return new Promise((resolve, reject) => {
    for (const promise of arrayOfPromise) {
      promise
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};
