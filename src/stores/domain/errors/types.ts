import { GetInvoiceErrorsResponse } from "@api/requests/errors/getInvoiceErrors";
import { GetUserErrorsResponse } from "@api/requests/errors/getUserErrors";
import { GetInOutErrorsResponse } from "@api/requests/errors/getInOutErrors";
import { GetSummaryErrorsResponse } from "@api/requests/errors/getSummaryErrors";
import { GetPlanErrorsResponse } from "@api/requests/errors/getPlanErrors";
import { GetGoalErrorsResponse } from "@api/requests/errors/getGoalErrors";
import { GetRecordErrorsResponse } from "@api/requests/errors/getRecordErrors";
import { GetOffsiteWorkErrorsResponse } from "@api/requests/errors/getOffsiteWorkErrors";

/**
 * ActionNames
 */
export const FETCH_INVOICE_STARTED = "ERRORS/FETCH_INVOICE_STARTED";
export const FETCH_INVOICE_SUCCESS = "ERRORS/FETCH_INVOICE_SUCCESS";
export const FETCH_INVOICE_FAILED = "ERRORS/FETCH_INVOICE_FAILED";
export const FETCH_USER_STARTED = "ERRORS/FETCH_USER_STARTED";
export const FETCH_USER_SUCCESS = "ERRORS/FETCH_USER_SUCCESS";
export const FETCH_USER_FAILED = "ERRORS/FETCH_USES_FAILED";
export const FETCH_INOUT_STARTED = "ERRORS/FETCH_INOUT_STARTED";
export const FETCH_INOUT_SUCCESS = "ERRORS/FETCH_INOUT_SUCCESS";
export const FETCH_INOUT_FAILED = "ERRORS/FETCH_INOUT_FAILED";
export const FETCH_SUMMARY_STARTED = "ERRORS/FETCH_SUMMARY_STARTED";
export const FETCH_SUMMARY_SUCCESS = "ERRORS/FETCH_SUMMARY_SUCCESS";
export const FETCH_SUMMARY_FAILED = "ERRORS/FETCH_SUMMARY_FAILED";

export const FETCH_PLAN_STARTED = "ERRORS_FETCH_PLAN_STARTED";
export const FETCH_PLAN_SUCCESS = "ERRORS_FETCH_PLAN_SUCCESS";
export const FETCH_PLAN_FAILED = "ERRORS_FETCH_PLAN_FAILED";

export const FETCH_GOAL_STARTED = "ERRORS_FETCH_GOAL_STARTED";
export const FETCH_GOAL_SUCCESS = "ERRORS_FETCH_GOAL_SUCCESS";
export const FETCH_GOAL_FAILED = "ERRORS_FETCH_GOAL_FAILED";

export const FETCH_RECORD_STARTED = "ERRORS/FETCH_RECORD_STARTED";
export const FETCH_RECORD_SUCCESS = "ERRORS/FETCH_RECORD_SUCCESS";
export const FETCH_RECORD_FAILED = "ERRORS/FETCH_RECORd_FAILED";

export const FETCH_OFFSITE_WORK_STARTED = "ERRORS/FETCH_OFFSITE_WORK_STARTED";
export const FETCH_OFFSITE_WORK_SUCCESS = "ERRORS/FETCH_OFFSITE_WORK_SUCCESS";
export const FETCH_OFFSITE_WORK_FAILED = "ERRORS/FETCH_OFFSITE_WORK_FAILED";

export interface ErrorsState {
  invoice: {
    data: GetInvoiceErrorsResponse["data"];
    loading: boolean;
    hasError: boolean;
    errorCount: number;
  };
  users: {
    data: GetUserErrorsResponse["data"];
    hasError: boolean;
    errorCount: number;
  };
  inout: {
    data: GetInOutErrorsResponse["data"];
    hasError: boolean;
    errorCount: number;
  };
  summary: GetSummaryErrorsResponse["data"];
  plan: {
    data: GetPlanErrorsResponse["data"];
    hasError: boolean;
    errorCount: number;
  };
  goal: {
    data: GetGoalErrorsResponse["data"];
    hasError: boolean;
    errorCount: number;
  };
  records: {
    data: GetRecordErrorsResponse["data"];
    hasError: boolean;
    errorCount: number;
  };
  offsiteWork: {
    data: GetOffsiteWorkErrorsResponse["data"];
    hasError: boolean;
    errorCount: number;
  };
}
