/**
 * 業務支援管理者ページのドロワー(Menu)
 */
import * as classNames from "classnames";
import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { UserState } from "@stores/domain/user/type";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import blueGrey from "@material-ui/core/colors/blueGrey";
import ErrorIcon from "@material-ui/icons/Error";

import { BASE_PUBLIC_URL } from "@config";
import { MenuItem, MenuItemChild, MenuItemList } from "@constants/menu";

const styles = ({ spacing, palette }: Theme): StyleRules =>
  createStyles({
    currentListItem: {
      paddingLeft: 18,
      paddingRight: 8,
      backgroundColor: blueGrey[900],
      "&:hover": {
        backgroundColor: blueGrey[900]
      }
    },
    listItem: {
      paddingLeft: 18,
      paddingRight: 8,
      "&:hover": {
        backgroundColor: blueGrey[700]
      }
    },
    nested: {
      paddingLeft: 64
    },
    currentIcon: {
      color: "#fff",
      marginRight: 8
    },
    icon: {
      color: palette.primary.contrastText,
      marginRight: 8
    },
    expandLessIcon: {
      color: "#fff"
    },
    rightIcon: {
      color: "#fff",
      padding: spacing.unit / 2
    },
    currentText: {
      fontSize: 16,
      color: "#fff"
    },
    text: {
      fontSize: 16,
      color: palette.primary.contrastText
    },
    alertIconWrap: {
      width: 15,
      height: 15,
      position: "absolute",
      top: 8,
      left: 30,
      lineHeight: "15px",
      "&:before": {
        width: 9,
        height: 9,
        position: "absolute",
        content: "''",
        background: "#fff",
        borderRadius: "100%",
        zIndex: 1,
        top: 3,
        left: 3
      }
    },
    alertIconUpper: {
      width: 15,
      height: 15,
      color: "#ff5656",
      position: "relative",
      zIndex: 2
    },
    childeAlertIconWrap: {
      width: 16,
      height: 16,
      position: "absolute",
      left: 212,
      lineHeight: "16px",
      "&:before": {
        width: 10,
        height: 10,
        position: "absolute",
        content: "''",
        background: "#fff",
        borderRadius: "100%",
        zIndex: 1,
        top: 3,
        left: 3
      }
    },
    childAlertIconUpper: {
      color: "#ff5656",
      position: "relative",
      zIndex: 2,
      width: 16,
      height: 16
    }
  });

interface Props extends WithStyles<typeof styles>, RouteComponentProps {
  list: MenuItemList;
  featureGroup: UserState["featureGroup"];
  needsStopHistory: boolean;
}

interface States {
  openIndex: number;
  isFirst: boolean;
}

const initialState = {
  openIndex: 0,
  isFirst: true
};

export type State = Readonly<typeof initialState>;

class DrawerList extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  public handleOpen = (index: number, isChildOpen: boolean) => (): void => {
    const currentIndex = this.state.openIndex;
    const currentAction = isChildOpen ? this.state.isFirst : false;
    this.setState({ isFirst: false });

    if (currentAction || currentIndex === index) {
      this.setState({ openIndex: 0 });
    } else {
      this.setState({ openIndex: index });
    }
  };

  /**
   * プラン確認のオプションがある時、対応するフラグが有効になっているかを返す
   */
  private checkPlansPermission(item: MenuItem | MenuItemChild): boolean {
    // 請求機能が有効か
    if (item.checkPlanGroupInvoice) {
      return this.props.featureGroup.group_invoice === 1;
    }
    // 記録機能が有効か
    if (item.checkPlanGroupOperationSupport) {
      return this.props.featureGroup.group_operation_support === 1;
    }
    // 作業時間機能が有効か
    if (item.checkPlanGroupLaborCharge) {
      return this.props.featureGroup.group_labor_charge === 1;
    }
    // 全プランで有効な機能
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private linkItem(item: MenuItem | MenuItemChild) {
    const currentItem = item.to === this.props.location.pathname;
    if (item.to !== "" && !currentItem) {
      // マニュアルページはフルパスになっているのでアンカータグを使用。
      if (item.to.startsWith("http")) {
        return (
          props: React.HTMLAttributes<HTMLElement>
        ): React.ReactElement => (
          <a href={item.to} target={item.target} {...props}>
            {props.children}
          </a>
        );
      }

      // 環境ごとのベースURLを補完したものをURLとして使用。
      const toUrl = `${BASE_PUBLIC_URL}/?_page=${item.to.slice(1)}/#${item.to}`;
      return (props: React.HTMLAttributes<HTMLElement>): React.ReactElement => {
        const attrs =
          item.to === "/contact" ? { ...props, target: item.target } : props;
        // aタグのみだとリロードが走って離脱ダイアログが表示されない対策
        return this.props.needsStopHistory ? (
          <Link to={item.to} target={item.target} {...props} />
        ) : (
          <a href={toUrl} {...attrs}>
            {props.children}
          </a>
        );
      };
    }
    return (props: React.HTMLAttributes<HTMLElement>): React.ReactElement => (
      <div {...props} />
    );
  }

  public renderExpand(hasChild: boolean, open: boolean): JSX.Element | null {
    if (!hasChild) return null;

    const { classes } = this.props;
    return open ? (
      <ExpandLess className={classes.expandLessIcon} />
    ) : (
      <ExpandMore className={classes.expandLessIcon} />
    );
  }

  public render(): JSX.Element {
    const { classes } = this.props;

    return (
      <List>
        {this.props.list.map((item, index) => {
          // 表示できるプランかチェック
          const isPermitted = this.checkPlansPermission(item);
          if (!isPermitted) {
            return null;
          }
          const ableChildItems =
            item.children &&
            item.children.filter((child) => this.checkPlansPermission(child));

          let isChildOpen = false;
          if (ableChildItems) {
            isChildOpen = ableChildItems.some((child) => {
              return new RegExp(child.selectedPattern || child.to).test(
                this.props.location.pathname
              );
            });
          }

          const isOpen =
            index === this.state.openIndex ||
            (isChildOpen && this.state.isFirst);
          let currentItem = false;
          if (item.selectedPattern) {
            currentItem = new RegExp(item.selectedPattern).test(
              this.props.location.pathname
            );
          } else {
            currentItem = item.to === this.props.location.pathname;
          }

          const I = item.icon;

          return (
            <li key={item.title}>
              <ListItem
                button
                component={this.linkItem(item)}
                className={
                  currentItem ? classes.currentListItem : classes.listItem
                }
                onClick={this.handleOpen(index, isChildOpen)}
              >
                {item.isError && !isOpen && (
                  <span className={classes.alertIconWrap}>
                    <ErrorIcon className={classes.alertIconUpper} />
                  </span>
                )}
                <ListItemIcon
                  className={currentItem ? classes.currentIcon : classes.icon}
                >
                  <I />
                </ListItemIcon>
                <ListItemText
                  // eslint-disable-next-line prettier/prettier
                  primary={(
                    <Typography
                      variant="body2"
                      className={
                        currentItem ? classes.currentText : classes.text
                      }
                    >
                      {item.title}
                    </Typography>
                    // eslint-disable-next-line prettier/prettier
                  )}
                />
                {this.renderExpand(
                  ableChildItems ? Boolean(ableChildItems.length) : false,
                  isOpen
                )}
              </ListItem>
              {ableChildItems && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {ableChildItems.map((child) => {
                      const currentChildItem = new RegExp(
                        child.selectedPattern || child.to
                      ).test(this.props.location.pathname);
                      const RightIcon = child.rightIcon;
                      return (
                        <li key={child.title}>
                          <ListItem
                            component={this.linkItem(child)}
                            className={classNames(
                              classes.nested,
                              currentChildItem
                                ? classes.currentListItem
                                : classes.listItem
                            )}
                            button
                          >
                            <ListItemText
                              // eslint-disable-next-line prettier/prettier
                              primary={(
                                <Typography
                                  variant="body2"
                                  className={
                                    currentChildItem
                                      ? classes.currentText
                                      : classes.text
                                  }
                                >
                                  {child.title}
                                </Typography>
                                // eslint-disable-next-line prettier/prettier
                              )}
                            />
                            {RightIcon && (
                              <RightIcon className={classes.rightIcon} />
                            )}
                            {child.isError && (
                              <span className={classes.childeAlertIconWrap}>
                                <ErrorIcon
                                  className={classes.childAlertIconUpper}
                                />
                              </span>
                            )}
                          </ListItem>
                        </li>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </li>
          );
        })}
      </List>
    );
  }
}

export default withRouter(withStyles(styles)(DrawerList));
