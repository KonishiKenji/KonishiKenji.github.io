import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";

const styles = createStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
  },
  title: {
    height: "100%",
    fontSize: 14,
    lineHeight: "1.2",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 5px"
  },
  mainTextContent: {
    backgroundColor: "#78909c",
    borderRadius: 16,
    width: 80,
    textAlign: "center",
    lineHeight: 1,
    padding: "8px 0",
    margin: "0 auto 12px"
  },
  mainText: {
    fontSize: 20
  },
  unit: {
    fontSize: 14,
    marginLeft: 5
  }
});

interface OwnProps {
  title: string;
  mainText: string;
  unit: string;
}
type Props = OwnProps & WithStyles<typeof styles>;

const InOutDetailHeaderItem: React.FunctionComponent<Props> = ({
  classes,
  title,
  mainText,
  unit
}) => (
  <div className={classes.wrapper}>
    <div className={classes.title}>{title}</div>
    <div className={classes.mainTextContent}>
      <span className={classes.mainText}>{mainText}</span>
      {unit && <span className={classes.unit}>{unit}</span>}
    </div>
  </div>
);

export default withStyles(styles)(InOutDetailHeaderItem);
