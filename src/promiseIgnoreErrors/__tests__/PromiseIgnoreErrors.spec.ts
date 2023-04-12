import { promiseIgnoreErrors } from "../PromiseIgnoreErrors.service";

describe("promiseAllSettled function", () => {
  const resolvedPromise: () => Promise<unknown> = () => Promise.resolve("resolved");
  const rejectedPromise: () => Promise<unknown> = () => Promise.reject("rejected");
  describe("When all Promises in array are resolved", () => {
    it("It returns Promise with array promise results", () => {
      //given
      const promiseArray: (() => Promise<unknown>)[] = [resolvedPromise, resolvedPromise];
      //when
      const results: Promise<unknown> = promiseIgnoreErrors(promiseArray);
      //then
      expect.assertions(1);
      expect(results).resolves.toMatchSnapshot();
    });
  });
  describe("When any promise rejects in given array", () => {
    it("It will be skipped and array with only resolved Promises", () => {
      //given
      const promiseArray: (() => Promise<unknown>)[] = [resolvedPromise, rejectedPromise];
      //when
      const results: Promise<unknown> = promiseIgnoreErrors(promiseArray);
      //then
      expect.assertions(1);
      expect(results).resolves.toMatchSnapshot();
    });
  });
  describe("When given array is empty", () => {
    it("It returns Promise with an empty array", () => {
      //given
      const promiseArray: any[] = [];
      //when
      const results: Promise<unknown> = promiseIgnoreErrors(promiseArray);
      //then
      expect.assertions(1);
      expect(results).resolves.toMatchSnapshot();
    });
  });
});
