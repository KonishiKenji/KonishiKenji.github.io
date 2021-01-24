import * as React from "react";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

const styles = ({ spacing }: Theme) =>
  createStyles({
    wrap: {
      display: "flex"
    },
    text: {
      marginRight: spacing.unit * 2
    }
  });

interface OwnProps {
  label: string | JSX.Element;
  control?: React.ReactElement<any>;
}
type Props = OwnProps & React.Props<{}> & WithStyles<typeof styles>;

const FormLabel: React.FunctionComponent<Props> = props => {
  const Label = props.children ? (
    <div className={props.classes.wrap}>
      <span className={props.classes.text}>{props.label}</span>
      {props.children}
    </div>
  ) : (
    props.label
  );
  return props.control ? (
    <FormControlLabel control={props.control} label={Label} />
  ) : (
    <Typography component="label">{Label}</Typography>
  );
};

export default withStyles(styles)(FormLabel);
