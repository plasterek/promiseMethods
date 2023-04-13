import { EStatus } from "../../utilities/Status.model";

export interface IAllSettled<T> {
  status: EStatus;
  value?: T;
  reason?: T;
}
