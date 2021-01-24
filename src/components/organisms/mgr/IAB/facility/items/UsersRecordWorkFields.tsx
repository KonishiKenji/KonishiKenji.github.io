/**
 * 作業時間の自動入力対象設定
 */

import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MuiTextField from "@components/molecules/MuiTextField";
import ExcludeUsersDialog from "@components/molecules/dialog/ExcludeUsersDialog";
import { FormikProps } from "formik";
import { FacilityValues } from "@initialize/mgr/IAB/facility/initialValues";

const styles = () =>
  createStyles({
    selectUser: {
      display: "flex",
      alignItems: "flex-end"
    },
    button: {
      width: 136,
      border: "1px solid rgba(0, 0, 0, 0.12)"
    }
  });

interface OwnProps {
  formikProps: FormikProps<FacilityValues>;
}

type Props = OwnProps & WithStyles<typeof styles>;

const UsersRecordWorkFields: React.FC<Props> = props => {
  // ユーザー選択ダイアログが受け付けるusersに加工する
  const generateUsers = React.useCallback(
    (userList: FacilityValues["workingTime"]["users"]) =>
      userList.map(user => ({
        ...user,
        recipientNumber: user.recipient_number,
        name: `${user.name_sei} ${user.name_mei}`
      })),
    []
  );

  // 作業時間を記録しないユーザーのリストを返す
  const generateExcludedUserIds = React.useCallback(
    (userList: { id: number; def_record_work: string }[]) => {
      return userList
        .filter(user => user.def_record_work === "0")
        .map(user => user.id);
    },
    []
  );

  // workingTime.usersから必要なパラメーターを用意する
  const workingTimeUsers = props.formikProps.values.workingTime.users || [];
  const [users, setUsers] = React.useState(generateUsers(workingTimeUsers));
  const [excludedUserIds, setExcludedUserIds] = React.useState(
    generateExcludedUserIds(workingTimeUsers)
  );
  const maxUserCount = users.length;
  const currentUserCount = maxUserCount - excludedUserIds.length;

  // 変化があった時に再設定を行う
  React.useEffect(() => {
    setUsers(generateUsers(workingTimeUsers));
    setExcludedUserIds(generateExcludedUserIds(workingTimeUsers));
  }, [workingTimeUsers]);

  // モーダル開閉管理
  const [openExcludeUsersDialog, setOpenExcludeUsersDialog] = React.useState(
    false
  );
  const handleClickOpenSelectExcludeUserModal = React.useCallback(() => {
    setOpenExcludeUsersDialog(true);
  }, []);
  const handleClickCloseSelectExcludeUserModal = React.useCallback(() => {
    setOpenExcludeUsersDialog(false);
  }, []);

  // 除外ユーザーが確定された時
  const handleChangeExcludedUserIds = (idList: number[]) => {
    // 除外リストに含まれているか否かでdef_record_workを管理する
    const newWorkingTimeUsers = workingTimeUsers.map(user => {
      const isExcluded = idList.includes(user.id);
      return { ...user, def_record_work: isExcluded ? "0" : "1" };
    });
    props.formikProps.setFieldValue("workingTime.users", newWorkingTimeUsers);
  };

  return (
    <>
      <div className={props.classes.selectUser}>
        <MuiTextField
          label="利用者数"
          value={`${currentUserCount}名 / ${maxUserCount}名`}
          disabled={true}
          style={{ width: 140, marginBottom: 0 }}
        />
        <Button
          className={props.classes.button}
          color="secondary"
          variant="outlined"
          children="利用者選択"
          onClick={handleClickOpenSelectExcludeUserModal}
        />
      </div>

      {/* 利用者選択モーダル */}
      <ExcludeUsersDialog
        title="利用者を選択してください"
        shouldDisabledNoUser={false}
        open={openExcludeUsersDialog}
        excludedUserIds={excludedUserIds}
        users={users}
        onSubmit={handleChangeExcludedUserIds}
        onClose={handleClickCloseSelectExcludeUserModal}
      />
    </>
  );
};

export default withStyles(styles)(UsersRecordWorkFields);
