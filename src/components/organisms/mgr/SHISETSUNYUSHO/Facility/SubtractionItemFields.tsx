import * as React from "react";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import FormikSelectYearMonth from "@components/molecules/FormikSelectYearMonth";
import HelpIcon from "@material-ui/icons/Help";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import { WithStyles, createStyles, withStyles } from "@material-ui/core";
import { NUTRITIONIST_PLACEMENT_LIST } from "@constants/mgr/SHISETSUNYUSHO/variables";
import { FormikProps } from "formik";
import { FacilityValues } from "@initialize/mgr/SHISETSUNYUSHO/facility/initialValues";

const styles = () =>
  createStyles({
    comment: {
      fontSize: 12
    },
    helpIcon: {
      fontSize: 14.4,
      color: "#607d8b",
      verticalAlign: "sub"
    },
    section: {
      marginBottom: 32
    },
    innerItem: {
      marginLeft: -20
    }
  });

interface OwnProps {
  formikProps: FormikProps<FacilityValues>;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const SubtractionItemFields: React.FunctionComponent<Props> = props => {
  return (
    <FormPaper>
      <div className={props.classes.section}>
        <SectionTitle label="減算対象" />
      </div>
      <FormikCheckbox
        name="subtractionItem.originLocalGovFlg"
        label="地方公共団体が設置"
      />
      <FormikSwitch
        name="subtractionItem.lackOfSupporterFlg"
        label="夜勤職員の欠員"
        tooltip={
          <HelpToolTip
            title={<HelpTipMessages name="lackOfNightShiftStaffFlag" />}
          />
        }
      >
        <div className={props.classes.innerItem}>
          <FormikSelectYearMonth
            name="subtractionItem.dateStartLackOfSupporter"
            label="減算適応月"
            required={true}
            style={{ marginBottom: 0 }}
          />
          <div className={props.classes.comment}>
            <p>
              減算適応月については該当項目の
              <HelpIcon className={props.classes.helpIcon} />
              を参照してください
            </p>
          </div>
        </div>
      </FormikSwitch>
      <FormikRadioButtons
        name="subtractionItem.nutritionistPlacement"
        label="栄養士配置"
        options={NUTRITIONIST_PLACEMENT_LIST}
        style={{ marginBottom: 0 }}
      />
    </FormPaper>
  );
};

export default withStyles(styles)(SubtractionItemFields);
