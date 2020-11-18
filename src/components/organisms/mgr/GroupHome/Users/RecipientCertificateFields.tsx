import * as React from "react";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikSelectDate from "@components/molecules/FormikSelectDate";
import PlanSupportPaymentFields from "@components/organisms/mgr/GroupHome/Users/items/PlanSupportPaymentFields";

const START_ADD_YEAR = 1;
const END_ADD_YEAR = 5;

class RecipientCertificateFields extends React.Component {
  public render() {
    return (
      <FormPaper>
        <div style={{ marginBottom: 32 }}>
          <SectionTitle label="受給者証の詳細" />
        </div>
        <FormikSwitch
          name="recipientCertificate.userChargeLimitFlag"
          label="負担額上限月額の適応期間"
        >
          <FormikSelectDate
            name="recipientCertificate.userChargeLimitStartDate"
            label="適用開始日"
            style={{ marginBottom: 12 }}
            addYearTo={START_ADD_YEAR}
          />
          <FormikSelectDate
            name="recipientCertificate.userChargeLimitEndDate"
            label="適用終了日"
            addYearTo={END_ADD_YEAR}
          />
        </FormikSwitch>
        <FormikSwitch
          name="recipientCertificate.careSupportAuthFlag"
          label="障害支援区分の認定有効期間"
        >
          <FormikSelectDate
            name="recipientCertificate.careSupportAuthStartDate"
            label="認定開始日"
            style={{ marginBottom: 12 }}
            addYearTo={START_ADD_YEAR}
          />
          <FormikSelectDate
            name="recipientCertificate.careSupportAuthEndDate"
            label="認定終了日"
            addYearTo={END_ADD_YEAR}
          />
        </FormikSwitch>
        <FormikSwitch
          name="recipientCertificate.careSupportPaymentFlag"
          label="介護給付費の支給決定期間"
        >
          <FormikSelectDate
            name="recipientCertificate.careSupportPaymentStartDate"
            label="支給決定開始日"
            style={{ marginBottom: 12 }}
            addYearTo={START_ADD_YEAR}
          />
          <FormikSelectDate
            name="recipientCertificate.careSupportPaymentEndDate"
            label="支給決定終了日"
            addYearTo={END_ADD_YEAR}
          />
        </FormikSwitch>
        <PlanSupportPaymentFields
          startAddYearTo={START_ADD_YEAR}
          endAddYearTo={END_ADD_YEAR}
        />
        <FormikSwitch
          name="recipientCertificate.planSupportMonitorFlag"
          label="計画相談支援給付金のモニタリング期間"
          style={{ marginBottom: 0 }}
        >
          <FormikSelectDate
            name="recipientCertificate.planSupportMonitorStartDate"
            label="モニタリング開始日"
            style={{ marginBottom: 12 }}
            addYearTo={START_ADD_YEAR}
          />
          <FormikSelectDate
            name="recipientCertificate.planSupportMonitorEndDate"
            label="モニタリング終了日"
            style={{ marginBottom: 0 }}
            addYearTo={END_ADD_YEAR}
          />
        </FormikSwitch>
      </FormPaper>
    );
  }
}

export default RecipientCertificateFields;
