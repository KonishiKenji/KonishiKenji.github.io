import * as React from "react";
import { FormikProps, getIn } from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import UnitsNightSupportFields from "@components/organisms/mgr/GroupHome/Facility/items/UnitsNightSupportFields";
import { RadioItemInterface } from "@components/atoms/RadioButtons";
import {
  StaffPlacementTypes,
  StaffTreatmentSystemTypes,
  StaffTreatmentSpecificSystemTypes,
  WelfareSpecialistPlacementTypes,
  NURSING_SUPPORT_RADIO_ITEMS,
  GroupHomeType,
  ENABLE_SPECIFIC_BETTER_SUPPORTER_CONDITION_VALUES
} from "@constants/variables";
import { generateRadioItems } from "@utils/dataNormalizer";
import { FacilityValues } from "@initialize/mgr/GroupHome/facility/initialValues";
import { NIGHT_SUPPORT_TYPE_OPTIONS } from "@constants/mgr/GroupHome/variables";

// 置き場所が定まってないので一旦ここ
const filterStaffPlacementTypeItems = (
  groupHomeType: number,
  items: RadioItemInterface[]
) => {
  switch (groupHomeType) {
    case GroupHomeType.日中サービス支援型:
      return [items[0], items[1], items[2], items[3]];
    case GroupHomeType.外部サービス利用型:
      return [items[4], items[5], items[6]];
    default:
      // 介護サービス包括型
      return [items[0], items[1], items[2]];
  }
};

const staffPlacementTypeRadioItems = (groupHomeType: number) => {
  const radioItems = generateRadioItems(StaffPlacementTypes);
  return filterStaffPlacementTypeItems(groupHomeType, radioItems);
};
const welfareSpecialistPlacementTypeRadioItems = generateRadioItems(
  WelfareSpecialistPlacementTypes
);
const staffTreatmentSystemTypeRadioItems = generateRadioItems(
  StaffTreatmentSystemTypes
);
const staffTreatmentSpecificSystemTypeRadioItems = generateRadioItems(
  StaffTreatmentSpecificSystemTypes
);

interface Props {
  formikProps: FormikProps<FacilityValues>;
  groupHomeType: number;
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

  // 複数ユニットに応じて夜間支援体制加算のフィールドが変わる
  const operatingUnitFlag = props.formikProps.values.basic.operatingUnitFlag;

  return (
    <FormPaper>
      <div style={{ marginBottom: 32 }}>
        <SectionTitle label="加算対象項目" />
      </div>
      <FormGroup>
        <FormikRadioButtons
          name="additionalItem.staffPlacementType"
          label="職員配置"
          options={staffPlacementTypeRadioItems(props.groupHomeType)}
        />
        <FormikRadioButtons
          name="additionalItem.welfareSpecialistPlacementType"
          label="福祉専門職員配置等加算"
          options={welfareSpecialistPlacementTypeRadioItems}
          tooltip={
            <HelpToolTip
              title={<HelpTipMessages name="welfareSpecialistPlacementType" />}
            />
          }
        />
        <FormikRadioButtons
          name="additionalItem.staffTreatmentSystemType"
          label="福祉・介護職員処遇改善加算"
          options={staffTreatmentSystemTypeRadioItems}
          tooltip={
            <HelpToolTip
              title={<HelpTipMessages name="staffTreatmentSystemType" />}
            />
          }
        />
        <FormikRadioButtons
          name="additionalItem.staffTreatmentSpecificSystemType"
          label="福祉・介護職員等特定処遇改善加算"
          options={staffTreatmentSpecificSystemTypeRadioItems}
          disabled={disableStaffTreatmentSpecificSystemType}
        />
        <FormikRadioButtons
          name="additionalItem.nursingStaffPlacementSystemFlag"
          label="看護職員・医療連携に関する加算"
          options={NURSING_SUPPORT_RADIO_ITEMS}
          tooltip={
            <HelpToolTip
              title={<HelpTipMessages name="nursingStaffPlacementSystemFlag" />}
            />
          }
        />
      </FormGroup>
      <FormikSwitch
        name="additionalItem.nightSupportFlag"
        label="夜間支援体制加算"
        tooltip={
          <HelpToolTip title={<HelpTipMessages name="nightSupportFlag" />} />
        }
      >
        {operatingUnitFlag ? (
          <UnitsNightSupportFields formikProps={props.formikProps} />
        ) : (
          <FormGroup row={true}>
            <FormikSelect
              label="夜間支援体制加算"
              name="additionalItem.nightSupportType"
              placeholder="選択してください"
              isSelectablePlaceholder={true}
              options={NIGHT_SUPPORT_TYPE_OPTIONS}
            />
            <FormikTextField
              name="additionalItem.averageUsersLastYear"
              label="前年度の平均実績"
              endAdornmentLabel="人"
            />
          </FormGroup>
        )}
      </FormikSwitch>
      <FormGroup>
        <FormikCheckbox
          name="additionalItem.commuterLifeSupportFlag"
          label="通勤者生活支援加算"
          tooltip={
            <HelpToolTip
              title={<HelpTipMessages name="commuterLifeSupportFlag" />}
            />
          }
        />
        <FormikCheckbox
          name="additionalItem.visualAuditoryLanguageDisabledPeopleSupportSystemFlag"
          label="視覚・聴覚言語障害者支援体制加算"
          style={{ marginBottom: 0 }}
          tooltip={
            <HelpToolTip
              title={
                <HelpTipMessages name="visualAuditoryLanguageDisabledPeopleSupportSystemFlag" />
              }
            />
          }
        />
      </FormGroup>
    </FormPaper>
  );
};

export default AdditionalItemFields;
