import * as React from "react";
import { FormikProps } from "formik";

import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import GrayLabel from "@components/atoms/GrayLabel";
import ReadonlyTextField from "@components/molecules/ReadonlyTextField";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikSelect from "@components/molecules/FormikSelect";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { RecordDailyValues } from "@initialize/mgr/IAB/record/daily/initialValues";
import { RecordMonthlyValues } from "@initialize/mgr/IAB/record/monthly/initialValues";
import { OptionInterface } from "@components/atoms/DropDown";
import { FieldItem } from "@interfaces/ui/form";
import { GetOperations } from "@api/requests/operations/getOperations";

const styles = (): StyleRules =>
  createStyles({
    wrapper: {
      width: "100%"
    },
    fieldWrapper: {
      padding: "0 16px"
    },
    fieldLabel: {
      display: "flex",
      paddingBottom: 16,
      "& > :last-child": {
        width: 790,
        minWidth: 790
      }
    },
    workOutOfFacilityHeader: {
      display: "flex",
      minHeight: "48px"
    },
    workOutOfFacility: {
      display: "flex",
      minHeight: "60px",
      marginTop: "15px"
    },
    viewLavel: {
      marginTop: -24,
      marginLeft: "16px"
    },
    viewAccompanyStaffInfo: {
      width: "790px",
      minWidth: "790px",
      marginLeft: "16px"
    },
    accompanyStaffFlame: {
      display: "flex",
      width: "790px",
      marginLeft: "16px"
    },
    accompanyStaff: {
      display: "flex",
      marginTop: -16
    },
    accompanyStaffSelect: {
      width: "162px",
      maxHeight: "96px",
      marginRight: "16px"
    },
    accompanyStaffTime: {
      width: "73px",
      marginRight: "17px",
      maxHeight: "80px"
    },
    workPlaceNoData: {
      color: "gray",
      fontSize: "14px",
      marginTop: "28px",
      marginLeft: "16px"
    }
  });

interface OwnProps {
  isEditable: boolean;
  name: string; // formikと紐づけるname
  label: string;
  defaultValue: string; // 表示モード時の初期値
  formikProps:
    | FormikProps<RecordMonthlyValues>
    | FormikProps<RecordDailyValues>;
  workplace_company: GetOperations["data"]["operation"][0]["workplace_company"];
  staffs: FieldItem[];
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 小数第２位以降の値を入力不可にする
 */
const handleChangeDecimal = (
  event: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
): string | void => {
  const currentValue = event.currentTarget.value;
  if (currentValue.includes(".")) {
    const currentValueInteger = currentValue.split(".")[0];
    const currentValueDecimal = currentValue.split(".")[1];
    if (currentValueDecimal.length > 1) {
      return `${currentValueInteger}.${currentValueDecimal.substring(0, 1)}`;
    }
    return currentValue;
  }
  return undefined;
};

/**
 * カーソル外したとき、ドットなしの形式の場合、ドットを自動で付ける
 */
const handleBlurDecimal = (
  event: React.FormEvent<HTMLInputElement>
): string | void => {
  const currentValue = event.currentTarget.value;

  if (parseFloat(currentValue) > 0 && !currentValue.includes(".")) {
    return `${currentValue}.0`;
  }
  return undefined;
};

const RecordWorkOutOfFacility = (props: Props): JSX.Element => {
  const workplaces = props.workplace_company;
  if (workplaces.length === 0) {
    return (
      <div className={props.classes.wrapper}>
        <GrayLabel label={props.label} />
        <div className={props.classes.workPlaceNoData}>
          <p>
            就労先企業情報が登録されていない、または契約期間内の企業がありません。
          </p>
          <p>実施報告書画面から、企業情報をご確認ください。</p>
        </div>
      </div>
    );
  }

  const selectStaffs: OptionInterface[] = [];
  props.staffs.forEach((staff) => {
    selectStaffs.push({ label: staff.label, value: staff.value });
  });

  return (
    <div className={props.classes.wrapper}>
      <GrayLabel label={props.label} />
      <div className={props.classes.fieldWrapper}>
        <div className={props.classes.fieldLabel}>
          <FormControl fullWidth>
            <InputLabel shrink>就労先企業名</InputLabel>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel shrink>同行職員（時間）</InputLabel>
          </FormControl>
        </div>
        {props.isEditable
          ? workplaces.map((workplace, i) => {
              const { values } = props.formikProps;
              // 編集時の表示
              const accompanyStaff = [];

              for (let s = 0; s < 3; s += 1) {
                // 同行職員（時間）の活性/非活性の判定
                let isWorkingHours = false;
                const [operation] = Array.isArray(values.operation)
                  ? values.operation
                  : [values.operation];
                const workplaceCompany = operation.workplace_company[i];
                isWorkingHours =
                  !workplaceCompany.staffs[s] ||
                  !workplaceCompany.staffs[s].staffs_in_facility_id;
                const key = `${props.name}[${i}].staffs[${s}].workplace_company_operation_id`;
                accompanyStaff.push(
                  <div className={props.classes.accompanyStaff} key={key}>
                    <div className={props.classes.accompanyStaffSelect}>
                      <FormikSelect
                        name={`${props.name}[${i}].staffs[${s}].staffs_in_facility_id`}
                        label=""
                        options={selectStaffs}
                        isSelectablePlaceholder
                        size="fullSize"
                        placeholder="選択してください"
                        emptyText={
                          s === 0
                            ? "職員の登録がありません。職員情報画面から職員を登録してください。"
                            : ""
                        }
                        style={{ marginBottom: 0 }}
                      />
                    </div>
                    <div className={props.classes.accompanyStaffTime}>
                      <FormikTextField
                        name={`${props.name}[${i}].staffs[${s}].working_hours`}
                        label="　"
                        placeholder="5.0"
                        endAdornmentLabel="時間"
                        size="fullSize"
                        onBlurHook={handleBlurDecimal}
                        onChangeHook={handleChangeDecimal}
                        disabled={isWorkingHours}
                        style={{ marginBottom: 0 }}
                      />
                    </div>
                  </div>
                );
              }

              return (
                <div
                  className={props.classes.workOutOfFacility}
                  key={workplace.workplace_company_id}
                >
                  <ReadonlyTextField
                    value={props.workplace_company[i].workplace_name}
                    defaultValue={props.defaultValue}
                    label=""
                    multiline
                  />
                  <div className={props.classes.accompanyStaffFlame}>
                    {accompanyStaff}
                  </div>
                </div>
              ); // return 終わり
            }) // map処理おわり
          : workplaces.map((company) => {
              // 閲覧時の表示
              const beforeAccompanyStaff: string[] = [];
              if (company.staffs) {
                company.staffs
                  .slice(0, 3)
                  .filter(
                    (result) =>
                      result.staff_name !== null &&
                      result.working_hours !== null
                  )
                  .forEach((staff) => {
                    if (staff.staff_name) {
                      beforeAccompanyStaff.push(
                        `${staff.staff_name}(${staff.working_hours}時間)`
                      );
                    } else {
                      beforeAccompanyStaff.push("-");
                    }
                  });
              }
              const resultAccompanyStaff = beforeAccompanyStaff.join("、");

              return (
                <div
                  className={props.classes.workOutOfFacility}
                  key={company.workplace_company_id}
                >
                  <ReadonlyTextField
                    value={company.workplace_name}
                    label=""
                    defaultValue={props.defaultValue}
                    multiline
                  />
                  <div className={props.classes.viewAccompanyStaffInfo}>
                    <ReadonlyTextField
                      value={resultAccompanyStaff}
                      defaultValue={props.defaultValue}
                      label=""
                    />
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default withStyles(styles)(RecordWorkOutOfFacility);
