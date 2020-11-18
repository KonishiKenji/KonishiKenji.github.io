/**
 * 業務支援管理者ページのドロワー(Menu)
 */
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as ClassNames from "classnames";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";
import { ErrorsState } from "@stores/domain/errors/types";
import { createStyles, WithStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles, Theme, StyleRules } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { DRAWER_WIDTH, DRAWER_WIDTH_MIN, DARK_BLUE } from "@constants/styles";
import { FacilityType } from "@constants/variables";
import MENU_ITEM_LIST_G from "@constants/mgr/GroupHome/menu";
import MENU_ITEM_LIST_IAB from "@constants/mgr/IAB/menu";
import MENU_ITEM_LIST_SEIKATSUKAIGO from "@constants/mgr/SEIKATSUKAIGO/menu";
import MENU_ITEM_LIST_SHUROTEICHAKU from "@constants/mgr/SHUROTEICHAKU/menu";
import MENU_ITEM_LIST_JIRITSUKUNRENSEIKATSU from "@constants/mgr/JIRITSUKUNRENSEIKATSU/menu";
import MENU_ITEM_LIST_TANKINYUSHO from "@constants/mgr/TANKINYUSHO/menu";
import MENU_ITEM_LIST_SHISETSUNYUSHO from "@constants/mgr/SHISETSUNYUSHO/menu";
import { MenuItemList } from "@constants/menu";
import knowbeLogoSmall from "@images/knowbe-logo-small.png";
import DrawerList from "@components/molecules/DrawerList";
import KnowbeMgrLogo from "@components/atoms/KnowbeMgrLogo";

const styles = (theme: Theme): StyleRules =>
  createStyles({
    drawerWrapper: {
      flexShrink: 0
    },
    drawerPaper: {
      backgroundColor: DARK_BLUE
    },
    drawerOpen: {
      width: DRAWER_WIDTH,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      width: DRAWER_WIDTH_MIN,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    drawerOpenerBar: {
      width: DRAWER_WIDTH_MIN,
      height: "100vh",
      backgroundColor: "#37474F",
      position: "fixed",
      top: 0
    },
    iconWrapper: {
      display: "contents",
      height: "100%",
      cursor: "pointer",
      position: "relative"
    },
    chevronIcon: {
      width: 24,
      height: 24,
      margin: "-12px 0 0 -12px",
      color: "#fff",
      position: "absolute",
      top: "50%",
      left: "50%",
      cursor: "pointer"
    },
    logoSpacing: {
      padding: "10px 10px 0"
    },
    userCompanyName: {
      padding: 0,
      borderRadius: 0,
      color: "#fff"
    },
    nameSpaceWrap: {
      display: "flex",
      width: DRAWER_WIDTH,
      padding: "4px 0 4px 10px",
      boxSizing: "border-box",
      justifyContent: "center",
      alignItems: "flex-end"
    },
    nameSpaceName: {
      textAlign: "left",
      flexGrow: 1,
      overflow: "hidden"
    },
    nameSpaceIcon: {
      width: 40
    },
    companyName: {
      color: "#ccc",
      fontSize: 12,
      lineHeight: 2,
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap"
    },
    officeName: {
      fontSize: 16,
      lineHeight: 2,
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap"
    },
    logoutIcon: {
      fontSize: 18
    },
    knowbeSmallLogo: {
      width: 45,
      height: 45,
      position: "absolute",
      top: 4,
      left: 6
    },
    list: {
      width: DRAWER_WIDTH
    }
  });

const initState = {
  anchorEl: null,
  itemList: []
};

interface StateProps {
  featureGroup: UserState["featureGroup"];
  facility_name: string;
  facility_type: string;
  business_owner: string;
  errorsSummary: ErrorsState["summary"];
  isSupport: boolean;
  needsStopHistory: boolean;
}

interface OwnProps {
  container: React.Component;
  isOpen: boolean;
  toggleDrawer: () => void;
}

interface DispatchProps {
  handleLogout: () => void;
  fetchErrorsSummary: () => void;
}

interface MergeProps extends StateProps, DispatchProps, OwnProps {
  itemList: MenuItemList;
}

interface State {
  anchorEl: HTMLElement | null;
}

interface Props
  extends RouteComponentProps,
    MergeProps,
    WithStyles<typeof styles> {}

class MgrDrawer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initState;
  }

  public componentDidMount(): void {
    this.props.fetchErrorsSummary();
  }

  private handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleClose = (): void => {
    this.setState({ anchorEl: null });
  };

  private handleLogout = (): void => {
    this.setState({ anchorEl: null });
    this.props.handleLogout();
  };

  private handleAccount = (): void => {
    this.props.history.push("/account/update");
  };

  private handleSupport = (): void => {
    this.props.history.push("/customer-support/facility");
  };

  public render(): JSX.Element {
    const { classes, isOpen } = this.props;
    const { anchorEl } = this.state;
    const open = !!anchorEl;

    return (
      <nav
        className={ClassNames(classes.drawerWrapper, {
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen
        })}
      >
        <Drawer
          container={this.props.container}
          variant="persistent"
          anchor="left"
          open={this.props.isOpen}
          onClose={this.props.toggleDrawer}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <div className={classes.logoSpacing}>
            <KnowbeMgrLogo />
          </div>
          <IconButton
            color="inherit"
            aria-owns={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            disableRipple
            disableTouchRipple
            classes={{ root: classes.userCompanyName }}
          >
            <div className={classes.nameSpaceWrap}>
              <div className={classes.nameSpaceName}>
                <div className={classes.companyName}>
                  {this.props.business_owner}
                </div>
                <div className={classes.officeName}>
                  {this.props.facility_name}
                </div>
              </div>
              <div className={classes.nameSpaceIcon}>
                <ExitToApp className={classes.logoutIcon} />
              </div>
            </div>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            getContentAnchorEl={null}
          >
            {this.props.isSupport ? (
              <MenuItem onClick={this.handleSupport}>施設切替</MenuItem>
            ) : null}
            <MenuItem onClick={this.handleAccount}>アカウント情報</MenuItem>
            <MenuItem onClick={this.handleLogout}>ログアウト</MenuItem>
          </Menu>
          <div className={classes.list}>
            <DrawerList
              list={this.props.itemList}
              featureGroup={this.props.featureGroup}
              needsStopHistory={this.props.needsStopHistory}
            />
          </div>
        </Drawer>
        <div className={classes.drawerOpenerBar}>
          <button
            type="button"
            className={classes.iconWrapper}
            onClick={this.props.toggleDrawer}
          >
            <img
              src={knowbeLogoSmall}
              className={classes.knowbeSmallLogo}
              alt="https://knowbe.jp/"
            />
            <ChevronRight className={classes.chevronIcon} />
          </button>
        </div>
      </nav>
    );
  }
}

/**
 * 事業所タイプによるメニューの出しわけとエラーの埋め込みを行う
 */
const getMenuList = (props: StateProps): MenuItemList => {
  const baseMenuList = ((): MenuItemList => {
    switch (props.facility_type) {
      case FacilityType.A:
      case FacilityType.B:
      case FacilityType.IKOU:
        return MENU_ITEM_LIST_IAB;
      case FacilityType.GROUP_HOME:
        return MENU_ITEM_LIST_G;
      case FacilityType.SEIKATSUKAIGO:
        return MENU_ITEM_LIST_SEIKATSUKAIGO;
      case FacilityType.SHUROTEICHAKU:
        return MENU_ITEM_LIST_SHUROTEICHAKU;
      case FacilityType.JIRITSUKUNRENSEIKATSU:
        return MENU_ITEM_LIST_JIRITSUKUNRENSEIKATSU;
      case FacilityType.TANKINYUSHO:
        return MENU_ITEM_LIST_TANKINYUSHO;
      case FacilityType.SHISETSUNYUSHO:
        return MENU_ITEM_LIST_SHISETSUNYUSHO;
      default:
        return [];
    }
  })();
  const menuList = baseMenuList.map((target) => {
    let isError: boolean;
    // errorsSummaryから対応するkeyのエラーがあるか確認
    const resultChildren = target.children
      ? target.children.map((child) => {
          isError =
            child.key &&
            Object.prototype.hasOwnProperty.call(props.errorsSummary, child.key)
              ? props.errorsSummary[child.key].hasError
              : false;
          return { ...child, isError };
        })
      : [];
    // 子にエラーがあるか
    isError = target.children
      ? resultChildren.some((child) => child.isError)
      : false;
    return {
      ...target,
      isError,
      children: resultChildren
    };
  });
  return menuList;
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { authDispatch, errorsDispatcher } = dispatches;
  return {
    handleLogout: authDispatch(dispatch).logout,
    fetchErrorsSummary: errorsDispatcher(dispatch).summary
  };
};

const mapStateToProps = (state: AppState): StateProps => {
  const user = state.user as UserState;

  return {
    featureGroup: user.featureGroup,
    facility_name: user.facility_name || "",
    facility_type: user.facility_type || "",
    business_owner: user.business_owner || "",
    errorsSummary: state.errors.summary,
    isSupport: user.isSupport,
    needsStopHistory: state.ui.needsStopHistory
  };
};

const mergeProps = (
  stateProps: StateProps,

  dispatchProps: DispatchProps,
  ownProps: OwnProps
): MergeProps => {
  return {
    itemList: getMenuList(stateProps),
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(withStyles(styles)(MgrDrawer))
);
