/**
 * 確認用に置いてあるだけ。あとで消す
 */
import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles, StyleRules } from "@material-ui/core/styles";
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

import { DownloadableUser } from "@stores/domain/invoice/type";

// import { FacilityType } from "@constants/variables";

const styles = ({ spacing, palette }: Theme): StyleRules =>
  createStyles({
    root: {
      overflowX: "auto"
    },
    title: {
      padding: "14px 32px"
    },
    content: {
      width: 550,
      marginTop: spacing.unit * 2,
      padding: "0px"
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
      minWidth: 550
    },
    checkbox: {
      padding: 0,
      height: 24
    },
    checkboxAllLabel: {
      marginLeft: 16
    },
    tableContentCheckbox: {
      width: 50,
      backgroundColor: palette.common.white
    },
    tableContentNumber: {
      width: 100,
      backgroundColor: palette.common.white
    },
    tableContent: {
      backgroundColor: palette.common.white
    },
    rowSubHeader: {
      height: 48,
      borderTop: "1px solid white"
    },
    rowSubHeaderCell: {
      backgroundColor: "#eceff1"
    },
    rowOdd: {
      backgroundColor: "#f6f7f8"
    },
    rowEven: {
      backgroundColor: "#ffffff"
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
      overflowY: "scroll",
      overflowX: "hidden",
      height: 530,
      // スクロールバーのデザイン対応のため（Googole Chromeのみの適用）
      "&::-webkit-scrollbar": {
        width: 12
      },
      "&::-webkit-scrollbar-track": {
        background: "#fff",
        border: "none",
        borderRadius: 10,
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
      marginRight: 32
    },
    fraction: {
      fontSize: "12px"
    },
    facility: {
      "& > tr:nth-of-type(even)": {
        backgroundColor: "rgba(0, 0, 0, 0)"
      }
    },
    facilityName: {
      backgroundColor: "#eceff1"
    },
    facilityNameCellBody: {
      margin: "10px 0",
      display: "flex",
      justifyContent: "space-between"
    }
  });

interface Props extends WithStyles<typeof styles> {
  labelId?: string;
  open: boolean;
  describeId?: string;
  onSubmit: () => void;
  onClose: () => void;
  users: { [P in string]: DownloadableUser[] };
  facilityNames: { [P in string]: string };
  isMultipleFacility: boolean;
  isMasterSubordinate: boolean;
  excludedUserIds: number[];

  onChangeExcludedUser: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAllExcludedUser: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAllExcludedUserMultiple: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

class InvoiceExcludedUserDialog extends React.Component<Props> {
  private dialogFacilityData = (
    facilityType: string,
    excludedUserIds: number[]
  ): JSX.Element[] => {
    const users = this.props.users[facilityType];
    const { classes } = this.props;
    let count = 0;
    users.forEach((user) => {
      if (
        excludedUserIds.some((id) => {
          return id === user.id;
        })
      ) {
        count += 1;
      }
    });
    const facilityName = this.props.facilityNames[facilityType];
    if (!facilityName) return [];

    return [
      <TableRow
        className={classes.rowSubHeader}
        role="checkbox"
        aria-checked
        tabIndex={-1}
        key="invoice-excluded-facility"
      >
        <TableCell
          key={"invoice-excluded-facilityName}"}
          className={classes.rowSubHeaderCell}
          colSpan={4}
        >
          <div className={classes.facilityNameCellBody}>
            <div>{facilityName}</div>
            <div>
              <span className={classes.fraction}>
                {`${users.length - count} / ${users.length}名`}
              </span>
            </div>
          </div>
        </TableCell>
      </TableRow>
    ];
  };

  private dialogHeaderData = (): HeadCellParam[] => {
    return [
      {
        className: this.props.classes.labelCheckbox,
        align: "left",
        label: ""
      },
      {
        className: this.props.classes.labelNumber,
        align: "left",
        label: "受給者番号"
      },
      {
        className: this.props.classes.labelUsers,
        align: "left",
        label: "利用者名"
      }
    ];
  };

  private dialogContentData = (facilityType: string): JSX.Element[] => {
    const users = this.props.users[facilityType];
    if (!users) return [];
    const {
      checkbox,
      rowOdd,
      rowEven,
      checkboxCellStyle,
      cellNumber,
      cellUsers
    } = this.props.classes;
    const { excludedUserIds } = this.props;

    return users.map((user, i) => {
      const isChecked = !excludedUserIds.includes(user.id);
      const idx = user.id;
      return (
        <TableRow
          className={i % 2 === 0 ? rowEven : rowOdd}
          role="checkbox"
          aria-checked
          tabIndex={-1}
          key={`invoice-excluded-user-${idx}`}
        >
          <TableCell
            key={`${idx}-invoice-excluded-user-id}`}
            align="left"
            className={checkboxCellStyle}
          >
            <Checkbox
              checked={isChecked}
              onChange={this.props.onChangeExcludedUser}
              value={`${user.id}`}
              className={checkbox}
            />
          </TableCell>
          <TableCell
            key={`${idx}-invoice-excluded-user-recipientNumber}`}
            align="left"
            className={cellNumber}
          >
            {user.recipientNumber}
          </TableCell>
          <TableCell
            key={`${idx}-invoice-excluded-user-naem}`}
            align="left"
            className={cellUsers}
          >
            {user.name}
          </TableCell>
        </TableRow>
      );
    });
  };

  /**
   * 多機能型ではない場合のユーザー選択
   */
  public singleRender(): JSX.Element {
    const { classes } = this.props;

    const facilityTypes = Object.keys(this.props.users);
    const rows = this.dialogContentData(facilityTypes[0]);
    const excludedUserCount = this.props.excludedUserIds.length;
    const userCount = rows.length;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        maxWidth="lg"
        className={classes.root}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id={this.props.labelId} className={classes.title}>
          利用者を選択してください
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
                className={classes.checkbox}
                onChange={this.props.onChangeAllExcludedUser}
              />
              <span className={classes.checkboxAllLabel}>すべて選択</span>
            </div>
            <span className={classes.fraction}>
              {`${userCount - excludedUserCount} / ${userCount}名`}
            </span>
          </div>
          <div>
            <Table key="invoice-excluded-users-table" className={classes.table}>
              <TableHead
                role="checkbox"
                ariaChecked
                tabIndex={-1}
                key={1}
                selected
                items={this.dialogHeaderData()}
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
              onClick={this.props.onClose}
              autoFocus={false}
              color="secondary"
              variant="text"
            >
              キャンセル
            </Button>
          </div>
          <Button
            disabled={excludedUserCount === userCount}
            className={classes.submitButton}
            onClick={this.props.onSubmit}
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

  /**
   * 多機能型の場合のユーザー選択
   */
  public multipleRender(): JSX.Element {
    const { classes } = this.props;

    const facilityTypes = Object.keys(this.props.users);
    // const isMultipleFacility = facilityTypes.length > 1;
    const excludedUserCount = this.props.excludedUserIds.length;
    const { excludedUserIds } = this.props;
    let userCount = 0;
    const rows = facilityTypes.map((facilityType) => {
      const facilityName = this.dialogFacilityData(
        facilityType,
        excludedUserIds
      );
      const userData = this.dialogContentData(facilityType);
      userCount += userData.length;
      return facilityName.concat(userData);
    });

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        maxWidth="lg"
        className={classes.root}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id={this.props.labelId} className={classes.title}>
          利用者を選択してください
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
                className={classes.checkbox}
                onChange={this.props.onChangeAllExcludedUserMultiple}
              />
              <span className={classes.checkboxAllLabel}>すべて選択</span>
            </div>
            <span className={classes.fraction}>
              {`${userCount - excludedUserCount} / ${userCount}名`}
            </span>
          </div>
          <div>
            <Table key="invoice-excluded-users-table" className={classes.table}>
              <TableHead
                role="checkbox"
                ariaChecked
                tabIndex={-1}
                key={1}
                selected
                items={this.dialogHeaderData()}
                rowStyle={{ height: 32 }}
              />
            </Table>
          </div>
          <div className={classes.scroll}>
            <Table key="invoice-excluded-users-table" className={classes.table}>
              <TableBody className={classes.facility}>{rows}</TableBody>
            </Table>
          </div>
        </DialogContent>
        <DialogActions className={classes.border}>
          <Button
            className={classes.cancelButton}
            onClick={this.props.onClose}
            autoFocus={false}
            color="secondary"
            variant="text"
          >
            キャンセル
          </Button>
          <Button
            disabled={excludedUserCount === userCount}
            className={classes.submitButton}
            onClick={this.props.onSubmit}
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

  public render(): JSX.Element {
    if (this.props.isMultipleFacility || this.props.isMasterSubordinate) {
      return this.multipleRender();
    }
    return this.singleRender();
  }
}

export default withStyles(styles)(InvoiceExcludedUserDialog);
