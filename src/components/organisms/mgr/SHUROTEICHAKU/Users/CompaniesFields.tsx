import * as React from "react";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikSelectDateNotSelectedDefault from "@components/molecules/FormikSelectDateNotSelectedDefault";
import { STAFF_RELATIONSHIP_ITEMS } from "@constants/mgr/SHUROTEICHAKU/variables";
import { FormikProps } from "formik";
import { UsersValues } from "@initialize/mgr/SHUROTEICHAKU/users/initialValues";

interface OwnProps {
  formikProps: FormikProps<UsersValues>;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

type Props = OwnProps;

const CompaniesFields: React.FunctionComponent<Props> = props => {
  const startAddYearTo = 1;
  const staffs = [];
  const companyPersons =
    props.formikProps.initialValues.companies.companyPersons;
  for (let i = 0; i < companyPersons.length; i += 1) {
    staffs.push(
      <FormikSwitch
        name={`companies.companyPersons[${i}].flg`}
        label={`担当者（${i + 1}）`}
      >
        <FormikTextField
          name={`companies.companyPersons[${i}].name`}
          label="氏名"
          maxLength={255}
        />
        <FormikTextField
          name={`companies.companyPersons[${i}].position`}
          label="役職"
          maxLength={255}
        />
        <FormikTextField
          name={`companies.companyPersons[${i}].department`}
          label="所属部署"
          maxLength={255}
        />
        <FormikSelect
          name={`companies.companyPersons[${i}].relationship`}
          label="関係性"
          options={STAFF_RELATIONSHIP_ITEMS}
        />
        <FormikTextField
          name={`companies.companyPersons[${i}].tel`}
          label="電話番号"
          maxLength={12}
        />
        <FormikTextField
          name={`companies.companyPersons[${i}].email`}
          label="メールアドレス"
          maxLength={255}
        />
      </FormikSwitch>
    );
  }
  return (
    <FormPaper>
      <div style={{ marginBottom: 32 }}>
        <SectionTitle label="就職先情報" />
      </div>
      <FormikTextField
        name="companies.name"
        label="企業名"
        maxLength={255}
        size="long"
      />
      <FormikTextField
        name="companies.overview"
        label="企業概要"
        maxLength={1000}
        size="superLong"
      />
      <FormikTextField
        name="companies.address"
        label="住所"
        maxLength={1000}
        size="superLong"
      />
      <FormikSelectDateNotSelectedDefault
        name="companies.workingStartDate"
        label="就労開始年月日"
        addYearTo={startAddYearTo}
        setFormikFieldValue={props.setFormikFieldValue}
      />
      <FormikTextField
        name="companies.department"
        label="所属部署"
        maxLength={255}
        size="superLong"
      />
      <div>{staffs}</div>
      <FormikTextField
        name="companies.remarks"
        label="備考"
        maxLength={1000}
        size="superLong"
      />
    </FormPaper>
  );
};

export default CompaniesFields;
