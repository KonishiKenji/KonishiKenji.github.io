import { InitialState } from "./types";
import { GetInitialResponse } from "@api/requests/initial/getInitial";
import { PostInitialParams } from "@api/requests/initial/postInitial";
import { InitialDataValues } from "@interfaces/mgr/JIRITSUKUNRENSEIKATSU/initial/initialData";
import { selectDateValueToDatePaddingZero } from "@utils/date";
import isEmpty from "lodash-es/isEmpty";
import isEqual from "lodash-es/isEqual";
import { SelectDateValue } from "@interfaces/ui/form";
import { UsersInFacilityJIRITSUKUNRENSEIKATSU } from "@api/requests/initial/params/usersInFacilityJIRITSUKUNRENSEIKATSU";

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
    return {
      ...result,
      facility: {
        ...result.facility,
        first_time_bill_date: ""
      }
    };
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
  const returnUsers = state.users.map((user) => {
    const diffUser = params.users
      ? params.users.find((paramUser) => paramUser && user.id === paramUser.id)
      : undefined;
    if (diffUser) {
      const uifJIRITSUKUNRENSEIKATSU = {
        ...user.users_in_facility_jiritsukunren_seikatsu,
        ...diffUser.users_in_facility_jiritsukunren_seikatsu
      };
      return {
        ...user,
        ...diffUser,
        users_in_facility_jiritsukunren_seikatsu: uifJIRITSUKUNRENSEIKATSU
      };
    }
    return user;
  });
  return { facility: returnFacility, users: returnUsers };
};

/**
 * stringの時だけnumberに変換
 */
const stringToNumber = (value?: string): number | undefined => {
  return value !== undefined ? Number(value) : value;
};

const undefinedStringReturnValue = (
  value: string | null | undefined,
  returnValue: string | null
): string | null => {
  if (value === null || value === undefined) {
    return returnValue;
  }
  return value;
};

/**
 * users_in_facility_jiritsukunren_seikatsuの差分抽出メソッド
 */
const createUifJIRITSUKUNRENSEIKATSU = (
  initialState: InitialState,
  initialDateUser: Partial<UsersInFacilityJIRITSUKUNRENSEIKATSU>,
  index: number
): Partial<UsersInFacilityJIRITSUKUNRENSEIKATSU> => {
  const postUifJIRITSUKUNRENSEIKATSU: Partial<UsersInFacilityJIRITSUKUNRENSEIKATSU> = {
    id: undefined,
    social_life_support_start_date: undefined,
    visit_start_date: undefined
  };
  const stateUifJIRITSUKUNRENSEIKATSU = initialState.users[index]
    .users_in_facility_jiritsukunren_seikatsu
    ? initialState.users[index].users_in_facility_jiritsukunren_seikatsu
    : {};
  // selectDateValueToDatePaddingZeroが返り値nullのためnullでの差分判定
  if (
    stateUifJIRITSUKUNRENSEIKATSU &&
    !isEqual(
      undefinedStringReturnValue(
        stateUifJIRITSUKUNRENSEIKATSU.social_life_support_start_date,
        null
      ),
      initialDateUser.social_life_support_start_date
    )
  ) {
    postUifJIRITSUKUNRENSEIKATSU.social_life_support_start_date =
      initialDateUser.social_life_support_start_date;
  }
  // selectDateValueToDatePaddingZeroが返り値nullのためnullでの差分判定
  if (
    stateUifJIRITSUKUNRENSEIKATSU &&
    !isEqual(
      undefinedStringReturnValue(
        stateUifJIRITSUKUNRENSEIKATSU.visit_start_date,
        null
      ),
      initialDateUser.visit_start_date
    )
  ) {
    postUifJIRITSUKUNRENSEIKATSU.visit_start_date =
      initialDateUser.visit_start_date;
  }

  Object.keys(postUifJIRITSUKUNRENSEIKATSU).forEach((key) => {
    if (postUifJIRITSUKUNRENSEIKATSU[key] === undefined) {
      delete postUifJIRITSUKUNRENSEIKATSU[key];
    }
  });

  if (!isEmpty(postUifJIRITSUKUNRENSEIKATSU)) {
    postUifJIRITSUKUNRENSEIKATSU.id = stateUifJIRITSUKUNRENSEIKATSU
      ? stateUifJIRITSUKUNRENSEIKATSU.id
      : 0;
  }

  return postUifJIRITSUKUNRENSEIKATSU;
};

export const normalizeFormValue = (
  values: InitialDataValues,
  initialState: InitialState
): PostInitialParams => {
  const postFacilityValue: PostInitialParams["facility"] = {};
  // first_time_bill_dateのフォーム値は日にちの情報を持たない為
  // 1日をデフォルトで設定しておく
  const { first_time_bill_date } = values.initialData.facility;
  const tmpFiestTimeBillDate = { ...first_time_bill_date, day: "1" };
  if (
    !isEqual(
      undefinedStringReturnValue(
        initialState.facility.first_time_bill_date,
        ""
      ),
      selectDateValueToDatePaddingZero(tmpFiestTimeBillDate)
    )
  ) {
    postFacilityValue.first_time_bill_date = selectDateValueToDatePaddingZero(
      tmpFiestTimeBillDate
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
  const notSelectedDateToEmpty = (value: SelectDateValue): SelectDateValue => {
    return {
      year: value.year === "NOT_SELECTED" ? "" : value.year,
      month: value.month,
      day: value.day
    };
  };
  values.initialData.users.forEach((user, index) => {
    const initialDateUser: Partial<UsersInFacilityJIRITSUKUNRENSEIKATSU> = {
      social_life_support_start_date: selectDateValueToDatePaddingZero(
        notSelectedDateToEmpty(
          user.users_in_facility_jiritsukunren_seikatsu
            .social_life_support_start_date
        )
      ),
      visit_start_date: selectDateValueToDatePaddingZero(
        notSelectedDateToEmpty(
          user.users_in_facility_jiritsukunren_seikatsu.visit_start_date
        )
      )
    };
    const diffUifJIRITSUKUNRENSEIKATSU = createUifJIRITSUKUNRENSEIKATSU(
      initialState,
      initialDateUser,
      index
    );
    if (!isEmpty(diffUifJIRITSUKUNRENSEIKATSU)) {
      postUsersValue.push({
        id: initialState.users[index].id,
        name_sei: initialState.users[index].name_sei,
        name_mei: initialState.users[index].name_mei,
        total_days_in_fiscal_year:
          initialState.users[index].total_days_in_fiscal_year,
        users_in_facility_jiritsukunren_seikatsu: diffUifJIRITSUKUNRENSEIKATSU
      });
    }
  });

  return {
    facility: postFacilityValue,
    users: postUsersValue
  };
};
