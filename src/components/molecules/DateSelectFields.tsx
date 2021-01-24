import * as React from "react";
import * as classNames from "classnames";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { INPUT_LABEL_COLOR } from "@constants/styles";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";

import DropDown from "@components/atoms/DropDown";
import * as validate from "@utils/validations";
import createOneToNumberOptions from "@utils/createOneToNumberOptions";

import {
  getWarekiList,
  getLastDay,
  dateToLocalisedString,
  parseDateString
} from "@utils/date";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      padding: `${spacing.unit}px ${spacing.unit * 2}px`,
      backgroundColor: "#fff"
    },
    noneLeftPadding: {
      paddingLeft: 0
    },
    dropDown: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0
    },
    textField: {
      marginRight: 16,
      width: 128,
      marginBottom: spacing.unit * 2
    },
    label: {
      color: INPUT_LABEL_COLOR
    }
  });

interface OwnProps {
  id: string;
  label: string;
  from: number;
  to: number;
  value: string;
  helperText?: string;
  isRequired?: boolean;
  isError?: boolean;
  isNoneLeftPadding?: boolean;
  isDisabled?: boolean;
  isDefaultValue?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface Values {
  label: string;
  value: number | string;
}

interface State {
  year: string;
  month: string;
  day: string;
  yearOptions: Values[];
  monthOptions: Values[];
  dayOptions: Values[];
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

class DateSelectFields extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      year: this.getCurrentDate(this.props.value).year,
      month: this.getCurrentDate(this.props.value).month,
      day: this.getCurrentDate(this.props.value).day,
      yearOptions: [],
      monthOptions: [],
      dayOptions: []
    };
  }

  public componentDidMount(): void {
    const warekiList = getWarekiList(this.props.from, this.props.to);
    const defaultValue = {
      label: "選択してください",
      value: DEFAULT_SELECT_VALUE
    };
    const yearOptions = this.props.isDefaultValue
      ? [defaultValue, ...warekiList]
      : warekiList;
    const monthOptions = createOneToNumberOptions(
      12,
      "月",
      this.props.isDefaultValue
    );
    const lastDay = this.getLastDay();
    const dayOptions = createOneToNumberOptions(
      lastDay,
      "日",
      this.props.isDefaultValue
    );
    this.setState({ yearOptions, monthOptions, dayOptions });
  }

  private getLastDay = (): number => {
    const { year, month } = this.state;
    return year && month ? getLastDay(Number(year), Number(month)) : 0;
  };

  private onChangeYear = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const year = e.target.value;
    this.setState({ year });

    const { month, day } = this.state;
    if (!year || !month || !day) {
      this.validateAllCompleted(e, "");
      return;
    }
    const restDay = this.resetDay(year, month, day);
    const datestr = dateToLocalisedString(
      new Date(Number(year), Number(month) - 1, Number(restDay)),
      "YYYY-MM-DD"
    );
    this.validateAllCompleted(e, datestr);
  };

  private onChangeMonth = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const month = e.target.value;
    this.setState({ month });

    const { year, day } = this.state;
    if (!year || !month || !day) {
      this.validateAllCompleted(e, "");
      return;
    }
    const restDay = this.resetDay(year, month, day);
    const datestr = dateToLocalisedString(
      new Date(Number(year), Number(month) - 1, Number(restDay)),
      "YYYY-MM-DD"
    );
    this.validateAllCompleted(e, datestr);
  };

  private onChangeDay = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const day = e.target.value;
    this.setState({ day });

    const { year, month } = this.state;
    if (!year || !month || !day) {
      this.validateAllCompleted(e, "");
      return;
    }

    const datestr = dateToLocalisedString(
      new Date(Number(year), Number(month) - 1, Number(day)),
      "YYYY-MM-DD"
    );

    this.validateAllCompleted(e, datestr);
  };

  private getCurrentDate = (
    dateValue: string
  ): { year: string; month: string; day: string } => {
    const date = {
      year: "",
      month: "",
      day: ""
    };
    if (dateValue) {
      const dt = parseDateString(dateValue);
      date.year = `${dt.getFullYear()}`;
      date.month = `${dt.getMonth() + 1}`;
      date.day = `${dt.getDate()}`;
    }
    return date;
  };

  private validateAllCompleted = (
    e: React.ChangeEvent<HTMLInputElement>,
    dateStr: string
  ): void => {
    e.target.value = dateStr;
    e.currentTarget = e.target;
    this.props.onChange(e);
  };

  // "NOT_SELECTED"がrequiredバリデーションにかからないため""に変換
  private notSelectedToEmpty = (value: string | undefined): string => {
    const date = !value || value === DEFAULT_SELECT_VALUE ? "" : value;
    return date;
  };

  private createHelperText = (
    value: string | undefined,
    helperText: string | undefined
  ): string | undefined => {
    if (helperText && helperText !== validate.requiredMessage) {
      return helperText;
    }
    return this.notSelectedToEmpty(value) === "" ? helperText : "";
  };

  private errorCheck = (
    value: string | undefined,
    helperText: string | undefined,
    isError: boolean | undefined
  ): boolean | undefined => {
    if (isError && helperText && helperText !== validate.requiredMessage) {
      return true;
    }
    return this.notSelectedToEmpty(value) === "" ? isError : false;
  };

  /**
   * 年月更新時に最終日が変わる可能性があるため、lastDayからはみ出ていたらリセットを行う
   * TODO: リセットを行う役割と最終日を返す役割は分けたほうがいい
   */
  private resetDay = (year: string, month: string, day: string): number => {
    const setYear = Number(year);
    const setMonth = Number(month);
    const setDay = Number(day);
    let returnDay = setDay;

    const lastDay = getLastDay(setYear, setMonth);
    if (setDay > lastDay) {
      this.setState({ day: `${lastDay}` });
      returnDay = lastDay;
    }
    this.setState({
      dayOptions: createOneToNumberOptions(
        lastDay,
        "日",
        this.props.isDefaultValue
      )
    });
    return returnDay;
  };

  public render(): JSX.Element {
    const {
      classes,
      isError,
      isRequired,
      helperText,
      id,
      value,
      isDisabled
    } = this.props;
    const {
      year,
      month,
      day,
      yearOptions,
      monthOptions,
      dayOptions
    } = this.state;

    return (
      <div
        className={classNames(
          classes.root,
          this.props.isNoneLeftPadding && classes.noneLeftPadding
        )}
      >
        <DropDown
          id={`${id}-year`}
          label={this.props.label}
          size="textFieldMedium"
          options={yearOptions}
          styles={classes.dropDown}
          onChange={this.onChangeYear}
          value={`${year}` || value}
          helperText={this.createHelperText(year, helperText)}
          isError={this.errorCheck(year, helperText, isError)}
          isRequired={isRequired}
          InputLabelProps={{
            shrink: true
          }}
          isDisabled={isDisabled}
        />
        <DropDown
          id={`${id}-year`}
          label={month ? " " : "月"}
          size="textFieldSmall"
          options={monthOptions}
          styles={classes.dropDown}
          onChange={this.onChangeMonth}
          value={`${month}`}
          isError={this.errorCheck(month, helperText, isError)}
          InputLabelProps={{
            shrink: false,
            FormLabelClasses: { root: classes.label }
          }}
          helperText={month === "" ? helperText : ""}
          isDisabled={isDisabled}
        />
        <DropDown
          id={`${id}-day`}
          label={day ? " " : "日"}
          size="textFieldSmall"
          options={dayOptions}
          styles={classes.dropDown}
          onChange={this.onChangeDay}
          value={`${day}`}
          isError={this.errorCheck(day, helperText, isError)}
          InputLabelProps={{
            shrink: false,
            FormLabelClasses: { root: classes.label }
          }}
          helperText={day === "" ? helperText : ""}
          isDisabled={isDisabled}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DateSelectFields);
