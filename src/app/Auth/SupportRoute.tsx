import * as React from "react";
import { Route, RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import { UserState } from "@stores/domain/user/type";
import { AppState } from "@stores/type";
import NoMatch from "@components/pages/error/NoMatch";

interface StateProps {
  user: UserState;
}
type Props = StateProps & RouteProps;

/**
 * サポートだけ表示
 */
const SupportRoute: React.FunctionComponent<Props> = ({ user, ...props }) => {
  if (!user.done) {
    return <div />;
  }

  return user.role === "mgrsupport" ? (
    <Route {...props} />
  ) : (
    <Route path={props.path} component={NoMatch} />
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  user: state.user
});

export default connect(mapStateToProps)(SupportRoute);
