import { countTimer } from "../utilities/countTimer.service";
import { performance as timer } from "perf_hooks";

export const promiseLastASync = async <T>(arrayOfPromise: Promise<T>[]): Promise<T | [] | undefined> => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve([]);
  }
  const errorArray: T[] = [];
  let resultArray: T[] = [];
  let time: number = 0;
  let counter: number = 0;
  for (const promise of arrayOfPromise) {
    try {
      const startTime = timer.now();
      const data: Awaited<T> = await promise;
      const endTime: number = performance.now();
      const executionTime: number = countTimer(startTime, endTime);
      counter++;
      if (time < executionTime) {
        resultArray = [];
        resultArray.push(data);
        time = executionTime;
      }
    } catch (err: any) {
      errorArray.push(err);
      counter++;
    }
  }
  if (counter === arrayOfPromise.length) {
    if (errorArray.length > 0) {
      const error: T = errorArray[0];
      return error;
    }
    const result: T = resultArray[0];
    return result;
  }
};
