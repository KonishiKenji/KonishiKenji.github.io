import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikSelectDateNotSelectedDefault from "@components/molecules/FormikSelectDateNotSelectedDefault";
import PlanSupportPaymentFields from "@components/organisms/mgr/IAB/Users/items/PlanSupportPaymentFields";
import { FormikProps, getIn } from "formik";
import { UsersValues } from "@initialize/mgr/IAB/users/initialValues";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";

const styles = () =>
  createStyles({
    sectionTitle: { marginBottom: 30 },
    guardian: {
      float: "left"
    },
    formikActionLabel: {
      "&+span": {
        fontSize: 16
      }
    },
    fieldWrapperSwitch: {
      "& > div > div": { marginTop: 6 }
    }
  });

interface OwnProps {
  formikProps: FormikProps<UsersValues>;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

class RecipientCertificateFields extends React.Component<Props> {
  public render() {
    const startAddYearTo = 1;
    const endAddYearTo = 5;
    return (
      <FormPaper>
        <div className={this.props.classes.sectionTitle}>
          <SectionTitle label="受給者証の詳細" />
        </div>
        <div className={this.props.classes.fieldWrapperSwitch}>
          <FormikSwitch
            name="recipientCertificate.userChargeLimitFlag"
            label="負担上限月額の適用期間"
            onChange={this.onChangeUserChargeLimitFlag}
            className={this.props.classes.formikActionLabel}
          >
            <FormikSelectDateNotSelectedDefault
              name="recipientCertificate.userChargeLimitStartDate"
              label="適用開始日"
              style={{ marginBottom: 12 }}
              addYearTo={startAddYearTo}
              setFormikFieldValue={this.props.setFormikFieldValue}
            />
            <FormikSelectDateNotSelectedDefault
              name="recipientCertificate.userChargeLimitEndDate"
              label="適用終了日"
              addYearTo={endAddYearTo}
              setFormikFieldValue={this.props.setFormikFieldValue}
            />
          </FormikSwitch>
        </div>
        <div className={this.props.classes.fieldWrapperSwitch}>
          <FormikSwitch
            name="recipientCertificate.foodServeAdditionFlg"
            label="食事提供体制加算の適用期間"
            onChange={this.onChangeFoodServeAdditionFlg}
            className={this.props.classes.formikActionLabel}
          >
            <FormikSelectDateNotSelectedDefault
              name="recipientCertificate.foodServeAdditionStartDate"
              label="適用開始日"
              style={{ marginBottom: 12 }}
              addYearTo={startAddYearTo}
              setFormikFieldValue={this.props.setFormikFieldValue}
            />
            <FormikSelectDateNotSelectedDefault
              name="recipientCertificate.foodServeAdditionEndDate"
              label="適用終了日"
              style={{ marginBottom: 0 }}
              addYearTo={endAddYearTo}
              setFormikFieldValue={this.props.setFormikFieldValue}
            />
          </FormikSwitch>
        </div>
        <div className={this.props.classes.fieldWrapperSwitch}>
          <FormikSwitch
            name="recipientCertificate.careSupportAuthFlag"
            label="障害支援区分の認定有効期間"
            onChange={this.onChangeCareSupportAuthFlag}
            className={this.props.classes.formikActionLabel}
          >
            <FormikSelectDateNotSelectedDefault
              name="recipientCertificate.careSupportAuthStartDate"
              label="認定開始日"
              style={{ marginBottom: 12 }}
              addYearTo={startAddYearTo}
              setFormikFieldValue={this.props.setFormikFieldValue}
            />
            <FormikSelectDateNotSelectedDefault
              name="recipientCertificate.careSupportAuthEndDate"
              label="認定終了日"
              addYearTo={endAddYearTo}
              setFormikFieldValue={this.props.setFormikFieldValue}
            />
          </FormikSwitch>
        </div>
        <div className={this.props.classes.fieldWrapperSwitch}>
          <FormikSwitch
            name="recipientCertificate.careSupportPaymentFlag"
            label="介護給付費の支給決定期間"
            onChange={this.onChangeCareSupportPaymentFlag}
            className={this.props.classes.formikActionLabel}
          >
            <FormikSelectDateNotSelectedDefault
              name="recipientCertificate.careSupportPaymentStartDate"
              label="支給決定開始日"
              style={{ marginBottom: 12 }}
              addYearTo={startAddYearTo}
              setFormikFieldValue={this.props.setFormikFieldValue}
            />
            <FormikSelectDateNotSelectedDefault
              name="recipientCertificate.careSupportPaymentEndDate"
              label="支給決定終了日"
              addYearTo={endAddYearTo}
              setFormikFieldValue={this.props.setFormikFieldValue}
            />
          </FormikSwitch>
        </div>
        <PlanSupportPaymentFields
          formikProps={this.props.formikProps}
          setFormikFieldValue={this.props.setFormikFieldValue}
          startAddYearTo={startAddYearTo}
          endAddYearTo={endAddYearTo}
        />
        <div className={this.props.classes.fieldWrapperSwitch}>
          <FormikSwitch
            name="recipientCertificate.planSupportMonitorFlag"
            label="計画相談支援給付費のモニタリング期間"
            style={{ marginBottom: 0 }}
            onChange={this.onChangePlanSupportMonitorFlag}
            className={this.props.classes.formikActionLabel}
          >
            <FormikSelectDateNotSelectedDefault
              name="recipientCertificate.planSupportMonitorStartDate"
              label="モニタリング開始日"
              style={{ marginBottom: 12 }}
              addYearTo={startAddYearTo}
              setFormikFieldValue={this.props.setFormikFieldValue}
            />
            <FormikSelectDateNotSelectedDefault
              name="recipientCertificate.planSupportMonitorEndDate"
              label="モニタリング終了日"
              style={{ marginBottom: 0 }}
              addYearTo={endAddYearTo}
              setFormikFieldValue={this.props.setFormikFieldValue}
            />
          </FormikSwitch>
        </div>
      </FormPaper>
    );
  }

  /**
   * 負担上限月額の適用期間：ONOFF切り替え時に値をリセット
   */
  private onChangeUserChargeLimitFlag = () => {
    if (
      getIn(
        this.props.formikProps.values,
        "recipientCertificate.userChargeLimitFlag"
      )
    ) {
      this.props.setFormikFieldValue(
        "recipientCertificate.userChargeLimitFlag",
        false
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.userChargeLimitStartDate.year",
        DEFAULT_SELECT_VALUE
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.userChargeLimitStartDate.month",
        ""
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.userChargeLimitStartDate.day",
        ""
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.userChargeLimitEndDate.year",
        DEFAULT_SELECT_VALUE
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.userChargeLimitEndDate.month",
        ""
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.userChargeLimitEndDate.day",
        ""
      );
    } else {
      this.props.setFormikFieldValue(
        "recipientCertificate.userChargeLimitFlag",
        true
      );
    }
  };
  /**
   * 食事提供体制加算の適用期間：ONOFF切り替え時に値をリセット
   */
  private onChangeFoodServeAdditionFlg = () => {
    if (
      getIn(
        this.props.formikProps.values,
        "recipientCertificate.foodServeAdditionFlg"
      )
    ) {
      this.props.setFormikFieldValue(
        "recipientCertificate.foodServeAdditionFlg",
        false
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.foodServeAdditionStartDate.year",
        DEFAULT_SELECT_VALUE
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.foodServeAdditionStartDate.month",
        ""
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.foodServeAdditionStartDate.day",
        ""
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.foodServeAdditionEndDate.year",
        DEFAULT_SELECT_VALUE
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.foodServeAdditionEndDate.month",
        ""
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.foodServeAdditionEndDate.day",
        ""
      );
    } else {
      this.props.setFormikFieldValue(
        "recipientCertificate.foodServeAdditionFlg",
        true
      );
    }
  };
  /**
   * 障害支援区分の認定有効期間：ONOFF切り替え時に値をリセット
   */
  private onChangeCareSupportAuthFlag = () => {
    if (
      getIn(
        this.props.formikProps.values,
        "recipientCertificate.careSupportAuthFlag"
      )
    ) {
      this.props.setFormikFieldValue(
        "recipientCertificate.careSupportAuthFlag",
        false
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.careSupportAuthStartDate.year",
        DEFAULT_SELECT_VALUE
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.careSupportAuthStartDate.month",
        ""
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.careSupportAuthStartDate.day",
        ""
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.careSupportAuthEndDate.year",
        DEFAULT_SELECT_VALUE
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.careSupportAuthEndDate.month",
        ""
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.careSupportAuthEndDate.day",
        ""
      );
    } else {
      this.props.setFormikFieldValue(
        "recipientCertificate.careSupportAuthFlag",
        true
      );
    }
  };
  /**
   * 介護給付費の支給決定期間：ONOFF切り替え時に値をリセット
   */
  private onChangeCareSupportPaymentFlag = () => {
    if (
      getIn(
        this.props.formikProps.values,
        "recipientCertificate.careSupportPaymentFlag"
      )
    ) {
      this.props.setFormikFieldValue(
        "recipientCertificate.careSupportPaymentFlag",
        false
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.careSupportPaymentStartDate.year",
        DEFAULT_SELECT_VALUE
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.careSupportPaymentStartDate.month",
        ""
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.careSupportPaymentStartDate.day",
        ""
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.careSupportPaymentEndDate.year",
        DEFAULT_SELECT_VALUE
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.careSupportPaymentEndDate.month",
        ""
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.careSupportPaymentEndDate.day",
        ""
      );
    } else {
      this.props.setFormikFieldValue(
        "recipientCertificate.careSupportPaymentFlag",
        true
      );
    }
  };
  /**
   * 計画相談支援給付費のモニタリング期間：ONOFF切り替え時に値をリセット
   */
  private onChangePlanSupportMonitorFlag = () => {
    if (
      getIn(
        this.props.formikProps.values,
        "recipientCertificate.planSupportMonitorFlag"
      )
    ) {
      this.props.setFormikFieldValue(
        "recipientCertificate.planSupportMonitorFlag",
        false
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.planSupportMonitorStartDate.year",
        DEFAULT_SELECT_VALUE
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.planSupportMonitorStartDate.month",
        ""
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.planSupportMonitorStartDate.day",
        ""
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.planSupportMonitorEndDate.year",
        DEFAULT_SELECT_VALUE
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.planSupportMonitorEndDate.month",
        ""
      );
      this.props.setFormikFieldValue(
        "recipientCertificate.planSupportMonitorEndDate.day",
        ""
      );
    } else {
      this.props.setFormikFieldValue(
        "recipientCertificate.planSupportMonitorFlag",
        true
      );
    }
  };
}

export default withStyles(styles)(RecipientCertificateFields);
