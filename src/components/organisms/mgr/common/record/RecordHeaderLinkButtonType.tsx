import * as React from "react";
import * as H from "history";
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import RecordHeader from "@components/organisms/mgr/common/record/RecordHeader";

const styles = (): StyleRules =>
  createStyles({
    button: {
      width: 120,
      boxShadow: "none",
      "&:last-child": {
        marginLeft: 8
      }
    }
  });

interface OwnProps {
  uifId: string;
  recordType: "support" | "work" | "interview" | "support_plan";
  isEditing: boolean;
  history: H.History;
  pageName: string;
  userName: string;
  hasRecord: boolean;
  year: string;
  month: string;
}
type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 作業記録・面談記録・個別支援計画（一覧）で利用
 */
const RecordHeaderLinkButtonType = (props: Props): JSX.Element => {
  // handler
  const onClickButton = (): void => {
    let url = "";
    if (props.recordType === "work") {
      url = `/record/print/${props.uifId}/work/${props.year}/${props.month}`;
    } else if (props.recordType === "interview") {
      url = `/record/print/${props.uifId}/interview/${props.year}/${props.month}`;
    } else if (props.recordType === "support_plan") {
      url = `/record/${props.uifId}/support_plan/new`;
    }
    props.history.push(url);
  };

  const buttonLabel = props.recordType === "support_plan" ? "新規作成" : "印刷";
  const isNewPrintButton = (
    <Button
      className={props.classes.button}
      variant="contained"
      color="secondary"
      disabled={props.isEditing}
      onClick={onClickButton}
    >
      {buttonLabel}
    </Button>
  );
  return (
    <RecordHeader
      uifId={props.uifId}
      recordType={props.recordType}
      isEditing={props.isEditing}
      history={props.history}
      pageName={props.pageName}
      userName={props.userName}
      hideTitle={!props.hasRecord}
      button={isNewPrintButton}
    />
  );
};
export default withStyles(styles)(RecordHeaderLinkButtonType);
