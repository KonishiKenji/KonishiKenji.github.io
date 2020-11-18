import * as types from "./types";
import { GetAssociatedFacilitiesResponse } from "@api/requests/facilities/getAssociatedFacilityList";

export const fetchFacilityListStarted = () =>
  ({ type: types.FETCH_ASSOCIATED_FACILITY_STARTED } as const);
export const fetchFacilityListSuccess = (
  res: GetAssociatedFacilitiesResponse
) => ({ type: types.FETCH_ASSOCIATED_FACILITY_SUCCESS, payload: res } as const);
export const fetchFacilityListFailed = (err: any) =>
  ({ type: types.FETCH_ASSOCIATED_FACILITY_FAILED, error: err } as const);

export type ActionTypes =
  | ReturnType<typeof fetchFacilityListStarted>
  | ReturnType<typeof fetchFacilityListSuccess>
  | ReturnType<typeof fetchFacilityListFailed>;
