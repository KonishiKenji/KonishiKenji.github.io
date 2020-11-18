import * as React from "react";
import SectionTitle from "@components/atoms/SectionTitle";
import Typography from "@material-ui/core/Typography";
import { createStyles, withStyles, WithStyles, Paper } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TargetDateSelectUser from "@components/molecules/TargetDateSelectUser";
import TargetPeriodSelectUser from "@components/molecules/TargetPeriodSelectUser";
import ExcludeUsersDialog from "@components/molecules/dialog/ExcludeUsersDialog";
import { FieldItem, SelectDateValue } from "@interfaces/ui/form";
import ValidationErrors from "@interfaces/ui/validationErrors";

const styles = () =>
  createStyles({
    paperContainer: {
      padding: "30px 32px 32px 32px",
      margin: 16
    },
    text: {
      fontSize: 16,
      color: "#37474f",
      margin: "16px 0 28px 0"
    },
    selectRecord: {
      width: 214,
      height: 52,
      marginTop: 0,
      marginRight: 16,
      marginBottom: 0
    },
    printButton: {
      width: 120,
      height: 36,
      marginTop: 12,
      boxShadow: "none"
    },
    selectUser: {
      margin: "16px 0 0 16px"
    }
  });

interface State {
  isOpenExcludeUsersDialog: boolean;
}

type Users = {
  id: string | number;
  recipientNumber: string;
  name: string;
}[];

interface OwnProps {
  monthList: FieldItem[];
  monthSelectValue: string;
  currentUsers: Users;
  excludedUserIds: number[];
  startDateSelectValue: string;
  endDateSelectValue: string;
  oldestYear: number;
  dateType: string;
  startDateHelperText: ValidationErrors<SelectDateValue>;
  endDateHelperText: ValidationErrors<SelectDateValue>;
  isError: boolean;
  onChangeMonthSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickExcludedUserIds: (idList: number[]) => void;
  onChangeStartDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEndDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDateType: (e: React.ChangeEvent<{}>, value: string) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const radioValues = {
  selectMonth: "0",
  selectDate: "1"
};

const currentYear = new Date().getFullYear();

class DownloadWorkRecords extends React.Component<Props, State> {
  public state = {
    isOpenExcludeUsersDialog: false
  };

  public render() {
    const currentUserCount =
      this.props.currentUsers.length - this.props.excludedUserIds.length;
    const monthList =
      this.props.monthList.length > 0
        ? this.props.monthList
        : [{ label: "", value: "" }];
    const oldestYear = this.props.oldestYear
      ? this.props.oldestYear
      : currentYear;
    return (
      <Paper elevation={0} className={this.props.classes.paperContainer}>
        <SectionTitle label={"作業時間のダウンロード"} isTitleNoMargin={true} />
        <Typography
          component="p"
          variant="caption"
          className={this.props.classes.text}
        >
          各利用者ごとに作業合計時間をダウンロードできます。作業合計時間は、事業所情報で設定した作業時間帯から休憩の合計時間を差し引き算出します。また、設定した刻む時間単位で時間を丸められます。月ごと日ごとの作業時間の確認や工賃計算などにご活用ください。
        </Typography>
        <RadioGroup
          value={this.props.dateType}
          onChange={this.props.onChangeDateType}
        >
          <FormControlLabel
            value={radioValues.selectMonth}
            control={<Radio />}
            label="月ごと"
          />
          <FormControlLabel
            value={radioValues.selectDate}
            control={<Radio />}
            label="任意の期間"
          />
        </RadioGroup>
        {/* 月ごと */}
        {this.props.dateType === radioValues.selectMonth ? (
          <div className={this.props.classes.selectUser}>
            <TargetDateSelectUser
              selectValue={this.props.monthSelectValue}
              isDefaultValue={false}
              targetDateOptions={monthList}
              currentUserCount={currentUserCount}
              maxUserCount={this.props.currentUsers.length}
              onChangeSelect={this.props.onChangeMonthSelect}
              onClickButton={this.handleClickOpenSelectExcludeUserModal}
              selectLabel="対象請求月"
              selectSize="medium"
            />
          </div>
        ) : (
          // 任意の期間
          <TargetPeriodSelectUser
            startValue={this.props.startDateSelectValue}
            endValue={this.props.endDateSelectValue}
            onChangeStartDate={this.props.onChangeStartDate}
            onChangeEndDate={this.props.onChangeEndDate}
            startToYear={currentYear + 1}
            startFromYear={oldestYear}
            endToYear={currentYear + 2}
            endFromYear={oldestYear}
            isDefaultValue={false}
            currentUserCount={currentUserCount}
            maxUserCount={this.props.currentUsers.length}
            onClickButton={this.handleClickOpenSelectExcludeUserModal}
            isDisabled={this.props.monthList.length === 0}
            startDateHelperText={this.props.startDateHelperText}
            endDateHelperText={this.props.endDateHelperText}
            isError={this.props.isError}
          />
        )}
        {/* 利用者選択モーダル */}
        <ExcludeUsersDialog
          title="利用者を選択してください"
          open={this.state.isOpenExcludeUsersDialog}
          excludedUserIds={this.props.excludedUserIds}
          users={this.props.currentUsers}
          onSubmit={this.props.onClickExcludedUserIds}
          onClose={this.handleClickCloseSelectExcludeUserModal}
        />
      </Paper>
    );
  }

  private handleClickOpenSelectExcludeUserModal = () => {
    this.setState({ isOpenExcludeUsersDialog: true });
  };

  private handleClickCloseSelectExcludeUserModal = () => {
    this.setState({ isOpenExcludeUsersDialog: false });
  };
}

export default withStyles(styles)(DownloadWorkRecords);
