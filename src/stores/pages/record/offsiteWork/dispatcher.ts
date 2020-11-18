import { Dispatch } from "redux";
import * as actions from "./actions";

/**
 *  施設外就労実施報告書の印刷対象の設定
 */
export const setOffsiteWorkMonth = (dispatch: Dispatch) => async (
  date: string
) => dispatch(actions.setOffsiteWorkMonth(date));

export default (dispatch: Dispatch) => ({
  setOffsiteWorkMonth: setOffsiteWorkMonth(dispatch)
});
