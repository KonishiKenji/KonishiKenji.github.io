import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import EventIcon from "@material-ui/icons/Event";
import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Button from "@material-ui/core/Button";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Divider from "@material-ui/core/Divider";

import * as isSameMonth from "date-fns/is_same_month";
import * as isBefore from "date-fns/is_before";
import * as isAfter from "date-fns/is_after";
import * as addMonths from "date-fns/add_months";
import * as lastDayOfMonth from "date-fns/last_day_of_month";

import { BASE_TEXT_COLOR, SECONDARY_LINE_COLOR } from "@/constants/styles";

import KnowbeCalendarMonthly from "@components/molecules/CalendarMonthly";
import KnowbeDialog from "@components/molecules/dialog/KnowbeDialog";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      display: "inline-flex",
      borderBottom: "1px solid #ccc"
    },
    calendarButton: {
      padding: "8px 5px"
    },
    calendarIcon: {
      height: 23,
      width: 23,
      marginLeft: 5,
      color: blueGrey[400]
    },
    arrowButton: {
      minWidth: 20,
      "&.left": {
        padding: "0 4px 0 5px"
      },
      "&.right": {
        padding: "0 5px 0 4px"
      }
    },
    arrowIcon: {
      height: 24,
      width: 24,
      color: SECONDARY_LINE_COLOR
    },
    date: {
      fontSize: 18,
      fontWeight: "bold",
      lineHeight: 1,
      letterSpacing: 0.2,
      color: BASE_TEXT_COLOR,
      "& > span": {
        margin: "0 5px 0 3px",
        fontSize: 16,
        lineHeight: 1.5
      }
    },
    underLine: {
      width: 232,
      color: SECONDARY_LINE_COLOR
    }
  });

interface OwnProps {
  selectedMonth: Date;
  min: Date;
  max: Date;
  onClickSubmit: (date: Date) => void;
}

interface State {
  isMinDate: boolean;
  isMaxDate: boolean;
  isDialogOpen: boolean;
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

class DateSelectButtonsMonthly extends React.Component<Props, State> {
  public readonly state: State = {
    isMinDate: false,
    isMaxDate: false,
    isDialogOpen: false
  };

  public componentDidMount() {
    this.setState({
      isMinDate: this.isMinDate(),
      isMaxDate: this.isMaxDate()
    });
  }

  public render() {
    const { classes, selectedMonth, min, max } = this.props;
    const { isDialogOpen, isMinDate, isMaxDate } = this.state;
    return (
      <React.Fragment>
        <div>
          <Button
            className={`${classes.arrowButton} left`}
            onClick={this.onClickLeft}
            style={isMinDate ? { visibility: "hidden" } : {}}
          >
            <ArrowLeftIcon className={classes.arrowIcon} />
          </Button>
          <Button
            className={classes.calendarButton}
            onClick={this.openCalendar}
          >
            <span className={classes.date}>
              {selectedMonth.getFullYear()}
              <span>年</span>
              {selectedMonth.getMonth() + 1}
              <span>月</span>
            </span>
            <EventIcon className={classes.calendarIcon} />
          </Button>
          <Button
            className={`${classes.arrowButton} right`}
            onClick={this.onClickRight}
            style={isMaxDate ? { visibility: "hidden" } : {}}
          >
            <ArrowRightIcon className={classes.arrowIcon} />
          </Button>
          <Divider className={classes.underLine} />
        </div>
        <KnowbeDialog
          isOpn={isDialogOpen}
          isShowTitle={false}
          isShowFooter={false}
          contentStyle={{ padding: 0 }}
          onCloseDialog={this.closeCalendar}
        >
          <KnowbeCalendarMonthly
            min={min}
            max={max}
            selectedMonth={selectedMonth}
            onClickSelect={this.onClickSubmit}
          />
        </KnowbeDialog>
      </React.Fragment>
    );
  }

  private onClickSubmit = (date: Date) => {
    const firstDayOfSelectedMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    );
    const lastDayOfSelectedMonth = lastDayOfMonth(date);
    this.props.onClickSubmit(firstDayOfSelectedMonth);
    this.setState({
      isMinDate: isSameMonth(firstDayOfSelectedMonth, this.props.min),
      isMaxDate: isSameMonth(lastDayOfSelectedMonth, this.props.max)
    });
    this.closeCalendar();
  };

  private isMinDate(): boolean {
    return isBefore(addMonths(this.props.selectedMonth, -1), this.props.min);
  }

  private isMaxDate(): boolean {
    const lastDayOfSelectedMonth = lastDayOfMonth(this.props.selectedMonth);
    return isAfter(addMonths(lastDayOfSelectedMonth, 0), this.props.max);
  }

  private openCalendar = () => {
    this.setState({ isDialogOpen: true });
  };

  private closeCalendar = () => {
    this.setState({ isDialogOpen: false });
  };

  private onClickLeft = () => {
    if (this.isMinDate()) {
      this.setState({ isMinDate: true });
    } else {
      const targetDate = addMonths(this.props.selectedMonth, -1);
      this.setState({
        isMinDate: isSameMonth(targetDate, this.props.min)
      });
      this.props.onClickSubmit(targetDate);
    }
    this.setState({ isMaxDate: false });
  };

  private onClickRight = () => {
    if (this.isMaxDate()) {
      this.setState({ isMaxDate: true });
    } else {
      const targetDate = addMonths(this.props.selectedMonth, 1);
      this.setState({
        isMaxDate: isSameMonth(targetDate, this.props.max)
      });
      this.props.onClickSubmit(targetDate);
    }
    this.setState({ isMinDate: false });
  };
}

export default withStyles(styles)(DateSelectButtonsMonthly);
