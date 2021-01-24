import * as types from "./types";
import { NormalizedGetFacilityUserTargetIdResponse } from "./normalizer";
import { GetFacilityUsersResponse } from "@api/requests/facility/getFacilityUsers";

export const fetchStarted = () => ({ type: types.FETCH_STARTED } as const);
export const fetchSuccess = (res: GetFacilityUsersResponse) =>
  ({ type: types.FETCH_SUCCESS, payload: res } as const);
export const fetchFailed = (err: any) =>
  ({ type: types.FETCH_FAILED, error: err } as const);

export const fetchOneStarted = () =>
  ({ type: types.FETCH_ONE_STARTED } as const);
export const fetchOneSuccess = (
  res: NormalizedGetFacilityUserTargetIdResponse
) => ({ type: types.FETCH_ONE_SUCCESS, payload: res } as const);
export const fetchOneFailed = (err: any) =>
  ({ type: types.FETCH_ONE_FAILED, error: err } as const);

export const createStarted = () => ({ type: types.CREATE_STARTED } as const);
export const createSuccess = () => ({ type: types.CREATE_SUCCESS } as const);
export const createFailed = (err: any) =>
  ({ type: types.CREATE_FAILED, error: err } as const);

export const updateStarted = () => ({ type: types.UPDATE_STARTED } as const);
export const updateSuccess = () => ({ type: types.UPDATE_SUCCESS } as const);
export const updateFailed = (err: any) =>
  ({ type: types.UPDATE_FAILED, error: err } as const);

export const clearStarted = () => ({ type: types.CLEAR_STARTED } as const);
export const clearSuccess = () => ({ type: types.CLEAR_SUCCESS } as const);
export const clearFailed = (err: any) =>
  ({ type: types.CLEAR_FAILED, error: err } as const);

export type ActionTypes =
  | ReturnType<typeof fetchStarted>
  | ReturnType<typeof fetchSuccess>
  | ReturnType<typeof fetchFailed>
  | ReturnType<typeof fetchOneStarted>
  | ReturnType<typeof fetchOneSuccess>
  | ReturnType<typeof fetchOneFailed>
  | ReturnType<typeof createStarted>
  | ReturnType<typeof createSuccess>
  | ReturnType<typeof createFailed>
  | ReturnType<typeof updateStarted>
  | ReturnType<typeof updateSuccess>
  | ReturnType<typeof updateFailed>
  | ReturnType<typeof clearStarted>
  | ReturnType<typeof clearSuccess>
  | ReturnType<typeof clearFailed>;
