import * as React from "react";
import ContactTemplate from "@components/templates/ContactTemplate";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Button from "@material-ui/core/Button";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      padding: `${spacing.unit * 3}px ${spacing.unit * 5}px`,
      textAlign: "center"
    },
    title: {
      marginTop: spacing.unit * 5,
      fontSize: 20,
      fontWeight: 500,
      color: "#37474f"
    },
    subText: {
      marginTop: spacing.unit * 4,
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.6)"
    },
    closeButton: {
      marginTop: spacing.unit * 5,
      marginBottom: spacing.unit * 5,
      paddingLeft: spacing.unit * 4,
      paddingRight: spacing.unit * 4,
      boxShadow: "none",
      textTransform: "none"
    }
  });

interface Props extends WithStyles<typeof styles> {}

/**
 * お問い合わせ
 */
class Contact extends React.Component<Props> {
  public render() {
    return (
      <ContactTemplate>
        <div className={this.props.classes.root}>
          <div className={this.props.classes.title}>
            メールの送信が完了しました。
          </div>
          <div className={this.props.classes.subText}>
            お問い合わせフォームをご利用頂きありがとうございました。
            <br />
            尚、ご回答につきましては、若干お時間を要する場合があります。
            <br />
            予めご了承ください。
            <br />
            また、ご利用環境や迷惑メールの設定により、返信メールが届かない場合があります。
            <br />
            受信可能な設定にして頂きますようお願いします。
          </div>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.close}
            className={this.props.classes.closeButton}
          >
            このページを閉じる
          </Button>
        </div>
      </ContactTemplate>
    );
  }

  private close = () => {
    window.close();
  };
}

export default withStyles(styles)(Contact);
