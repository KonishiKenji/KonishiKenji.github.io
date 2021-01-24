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
  ENABLE_SPECIFIC_BETTER_SUPPORTER_CONDITION_VALUES
} from "@constants/variables";
import { generateRadioItems } from "@utils/dataNormalizer";
import { getIn, FormikProps } from "formik";
import { FacilityValues } from "@initialize/mgr/TANKINYUSHO/facility/initialValues";
import {
  DIETICIAN_ITEMS,
  FULLTIME_NURSING_STAFF_ITEMS,
  WELFARE_SPECIALIST_PLACEMENT_TYPE_ITEMS
} from "@constants/mgr/TANKINYUSHO/variables";
import { withStyles, WithStyles, createStyles } from "@material-ui/core";

const styles = () =>
  createStyles({
    innerItem: {
      marginLeft: -20
    },
    section: {
      marginBottom: 32
    }
  });

const staffTreatmentSystemTypeRadioItems = generateRadioItems(
  StaffTreatmentSystemTypes
);
const staffTreatmentSpecificSystemTypeRadioItems = generateRadioItems(
  StaffTreatmentSpecificSystemTypes
);

interface OwnProps {
  formikProps: FormikProps<FacilityValues>;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

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
  // 常勤看護職員配置加算のFlgと配置人数のstate管理
  const fulltimeNursingStaffFlg: boolean = getIn(
    props.formikProps.values,
    "additionalItem.fulltimeNursingStaffFlg"
  );
  React.useEffect(() => {
    const fulltimeNursingStaff: string = getIn(
      props.formikProps.values,
      "additionalItem.fulltimeNursingStaff"
    );
    if (fulltimeNursingStaffFlg && fulltimeNursingStaff === "0") {
      props.setFormikFieldValue("additionalItem.fulltimeNursingStaff", "1");
    }
    if (!fulltimeNursingStaffFlg) {
      props.setFormikFieldValue("additionalItem.fulltimeNursingStaff", "0");
    }
  }, [fulltimeNursingStaffFlg]);
  // 栄養士配置加算のFlgと栄養士配置のstate管理
  const dieticianFlg: boolean = getIn(
    props.formikProps.values,
    "additionalItem.dieticianFlg"
  );
  React.useEffect(() => {
    const dietician: string = getIn(
      props.formikProps.values,
      "additionalItem.dietician"
    );
    if (dieticianFlg && dietician === "0") {
      props.setFormikFieldValue("additionalItem.dietician", "1");
    }
    if (!dieticianFlg) {
      props.setFormikFieldValue("additionalItem.dietician", "0");
    }
  }, [dieticianFlg]);

  return (
    <FormPaper>
      <div className={props.classes.section}>
        <SectionTitle label="加算対象" />
      </div>
      <FormGroup>
        <FormikRadioButtons
          name="additionalItem.welfareSpecialistPlacementType"
          label="福祉専門職員配置等加算"
          options={WELFARE_SPECIALIST_PLACEMENT_TYPE_ITEMS}
          disabled={props.formikProps.values.basic.facilityType !== "3"}
        />
        <FormikSwitch
          name="additionalItem.fulltimeNursingStaffFlg"
          label="常勤看護職員配置加算"
        >
          <div className={props.classes.innerItem}>
            <FormikRadioButtons
              name="additionalItem.fulltimeNursingStaff"
              label="配置人数"
              options={FULLTIME_NURSING_STAFF_ITEMS}
              style={{ marginBottom: 0 }}
            />
          </div>
        </FormikSwitch>
      </FormGroup>
      <FormGroup>
        <FormikRadioButtons
          name="additionalItem.staffTreatmentSystemType"
          label="福祉・介護職員処遇改善加算"
          options={staffTreatmentSystemTypeRadioItems}
          tooltip={
            <HelpToolTip
              title={<HelpTipMessages name="staffTreatmentSystem" />}
            />
          }
        />
        <FormikRadioButtons
          name="additionalItem.staffTreatmentSpecificSystemType"
          label="福祉・介護職員等特定処遇改善加算"
          options={staffTreatmentSpecificSystemTypeRadioItems}
          disabled={disableStaffTreatmentSpecificSystemType}
        />
        <FormikCheckbox
          name="additionalItem.medicalSupportFlg"
          label="医療連携体制加算"
        />
      </FormGroup>
      <FormGroup>
        <FormikSwitch name="additionalItem.dieticianFlg" label="栄養士配置加算">
          <div className={props.classes.innerItem}>
            <FormikRadioButtons
              name="additionalItem.dietician"
              label="栄養士配置"
              options={DIETICIAN_ITEMS}
              style={{ marginBottom: 0 }}
            />
          </div>
        </FormikSwitch>
      </FormGroup>
      <FormGroup>
        <FormikCheckbox
          name="additionalItem.seriousDisabilityFlg"
          label="重度障害児・障害者対応支援加算"
          style={{ marginBottom: 0 }}
        />
      </FormGroup>
    </FormPaper>
  );
};

export default withStyles(styles)(AdditionalItemFields);
