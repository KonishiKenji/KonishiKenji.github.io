import * as React from "react";
import * as classNames from "classnames";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

const styles = ({ spacing }: Theme) =>
  createStyles({
    default: {
      marginRight: spacing.unit * 2,
      marginBottom: spacing.unit * 4
    },
    checkbox: {
      marginTop: -12,
      marginBottom: 20
    },
    switch: {
      marginTop: -12,
      marginBottom: 20
    },
    superSmall: {
      width: 100
    },
    small: {
      width: 128
    },
    smallMedium: {
      width: 160
    },
    medium: {
      width: 240
    },
    long: {
      width: 400
    },
    quarterSuperLong: {
      width: 500
    },
    halfSuperLong: {
      width: 544
    },
    superLong: {
      width: 800
    },
    fullSize: {
      width: "100%"
    },
    auto: {
      width: "auto"
    }
  });

type FieldType = "default" | "checkbox" | "switch";

export type FieldSizeName =
  | "superSmall"
  | "small"
  | "smallMedium"
  | "medium"
  | "long"
  | "quarterSuperLong"
  | "halfSuperLong"
  | "superLong"
  | "fullSize"
  | "auto";

interface OwnProps {
  type?: FieldType;
  size?: FieldSizeName;
  style?: React.CSSProperties;
}

type Props = OwnProps & React.Props<{}> & WithStyles<typeof styles>;

const FieldWrapper: React.FunctionComponent<Props> = ({
  children,
  classes,
  style,
  type = "default",
  size = "medium"
}) => (
  <div className={classNames(classes[type], classes[size])} style={style}>
    {children}
  </div>
);

export default withStyles(styles)(FieldWrapper);
