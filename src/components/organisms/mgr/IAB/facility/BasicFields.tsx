import * as React from "react";
import { FormikProps, getIn } from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import MuiTextField from "@components/molecules/MuiTextField";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikPostalCode from "@components/molecules/FormikPostalCode";
import FormikAddress from "@components/molecules/FormikAddress";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import { getLabelFromOptions } from "@utils/dataNormalizer";
import { FACILITY_TYPE_NAME_LIST, FacilityType } from "@constants/variables";
import {
  SUPPLY_PICKUP_SERVICE_ITEMS,
  BEAR_UNIT_ITEMS
} from "@constants/mgr/IAB/variables";
import { Typography } from "@material-ui/core";
import FormikSelect from "@components/molecules/FormikSelect";
import { FacilityValues } from "@initialize/mgr/IAB/facility/initialValues";

interface Props {
  isFetchDone: boolean;
  formikProps: FormikProps<FacilityValues>;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

interface State {
  shouldFirstSetup: boolean;
  serviceTypeLabel: string;
  masterSubordinateFlg: boolean;
  showLoadReductionPercent: boolean;
}

class BasicFields extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shouldFirstSetup: true,
      serviceTypeLabel: "",
      showLoadReductionPercent: true,
      masterSubordinateFlg: this.props.formikProps.values.basic
        .masterSubordinateFlg
    };
  }

  public static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State
  ): object | null {
    // fetch完了後の初期か処理だけ行う
    if (!prevState.shouldFirstSetup || !nextProps.isFetchDone) return null;

    const { basic } = nextProps.formikProps.values;
    // サービス種類
    const serviceTypeLabel = getLabelFromOptions(
      basic.serviceType,
      FACILITY_TYPE_NAME_LIST
    );
    return {
      serviceTypeLabel,
      shouldFirstSetup: false,
      showLoadReductionPercent: basic.loadReductionType === "1",
      masterSubordinateFlg: basic.masterSubordinateFlg
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
    this.setState((prevState) => {
      return { masterSubordinateFlg: !prevState.masterSubordinateFlg };
    });
  };

  // 【A型事業者負担減免措置実施】スイッチOFF時に紐付く値を空欄/指定値に変更する
  private onChangeLoadReduction = (): void => {
    if (
      getIn(
        this.props.formikProps.values,
        "basic.aExecuteMeasuresForLoadReductionFlag"
      )
    ) {
      this.props.setFormikFieldValue(
        "basic.aExecuteMeasuresForLoadReductionFlag",
        false
      );
      this.props.setFormikFieldValue("basic.percentOfLoadReduction", "");
      this.props.setFormikFieldValue("basic.yenOfLoadReduction", "");
      this.props.setFormikFieldValue("basic.loadReductionType", "1");
    } else {
      this.props.setFormikFieldValue(
        "basic.aExecuteMeasuresForLoadReductionFlag",
        true
      );
    }
  };

  // 【A型事業者負担減免措置実施_負担】負担率（％） <=> 負担額（円）
  private onChangeSubsidizedUnitHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { value } = e.target;
    this.setState({ showLoadReductionPercent: value === "1" });
  };

  // 【多機能型事業所】スイッチOFF時に紐付く値を空欄/指定値に変更する
  private onChangeMultiFunctionOffice = (): void => {
    if (getIn(this.props.formikProps.values, "basic.multiFunctionOfficeFlag")) {
      this.props.setFormikFieldValue("basic.multiFunctionOfficeFlag", false);
      this.props.setFormikFieldValue("basic.allCapacity", "");
    } else {
      this.props.setFormikFieldValue("basic.multiFunctionOfficeFlag", true);
    }
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
          placeholder="株式会社ノウビー"
          maxLength={255}
          size="superLong"
        />
        <FormGroup row>
          <FormikTextField
            name="basic.officeNumber"
            label="事業所番号"
            placeholder="1234567890"
            maxLength={10}
            disabled
          />
          <FormikTextField
            name="basic.officeName"
            label="事業所名"
            placeholder="ノウビー"
            maxLength={255}
            size="halfSuperLong"
          />
        </FormGroup>
        <FormGroup row>
          <MuiTextField
            value={this.state.serviceTypeLabel}
            label="サービス種類"
            disabled
          />
        </FormGroup>
        <FormikTextField
          name="basic.representativeName"
          label="代表職員氏名"
          placeholder="山田太郎"
          maxLength={20}
          size="superLong"
        />
        <FormikTextField
          name="basic.capacity"
          label="利用定員数"
          placeholder="0"
          maxLength={10}
          endAdornmentLabel="名"
        />
        <FormGroup>
          <FormikSwitch
            name="basic.masterSubordinateFlg"
            label="主従たる事業所"
            onChange={this.onChangeMasterSubordinateFlg}
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
          <FormikSwitch
            name="basic.multiFunctionOfficeFlag"
            label="多機能型事業所"
            disabled={
              this.props.formikProps.values.basic.masterSubordinateFlg &&
              this.props.formikProps.values.basic.masterFlg === "0"
            }
            onChange={this.onChangeMultiFunctionOffice}
          />
          {this.props.formikProps.values.basic.multiFunctionOfficeFlag && (
            <FormikTextField
              name="basic.allCapacity"
              label="総利用定員数"
              placeholder="0"
              endAdornmentLabel="人"
              style={{ marginTop: -20, marginLeft: 32 }}
            />
          )}
        </FormGroup>
        <FormikPostalCode
          name="basic.postalCode"
          label="郵便番号"
          placeholder="000-0000"
          maxLength={8}
          startAdornmentLabel="〒"
        />
        <FormikAddress
          prefectureIdName="basic.prefectureId"
          cityIdName="basic.cityId"
          formikProps={this.props.formikProps}
          required={false}
        />
        <FormikTextField
          name="basic.restAddress"
          label="市区町村以降の住所"
          size="superLong"
        />
        <FormikTextField
          name="basic.tel"
          type="tel"
          label="電話番号"
          maxLength={12}
          placeholder="0000000000"
          helperText="ハイフンなしで入力"
        />
        {this.props.formikProps.values.basic.serviceType === FacilityType.A && (
          <FormikSwitch
            name="basic.aExecuteMeasuresForLoadReductionFlag"
            label="A型事業者負担減免措置実施"
            onChange={this.onChangeLoadReduction}
          >
            <FormGroup row style={{ marginLeft: -30, height: 58 }}>
              {this.state.showLoadReductionPercent && (
                <FormikTextField
                  name="basic.percentOfLoadReduction"
                  label="負担"
                  maxLength={6}
                  placeholder="0"
                />
              )}
              {!this.state.showLoadReductionPercent && (
                <FormikTextField
                  name="basic.yenOfLoadReduction"
                  label="負担"
                  maxLength={6}
                  placeholder="0"
                />
              )}
              <FormikSelect
                name="basic.loadReductionType"
                label="単位"
                options={BEAR_UNIT_ITEMS}
                disabled={false}
                onChangeHook={this.onChangeSubsidizedUnitHook}
              />
            </FormGroup>
          </FormikSwitch>
        )}
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
          </FormikSwitch>
        </FormGroup>
      </FormPaper>
    );
  }
}
export default BasicFields;
