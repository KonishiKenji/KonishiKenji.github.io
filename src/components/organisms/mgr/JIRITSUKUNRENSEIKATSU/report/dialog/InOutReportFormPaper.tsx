import * as React from "react";
import Paper from "@material-ui/core/Paper";

type Props = React.Props<{}>;

const InOutReportFormPaper: React.FunctionComponent<Props> = ({ children }) => (
  <Paper component="section" elevation={0}>
    {children}
  </Paper>
);

export default InOutReportFormPaper;
