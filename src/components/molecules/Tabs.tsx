import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import {
  SECONDARY_BACKGROUND_COLOR,
  SECONDARY_LINE_COLOR,
  SECONDARY_BLUE_COLOR
} from "@constants/styles";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    tabs: {
      boxShadow: `0 2px 4px 0 ${SECONDARY_LINE_COLOR}`,
      minHeight: spacing.unit * 4
    },
    tab: {
      minHeight: spacing.unit * 4
    }
  });

export interface TabInfo {
  label: string;
  value: number;
  tabStyle?: React.CSSProperties;
}

interface Props extends WithStyles<typeof styles> {
  tabInfo: TabInfo[];
  handleChange: any;
  selectedTab: number;
  tabsStyle?: React.CSSProperties;
}

const knowbeTabs: React.FunctionComponent<Props> = ({
  classes,
  tabInfo,
  handleChange,
  selectedTab,
  tabsStyle
}) => {
  return (
    <Tabs
      fullWidth={true}
      value={selectedTab}
      onChange={handleChange}
      style={tabsStyle}
      className={classes.tabs}
    >
      {tabInfo.length > 0 &&
        tabInfo.map((item, index) => (
          <Tab
            label={item.label}
            key={`tab_${index}`}
            className={classes.tab}
            style={{
              color: selectedTab === index ? SECONDARY_BLUE_COLOR : "",
              backgroundColor:
                selectedTab === index ? SECONDARY_BACKGROUND_COLOR : "",
              borderBottom:
                selectedTab === index ? `5px solid ${SECONDARY_BLUE_COLOR}` : ""
            }}
          />
        ))}
    </Tabs>
  );
};

export default withStyles(styles)(knowbeTabs);
