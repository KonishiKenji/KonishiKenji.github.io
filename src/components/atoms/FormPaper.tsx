import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      margin: spacing.unit * 2,
      padding: spacing.unit * 4
    }
  });

const StyledPaper = withStyles(styles)(Paper);

type Props = React.Props<{}>;

const FormPaper: React.FunctionComponent<Props> = ({ children }) => (
  <StyledPaper component="section" elevation={0}>
    {children}
  </StyledPaper>
);

export default FormPaper;
