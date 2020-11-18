import * as React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
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
  SUPPORT_IKOU_RESULT_ITEMS,
  shortStayTypes,
  supportForMentallyIllDisChargeSystemTypes
} from "@constants/mgr/JIRITSUKUNRENSEIKATSU/variables";
import { generateRadioItems } from "@utils/dataNormalizer";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikTextField from "@components/molecules/FormikTextField";
import { getIn, FormikProps } from "formik";
import { FacilityValues } from "@initialize/mgr/JIRITSUKUNRENSEIKATSU/facility/initialValues";

const welfareSpecialistPlacementTypeRadioItems = generateRadioItems(
  WelfareSpecialistPlacementTypes
);
const staffTreatmentSystemTypeRadioItems = generateRadioItems(
  StaffTreatmentSystemTypes
);
const shortStayTypeRadioItems = generateRadioItems(shortStayTypes);
const supportForMentallyIllDisChargeSystemTypeRadioItems = generateRadioItems(
  supportForMentallyIllDisChargeSystemTypes
);

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
          name="additionalItem.welfareSpecialistPlacementType"
          label="福祉専門職員配置等加算"
          options={welfareSpecialistPlacementTypeRadioItems}
        />
        <FormikCheckbox
          name="additionalItem.nursingSupporterFlag"
          label="看護職員配置体制加算"
        />
        <FormikRadioButtons
          name="additionalItem.staffTreatmentSystemType"
          label="福祉・介護職員処遇改善加算"
          options={staffTreatmentSystemTypeRadioItems}
          style={{ marginBottom: 0 }}
        />
        <FormikCheckbox
          name="additionalItem.commuterLifeSupportFlag"
          label="上記処遇改善を指定障害者支援施設において実施"
          style={{ paddingLeft: 16, marginTop: -5 }}
        />
        <FormikRadioButtons
          name="additionalItem.staffTreatmentSpecificSystemType"
          label="福祉・介護職員等特定処遇改善加算"
          options={staffTreatmentSpecificSystemTypeRadioItems}
          disabled={disableStaffTreatmentSpecificSystemType}
        />
        <FormikSwitch
          name="additionalItem.employmentTransitionSupportFlag"
          label="就労移行支援体制加算"
        >
          <FormGroup row={true}>
            <FormikSelect
              name="additionalItem.continuationPersonLastYear"
              label="前年度実績の就労継続者"
              options={SUPPORT_IKOU_RESULT_ITEMS}
              style={{ marginBottom: 8 }}
            />
            <FormikTextField
              name="additionalItem.numberOfContinuators"
              label="継続者数"
              placeholder="0"
              disabled={
                getIn(
                  props.formikProps.values,
                  "additionalItem.continuationPersonLastYear"
                ) !== "2"
              }
              size="small"
              endAdornmentLabel="名"
              maxLength={3}
              style={{ marginBottom: 8 }}
            />
          </FormGroup>
        </FormikSwitch>
        <FormikCheckbox
          name="additionalItem.visualAuditoryLanguageDisabledPeopleSupportSystemFlag"
          label="視覚・聴覚言語障害者支援体制加算"
        />
        <FormikRadioButtons
          name="additionalItem.shortStayType"
          label="短期滞在加算"
          options={shortStayTypeRadioItems}
        />
        <FormikRadioButtons
          name="additionalItem.supportForMentallyIllDisChargeSystemType"
          label="精神障害者退院支援体制加算"
          options={supportForMentallyIllDisChargeSystemTypeRadioItems}
        />
      </FormGroup>
    </FormPaper>
  );
};

export default AdditionalItemFields;
