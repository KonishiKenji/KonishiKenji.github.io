import { Dispatch } from "redux";
import * as actions from "./actions";
import * as loadingActions from "@stores/loading/actions";
import errorsApi from "@api/requests/errors";
import { GetInOutErrorsResponse } from "@api/requests/errors/getInOutErrors";
// import dispatches from "@stores/dispatches";
import * as format from "date-fns/format";
import * as getYear from "date-fns/get_year";
import * as getMonth from "date-fns/get_month";
import * as addMonths from "date-fns/add_months";

/**
 * errors.resolutionから日付のリストを生成する
 */
const makeErrorsDateList = (res: GetInOutErrorsResponse["data"]): string[] => {
  const dateList: string[] = [];
  if (res[0]) {
    res[0].errors.forEach((error) => {
      // 日付を持たないエラーの時にrelationがないのでチェックがいる
      if (error.relation && error.relation.value) {
        dateList.push(format(error.relation.value, "YYYY-MM-DD"));
      }
    });
  }
  return dateList;
};

/**
 * 現在の月と1つ前の月のエラーを取得する
 */
export const fetchLatestInoutErrors = (dispatch: Dispatch) => async () => {
  dispatch(loadingActions.loadStarted());
  dispatch(actions.fetchLatestInoutErrorsStarted());
  const currentDate = new Date();
  const oneMonthAgoDate = addMonths(currentDate, -1);
  await Promise.all([
    errorsApi.getInOutErrors(
      `${getYear(currentDate)}`,
      `${getMonth(currentDate) + 1}`
    ),
    errorsApi.getInOutErrors(
      `${getYear(oneMonthAgoDate)}`,
      `${getMonth(oneMonthAgoDate) + 1}`
    )
  ])
    .then((res) => {
      const errorsDataList = [
        ...makeErrorsDateList(res[0].data.data),
        ...makeErrorsDateList(res[1].data.data)
      ];
      dispatch(actions.fetchLatestInoutErrorsSuccess(errorsDataList));
    })
    .catch((e) => {
      // 保留中
      dispatch(actions.fetchLatestInoutErrorsFailed());
    })
    .finally(() => dispatch(loadingActions.loadDone()));
};

export default (dispatch: Dispatch) => ({
  fetchLatestInoutErrors: fetchLatestInoutErrors(dispatch)
});
