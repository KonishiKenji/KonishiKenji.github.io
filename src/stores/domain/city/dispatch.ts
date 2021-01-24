import { Dispatch } from "redux";
import * as action from "@stores/domain/city/action";
import dispatches from "@stores/dispatches";

import { CityParams } from "./type";
import { DEFAULT_CITY_STATE } from "@constants/variables";

import cityApi from "@api/requests/city";

export const fetch = (dispatch: Dispatch) => async (
  params: CityParams
): Promise<void> => {
  dispatch(action.fetch.started());

  await cityApi
    .getCityList(params.prefectureName)
    .then(response => {
      const data = response.data.data;
      // todo: DEFAULT_CITY_STATE の型が CityState と異なるため any で回避…苦肉の策
      /* eslint-disable @typescript-eslint/no-explicit-any */
      data.unshift(DEFAULT_CITY_STATE as any);
      dispatch(action.fetch.done({ result: data }));
    })
    .catch(e => {
      dispatch(action.fetch.failed({ error: e.response }));
      dispatches.uiDispatch(dispatch).responseError(e.response);
    });
};

const clearCity = (dispatch: Dispatch) => () => {
  dispatch(action.clearCity());
};

export default function(dispatch: Dispatch) {
  return {
    fetch: fetch(dispatch),
    clearCity: clearCity(dispatch)
  };
}
