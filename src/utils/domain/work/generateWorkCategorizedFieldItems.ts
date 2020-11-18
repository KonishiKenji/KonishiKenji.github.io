import { GetWorkResponse } from "@api/requests/work/getWork";
import { CategorizedFieldItem } from "@interfaces/ui/form";

/**
 * 作業をMultipleSelectFormで扱える形に整形する
 */
const generateWorkCategorizedFieldItems = (
  work: GetWorkResponse["data"]
): CategorizedFieldItem[] => {
  return work.map((data) => ({
    categoryId: data.id,
    categoryName: data.name,
    items: data.items.map((item) => ({ value: item.id, label: item.name }))
  }));
};

export default generateWorkCategorizedFieldItems;
