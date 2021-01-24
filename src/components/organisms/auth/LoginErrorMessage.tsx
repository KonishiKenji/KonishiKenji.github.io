import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import { Lockout, UnLock } from "@stores/auth/type";

const styles = createStyles({
  errorText: {
    marginBottom: 32,
    fontSize: 12,
    textAlign: "center",
    color: "#f44336"
  }
});

interface OwnProps {
  lockout: Lockout;
  unlock: UnLock;
}
type Props = OwnProps & WithStyles<typeof styles>;

const LoginErrorMessage: React.FunctionComponent<Props> = ({
  lockout,
  unlock,
  classes
}) => {
  let message;
  if (lockout && lockout.count === lockout.limit && unlock) {
    message = (
      <>
        ログインに{lockout.count}回失敗したため、現在はログインできません。
        <br />
        {unlock.time}分後に再度お試しください。
      </>
    );
  } else if (lockout && lockout.count >= 5) {
    message = (
      <>
        ログインに {lockout.count}回 失敗しました。
        <br />
        {lockout.limit}
        回ログインに失敗すると、10分間ログインできなくなりますのでご注意ください。
      </>
    );
  } else {
    message = <>ログインに失敗しました。</>;
  }
  return <p className={classes.errorText}>{message}</p>;
};

export default withStyles(styles)(LoginErrorMessage);
