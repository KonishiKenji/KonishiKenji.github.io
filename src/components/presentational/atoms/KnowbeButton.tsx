import * as React from "react";
import omit from "lodash-es/omit";
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import Button, { ButtonProps } from "@material-ui/core/Button";
import commonColor from "@material-ui/core/colors/common";
import secondaryBlue from "@material-ui/core/colors/lightBlue";
import grey from "@material-ui/core/colors/grey";

// Default
const defaultButtonStyle = {
  minWidth: 120,
  minHeight: 36,
  color: commonColor.white,
  backgroundColor: secondaryBlue[800],
  "&:disabled": {
    color: grey[500],
    backgroundColor: grey[300]
  },
  "&:hover": {
    backgroundColor: secondaryBlue[700]
  },
  "&:active": {
    backgroundColor: "#2b9bd8"
  },
  "& span": {
    minHeight: 16,
    fontSize: 14,
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.14",
    letterSpacing: "1.25px",
    textAlign: "center"
  }
};

// Outline
const outlineButtonStyle = {
  ...defaultButtonStyle,
  color: secondaryBlue[800],
  backgroundColor: "transparent",
  border: `solid 1px ${grey[400]}`,
  "&:disabled": {
    border: `solid 1px ${grey[300]}`,
    color: grey[500]
  },
  "&:hover": {
    // #0288d1
    backgroundColor: "rgba(2, 136, 209, 0.08)"
  },
  "&:active": {
    backgroundColor: "rgba(2, 136, 209, 0.16)"
  },
  "& span": {
    minHeight: 16,
    fontSize: 14,
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.14",
    letterSpacing: "1.25px",
    textAlign: "center"
  }
};

// Outline(白あり)
const outlineWhiteButtonStyle = {
  ...outlineButtonStyle,
  backgroundColor: commonColor.white,
  "&:disabled": {
    border: `solid 1px ${grey[300]}`,
    color: grey[500],
    backgroundColor: commonColor.white
  },
  "&:hover": {
    // テーブルのセルに背景色がある状態でボタンが配置された場合
    // ボタンの背景色にalpha指定をすると透過が効いてセルの背景色も混ざってしまうため、
    // Outlineのhover時の背景色を直接指定する。
    backgroundColor: "#ebf6fb"
  },
  "&:active": {
    backgroundColor: "#d6ecf8"
  }
};

// Text
const textButtonStyle = {
  ...outlineButtonStyle,
  backgroundColor: "transparent",
  border: "none",
  "&:disabled": {
    color: grey[500]
  }
};

// Text Delete
const textDeleteButtonStyle = {
  ...textButtonStyle,
  color: "#b00020",
  "&:hover": {
    // #b00020
    backgroundColor: "rgba(176, 0, 32, 0.08)"
  },
  "&:active": {
    backgroundColor: "rgba(176, 0, 32, 0.16)"
  }
};

// Icon + Text
const iconTextButtonStyle = {
  ...textButtonStyle,
  minWidth: 116,
  minHeight: 36,
  "& span": {
    minHeight: 16,
    fontSize: 14,
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.14",
    letterSpacing: "1.25px",
    textAlign: "center",
    marginRight: 8 // buttonのpadding-right:8pxと合わせて16px
  }
};

const buttonStyles = {
  default: defaultButtonStyle,
  outline: outlineButtonStyle,
  outlineWhite: outlineWhiteButtonStyle,
  text: textButtonStyle,
  textDelete: textDeleteButtonStyle,
  iconText: iconTextButtonStyle
};

const styles = (): StyleRules => {
  const defaultButtonStyles = { ...buttonStyles } as object;
  return createStyles(defaultButtonStyles);
};

interface OwnProps {
  minWidth?: number;
  kind?:
    | "default"
    | "outline"
    | "outlineWhite"
    | "text"
    | "textDelete"
    | "iconText";
}
type Props = OwnProps & ButtonProps & WithStyles<typeof styles>;

const KnowbeButton: React.FC<Props> = (props) => {
  const buttonKind = props.kind || "default";
  const classAttr = props.classes[buttonKind] || "";
  let styleAttr = props.style || {};
  if (props.minWidth) {
    styleAttr = { ...styleAttr, minWidth: props.minWidth };
  }

  // kind, classesのdefaultやoutlineなどは
  // material-uiのボタンpropsにマッチしないので除外
  const excludedProps = omit(props, ["kind", "classes", "minWidth"]);

  return (
    <Button
      {...excludedProps}
      className={classAttr}
      style={styleAttr}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default withStyles(styles)(KnowbeButton);
