import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import ContentHeaderSubmit from "@components/molecules/ContentHeaderSubmit";
import ContentHeader from "@components/organisms/mgr/ContentHeader";
import { STICKY_BOX_SHADOW, STICKY_NONE_BOX_SHADOW } from "@constants/styles";
import ClassNames from "classnames";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      border: "none",
      height: 300
    },
    noPrint: {},
    wrap: {
      width: "100%"
    },
    "@media print": {
      noPrint: {
        display: "none"
      }
    },
    header: {
      zIndex: 10,
      position: "sticky",
      top: 0
    }
  });
interface Props extends RouteComponentProps, WithStyles<typeof styles> {}

const initialState = {
  height: 300,
  stickyFlg: false
};

type State = Readonly<typeof initialState>;

class PrintPreviewTemplate extends React.Component<Props, State> {
  public readonly state: State = initialState;

  public intervalID: any;

  public unmounted = false;

  public scrollYValue = 48;

  public listenScrollEvent = () => {
    if (this.unmounted) return;
    if (window.scrollY > this.scrollYValue) {
      this.setState({ stickyFlg: true });
    } else {
      this.setState({ stickyFlg: false });
    }
  };

  public componentDidMount() {
    window.addEventListener("scroll", this.listenScrollEvent);
  }

  public componentWillUnmount() {
    this.unmounted = true;
    window.removeEventListener("scroll", this.listenScrollEvent);
  }

  public render() {
    const { classes } = this.props;
    return (
      <>
        <div
          className={ClassNames(
            this.props.classes.header,
            this.props.classes.noPrint
          )}
          style={
            this.state.stickyFlg
              ? { boxShadow: STICKY_BOX_SHADOW }
              : { boxShadow: STICKY_NONE_BOX_SHADOW }
          }
        >
          <ContentHeader>
            <ContentHeaderSubmit
              buttonName="印刷する"
              handleSubmit={this.handleSubmit}
              cancelButtonName="キャンセル"
              handleCancel={this.handleCancel}
            />
          </ContentHeader>
        </div>
        <div className={classes.wrap}>{this.props.children}</div>
      </>
    );
  }

  private handleSubmit = () => {
    window.print();
  };

  private handleCancel = () => {
    this.props.history.goBack();
  };
}

export default withStyles(styles)(PrintPreviewTemplate);
