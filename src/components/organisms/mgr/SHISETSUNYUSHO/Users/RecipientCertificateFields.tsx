import * as React from "react";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikSelectDateNotSelectedDefault from "@components/molecules/FormikSelectDateNotSelectedDefault";
import PlanSupportPaymentFields from "@components/organisms/mgr/common/Users/items/PlanSupportPaymentFields";
import { withStyles, WithStyles, createStyles } from "@material-ui/core";

const styles = () =>
  createStyles({
    section: {
      marginBottom: 32
    },
    innerItem: {
      marginLeft: -20
    }
  });

interface OwnProps {
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const RecipientCertificateFields: React.FunctionComponent<Props> = props => {
  const START_ADD_YEAR_TO = 1;
  const END_ADD_YEAR_TO = 5;
  return (
    <FormPaper>
      <div className={props.classes.section}>
        <SectionTitle label="受給者証の詳細" />
      </div>
      <FormikSwitch
        name="recipientCertificate.userChargeLimitFlag"
        label="負担上限月額の適用期間"
      >
        <div className={props.classes.innerItem}>
          <FormikSelectDateNotSelectedDefault
            name="recipientCertificate.userChargeLimitStartDate"
            label="適用開始日"
            required={true}
            style={{ marginBottom: 12 }}
            addYearTo={START_ADD_YEAR_TO}
            setFormikFieldValue={props.setFormikFieldValue}
          />
          <FormikSelectDateNotSelectedDefault
            name="recipientCertificate.userChargeLimitEndDate"
            label="適用終了日"
            required={true}
            addYearTo={END_ADD_YEAR_TO}
            setFormikFieldValue={props.setFormikFieldValue}
          />
        </div>
      </FormikSwitch>
      <FormikSwitch
        name="recipientCertificate.foodServeAdditionFlg"
        label="食事提供体制加算の適用"
      >
        <div className={props.classes.innerItem}>
          <FormikSelectDateNotSelectedDefault
            name="recipientCertificate.foodServeAdditionStartDate"
            label="適用開始日"
            required={true}
            style={{ marginBottom: 12 }}
            addYearTo={START_ADD_YEAR_TO}
            setFormikFieldValue={props.setFormikFieldValue}
          />
          <FormikSelectDateNotSelectedDefault
            name="recipientCertificate.foodServeAdditionEndDate"
            label="適用終了日"
            required={true}
            addYearTo={END_ADD_YEAR_TO}
            setFormikFieldValue={props.setFormikFieldValue}
          />
        </div>
      </FormikSwitch>
      <FormikSwitch
        name="recipientCertificate.careSupportAuthFlag"
        label="障害支援区分の認定有効期間"
      >
        <div className={props.classes.innerItem}>
          <FormikSelectDateNotSelectedDefault
            name="recipientCertificate.careSupportAuthStartDate"
            label="認定開始日"
            required={true}
            style={{ marginBottom: 12 }}
            addYearTo={START_ADD_YEAR_TO}
            setFormikFieldValue={props.setFormikFieldValue}
          />
          <FormikSelectDateNotSelectedDefault
            name="recipientCertificate.careSupportAuthEndDate"
            label="認定終了日"
            required={true}
            addYearTo={END_ADD_YEAR_TO}
            setFormikFieldValue={props.setFormikFieldValue}
          />
        </div>
      </FormikSwitch>
      <FormikSwitch
        name="recipientCertificate.careSupportPaymentFlag"
        label="介護給付費の支給決定期間"
      >
        <div className={props.classes.innerItem}>
          <FormikSelectDateNotSelectedDefault
            name="recipientCertificate.careSupportPaymentStartDate"
            label="支給決定開始日"
            required={true}
            style={{ marginBottom: 12 }}
            addYearTo={START_ADD_YEAR_TO}
            setFormikFieldValue={props.setFormikFieldValue}
          />
          <FormikSelectDateNotSelectedDefault
            name="recipientCertificate.careSupportPaymentEndDate"
            label="支給決定終了日"
            required={true}
            addYearTo={END_ADD_YEAR_TO}
            setFormikFieldValue={props.setFormikFieldValue}
          />
        </div>
      </FormikSwitch>
      <PlanSupportPaymentFields
        setFormikFieldValue={props.setFormikFieldValue}
        startAddYearTo={START_ADD_YEAR_TO}
        endAddYearTo={END_ADD_YEAR_TO}
      />
      <FormikSwitch
        name="recipientCertificate.planSupportMonitorFlag"
        label="計画相談支援給付費のモニタリング期間"
        style={{ marginBottom: 0 }}
      >
        <div className={props.classes.innerItem}>
          <FormikSelectDateNotSelectedDefault
            name="recipientCertificate.planSupportMonitorStartDate"
            label="モニタリング開始日"
            required={true}
            style={{ marginBottom: 12 }}
            addYearTo={START_ADD_YEAR_TO}
            setFormikFieldValue={props.setFormikFieldValue}
          />
          <FormikSelectDateNotSelectedDefault
            name="recipientCertificate.planSupportMonitorEndDate"
            label="モニタリング終了日"
            required={true}
            style={{ marginBottom: 0 }}
            addYearTo={END_ADD_YEAR_TO}
            setFormikFieldValue={props.setFormikFieldValue}
          />
        </div>
      </FormikSwitch>
    </FormPaper>
  );
};

export default withStyles(styles)(RecipientCertificateFields);
