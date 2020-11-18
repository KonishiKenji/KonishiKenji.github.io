import * as React from "react";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = ({ palette }: Theme) =>
  createStyles({
    wrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    label: {
      margin: 0,
      fontSize: 12,
      lineHeight: 1.33,
      letterSpacing: 0.4,
      color: "#37474f"
    },
    currentPassword: {
      margin: "8px 0 0",
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: 0.5,
      color: "rgba(0, 0, 0, 0.87)",
      fontWeight: 600
    },
    button: {
      width: 160,
      boxShadow: "none",
      textTransform: "none"
    }
  });

interface OwnProps {
  onClick: () => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const AccountMail: React.FunctionComponent<Props> = ({ onClick, classes }) => (
  <div className={classes.wrapper}>
    <div>
      <p className={classes.label}>
        現在のパスワード（セキュリティ保護のため表示していません）
      </p>
      <p className={classes.currentPassword}>･･････････</p>
    </div>
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      onClick={onClick}
    >
      変更する
    </Button>
  </div>
);

export default withStyles(styles)(AccountMail);
