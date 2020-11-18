import * as React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import {
  StaffTreatmentSystemTypes,
  ENABLE_SPECIFIC_BETTER_SUPPORTER_CONDITION_VALUES
} from "@constants/variables";
import { generateRadioItems } from "@utils/dataNormalizer";
import { getIn, FormikProps } from "formik";
import { FacilityValues } from "@initialize/mgr/SHISETSUNYUSHO/facility/initialValues";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import {
  SERIOUS_DISABILITY_LIST,
  NIGHTTIME_PLACEMENT_LIST,
  STAFF_TREATMENT_SPECIFIC_SYSTEM_LIST
} from "@constants/mgr/SHISETSUNYUSHO/variables";
import { withStyles, WithStyles, createStyles } from "@material-ui/core";

const styles = () =>
  createStyles({
    section: {
      marginBottom: 32
    }
  });

const staffTreatmentSystemTypeRadioItems = generateRadioItems(
  StaffTreatmentSystemTypes
);

interface OwnProps {
  formikProps: FormikProps<FacilityValues>;
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

  return (
    <FormPaper>
      <div className={props.classes.section}>
        <SectionTitle label="加算対象" />
      </div>
      <FormGroup>
        <FormikRadioButtons
          name="additionalItem.nighttimePlacement"
          label="夜勤職員配置・夜間看護体制加算"
          options={NIGHTTIME_PLACEMENT_LIST}
        />
        <FormikCheckbox
          name="additionalItem.seeHearTeamFlg"
          label="視覚・聴覚言語障害者支援体制加算"
          tooltip={
            <HelpToolTip title={<HelpTipMessages name="seeHearTeamFlag" />} />
          }
        />
        <FormikCheckbox
          name="additionalItem.regionalLifeTransition"
          label="地域生活移行個別支援特別加算（Ⅰ）"
        />
        <FormikCheckbox
          name="additionalItem.nutritionManagementFlg"
          label="栄養マネジメント加算"
        />
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
          options={STAFF_TREATMENT_SPECIFIC_SYSTEM_LIST}
          disabled={disableStaffTreatmentSpecificSystemType}
        />
        <FormikRadioButtons
          name="additionalItem.seriousDisability"
          label="重度障害者支援加算"
          options={SERIOUS_DISABILITY_LIST}
          style={{ marginBottom: 0 }}
          tooltip={
            <HelpToolTip
              title={<HelpTipMessages name="seriousDisabilityFlag" />}
            />
          }
        />
      </FormGroup>
    </FormPaper>
  );
};

export default withStyles(styles)(AdditionalItemFields);
