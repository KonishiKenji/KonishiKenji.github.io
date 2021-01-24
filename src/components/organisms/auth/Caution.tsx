import * as React from "react";
import * as classNames from "classnames";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Error from "@material-ui/icons/Error";
import Launch from "@material-ui/icons/Launch";
import { BASE_BLUE_COLOR, SECONDARY_BACKGROUND_COLOR } from "@constants/styles";
import { currentBrowserName, isChrome } from "@utils/browser";

const styles = createStyles({
  uaAlert: {
    marginBottom: 16,
    padding: "24px 0 32px",
    boxSizing: "border-box",
    textAlign: "center"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold"
  },
  note: {
    fontSize: 16
  },
  link: {
    display: "inline-block",
    margin: "0 0.5rem",
    color: BASE_BLUE_COLOR,
    fontWeight: "bold",
    textDecoration: "none"
  },
  linkIcon: {
    width: 14,
    height: 14,
    marginLeft: "0.5rem",
    verticalAlign: "middle"
  },
  currentUA: {
    width: 560,
    margin: "auto",
    padding: 16,
    backgroundColor: SECONDARY_BACKGROUND_COLOR
  },
  displayUA: {
    display: "inline-block",
    textAlign: "left",
    "& em": {
      marginLeft: "1rem",
      fontWeight: "bold",
      fontStyle: "normal"
    }
  },
  uaIcon: {
    width: 22,
    height: 22,
    margin: "0 4px 4px 0",
    verticalAlign: "middle"
  },
  greenColor: {
    color: "#6EC200"
  },
  redColor: {
    color: "#FF5656"
  }
});

type Props = WithStyles<typeof styles>;

const LoginCaution: React.FunctionComponent<Props> = ({ classes }) => {
  if (isChrome()) return null;

  const browserName = currentBrowserName();
  return (
    <Paper className={classes.uaAlert}>
      <p className={classes.title}>必ずお読みください</p>
      <p className={classes.note}>
        現在、ご利用のブラウザは当社が推奨する動作環境ではない為、
        <br />
        正しく動作しない可能性があります。
      </p>
      <p className={classes.note}>
        推奨ブラウザである
        <a
          href="https://www.google.com/intl/ja_ALL/chrome/"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          Google Chrome
          <Launch className={classes.linkIcon} />
        </a>
        をお使い頂くことで、
        <br />
        快適に操作することができます。
      </p>
      <div className={classes.currentUA}>
        <div className={classes.displayUA}>
          {browserName !== "unknown" && (
            <div>
              <Error className={classNames(classes.uaIcon, classes.redColor)} />
              現在のブラウザ
              <em>{browserName}</em>
            </div>
          )}
          <div>
            <CheckCircle
              className={classNames(classes.uaIcon, classes.greenColor)}
            />
            推奨のブラウザ
            <em>Google Chrome</em>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(LoginCaution);
