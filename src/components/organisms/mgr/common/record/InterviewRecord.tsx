import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import { SupportsState } from "@stores/domain/supports/types";
import { SERVICE_STATUS } from "@constants/variables";
import convertMinutesToTime from "@utils/date/convertMinutesToTime";

const styles = (): StyleRules =>
  createStyles({
    counts: {
      fontSize: 10,
      marginRight: 20
    }
  });

interface OwnProps {
  counts: SupportsState["supportsRecord"]["counts"];
  supports: SupportsState["supportsRecord"]["support"];
}

type Props = OwnProps & WithStyles<typeof styles>;

const matchStatusForInterviewRecord = (status: number): boolean =>
  status === SERVICE_STATUS[1].value ||
  status === SERVICE_STATUS[2].value ||
  status === SERVICE_STATUS[3].value ||
  status === SERVICE_STATUS[6].value ||
  status === SERVICE_STATUS[7].value ||
  status === SERVICE_STATUS[8].value;

const decreaseInterviewCount = (supports: Props["supports"]): number => {
  const count = supports.filter((item) => {
    const { inout, record } = item;

    return (
      !matchStatusForInterviewRecord(inout.status) &&
      record !== null &&
      record.interview_flg === "1"
    );
  }).length;
  return count;
};

const decreaseInterviewTime = (supports: Props["supports"]): number => {
  let time = 0;
  supports.forEach((item) => {
    const { inout, record } = item;
    if (
      !!inout &&
      !!record &&
      !matchStatusForInterviewRecord(inout.status) &&
      record.interview_flg === "1" &&
      !!inout.target_date &&
      !!record.interview_start_time &&
      !!record.interview_end_time
    ) {
      const from = new Date(
        `${inout.target_date} ${record.interview_start_time}`
      );
      const to = new Date(`${inout.target_date} ${record.interview_end_time}`);
      time += Math.floor((to.getTime() - from.getTime()) / (1000 * 60));
    }
  });
  return time;
};

const InterviewRecord = (props: Props): JSX.Element => {
  const { classes, counts, supports } = props;
  const excludedMinutes = decreaseInterviewTime(supports);
  const excludedCount = decreaseInterviewCount(supports);
  const time = convertMinutesToTime(
    counts.totalInterviewMinutes - excludedMinutes
  );

  return (
    <>
      <span className={classes.counts}>
        {`面談： ${counts.numberOfHavingInterview - excludedCount}回`}
        {Number(time.hour) > 0
          ? `(${time.hour}時間${time.minutes}分)`
          : `(${time.minutes}分)`}
      </span>
    </>
  );
};

export default withStyles(styles)(InterviewRecord);
