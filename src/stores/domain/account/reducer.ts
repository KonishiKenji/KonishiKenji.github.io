import { Success, Failure } from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import get from "lodash-es/get";
import * as action from "@stores/domain/account/action";
import {
  GetTargetFacilityUserResult,
  UpdatePasswordFailed,
  AccountState,
  ActivateResult,
  GetURLValidityResult
} from "@stores/domain/account/type";

const initialState: AccountState = {
  errors: undefined,
  errorType: "",
  admin: {
    email: "",
    role: ""
  },
  user: {
    email: "",
    role: ""
  },
  activateRes: []
};

const getURLValidResultStarted = (state: AccountState) => state;
const getURLValidResultDone = (
  state: AccountState,
  payload: Success<{}, GetURLValidityResult>
) => ({
  ...state,
  status: payload.result.status
});
const getURLValidResultFailed = (state: AccountState) => state;

const getTargetFacilityUserStarted = (state: AccountState) => state;
const getTargetFacilityUserDone = (
  state: AccountState,
  payload: Success<{}, GetTargetFacilityUserResult>
) => ({
  ...state,
  admin: payload.result[0],
  user: payload.result[1] || {
    email: "",
    role: ""
  }
});
const getTargetFacilityUserFailed = (state: AccountState) => state;

const updatePasswordStarted = (state: AccountState) => ({
  ...state,
  errorType: ""
});
const updatePasswordDone = (state: AccountState, payload: any) => state;
const updatePasswordFailed = (
  state: AccountState,
  payload: Failure<{ formName: string }, UpdatePasswordFailed>
) => ({
  ...state,
  errors: { ...state.errors, [payload.params.formName]: payload.error },
  errorType: get(payload, "error[0].error[0].message") || "error"
});

const activateFailed = (state: AccountState, data: ActivateResult) => {
  return {
    ...state,
    activateRes: data
  };
};

const refreshActivateErrorMessage = (state: AccountState) => {
  return {
    ...state,
    activateRes: []
  };
};

const refreshActivateErrorMessageMgrAdminPassword = (state: AccountState) => {
  const res = state.activateRes.filter(target => {
    return !(target.role === "mgradmin" && target.error.target === "password");
  });
  return {
    ...state,
    activateRes: res
  };
};

const refreshActivateErrorMessageMgrUserAccountId = (state: AccountState) => {
  const res = state.activateRes.filter(target => {
    return !(target.role === "mgruser" && target.error.target === "email");
  });
  return {
    ...state,
    activateRes: res
  };
};

const refreshActivateErrorMessageMgrUserPassword = (state: AccountState) => {
  const res = state.activateRes.filter(target => {
    return !(target.role === "mgruser" && target.error.target === "password");
  });
  return {
    ...state,
    activateRes: res
  };
};

export default reducerWithInitialState(initialState)
  .case(action.getURLValidity.started, getURLValidResultStarted)
  .case(action.getURLValidity.done, getURLValidResultDone)
  .case(action.getURLValidity.failed, getURLValidResultFailed)
  .case(action.getTargetFacilityUser.started, getTargetFacilityUserStarted)
  .case(action.getTargetFacilityUser.done, getTargetFacilityUserDone)
  .case(action.getTargetFacilityUser.failed, getTargetFacilityUserFailed)
  .case(action.updatePassword.started, updatePasswordStarted)
  .case(action.updatePassword.done, updatePasswordDone)
  .case(action.updatePassword.failed, updatePasswordFailed)
  .case(action.activateFailed, activateFailed)
  .case(action.refreshActivateErrorMessage, refreshActivateErrorMessage)
  .case(
    action.refreshActivateErrorMessageMgrAdminPassword,
    refreshActivateErrorMessageMgrAdminPassword
  )
  .case(
    action.refreshActivateErrorMessageMgrUserAccountId,
    refreshActivateErrorMessageMgrUserAccountId
  )
  .case(
    action.refreshActivateErrorMessageMgrUserPassword,
    refreshActivateErrorMessageMgrUserPassword
  );
