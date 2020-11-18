import * as React from "react";
import { Link } from "react-router-dom";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = createStyles({
  wrapper: {
    textAlign: "center"
  },
  link: {
    display: "inline-block",
    textDecoration: "none"
  },
  button: {
    color: "#0277bd"
  }
});

interface OwnProps {
  to: string;
  target?: string;
  className?: string;
  variant?:
    | "text"
    | "flat"
    | "outlined"
    | "contained"
    | "raised"
    | "fab"
    | "extendedFab";
}
type Props = OwnProps & WithStyles<typeof styles>;

const LinkButton: React.FunctionComponent<Props> = ({
  classes,
  children,
  to,
  target,
  variant,
  className
}) => {
  const buttonClassName = className || classes.button;

  return (
    <div className={classes.wrapper}>
      {target ? (
        <a href={to} className={classes.link} target={target}>
          <Button
            color="secondary"
            variant={variant}
            className={buttonClassName}
          >
            {children}
          </Button>
        </a>
      ) : (
        <Link to={to} className={classes.link} target="">
          <Button
            color="secondary"
            variant={variant}
            className={buttonClassName}
          >
            {children}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default withStyles(styles)(LinkButton);
