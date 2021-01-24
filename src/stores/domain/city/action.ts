import typescriptFsa from "typescript-fsa";

import { CityState } from "@stores/domain/city/type";

const actionCreator = typescriptFsa("CITY");

export const fetch = actionCreator.async<void, CityState[]>("FETCH");
export const clearCity = actionCreator("CLEAR_CITY");
