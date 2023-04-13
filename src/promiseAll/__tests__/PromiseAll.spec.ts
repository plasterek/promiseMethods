import { promiseAll } from "../PromiseAll.service";

describe("PromiseAll function", () => {
  const success: string = "resolved";
  const failure: string = "rejected";
  const resolvedPromise: Promise<string> = Promise.resolve(success);
  const rejectedPromise: Promise<string> = Promise.reject(failure);

  describe("When every promise in given array is resolved", () => {
    it("It returns Promise with array of given promise results", async () => {
      //given
      const promiseArray: Promise<string>[] = [resolvedPromise, resolvedPromise];
      //when
      const results: string[] = await promiseAll(promiseArray);
      //then
      expect.assertions(1);
      expect(results).toMatchObject([success, success]);
    });
  });

  describe("When any promise rejects in given array", () => {
    it("It returns Promise with rejected value", async () => {
      //given
      const promiseArray: Promise<string>[] = [resolvedPromise, rejectedPromise];
      //when
      try {
        expect.assertions(1);
        const result: string[] = await promiseAll(promiseArray);
      } catch (err) {
        //then
        expect(err).toBe(failure);
      }
    });
  });

  describe("When given array is empty", () => {
    it("It returns Promise with empty array", async () => {
      //given
      const promiseArray: Promise<string>[] = [];
      //when
      const results: string[] = await promiseAll(promiseArray);
      //then
      expect.assertions(1);
      expect(results).toMatchObject([]);
    });
  });
});
