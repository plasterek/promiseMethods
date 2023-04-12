import { promiseLastASync } from "../PromiseLastASync.service";

describe("promiseLastASync function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const resolvedPromise: () => Promise<unknown> = () => Promise.resolve("resolved");
  const delayedResolvedPromise: () => Promise<unknown> = () =>
    new Promise((resolve) => {
      setTimeout(function () {
        resolve("resolvedWithDelay");
      }, 3000);
    });
  const rejectedPromise: () => Promise<unknown> = () => Promise.reject("rejected");
  describe("When all Promises in array are resolved", () => {
    it("It returns Promise with result that took most time to resolve", () => {
      //given
      jest.useFakeTimers();
      jest.spyOn(global, "setTimeout");
      const promiseArray: (() => Promise<unknown>)[] = [delayedResolvedPromise, resolvedPromise];
      //when
      const results: Promise<unknown> = promiseLastASync(promiseArray);
      jest.runAllTimers();
      //then
      expect.assertions(1);
      expect(results).resolves.toMatchSnapshot();
    });
  });
  describe("When any promise rejects in given array", () => {
    it("It will return rejected promise after all promises in given array are resolved", () => {
      //given
      jest.useFakeTimers();
      jest.spyOn(global, "setTimeout");
      const promiseArray: (() => Promise<unknown>)[] = [delayedResolvedPromise, rejectedPromise];
      //when
      const results: Promise<unknown> = promiseLastASync(promiseArray);
      jest.runAllTimers();
      //then
      expect.assertions(1);
      expect(results).rejects.toMatchSnapshot();
    });
  });
  describe("When given array is empty", () => {
    it("It returns Promise with an empty array", () => {
      //given
      const promiseArray: any[] = [];
      //when
      const results: Promise<unknown> = promiseLastASync(promiseArray);
      //then
      expect.assertions(1);
      expect(results).resolves.toMatchSnapshot();
    });
  });
});
