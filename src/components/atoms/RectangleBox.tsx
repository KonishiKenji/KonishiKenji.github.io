import * as React from "react";
import * as ClassNames from "classnames";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";

const styles = createStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: 118,
    height: 66,
    backgroundColor: "#eceff1",
    borderRadius: 4,
    lineHeight: 1,
    padding: "10px 12px",
    marginRight: 10
  },
  title: {
    fontSize: 13,
    color: "#37474F"
  },
  content: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    color: "#666"
  },
  num: {
    fontSize: 22,
    flex: 1,
    textAlign: "center"
  },
  hasError: {
    color: "#f44336"
  },
  unit: {
    fontSize: 14
  }
});

interface OwnProps {
  title: string;
  num: number;
  denom?: number;
  unit: string;
}
type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 主に累計などの表示に使うボックス
 * denom(分母)が渡された時、numがdenomを超えていたらエラーの色で表示する
 */
const RectangleBox: React.FunctionComponent<Props> = ({
  classes,
  title,
  num,
  denom,
  unit
}: Props) => (
  <div className={classes.wrapper}>
    <div className={classes.title}>{title}</div>
    <div className={classes.content}>
      <div
        className={ClassNames(classes.num, {
          [classes.hasError]: denom && num > denom
        })}
      >
        {num}
      </div>
      <span className={classes.unit}>
        {denom && `/${denom}`}
        {unit}
      </span>
    </div>
  </div>
);

export default withStyles(styles)(RectangleBox);
