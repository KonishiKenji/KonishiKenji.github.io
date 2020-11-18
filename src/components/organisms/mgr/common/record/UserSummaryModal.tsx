import * as React from "react";
import * as H from "history";

// ui
import * as classNames from "classnames";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TargetDateSelectUser from "@components/molecules/TargetDateSelectUser";
import ExcludeUsersDialog from "@components/molecules/dialog/ExcludeUsersDialog";
import MuiCheckbox from "@components/molecules/MuiCheckbox";
import PrintFormName from "@components/organisms/mgr/common/record/PrintFormName";
import { RECORD_MODAL_TYPE } from "@constants/variables";
import dateToLocalisedString from "@utils/date/dateToLocalisedString";

const styles = (): StyleRules =>
  createStyles({
    dialogTitle: {
      padding: "16px 24px 20px",
      color: "#333",
      fontSize: 20,
      backgroundColor: "#f5f5f5",
      borderBottom: "solid 1px",
      borderBottomColor: "#cfd8dc",
      height: 64
    },
    dialogContent: {
      width: 600,
      height: "100%",
      padding: 0,
      "&::-webkit-scrollbar": { display: "none" }
    },
    dialogActions: {
      borderTop: "1px solid #cfd8dc",
      margin: 0,
      padding: 8
    },
    printTargetWrapper: {
      padding: "16px 32px 24px"
    },
    radioWrapper: {
      borderTop: "1px solid rgba(0, 0, 0, 0.38)",
      padding: "16px 32px 24px",
      "& > div > div": {
        margin: 0,
        "& > label > span": {
          fontSize: 16
        }
      }
    },
    supportUserListWrapper: {
      padding: "0 32px",
      borderTop: "1px solid rgba(0, 0, 0, 0.38)"
    },
    supportUserListSection: {
      marginTop: 24
    },
    formNameLabel: {
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.6)",
      margin: "0 0 6px"
    },
    note: {
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.6)",
      margin: "0 0 16px"
    },
    preCheckbox: {
      marginBottom: 8
    },
    printItems: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      color: "rgba(0, 0, 0, 0.87)",
      "& > li": {
        display: "flex",
        alignItems: "center",
        marginBottom: 8,
        "&:last-child": {
          marginBottom: 0
        },
        "&:before": {
          display: "block",
          content: "''",
          width: 8,
          height: 8,
          borderRadius: 7,
          marginRight: 8,
          backgroundColor: "#4a4a4a"
        }
      }
    },
    button: {
      width: 125,
      height: 36,
      boxShadow: "none",
      "&:last-child": {
        marginRight: 24
      }
    },
    cancel: {
      borderColor: "#ccc"
    }
  });

type Users = {
  id: string | number;
  recipientNumber: string;
  name: string;
  targetForUpLimit: boolean;
  targetForUserCostAmountList: boolean;
}[];

interface OwnProps {
  isModalOpen: boolean;
  onClose: () => void;
  onMonthChange: (target: string, month: string) => void;
  modalType:
    | RECORD_MODAL_TYPE.support
    | RECORD_MODAL_TYPE.interview
    | RECORD_MODAL_TYPE.work;
  targetMonths: string[];
  targetUsers: Users;
  history: H.History;
}

type Props = OwnProps & WithStyles<typeof styles>;

const modalName = {
  1: "daily",
  2: "interview",
  3: "support",
  4: "work",
  5: "supportPinUser"
};

/**
 * 月の指定ユーザーの記録を印刷する
 * 現状ModalType変更時は再生成される(=componentDidMountからやり直し)が前提になっている
 */
const UserSummaryModal = (props: Props): JSX.Element | null => {
  // RECORD_MODAL_TYPEごとの差分を定義
  const modalDiff = {
    [RECORD_MODAL_TYPE.support]: {
      title: "支援記録　印刷項目",
      moveUrl: "/record/print/users_summary_support"
    },
    [RECORD_MODAL_TYPE.interview]: {
      title: "面談記録　印刷",
      moveUrl: "/record/print/users_summary_interview"
    },
    [RECORD_MODAL_TYPE.work]: {
      title: "作業記録　印刷",
      moveUrl: "/record/print/users_summary_work"
    }
  };
  const modalData = modalDiff[props.modalType];

  // 定義と違うmodalTypeがきたら彈く
  if (!modalData) {
    return null;
  }

  // state
  const [selectedMonth, setSelectedMonth] = React.useState("default");
  const [excludedUserIds, setExcludedUserIds] = React.useState([] as number[]);
  const [staffFlag, setStaffFlag] = React.useState(false);
  const [openExcludeUsers, setOpenExcludeUsers] = React.useState(false);
  const [formName, setFormName] = React.useState("support_record");

  // 対象利用者数
  const maxUserCount = props.targetUsers.length;
  const currentUserCount = maxUserCount - excludedUserIds.length;

  // 対象月未選択あるいはユーザーがいないなら印刷はできない
  const isDisabled = selectedMonth === "default" || maxUserCount === 0;

  const convertMonths = props.targetMonths.map((target) => {
    return {
      label: target,
      value: target
    };
  });

  const selectableMonthsOptions = [
    { label: "月を選択", value: "default" },
    ...convertMonths
  ];

  /**
   * 対象月の印刷プレビューに除外ユーザーと追加項目を設定して移動
   */
  const handleClickMoveToPreview = (): void => {
    if (isDisabled) {
      return;
    }
    const yearMonth = selectedMonth.split("-");
    const pathname = `${modalData.moveUrl}/${yearMonth[0]}/${yearMonth[1]}`;
    const params = [];
    const columns = [];
    let excluded_user_ids: string;

    if (staffFlag) {
      columns.push("staff_comment");
    }
    if (props.modalType === RECORD_MODAL_TYPE.support) {
      columns.push(formName);
    }
    if (columns.length > 0) {
      params.push(`display_columns=${columns.join(",")}`);
    }
    if (excludedUserIds.length > 0) {
      excluded_user_ids = `excluded_user_ids=${excludedUserIds.join(",")}`;
      params.push(excluded_user_ids);
    }
    const search = params.length > 0 ? params.join("&") : "";
    props.history.push({ pathname, search });
  };

  /**
   * 対象月変更
   */
  const handleChangeSelectDate = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ): Promise<void> => {
    const selectMonth = e.target.value;

    // 前回と同じ値ならスキップ
    if (selectedMonth === selectMonth) {
      return;
    }
    setSelectedMonth(selectMonth);

    // 「月を選択」選択時はAPI通信をスキップ
    if (selectMonth !== "default") {
      // 対象月のユーザー数を取得
      await props.onMonthChange(
        modalName[props.modalType],
        dateToLocalisedString(selectMonth, "YYYYMM")
      );
    }

    // 除外ユーザーを初期化
    setExcludedUserIds([]);
  };

  /**
   * 除外ユーザーのモーダル
   */
  const handleClickOpenSelectExcludeUserModal = (): void => {
    setOpenExcludeUsers(true);
  };
  const handleClickCloseSelectExcludeUserModal = (): void => {
    setOpenExcludeUsers(false);
  };

  /**
   * 職員考察チェックボックス
   */
  const handleChangeStaffFlag = (): void => {
    setStaffFlag(!staffFlag);
  };

  /**
   * ExcludeUsersDialogから除外ユーザーを貰って反映
   */
  const handleChangeExcludedUserIds = (idList: number[]): void => {
    setExcludedUserIds(idList);
  };

  /**
   * 帳票名ラジオボタン
   */
  const handleChangeFormName = (e: React.ChangeEvent<any>): void => {
    setFormName(e.target.value);
  };

  return (
    <>
      <Dialog open={props.isModalOpen} disableBackdropClick maxWidth={false}>
        <DialogTitle className={props.classes.dialogTitle}>
          {modalData.title}
        </DialogTitle>
        <DialogContent className={props.classes.dialogContent}>
          <div className={props.classes.printTargetWrapper}>
            <p className={props.classes.note}>
              印刷したい対象月と利用者を選択してください
            </p>
            <TargetDateSelectUser
              selectValue={selectedMonth}
              isDefaultValue={selectedMonth === "default"}
              targetDateOptions={selectableMonthsOptions}
              currentUserCount={currentUserCount}
              maxUserCount={maxUserCount}
              onChangeSelect={handleChangeSelectDate}
              onClickButton={handleClickOpenSelectExcludeUserModal}
            />
          </div>
          {/* 支援記録の印刷時に追加 */}
          {props.modalType === RECORD_MODAL_TYPE.support && (
            <>
              <section className={props.classes.supportUserListSection}>
                <div className={props.classes.radioWrapper}>
                  <p className={props.classes.formNameLabel}>帳票名</p>
                  <PrintFormName
                    value={formName}
                    changeFormName={handleChangeFormName}
                  />
                </div>
              </section>
              <div className={props.classes.supportUserListWrapper}>
                <section className={props.classes.supportUserListSection}>
                  <p className={props.classes.note}>以下の内容が印刷されます</p>
                  <ul className={props.classes.printItems}>
                    <li>作業</li>
                    <li>利用者状態</li>
                    <li>面談時間</li>
                    <li>その他</li>
                    <li>対応職員</li>
                    <li>欠席理由・支援内容</li>
                  </ul>
                </section>
                <section className={props.classes.supportUserListSection}>
                  <p
                    className={classNames(
                      props.classes.note,
                      props.classes.preCheckbox
                    )}
                  >
                    追加で印刷したい項目にチェックしてください
                  </p>
                  <MuiCheckbox
                    id="staff_flg"
                    label="職員考察"
                    checked={staffFlag}
                    value="1"
                    onChange={handleChangeStaffFlag}
                  />
                </section>
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions className={props.classes.dialogActions}>
          <Button
            className={classNames(props.classes.button, props.classes.cancel)}
            variant="outlined"
            color="secondary"
            onClick={props.onClose}
          >
            キャンセル
          </Button>
          <Button
            className={props.classes.button}
            variant="contained"
            color="secondary"
            onClick={handleClickMoveToPreview}
            disabled={isDisabled}
          >
            確定する
          </Button>
        </DialogActions>
      </Dialog>
      {/* 利用者選択 */}
      <ExcludeUsersDialog
        title="利用者を選択"
        open={openExcludeUsers}
        excludedUserIds={excludedUserIds}
        users={props.targetUsers}
        onSubmit={handleChangeExcludedUserIds}
        onClose={handleClickCloseSelectExcludeUserModal}
      />
    </>
  );
};

export default withStyles(styles)(UserSummaryModal);
