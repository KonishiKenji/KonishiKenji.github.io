import { InitialState } from "./types";
import { GetInitialResponse } from "@api/requests/initial/getInitial";
import { PostInitialParams } from "@api/requests/initial/postInitial";
import { InitialDataValues } from "@interfaces/mgr/TANKINYUSHO/initial/initialData";
import { SelectDateValue } from "@interfaces/ui/form";
import { selectDateValueToDatePaddingZero } from "@utils/date";
import isEqual from "lodash-es/isEqual";
import isEmpty from "lodash-es/isEmpty";

/**
 * Normalized Type
 */
export type NormalizedGetInitialResponse = InitialState;

const normalizeApiParams = (
  result: GetInitialResponse["data"]
): InitialState => {
  if (
    result.facility.first_time_bill_date === null ||
    result.facility.first_time_bill_date === "0000-00-00"
  ) {
    result.facility.first_time_bill_date = "";
  }
  return { ...result };
};

export const normalizeGetInitialResult = (
  response: GetInitialResponse
): NormalizedGetInitialResponse => normalizeApiParams(response.data);

export const normalizePostInitialParams = (
  params: Partial<PostInitialParams>,
  state: InitialState
): InitialState => {
  const returnFacility = { ...state.facility, ...params.facility };
  const returnUsers = { ...state.users, ...params.users };

  return { facility: returnFacility, users: returnUsers };
};

export const normalizeFormValue = (
  values: InitialDataValues,
  initialState: InitialState
): PostInitialParams => {
  const postFacilityValue: PostInitialParams["facility"] = {};
  // first_time_bill_dateのフォーム値は日にちの情報を持たない為
  // 1日をデフォルトで設定しておく
  values.initialData.facility.first_time_bill_date.day = "1";
  if (
    !isEqual(
      undefinedStringReturnValue(
        initialState.facility.first_time_bill_date,
        ""
      ),
      selectDateValueToDatePaddingZero(
        values.initialData.facility.first_time_bill_date
      )
    )
  ) {
    postFacilityValue.first_time_bill_date = selectDateValueToDatePaddingZero(
      values.initialData.facility.first_time_bill_date
    );
  }
  if (
    initialState.facility.total_number_of_users_1_month_before !==
    stringToNumber(
      values.initialData.facility.total_number_of_users_1_month_before
    )
  ) {
    postFacilityValue.total_number_of_users_1_month_before = stringToNumber(
      values.initialData.facility.total_number_of_users_1_month_before
    );
  }
  if (
    initialState.facility.total_number_of_users_2_month_before !==
    stringToNumber(
      values.initialData.facility.total_number_of_users_2_month_before
    )
  ) {
    postFacilityValue.total_number_of_users_2_month_before = stringToNumber(
      values.initialData.facility.total_number_of_users_2_month_before
    );
  }
  if (
    initialState.facility.total_number_of_users_3_month_before !==
    stringToNumber(
      values.initialData.facility.total_number_of_users_3_month_before
    )
  ) {
    postFacilityValue.total_number_of_users_3_month_before = stringToNumber(
      values.initialData.facility.total_number_of_users_3_month_before
    );
  }

  const postUsersValue: PostInitialParams["users"] = [];
  values.initialData.users.map((user, index) => {
    const initialDataUser: PostInitialParams["users"][0]["users_in_facility_tankinyusho"] = {
      short_term_usage_addition_start_date: selectDateValueToDatePaddingZero(
        notSelectedDateToEmpty(
          user.users_in_facility_tankinyusho
            .short_term_usage_addition_start_date
        )
      ),
      short_term_usage_addition_count: stringToNumber(
        user.users_in_facility_tankinyusho.short_term_usage_addition_count
      )
    };
    const diffUifTANKINYUSHO = createUifTANKINYUSHO(
      initialState,
      initialDataUser,
      index
    );
    if (!isEmpty(diffUifTANKINYUSHO)) {
      postUsersValue.push({
        id: initialState.users[index].id,
        name_sei: initialState.users[index].name_sei,
        name_mei: initialState.users[index].name_mei,
        total_days_in_fiscal_year:
          initialState.users[index].total_days_in_fiscal_year,
        users_in_facility_tankinyusho: diffUifTANKINYUSHO
      });
    }
  });

  return { facility: postFacilityValue, users: postUsersValue };
};

const notSelectedDateToEmpty = (value: SelectDateValue): SelectDateValue => {
  const date = {
    year: value.year === "NOT_SELECTED" ? "" : value.year,
    month: value.month,
    day: value.day
  };
  return date;
};

/**
 * users_in_facility_tankinyushoの差分抽出メソッド
 */
const createUifTANKINYUSHO = (
  initialState: InitialState,
  initialDataUser: PostInitialParams["users"][0]["users_in_facility_tankinyusho"],
  index: number
): PostInitialParams["users"][0]["users_in_facility_tankinyusho"] => {
  const postUifTANKINYUSHO: PostInitialParams["users"][0]["users_in_facility_tankinyusho"] = {
    id: undefined,
    short_term_usage_addition_start_date: undefined,
    short_term_usage_addition_count: undefined
  };
  const stateUifTANKINYUSHO = initialState.users[index]
    .users_in_facility_tankinyusho
    ? initialState.users[index].users_in_facility_tankinyusho
    : {};
  // selectDateValueToDatePaddingZeroが返り値nullのためnullでの差分判定
  if (
    initialDataUser &&
    stateUifTANKINYUSHO &&
    !isEqual(
      undefinedStringReturnValue(
        stateUifTANKINYUSHO.short_term_usage_addition_start_date,
        null
      ),
      initialDataUser.short_term_usage_addition_start_date
    )
  ) {
    postUifTANKINYUSHO.short_term_usage_addition_start_date =
      initialDataUser.short_term_usage_addition_start_date;
  }
  // selectDateValueToDatePaddingZeroが返り値nullのためnullでの差分判定
  if (
    initialDataUser &&
    stateUifTANKINYUSHO &&
    !isEqual(
      undefinedStringReturnValue(
        stateUifTANKINYUSHO.short_term_usage_addition_count,
        null
      ),
      initialDataUser.short_term_usage_addition_count
    )
  ) {
    postUifTANKINYUSHO.short_term_usage_addition_count =
      initialDataUser.short_term_usage_addition_count;
  }

  Object.keys(postUifTANKINYUSHO).forEach(key => {
    if (postUifTANKINYUSHO[key] === undefined) {
      delete postUifTANKINYUSHO[key];
    }
  });

  if (!isEmpty(postUifTANKINYUSHO)) {
    postUifTANKINYUSHO.id = stateUifTANKINYUSHO ? stateUifTANKINYUSHO.id : 0;
  }

  return postUifTANKINYUSHO;
};

/**
 * stringの時だけnumberに変換
 */
const stringToNumber = (value?: string): number | undefined => {
  return value !== undefined ? Number(value) : value;
};

const undefinedStringReturnValue = (
  value: string | number | null | undefined,
  returnValue: string | null
) => {
  if (value === null || value === undefined) {
    return returnValue;
  }
  return value;
};
