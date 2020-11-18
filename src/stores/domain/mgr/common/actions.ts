import * as facilityActionsSEIKATSUKAIGO from "@stores/domain/mgr/SEIKATSUKAIGO/facility/actions";
import * as facilityActionsIAB from "@stores/domain/mgr/IAB/facility/actions";
import * as userInFacilityActionsSEIKATSUKAIGO from "@stores/domain/mgr/SEIKATSUKAIGO/userInFacility/actions";
import * as userInFacilityActionsIAB from "@stores/domain/mgr/IAB/userInFacility/actions";
import * as reportActionsSEIKATSUKAIGO from "@stores/domain/mgr/SEIKATSUKAIGO/report/actions";
import * as reportActionsIAB from "@stores/domain/mgr/IAB/report/actions";

import { FacilityType } from "@constants/variables";

/**
 * facilityActions取得
 * @param facilityType
 */
export const getFacilityActions = (
  facilityType: FacilityType
): typeof facilityActionsSEIKATSUKAIGO | typeof facilityActionsIAB => {
  switch (facilityType) {
    case FacilityType.SEIKATSUKAIGO:
      return facilityActionsSEIKATSUKAIGO;
    case FacilityType.A:
    case FacilityType.B:
    case FacilityType.IKOU:
      return facilityActionsIAB;
    default:
  }
  return facilityActionsSEIKATSUKAIGO;
};

export const getUserInFacilityActions = (
  facilityType: FacilityType
):
  | typeof userInFacilityActionsSEIKATSUKAIGO
  | typeof userInFacilityActionsIAB => {
  switch (facilityType) {
    case FacilityType.SEIKATSUKAIGO:
      return userInFacilityActionsSEIKATSUKAIGO;
    case FacilityType.A:
    case FacilityType.B:
    case FacilityType.IKOU:
      return userInFacilityActionsIAB;
    default:
  }
  return userInFacilityActionsSEIKATSUKAIGO;
};

/**
 * reportActionsの取得
 * @param facilityType
 */
export const getReportActions = (
  facilityType: FacilityType
): typeof reportActionsSEIKATSUKAIGO | typeof reportActionsIAB => {
  switch (facilityType) {
    case FacilityType.SEIKATSUKAIGO:
      return reportActionsSEIKATSUKAIGO;
    case FacilityType.A:
    case FacilityType.B:
    case FacilityType.IKOU:
      return reportActionsIAB;
    default:
  }
  return reportActionsSEIKATSUKAIGO;
};
