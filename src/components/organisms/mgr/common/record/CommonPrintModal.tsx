import * as React from "react";
import * as H from "history";
import {
  createStyles,
  WithStyles,
  withStyles,
  StyleRules
} from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

import MuiCheckbox from "@components/molecules/MuiCheckbox";
import PrintFormName from "@components/organisms/mgr/common/record/PrintFormName";
import { RECORD_MODAL_TYPE } from "@constants/variables";

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
    dialogFooter: {
      borderTop: "solid 1px",
      borderTopColor: "#cfd8dc",
      paddingTop: 8,
      marginLeft: 0,
      marginRight: 0
    },
    ui: {
      marginTop: 0
    },
    li: {
      marginBottom: 4,
      color: "#333",
      "&:before": {
        width: 8,
        height: 8,
        display: "inline-block",
        position: "relative",
        content: "''",
        borderRadius: "100%",
        top: -2,
        left: -18,
        background: "black"
      }
    },
    checkboxLi: {
      margin: "24px 0 0 24px"
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
    radioWrapper: {
      borderBottom: "1px solid #cfd8dc",
      marginBottom: 16,
      "& > div": {
        paddingLeft: 10
      },
      "& > div > div": {
        marginTop: 0,
        "& > label > span": {
          fontSize: 16
        }
      }
    },
    formNameLabel: {
      fontSize: 12,
      color: "#778899",
      margin: "24px 24px 6px"
    }
  });

interface BaseProps extends WithStyles<typeof styles> {
  isModalOpen: boolean;
  onClose: () => void;
  history: H.History;
}

interface DailyProps extends BaseProps {
  modalType: RECORD_MODAL_TYPE.daily;
  yyyymmdd?: string;
}

interface SupportPinUserProps extends BaseProps {
  modalType: RECORD_MODAL_TYPE.supportPinUser;
  uifId?: string;
  year?: string;
  month?: string;
}

type Props = DailyProps | SupportPinUserProps;

const OperationDailyPrintModal = (
  props: Props /* , state: State */
): JSX.Element => {
  const [workFlag, setWorkFlag] = React.useState(false);
  const [staffFlag, setStaffFlag] = React.useState(false);
  const [formName, setFormName] = React.useState("support_record");
  const [dispFlgs, setDispState] = React.useState({
    title: "",
    staffDispFlg: false,
    workDispFlg: false,
    baseDispFlg: false,
    calenderDispFlg: false,
    isSupportRecord: false,
    moveUrl: ""
  });

  // mount & update
  React.useEffect(() => {
    switch (props.modalType) {
      case RECORD_MODAL_TYPE.daily:
        setDispState({
          title: "日々の記録",
          staffDispFlg: true,
          workDispFlg: true,
          baseDispFlg: true,
          calenderDispFlg: false,
          isSupportRecord: true,
          moveUrl: `/record/print/daily/${props.yyyymmdd}`
        });
        break;
      case RECORD_MODAL_TYPE.supportPinUser:
        setDispState({
          title: "支援記録",
          staffDispFlg: true,
          workDispFlg: false,
          baseDispFlg: true,
          calenderDispFlg: false,
          isSupportRecord: true,
          moveUrl: `/record/print/${props.uifId}/support/${props.year}/${props.month}`
        });
        break;
      default:
        break;
    }
  }, []);

  // event handler
  const onCloseModal = (): void => {
    props.onClose();
  };
  const changeWorkFlag = (): void => {
    setWorkFlag(!workFlag);
  };
  const changeStaffFlag = (): void => {
    setStaffFlag(!staffFlag);
  };

  const changeFormName = (e: React.ChangeEvent<any>): void => {
    setFormName(e.target.value);
  };

  const moveToPreview = (): void => {
    const params = [];
    if (workFlag) {
      params.push("operation_record");
    }
    if (staffFlag) {
      params.push("staff_comment");
    }
    if (dispFlgs.isSupportRecord) {
      params.push(formName);
    }
    const printOptions =
      params.length > 0 ? `?display_columns=${params.join(",")}` : "";

    props.history.push(`${dispFlgs.moveUrl}${printOptions}`);
  };

  return (
    <div>
      <Dialog open={props.isModalOpen} disableBackdropClick>
        <DialogTitle className={props.classes.dialogHeader}>
          <span>{dispFlgs.title}</span>
          <span className={props.classes.space}>印刷項目</span>
        </DialogTitle>
        <DialogContent className={props.classes.dialogContent}>
          {dispFlgs.isSupportRecord && (
            <div className={props.classes.radioWrapper}>
              <p className={props.classes.formNameLabel}>帳票名</p>
              <PrintFormName value={formName} changeFormName={changeFormName} />
            </div>
          )}
          {dispFlgs.baseDispFlg && (
            <>
              <div className={props.classes.dialogSubTitle}>
                以下の内容が印刷されます。
              </div>
              <ul className={props.classes.ui}>
                <li className={props.classes.li}>作業</li>
                <li className={props.classes.li}>利用者状態</li>
                <li className={props.classes.li}>面談時間</li>
                <li className={props.classes.li}>その他</li>
                <li className={props.classes.li}>対応職員</li>
                <li className={props.classes.li}>欠席理由・支援内容</li>
              </ul>
            </>
          )}
          {/* 業務日誌と職員考察の表示が必要かどうかをプロパティで指定する */}
          {(dispFlgs.workDispFlg || dispFlgs.staffDispFlg) && (
            <>
              <div className={props.classes.dialogSubTitle}>
                追加で印刷したい項目にチェックしてください。
              </div>
              <div className={props.classes.checkboxLi}>
                {dispFlgs.workDispFlg && (
                  <div className={props.classes.checkbox}>
                    <MuiCheckbox
                      id="work_flg"
                      label="業務日誌"
                      checked={workFlag}
                      value="1"
                      onChange={changeWorkFlag}
                    />
                  </div>
                )}
                {dispFlgs.staffDispFlg && (
                  <div className={props.classes.checkbox}>
                    <MuiCheckbox
                      id="staff_flg"
                      label="職員考察"
                      checked={staffFlag}
                      value="1"
                      onChange={changeStaffFlag}
                    />
                  </div>
                )}
              </div>
            </>
          )}
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

export default withStyles(styles)(OperationDailyPrintModal);
