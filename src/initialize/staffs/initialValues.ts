import { StaffData } from "@stores/domain/staff/types";

export interface StaffValues {
  staffs: {
    key: number;
    staffItemId: number | null;
    staffName: string;
    roleName: string;
    dirty: boolean;
    delete: boolean;
  }[];
}

const initialValues = (values: StaffData[] = []): StaffValues => {
  const staffs: StaffValues["staffs"] = values.map((value, index) => ({
    key: index,
    staffItemId: value.staffItemId,
    staffName: value.staffName,
    roleName: value.roleName,
    dirty: false,
    delete: false
  }));
  staffs.push({
    key: values.length,
    staffItemId: null,
    staffName: "",
    roleName: "",
    dirty: false,
    delete: false
  });

  return { staffs };
};

export default initialValues;
