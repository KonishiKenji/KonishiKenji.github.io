import { GetWorkResponse } from "@api/requests/work/getWork";

/**
 * ActionNames
 */
export const FETCH_STARTED = "WORK/FETCH_STARTED";
export const FETCH_SUCCESS = "WORK/FETCH_SUCCESS";
export const FETCH_FAILED = "WORK/FETCH_FAILED";
export const POST_STARTED = "WORK/POST_STARTED";
export const POST_SUCCESS = "WORK/POST_SUCCESS";
export const POST_FAILED = "WORK/POST_FAILED";
export const DELETE_STARTED = "WORK/DELETE_STARTED";
export const DELETE_SUCCESS = "WORK/DELETE_SUCCESS";
export const DELETE_FAILED = "WORK/DELETE_FAILED";

export interface WorkCategories {
  categoryId: number;
  categoryName: string;
}

export interface WorkData {
  workItemId: number;
  categoryId: number;
  workName: string;
}

/**
 * State
 */
export interface WorkState {
  workData: GetWorkResponse["data"] | [];
  workCategoryList: WorkCategories[];
  workItems: WorkData[];
}
