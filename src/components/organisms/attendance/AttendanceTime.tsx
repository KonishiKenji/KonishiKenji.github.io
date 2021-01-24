import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import attendanceInScreen from "@images/attendance_in_screen.gif";
import attendanceOutScreen from "@images/attendance_out_screen.gif";
import { dateToObject } from "@utils/date";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    timeWrapper: {
      flex: "2 1",
      padding: "64px 38px 0 0",
      textAlign: "center",
      "@media only screen and (max-width: 875px)": {
        padding: "0",
        margin: "20px 0 10px",
        minWidth: 512,
        boxSizing: "border-box",
        textAlign: "left",
        display: "flex"
      }
    },
    time: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      marginBottom: 40,
      fontSize: 44,
      lineHeight: 1,
      color: "#495c6d",
      "@media only screen and (max-width: 875px)": {
        marginBottom: 0,
        flex: "2 1"
      }
    },
    timeImgWrapper: {
      "@media only screen and (max-width: 875px)": {
        display: "none"
      }
    },
    timeImg: {
      width: "345px"
    },
    day: {
      marginLeft: 8,
      "@media only screen and (max-width: 875px)": {
        marginLeft: 0
      }
    },
    dayWrapper: {
      marginBottom: 40,
      fontSize: 26,
      color: "#495c6d",
      "@media only screen and (max-width: 875px)": {
        marginBottom: 0,
        flex: "2 1"
      }
    },
    hourMonth: {
      fontSize: 88,
      marginRight: 26
    },
    ml8: {
      marginLeft: 8
    },
    mediaBr: {
      display: "none",
      "@media only screen and (max-width: 875px)": {
        display: "block"
      }
    }
  });

interface State {
  time: Date;
}

const initialState: State = {
  time: new Date()
};

interface OwnProps {
  attendanceStatus: string;
}

interface Props extends OwnProps, WithStyles<typeof styles> {}

class AttendanceTime extends React.Component<Props, State> {
  public mounted: boolean;
  public constructor(props: any) {
    super(props);
    this.mounted = false;
    this.state = initialState;
  }

  public getMounted(): boolean {
    return this.mounted;
  }

  public setMounted(value: boolean): void {
    this.mounted = value;
  }

  public render() {
    return (
      <div className={this.props.classes.timeWrapper}>
        <div className={this.props.classes.dayWrapper}>
          {this.state.time.getFullYear()}年
          <br className={this.props.classes.mediaBr} />
          <span className={this.props.classes.day}>
            {this.state.time.getMonth() + 1}月{this.state.time.getDate()}日
          </span>
          <span className={this.props.classes.ml8}>
            {dateToObject(this.state.time).day_of_week}
          </span>
        </div>
        <div className={this.props.classes.time}>
          <span className={this.props.classes.hourMonth}>
            {this.formatDate(this.state.time.getHours())}:
            {this.formatDate(this.state.time.getMinutes())}
          </span>
          {this.formatDate(this.state.time.getSeconds())}
        </div>
        <div className={this.props.classes.timeImgWrapper}>
          <img
            src={
              this.props.attendanceStatus === "before"
                ? attendanceInScreen
                : attendanceOutScreen
            }
            className={this.props.classes.timeImg}
          />
        </div>
      </div>
    );
  }

  public componentDidMount() {
    this.setMounted(true);
    setInterval(() => {
      if (this.getMounted()) {
        this.setState({
          time: new Date()
        });
      }
    }, 1000);
  }

  public componentWillUnmount() {
    this.setMounted(false);
  }
  private formatDate = (value: number) => {
    return `0${value}`.slice(-2);
  };
}

export default withStyles(styles)(AttendanceTime);
