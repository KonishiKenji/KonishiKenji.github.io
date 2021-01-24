import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { FormikProps, getIn } from "formik";
import { UsersValues } from "@initialize/mgr/IAB/users/initialValues";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikSelectDateNotSelectedDefault from "@components/molecules/FormikSelectDateNotSelectedDefault";
import { DEFAULT_SELECT_VALUE } from "@constants/variables";

const styles = () =>
  createStyles({
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
  startAddYearTo: number;
  endAddYearTo: number;
}

type Props = OwnProps & WithStyles<typeof styles>;

const PlanSupportPaymentFields: React.FunctionComponent<Props> = props => {
  /**
   * 計画相談支援給付費の支給期間：ONOFF切り替え時に値をリセット
   */
  const onChangePlanSupportPaymentFlag = () => {
    if (
      getIn(
        props.formikProps.values,
        "recipientCertificate.planSupportPaymentFlag"
      )
    ) {
      props.setFormikFieldValue(
        "recipientCertificate.planSupportPaymentFlag",
        false
      );
      props.setFormikFieldValue(
        "recipientCertificate.planSupportPaymentStartDate.year",
        DEFAULT_SELECT_VALUE
      );
      props.setFormikFieldValue(
        "recipientCertificate.planSupportPaymentStartDate.month",
        ""
      );
      props.setFormikFieldValue(
        "recipientCertificate.planSupportPaymentStartDate.day",
        ""
      );
      props.setFormikFieldValue(
        "recipientCertificate.planSupportPaymentEndDate.year",
        DEFAULT_SELECT_VALUE
      );
      props.setFormikFieldValue(
        "recipientCertificate.planSupportPaymentEndDate.month",
        ""
      );
      props.setFormikFieldValue(
        "recipientCertificate.planSupportPaymentEndDate.day",
        ""
      );
    } else {
      props.setFormikFieldValue(
        "recipientCertificate.planSupportPaymentFlag",
        true
      );
    }
  };

  return (
    <div className={props.classes.fieldWrapperSwitch}>
      <FormikSwitch
        name="recipientCertificate.planSupportPaymentFlag"
        label="計画相談支援給付費の支給期間"
        onChange={onChangePlanSupportPaymentFlag}
        className={props.classes.formikActionLabel}
      >
        <FormikSelectDateNotSelectedDefault
          name="recipientCertificate.planSupportPaymentStartDate"
          label="支給開始日"
          style={{ marginBottom: 12 }}
          addYearTo={props.startAddYearTo}
          setFormikFieldValue={props.setFormikFieldValue}
        />
        <FormikSelectDateNotSelectedDefault
          name="recipientCertificate.planSupportPaymentEndDate"
          label="支給終了日"
          addYearTo={props.endAddYearTo}
          setFormikFieldValue={props.setFormikFieldValue}
        />
      </FormikSwitch>
    </div>
  );
};

export default withStyles(styles)(PlanSupportPaymentFields);
