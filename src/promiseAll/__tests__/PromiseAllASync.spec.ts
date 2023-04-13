import { promiseAllASync } from "../PromiseAllASync.service";

describe("PromiseAllAsync function", () => {
  const succces: string = "resolved";
  const failure: string = "rejected";
  const resolvedPromise: Promise<string> = Promise.resolve(succces);
  const rejectedPromise: Promise<string> = Promise.reject(failure);

  describe("When every promise in given array is resolved", () => {
    it("It returns Promise with array of given promise results", async () => {
      //given
      const promiseArray: Promise<string>[] = [resolvedPromise, resolvedPromise];
      //when
      const results: string[] = await promiseAllASync(promiseArray);
      //then
      expect.assertions(1);
      expect(results).toMatchObject([succces, succces]);
    });
  });

  describe("When any promise rejects in given array", () => {
    it("It returns Promise with rejected value", async () => {
      //given
      const promiseArray: Promise<string>[] = [resolvedPromise, rejectedPromise];
      //when
      try {
        const result: string[] = await promiseAllASync(promiseArray);
        //then
      } catch (err) {
        expect.assertions(1);
        expect(err).toBe(failure);
      }
    });
  });

  describe("When given array is empty", () => {
    it("It returns Promise with empty array", async () => {
      //when
      const results: string[] = await promiseAllASync([]);
      //then
      expect.assertions(1);
      expect(results).toMatchObject([]);
    });
  });
});
