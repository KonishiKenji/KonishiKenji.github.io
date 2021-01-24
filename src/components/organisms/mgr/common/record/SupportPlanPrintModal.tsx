import * as React from "react";
import * as H from "history";
import * as ClassNames from "classnames";
import {
  createStyles,
  WithStyles,
  Button,
  withStyles
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import { StyleRules } from "@material-ui/core/styles";

import MuiCheckbox from "@components/molecules/MuiCheckbox";

import { AppState } from "@stores/type";
import { connect } from "react-redux";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { FacilityType } from "@constants/variables";

const styles = (): StyleRules =>
  createStyles({
    dialogHeader: {
      marginBottom: 4,
      padding: "16px 24px 20px",
      color: "#333",
      fontSize: 20,
      backgroundColor: "#f5f5f5",
      borderBottom: "solid 1px",
      borderBottomColor: "#cfd8dc",
      height: 64
    },
    paper: {
      height: 540
    },
    dialogContent: {
      minWidth: 550,
      height: "100%",
      padding: 0,
      "&::-webkit-scrollbar": { display: "none" }
    },
    dialogSubTitle: {
      margin: 0,
      padding: "8px 24px 8px",
      color: "#778899",
      fontSize: 12,
      fontWeight: "normal",
      lineHeight: 1
    },
    dialogSubTitleForA: {
      fontSize: 16,
      lineHeight: 1.8,
      margin: "10px 0px 35px 5px",
      color: "#37474f"
    },
    dialogFooter: {
      borderTop: "solid 1px",
      borderTopColor: "#cfd8dc",
      paddingTop: 8,
      marginLeft: 0,
      marginRight: 0
    },
    li: {
      marginBottom: 8,
      color: "#333",
      listStyleType: "none",
      "&:before": {
        width: 8,
        height: 8,
        display: "inline-block",
        position: "relative",
        content: "''",
        borderRadius: "100%",
        top: -2,
        left: -8,
        background: "black"
      }
    },
    innerUl: {
      paddingTop: 7,
      paddingLeft: 17
    },
    innerLi: {
      "&:before": {
        border: "solid 1px #4a4a4a",
        background: "#fff"
      }
    },
    checkboxLi: {
      margin: "24px 0 0 30px",
      "& > div:last-child > div": { margin: "28px 0 0" }
    },
    checkbox: {
      margin: "-32px 0 0 0"
    },
    buttons: {
      width: 125,
      height: 36,
      boxShadow: "none",
      "&:last-child": {
        marginRight: 32
      }
    },
    space: {
      marginLeft: 20
    },
    lineSpace: {
      marginBottom: 20
    }
  });

interface BaseProps extends WithStyles<typeof styles> {
  isModalOpen: boolean;
  onClose: () => void;
  history: H.History;
}

interface StateProps {
  facility?: FacilityState;
}

interface SupportPinUserProps extends BaseProps, StateProps {
  uifId?: string;
  supportPlanId?: string;
}

type Props = SupportPinUserProps;

const SupportPlanPrintModal: React.FunctionComponent<Props> = (props) => {
  const [infoFlag, setInfoFlag] = React.useState(false);
  const [commentFlag, setCommentFlag] = React.useState(false);
  const [minutesFlag, setMinutesFlag] = React.useState(false);
  const isFacilityTypeA: boolean = props.facility
    ? props.facility.serviceType === FacilityType.A
    : false;

  // event handler
  const onCloseModal = (): void => {
    props.onClose();
  };
  const changeInfoFlag = (): void => {
    setInfoFlag(!infoFlag);
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
    if (commentFlag) {
      params.push("display_comment=staff_comment");
    }
    if (minutesFlag) {
      params.push("display_minutes=staff_minutes");
    }
    const printOptions = params.length > 0 ? `?${params.join("&")}` : "";
    props.history.push(
      `/record/print/${props.uifId}/support_plan/${props.supportPlanId}${printOptions}`
    );
  };

  return (
    <div>
      <Dialog open={props.isModalOpen} disableBackdropClick>
        <DialogTitle className={props.classes.dialogHeader}>
          <span>個別支援計画</span>
          <span className={props.classes.space}>印刷項目</span>
        </DialogTitle>
        <DialogContent className={props.classes.dialogContent}>
          {isFacilityTypeA ? (
            <div
              className={ClassNames(
                props.classes.dialogSubTitle,
                props.classes.dialogSubTitleForA
              )}
            >
              以下の項目以外で入力された項目が印刷されます。
              <br />
              追加で印刷したい項目にチェックしてください。
            </div>
          ) : (
            <>
              <ul>
                <li className={props.classes.li}>本人・家族の意向</li>
                <li
                  className={ClassNames(
                    props.classes.li,
                    props.classes.lineSpace
                  )}
                >
                  本人の現状
                </li>
                <li className={props.classes.li}>長期目標</li>
                <li className={props.classes.li}>短期目標</li>
                <li className={props.classes.li}>本人の取組内容</li>
                <li
                  className={ClassNames(
                    props.classes.li,
                    props.classes.lineSpace
                  )}
                >
                  備考
                </li>
              </ul>
              <div className={props.classes.dialogSubTitle}>
                追加で印刷したい項目にチェックしてください。
              </div>
            </>
          )}
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
                label="個別支援会議 議事録"
                checked={minutesFlag}
                value="1"
                onChange={changeMinutesFlag}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions className={props.classes.dialogFooter}>
          <Button
            className={props.classes.buttons}
            onClick={onCloseModal}
            variant="outlined"
            color="secondary"
          >
            キャンセル
          </Button>
          <Button
            className={props.classes.buttons}
            variant="contained"
            color="secondary"
            onClick={moveToPreview}
          >
            確定する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  facility: state.IAB.facility
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(SupportPlanPrintModal));
