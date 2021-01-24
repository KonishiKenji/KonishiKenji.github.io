import { GetInitialResponse } from "@api/requests/initial/getInitial";

/**
 * ActionNames
 */
export const FETCH_STARTED = "SHISETSUNYUSHO/INITIAL/FETCH_STARTED";
export const FETCH_SUCCESS = "SHISETSUNYUSHO/INITIAL/FETCH_SUCCESS";
export const FETCH_FAILED = "SHISETSUNYUSHO/INITIAL/FETCH_FAILED";
export const POST_STARTED = "SHISETSUNYUSHO/INITIAL/POST_STARTED";
export const POST_SUCCESS = "SHISETSUNYUSHO/INITIAL/POST_SUCCESS";
export const POST_FAILED = "SHISETSUNYUSHO/INITIAL/POST_FAILED";

export interface InitialState {
  facility: GetInitialResponse["data"]["facility"];
  users: GetInitialResponse["data"]["users"];
}
