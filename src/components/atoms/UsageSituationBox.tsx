import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import * as classNames from "classnames";

const styles = () =>
  createStyles({
    normal: {
      width: 245
    },
    small: {
      width: 184
    },
    usageSituationBox: {
      backgroundColor: "#eceff1",
      boxSizing: "border-box",
      borderRadius: 4,
      color: "#37474f",
      fontSize: 14,

      padding: "8px 12px 12px"
    },
    usageValue: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginTop: 12,
      "&:before": {
        content: "''"
      },
      "& > :first-child": {
        fontSize: 21,
        fontWeight: "bold",
        color: "#5E5F60"
      }
    }
  });

interface OwnProps {
  label: string;
  value: string | number | JSX.Element;
  unit?: string;
  size?: "normal" | "small";
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * {label}の利用状況
 */
const UsageSituationBox = ({ size = "normal", ...props }: Props) => {
  return (
    <div
      className={classNames(
        props.classes.usageSituationBox,
        props.classes[size]
      )}
    >
      {props.label}
      <div className={props.classes.usageValue}>
        {typeof props.value === "string" || typeof props.value === "number" ? (
          <div>{props.value}</div>
        ) : (
          props.value
        )}
        {props.unit && <span>{props.unit}</span>}
      </div>
    </div>
  );
};

export default withStyles(styles)(UsageSituationBox);
