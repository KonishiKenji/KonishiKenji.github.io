/**
 * 事業者情報: 加算対象項目
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import { CheckBoxValue } from "@interfaces/ui/form";

interface Base<T> {
  additionalItem: T;
}

interface Fields {
  workHardenesResultFlag: CheckBoxValue;
  workPlaceAdaptationAssistantFlag: CheckBoxValue;
}

type Errors = ValidationErrors<Fields>;

export type AdditionalItemValues = Base<Fields>;
export type AdditionalItemErrors = Base<Errors>;
