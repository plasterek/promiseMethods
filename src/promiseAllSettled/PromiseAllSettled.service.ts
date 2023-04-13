import { IAllSettled } from "./models/IAllSettled.model";
import { EStatus } from "../utilities/Status.model";

export const promiseAllSettled = <T>(arrayOfPromise: Promise<T>[]): Promise<IAllSettled<T>[]> => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve([]);
  }
  const [first, ...rest]: Promise<T>[] = arrayOfPromise;
  return first
    .then((result) => {
      const value: { status: string; value: T } = { status: EStatus.fulfilled, value: result };
      return promiseAllSettled(rest).then((remaining: any) => {
        return [value, ...remaining];
      });
    })
    .catch((err) => {
      const value: { status: string; reason: T } = { status: EStatus.rejected, reason: err };
      return promiseAllSettled(rest).then((remaining: any) => {
        return [value, ...remaining];
      });
    });
};
