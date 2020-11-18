import * as React from "react";
import * as jaLocale from "date-fns/locale/ja";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core";
import DefaultCalendar from "@components/molecules/calendar/DefaultCalendar";

interface Props extends WithStyles<typeof styles> {
  min: Date;
  max: Date;
  selectedMonth: Date;
  onClickSelect: (date: Date) => void;
}

const calenderTheme = {
  selectionColor: "rgb(6, 166, 233)",
  todayColor: "rgb(6, 166, 233)",
  textColor: {
    default: "rgb(85, 85, 85)",
    active: "#FFF"
  },
  weekdayColor: "rgba(6, 166, 233, 0.8)",
  headerColor: "rgb(6, 166, 233)",
  floatingNav: {
    background: "#778899",
    color: "#FFF",
    chevron: "#FFF"
  }
};

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
  headerFormat: "MMM",
  locale: jaLocale
};

const CalendarMonthly: React.FunctionComponent<Props> = ({
  min,
  max,
  selectedMonth,
  onClickSelect
}) => (
  <DefaultCalendar
    theme={calenderTheme}
    min={min}
    max={max}
    selected={selectedMonth}
    width={400}
    height={500}
    locale={localeSettings}
    displayOptions={{
      showOverlay: false
    }}
    display="years"
    onSelect={onClickSelect}
  />
);

export default withStyles(styles)(CalendarMonthly);
