import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";

const styles = createStyles({
  title: {
    height: 37,
    fontSize: "14px",
    marginRight: "auto" as "auto",
    textAlign: "center",
    lineHeight: "24px"
  },
  mainTextContent: {
    backgroundColor: "#78909c",
    borderRadius: "16px",
    width: "80px",
    height: "26px",
    textAlign: "center",
    lineHeight: 1,
    padding: "6px 0 0 0",
    marginTop: 8,
    marginRight: 25,
    marginLeft: 25,
    // marginRight: "auto" as "auto",
    marginBottom: 0
  },
  mainText: {
    fontSize: "20px"
  },
  unit: {
    fontSize: "14px",
    marginLeft: "5px"
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
  children,
  title,
  mainText,
  unit
}) => (
  <div>
    <div className={classes.title}>{title}</div>
    <div className={classes.mainTextContent}>
      <span className={classes.mainText}>{mainText}</span>
      {unit && <span className={classes.unit}>{unit}</span>}
    </div>
  </div>
);

export default withStyles(styles)(InOutDetailHeaderItem);
