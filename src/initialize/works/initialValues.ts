import { WorkData } from "@stores/domain/work/types";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";

export interface WorkValues {
  works: {
    key: number;
    workItemId: number | null;
    categoryId: string;
    workName: string;
    dirty: boolean;
    delete: boolean;
  }[];
}

const initialValues = (values: WorkData[] = []): WorkValues => {
  const works: WorkValues["works"] = values.map((value, index) => ({
    key: index,
    workItemId: value.workItemId,
    categoryId: `${value.categoryId}`,
    workName: value.workName,
    dirty: false,
    delete: false
  }));
  works.push({
    key: values.length,
    workItemId: null,
    categoryId: DEFAULT_SELECT_VALUE,
    workName: "",
    dirty: false,
    delete: false
  });

  return { works };
};

export default initialValues;
