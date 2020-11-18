import { FieldItem } from "@interfaces/ui/form";

/**
 * 任意の配列をセレクトフィールドが扱える形に整形して返す
 * baseItems: Objectの配列
 * labelKeyName: ラベル名に指定するbaseItemsのプロパティ
 * valueKeyName: 値に指定するbaseItemsのプロパティ
 * castValueToString: valueをstringにする（推奨）
 */
const generateSelectFieldItems = <T>(
  baseItems: T[],
  labelKeyName: string,
  valueKeyName: string,
  castValueToString = true
): FieldItem[] => {
  return baseItems.map(item => {
    return {
      label: item[labelKeyName],
      value: castValueToString ? `${item[valueKeyName]}` : item[valueKeyName]
    };
  });
};

export default generateSelectFieldItems;
