import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import TextField from "@material-ui/core/TextField";

import DropDown from "@components/atoms/DropDown";

import {
  DownloadableMonth,
  DownloadableUser,
  DownloadableResult
} from "@stores/domain/invoice/type";

import { dateToLocalisedString } from "@utils/date";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      marginTop: spacing.unit * 2,
      paddingTop: spacing.unit * 2,
      paddingBottom: spacing.unit * 2
    },
    dropDown: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      width: 213
    },
    select: {
      width: 128,
      marginRight: 16
    },
    textField: {
      marginRight: 16,
      width: 154
    },
    button: {
      marginTop: spacing.unit,
      border: "1px solid #cccccc",
      boxShadow: "none",
      borderRadius: 4,
      width: 122
    },
    error: {
      paddingLeft: spacing.unit * 2,
      fontSize: 14,
      lineHeight: 1.57,
      letterSpacing: 0.8,
      color: "#ff5656"
    }
  });

interface OwnProps {
  selected: boolean;
  months: DownloadableMonth[];
  isDisabledSelect: boolean;
  isDisabledButton: boolean;
  excludedUserIdCount: number;

  value: string;
  buttonLabel: string;

  isNotFinishedInitialData: boolean;

  onChangeSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickButton: (event: React.MouseEvent<HTMLSelectElement>) => void;
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

const getUsers = (month: DownloadableMonth) => {
  if (!month) return [];
  const users = month.results.map(
    (result: DownloadableResult): DownloadableUser[] => {
      return result.users;
    }
  );
  return users.reduce((acc, val) => acc.concat(val), []);
};

class TargetSelectSection extends React.Component<Props> {
  public static defaultProps = {
    buttonLabel: "利用者選択"
  };

  public render() {
    const { classes } = this.props;

    const months = this.props.months.map(month => {
      return {
        label: dateToLocalisedString(month.date, "YYYY年MM月"),
        value: month.date
      };
    });
    const monthItem = [{ label: "月を選択", value: "" }, ...months];

    let userCount;
    let textFieldValue = "-";

    if (!!this.props.months) {
      const targetMonth = this.props.months.find(
        m => m.date === this.props.value
      );
      if (!!targetMonth) {
        const userList = getUsers(targetMonth);
        userCount = userList.length;
        const targetUserCount = userCount - this.props.excludedUserIdCount;
        textFieldValue = `${targetUserCount} 名 / ${userCount} 名`;
      }
    }

    return (
      <>
        <div className={classes.root}>
          <DropDown
            id="selectMonth"
            label="対象請求月"
            isError={false}
            size="textFieldSmall"
            options={monthItem}
            value={this.props.value}
            styles={classes.dropDown}
            onChange={this.props.onChangeSelect}
            isDisabled={this.props.isNotFinishedInitialData}
          />
          <TextField
            label="対象利用者数"
            className={classes.textField}
            value={textFieldValue}
            InputLabelProps={{
              // ...inputLabelProps,
              shrink: true
            }}
            disabled={true}
          />
          <Button
            className={classes.button}
            color="secondary"
            disabled={
              this.props.isDisabledButton || this.props.isNotFinishedInitialData
            }
            onClick={this.props.onClickButton}
            variant="text"
          >
            {this.props.buttonLabel}
          </Button>
        </div>
        {this.props.isNotFinishedInitialData && (
          <div>
            <span className={classes.error}>
              ダウンロードするには、先に「初期設定情報」で初回請求月を設定する必要があります。
            </span>
          </div>
        )}
      </>
    );
  }
}

export default withStyles(styles)(TargetSelectSection);
