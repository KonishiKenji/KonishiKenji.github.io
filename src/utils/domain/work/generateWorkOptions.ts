import { GetSupportsRecordResponse } from "@api/requests/supports/getSupportsRecord";
import { GetOperations } from "@api/requests/operations/getOperations";
import { FieldItem, CategorizedFieldItem } from "@interfaces/ui/form";

type Operation = Exclude<
  GetOperations["data"]["operation"][0]["operation_work_history"],
  null
>;
type Support = Exclude<
  GetSupportsRecordResponse["data"]["support"][0]["support_work_history"],
  null
>;

/**
 * "作業のオプションにworkHistory内の作業情報を追加する
 */
const generateWorkOptions = (
  workOptions: CategorizedFieldItem[],
  workHistory: Operation | Support
): CategorizedFieldItem[] => {
  const resultOptions = workOptions.map((work) => ({
    categoryId: work.categoryId,
    categoryName: work.categoryName,
    items: work.items.map((item) => ({
      value: item.value,
      label: item.label,
      deleteFlg: false
    }))
  }));
  workOptions.forEach((work, i) => {
    workHistory.forEach((history: Operation[0] | Support[0]) => {
      if (
        work.categoryId === history.category_id &&
        !resultOptions[i].items.some(
          (item: FieldItem) =>
            item.value === history.item_id && item.label === history.item_name
        )
      ) {
        resultOptions[i].items.push({
          value: history.item_id,
          label: history.item_name,
          deleteFlg: true
        });
      }
    });
  });
  return resultOptions;
};

export default generateWorkOptions;
