import * as React from "react";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikSelectDateNotSelectedDefault from "@components/molecules/FormikSelectDateNotSelectedDefault";
import PlanSupportPaymentFields from "@components/organisms/mgr/common/Users/items/PlanSupportPaymentFields";

interface OwnProps {
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

type Props = OwnProps;

class RecipientCertificateFields extends React.Component<Props> {
  public render() {
    const startAddYearTo = 1;
    const endAddYearTo = 5;
    return (
      <FormPaper>
        <div style={{ marginBottom: 32 }}>
          <SectionTitle label="受給者証の詳細" />
        </div>
        <FormikSwitch
          name="recipientCertificate.userChargeLimitFlag"
          label="負担上限月額の適用期間"
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
        <FormikSwitch
          name="recipientCertificate.foodServeAdditionFlg"
          label="食事提供体制加算の適用"
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
        <FormikSwitch
          name="recipientCertificate.careSupportAuthFlag"
          label="障害支援区分の認定有効期間"
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
        <FormikSwitch
          name="recipientCertificate.careSupportPaymentFlag"
          label="介護給付費の支給決定期間"
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
        <PlanSupportPaymentFields
          setFormikFieldValue={this.props.setFormikFieldValue}
          startAddYearTo={startAddYearTo}
          endAddYearTo={endAddYearTo}
        />
        <FormikSwitch
          name="recipientCertificate.planSupportMonitorFlag"
          label="計画相談支援給付費のモニタリング期間"
          style={{ marginBottom: 0 }}
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
      </FormPaper>
    );
  }
}

export default RecipientCertificateFields;