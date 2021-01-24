import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ATTENDANCE_BOX_SHADOW } from "@constants/styles";

const styles = (): StyleRules =>
  createStyles({
    button: {
      width: "100%",
      minWidth: 180,
      height: 56,
      fontSize: 22,
      boxShadow: ATTENDANCE_BOX_SHADOW
    },
    before: {
      backgroundColor: "#fff",
      color: "#333",
      "&:hover": {
        backgroundColor: "#fff"
      }
    },
    working: {
      backgroundColor: "#50aab4",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#50aab4"
      }
    },
    after: {
      backgroundColor: "#f5cd00",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#f5cd00"
      }
    },
    label: {
      display: "block",
      textAlign: "center",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden"
    }
  });

interface OwnProps {
  name: string;
  id: number;
  type: "before" | "working" | "after";
  kana: string;
  handleClick: (id: number, kana: string) => void;
}

interface Props extends WithStyles<typeof styles>, OwnProps {}

class AttendanceButton extends React.Component<Props> {
  private onclick = (): void => {
    this.props.handleClick(this.props.id, this.props.kana);
  };

  public render(): JSX.Element {
    return (
      <Button
        variant="contained"
        onClick={this.onclick}
        color="secondary"
        className={this.props.classes.button}
        classes={{
          root: this.props.classes[this.props.type],
          label: this.props.classes.label
        }}
      >
        {this.props.name}
      </Button>
    );
  }
}

export default withStyles(styles)(AttendanceButton);
