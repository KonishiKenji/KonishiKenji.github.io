import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const styles = () =>
  createStyles({
    button: {
      padding: 2
    },
    icon: {
      marginRight: 8
    }
  });

interface OwnProps {
  text: string;
  onClick: () => void;
}
type Props = OwnProps & WithStyles<typeof styles>;

const DeleteButton: React.FunctionComponent<Props> = props => (
  <Button
    color="secondary"
    className={props.classes.button}
    onClick={props.onClick}
  >
    <DeleteOutlinedIcon color="secondary" className={props.classes.icon} />
    {props.text}
  </Button>
);

export default withStyles(styles)(DeleteButton);
