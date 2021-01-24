import { GetAssociatedFacilitiesResponse } from "@api/requests/facilities/getAssociatedFacilityList";

/**
 * ActionNames
 */
export const FETCH_ASSOCIATED_FACILITY_STARTED =
  "SWITCH_ASSOCIATED_FACILITY/FETCH_ASSOCIATED_FACILITY_STARTED";
export const FETCH_ASSOCIATED_FACILITY_SUCCESS =
  "SWITCH_ASSOCIATED_FACILITY/FETCH_ASSOCIATED_FACILITY_SUCCESS";
export const FETCH_ASSOCIATED_FACILITY_FAILED =
  "SWITCH_ASSOCIATED_FACILITY/FETCH_ASSOCIATED_FACILITY_FAILED";

export interface AssociatedFacilityListState {
  data: GetAssociatedFacilitiesResponse["data"];
}
