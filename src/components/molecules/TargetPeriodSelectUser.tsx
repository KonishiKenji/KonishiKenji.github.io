import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import DateSelectFields from "@components/molecules/DateSelectFields";
import MuiTextField from "@components/molecules/MuiTextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { SelectDateValue } from "@interfaces/ui/form";
import ValidationErrors from "@interfaces/ui/validationErrors";

const styles = () =>
  createStyles({
    text: {
      fontSize: 14,
      marginBottom: 8,
      marginLeft: 16
    },
    button: {
      borderColor: "#ccc",
      padding: "3px 16px"
    },
    root: {
      width: "100%",
      display: "flex",
      alignItems: "flex-end",
      marginLeft: 16
    },
    startDateSelect: {
      marginBottom: 8
    },
    endDateSelect: {
      marginBottom: 16
    }
  });

interface OwnProps {
  startValue: string;
  endValue: string;
  onChangeStartDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEndDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickButton: () => void;
  startToYear: number;
  startFromYear: number;
  endToYear: number;
  endFromYear: number;
  isDefaultValue: boolean;
  currentUserCount: number;
  maxUserCount: number;
  isDisabled?: boolean;
  startDateHelperText: ValidationErrors<SelectDateValue>;
  endDateHelperText: ValidationErrors<SelectDateValue>;
  isError: boolean;
}

type Props = OwnProps & WithStyles<typeof styles>;

const TargetPeriodSelectUser = (props: Props): JSX.Element => {
  const userCountLabel = props.isDefaultValue
    ? "-"
    : `${props.currentUserCount}名／${props.maxUserCount}名`;
  const disabledExcludeUsers = props.isDefaultValue || props.maxUserCount === 0;
  return (
    <div>
      <Typography
        component="p"
        variant="caption"
        className={props.classes.text}
      >
        ※
        一度にダウンロードできるデータは12ヶ月分以内となります。それ以上の場合は回数を分けてください。
      </Typography>
      <div className={props.classes.startDateSelect}>
        <DateSelectFields
          id="start"
          label="対象開始日"
          from={props.startFromYear}
          to={props.startToYear}
          value={props.startValue}
          onChange={props.onChangeStartDate}
          isDisabled={props.isDisabled}
          helperText={
            props.startDateHelperText.year ||
            props.startDateHelperText.month ||
            props.startDateHelperText.day
          }
          isError={props.isError}
          isDefaultValue={false}
        />
      </div>
      <div className={props.classes.endDateSelect}>
        <DateSelectFields
          id="end"
          label="対象終了日"
          from={props.endFromYear}
          to={props.endToYear}
          value={props.endValue}
          onChange={props.onChangeEndDate}
          isDisabled={props.isDisabled}
          helperText={
            props.endDateHelperText.year ||
            props.endDateHelperText.month ||
            props.endDateHelperText.day
          }
          isError={props.isError}
          isDefaultValue={false}
        />
      </div>
      <div className={props.classes.root}>
        <MuiTextField
          label="対象利用者数"
          value={userCountLabel}
          InputLabelProps={{ shrink: true }}
          disabled
          size="small"
          style={{ marginBottom: 0 }}
        />
        <Button
          className={props.classes.button}
          color="secondary"
          variant="outlined"
          disabled={disabledExcludeUsers}
          onClick={props.onClickButton}
        >
          利用者選択
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(TargetPeriodSelectUser);
