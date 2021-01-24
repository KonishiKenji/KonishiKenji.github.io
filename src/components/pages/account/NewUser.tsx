import * as React from "react";
import * as queryString from "query-string";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { GetURLValidityResult } from "@stores/domain/account/type";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { RouteComponentProps, Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import AuthTemplate from "@components/templates/AuthTemplate";
import NewAccountForm from "@components/organisms/account/NewAccountForm";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    header: {
      margin: 0,
      padding: "24px 32px 9px",
      borderBottom: "1px solid #cfd8dc",
      fontSize: 24,
      color: "#37474f"
    },
    company: {
      padding: 32,
      display: "flex"
    },
    companyWrapper: {
      width: "50%"
    },
    section: {
      padding: 32
    },
    title: {
      margin: "0 0 32px 0",
      paddingBottom: 7,
      borderBottom: "1px solid rgba(0, 0, 0, 0.54)",
      fontSize: 20,
      color: "#37474f",
      fontWeight: "bold"
    },
    categoryType: {
      fontSize: 12,
      color: "#37474f",
      marginBottom: 4
    },
    categoryText: {
      fontSize: 16,
      color: "rgba(0, 0, 0, 0.87)",
      margin: 0
    },
    expiredText: {
      fontSize: 16,
      color: "rgba(0, 0, 0, 0.87)",
      textAlign: "center"
    }
  });

interface StateProps {
  account: GetURLValidityResult;
}
interface State {
  status: number;
}

interface DispatchProps {
  checkActivateValidity: (email: string, token: string) => void;
}

type Props = RouteComponentProps &
  DispatchProps &
  StateProps &
  WithStyles<typeof styles>;

/**
 * アカウント情報の登録
 */
class Account extends React.Component<Props, State> {
  public componentDidMount() {
    const queryParam = queryString.parse(this.props.location.search);
    const email = Array.isArray(queryParam.a) ? queryParam.a[0] : queryParam.a;
    const token = Array.isArray(queryParam.b) ? queryParam.b[0] : queryParam.b;
    this.props.checkActivateValidity(email, token);
  }

  public render() {
    const queryParam = queryString.parse(this.props.location.search);
    // 新規登録時に必要なデータが存在しない場合はログイン画面にリダイレクト
    if (!queryParam.a || !queryParam.b || !queryParam.c || !queryParam.d) {
      return <Redirect to="/login" />;
    }
    const email = Array.isArray(queryParam.a) ? queryParam.a[0] : queryParam.a;
    const token = Array.isArray(queryParam.b) ? queryParam.b[0] : queryParam.b;
    const isTimeCardAccountCreate =
      queryParam.e !== null
        ? Array.isArray(queryParam.e)
          ? queryParam.e[0] !== ""
          : queryParam.e !== ""
        : true; // 2019/12/24リリース以前に送信された新規登録メールには"e"が存在しないパターンがあった

    return (
      <AuthTemplate>
        {this.props.account.status === 0 && (
          <Paper>
            <h1 className={this.props.classes.header}>新規ユーザ登録</h1>
            <section className={this.props.classes.company}>
              <div className={this.props.classes.companyWrapper}>
                <p className={this.props.classes.categoryType}>法人名</p>
                <p className={this.props.classes.categoryText}>
                  {queryParam.c}
                </p>
              </div>
              <div className={this.props.classes.companyWrapper}>
                <p className={this.props.classes.categoryType}>事業所名</p>
                <p className={this.props.classes.categoryText}>
                  {queryParam.d}
                </p>
              </div>
            </section>
            <section className={this.props.classes.section}>
              <NewAccountForm
                history={this.props.history}
                email={email}
                token={token}
                isTimeCardAccountCreate={isTimeCardAccountCreate}
              />
            </section>
          </Paper>
        )}
        {this.props.account.status && this.props.account.status !== 0 ? (
          <div className={this.props.classes.expiredText}>
            このリンクは有効ではありません
          </div>
        ) : (
          ""
        )}
      </AuthTemplate>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { accountDispatch } = dispatches;
  const accountDispatches = accountDispatch(dispatch);
  return {
    checkActivateValidity: (email: string, token: string) =>
      accountDispatches.checkActivateValidity(email, token)
  };
};

const mapStateToProps = (state: StateProps): StateProps => ({
  account: state.account
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Account));
