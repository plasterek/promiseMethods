import { promiseRaceASync } from "../PromiseRaceASync.service";

describe("promiseRace function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const resolvedPromise: () => Promise<unknown> = () => Promise.resolve("resolved");
  const rejectedPromise: () => Promise<unknown> = () => Promise.reject("rejected");
  const delayedResolvedPromise: () => Promise<unknown> = () =>
    new Promise((resolve) => {
      setTimeout(function () {
        resolve("resolvedWithDelay");
      }, 3000);
    });
  const delayedRejectedPromise: () => Promise<unknown> = () =>
    new Promise((reject) => {
      setTimeout(function () {
        reject("rejectedWithDelay");
      }, 3000);
    });

  describe("When first promise in given array is resolved", () => {
    it("It returns given Promise result", () => {
      //given
      jest.useFakeTimers();
      jest.spyOn(global, "setTimeout");
      const promiseArray: (() => Promise<unknown>)[] = [delayedRejectedPromise, resolvedPromise];
      //when
      const results: Promise<unknown> = promiseRaceASync(promiseArray);
      jest.runAllTimers();
      //then
      expect(results).resolves.toMatchSnapshot();
    });
  });

  describe("When first promise in array rejects", () => {
    it("It returns Promise with rejected value", () => {
      //given
      jest.useFakeTimers();
      jest.spyOn(global, "setTimeout");
      const promiseArray: (() => Promise<unknown>)[] = [delayedResolvedPromise, rejectedPromise];
      //when
      const results: Promise<unknown> = promiseRaceASync(promiseArray);
      jest.runAllTimers();
      //then
      expect(results).rejects.toMatchSnapshot();
    });
  });

  describe("When given array is empty", () => {
    it("It returns Promise pending", () => {
      //given
      const promiseArray: any[] = [];
      //when
      const results: Promise<unknown> = promiseRaceASync(promiseArray);
      //then
      expect(results).resolves.toMatchSnapshot();
    });
  });
});
