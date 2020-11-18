import * as React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import FormLabel from "@components/molecules/FormLabel";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import FormikSelectDateNotSelectedDefault from "@components/molecules/FormikSelectDateNotSelectedDefault";
import {
  StaffTreatmentSystemTypes,
  StaffTreatmentSpecificSystemTypes,
  WelfareSpecialistPlacementTypes,
  FacilityType
} from "@constants/variables";

import {
  StaffPlacementTypes,
  PostEmploymentRetentionRateTypes,
  AverageDailyWorkingHoursOfUsersType,
  MonthlyAverageWageType,
  SevereSupportType,
  DischargeSupportFacilityTypes,
  SUPPORT_IKOU_RESULT_ITEM
} from "@constants/mgr/IAB/variables";
import { generateRadioItems } from "@utils/dataNormalizer";
import { FormikProps, getIn } from "formik";
import { FacilityValues } from "@initialize/mgr/IAB/facility/initialValues";

const welfareSpecialistPlacementTypeRadioItems = generateRadioItems(
  WelfareSpecialistPlacementTypes
);
const staffTreatmentSystemTypeRadioItems = generateRadioItems(
  StaffTreatmentSystemTypes
);

const severeSupportTypeRadioItems = generateRadioItems(SevereSupportType);

const StaffPlacementTypesRadioItems = generateRadioItems(StaffPlacementTypes);

const AverageDailyWorkingHoursOfUsersTypesRadioItems = generateRadioItems(
  AverageDailyWorkingHoursOfUsersType
);

const staffTreatmentSpecificSystemTypeRadioItems = generateRadioItems(
  StaffTreatmentSpecificSystemTypes
);

const dischargeSupportFacilityTypeRadioItems = generateRadioItems(
  DischargeSupportFacilityTypes
);
const PostEmploymentRetentionRateTypesRadioItems = generateRadioItems(
  PostEmploymentRetentionRateTypes
);

const MonthlyAverageWageTypesRadioItems = generateRadioItems(
  MonthlyAverageWageType
);

interface Props {
  formikProps: FormikProps<FacilityValues>;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

class AdditionalItemFields extends React.Component<Props> {
  public render() {
    return (
      <FormPaper>
        <div style={{ marginBottom: 32 }}>
          <SectionTitle label="加算対象項目" />
        </div>
        <FormGroup>
          {this.props.formikProps.values.basic.serviceType ===
            FacilityType.IKOU && (
            <FormikRadioButtons
              name="additionalItem.postEmploymentRetentionRateType"
              label="就職後6ヶ月以上の定着率"
              options={PostEmploymentRetentionRateTypesRadioItems}
            />
          )}
          {(this.props.formikProps.values.basic.serviceType ===
            FacilityType.A ||
            this.props.formikProps.values.basic.serviceType ===
              FacilityType.B) && (
            <FormikRadioButtons
              name="additionalItem.staffPlacementType"
              label="職員配置"
              options={StaffPlacementTypesRadioItems}
            />
          )}
          {this.props.formikProps.values.basic.serviceType ===
            FacilityType.A && (
            <FormikRadioButtons
              name="additionalItem.averageDailyWorkingHoursOfUsersType"
              label="利用者の1日平均労働時間"
              options={AverageDailyWorkingHoursOfUsersTypesRadioItems}
            />
          )}
          {this.props.formikProps.values.basic.serviceType ===
            FacilityType.B && (
            <FormikRadioButtons
              name="additionalItem.monthlyAverageWageType"
              label="平均工賃の月額"
              options={MonthlyAverageWageTypesRadioItems}
            />
          )}
          <FormikRadioButtons
            name="additionalItem.welfareSpecialistPlacementType"
            label="福祉専門職員配置等加算"
            options={welfareSpecialistPlacementTypeRadioItems}
            tooltip={
              <HelpToolTip
                title={
                  <HelpTipMessages name="welfareSpecialistPlacementType" />
                }
              />
            }
          />
          <FormikCheckbox
            name="additionalItem.visualAuditoryLanguageDisabledPeopleSupportSystemFlag"
            label="視覚・聴覚言語障害者支援体制加算"
          />
          {this.props.formikProps.values.basic.serviceType ===
            FacilityType.IKOU && (
            <FormikCheckbox
              name="additionalItem.employmentSupportTrainingCompletionFlag"
              label="就労支援関係研修修了加算"
            />
          )}
          {(this.props.formikProps.values.basic.serviceType ===
            FacilityType.A ||
            this.props.formikProps.values.basic.serviceType ===
              FacilityType.B) && (
            <FormikSwitch
              name="additionalItem.employmentTransitionSupportFlag"
              label="就労移行支援体制加算"
              onChange={this.onChangeEmploymentTransition}
            >
              <FormGroup row={true} style={{ marginLeft: 15, marginTop: 20 }}>
                <FormikSelect
                  name="additionalItem.continuationPersonLaseYear"
                  label="前年度実績の就労継続者"
                  options={SUPPORT_IKOU_RESULT_ITEM}
                />
                <FormikTextField
                  name={"additionalItem.numberOfContinuations"}
                  label="継続者数"
                  endAdornmentLabel="人"
                  placeholder={"0"}
                  disabled={
                    getIn(
                      this.props.formikProps.values,
                      "additionalItem.continuationPersonLaseYear"
                    ) === "1"
                  }
                />
              </FormGroup>
            </FormikSwitch>
          )}
          {(this.props.formikProps.values.basic.serviceType ===
            FacilityType.A ||
            this.props.formikProps.values.basic.serviceType ===
              FacilityType.B) && (
            <FormikRadioButtons
              name="additionalItem.severeSupportType"
              label="重度者支援体制加算"
              options={severeSupportTypeRadioItems}
              tooltip={
                <HelpToolTip
                  title={<HelpTipMessages name="severeSupportTypeFlag" />}
                />
              }
            />
          )}
          {this.props.formikProps.values.basic.serviceType ===
            FacilityType.A && (
            <div>
              <FormLabel label="賃金向上達成指導員配置加算" />
              <div style={{ marginLeft: 15, marginTop: 20 }}>
                <FormikSelectDateNotSelectedDefault
                  name="additionalItem.wageUpStartDate"
                  label="開始年月日"
                  addYearTo={1}
                  setFormikFieldValue={this.props.setFormikFieldValue}
                />
                <FormikSelectDateNotSelectedDefault
                  name="additionalItem.wageUpEndDate"
                  label="終了年月日"
                  addYearTo={5}
                  setFormikFieldValue={this.props.setFormikFieldValue}
                />
              </div>
            </div>
          )}
          {this.props.formikProps.values.basic.serviceType ===
            FacilityType.B && (
            <div>
              <FormLabel label="目標工賃達成指導員配置加算" />
              <div style={{ marginLeft: 15, marginTop: 20 }}>
                <FormikSelectDateNotSelectedDefault
                  name="additionalItem.targetWageTeacherStartDate"
                  label="開始年月日"
                  addYearTo={1}
                  setFormikFieldValue={this.props.setFormikFieldValue}
                />
                <FormikSelectDateNotSelectedDefault
                  name="additionalItem.targetWageTeacherEndDate"
                  label="終了年月日"
                  addYearTo={5}
                  setFormikFieldValue={this.props.setFormikFieldValue}
                />
              </div>
            </div>
          )}
          {this.props.formikProps.values.basic.serviceType ===
            FacilityType.IKOU && (
            <FormikRadioButtons
              name="additionalItem.dischargeSupportFacilityType"
              label="精神障害者退院支援施設加算"
              options={dischargeSupportFacilityTypeRadioItems}
              tooltip={
                <HelpToolTip
                  title={
                    <HelpTipMessages name="dischargeSupportFacilityTypeFlag" />
                  }
                />
              }
            />
          )}
          <FormikRadioButtons
            name="additionalItem.staffTreatmentSystemType"
            label="福祉・介護職員処遇改善加算"
            options={staffTreatmentSystemTypeRadioItems}
            style={{ marginBottom: 0 }}
            onClick={this.onChangestaffTreatmentSystemType}
          />
          <FormikCheckbox
            name="additionalItem.commuterLifeSupportFlag"
            label="上記処遇改善を指定障害者支援施設において実施"
            style={{ paddingLeft: 16, marginTop: 14 }}
            tooltip={
              <HelpToolTip
                title={<HelpTipMessages name="specifiedDisabedSupportFlag" />}
              />
            }
          />
          <FormikRadioButtons
            name="additionalItem.staffTreatmentSpecificSystemType"
            label="福祉・介護職員等特定処遇改善加算"
            options={staffTreatmentSpecificSystemTypeRadioItems}
            disabled={
              !["2", "3", "4"].includes(
                this.props.formikProps.values.additionalItem
                  .staffTreatmentSystemType
              )
            }
          />
        </FormGroup>
      </FormPaper>
    );
  }
  // SwitchのON/OFF切り替え時の入力値のフォーマット化
  public onChangeEmploymentTransition = () => {
    if (
      getIn(
        this.props.formikProps.values,
        "additionalItem.employmentTransitionSupportFlag"
      )
    ) {
      this.props.setFormikFieldValue(
        "additionalItem.employmentTransitionSupportFlag",
        false
      );
      this.props.setFormikFieldValue(
        "additionalItem.continuationPersonLaseYear",
        "1"
      );
      this.props.setFormikFieldValue(
        "additionalItem.numberOfContinuations",
        ""
      );
    } else {
      this.props.setFormikFieldValue(
        "additionalItem.employmentTransitionSupportFlag",
        true
      );
    }
  };
  public onChangestaffTreatmentSystemType = () => {
    if (
      !["2", "3", "4"].includes(
        this.props.formikProps.values.additionalItem.staffTreatmentSystemType
      )
    ) {
      this.props.setFormikFieldValue(
        "additionalItem.staffTreatmentSpecificSystemType",
        "1"
      );
    }
  };
}

export default AdditionalItemFields;
