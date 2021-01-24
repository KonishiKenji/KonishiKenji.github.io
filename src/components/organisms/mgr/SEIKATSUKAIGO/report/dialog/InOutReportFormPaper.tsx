import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      margin: spacing.unit * 2
    }
  });

const StyledPaper = withStyles(styles)(Paper);

type Props = React.Props<{}>;

const InOutReportFormPaper: React.FunctionComponent<Props> = ({ children }) => (
  <StyledPaper component="section" elevation={0}>
    {children}
  </StyledPaper>
);

export default InOutReportFormPaper;
