import * as React from "react";
import { FormikProps } from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikPostalCode from "@components/molecules/FormikPostalCode";
import FormikAddress from "@components/molecules/FormikAddress";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import OfficeField from "@components/organisms/mgr/common/Facility/items/OfficeField";
import ServiceTypeField from "@components/organisms/mgr/common/Facility/items/ServiceTypeField";
import FacilityTypeField from "@components/organisms/mgr/common/Facility/items/FacilityTypeField";
import {
  SUPPLY_PICKUP_SERVICE_ITEMS,
  SEIKATSUKAIGO_TYPE_LIST
} from "@constants/mgr/SEIKATSUKAIGO/variables";
import { Typography } from "@material-ui/core";
import FormikSelect from "@components/molecules/FormikSelect";
import { FacilityValues } from "@initialize/mgr/SEIKATSUKAIGO/facility/initialValues";

interface Props {
  isFetchDone: boolean;
  serviceType: string;
  facilityType: number;
  formikProps: FormikProps<FacilityValues>;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

interface State {
  shouldFirstSetup: boolean;
  masterSubordinateFlg: boolean;
}

class BasicFields extends React.Component<Props, State> {
  public static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State
  ): State | null {
    // fetch完了後の初期か処理だけ行う
    if (!prevState.shouldFirstSetup || !nextProps.isFetchDone) return null;

    const { basic } = nextProps.formikProps.values;
    return {
      shouldFirstSetup: false,
      masterSubordinateFlg: basic.masterSubordinateFlg
    };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      shouldFirstSetup: true,
      masterSubordinateFlg: this.props.formikProps.values.basic
        .masterSubordinateFlg
    };
  }

  /**
   * 主従たる事業所の値が変更されたら、checkboxの値を更新
   */
  private onChangeMasterSubordinateFlg = (): void => {
    // 主従たる事業所のcheckboxがONからOFFになるときラジオボタンを初期化
    if (
      this.state.masterSubordinateFlg &&
      this.props.formikProps.values.basic.masterFlg === "0"
    ) {
      this.props.setFormikFieldValue("basic.masterFlg", "1");
    }

    this.props.setFormikFieldValue(
      "basic.masterSubordinateFlg",
      !this.state.masterSubordinateFlg
    );
    const stateMasterSubordinateFlg = this.state.masterSubordinateFlg;
    this.setState({ masterSubordinateFlg: !stateMasterSubordinateFlg });
  };

  public render(): JSX.Element {
    return (
      <FormPaper>
        <div style={{ marginBottom: 32 }}>
          <SectionTitle label="基本情報" />
        </div>
        <FormikTextField
          name="basic.corporationName"
          label="法人名"
          required
          placeholder="株式会社ノウビー"
          maxLength={255}
          size="superLong"
        />
        <OfficeField />
        <FormGroup row>
          <ServiceTypeField serviceType={this.props.serviceType} />
          <FacilityTypeField
            facilityType={`${this.props.facilityType}`}
            facilityTypeList={SEIKATSUKAIGO_TYPE_LIST}
          />
        </FormGroup>
        <FormikTextField
          name="basic.representativeName"
          label="代表職員氏名"
          required
          placeholder="山田太郎"
          maxLength={20}
          size="superLong"
        />
        <FormikTextField
          name="basic.capacity"
          label="利用定員数"
          placeholder="0"
          required
          maxLength={10}
          endAdornmentLabel="名"
        />
        <FormGroup>
          <FormikCheckbox
            name="basic.masterSubordinateFlg"
            label="主従たる事業所（一体的な運営を行なっている）"
            onChange={this.onChangeMasterSubordinateFlg}
            tooltip={(
              <HelpToolTip
                title={
                  <HelpTipMessages name="satelliteTypeFlagSEIKATSUKAIGO" />
                }
              />
            )}
          />
          {this.props.formikProps.values.basic.masterSubordinateFlg && (
            <FormikRadioButtons
              name="basic.masterFlg"
              label=""
              options={[
                { label: "主たる事業所", value: "1", disabled: false },
                {
                  label: "従たる事業所",
                  value: "0",
                  disabled: this.props.formikProps.values.basic
                    .multiFunctionOfficeFlag
                }
              ]}
              style={{ marginTop: -20, marginLeft: 32, display: "inline" }}
            />
          )}
        </FormGroup>
        <FormGroup>
          <FormikCheckbox
            name="basic.multiFunctionOfficeFlag"
            label="多機能型事業所"
            disabled={
              this.props.formikProps.values.basic.masterSubordinateFlg &&
              this.props.formikProps.values.basic.masterFlg === "0"
            }
          />
          {this.props.formikProps.values.basic.multiFunctionOfficeFlag && (
            <FormikTextField
              name="basic.allCapacity"
              label="総利用定員数"
              required
              placeholder="0"
              endAdornmentLabel="人"
              style={{ marginTop: -20, marginLeft: 32 }}
            />
          )}
        </FormGroup>
        <FormikPostalCode
          name="basic.postalCode"
          label="郵便番号"
          required
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
          required
          size="superLong"
        />
        <FormikTextField
          name="basic.tel"
          type="tel"
          label="電話番号"
          maxLength={12}
          required
          placeholder="0000000000"
        />
        <Typography>実施オプションサービス</Typography>
        <FormGroup style={{ paddingTop: 17, paddingLeft: 17 }}>
          <FormikCheckbox
            name="basic.mealSaservedServiceFlag"
            label="食事提供サービス"
          />
          <FormikSwitch
            name="basic.transferServiceFlag"
            label="送迎サービス"
            style={{ marginBottom: 0 }}
          >
            <FormikSelect
              name="basic.transferServiceType"
              label=""
              options={SUPPLY_PICKUP_SERVICE_ITEMS}
              disabled={false}
              style={{ marginBottom: 0 }}
            />
            <FormikCheckbox
              name="basic.seriousSupporterFlg"
              label="送迎加算（重度）"
              style={{ marginTop: 14 }}
              tooltip={(
                <HelpToolTip
                  title={<HelpTipMessages name="seriousSupporterFlg" />}
                />
              )}
            />
          </FormikSwitch>
        </FormGroup>
      </FormPaper>
    );
  }
}

export default BasicFields;
