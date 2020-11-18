import * as React from "react";
import * as jaLocale from "date-fns/locale/ja";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import HighlightErrorsCalendar from "@components/molecules/calendar/HighlightErrorsCalendar";
import { oneLetterWeekdaysJapanese } from "@utils/date";

interface Props extends WithStyles<typeof styles> {
  min: Date;
  max: Date;
  today: Date;
  cancelLabel: string;
  submitLabel: string;
  errorDates?: string[];
  onChangeDate: (date: Date) => void;
  onClickCancel: () => void;
  onClickSubmit: () => void;
}

const styles = ({ spacing }: Theme) =>
  createStyles({
    button: {
      color: "#03a9f4"
    },
    footer: {
      flex: "0 0 auto",
      display: "flex",
      padding: `${spacing.unit}px ${spacing.unit * 2}px`,
      alignItems: "center",
      justifyContent: "flex-end",
      backgroundColor: "#fff"
    }
  });

const localeSettings = {
  blank: "日付を選択してください",
  headerFormat: "MMM Do(dd)",
  todayLabel: { long: "今日" },
  weekdays: oneLetterWeekdaysJapanese,
  locale: jaLocale
};

const CalendarDaily: React.FunctionComponent<Props> = ({
  classes,
  min,
  max,
  today,
  cancelLabel,
  submitLabel,
  errorDates = [],
  onChangeDate,
  onClickCancel,
  onClickSubmit
}) => {
  return (
    <React.Fragment>
      <HighlightErrorsCalendar
        errorDates={errorDates}
        selected={today}
        width={400}
        height={354}
        min={min}
        max={max}
        minDate={min}
        maxDate={max}
        locale={localeSettings}
        displayOptions={{
          showOverlay: false
        }}
        onSelect={onChangeDate}
      />
      <div className={classes.footer} style={{ width: 400 }}>
        <Button
          key="cancel"
          variant="text"
          color="secondary"
          className={classes.button}
          onClick={onClickCancel}
        >
          {cancelLabel}
        </Button>
        <Button
          key="submit"
          variant="text"
          color="secondary"
          className={classes.button}
          onClick={onClickSubmit}
        >
          {submitLabel}
        </Button>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(CalendarDaily);
