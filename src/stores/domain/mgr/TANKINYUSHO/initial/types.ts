import { GetInitialResponse } from "@api/requests/initial/getInitial";

/**
 * ActionNames
 */
export const FETCH_STARTED = "TANKINYUSHO/INITIAL/FETCH_STARTED";
export const FETCH_SUCCESS = "TANKINYUSHO/INITIAL/FETCH_SUCCESS";
export const FETCH_FAILED = "TANKINYUSHO/INITIAL/FETCH_FAILED";
export const POST_STARTED = "TANKINYUSHO/INITIAL/POST_STARTED";
export const POST_SUCCESS = "TANKINYUSHO/INITIAL/POST_SUCCESS";
export const POST_FAILED = "TANKINYUSHO/INITIAL/POST_FAILED";

export interface InitialState {
  facility: GetInitialResponse["data"]["facility"];
  users: GetInitialResponse["data"]["users"];
}
