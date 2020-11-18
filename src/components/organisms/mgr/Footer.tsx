import * as React from "react";
import * as classNames from "classnames";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import RecruitLogo from "@components/atoms/RecruitLogo";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#fafafa",
      height: 72,
      padding: `${spacing.unit}px 0 ${spacing.unit}px ${spacing.unit * 3}px`,
      marginTop: 80
    },
    column: {
      display: "flex",
      alignItems: "center",
      height: "100%"
    },
    recruitText: {
      fontSize: "10px",
      display: "block",
      width: "100%"
    },
    footerLink: {
      color: "#37474f",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline"
      }
    },
    legalRoot: {
      listStyle: "none",
      display: "flex",
      alignItems: "center",
      margin: "0 0 0 40px",
      padding: 0,
      fontSize: "12px"
    },
    legalLinkDeco: {
      borderLeft: "solid 1px #37474f",
      paddingLeft: spacing.unit,
      marginLeft: spacing.unit
    }
  });

type Props = WithStyles<typeof styles>;

const Footer: React.FunctionComponent<Props> = ({ classes }) => (
  <footer className={classes.root}>
    <div className={classes.column}>
      <div>
        <a
          href="https://www.recruit.co.jp/company/recruitcoltd/"
          target="_blank"
        >
          <RecruitLogo />
        </a>
        <span className={classes.recruitText}>
          <a
            href="https://www.recruit.co.jp/company/recruitcoltd/"
            className={classes.footerLink}
            target="_blank"
          >
            リクルートグループサイトへ
          </a>
        </span>
      </div>
      <ul className={classes.legalRoot}>
        <li>
          <a
            href="https://mgr.knowbe.jp/static/media/privacy_policy.pdf"
            className={classes.footerLink}
            target="_blank"
          >
            プライバシーポリシー
          </a>
        </li>
        <li>
          <a
            href="https://mgr.knowbe.jp/static/media/terms.pdf"
            className={classNames(classes.footerLink, classes.legalLinkDeco)}
            target="_blank"
          >
            利用規約
          </a>
        </li>
      </ul>
    </div>
  </footer>
);

export default withStyles(styles)(Footer);
