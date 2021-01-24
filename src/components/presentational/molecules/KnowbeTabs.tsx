import * as React from "react";

import {
  createStyles,
  WithStyles,
  withStyles,
  StyleRules
} from "@material-ui/core/styles";
import Tabs, { TabsProps } from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import blueGrey from "@material-ui/core/colors/blueGrey";
import lightBlue from "@material-ui/core/colors/lightBlue";

import ClassNames from "classnames";

const SECONDARY_LINE_COLOR = "#757575";

const styles = (): StyleRules =>
  createStyles({
    tabs: {
      minHeight: 40,
      backgroundColor: "white"
    },
    shadow: { boxShadow: `0 2px 4px 0 ${SECONDARY_LINE_COLOR}` },
    lowerShadow: {
      borderTop: `1px solid ${blueGrey[100]}`,
      boxShadow: `0 6px 4px -4px ${SECONDARY_LINE_COLOR}`
    },
    tab: {
      minHeight: 40,
      fontSize: 14,
      color: "#666666",
      letterSpacing: 1.25,
      borderRight: `1px solid ${blueGrey[50]}`,
      "&:last-child": {
        borderRight: "none"
      }
    },
    selected: {
      color: lightBlue[800],
      backgroundColor: "rgba(2, 136, 209, 0.08)"
    },
    hover: {
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.08)"
      }
    }
  });

interface TabInfo {
  label: string;
  value: string;
}

interface Props extends WithStyles<typeof styles> {
  tabInfo: TabInfo[];
  onChange: TabsProps["onChange"];
  value: string;
  disabled?: boolean;
}

const KnowbeTabs: React.FC<Props> = ({
  classes,
  tabInfo,
  onChange,
  value,
  disabled
}) => {
  const tabsShadow = tabInfo.length > 2 ? classes.shadow : classes.lowerShadow;
  return (
    <Tabs
      variant="fullWidth"
      value={value}
      onChange={onChange}
      className={ClassNames(classes.tabs, tabsShadow)}
    >
      {tabInfo.length > 0 &&
        tabInfo.map((item) => {
          const tabStyle =
            value === item.value ? classes.selected : classes.hover;
          return (
            <Tab
              key={`tab_${item.value}`}
              label={item.label}
              value={item.value}
              disabled={disabled}
              className={ClassNames(classes.tab, tabStyle)}
            />
          );
        })}
    </Tabs>
  );
};

export default withStyles(styles)(KnowbeTabs);
