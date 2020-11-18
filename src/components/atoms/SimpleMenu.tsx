import * as React from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Button from "@material-ui/core/Button";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    loot: {
      color: "#fff",
      padding: "8px 26px 8px 0",
      textTransform: "none"
    },
    menu: {
      top: 48
    }
  });

interface OwnProps {
  label: string;
  menuLabel: string;
  menuSelect: () => void;
}

interface State {
  anchorEl: any;
  isOpen: boolean;
}

const initialState: State = {
  anchorEl: null,
  isOpen: false
};

interface Props extends WithStyles<typeof styles>, OwnProps {}

class SimpleMenu extends React.Component<Props, State> {
  public readonly state: State = initialState;
  public render() {
    return (
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
          className={this.props.classes.loot}
        >
          {this.props.label}
          <KeyboardArrowDown />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.isOpen}
          onClose={this.handleClose}
          className={this.props.classes.menu}
        >
          <MenuItem onClick={this.menuSelect}>{this.props.menuLabel}</MenuItem>
        </Menu>
      </div>
    );
  }
  private handleClick = (event: any) => {
    this.setState({
      anchorEl: event.currentTarget,
      isOpen: true
    });
  };

  private handleClose = () => {
    this.setState({
      anchorEl: null,
      isOpen: false
    });
  };

  private menuSelect = () => {
    this.props.menuSelect();
  };
}

export default withStyles(styles)(SimpleMenu);
