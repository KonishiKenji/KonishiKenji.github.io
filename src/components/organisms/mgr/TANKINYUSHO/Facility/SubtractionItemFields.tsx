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
import { WithStyles, withStyles, createStyles } from "@material-ui/core";
import { FACILITY_COMBI_STATUS_ITEMS } from "@constants/mgr/TANKINYUSHO/variables";
import { FormikProps, getIn } from "formik";
import { FacilityValues } from "@initialize/mgr/TANKINYUSHO/facility/initialValues";

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
}

type Props = OwnProps & WithStyles<typeof styles>;

const SubtractionItemFields: React.FunctionComponent<Props> = props => {
  // 利用定員が20人以上である単独型事業所のdisabled-state
  const [disableLargeScaleFlg, setDisableLargeScaleFlg] = React.useState(false);
  // 施設併用状況が特定の値の時、利用定員が20人以上である単独型事業所が選択できる
  const facilityCombiStatus: string = getIn(
    props.formikProps.values,
    "subtractionItem.facilityCombiStatus"
  );
  React.useEffect(() => {
    const disabled = facilityCombiStatus !== "0";
    setDisableLargeScaleFlg(disabled);
  }, [facilityCombiStatus]);

  return (
    <FormPaper>
      <div className={props.classes.section}>
        <SectionTitle label="減算対象" />
      </div>
      <FormikRadioButtons
        name="subtractionItem.facilityCombiStatus"
        label="施設併用状況"
        options={FACILITY_COMBI_STATUS_ITEMS}
        style={{ marginBottom: 0 }}
      />
      <FormikCheckbox
        name="subtractionItem.largeScaleFlg"
        label="利用定員数が20人以上である単独型事業所"
        style={{ paddingLeft: 16, marginTop: -5 }}
        disabled={disableLargeScaleFlg}
      />
      <FormikSwitch
        name="subtractionItem.lackOfLifeSupportMemberFlag"
        label="従業員の欠員"
        style={{ marginBottom: 0 }}
        tooltip={
          <HelpToolTip title={<HelpTipMessages name="lackOfSupporterFlag" />} />
        }
      >
        <div className={props.classes.innerItem}>
          <FormikSelectYearMonth
            name="subtractionItem.lackOfLifeSupportMemberStartDate"
            label="減算適応開始月"
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
    </FormPaper>
  );
};

export default withStyles(styles)(SubtractionItemFields);
