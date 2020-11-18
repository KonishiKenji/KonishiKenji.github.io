import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { WorkRecordsState } from "@stores/domain/workRecords/types";
import { UserState } from "@stores/domain/user/type";
import AdminTemplate from "@components/templates/AdminTemplate";
import DownloadWorkRecords from "@components/organisms/mgr/IAB/WorkRecords/DownloadWorkRecords";
import WorkRecordsList from "@components/organisms/mgr/IAB/WorkRecords/WorkRecordsList";
import ErrorsDialog from "@components/organisms/ErrorsDialog";

import * as errorsDialogActions from "@stores/ui/errorsDialog/actions";

import {
  dateToLocalisedString,
  dateTodayInFormat,
  dateInYYYYFormat,
  dateInMMFormat,
  getLastDay,
  dateInYYYYMMDDFormat,
  dateTodayForApi,
  dateInYYYYMMFormat,
  dateToSelectDateValue
} from "@utils/date";
import { FieldItem, SelectDateValue } from "@interfaces/ui/form";
import { dateValidator } from "@validator";
import ValidationErrors from "@interfaces/ui/validationErrors";

import { createExcelFile } from "@utils/domain/workRecords";

interface StateProps {
  workRecords: WorkRecordsState;
  user: UserState;
}

interface DispatchProps {
  fetchWorkRecords: (startDate: string, endDate: string) => void;
  fetchWorkRecordsMonthList: () => void;
  openErrorsDialog: () => void;
}

type WorkRecordsSummary = {
  id: number;
  recipientNumber: string;
  name: string;
}[];

type DateErrorMessage = ValidationErrors<SelectDateValue> | undefined;

interface MergeProps extends StateProps, DispatchProps {
  monthList: FieldItem[];
  selectUsersList: WorkRecordsSummary;
}

interface State {
  monthSelectValue: string;
  excludedUserIds: number[];
  startDateSelectValue: string;
  endDateSelectValue: string;
  dateType: string;
  startDateHelperText: ValidationErrors<SelectDateValue>;
  endDateHelperText: ValidationErrors<SelectDateValue>;
  isError: boolean;
}

const dateTypeValues = {
  selectMonth: "0",
  selectDate: "1"
};

const initDateHelperText = {
  year: undefined,
  month: undefined,
  day: undefined
};

/**
 * 作業時間
 */

class WorkRecords extends React.Component<MergeProps, State> {
  constructor(props: MergeProps) {
    super(props);
    this.state = {
      monthSelectValue: "0",
      excludedUserIds: [],
      startDateSelectValue: `${dateInYYYYMMFormat(new Date())}01`,
      endDateSelectValue: dateTodayForApi(),
      dateType: dateTypeValues.selectMonth,
      startDateHelperText: initDateHelperText,
      endDateHelperText: initDateHelperText,
      isError: false
    };
  }

  public async componentDidMount(): Promise<void> {
    await this.props.fetchWorkRecordsMonthList();
    if (this.props.workRecords.dateList.length > 0) {
      this.fetchTargetMonthWorkRecords(this.props.workRecords.dateList["0"]);
    }
  }

  public handleChangeMonthSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selected = e ? e.target.value : this.state.monthSelectValue;
    this.setState({ monthSelectValue: e.target.value, excludedUserIds: [] });
    const startDate = this.props.workRecords.dateList[selected];
    this.fetchTargetMonthWorkRecords(startDate);
  };

  /**
   * 月ごとの時のWorkRecordsの再取得処理
   */
  public fetchTargetMonthWorkRecords = (date: Date): void => {
    const targetYear = dateInYYYYFormat(date);
    const targetMonth = dateInMMFormat(date);
    this.props.fetchWorkRecords(
      dateInYYYYMMDDFormat(date),
      `${targetYear}${targetMonth}${getLastDay(
        Number(targetYear),
        Number(targetMonth)
      )}`
    );
  };

  private warningMessages = (): string[] => {
    const { workRecords } = this.props;
    if (!workRecords) {
      return [];
    }
    return workRecords.data.warnings
      .filter(v => !this.state.excludedUserIds.includes(v.uifId))
      .map(v => v.message);
  };

  private handleExcelDownload = (): void => {
    const { workRecords, user } = this.props;

    let startDateFormat;
    let endDateFormat;
    if (this.state.dateType === dateTypeValues.selectDate) {
      startDateFormat = this.state.startDateSelectValue
        ? dateToLocalisedString(this.state.startDateSelectValue, "YYYY-MM-DD")
        : "";
      endDateFormat = this.state.endDateSelectValue
        ? dateToLocalisedString(this.state.endDateSelectValue, "YYYY-MM-DD")
        : "";
    } else {
      const dt = this.props.workRecords.dateList[this.state.monthSelectValue];
      const year = dateInYYYYFormat(dt);
      const month = dateInMMFormat(dt);
      const day = getLastDay(Number(year), Number(month));

      startDateFormat = dateToLocalisedString(dt, "YYYY-MM-DD");
      endDateFormat = dateToLocalisedString(
        new Date(`${year}-${month}-${day}`),
        "YYYY-MM-DD"
      );
    }

    createExcelFile(
      workRecords,
      user.facility_type,
      this.props.user.labels ? this.props.user.labels.facility_user : "利用者",
      startDateFormat,
      endDateFormat,
      this.state.excludedUserIds || []
    );
  };

  private handleExcelDownloadClick = (): void => {
    const messages = this.warningMessages();
    if (messages.length > 0) {
      this.props.openErrorsDialog();
    } else {
      this.handleExcelDownload();
    }
  };

  // "Invalid Date"がrequiredバリデーションにかからないため""に変換
  private invalidDateToEmpty = (value: SelectDateValue): SelectDateValue => {
    const date = {
      year: value.year === "Invalid Date" ? "" : value.year,
      month: value.month,
      day: value.day
    };
    return date;
  };

  private handleChangeExcludedUserIds = (idList: number[]): void => {
    this.setState({ excludedUserIds: idList });
  };

  private checkDateValidation = (
    startDate: string,
    endDate: string
  ): {
    start: DateErrorMessage;
    end: DateErrorMessage;
  } => {
    const startValidateResult = dateValidator(
      this.invalidDateToEmpty(dateToSelectDateValue(startDate)),
      "required"
    );
    const endValidateResult = dateValidator(
      this.invalidDateToEmpty(dateToSelectDateValue(endDate)),
      "required",
      {
        type: "future",
        startDate: dateToSelectDateValue(startDate),
        options: { startLabel: "対象開始日", endLabel: "対象終了日" }
      },
      {
        type: "withinTargetMonth",
        startDate: dateToSelectDateValue(startDate),
        targetMonth: 12,
        options: { startLabel: "対象開始日", endLabel: "対象終了日" }
      }
    );
    return {
      start: startValidateResult,
      end: endValidateResult
    };
  };

  private fetchWorkRecordsIfNeeded = (
    startDate: string,
    endDate: string
  ): void => {
    const res = this.checkDateValidation(startDate, endDate);
    const isNoErrorsStarDate = res.start
      ? !res.start.year && !res.start.month && !res.start.day
      : true;
    const isNoErrorsEndDate = res.end
      ? !res.end.year && !res.end.month && !res.end.day
      : true;
    if (isNoErrorsStarDate && isNoErrorsEndDate) {
      this.setState({
        startDateHelperText: initDateHelperText,
        endDateHelperText: initDateHelperText,
        isError: false
      });
      this.props.fetchWorkRecords(startDate, endDate);
    } else {
      const startDateHelperText = res.start || initDateHelperText;
      const endDateHelperText = res.end || initDateHelperText;
      this.setState({
        startDateHelperText,
        endDateHelperText,
        isError: true
      });
    }
  };

  private handleChangeStartDate = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const date = new Date(e.target.value);
    const startDateSelectValue = dateInYYYYMMDDFormat(date);
    this.setState({
      startDateSelectValue,
      excludedUserIds: []
    });
    this.fetchWorkRecordsIfNeeded(
      startDateSelectValue,
      this.state.endDateSelectValue
    );
  };

  private handleChangeEndDate = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const date = new Date(e.target.value);
    const endDateSelectValue = dateInYYYYMMDDFormat(date);
    this.setState({
      endDateSelectValue,
      excludedUserIds: []
    });
    this.fetchWorkRecordsIfNeeded(
      this.state.startDateSelectValue,
      endDateSelectValue
    );
  };

  private handleChangeDateType = (
    e: React.ChangeEvent<{}>,
    value: string
  ): void => {
    const dateType =
      this.state.dateType === dateTypeValues.selectDate
        ? dateTypeValues.selectMonth
        : dateTypeValues.selectDate;
    this.setState({ dateType, excludedUserIds: [] });
    if (this.props.workRecords.dateList.length === 0) return;
    if (value === "0") {
      const startDate = this.props.workRecords.dateList[
        this.state.monthSelectValue
      ];
      this.fetchTargetMonthWorkRecords(startDate);
    } else {
      this.props.fetchWorkRecords(
        this.state.startDateSelectValue,
        this.state.endDateSelectValue
      );
    }
  };

  /**
   * リストで表示する日付範囲の表示文字列の取得
   */
  private targetDateRangeString = (): string => {
    if (this.state.dateType === dateTypeValues.selectMonth) {
      const { monthList } = this.props;
      if (!monthList) {
        return "";
      }
      const month = this.state.monthSelectValue;
      const res = monthList[month];
      return res ? `${res.label}` : "";
    }

    const startDateFormat = this.state.startDateSelectValue
      ? dateTodayInFormat(this.state.startDateSelectValue, false)
      : "";
    const endDateFormat = this.state.endDateSelectValue
      ? dateTodayInFormat(this.state.endDateSelectValue, false)
      : "";
    return `${startDateFormat}〜${endDateFormat}`;
  };

  public render(): JSX.Element {
    const { workRecords } = this.props;

    const oldestDate = workRecords.dateList[workRecords.dateList.length - 1];
    const oldestYear = Number(dateInYYYYFormat(new Date(oldestDate)));

    return (
      <AdminTemplate pageName="作業時間">
        <DownloadWorkRecords
          monthList={this.props.monthList}
          onChangeMonthSelect={this.handleChangeMonthSelect}
          monthSelectValue={this.state.monthSelectValue}
          currentUsers={this.props.selectUsersList}
          excludedUserIds={this.state.excludedUserIds}
          onClickExcludedUserIds={this.handleChangeExcludedUserIds}
          startDateSelectValue={this.state.startDateSelectValue}
          endDateSelectValue={this.state.endDateSelectValue}
          onChangeStartDate={this.handleChangeStartDate}
          onChangeEndDate={this.handleChangeEndDate}
          oldestYear={oldestYear}
          onChangeDateType={this.handleChangeDateType}
          dateType={this.state.dateType}
          startDateHelperText={this.state.startDateHelperText}
          endDateHelperText={this.state.endDateHelperText}
          isError={this.state.isError}
        />
        <WorkRecordsList
          onClickDownload={this.handleExcelDownloadClick}
          targetMonth={this.targetDateRangeString()}
          excludedUserIds={this.state.excludedUserIds}
          summaryWorkRecords={workRecords.data.summary}
        />
        <ErrorsDialog
          customWarnings={this.warningMessages()}
          actionButton={{
            text: "そのままダウンロード",
            clickHandler: this.handleExcelDownload
          }}
        />
      </AdminTemplate>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    workRecords: state.workRecords,
    user: state.user
  };
};

const mapDispatchProps = (dispatch: Dispatch): DispatchProps => {
  const { workRecordsDispatcher } = dispatches;
  const workRecordsDispatches = workRecordsDispatcher(dispatch);
  return {
    fetchWorkRecords: (startDate: string, endDate: string): Promise<void> =>
      workRecordsDispatches.fetchWorkRecords(startDate, endDate),
    fetchWorkRecordsMonthList: workRecordsDispatches.fetchWorkRecordsMonthList,
    openErrorsDialog: () => dispatch(errorsDialogActions.showErrorsDialog())
  };
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps
): MergeProps => {
  const monthList = stateProps.workRecords.dateList.map((item, i) => {
    return {
      label: dateToLocalisedString(item, "YYYY年M月"),
      value: `${i}`
    };
  });
  const selectUsersList = stateProps.workRecords.data.summary.map((data) => {
    return {
      id: data.uifId,
      recipientNumber: data.recipientNumber,
      name: data.userName
    };
  });
  return {
    monthList,
    selectUsersList,
    ...stateProps,
    ...dispatchProps
  };
};

export default connect(
  mapStateToProps,
  mapDispatchProps,
  mergeProps
)(WorkRecords);
