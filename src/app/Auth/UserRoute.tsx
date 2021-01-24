import * as React from "react";
import { Route, RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import { UserState } from "@stores/domain/user/type";
import { AppState } from "@stores/type";
import NoMatch from "@components/pages/error/NoMatch";

interface OwnProps {
  groupInvoiceCheck?: boolean;
}
interface StateProps {
  user: UserState;
}
type Props = OwnProps & StateProps & RouteProps;

/**
 * Admin権限者かサポートだけ表示
 */
const UserRoute: React.FunctionComponent<Props> = ({
  user,
  groupInvoiceCheck,
  ...props
}) => {
  if (!user.done) {
    return <div />;
  }

  // TODO: プランによって表示わけしているらしいが現状ちゃんと作ってあるかは不明なので見直す
  const downloadPermission = groupInvoiceCheck
    ? user.featureGroup.group_invoice === 1
    : true;
  return user.role === "mgruser" || (user.isSupport && downloadPermission) ? (
    <Route {...props} />
  ) : (
    <Route path={props.path} component={NoMatch} />
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  user: state.user
});

export default connect(mapStateToProps)(UserRoute);
