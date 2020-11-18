import { GetInitialResponse } from "@api/requests/initial/getInitial";

/**
 * ActionNames
 */
export const FETCH_STARTED = "IAB/INITIAL/FETCH_STARTED";
export const FETCH_SUCCESS = "IAB/INITIAL/FETCH_SUCCESS";
export const FETCH_FAILED = "IAB/INITIAL/FETCH_FAILED";
export const POST_STARTED = "IAB/INITIAL/POST_STARTED";
export const POST_SUCCESS = "IAB/INITIAL/POST_SUCCESS";
export const POST_FAILED = "IAB/INITIAL/POST_FAILED";

export interface InitialState {
  facility: GetInitialResponse["data"]["facility"];
  users: GetInitialResponse["data"]["users"];
}
