import * as React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import { WithStyles, withStyles, createStyles } from "@material-ui/core";
import FormPaper from "@components/atoms/FormPaper";
import FormikTextField from "@components/molecules/FormikTextField";
import SectionTitle from "@components/atoms/SectionTitle";
import { FacilityType } from "@constants/variables";

const styles = () =>
  createStyles({
    description: {
      marginBottom: 28,
      color: "#37474f"
    },
    descriptionCaution: {
      fontSize: 12
    },
    formGroup: {
      "& > div:last-child": {
        marginBottom: 0
      },
      "& > div label": {
        color: "#37474f"
      },
      "& > div p": {
        color: "rgba(0, 0, 0, 0.87)"
      }
    }
  });

interface OwnProps {
  serviceType: FacilityType;
}

type Props = OwnProps & WithStyles<typeof styles>;

const PastUsageFields: React.FC<Props> = (props) => {
  return (
    <FormPaper>
      <div>
        <SectionTitle label="過去３ヶ月間の利用実績" />
      </div>
      <p className={props.classes.description}>
        上記初回請求月の過去３ヶ月間の延べ利用者数を入力してください。
        <br />
        <span className={props.classes.descriptionCaution}>
          {props.serviceType === FacilityType.IKOU
            ? "※延べ利用者数には、「通所」、「移行準備支援体制(Ⅰ)」のサービスを提供した利用者の合計人数を入力してください。"
            : "※述べ利用者数には、「通所」、「施設外支援」のサービスを提供した利用者の合計人数を入力してください。"}
        </span>
      </p>
      <FormGroup className={props.classes.formGroup}>
        <FormikTextField
          name="initialData.facility.total_number_of_users_1_month_before"
          label="１ヶ月前　延べ利用者数"
          endAdornmentLabel="人"
          maxLength={12}
        />
        <FormikTextField
          name="initialData.facility.total_number_of_users_2_month_before"
          label="２ヶ月前　延べ利用者数"
          endAdornmentLabel="人"
          maxLength={12}
        />
        <FormikTextField
          name="initialData.facility.total_number_of_users_3_month_before"
          label="３ヶ月前　延べ利用者数"
          endAdornmentLabel="人"
          maxLength={12}
        />
      </FormGroup>
    </FormPaper>
  );
};

export default withStyles(styles)(PastUsageFields);
