import { GetInitialResponse } from "@api/requests/initial/getInitial";

/**
 * ActionNames
 */
export const FETCH_STARTED = "JIRITSUKUNRENSEIKATSU/INITIAL/FETCH_STARTED";
export const FETCH_SUCCESS = "JIRITSUKUNRENSEIKATSU/INITIAL/FETCH_SUCCESS";
export const FETCH_FAILED = "JIRITSUKUNRENSEIKATSU/INITIAL/FETCH_FAILED";
export const POST_STARTED = "JIRITSUKUNRENSEIKATSU/INITIAL/POST_STARTED";
export const POST_SUCCESS = "JIRITSUKUNRENSEIKATSU/INITIAL/POST_SUCCESS";
export const POST_FAILED = "JIRITSUKUNRENSEIKATSU/INITIAL/POST_FAILED";

export interface InitialState {
  facility: GetInitialResponse["data"]["facility"];
  users: GetInitialResponse["data"]["users"];
}
