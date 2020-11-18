import * as React from "react";
import { FormikProps } from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikPostalCode from "@components/molecules/FormikPostalCode";
import FormikAddress from "@components/molecules/FormikAddress";
import OfficeField from "@components/organisms/mgr/common/Facility/items/OfficeField";
import ServiceTypeField from "@components/organisms/mgr/common/Facility/items/ServiceTypeField";
import FacilityTypeField from "@components/organisms/mgr/common/Facility/items/FacilityTypeField";
import UnitsFields from "@components/organisms/mgr/GroupHome/Facility/items/UnitsFields";
import { FacilityValues } from "@initialize/mgr/GroupHome/facility/initialValues";
import { FacilityType, GROUP_HOME_TYPE_LIST } from "@constants/variables";

interface Props {
  isFetchDone: boolean;
  serviceType: string;
  facilityType: number;
  formikProps: FormikProps<FacilityValues>;
}

class BasicFields extends React.Component<Props> {
  public render() {
    return (
      <FormPaper>
        <div style={{ marginBottom: 32 }}>
          <SectionTitle label="基本情報" />
        </div>
        <FormikTextField
          name="basic.corporationName"
          label="法人名"
          required={true}
          placeholder="株式会社ノウビー"
          maxLength={255}
          size="superLong"
        />
        <OfficeField />
        <FormGroup row={true}>
          <ServiceTypeField serviceType={this.props.serviceType} />
          <FacilityTypeField
            facilityType={`${this.props.facilityType}`}
            facilityTypeList={GROUP_HOME_TYPE_LIST}
          />
        </FormGroup>
        <FormikTextField
          name="basic.representativeName"
          label="代表職員氏名"
          required={true}
          placeholder="株式会社ノウビー"
          maxLength={20}
          size="long"
        />
        <FormikTextField
          name="basic.capacity"
          label="利用定員数"
          required={true}
          maxLength={10}
          endAdornmentLabel="名"
        />
        <FormGroup>
          {this.props.serviceType !== FacilityType.GROUP_HOME && (
            <FormikCheckbox
              name="basic.multiFunctionOfficeFlag"
              label="多機能型事業所として管理"
            />
          )}
        </FormGroup>
        <FormikSwitch
          name="basic.operatingUnitFlag"
          label="２つ以上のユニットを運営している"
        >
          <UnitsFields formikProps={this.props.formikProps} />
        </FormikSwitch>
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
          formikProps={this.props.formikProps}
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
          required={true}
          placeholder="0000000000"
          helperText="ハイフンなしで入力"
          style={{ marginBottom: 0 }}
        />
      </FormPaper>
    );
  }
}

export default BasicFields;
