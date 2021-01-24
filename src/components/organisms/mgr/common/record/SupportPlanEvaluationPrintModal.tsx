import * as React from "react";
import * as H from "history";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import { StyleRules } from "@material-ui/core/styles";

import MuiCheckbox from "@components/molecules/MuiCheckbox";

import KnowbeButton from "@components/presentational/atoms/KnowbeButton";

const styles = (): StyleRules =>
  createStyles({
    dialogHeader: {
      marginBottom: 4,
      padding: "16px 32px 18px",
      color: "#333",
      fontSize: 20,
      backgroundColor: "#f5f5f5",
      borderBottom: "solid 1px",
      borderBottomColor: "#cfd8dc",
      lineHeight: 1.2,
      height: 58
    },
    paper: {
      minWidth: 600,
      height: 400
    },
    dialogContent: {
      minWidth: 600,
      height: "100%",
      padding: 0,
      "&::-webkit-scrollbar": { display: "none" }
    },
    dialogSubTitle: {
      margin: 0,
      padding: "24px 30px 0",
      marginBottom: 47,
      color: "#37474f",
      fontSize: 16,
      fontWeight: "normal",
      lineHeight: 1.75,
      letterSpacing: 0.5,
      height: 80
    },
    dialogFooter: {
      borderTop: "solid 1px",
      borderTopColor: "#cfd8dc",
      paddingTop: 8,
      marginLeft: 0,
      marginRight: 0
    },
    checkboxLi: {
      padding: "0 30px",
      "& > div:last-child > div": { margin: "38px 0 0" }
    },
    checkbox: {
      margin: "-36px 0 0 0"
    },
    space: {
      marginLeft: 20
    }
  });

const cancelButtonStyles: React.CSSProperties = {
  width: 120,
  height: 36,
  marginRight: 8
};

const submitButtonStyles: React.CSSProperties = {
  width: 120,
  height: 36,
  marginRight: 32
};

interface BaseProps extends WithStyles<typeof styles> {
  isModalOpen: boolean;
  onClose: () => void;
  history: H.History;
}

interface SupportPinUserProps extends BaseProps {
  uifId?: string;
  supportPlanId?: string;
}

type Props = SupportPinUserProps;

const SupportPlanEvaluationPrintModal: React.FunctionComponent<Props> = (
  props
) => {
  const [infoFlag, setInfoFlag] = React.useState(false);
  const [evaluationFlag, setEvaluationFlag] = React.useState(false);
  const [commentFlag, setCommentFlag] = React.useState(false);
  const [minutesFlag, setMinutesFlag] = React.useState(false);

  // event handler
  const onCloseModal = (): void => {
    props.onClose();
  };
  const changeInfoFlag = (): void => {
    setInfoFlag(!infoFlag);
  };
  const changeEvaluationFlag = (): void => {
    setEvaluationFlag(!evaluationFlag);
  };
  const changeCommentFlag = (): void => {
    setCommentFlag(!commentFlag);
  };
  const changeMinutesFlag = (): void => {
    setMinutesFlag(!minutesFlag);
  };

  const moveToPreview = (): void => {
    const params = [];
    if (infoFlag) {
      params.push("display_info=staff_support_info");
    }
    if (evaluationFlag) {
      params.push("display_evaluation=staff_evaluation");
    }
    if (commentFlag) {
      params.push("display_comment=staff_comment");
    }
    if (minutesFlag) {
      params.push("display_minutes=staff_minutes");
    }
    const printOptions = params.length > 0 ? `?${params.join("&")}` : "";
    props.history.push(
      `/record/print/${props.uifId}/support_plan/evaluation/${props.supportPlanId}/${printOptions}`
    );
  };

  return (
    <div>
      <Dialog
        open={props.isModalOpen}
        disableBackdropClick
        classes={{ paper: props.classes.paper }}
      >
        <DialogTitle className={props.classes.dialogHeader}>
          <span>評価・振り返り</span>
          <span className={props.classes.space}>印刷項目</span>
        </DialogTitle>
        <DialogContent className={props.classes.dialogContent}>
          <div className={props.classes.dialogSubTitle}>
            以下の項目以外で入力された項目が印刷されます。
            <br />
            追加で印刷したい項目にチェックしてください。
          </div>
          <div className={props.classes.checkboxLi}>
            <div className={props.classes.checkbox}>
              <MuiCheckbox
                id="info_flg"
                label="職員の支援内容"
                checked={infoFlag}
                value="1"
                onChange={changeInfoFlag}
              />
            </div>
            <div className={props.classes.checkbox}>
              <MuiCheckbox
                id="evaluation_flg"
                label="職員からの評価・振り返り"
                checked={evaluationFlag}
                value="1"
                onChange={changeEvaluationFlag}
              />
            </div>
            <div className={props.classes.checkbox}>
              <MuiCheckbox
                id="comment_flg"
                label="職員コメント"
                checked={commentFlag}
                value="1"
                onChange={changeCommentFlag}
              />
            </div>
            <div className={props.classes.checkbox}>
              <MuiCheckbox
                id="minutes_flg"
                label="評価・振り返り会議 議事録"
                checked={minutesFlag}
                value="1"
                onChange={changeMinutesFlag}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions className={props.classes.dialogFooter}>
          <KnowbeButton
            style={cancelButtonStyles}
            kind="outlineWhite"
            onClick={onCloseModal}
          >
            キャンセル
          </KnowbeButton>
          <KnowbeButton style={submitButtonStyles} onClick={moveToPreview}>
            確定する
          </KnowbeButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(SupportPlanEvaluationPrintModal);
