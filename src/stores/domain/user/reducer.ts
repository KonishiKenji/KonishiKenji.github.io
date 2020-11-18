import * as action from "@stores/domain/user/action";

import { reducerWithInitialState } from "typescript-fsa-reducers";

import { UserState } from "@stores/domain/user/type";

const doneMe = (state: UserState, { result }: { result: any }) => ({
  ...state,
  ...result,
  done: true,
  isLoading: true
});

const startedMe = (state: UserState) => ({
  ...state,
  done: false,
  isLoading: true
});

const setFacilityValuesToUser = (
  state: UserState,
  payload: {
    facilityName: UserState["facility_name"];
    businessOwner: UserState["business_owner"];
    multiFunctionOfficeFlag: UserState["isMultipleFacility"];
    masterSubordinateFlg: UserState["isMasterSubordinate"];
  }
) => {
  return {
    ...state,
    facility_name: payload.facilityName,
    business_owner: payload.businessOwner,
    isMultipleFacility: payload.multiFunctionOfficeFlag,
    isMasterSubordinate: payload.masterSubordinateFlg
  };
};

const updateAssociatedFacility = (
  state: UserState,
  payload: {
    facility_id: UserState["facility_id"];
  }
) => {
  return {
    ...state
  };
};

const initUserState = {} as UserState;

export default reducerWithInitialState(initUserState)
  .case(action.me.started, startedMe)
  .case(action.me.done, doneMe)
  .case(action.setFacilityValuesToUser, setFacilityValuesToUser)
  .case(action.updateAssociatedFacility, updateAssociatedFacility);
