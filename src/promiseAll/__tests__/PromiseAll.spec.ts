import { promiseAll } from "../PromiseAll.service";

describe("PromiseAll function", () => {
  const resolvedPromise: () => Promise<unknown> = () => Promise.resolve("resolved");
  const rejectedPromise: () => Promise<unknown> = () => Promise.reject("rejected");
  describe("When every promise in given array is resolved", () => {
    it("It returns Promise with array of given promise results", () => {
      //given
      const promiseArray: (() => Promise<unknown>)[] = [resolvedPromise, resolvedPromise];
      //when
      const results: Promise<unknown> = promiseAll(promiseArray);
      //then
      expect.assertions(1);
      expect(results).resolves.toMatchSnapshot();
    });
  });
  describe("When any promise rejects in given array", () => {
    it("It returns Promise with rejected value", () => {
      //given
      const promiseArray: (() => Promise<unknown>)[] = [resolvedPromise, rejectedPromise];
      //when
      const results: Promise<unknown> = promiseAll(promiseArray);
      //then
      expect.assertions(1);
      expect(results).rejects.toMatchSnapshot();
    });
  });
  describe("When given array is empty", () => {
    it("It returns Promise with empty array", () => {
      //given
      const promiseArray: (() => Promise<unknown>)[] = [];
      //when
      const results: Promise<unknown> = promiseAll(promiseArray);
      //then
      expect.assertions(1);
      expect(results).resolves.toMatchSnapshot();
    });
  });
});
