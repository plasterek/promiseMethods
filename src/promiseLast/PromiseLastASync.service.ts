import { countTimer } from "../utilities/countTimer.service";
import { performance as timer } from "perf_hooks";

export const promiseLastASync = async <T>(arrayOfPromise: (() => Promise<T>)[]) => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve([]);
  }
  let counter: number = 0;
  let resultArray: T[] = [];
  let time: number = 0;
  const errorArray: T[] = [];
  for (const promise of arrayOfPromise) {
    const startTime = timer.now();
    await promise()
      .then((data) => {
        const endTime: number = timer.now();
        const executionTime: number = countTimer(startTime, endTime);
        if (time < executionTime) {
          resultArray = [];
          resultArray.push(data);
          time = executionTime;
        }
        counter++;
      })
      .catch((err) => {
        errorArray.push(err);
        counter++;
      });
  }
  if (counter === arrayOfPromise.length) {
    if (errorArray.length > 0) {
      return Promise.reject(errorArray[0]);
    }
    return Promise.resolve(resultArray[0]);
  }
};
