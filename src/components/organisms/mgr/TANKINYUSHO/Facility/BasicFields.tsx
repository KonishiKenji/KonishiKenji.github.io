import * as React from "react";
import { FormikProps } from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikPostalCode from "@components/molecules/FormikPostalCode";
import FormikAddress from "@components/molecules/FormikAddress";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import OfficeField from "@components/organisms/mgr/common/Facility/items/OfficeField";
import ServiceTypeField from "@components/organisms/mgr/common/Facility/items/ServiceTypeField";
import { FacilityValues } from "@initialize/mgr/TANKINYUSHO/facility/initialValues";
import {
  FACILITY_TYPE_ITEMS,
  MEDICAL_TYPE_ITEMS,
  MEDICAL_SPECIFIC_TYPE_ITEMS
} from "@constants/mgr/TANKINYUSHO/variables";
import { OptionInterface } from "@components/atoms/DropDown";
import { withStyles, WithStyles, createStyles } from "@material-ui/core";

const styles = () =>
  createStyles({
    section: {
      marginBottom: 32
    }
  });

interface OwnProps {
  isFetchDone: boolean;
  serviceType: string;
  formikProps: FormikProps<FacilityValues>;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

interface State {
  shouldFirstSetup: boolean;
  showMedicalType: boolean;
  medicalTypeCase: OptionInterface[];
  masterSubordinateFlg: boolean;
}

class BasicFields extends React.Component<Props, State> {
  public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    // fetch完了後の初期か処理だけ行う
    if (!prevState.shouldFirstSetup || !nextProps.isFetchDone) return null;

    const basic = nextProps.formikProps.values.basic;
    const isShowMedicalType =
      basic.facilityType === "1" || basic.facilityType === "2";
    const medicalTypeList =
      basic.facilityType === "2"
        ? MEDICAL_SPECIFIC_TYPE_ITEMS
        : MEDICAL_TYPE_ITEMS;
    return {
      shouldFirstSetup: false,
      showMedicalType: isShowMedicalType,
      medicalTypeCase: medicalTypeList,
      masterSubordinateFlg: basic.masterSubordinateFlg
    };
  }

  public state = {
    shouldFirstSetup: true,
    showMedicalType: false,
    medicalTypeCase: MEDICAL_TYPE_ITEMS,
    masterSubordinateFlg: this.props.formikProps.values.basic
      .masterSubordinateFlg
  };

  public render() {
    return (
      <FormPaper>
        <div className={this.props.classes.section}>
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
        <ServiceTypeField serviceType={this.props.serviceType} />
        <FormGroup row={true}>
          <FormikSelect
            name="basic.facilityType"
            label="施設タイプ"
            required={true}
            options={FACILITY_TYPE_ITEMS}
            onChangeHook={this.onChangeFacilityTypeHook}
            displayEmpty={true}
          />
          {this.state.showMedicalType && (
            <FormikSelect
              name="basic.medicalType"
              label="医療施設タイプ"
              required={true}
              options={this.state.medicalTypeCase}
              style={{ width: 272 }}
            />
          )}
        </FormGroup>
        <FormikTextField
          name="basic.representativeName"
          label="代表職員氏名"
          required={true}
          placeholder="山田太郎"
          maxLength={20}
          size="superLong"
        />
        <FormikTextField
          name="basic.capacity"
          label="利用定員数"
          placeholder="0"
          required={true}
          maxLength={10}
          endAdornmentLabel="名"
        />
        <FormGroup>
          <FormikCheckbox
            name="basic.masterSubordinateFlg"
            label="主従たる事業所（一体的な運営を行なっている）"
            onChange={this.onChangeMasterSubordinateFlg}
            tooltip={
              <HelpToolTip
                title={<HelpTipMessages name="masterSubordinateFlag" />}
              />
            }
          />
          {this.props.formikProps.values.basic.masterSubordinateFlg && (
            <FormikRadioButtons
              name="basic.isMasterRadioValue"
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
              this.props.formikProps.values.basic.isMasterRadioValue === "0"
            }
          />
          {this.props.formikProps.values.basic.multiFunctionOfficeFlag && (
            <FormikTextField
              name="basic.allCapacity"
              label="総利用定員数"
              required={true}
              placeholder="0"
              endAdornmentLabel="人"
              style={{ marginTop: -20, marginLeft: 32 }}
            />
          )}
        </FormGroup>
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
          maxLength={12}
          required={true}
          placeholder="0000000000"
        />
      </FormPaper>
    );
  }

  /**
   * 施設タイプの値によって、医療施設タイプのセレクトリストを変更
   * 施設タイプが1か2の時、医療施設タイプを表示
   */
  private onChangeFacilityTypeHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    const medicalTypeList =
      value === "2" ? MEDICAL_SPECIFIC_TYPE_ITEMS : MEDICAL_TYPE_ITEMS;
    this.setState({
      showMedicalType: value === "1" || value === "2",
      medicalTypeCase: medicalTypeList
    });
    this.props.setFormikFieldValue("basic.medicalType", "0");
  };

  /**
   * 主従たる事業所の値が変更されたら、checkboxの値を更新
   */
  private onChangeMasterSubordinateFlg = () => {
    // 主従たる事業所のcheckboxがONからOFFになるときラジオボタンを初期化
    if (
      this.state.masterSubordinateFlg &&
      this.props.formikProps.values.basic.isMasterRadioValue === "0"
    ) {
      this.props.setFormikFieldValue("basic.isMasterRadioValue", "1");
    }

    this.props.setFormikFieldValue(
      "basic.masterSubordinateFlg",
      !this.state.masterSubordinateFlg
    );
    this.setState({ masterSubordinateFlg: !this.state.masterSubordinateFlg });
  };
}

export default withStyles(styles)(BasicFields);
