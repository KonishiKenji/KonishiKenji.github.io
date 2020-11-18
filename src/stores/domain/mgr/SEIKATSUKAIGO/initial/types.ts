import { GetInitialResponse } from "@api/requests/initial/getInitial";

/**
 * ActionNames
 */
export const FETCH_STARTED = "SEIKATSUKAIGO/INITIAL/FETCH_STARTED";
export const FETCH_SUCCESS = "SEIKATSUKAIGO/INITIAL/FETCH_SUCCESS";
export const FETCH_FAILED = "SEIKATSUKAIGO/INITIAL/FETCH_FAILED";
export const POST_STARTED = "SEIKATSUKAIGO/INITIAL/POST_STARTED";
export const POST_SUCCESS = "SEIKATSUKAIGO/INITIAL/POST_SUCCESS";
export const POST_FAILED = "SEIKATSUKAIGO/INITIAL/POST_FAILED";

export interface InitialState {
  facility: GetInitialResponse["data"]["facility"];
  users: GetInitialResponse["data"]["users"];
}
