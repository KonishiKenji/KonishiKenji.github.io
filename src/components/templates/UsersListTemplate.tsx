import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";

import UserList from "@components/organisms/mgr/UserList";
import InvoiceErrorBar from "@components/organisms/mgr/InvoiceErrorBar";

import { createStyles, WithStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Paper from "@material-ui/core/Paper";

import * as errorsDialogActions from "@stores/ui/errorsDialog/actions";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";
import { ErrorsState } from "@stores/domain/errors/types";
import { GetFacilityUsersResponse } from "@api/requests/facility/getFacilityUsers";
import SectionTitle from "@components/atoms/SectionTitle";

import { dateToLocalisedString, getDiff } from "@utils/date";

const styles = ({ spacing }: Theme) =>
  createStyles({
    container: {
      margin: spacing.unit * 2,
      marginTop: 12
    },
    newButtonLink: {
      textDecoration: "none",
      marginLeft: "auto"
    },
    newButton: {
      boxShadow: "none",
      borderRadius: 4,
      width: 120,
      letterSpacing: "2px"
    },
    toolBar: {
      display: "flex",
      justifyContent: "space-between"
    },
    countText: {
      fontSize: 12,
      letterSpacing: "2px"
    },
    paperContainer: {
      paddingTop: "30px",
      paddingBottom: "32px",
      paddingLeft: "32px",
      paddingRight: "32px",
      marginTop: 20
    }
  });

interface DispatchProps {
  openErrorsDialog: () => void;
}

interface State {
  error: ErrorsState;
}

interface OwnProps {
  user: UserState;
  facilityUsers: GetFacilityUsersResponse["data"];
  clearForm: () => void;
}

interface Props
  extends WithStyles<typeof styles>,
    State,
    OwnProps,
    DispatchProps {}

/**
 * 利用者情報
 */
class Users extends React.Component<Props> {
  public render() {
    const { classes } = this.props;
    const users = this.props.facilityUsers.map(user => {
      /**
       * サービス提供日が現在日より過去の場合のみ、表示用サブテキストを返す
       */
      const getSubText = () => {
        if (!user.date_end_in_service) {
          return "";
        }
        const targetDate = new Date(user.date_end_in_service);
        const endDate = new Date(targetDate.getTime());
        endDate.setDate(endDate.getDate() + 1);

        if (getDiff(new Date(), endDate) <= 0) {
          return "";
        }
        return `サービス提供終了日: ${dateToLocalisedString(
          targetDate,
          "YYYY年M月D日"
        )}`;
      };
      return {
        id: user.uif_id,
        text: user.displayName,
        subtext: getSubText()
      };
    });

    return (
      <>
        {this.props.error.users.hasError ? (
          <InvoiceErrorBar
            message={`${this.props.error.users.errorCount} 件のエラーがあります`}
            onClick={this.onClickErrorDialog}
          />
        ) : null}
        <div className={classes.container}>
          <div className={classes.toolBar}>
            <Link to="users/new" className={classes.newButtonLink}>
              <Button
                color="secondary"
                variant="contained"
                className={classes.newButton}
                onClick={this.clearForm}
              >
                新規登録
              </Button>
            </Link>
          </div>
          <Paper elevation={0} className={classes.paperContainer}>
            <SectionTitle
              label={"利用者リスト"}
              subLabel={`全${this.props.facilityUsers.length}件`}
              subClassName={classes.countText}
              isTitleNoMargin={true}
            />
            <UserList users={users} userError={this.props.error.users} />
          </Paper>
        </div>
      </>
    );
  }

  private onClickErrorDialog = () => {
    this.props.openErrorsDialog();
  };

  private clearForm = () => {
    this.props.clearForm();
  };
}

const mapStateToProps = (state: AppState): State => ({
  error: state.errors
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openErrorsDialog: () => dispatch(errorsDialogActions.showErrorsDialog())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Users));
