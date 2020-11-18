import * as React from "react";
import { connect } from "react-redux";
import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";
import { FormikProps, getIn } from "formik";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import { ContactValues } from "@interfaces/contact/contact";
import { CONTACT_OVERVIEW_LIST } from "@constants/variables";

const styles = ({ spacing }: Theme) =>
  createStyles({
    categoryTitleText: {
      width: "100%",
      fontSize: 20,
      fontWeight: 500,
      color: "#37474f",
      borderBottom: "solid 1px rgba(0, 0, 0, 0.54);",
      letterSpacing: 0.3,
      paddingBottom: spacing.unit,
      marginTop: spacing.unit * 5,
      marginBottom: spacing.unit * 4
    },
    subText: {
      marginTop: spacing.unit * 2,
      marginBottom: spacing.unit * 2,
      color: "rgba(0, 0, 0, 0.38)"
    },
    submitButtonWrapper: {
      display: "flex",
      justifyContent: "center",
      marginTop: spacing.unit * 3
    },
    submitButton: {
      width: spacing.unit * 20
    },
    disableButton: {
      width: spacing.unit * 20,
      fontSize: 14,
      textAlign: "center",
      color: "#555",
      backgroundColor: "#ddd",
      padding: `${spacing.unit}px ${spacing.unit * 2}px`,
      borderRadius: 4
    },
    privacy: {
      color: "rgba(0, 0, 0, 0.38)",
      fontSize: 12,
      "& > a": {
        color: "#0277bd",
        textDecoration: "none"
      }
    }
  });

interface OwnProps {
  formikProps: FormikProps<any>;
  submitError: () => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

interface State {
  initialValues: ContactValues;
}

class ContactFields extends React.Component<Props, State> {
  public render() {
    return (
      <>
        <div className={this.props.classes.categoryTitleText}>
          サービス利用詳細
        </div>
        <FormikSelect
          name="contact.overview"
          label="お問い合わせ概要"
          required={true}
          options={CONTACT_OVERVIEW_LIST}
          size="fullSize"
        />
        <FormikTextField
          name="contact.content"
          label="内容"
          required={true}
          placeholder="お問い合わせ内容をご記入下さい。"
          maxLength={255}
          size="fullSize"
          rows="5"
          multiline={true}
        />
        <div className={this.props.classes.categoryTitleText}>お客様情報</div>
        <FormikTextField
          name="contact.govBusinessOwner"
          label="法人名"
          required={true}
          placeholder=""
          maxLength={255}
          size="fullSize"
        />
        <FormikTextField
          name="contact.facilityName"
          label="事業所名"
          required={true}
          placeholder=""
          maxLength={255}
          size="fullSize"
        />
        <FormikTextField
          name="contact.responsibleName"
          label="担当者氏名"
          required={true}
          placeholder=""
          maxLength={255}
          size="fullSize"
        />
        <FormikTextField
          name="contact.email"
          label="返信先のメールアドレス"
          required={true}
          placeholder=""
          maxLength={255}
          size="fullSize"
        />
        <div className={this.props.classes.subText}>
          尚、ご回答につきましては、若干お時間を要する場合がございます。予めご了承ください。
          <br />
          お客様のご利用環境や迷惑メールの設定により、返信メールが届かない場合がございます。受信可能な設定にして頂きますようお願い致します。
        </div>
        <FormikCheckbox
          name="contact.agreement"
          label={
            <span className={this.props.classes.privacy}>
              <a
                href="https://mgr.knowbe.jp/static/media/privacy_policy.pdf"
                target="_blank"
              >
                プライバシーポリシー
              </a>{" "}
              の内容を確認し、同意します。
            </span>
          }
        />
        <div className={this.props.classes.submitButtonWrapper}>
          {getIn(this.props.formikProps.values, "contact.agreement") ? (
            <FormikSubmitButton
              buttonName="送信する"
              formikProps={this.props.formikProps}
              errorAction={this.props.submitError}
              className={this.props.classes.submitButton}
            />
          ) : (
            <div className={this.props.classes.disableButton}>送信する</div>
          )}
        </div>
      </>
    );
  }
}

export default connect<void, void>(null)(withStyles(styles)(ContactFields));
