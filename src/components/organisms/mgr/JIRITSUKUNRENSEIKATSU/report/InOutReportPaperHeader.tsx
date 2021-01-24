import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import RectangleBox from "@components/atoms/RectangleBox";

const styles = createStyles({
  contents: {
    display: "flex",
    justifyContent: "space-between" as "space-between",
    alignItems: "flex-end" as "flex-end",
    marginBottom: 16
  },
  rectangleListContents: {
    display: "flex",
    justifyContent: "flex-start" as "flex-start"
  },
  linkButton: {
    width: 140,
    height: 36,
    border: "solid 1px rgba(0, 0, 0, 0.12)",
    borderRadius: 5,
    color: "#37474f",
    textAlign: "center"
  },
  button: {
    color: "#0277bd",
    width: "100%"
  }
});

interface OwnProps {
  rectangleConfigList: {
    title: string;
    num: number;
    denom?: number;
    unit: string;
  }[];
  openModal: () => void;
}
type Props = OwnProps & WithStyles<typeof styles>;

const InOutReportPaperHeader: React.FunctionComponent<Props> = ({
  classes,
  rectangleConfigList,
  openModal
}) => (
  <div className={classes.contents}>
    <div className={classes.rectangleListContents}>
      {rectangleConfigList.map(rectangleConfig => (
        <RectangleBox {...rectangleConfig} />
      ))}
    </div>
    <div className={classes.linkButton}>
      <Button onClick={openModal} className={classes.button} color="secondary">
        利用状況の詳細
      </Button>
    </div>
  </div>
);

export default withStyles(styles)(InOutReportPaperHeader);
