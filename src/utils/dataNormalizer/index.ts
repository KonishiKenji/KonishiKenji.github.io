import { OptionInterface } from "@components/atoms/DropDown";
import { RadioItemInterface } from "@components/atoms/RadioButtons";
import { CityState } from "@stores/domain/city/type";

export const DEFAULT_SELECT_VALUE: string = "NOT_SELECTED";

export function generateRadioItems(types: {
  [s: number]: string;
}): RadioItemInterface[] {
  const keys = Object.keys(types).filter(
    k => typeof types[k as any] === "number"
  );
  const radioItems = keys.map(key => {
    return {
      label: key,
      value: types[key].toString()
    };
  });
  return radioItems;
}

export function generateDropDownOptions(data: {
  label: string;
  value: string | number;
}): OptionInterface {
  return {
    label: data.label,
    value: data.value
  };
}

export function getLabelFromOptions(value: string, options: any): string {
  if (value === "" || value === DEFAULT_SELECT_VALUE) return options[0].label;
  const res = options.find((item: OptionInterface) => item.value === value);
  return res ? res.label : options[0].label;
}

export function addHyphenToPostalCode(postalCode: string): string {
  return postalCode.concat("-");
}

export function removeHyphenFromPostalCode(postalCode: string): string {
  return postalCode.replace("-", "");
}

export function getSelectedCityCode(
  cityList: CityState[],
  selectedCityId?: number | string
): string {
  let result = "";
  const id = Number(selectedCityId);
  Object.keys(cityList).forEach(key => {
    if (cityList[key].value === id) {
      result = cityList[key].cityCode;
    }
  });

  return result;
}

export function getSelectedCityGrade(
  cityList: CityState[],
  selectedCityId: number | string
): string {
  let result = "";
  const id = Number(selectedCityId);
  Object.keys(cityList).forEach(key => {
    if (cityList[key].value === id) {
      result = cityList[key].grade || "";
    }
  });

  return result;
}
