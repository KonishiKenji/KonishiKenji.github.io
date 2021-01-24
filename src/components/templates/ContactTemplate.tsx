import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import ContactHeader from "@components/organisms/contact/ContactHeader";
import Footer from "@components/organisms/mgr/Footer";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      minWidth: 750,
      minHeight: "calc(100vh - 152px)", // 100vh - Footer-height（marginTop:80を含む）
      paddingBottom: spacing.unit * 5
    },
    children: {
      width: "80%",
      minWidth: 720,
      marginTop: spacing.unit * 4,
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: "#fff",
      boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.12)"
    }
  });

interface Props extends WithStyles<typeof styles> {}

const contactTemplate: React.SFC<Props> = props => (
  <>
    <div className={props.classes.root}>
      <ContactHeader />
      <div className={props.classes.children}>{props.children}</div>
    </div>
    <Footer />
  </>
);

export default withStyles(styles)(contactTemplate);
