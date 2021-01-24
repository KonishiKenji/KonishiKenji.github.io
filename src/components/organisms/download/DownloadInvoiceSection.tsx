import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  DownloadableMonth,
  DownloadableUser
} from "@stores/domain/invoice/type";

const styles = ({ spacing }: Theme) =>
  createStyles({
    button: {
      margin: "16px 8px 0",
      boxShadow: "none",
      borderRadius: 4,
      width: 245,
      "&:first-of-type": {
        marginLeft: 0
      }
    },
    buttonSide: {
      display: "flex",
      flexWrap: "wrap"
    },
    invoiceTitle: {
      fontSize: "20px",
      color: "#37474f",
      fontWeight: 500,
      margin: "32px 0 16px 0"
    },
    description: {
      fontSize: 16,
      color: "#37474f"
    }
  });

export interface DownloadAction {
  label: string;
  onClick: () => void;
  isDisabled: boolean;
}

interface OwnProps {
  month: string;
  months: DownloadableMonth[];
  downloadCsvActions: DownloadAction[];
  downloadPrintActions: DownloadAction[];
  excludedUserIds: number[];
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

class DownloadInvoiceSection extends React.Component<Props> {
  public static defaultProps = {
    month: ""
  };

  public render() {
    const { classes, month, months = [] } = this.props;
    const includeUser = this.extractUser(month, months);
    return (
      <div>
        <Typography
          component="h2"
          variant="h2"
          className={classes.invoiceTitle}
        >
          国保連への請求書類ダウンロード
        </Typography>
        <div>
          <Typography
            component="p"
            variant="body2"
            className={classes.description}
          >
            各種請求書類はCSVファイルでダウンロードされます。
            <br />
            ダウンロードしたCSVファイルは「取り込み送信システム」にそのままアップロードしてください。
          </Typography>
          <div className={classes.buttonSide}>
            {this.props.downloadCsvActions.map((action, idx) =>
              action.label === "サービス提供実績記録票" ||
              action.label === "請求書・明細書" ? (
                <Button
                  key={idx}
                  className={classes.button}
                  color="secondary"
                  onClick={action.onClick}
                  variant="contained"
                  disabled={action.isDisabled}
                >
                  {action.label}
                </Button>
              ) : (
                <Button
                  key={idx}
                  style={
                    action.label === "利用者負担上限額管理結果票" &&
                    includeUser &&
                    includeUser.targetForUpLimit
                      ? { display: "block" }
                      : { display: "none" }
                  }
                  className={classes.button}
                  color="secondary"
                  onClick={action.onClick}
                  variant="contained"
                  disabled={action.isDisabled}
                >
                  {action.label}
                </Button>
              )
            )}
          </div>
        </div>
        <div>
          <Typography
            component="h2"
            variant="h2"
            className={classes.invoiceTitle}
          >
            請求書類の印刷
          </Typography>
          <Typography
            component="p"
            variant="body2"
            className={classes.description}
          >
            サービス提供実績や請求の詳細内容を規定のフォーマットで印刷されます。
            <br />
            各種請求内容の確認や保管などにご利用ください。
          </Typography>
          <div className={classes.buttonSide}>
            {this.props.downloadPrintActions.map((action, idx) =>
              action.label === "サービス提供実績記録票" ||
              action.label === "請求書・明細書" ? (
                <Button
                  key={idx}
                  className={classes.button}
                  color="secondary"
                  onClick={action.onClick}
                  variant="contained"
                  disabled={action.isDisabled}
                >
                  {action.label}
                </Button>
              ) : (
                <Button
                  key={idx}
                  style={
                    (action.label === "利用者負担額一覧表" &&
                      includeUser &&
                      includeUser.targetForUserCostAmountList) ||
                    (action.label === "利用者負担上限額管理結果票" &&
                      includeUser &&
                      includeUser.targetForUpLimit)
                      ? { display: "block" }
                      : { display: "none" }
                  }
                  className={classes.button}
                  color="secondary"
                  onClick={action.onClick}
                  variant="contained"
                  disabled={action.isDisabled}
                >
                  {action.label}
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  private extractUser = (month: string, months: DownloadableMonth[]) => {
    const checkIncludeTargetUsers = months.filter(target => {
      return month === target.date;
    });
    const users = [];
    for (const entry of checkIncludeTargetUsers) {
      for (const fixed of entry.results) {
        users.push(...fixed.users);
      }
    }
    const checkUser = users.filter(target => {
      return (
        !this.props.excludedUserIds.some(id => id === target.id) &&
        !target.none_recipient_number_flg
      );
    });
    const result = checkUser.reduce(
      (
        prev: Pick<
          DownloadableUser,
          "targetForUserCostAmountList" | "targetForUpLimit"
        >,
        current: DownloadableUser
      ) => {
        if (current.targetForUserCostAmountList) {
          prev.targetForUserCostAmountList =
            current.targetForUserCostAmountList;
        } else if (current.targetForUpLimit) {
          prev.targetForUpLimit = current.targetForUpLimit;
        }
        return prev;
      },
      {
        targetForUserCostAmountList: false,
        targetForUpLimit: false
      }
    );
    return result;
  };
}

export default withStyles(styles)(DownloadInvoiceSection);
