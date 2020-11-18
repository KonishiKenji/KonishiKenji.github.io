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

export const deleteStarted = () => ({ type: types.DELETE_STARTED } as const);
export const deleteSuccess = (uifId: number) =>
  ({ type: types.DELETE_SUCCESS, meta: { uifId } } as const);
export const deleteFailed = (err: any) =>
  ({ type: types.DELETE_FAILED, error: err } as const);

export const clear = () => ({ type: types.CLEAR } as const);

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
  | ReturnType<typeof deleteStarted>
  | ReturnType<typeof deleteSuccess>
  | ReturnType<typeof deleteFailed>
  | ReturnType<typeof clear>;
