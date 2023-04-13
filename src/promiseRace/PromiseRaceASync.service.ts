import { countTimer } from "../utilities/countTimer.service";
import { performance as timer } from "perf_hooks";

export const promiseRaceASync = async <T>(arrayOfPromise: Promise<T>[]): Promise<any> => {
  if (arrayOfPromise.length === 0) {
    return Promise.resolve({ status: "pending" }); // nie mam pojęcia jak wywołać Promise ze statusem pending :D
  }
  const result: { result?: T; type?: string; time: number } = { time: 100000 };
  let counter: number = 0;
  for (const promise of arrayOfPromise) {
    const startTime = timer.now();
    try {
      const data: Awaited<T> = await promise;
      counter++;
      const endTime: number = performance.now();
      const executionTime: number = countTimer(startTime, endTime);
      if (result.time > executionTime) {
        result.result = data;
        result.type = "resolve";
        result.time = executionTime;
      }
    } catch (err: any) {
      counter++;
      const endTime = performance.now();
      const executionTime = countTimer(startTime, endTime);
      if (result.time > executionTime) {
        result.result = err;
        result.type = "reject";
        result.time = executionTime;
      }
    }
  }
  if (counter === arrayOfPromise.length) {
    if (result.type === "reject") return Promise.reject(result.result);
    return Promise.resolve(result.result);
  }
};
