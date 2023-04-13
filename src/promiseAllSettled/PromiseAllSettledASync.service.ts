import { EStatus } from "../utilities/Status.model";
import { IAllSettled } from "./models/IAllSettled.model";

export const promiseAllSettledASync = async <T>(arrayOfPromise: Promise<T>[]): Promise<IAllSettled<T>[]> => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve([]);
  }
  const [first, ...rest]: Promise<T>[] = arrayOfPromise;
  try {
    const result: Awaited<T> = await first;
    const resultObject: IAllSettled<T> = {
      status: EStatus.fulfilled,
      value: result,
    };
    const remaining: IAllSettled<T>[] = await promiseAllSettledASync(rest);
    return [resultObject, ...remaining];
  } catch (err: any) {
    const resultObject: IAllSettled<T> = {
      status: EStatus.rejected,
      value: err,
    };
    const remaining: IAllSettled<T>[] = await promiseAllSettledASync(rest);
    return [resultObject, ...remaining];
  }
};
