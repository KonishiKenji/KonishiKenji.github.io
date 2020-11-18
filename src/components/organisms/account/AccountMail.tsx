import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import { connect } from "react-redux";
import CurrentAccountName from "@components/organisms/account/CurrentAccountName";
// import AccountMailForm from "@components/organisms/mgr/common/Account/AccountMailForm";
import { FacilityUser } from "@stores/domain/account/type";

const styles = () => createStyles({});

interface StateProps {
  admin: FacilityUser;
}
type Props = StateProps & WithStyles<typeof styles>;

class AccountMail extends React.Component<Props> {
  public render() {
    return (
      <>
        <CurrentAccountName
          label="現在のメールアドレス"
          account={this.props.admin.email}
        />
      </>
    );
  }
}

const mapStateToProps = (state: any): StateProps => ({
  admin: state.account.admin
});

export default withStyles(styles)(
  connect<StateProps>(mapStateToProps)(AccountMail)
);
