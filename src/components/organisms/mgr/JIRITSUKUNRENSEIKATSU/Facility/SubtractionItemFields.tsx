import * as React from "react";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikSelectYearMonth from "@components/molecules/FormikSelectYearMonth";
import HelpIcon from "@material-ui/icons/Help";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import { WithStyles, createStyles, withStyles } from "@material-ui/core";

const styles = () =>
  createStyles({
    comment: {
      fontSize: 12
    },
    helpIcon: {
      fontSize: 14.4,
      color: "#607d8b",
      verticalAlign: "sub"
    }
  });

type Props = WithStyles<typeof styles>;

const SubtractionItemFields: React.FunctionComponent<Props> = (
  props: Props
) => (
  <FormPaper>
    <div style={{ marginBottom: 32 }}>
      <SectionTitle label="減算対象" />
    </div>
    <FormikCheckbox
      name="subtractionItem.establishedByLocalGovernmentsFlag"
      label="地方公共団体が設置"
    />
    <FormikCheckbox
      name="subtractionItem.standardOverUseFlag"
      label="標準利用期間超過（当月）"
    />
    <FormikSwitch
      name="subtractionItem.lackOfLifeSupportMemberFlag"
      label="生活支援員等欠員"
      tooltip={
        <HelpToolTip
          title={<HelpTipMessages name="lackOfLifeSupportMemberFlag" />}
        />
      }
    >
      <FormikSelectYearMonth
        name="subtractionItem.lackOfLifeSupportMemberStartDate"
        label="減算適応開始月"
        style={{ marginBottom: 0 }}
      />
      <div className={props.classes.comment}>
        <p>
          減算適応月については該当項目の
          <HelpIcon className={props.classes.helpIcon} />
          を参照してください
        </p>
      </div>
    </FormikSwitch>
    <FormikSwitch
      name="subtractionItem.lackOfResponsiblePersonFlag"
      label="サービス管理責任者の欠員"
      style={{ marginBottom: 0 }}
      tooltip={
        <HelpToolTip
          title={<HelpTipMessages name="lackOfResponsiblePersonFlag" />}
        />
      }
    >
      <FormikSelectYearMonth
        name="subtractionItem.lackOfResponsiblePersonStartDate"
        label="減算適応開始月"
        style={{ marginBottom: 0 }}
      />
      <div className={props.classes.comment}>
        <p>
          減算適応月については該当項目の
          <HelpIcon className={props.classes.helpIcon} />
          を参照してください
        </p>
      </div>
    </FormikSwitch>
  </FormPaper>
);

export default withStyles(styles)(SubtractionItemFields);
