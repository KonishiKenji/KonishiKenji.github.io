import * as React from "react";
import { OptionInterface } from "@components/atoms/DropDown";
import { RadioItemInterface } from "@components/atoms/RadioButtons";

export type Field = {
  id: string;
  type:
    | FieldType.CHECKBOX
    | FieldType.DROP_DOWN
    | FieldType.RADIO_BUTTON
    | FieldType.SWITCH
    | FieldType.TEXT
    | FieldType.DATE_SELECT_FIELDS
    | FieldType.LABEL
    | FieldType.DESCRIPTION;
  value: string;
  onChange: (event: React.ChangeEvent<{}>, value?: string | boolean) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  styles?: object;
  label?: string;
  radioItems?: RadioItemInterface[];
  selectItems?: OptionInterface[];
  checked?: boolean;
  placeholder?: string;
  helperText?: string;
  startAdornmentLabel?: string;
  endAdornmentLabel?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  isMultiLine?: boolean;
  size?:
    | "textFieldSuperSmall"
    | "textFieldSmall"
    | "textFieldMedium"
    | "textFieldLong"
    | "textFieldHalfSuperLong"
    | "textFieldSuperLong"
    | "textFieldFullSize";
  textInputType?: "text" | "password" | "number" | "tel" | "email" | "date";
  minLength?: number;
  maxLength?: number;
  errorMessage?: string;
  descriptionTitle?: string;
  inputStyle?: object;
  isHelperTitleTip?: boolean;
  helperItemTip?: object;
};

export enum FieldType {
  CHECKBOX = "CHECKBOX",
  DROP_DOWN = "DROP_DOWN",
  RADIO_BUTTON = "RADIO_BUTTON",
  SWITCH = "SWITCH",
  TEXT = "TEXT",
  DATE_SELECT_FIELDS = "DATE_SELECT_FIELDS",
  LABEL = "LABEL",
  DESCRIPTION = "DESCRIPTION"
}
