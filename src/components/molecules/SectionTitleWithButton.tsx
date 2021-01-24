import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import SectionTitle from "@components/atoms/SectionTitle";

const styles = () =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      "& > :first-child": {
        width: "100%"
      }
    },
    buttons: {
      position: "absolute",
      right: 0,
      top: "-8px"
    }
  });

interface OwnProps {
  label: string;
  isTitleNoMargin?: boolean;
}
type Props = OwnProps & React.Props<{}> & WithStyles<typeof styles>;

/**
 * SectionTitle内にボタンが持てるタイプ(children経由)
 */
const SectionTitleWithButton = (props: Props) => (
  <div className={props.classes.root}>
    <SectionTitle label={props.label} isTitleNoMargin={props.isTitleNoMargin} />
    <div className={props.classes.buttons}>{props.children}</div>
  </div>
);

export default withStyles(styles)(SectionTitleWithButton);
