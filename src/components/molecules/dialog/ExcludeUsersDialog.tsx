import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Table, { CellParam as HeadCellParam } from "@components/molecules/Table";
import TableHead from "@components/molecules/TableHead";
import deepEqual from "fast-deep-equal";

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    root: {
      overflowX: "auto"
    },
    title: {
      padding: "14px 32px"
    },
    content: {
      width: 540,
      marginTop: spacing.unit * 2,
      padding: "0px",
      // スクロールバーのデザイン対応のため（Googole Chromeのみの適用）
      "&::-webkit-scrollbar": {
        display: "none"
      }
    },
    allCheck: {
      margin: "0px 32px 8px 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    allCheckLabel: {
      paddingLeft: 16
    },
    table: {
      width: "100%",
      minWidth: 540
    },
    checkbox: {
      padding: 0,
      height: 24
    },
    tableContent: {
      backgroundColor: palette.common.white
    },
    row: {
      "&:nth-of-type(even)": {
        backgroundColor: "#eceff1"
      }
    },
    cellStyle: {
      padding: spacing.unit,
      borderBottom: "none"
    },
    checkboxCellStyle: {
      width: 50,
      padding: "0px 0px 0px 32px",
      border: "none"
    },
    cellNumber: {
      width: 139,
      height: 24,
      color: "rgba(0, 0, 0, 0.87)",
      padding: "0 0 0 16px",
      border: "none",
      fontSize: "16px",
      boxSizing: "content-box"
    },
    cellUsers: {
      width: "auto",
      height: 24,
      color: "rgba(0, 0, 0, 0.87)",
      padding: "0 0 0 16px",
      borderRight: "solid 1px",
      borderColor: "rgba(0, 0, 0, 0.12)",
      fontSize: "16px",
      borderBottom: "none"
    },
    border: {
      padding: "8px 0px",
      color: "rgba(0, 0, 0, 0.12)",
      borderTop: "solid 2px",
      margin: "0px"
    },
    labelNumber: {
      fontSize: 14,
      padding: "0 0 0 16px",
      width: 139,
      boxSizing: "content-box"
    },
    labelUsers: {
      fontSize: 14,
      padding: "0 0 0 16px",
      width: "auto",
      marginLight: 16,
      textAlign: "left"
    },
    labelCheckbox: {
      fontSize: 14,
      width: 56,
      paddingLeft: 32
    },
    scroll: {
      overflowY: "auto",
      overflowX: "hidden",
      height: 441,
      // スクロールバーのデザイン対応のため（Googole Chromeのみの適用）
      "&::-webkit-scrollbar": {
        display: "none",
        width: 12
      },
      "&::-webkit-scrollbar-track": {
        background: "#fff",
        border: "none",
        boxShadow: "inset 0 0 2px #777"
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#aaa",
        borderRadius: 10,
        boxShadow: "none"
      }
    },
    cancelButton: {
      width: 125,
      border: "solid 1px #cccccc"
    },
    submitButton: {
      width: 125,
      marginRight: 32,
      boxShadow: "none",
      "&:active": {
        boxShadow: "none"
      }
    },
    fraction: {
      fontSize: "12px"
    },
    fractionLabel: {
      margin: "0 2px"
    },
    facility: {
      "& > tr:nth-of-type(even)": {
        backgroundColor: "rgba(0, 0, 0, 0)"
      }
    },
    facilityName: {
      backgroundColor: "#eceff1",
      padding: "4px 40px"
    }
  });

interface OwnProps {
  labelId?: string;
  shouldDisabledNoUser?: boolean; // 全ユーザー除去を許可するか
  title: string;
  open: boolean;
  excludedUserIds: number[];
  users: {
    id: string | number;
    recipientNumber: string;
    name: string;
  }[];
  onSubmit: (excludedUserIds: number[]) => void;
  onClose: () => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

interface State {
  initialExcludedUserIds: number[]; // 最後に確定された値の保持
  excludedUserIds: number[]; // 現在のチェックボックスの状態
}

class ExcludeUsersDialog extends React.Component<Props, State> {
  static get defaultProps(): object {
    return { shouldDisabledNoUser: true };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      initialExcludedUserIds: props.excludedUserIds,
      excludedUserIds: props.excludedUserIds
    };
  }

  /**
   * propsのidsと初期値のidsが一致しない => 親がidsを変更したらリセット
   */
  public componentDidUpdate(): void {
    const { excludedUserIds } = this.props;
    const { initialExcludedUserIds } = this.state;
    const hasChangedOwnIds = !deepEqual(
      excludedUserIds,
      initialExcludedUserIds
    );
    if (hasChangedOwnIds) {
      this.resetExcludedUserIds(excludedUserIds);
    }
  }

  private resetExcludedUserIds = (excludedUserIds: number[]): void => {
    this.setState({
      initialExcludedUserIds: excludedUserIds,
      excludedUserIds
    });
  };

  private dialogHeaderData = (classes: {
    labelCheckbox: string;
    labelNumber: string;
    labelUsers: string;
  }): HeadCellParam[] => {
    return [
      {
        className: classes.labelCheckbox,
        align: "left",
        label: ""
      },
      {
        className: classes.labelNumber,
        align: "left",
        label: "受給者番号"
      },
      {
        className: classes.labelUsers,
        align: "left",
        label: "利用者名"
      }
    ];
  };

  private dialogContentData = (): JSX.Element[] => {
    const { users, classes } = this.props;
    if (!users) return [];
    const { checkbox } = classes;
    const { excludedUserIds } = this.state;

    return users.map((user) => {
      const isChecked = !excludedUserIds.includes(+user.id);
      return (
        <TableRow
          className={classes.row}
          role="checkbox"
          aria-checked
          tabIndex={-1}
          key={`invoice-excluded-user-${user.id}`}
        >
          <TableCell
            key={`${user.id}-invoice-excluded-user-id}`}
            align="left"
            className={classes.checkboxCellStyle}
          >
            <Checkbox
              checked={isChecked}
              onChange={this.onChangeExcludedUser}
              value={`${user.id}`}
              className={checkbox}
            />
          </TableCell>
          <TableCell
            key={`${user.id}-invoice-excluded-user-recipientNumber}`}
            align="left"
            className={classes.cellNumber}
          >
            {user.recipientNumber}
          </TableCell>
          <TableCell
            key={`${user.id}-invoice-excluded-user-name}`}
            align="left"
            className={classes.cellUsers}
          >
            {user.name}
          </TableCell>
        </TableRow>
      );
    });
  };

  /**
   * 初期値に反映して親に渡したら終了
   */
  private handleOnSubmit = (): void => {
    const { onSubmit, onClose } = this.props;
    const { excludedUserIds } = this.state;
    this.setState({ initialExcludedUserIds: excludedUserIds });
    onSubmit(excludedUserIds);
    onClose();
  };

  /**
   * 初期値に戻してから終了
   */
  private handleOnClose = (): void => {
    const { onClose } = this.props;
    const { initialExcludedUserIds } = this.state;
    this.setState({ excludedUserIds: initialExcludedUserIds });
    onClose();
  };

  private onChangeExcludedUser = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { excludedUserIds } = this.state;

    const id = +event.target.value;
    const tmpExcludedIds = excludedUserIds.filter((x) => x !== id);
    // idの除外後のlengthが変わっていなければ追加
    const newExcludedUserIds =
      tmpExcludedIds.length === excludedUserIds.length
        ? [...excludedUserIds, id]
        : tmpExcludedIds;
    this.setState({ excludedUserIds: newExcludedUserIds });
  };

  private onChangeAllExcludedUser = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { users } = this.props;
    let excludedUserIds: number[] = [];
    if (!event.target.checked) {
      excludedUserIds = users.map((user) => +user.id);
    }
    this.setState({ excludedUserIds });
  };

  public render(): JSX.Element {
    const {
      classes,
      users,
      open,
      labelId,
      title,
      shouldDisabledNoUser
    } = this.props;
    const { excludedUserIds } = this.state;

    const facilityTypes = Object.keys(users);
    const rows = this.dialogContentData();
    const excludedUserCount = excludedUserIds.length;
    const userCount = rows.length;
    const disableSubmit =
      shouldDisabledNoUser && excludedUserCount === userCount;

    return (
      <Dialog
        open={open}
        onClose={this.handleOnClose}
        className={classes.root}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id={labelId} className={classes.title}>
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.content}>
          <div className={classes.allCheck}>
            <div>
              <Checkbox
                checked={excludedUserCount === 0}
                indeterminate={
                  excludedUserCount > 0 && excludedUserCount < userCount
                }
                value={facilityTypes[0]}
                onChange={this.onChangeAllExcludedUser}
                className={classes.checkbox}
              />
              <span className={classes.allCheckLabel}>すべて選択</span>
            </div>
            <span className={classes.fraction}>
              <span className={classes.fractionLabel}>
                {userCount - excludedUserCount}
              </span>
              <span className={classes.fractionLabel}>/</span>
              <span className={classes.fractionLabel}>{userCount}</span>
              <span>名</span>
            </span>
          </div>
          <div>
            <Table
              className={classes.table}
              key="invoice-excluded-users-table-head"
            >
              <TableHead
                role="checkbox"
                ariaChecked
                tabIndex={-1}
                key={1}
                selected
                items={this.dialogHeaderData(classes)}
                rowStyle={{ height: 32 }}
              />
            </Table>
          </div>
          <div className={classes.scroll}>
            <Table key="invoice-excluded-users-table" className={classes.table}>
              <TableBody>{rows}</TableBody>
            </Table>
          </div>
        </DialogContent>
        <DialogActions className={classes.border}>
          <div>
            <Button
              className={classes.cancelButton}
              onClick={this.handleOnClose}
              autoFocus={false}
              color="secondary"
              variant="text"
            >
              キャンセル
            </Button>
          </div>
          <Button
            disabled={disableSubmit}
            className={classes.submitButton}
            onClick={this.handleOnSubmit}
            autoFocus
            color="secondary"
            variant="contained"
          >
            保存する
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ExcludeUsersDialog);
