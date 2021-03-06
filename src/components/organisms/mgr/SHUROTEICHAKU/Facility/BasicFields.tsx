import * as React from "react";
import { FormikProps } from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikPostalCode from "@components/molecules/FormikPostalCode";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikAddress from "@components/molecules/FormikAddress";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import OfficeField from "@components/organisms/mgr/common/Facility/items/OfficeField";
import ServiceTypeField from "@components/organisms/mgr/common/Facility/items/ServiceTypeField";
import { FacilityValues } from "@initialize/mgr/SHUROTEICHAKU/facility/initialValues";
import { withStyles, WithStyles, createStyles } from "@material-ui/core";

const styles = () =>
  createStyles({
    required: {
      marginLeft: 4
    },
    helpMark: {
      marginLeft: 16,
      verticalAlign: "sub"
    },
    labelWrap: {
      position: "relative"
    },
    label: {
      position: "absolute",
      top: -5,
      left: 50
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
  masterSubordinateFlg: boolean;
}

class BasicFields extends React.Component<Props, State> {
  public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    // fetch完了後の初期か処理だけ行う
    if (!prevState.shouldFirstSetup || !nextProps.isFetchDone) return null;

    const basic = nextProps.formikProps.values.basic;
    return {
      shouldFirstSetup: false,
      masterSubordinateFlg: basic.masterSubordinateFlg
    };
  }

  public state = {
    shouldFirstSetup: true,
    masterSubordinateFlg: this.props.formikProps.values.basic
      .masterSubordinateFlg
  };

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
        <ServiceTypeField serviceType={this.props.serviceType} />
        <FormikTextField
          name="basic.representativeName"
          label="代表職員氏名"
          required={true}
          placeholder="山田太郎"
          maxLength={20}
        />
        <FormGroup>
          <FormikCheckbox
            name="basic.masterSubordinateFlg"
            label="主従たる事業所（一体的な運営を行なっている）"
            onChange={this.onChangeMasterSubordinateFlg}
            tooltip={
              <HelpToolTip
                title={
                  <HelpTipMessages name="satelliteTypeFlagSHUROTEICHAKU" />
                }
              />
            }
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
        <div className={this.props.classes.labelWrap}>
          <FormikTextField
            name="basic.numberOfUsers"
            label="利用者数"
            required={true}
            placeholder="0"
            maxLength={10}
            endAdornmentLabel="名"
          />
          <div className={this.props.classes.label}>
            <span className={this.props.classes.helpMark}>
              <HelpToolTip title={<HelpTipMessages name="numberOfUsers" />} />
            </span>
          </div>
        </div>
      </FormPaper>
    );
  }

  /**
   * 主従たる事業所の値が変更されたら、checkboxの値を更新
   */
  private onChangeMasterSubordinateFlg = () => {
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
    this.setState({ masterSubordinateFlg: !this.state.masterSubordinateFlg });
  };
}

export default withStyles(styles)(BasicFields);
