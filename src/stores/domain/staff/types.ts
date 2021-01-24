/**
 * ActionNames
 */
export const FETCH_STARTED = "STAFF/FETCH_STARTED";
export const FETCH_SUCCESS = "STAFF/FETCH_SUCCESS";
export const FETCH_FAILED = "STAFF/FETCH_FAILED";
export const POST_STARTED = "STAFF/POST_STARTED";
export const POST_SUCCESS = "STAFF/POST_SUCCESS";
export const POST_FAILED = "STAFF/POST_FAILED";
export const DELETE_STARTED = "STAFF/DELETE_STARTED";
export const DELETE_SUCCESS = "STAFF/DELETE_SUCCESS";
export const DELETE_FAILED = "STAFF/DELETE_FAILED";

export interface StaffData {
  staffItemId: number;
  staffName: string;
  roleName: string;
}

/**
 * State
 */
export interface StaffState {
  staffItems: StaffData[];
}
