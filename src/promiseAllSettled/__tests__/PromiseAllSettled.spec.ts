import { promiseAllSettled } from "../PromiseAllSettled.service";

describe("promiseAllSettled function", () => {
  const resolvedPromise: () => Promise<unknown> = () => Promise.resolve("resolved");
  const rejectedPromise: () => Promise<unknown> = () => Promise.reject("rejected");
  describe("When any promise in given array is resolved", () => {
    it("It returns Promise with array of objects with given promise status and results", () => {
      //given
      const promiseArray: (() => Promise<unknown>)[] = [resolvedPromise, resolvedPromise];
      //when
      const results: Promise<unknown> = promiseAllSettled(promiseArray);
      //then
      expect.assertions(1);
      expect(results).resolves.toMatchSnapshot();
    });
  });
  describe("When any promise rejects in given array", () => {
    it("It will be returned in promise array with status and reason", () => {
      //given
      const promiseArray: (() => Promise<unknown>)[] = [resolvedPromise, rejectedPromise];
      //when
      const results: Promise<unknown> = promiseAllSettled(promiseArray);
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
      const results: Promise<unknown> = promiseAllSettled(promiseArray);
      //then
      expect.assertions(1);
      expect(results).resolves.toMatchSnapshot();
    });
  });
});
