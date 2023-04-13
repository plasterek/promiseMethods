import { promiseLast } from "../PromiseLast.service";

describe("promiseLast function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const success: string = "resolved";
  const succesDelayed: string = "resolvedWithDelay";
  const failure: string = "rejected";
  const resolvedPromise: Promise<string> = Promise.resolve(success);
  const resolvedPromise2: Promise<string> = new Promise((resolve) => setTimeout(() => resolve(succesDelayed), 200));
  const rejectedPromise: Promise<string> = new Promise((reject) => setTimeout(() => reject(failure), 300));

  describe("When all Promises in array are resolved", () => {
    it("It returns Promise with result that was last to resolve", async () => {
      //given
      const promiseArray: Promise<string>[] = [resolvedPromise2, resolvedPromise];
      //when
      const results: string | [] | undefined = await promiseLast(promiseArray);
      //then
      expect.assertions(1);
      expect(results).toBe(succesDelayed);
    });
  });

  describe("When any promise rejects in given array", () => {
    it("It will return rejected promise after all promises in given array are resolved", async () => {
      //given
      const promiseArray: Promise<string>[] = [resolvedPromise2, rejectedPromise];
      //when
      const result: string | [] | undefined = await promiseLast(promiseArray);

      //then
      expect.assertions(1);
      expect(result).toBe(failure);
    });
  });

  describe("When given array is empty", () => {
    it("It returns Promise with an empty array", async () => {
      //when
      const results: string | [] | undefined = await promiseLast([]);
      //then
      expect.assertions(1);
      expect(results).toMatchObject([]);
    });
  });
});
