import { normalizeGetFacilityResult as normalizeGetFacilityResultSEIKATSUKAIGO } from "@stores/domain/mgr/SEIKATSUKAIGO/facility/normalizer";
import { normalizeGetFacilityResult as normalizeGetFacilityResultIAB } from "@stores/domain/mgr/IAB/facility/normalizer";
import {
  normalizedGetFacilityUserTargetIdResponse as normalizedGetFacilityUserTargetIdResponseSEIKATSUKAIGO,
  NormalizedGetFacilityUserTargetIdResponse as NormalizedGetFacilityUserTargetIdResponseSEIKATSUKAIGO
} from "@stores/domain/mgr/SEIKATSUKAIGO/userInFacility/normalizer";
import {
  normalizedGetFacilityUserTargetIdResponse as normalizedGetFacilityUserTargetIdResponseIAB,
  NormalizedGetFacilityUserTargetIdResponse as NormalizedGetFacilityUserTargetIdResponseIAB
} from "@stores/domain/mgr/IAB/userInFacility/normalizer";
import { nomalizeSEIKATSUKAIGODailySummaryDataFromAPI } from "@stores/domain/mgr/SEIKATSUKAIGO/report/normalizer";
import { normalizeIABDailySummaryDataFromAPI } from "@stores/domain/mgr/IAB/report/normalizer";
import { SEIKATSUKAIGOSummary } from "@stores/domain/mgr/SEIKATSUKAIGO/report/types";
import { IABSummary } from "@stores/domain/mgr/IAB/report/types";
import { GetInOutDailySummaryResponse } from "@api/requests/inOut/getInOutSummary";
import { GetFacilityResponse } from "@api/requests/facility/getFacility";
import { FacilityState as FacilityStateIAB } from "@stores/domain/mgr/IAB/facility/types";
import { FacilityState as FacilityStateSEIKATSUKAIGO } from "@stores/domain/mgr/SEIKATSUKAIGO/facility/types";

import { FacilityType } from "@constants/variables";

/**
 * Get Facilityのnormalizeを渡す
 * @param facilityType
 */
export const getNormalizeGetFacilityResult = (
  facilityType: FacilityType
):
  | ((response: GetFacilityResponse) => FacilityStateSEIKATSUKAIGO)
  | ((result: GetFacilityResponse) => FacilityStateIAB) => {
  switch (facilityType) {
    case FacilityType.SEIKATSUKAIGO:
      return normalizeGetFacilityResultSEIKATSUKAIGO;
    case FacilityType.A:
    case FacilityType.B:
    case FacilityType.IKOU:
      return normalizeGetFacilityResultIAB;
    default:
  }
  return normalizeGetFacilityResultSEIKATSUKAIGO;
};

export const getNormalizedGetFacilityUserTargetIdResponse = (
  facilityType: FacilityType
): ((
  result: any
) =>
  | NormalizedGetFacilityUserTargetIdResponseSEIKATSUKAIGO
  | NormalizedGetFacilityUserTargetIdResponseIAB) => {
  switch (facilityType) {
    case FacilityType.SEIKATSUKAIGO:
      return normalizedGetFacilityUserTargetIdResponseSEIKATSUKAIGO;
    case FacilityType.A:
    case FacilityType.B:
    case FacilityType.IKOU:
      return normalizedGetFacilityUserTargetIdResponseIAB;
    default:
  }
  return normalizedGetFacilityUserTargetIdResponseSEIKATSUKAIGO;
};

/**
 * Get DailySummaryDataのnormalizeを渡す
 * @param facilityType
 */
export const getNormalizeGetDailySummaryData = (
  facilityType: FacilityType
): ((
  result: GetInOutDailySummaryResponse
) => SEIKATSUKAIGOSummary | IABSummary) => {
  switch (facilityType) {
    case FacilityType.SEIKATSUKAIGO:
      return nomalizeSEIKATSUKAIGODailySummaryDataFromAPI;
    case FacilityType.A:
    case FacilityType.B:
    case FacilityType.IKOU:
      return normalizeIABDailySummaryDataFromAPI;
    default:
  }
  return nomalizeSEIKATSUKAIGODailySummaryDataFromAPI;
};
