import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import knowbemgr_logoPng from "@images/logo_fix_knowbe_logo-wh.png";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    knowbeMgrLogo: {
      width: 85,
      height: 36
    }
  });

interface Props extends WithStyles<typeof styles> {}

const KnowbeMgrIcon: React.FunctionComponent<Props> = props => (
  <img
    src={knowbemgr_logoPng}
    alt="https://knowbe.jp/"
    className={props.classes.knowbeMgrLogo}
  />
);

export default withStyles(styles)(KnowbeMgrIcon);
