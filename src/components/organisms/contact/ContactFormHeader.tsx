import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import ContactPhone from "@material-ui/icons/ContactPhone";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#eceff1",
      padding: `${spacing.unit * 3}px ${spacing.unit * 5}px`,
      display: "flex",
      justifyContent: "space-between"
    },
    title: {
      fontSize: 34,
      letterSpacing: 0.3,
      margin: `${spacing.unit * 2}px 0`,
      color: "#37474f"
    },
    supplementText: {
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.6)",
      lineHeight: 1.43
    },
    rightTitle: {
      color: "#37474f"
    },
    tel: {
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: 0.3,
      color: "#37474f"
    },
    telIcon: {
      marginRight: spacing.unit * 3,
      transform: "translateY(15%)"
    }
  });

type Props = WithStyles<typeof styles>;

const contactFormHeader: React.FunctionComponent<Props> = props => {
  return (
    <div className={props.classes.root}>
      <div>
        <div className={props.classes.title}>お問い合わせフォーム</div>
        <div className={props.classes.supplementText}>
          下記の項目をご記入の上、送信ボタンをクリックしてください。
          <br />
          お急ぎの場合は、お電話でお問い合わせください。
        </div>
      </div>
      <div>
        <div className={props.classes.rightTitle}>電話サポート</div>
        <div className={props.classes.tel}>
          <ContactPhone className={props.classes.telIcon} />
          080-0080-4593
        </div>
        <div className={props.classes.supplementText}>
          受付時間：10:00～17:00 (平日)
          <br />
          (土日祝、年末年始、弊社休日を除く)
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(contactFormHeader);
