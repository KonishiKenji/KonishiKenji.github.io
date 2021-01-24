import * as React from "react";
import * as classNames from "classnames";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import RecruitLogo from "@components/atoms/RecruitLogo";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    footer: {
      display: "block",
      bottom: 0,
      margin: "12px 0 12px 40px"
    },
    sticky: {
      position: "absolute"
    }
  });

interface Props extends WithStyles<typeof styles> {
  isSticky: boolean;
}

class Footer extends React.Component<Props> {
  public static defaultProps = {
    isSticky: false
  };

  public render() {
    return (
      <footer
        className={classNames(this.props.classes.footer, {
          sticky: this.props.isSticky
        })}
      >
        <a
          href="https://www.recruit.co.jp/company/recruitcoltd/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RecruitLogo />
        </a>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
