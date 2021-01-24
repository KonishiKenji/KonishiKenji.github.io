import { FacilityType } from "@constants/variables";

/**
 * /mgr/user の結果
 */
export interface UserResultFeatureGroup {
  group_invoice: number;
  group_operation_support: number;
  group_labor_charge: number;
}

export interface UserResultLabels {
  facility_user: string;
  punch_in: string;
  punch_out: string;
}

export interface UserResult {
  name: string;
  nickname: string;
  role: string;
  featureGroup: UserResultFeatureGroup;
  isAdmin: boolean;
  isSupport: boolean;
  facility_type: FacilityType;
  labels: UserResultLabels;
  isMultipleFacility: boolean;
}

export interface UserState {
  id: number;
  name: string;
  nickname: string;
  role: string;
  featureGroup: UserResultFeatureGroup;
  isAdmin: boolean;
  isSupport: boolean;
  facility_type: FacilityType;
  labels: UserResultLabels;
  isMultipleFacility: boolean;
  done: boolean;
  isLoading: boolean;
  facility_name: string;
  business_owner: string;
  isMasterSubordinate: boolean;
  facility_id: number;
}
