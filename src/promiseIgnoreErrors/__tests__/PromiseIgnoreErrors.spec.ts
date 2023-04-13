import { promiseIgnoreErrors } from "../PromiseIgnoreErrors.service";

describe("promiseAllSettled function", () => {
  const success: string = "resolved";
  const failure: string = "rejected";
  const resolvedPromise: Promise<string> = Promise.resolve(success);
  const rejectedPromise: Promise<string> = Promise.reject(failure);

  describe("When all Promises in array are resolved", () => {
    it("It returns Promise with array promise results", async () => {
      //given
      const promiseArray: Promise<string>[] = [resolvedPromise, resolvedPromise];
      //when
      const results: string[] = await promiseIgnoreErrors(promiseArray);
      //then
      expect.assertions(1);
      expect(results).toMatchObject([success, success]);
    });
  });

  describe("When any promise rejects in given array", () => {
    it("It will be skipped and array with only resolved Promises", async () => {
      //given
      const promiseArray: Promise<string>[] = [resolvedPromise, rejectedPromise];
      //when
      const results: string[] = await promiseIgnoreErrors(promiseArray);
      //then
      expect.assertions(1);
      expect(results).toMatchObject([success]);
    });
  });

  describe("When given array is empty", () => {
    it("It returns Promise with an empty array", async () => {
      //when
      const results: string[] = await promiseIgnoreErrors([]);
      //then
      expect.assertions(1);
      expect(results).toMatchObject([]);
    });
  });
});
