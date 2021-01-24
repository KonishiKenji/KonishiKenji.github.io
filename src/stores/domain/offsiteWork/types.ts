import { GetDownloadResponse } from "@api/requests/offsiteWork/getDownload";
import { GetWorkplaceCompanyListResponse } from "@api/requests/offsiteWork/getWorkplaceCompanyList";
import { GetDownloadablesResponse } from "@api/requests/offsiteWork/getDownloadables";
import { GetWorkplaceCompanyResponse } from "@api/requests/offsiteWork/getWorkplaceCompany";

export const FETCH_DOWNLOAD_STARTED = "OFFSITE_WORK/FETCH_DOWNLOAD_STARTED";
export const FETCH_DOWNLOAD_SUCCESS = "OFFSITE_WORK/FETCH_DOWNLOAD_SUCCESS";
export const FETCH_DOWNLOAD_FAILED = "OFFSITE_WORK/FETCH_DOWNLOAD_FAILED";

export const FETCH_WORKPLACE_COMPANY_LIST_STARTED =
  "OFFSITE_WORK/FETCH_WORKPLACE_COMPANY_LIST_STARTED";
export const FETCH_WORKPLACE_COMPANY_LIST_SUCCESS =
  "OFFSITE_WORK/FETCH_WORKPLACE_COMPANY_LIST_SUCCESS";
export const FETCH_WORKPLACE_COMPANY_LIST_FAILED =
  "OFFSITE_WORK/FETCH_WORKPLACE_COMPANY_LIST_FAILED";

export const FETCH_WORKPLACE_COMPANY_STARTED =
  "OFFSITE_WORK/FETCH_WORKPLACE_COMPANY_STARTED";
export const FETCH_WORKPLACE_COMPANY_SUCCESS =
  "OFFSITE_WORK/FETCH_WORKPLACE_COMPANY_SUCCESS";
export const FETCH_WORKPLACE_COMPANY_FAILED =
  "OFFSITE_WORK/FETCH_WORKPLACE_COMPANY_FAILED";

export const CLEAR_WORKPLACE_COMPANY = "OFFSITE_WORK/CLEAR_WORKPLACE_COMPANY";

export const POST_WORKPLACE_COMPANY_STARTED =
  "OFFSITE_WORK/POST_WORKPLACE_COMPANY_STARTED";
export const POST_WORKPLACE_COMPANY_SUCCESS =
  "OFFSITE_WORK/POST_WORKPLACE_COMPANY_SUCCESS";
export const POST_WORKPLACE_COMPANY_FAILED =
  "OFFSITE_WORK/POST_WORKPLACE_COMPANY_FAILED";

export const DELETE_WORKPLACE_COMPANY_STARTED =
  "OFFSITE_WORK/DELETE_WORKPLACE_COMPANY_STARTED";
export const DELETE_WORKPLACE_COMPANY_SUCCESS =
  "OFFSITE_WORK/DELETE_WORKPLACE_COMPANY_SUCCESS";
export const DELETE_WORKPLACE_COMPANY_FAILED =
  "OFFSITE_WORK/DELETE_WORKPLACE_COMPANY_FAILED";

export const FETCH_DOWNLOADABLE_STARTED =
  "OFFSITE_WORK/FETCH_DOWNLOADABLE_STARTED";
export const FETCH_DOWNLOADABLE_SUCCESS =
  "OFFSITE_WORK/FETCH_DOWNLOADABLE_SUCCESS";
export const FETCH_DOWNLOADABLE_FAILED =
  "OFFSITE_WORK/FETCH_DOWNLOADABLE_FAILED";

export interface Downloadables {
  months: { date: string }[];
}

export interface InitialState {
  download: {
    facility: GetDownloadResponse["data"]["facility"];
    report: GetDownloadResponse["data"]["report"];
  };
  workplaceCompanies: GetWorkplaceCompanyListResponse["data"]["workplace_company"];
  downloadables: GetDownloadablesResponse;
  workplaceCompany: GetWorkplaceCompanyResponse["data"];
}
