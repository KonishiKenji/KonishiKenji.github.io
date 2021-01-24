import * as React from "react";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikSelectDateNotSelectedDefault from "@components/molecules/FormikSelectDateNotSelectedDefault";

interface OwnProps {
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
  startAddYearTo: number;
  endAddYearTo: number;
}

const PlanSupportPaymentFields: React.FunctionComponent<OwnProps> = props => {
  return (
    <FormikSwitch
      name="recipientCertificate.planSupportPaymentFlag"
      label="計画相談支援給付費の支給期間"
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
  );
};

export default PlanSupportPaymentFields;
