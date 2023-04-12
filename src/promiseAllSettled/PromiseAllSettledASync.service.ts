export const promiseAllSettledASync = async <T>(arrayOfPromise: (() => Promise<T>)[]): Promise<any[]> => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve([]);
  }
  const [first, ...rest]: (() => Promise<T>)[] = arrayOfPromise;
  let resultObject: { status: string; value?: T; reason?: T } = { status: "" };
  await first()
    .then((result) => {
      resultObject.status = "fulfilled";
      resultObject.value = result;
    })
    .catch((err) => {
      resultObject.status = "rejected";
      resultObject.reason = err;
    });
  const remaining: T[] = await promiseAllSettledASync(rest);
  return [resultObject, ...remaining];
};
