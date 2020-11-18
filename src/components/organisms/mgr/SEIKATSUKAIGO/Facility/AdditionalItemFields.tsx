import * as React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import {
  StaffTreatmentSystemTypes,
  StaffTreatmentSpecificSystemTypes,
  ENABLE_SPECIFIC_BETTER_SUPPORTER_CONDITION_VALUES,
  WelfareSpecialistPlacementTypes
} from "@constants/variables";

import {
  FullTimeNursePlacementTypes,
  StaffPlacementTypes,
  SUPPORT_IKOU_RESULT_ITEMS
} from "@constants/mgr/SEIKATSUKAIGO/variables";
import { generateRadioItems } from "@utils/dataNormalizer";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikTextField from "@components/molecules/FormikTextField";
import { getIn, FormikProps } from "formik";
import { FacilityValues } from "@initialize/mgr/SEIKATSUKAIGO/facility/initialValues";

const welfareSpecialistPlacementTypeRadioItems = generateRadioItems(
  WelfareSpecialistPlacementTypes
);
const staffTreatmentSystemTypeRadioItems = generateRadioItems(
  StaffTreatmentSystemTypes
);
const FullTimeNursePlacementTypeRadioItems = generateRadioItems(
  FullTimeNursePlacementTypes
);
const StaffPlacementTypesRadioItems = generateRadioItems(StaffPlacementTypes);

const staffTreatmentSpecificSystemTypeRadioItems = generateRadioItems(
  StaffTreatmentSpecificSystemTypes
);

interface Props {
  formikProps: FormikProps<FacilityValues>;
}
const AdditionalItemFields: React.FunctionComponent<Props> = props => {
  // 福祉・介護職員等特定処遇改善加算のdisabled-state
  const [
    disableStaffTreatmentSpecificSystemType,
    setDisableStaffTreatmentSpecificSystemType
  ] = React.useState(false);
  // 福祉・介護職員処遇改善加算が特定の値の時、福祉・介護職員等特定処遇改善加算が選択できる
  const staffTreatmentSystemType: string = getIn(
    props.formikProps.values,
    "additionalItem.staffTreatmentSystemType"
  );
  React.useEffect(() => {
    const disabled = !ENABLE_SPECIFIC_BETTER_SUPPORTER_CONDITION_VALUES.includes(
      staffTreatmentSystemType
    );
    setDisableStaffTreatmentSpecificSystemType(disabled);
  }, [staffTreatmentSystemType]);

  return (
    <FormPaper>
      <div style={{ marginBottom: 32 }}>
        <SectionTitle label="加算対象" />
      </div>
      <FormGroup>
        <FormikRadioButtons
          name="additionalItem.staffPlacementType"
          label="人員配置体制加算"
          options={StaffPlacementTypesRadioItems}
        />
        <FormikRadioButtons
          name="additionalItem.welfareSpecialistPlacementType"
          label="福祉専門職員配置等加算"
          options={welfareSpecialistPlacementTypeRadioItems}
          tooltip={
            <HelpToolTip
              title={
                <HelpTipMessages name="welfareSpecialistPlacementTypeSEIKATSUKAIGO" />
              }
            />
          }
        />
        <FormikRadioButtons
          name="additionalItem.fullTimeNursePlacementType"
          label="常勤看護職員等配置加算"
          options={FullTimeNursePlacementTypeRadioItems}
          tooltip={
            <HelpToolTip
              title={<HelpTipMessages name="fullTimeNursePlacementType" />}
            />
          }
        />
        <FormikRadioButtons
          name="additionalItem.staffTreatmentSystemType"
          label="福祉・介護職員処遇改善加算"
          options={staffTreatmentSystemTypeRadioItems}
          tooltip={
            <HelpToolTip
              title={
                <HelpTipMessages name="staffTreatmentSystemTypeSEIKATSUKAIGO" />
              }
            />
          }
          style={{ marginBottom: 0 }}
        />
        <FormikCheckbox
          name="additionalItem.commuterLifeSupportFlag"
          label="上記処遇改善を指定障害者支援施設において実施"
          style={{ paddingLeft: 16, marginTop: -5 }}
          tooltip={
            <HelpToolTip
              title={
                <HelpTipMessages name="commuterLifeSupportFlagSEIKATSUKAIGO" />
              }
            />
          }
        />
        <FormikRadioButtons
          name="additionalItem.staffTreatmentSpecificSystemType"
          label="福祉・介護職員等特定処遇改善加算"
          options={staffTreatmentSpecificSystemTypeRadioItems}
          disabled={disableStaffTreatmentSpecificSystemType}
        />
      </FormGroup>
      <FormGroup>
        <FormikCheckbox
          name="additionalItem.severeFailureSupportFlag"
          label="重度障害支援体制加算"
        />
        <FormikCheckbox
          name="additionalItem.visualAuditoryLanguageDisabledPeopleSupportSystemFlag"
          label="視覚・聴覚言語障害者支援体制加算"
          tooltip={
            <HelpToolTip
              title={
                <HelpTipMessages name="visualAuditoryLanguageDisabledPeopleSupportSystemFlagSEIKATSUKAIGO" />
              }
            />
          }
        />
      </FormGroup>
      <FormikSwitch
        name="additionalItem.employmentTransitionSupportFlag"
        label="就労移行支援体制加算"
        style={{ marginBottom: 0 }}
      >
        <FormGroup row={true} style={{ marginBottom: 0 }}>
          <FormikSelect
            name="additionalItem.continuationPersonLaseYear"
            label="前年度実績の就労継続者"
            options={SUPPORT_IKOU_RESULT_ITEMS}
          />
          <FormikTextField
            name="additionalItem.numberOfContinuations"
            label="継続者数"
            placeholder="0"
            disabled={
              getIn(
                props.formikProps.values,
                "additionalItem.continuationPersonLaseYear"
              ) !== "2"
            }
            size="small"
            endAdornmentLabel="名"
            maxLength={3}
          />
        </FormGroup>
      </FormikSwitch>
    </FormPaper>
  );
};

export default AdditionalItemFields;
