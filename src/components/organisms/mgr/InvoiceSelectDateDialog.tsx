import * as React from "react";

// components of material-ui
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import MuiSelect from "@components/molecules/MuiSelect";

import createOneToNumberOptions from "@utils/createOneToNumberOptions";
import {
  getWarekiList,
  dateInYYYYFormat,
  getLastDay,
  dateToObject,
  dateToLocalisedString
} from "@utils/date";

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    root: {
      overflowX: "auto"
    },
    dialogTitleRoot: {
      padding: "13px 0 16px 32px",
      backgroundColor: "#f5f5f5",
      height: 58
    },
    dialogContentRoot: {
      minWidth: 600,
      padding: "32px 39px 25px 32px"
    },
    selectDateWrapper: {
      display: "flex"
    },
    actionWrapper: {
      padding: "0px 24px"
    },
    buttonRoot: {
      minWidth: 125,
      paddingLeft: 16,
      paddingRight: 16,
      boxShadow: "none",
      "&:hover": {
        boxShadow: "none"
      },
      "&:active": {
        boxShadow: "none"
      }
    }
  });

interface OwnProps {
  title: string[];
  isDialogOpen: boolean;
  isError: boolean;
  onViewPreview: (targetDate: string, noticeDate: string) => void;
  onCancel: () => void;
}

interface Values {
  label: string;
  value: number;
}

interface State {
  targetYear: string;
  targetMonth: string;
  targetDay: string;
  noticeYear: string;
  noticeMonth: string;
  noticeDay: string;
  yearOptions: Values[];
  monthOptions: Values[];
  targetDayOptions: Values[];
  noticeDayOptions: Values[];
}

const initDate = dateToObject();
const initialDate = {
  targetYear: initDate.year,
  targetMonth: initDate.month,
  targetDay: initDate.day,
  noticeYear: initDate.year,
  noticeMonth: initDate.month,
  noticeDay: initDate.day
};

const initialState: State = {
  ...initialDate,
  yearOptions: [],
  monthOptions: [],
  targetDayOptions: [],
  noticeDayOptions: []
};

interface Props extends OwnProps, WithStyles<typeof styles> {}

class InvoiceSelectDateDialog extends React.Component<Props> {
  public readonly state: State = initialState;

  public componentDidMount() {
    this.initOptions();
  }

  public render() {
    const dialogTitle = this.props.title.join("・");
    return (
      <Dialog
        open={this.props.isDialogOpen}
        onClose={this.props.onCancel}
        maxWidth="lg"
        className={this.props.classes.root}
        disableBackdropClick={true}
      >
        <DialogTitle classes={{ root: this.props.classes.dialogTitleRoot }}>
          {dialogTitle}を確定してください
        </DialogTitle>
        <Divider />
        <DialogContent classes={{ root: this.props.classes.dialogContentRoot }}>
          <div className={this.props.classes.selectDateWrapper}>
            <MuiSelect
              name="targetYear"
              label={this.props.title[0]}
              value={this.state.targetYear}
              size="medium"
              onChange={this.onChangeTargetYear}
              options={this.state.yearOptions}
              style={{ marginBottom: 24 }}
            />
            <MuiSelect
              name="targetMonth"
              label=""
              value={this.state.targetMonth}
              size="small"
              onChange={this.onChangeTargetMonth}
              options={this.state.monthOptions}
              style={{ marginBottom: 24 }}
            />
            <MuiSelect
              name="targetDay"
              label=""
              value={this.state.targetDay}
              size="small"
              onChange={this.onChangeTargetDay}
              options={this.state.targetDayOptions}
              style={{ marginBottom: 24 }}
            />
          </div>
          {this.props.title.length > 1 && (
            <div className={this.props.classes.selectDateWrapper}>
              <MuiSelect
                name="NoticeYear"
                label={this.props.title[1]}
                value={this.state.noticeYear}
                size="medium"
                onChange={this.onChangeNoticeYear}
                options={this.state.yearOptions}
                style={{ marginBottom: 24 }}
              />
              <MuiSelect
                name="NoticeMonth"
                label=""
                value={this.state.noticeMonth}
                size="small"
                onChange={this.onChangeNoticeMonth}
                options={this.state.monthOptions}
                style={{ marginBottom: 24 }}
              />
              <MuiSelect
                name="NoticeDay"
                label=""
                value={this.state.noticeDay}
                size="small"
                onChange={this.onChangeNoticeDay}
                options={this.state.noticeDayOptions}
                style={{ marginBottom: 24 }}
              />
            </div>
          )}
        </DialogContent>
        <Divider />
        <DialogActions className={this.props.classes.actionWrapper}>
          <Button
            onClick={this.onCancel}
            color="secondary"
            variant="outlined"
            classes={{
              root: this.props.classes.buttonRoot
            }}
          >
            キャンセル
          </Button>
          <Button
            onClick={this.onViewPreview}
            color="secondary"
            variant="contained"
            classes={{
              root: this.props.classes.buttonRoot
            }}
          >
            確定する
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  private initOptions = () => {
    const currentYear = +dateInYYYYFormat(new Date());
    const yearFrom = 1989;
    const to = currentYear + 1;
    const yearOptions = getWarekiList(yearFrom, to);
    const monthOptions = createOneToNumberOptions(12, "月", false);
    const dayOptions = this.newDayOptions(
      this.state.targetYear,
      this.state.targetMonth
    );
    this.setState({
      yearOptions,
      monthOptions,
      targetDayOptions: dayOptions,
      noticeDayOptions: dayOptions
    });
  };

  private onChangeTargetYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ targetYear: Number(e.target.value) });
    this.resetDay(
      e.target.value,
      this.state.targetMonth,
      this.state.targetDay,
      "targetDay"
    );
  };

  private onChangeTargetMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ targetMonth: Number(e.target.value) });
    this.resetDay(
      this.state.targetYear,
      e.target.value,
      this.state.targetDay,
      "targetDay"
    );
  };

  private onChangeTargetDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ targetDay: Number(e.target.value) });
  };

  private onChangeNoticeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ noticeYear: Number(e.target.value) });
    this.resetDay(
      e.target.value,
      this.state.noticeMonth,
      this.state.noticeDay,
      "noticeDay"
    );
  };

  private onChangeNoticeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ noticeMonth: Number(e.target.value) });
    this.resetDay(
      this.state.noticeYear,
      e.target.value,
      this.state.noticeDay,
      "noticeDay"
    );
  };

  private onChangeNoticeDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ noticeDay: Number(e.target.value) });
  };

  private onCancel = () => {
    this.setState({
      ...initialDate
    });
    this.initOptions();
    this.props.onCancel();
  };

  private onViewPreview = () => {
    const targetDate = dateToLocalisedString(
      `${this.state.targetYear}-${this.state.targetMonth}-${this.state.targetDay}`,
      "YYYY年M月D日"
    );
    const noticeDate =
      this.props.title.length > 1
        ? dateToLocalisedString(
            `${this.state.noticeYear}-${this.state.noticeMonth}-${this.state.noticeDay}`,
            "YYYY年M月D日"
          )
        : "";
    this.props.onViewPreview(targetDate, noticeDate);
  };

  /**
   * 日リストは年月更新で毎回変更される
   */
  private newDayOptions = (year: string, month: string) => {
    const lastDay = year && month ? getLastDay(Number(year), Number(month)) : 0;
    return createOneToNumberOptions(lastDay, "日", false);
  };

  /**
   * 年月更新時に最終日が変わる可能性があるため、lastDayからはみ出ていたらリセットを行う
   */
  private resetDay = (
    year: string,
    month: string,
    day: string,
    dayName: string
  ) => {
    const setYear = Number(year);
    const setMonth = Number(month);
    const setDay = Number(day);

    const lastDay = getLastDay(setYear, setMonth);
    if (setDay > lastDay) {
      this.setState({ [dayName]: lastDay });
    }
    if (dayName === "targetDay") {
      this.setState({ targetDayOptions: this.newDayOptions(year, month) });
    } else {
      this.setState({ noticeDayOptions: this.newDayOptions(year, month) });
    }
  };
}

export default withStyles(styles)(InvoiceSelectDateDialog);
