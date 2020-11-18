import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AttendanceTime from "@components/organisms/attendance/AttendanceTime";
import { Attendance } from "@stores/domain/attendance/type";
import { SERVICE_STATUS } from "@constants/variables";
import { ATTENDANCE_BOX_SHADOW } from "@constants/styles";
import attendanceInScreen from "@images/attendance_in_screen.gif";
import attendanceOutScreen from "@images/attendance_out_screen.gif";
import { dateToLocalisedString } from "@utils/date";

const styles = (): StyleRules =>
  createStyles({
    loot: {
      width: "100%",
      backgroundColor: "#eee",
      position: "fixed",
      zIndex: 1200,
      left: 0,
      top: "100vh",
      transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
      overflow: "scroll",
      fontFamily:
        "'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', Meiryo, メイリオ, Osaka, 'MS PGothic', arial, helvetica, sans-serif"
    },
    contentWrapper: {
      height: "100vh"
    },
    content: {
      display: "flex",
      margin: "0 auto 0",
      padding: "56px 12px 0",
      maxWidth: 960,
      "@media only screen and (max-width: 875px)": {
        display: "block",
        margin: "40px 16px 0",
        padding: "0 12px"
      }
    },
    header: {
      padding: "10px 16px",
      backgroundColor: "#50aab4"
    },
    closeButton: {
      padding: "10px 16px",
      backgroundColor: "#50aab4",
      boxShadow: "none",
      "&:hover": {
        boxShadow: "none",
        backgroundColor: "#73bbc3"
      },
      "&:active": {
        boxShadow: "none"
      }
    },
    closeButtonLabel: {
      color: "#fff",
      fontSize: 16,
      width: 64
    },
    workingButton: {
      backgroundColor: "#50aab4",
      width: 183,
      height: 56,
      marginTop: 32,
      marginLeft: "auto",
      marginRight: "auto",
      color: "#fff",
      boxShadow: ATTENDANCE_BOX_SHADOW,
      "&:hover": {
        backgroundColor: "#50aab4"
      }
    },
    afterButton: {
      backgroundColor: "#f5cd00",
      width: 183,
      height: 56,
      marginTop: 32,
      marginLeft: "auto",
      marginRight: "auto",
      color: "#fff",
      boxShadow: ATTENDANCE_BOX_SHADOW,
      "&:hover": {
        backgroundColor: "#f5cd00"
      }
    },
    attendanceButtonLabel: {
      display: "block",
      textAlign: "center",
      fontSize: 24
    },
    select: {
      flex: "3 1",
      display: "flex",
      minWidth: 516,
      boxSizing: "border-box",
      textAlign: "center",
      flexDirection: "column",
      justifyContent: "center",
      borderRadius: 2,
      boxShadow:
        "0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)",
      backgroundColor: "#ffffff",
      paddingTop: 64,
      paddingBottom: 64
    },
    selectMainText: {
      fontSize: 30,
      color: "#333333",
      marginBottom: 18
    },
    footerImgWrapper: {
      display: "none",
      "@media only screen and (max-width: 875px)": {
        display: "block"
      }
    },
    footerImg: {
      width: "345px",
      margin: "auto",
      display: "block"
    },
    timeWrapper: {
      marginTop: 16,
      minHeight: 64,
      fontSize: 20,
      fontWeight: "bold"
    },
    inTime: {
      marginTop: 16,
      lineHeight: 0.8,
      color: "#50aab4"
    },
    outTime: {
      marginTop: 16,
      lineHeight: 0.8,
      color: "#f5cd00"
    },
    colorGray: {
      color: "rgba(0, 0, 0, 0.54)"
    }
  });

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
  onInTime: (id: number, name: string, status: number) => void;
  onOutTime: (id: number, name: string, status: number) => void;
  targetAttendance?: Attendance;
  punchInButtonLabel: string;
  punchOutButtonLabel: string;
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

class AttendanceModal extends React.Component<Props> {
  private getPreviousInTimeLabel = (): string => {
    if (
      !this.props.targetAttendance ||
      !this.props.targetAttendance.previousInTime
    ) {
      return "--:--";
    }
    return dateToLocalisedString(
      this.props.targetAttendance.previousInTime,
      "YYYY年MM月DD日 HH:mm"
    );
  };

  private getStatusLabel = (): string => {
    const result = SERVICE_STATUS.find((target) => {
      if (!this.props.targetAttendance) return false;
      return target.value === this.props.targetAttendance.status;
    });
    return result ? result.label : "";
  };

  private getPreviousStatusLabel = (): string => {
    const result = SERVICE_STATUS.find((target) => {
      if (!this.props.targetAttendance) return false;
      return target.value === this.props.targetAttendance.previousStatus;
    });
    return result ? result.label : "なし";
  };

  private isPreviousStatusView = (): boolean => {
    const result = SERVICE_STATUS.find((target) => {
      if (!this.props.targetAttendance) return false;
      return target.value === this.props.targetAttendance.previousStatus;
    });
    return result ? result.isView : false;
  };

  private isNotInOut = (): boolean => {
    const result = SERVICE_STATUS.find((target) => {
      if (!this.props.targetAttendance || !this.props.targetAttendance.status) {
        return false;
      }

      return target.value === this.props.targetAttendance.status;
    });
    return result ? result.notInOut : false;
  };

  private onClose = (): void => {
    this.props.onClose();
  };

  private onInTime = (): void => {
    if (!this.props.targetAttendance) return;
    this.props.onInTime(
      this.props.targetAttendance.uif_id,
      this.props.targetAttendance.displayName,
      !this.props.targetAttendance.status ||
        this.props.targetAttendance.status === 1
        ? 2
        : this.props.targetAttendance.status
    );
  };

  private onOutTime = (): void => {
    if (!this.props.targetAttendance) return;
    this.props.onOutTime(
      this.props.targetAttendance.uif_id,
      this.props.targetAttendance.displayName,
      this.props.targetAttendance.status || 2
    );
  };

  public render(): JSX.Element {
    return (
      <div
        className={this.props.classes.loot}
        style={
          this.props.isOpen
            ? { transform: "translateY(-100vh)" }
            : { transform: "translateY(0vh)" }
        }
      >
        <div className={this.props.classes.contentWrapper}>
          <div className={this.props.classes.header}>
            <Button
              variant="contained"
              onClick={this.onClose}
              color="secondary"
              classes={{
                root: this.props.classes.closeButton,
                label: this.props.classes.closeButtonLabel
              }}
            >
              閉じる
            </Button>
          </div>
          {this.props.isOpen && this.props.targetAttendance ? (
            <>
              <div className={this.props.classes.content}>
                <AttendanceTime
                  attendanceStatus={
                    this.props.targetAttendance.attendanceStatus
                  }
                />
                <div className={this.props.classes.select}>
                  <div className={this.props.classes.selectMainText}>
                    {this.props.targetAttendance.displayName}
                    さん
                  </div>
                  <div className={this.props.classes.selectMainText}>
                    {this.props.targetAttendance.attendanceStatus === "before"
                      ? "おはようございます"
                      : "お疲れ様でした"}
                  </div>
                  {this.isPreviousStatusView() && (
                    <div className={this.props.classes.colorGray}>
                      {`前回の利用：${this.getPreviousStatusLabel()}`}
                    </div>
                  )}
                  {(this.props.targetAttendance.previousInTime ||
                    this.props.targetAttendance.previousOutTime) && (
                    <div className={this.props.classes.colorGray}>
                      {this.getPreviousInTimeLabel()}
                      {" 〜 "}
                      {this.props.targetAttendance.previousOutTime || "--:--"}
                    </div>
                  )}
                  <div className={this.props.classes.timeWrapper}>
                    {this.props.targetAttendance.inTime ||
                    this.props.targetAttendance.outTime ? (
                      <>
                        {this.props.targetAttendance.inTime && (
                          <div className={this.props.classes.inTime}>
                            {`本日の通所時間 ${this.props.targetAttendance.inTime}`}
                          </div>
                        )}
                        {this.props.targetAttendance.outTime && (
                          <div className={this.props.classes.outTime}>
                            {`本日の退所時間 ${this.props.targetAttendance.outTime}`}
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                  {this.isNotInOut() && (
                    <div className={this.props.classes.colorGray}>
                      {`本日は${this.getStatusLabel()}です`}
                    </div>
                  )}
                  {this.props.targetAttendance.attendanceStatus === "before" &&
                    !this.isNotInOut() && (
                      <Button
                        variant="contained"
                        onClick={this.onInTime}
                        color="secondary"
                        classes={{
                          root: this.props.classes.workingButton,
                          label: this.props.classes.attendanceButtonLabel
                        }}
                      >
                        {this.props.punchInButtonLabel || "通所する"}
                      </Button>
                    )}

                  {this.props.targetAttendance.attendanceStatus === "working" &&
                    !this.isNotInOut() && (
                      <Button
                        variant="contained"
                        onClick={this.onOutTime}
                        color="secondary"
                        classes={{
                          root: this.props.classes.afterButton,
                          label: this.props.classes.attendanceButtonLabel
                        }}
                      >
                        {this.props.punchOutButtonLabel || "退所する"}
                      </Button>
                    )}
                </div>
              </div>
              <div className={this.props.classes.footerImgWrapper}>
                <img
                  src={
                    this.props.targetAttendance.attendanceStatus === "before"
                      ? attendanceInScreen
                      : attendanceOutScreen
                  }
                  className={this.props.classes.footerImg}
                  alt=""
                />
              </div>
            </>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AttendanceModal);
