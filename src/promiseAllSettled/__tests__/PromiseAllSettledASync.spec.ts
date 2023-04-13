import { promiseAllSettledASync } from "../PromiseAllSettledASync.service";
import { IAllSettled } from "../models/IAllSettled.model";

describe("promiseAllSettled function", () => {
  const success: string = "resolved";
  const failure: string = "rejected";
  const resolvedPromise: Promise<string> = Promise.resolve(success);
  const rejectedPromise: Promise<string> = Promise.reject(failure);

  describe("When any promise in given array is resolved", () => {
    it("It returns Promise with array of objects with given promise status and results", async () => {
      //given
      const promiseArray: Promise<string>[] = [resolvedPromise, resolvedPromise];
      //when
      const results: IAllSettled<string>[] = await promiseAllSettledASync(promiseArray);
      //then
      expect.assertions(1);
      expect(results).toMatchSnapshot();
    });
  });

  describe("When any promise rejects in given array", () => {
    it("It will be returned in promise array with status and reason", async () => {
      //given
      const promiseArray: Promise<string>[] = [resolvedPromise, rejectedPromise];
      //when
      const results: IAllSettled<string>[] = await promiseAllSettledASync(promiseArray);
      //then
      expect.assertions(1);
      expect(results).toMatchSnapshot();
    });
  });

  describe("When given array is empty", () => {
    it("It returns Promise with an empty array", async () => {
      //given
      const promiseArray: any[] = [];
      //when
      const results: IAllSettled<string>[] = await promiseAllSettledASync(promiseArray);
      //then
      expect.assertions(1);
      expect(results).toMatchObject([]);
    });
  });
});
