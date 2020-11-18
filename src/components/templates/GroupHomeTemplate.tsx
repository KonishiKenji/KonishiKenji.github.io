import * as React from "react";

// import DrawerList from "@components/molecules/DrawerList";
import MgrDrawer from "@components/organisms/mgr/Drawer";
import Header from "@components/organisms/mgr/Header";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
// import MailOutline from "@material-ui/icons/MailOutline";
// import OutlineReceiptIcon from "@images/icons/OutlineReceiptIcon";
// import OutlineRestoreIcon from "@images/icons/OutlineRestoreIcon";
// import OutlineSettingsIcon from "@images/icons/OutlineSettingsIcon";
// import * as URL from "@constants/url";

import { DRAWER_WIDTH } from "@constants/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "block"
    },
    list: {
      width: DRAWER_WIDTH
    },
    container: {
      display: "flex"
    },
    mainContents: {
      flexGrow: 1,
      flexBasis: "auto"
    }
  });

// const listItems = [
//   {
//     title: "利用実績",
//     to: URL.REPORT,
//     icon: OutlineRestoreIcon
//   },
//   {
//     title: "請求",
//     to: URL.DOWNLOAD,
//     icon: OutlineReceiptIcon
//   },
//   {
//     title: "設定",
//     icon: OutlineSettingsIcon,
//     to: "",
//     children: [
//       { title: "事業所情報", to: URL.FACILITY },
//       { title: "利用者情報", to: URL.USERS }
//     ]
//   },
//   {
//     title: "お問い合わせ",
//     to: URL.CONTACT,
//     icon: MailOutline
//   }
// ];

interface Props extends WithStyles<typeof styles> {
  pageName: string;
}

const initialState = {
  isOpenDrawer: true
};
export type State = Readonly<typeof initialState>;

class GroupHomeTemplate extends React.Component<Props, State> {
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
          <MgrDrawer
            container={this}
            isOpen={this.state.isOpenDrawer}
            toggleDrawer={this.toggleDrawer}
          >
            <div className={classes.list}>
              {/* プランチェックに伴いfeatureGroupを送る必要があるがこのテンプレート自体どこにも使われていないのでコメントアウト */}
              {/* <DrawerList list={listItems} /> */}
            </div>
          </MgrDrawer>
          <div className={classes.mainContents}>
            <Header
              toggleDrawer={this.toggleDrawer}
              pageName={this.props.pageName}
            />
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(GroupHomeTemplate);
