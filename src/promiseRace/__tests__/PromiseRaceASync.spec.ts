import { promiseRaceASync } from "../PromiseRaceASync.service";

describe("promiseRace function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const success: string = "resolved";
  const succesDelayed: string = "resolvedWithDelay";
  const failure: string = "rejected";
  const resolvedPromise: Promise<string> = Promise.resolve(success);
  const resolvedPromise2: Promise<string> = new Promise((resolve) => setTimeout(() => resolve(succesDelayed), 200));
  const rejectedPromise: Promise<string> = new Promise((reject) => setTimeout(() => reject(failure), 100));
  describe("When first promise in given array is resolved", () => {
    it("It returns given Promise result", async () => {
      //given
      const promiseArray: Promise<string>[] = [resolvedPromise2, resolvedPromise];
      //when
      const results: string | { status: string } = await promiseRaceASync(promiseArray);
      //then
      expect(results).toBe(success);
    });
  });

  describe("When first promise in array rejects", () => {
    it("It returns Promise with rejected value", async () => {
      //given
      const promiseArray: Promise<string>[] = [resolvedPromise2, rejectedPromise];
      //when

      const a: string | { status: string } = await promiseRaceASync(promiseArray);
      expect(a).toBe(failure);
    });
  });

  describe("When given array is empty", () => {
    it("It returns Promise pending", async () => {
      //when
      const results: string | { status: string } = await promiseRaceASync([]);
      //then
      expect(results).toMatchObject({ status: "pending" });
    });
  });
});
