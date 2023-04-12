export const promiseAllSettled = <T>(
  arrayOfPromise: (() => Promise<T>)[]
): Promise<[] | { status: string; value: T; reason: T }[]> => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve([]);
  }
  const [first, ...rest]: (() => Promise<T>)[] = arrayOfPromise;
  return first()
    .then((result) => {
      const value: { status: string; value: T } = { status: "fulfilled", value: result };
      return promiseAllSettled(rest).then((remaining: any) => {
        return [value, ...remaining];
      });
    })
    .catch((err) => {
      const value: { status: string; reason: T } = { status: "rejected", reason: err };
      return promiseAllSettled(rest).then((remaining: any) => {
        return [value, ...remaining];
      });
    });
};
