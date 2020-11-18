import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      paddingTop: 0
    }
  });

interface Props extends WithStyles<typeof styles> {}

/**
 * 請求書などの印刷用書類ページで利用する空のテンプレート
 */
const previewTemplate: React.SFC<Props> = props => (
  <div className={props.classes.root}>{props.children}</div>
);

export default withStyles(styles)(previewTemplate);
