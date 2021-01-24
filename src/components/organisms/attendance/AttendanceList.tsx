import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import AttendanceButton from "@components/atoms/buttons/AttendanceButton";
import { FormatedAttendanceList } from "@stores/domain/attendance/type";

const styles = (): StyleRules =>
  createStyles({
    contentWrapper: {
      display: "flex"
    },
    category: {
      fontSize: 20,
      color: "#616161",
      paddingTop: 36,
      marginRight: 16
    },
    attendanceList: {
      display: "flex",
      flexWrap: "wrap",
      width: "100%"
    },
    buttonWrapper: {
      marginLeft: 24,
      marginTop: 24,
      width: "15%",
      minWidth: 180,
      "@media only screen and (max-width: 875px)": {
        width: "40%"
      }
    },
    noUser: {
      textAlign: "center",
      color: "#616161",
      marginTop: 24
    }
  });

interface OwnProps {
  attendanceList?: FormatedAttendanceList;
  targetSelect: (id: number, kana: string) => void;
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

const AttendanceList: React.FC<Props> = (props) => {
  return (
    <div>
      {props.attendanceList && props.attendanceList.length ? (
        props.attendanceList.map((attendance) => (
          <div
            className={props.classes.contentWrapper}
            key={attendance.viewKana}
          >
            <div className={props.classes.category}>{attendance.viewKana}</div>
            <div className={props.classes.attendanceList}>
              {attendance.attendance.map((target) => (
                <div
                  className={props.classes.buttonWrapper}
                  key={target.uif_id}
                >
                  <AttendanceButton
                    id={target.uif_id}
                    type={target.attendanceStatus}
                    name={target.displayName}
                    kana={attendance.viewKana}
                    handleClick={props.targetSelect}
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className={props.classes.noUser}>利用者が存在しません</div>
      )}
    </div>
  );
};

export default withStyles(styles)(AttendanceList);
