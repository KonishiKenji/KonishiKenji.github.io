import * as React from "react";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikSelectDate from "@components/molecules/FormikSelectDate";

interface OwnProps {
  startAddYearTo: number;
  endAddYearTo: number;
}

const PlanSupportPaymentFields: React.FunctionComponent<OwnProps> = props => {
  return (
    <FormikSwitch
      name="recipientCertificate.planSupportPaymentFlag"
      label="計画相談支援給付費の支給期間"
    >
      <FormikSelectDate
        name="recipientCertificate.planSupportPaymentStartDate"
        label="支給開始日"
        style={{ marginBottom: 12 }}
        addYearTo={props.startAddYearTo}
      />
      <FormikSelectDate
        name="recipientCertificate.planSupportPaymentEndDate"
        label="支給終了日"
        addYearTo={props.endAddYearTo}
      />
    </FormikSwitch>
  );
};

export default PlanSupportPaymentFields;
