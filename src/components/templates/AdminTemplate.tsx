import * as React from "react";

import MgrDrawer from "@components/organisms/mgr/Drawer";
import Header from "@components/organisms/mgr/Header";
import Footer from "@components/organisms/mgr/Footer";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "block"
    },
    container: {
      display: "flex"
    },
    wrapperContents: {
      width: "100%"
    },
    mainContents: {
      flexGrow: 1,
      flexBasis: "auto",
      minHeight: "calc(100vh - 152px)" // 100vh - Footer-height（marginTop:80を含む）
    },
    noPrint: {},
    "@media print": {
      noPrint: {
        display: "none"
      }
    }
  });

interface Props extends WithStyles<typeof styles> {
  pageName: string;
  pathList?: { pathName: string; path: string }[];
}

const initialState = {
  isOpenDrawer: true
};
export type State = Readonly<typeof initialState>;

class AdminTemplate extends React.Component<Props, State> {
  public readonly state: State = initialState;

  public toggleDrawer = () => {
    this.setState({
      isOpenDrawer: !this.state.isOpenDrawer
    });
  };

  public render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.noPrint}>
            <MgrDrawer
              container={this}
              isOpen={this.state.isOpenDrawer}
              toggleDrawer={this.toggleDrawer}
            />
          </div>
          <div className={classes.wrapperContents}>
            <div className={classes.mainContents}>
              <div className={classes.noPrint}>
                <Header
                  toggleDrawer={this.toggleDrawer}
                  pageName={this.props.pageName}
                  pathList={this.props.pathList}
                />
              </div>
              {this.props.children}
            </div>
            <div className={classes.noPrint}>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AdminTemplate);
