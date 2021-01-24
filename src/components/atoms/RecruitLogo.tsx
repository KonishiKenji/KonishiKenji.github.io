import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import icon_footer_knowbePng from "@images/icon_footer_knowbe.png";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    knowbeLogoFooter: {
      position: "relative",
      padding: 0,
      width: 216,
      height: 28
    }
  });

interface Props extends WithStyles<typeof styles> {}

const recruitIcon: React.FunctionComponent<Props> = props => (
  <img
    src={icon_footer_knowbePng}
    className={props.classes.knowbeLogoFooter}
    alt="https://www.recruit.co.jp/company/recruitcoltd/"
  />
);

export default withStyles(styles)(recruitIcon);
