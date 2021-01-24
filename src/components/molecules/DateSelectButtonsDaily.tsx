import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import blueGrey from "@material-ui/core/colors/blueGrey";
import CalendarDaily from "@components/molecules/CalendarDaily";
import KnowbeDialog from "@components/molecules/dialog/KnowbeDialog";
import * as isSameDay from "date-fns/is_same_day";
import * as isBefore from "date-fns/is_before";
import * as isAfter from "date-fns/is_after";
import * as addDays from "date-fns/add_days";
import { oneLetterWeekdaysJapanese } from "@utils/date";
import { BASE_TEXT_COLOR, SECONDARY_LINE_COLOR } from "@/constants/styles";

const styles = () =>
  createStyles({
    root: {
      display: "inline-flex",
      borderBottom: "1px solid #ccc"
    },
    calendarButton: {
      padding: "8px 5px 0 5px"
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
      width: 306,
      color: SECONDARY_LINE_COLOR
    }
  });

interface OwnProps {
  defaultDate: Date;
  min: Date;
  max: Date;
  onClickSubmit: (date: Date) => void;
  highlightErrors?: {
    errorsDateList: string[];
    fetchLatestInoutErrors: () => Promise<void>;
  };
}

interface State {
  currentDate: Date; // 表示用
  selectedDate: Date; // 選択中のdate
  isMinDate: boolean;
  isMaxDate: boolean;
  isDialogOpen: boolean;
}

type Props = WithStyles<typeof styles> & OwnProps;

class DateSelectButtonsDaily extends React.Component<Props, State> {
  public readonly state: State = {
    currentDate: this.props.defaultDate,
    selectedDate: this.props.defaultDate,
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
    const { classes, min, max } = this.props;
    const {
      currentDate,
      selectedDate,
      isDialogOpen,
      isMinDate,
      isMaxDate
    } = this.state;
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
            onClick={this.onClickOpenCalendar}
          >
            <span className={classes.date}>
              {currentDate.getFullYear()}
              <span>年</span>
              {currentDate.getMonth() + 1}
              <span>月</span>
              {currentDate.getDate()}
              <span>日</span>
              <span>({oneLetterWeekdaysJapanese[currentDate.getDay()]})</span>
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
          <CalendarDaily
            max={max}
            min={min}
            today={selectedDate}
            cancelLabel="キャンセル"
            submitLabel="確定する"
            onChangeDate={this.onChangeDate}
            onClickCancel={this.closeCalendar}
            onClickSubmit={this.handleOnClickSubmit}
            errorDates={
              this.props.highlightErrors &&
              this.props.highlightErrors.errorsDateList
            }
          />
        </KnowbeDialog>
      </React.Fragment>
    );
  }

  private isMinDate(): boolean {
    return isBefore(addDays(this.state.selectedDate, -1), this.props.min);
  }

  private isMaxDate(): boolean {
    return isAfter(addDays(this.state.selectedDate, 0), this.props.max);
  }

  /**
   * 親に選択日付を返した後、現在日付に反映してから閉じる
   */
  private handleOnClickSubmit = () => {
    this.props.onClickSubmit(this.state.selectedDate);
    this.setState({
      currentDate: this.state.selectedDate,
      isMinDate: this.isMinDate(),
      isMaxDate: this.isMaxDate(),
      isDialogOpen: false
    });
  };

  private onChangeDate = (date: Date) => {
    this.setState({ selectedDate: date });
  };

  private onClickOpenCalendar = async () => {
    if (this.props.highlightErrors) {
      await this.props.highlightErrors.fetchLatestInoutErrors();
    }
    this.setState({ isDialogOpen: true });
  };

  /**
   * 選択日付を開いた状態に戻して閉じる
   */
  private closeCalendar = () => {
    this.setState({
      selectedDate: this.state.currentDate,
      isDialogOpen: false
    });
  };

  private onClickLeft = () => {
    if (this.isMinDate()) {
      this.setState({ isMinDate: true });
    } else {
      const targetDate = addDays(this.state.selectedDate, -1);
      this.setState({
        selectedDate: targetDate,
        currentDate: targetDate,
        isMinDate: isSameDay(targetDate, this.props.min)
      });
      this.props.onClickSubmit(targetDate);
    }
    this.setState({ isMaxDate: false });
  };

  private onClickRight = () => {
    if (this.isMaxDate()) {
      this.setState({ isMaxDate: true });
    } else {
      const targetDate = addDays(this.state.selectedDate, 1);
      this.setState({
        selectedDate: targetDate,
        currentDate: targetDate,
        isMaxDate: isSameDay(targetDate, this.props.max)
      });
      this.props.onClickSubmit(targetDate);
    }
    this.setState({ isMinDate: false });
  };
}

export default withStyles(styles)(DateSelectButtonsDaily);
