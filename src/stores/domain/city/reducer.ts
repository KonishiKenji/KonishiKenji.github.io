import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as action from "@stores/domain/city/action";

const initCityState = [
  {
    label: "",
    value: 0,
    cityCode: "",
    grade: 0
  }
];

const clearCity = () => {
  return [{ label: "選択してください", value: 0, cityCode: "", grade: 0 }];
};

export default reducerWithInitialState(initCityState)
  .case(action.fetch.done, (state, { result }) => {
    return {
      ...result
    };
  })
  .case(action.clearCity, clearCity);
