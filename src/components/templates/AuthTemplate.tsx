import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import Header from "@components/organisms/auth/Header";
import Footer from "@components/organisms/mgr/Footer";

const styles = createStyles({
  root: {
    display: "block"
  },
  container: {
    width: 640,
    minHeight: "calc(100vh - 280px)", // 100vh - margin - Footer-height
    margin: "128px auto 40px"
  }
});

type Props = WithStyles<typeof styles>;

const AuthTemplate: React.FunctionComponent<Props> = ({
  classes,
  children
}) => (
  <div className={classes.root}>
    <Header />
    <div className={classes.container}>{children}</div>
    <Footer />
  </div>
);

export default withStyles(styles)(AuthTemplate);
