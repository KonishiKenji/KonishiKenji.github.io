import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { FormikProps } from "formik";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikPostalCode from "@components/molecules/FormikPostalCode";
import FormikAddress from "@components/molecules/FormikAddress";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import FormikSelectDateNotSelectedDefault from "@components/molecules/FormikSelectDateNotSelectedDefault";
import { UsersValues } from "@initialize/mgr/SHISETSUNYUSHO/users/initialValues";

const styles = () =>
  createStyles({
    checkboxContainer: {
      display: "flex",
      flexWrap: "wrap",
      width: 480,
      marginTop: 6,
      marginBottom: 20,
      marginLeft: 16,
      "& > div": {
        width: 160,
        marginBottom: 0
      }
    },
    section: {
      marginBottom: 32
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

const BasicFields: React.FunctionComponent<Props> = props => {
  return (
    <FormPaper>
      <div className={props.classes.section}>
        <SectionTitle label="基本情報" />
      </div>
      <FormGroup row={true}>
        <FormikTextField
          name="basic.nameSei"
          label="名前"
          required={true}
          placeholder="山田"
          maxLength={255}
          size="medium"
        />
        <FormikTextField
          name="basic.nameMei"
          required={true}
          placeholder="太郎"
          maxLength={255}
          size="medium"
          style={{ paddingTop: 16 }}
        />
      </FormGroup>
      <FormGroup row={true}>
        <FormikTextField
          name="basic.nameSeiKana"
          label="フリガナ"
          required={true}
          placeholder="ヤマダ"
          maxLength={255}
          size="medium"
        />
        <FormikTextField
          name="basic.nameMeiKana"
          required={true}
          placeholder="タロウ"
          maxLength={255}
          size="medium"
          style={{ paddingTop: 16 }}
        />
      </FormGroup>
      <FormikTextField
        name="basic.recipientNumber"
        label="受給者証番号"
        required={true}
        placeholder="0000000000"
        maxLength={10}
        size="medium"
        style={{ marginBottom: 12 }}
      />
      <FormikCheckbox
        name="basic.noneRecipientNumberFlag"
        label="受給者証未発行もしくは見学中の利用者"
      />
      <Typography>障害種別（複数選択可）</Typography>
      <div className={props.classes.checkboxContainer}>
        <FormikCheckbox name="basic.classifyPhysicalFlag" label="身体障害" />
        <FormikCheckbox
          name="basic.classifyIntelligenceFlag"
          label="知的障害"
        />
        <FormikCheckbox name="basic.classifyMindFlag" label="精神障害" />
        <FormikCheckbox name="basic.classifyGrowthFlag" label="発達障害" />
        <FormikCheckbox name="basic.classifyBrainFlag" label="高次脳機能障害" />
        <FormikCheckbox
          name="basic.classifyIncurableFlag"
          label="難病等対象者"
        />
        <FormikCheckbox name="basic.classifyHandicappedFlag" label="障害児" />
      </div>
      <FormikRadioButtons
        name="basic.gender"
        label="性別"
        options={[
          {
            label: "男性",
            value: "1"
          },
          {
            label: "女性",
            value: "2"
          }
        ]}
      />
      <FormikSelectDateNotSelectedDefault
        name="basic.dateOfBirth"
        label="生年月日"
        required={true}
        setFormikFieldValue={props.setFormikFieldValue}
      />
      <FormikPostalCode
        name="basic.postalCode"
        label="郵便番号"
        required={true}
        placeholder="000-0000"
        maxLength={8}
        startAdornmentLabel="〒"
      />
      <FormikAddress
        prefectureIdName="basic.prefectureId"
        cityIdName="basic.cityId"
        formikProps={props.formikProps}
        showRegionType={false}
      />
      <FormikTextField
        name="basic.restAddress"
        label="市区町村以降の住所"
        required={true}
        size="superLong"
      />
      <FormikTextField
        name="basic.tel"
        type="tel"
        label="電話番号"
        placeholder="0000000000"
        helperText="ハイフンなしで入力"
        maxLength={12}
      />
      <FormikTextField
        name="basic.email"
        label="メールアドレス"
        size="superLong"
        helperText="半角英数字で入力"
        maxLength={255}
      />
      <FormGroup row={true}>
        <FormikTextField
          name="basic.guardianName"
          label="保護者氏名"
          maxLength={48}
        />
        <FormikTextField
          name="basic.guardianRelation"
          label="続柄"
          maxLength={12}
        />
      </FormGroup>
      <FormikTextField
        name="basic.guardianTel"
        label="緊急連絡先"
        placeholder="0000000000"
        helperText="ハイフンなしで入力"
        maxLength={12}
      />
      <FormikTextField
        name="basic.memo"
        label="備考"
        size="superLong"
        style={{ marginBottom: 0 }}
      />
    </FormPaper>
  );
};

export default withStyles(styles)(BasicFields);
