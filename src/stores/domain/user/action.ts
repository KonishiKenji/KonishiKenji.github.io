import typescriptFsa from "typescript-fsa";

import { UserResult, UserState } from "@stores/domain/user/type";

const actionCreator = typescriptFsa("USER");

export interface CheckParams {
  token: string | null;
}
export const me = actionCreator.async<void, UserResult>("FETCH");

export const setFacilityValuesToUser = actionCreator<{
  facilityName: UserState["facility_name"];
  businessOwner: UserState["business_owner"];
  multiFunctionOfficeFlag: UserState["isMultipleFacility"];
  masterSubordinateFlg: UserState["isMasterSubordinate"];
}>("SET_FACILITY_VALUES_TO_USER");

export const updateAssociatedFacility = actionCreator<{
  facility_id: UserState["facility_id"];
}>("UPDATE_ASSOCIATED_FACILITY");
