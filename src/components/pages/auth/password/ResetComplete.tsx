import * as React from "react";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Paper from "@material-ui/core/Paper";
import AuthTemplate from "@components/templates/AuthTemplate";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    body: {
      backgroundColor: "#F3F6F6"
    },
    paper: {
      margin: "0 auto",
      maxWidth: 640,
      marginTop: 40,
      textAlign: "left"
    },
    wrapper: {
      padding: spacing.unit * 4
    }
  });

interface Props extends WithStyles<typeof styles> {}

/**
 * パスワード変更 完了
 */
class ResetComplete extends React.Component<Props> {
  public render() {
    return (
      <AuthTemplate>
        <Paper className={this.props.classes.paper}>
          <div className={this.props.classes.wrapper} />
        </Paper>
      </AuthTemplate>
    );
  }
}

export default withStyles(styles)(ResetComplete);
