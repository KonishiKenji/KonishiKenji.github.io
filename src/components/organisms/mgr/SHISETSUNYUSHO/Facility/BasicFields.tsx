import * as React from "react";
import {
  createStyles,
  WithStyles,
  withStyles,
  Typography
} from "@material-ui/core";
import { FormikProps } from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikPostalCode from "@components/molecules/FormikPostalCode";
import FormikAddress from "@components/molecules/FormikAddress";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import OfficeField from "@components/organisms/mgr/common/Facility/items/OfficeField";
import ServiceTypeField from "@components/organisms/mgr/common/Facility/items/ServiceTypeField";
import { FacilityValues } from "@initialize/mgr/SHISETSUNYUSHO/facility/initialValues";
import {
  FOOD_EXPENSES_TYPE_LIST,
  UTILITY_TYPE_LIST,
  foodExpenses,
  utility
} from "@constants/mgr/SHISETSUNYUSHO/variables";

const styles = () =>
  createStyles({
    perFood: {
      marginBottom: 0,
      marginTop: 43,
      marginLeft: 16
    },
    perDay: {
      marginBottom: 0,
      marginTop: 75,
      marginLeft: 16
    },
    utilityCostsOfDay: {
      marginBottom: 0,
      marginTop: 32,
      marginLeft: 32
    },
    utilityCostsOfMonth: {
      marginBottom: 0,
      marginTop: 64,
      marginLeft: 32
    },
    foodExpenses: {
      marginLeft: -25
    },
    utility: {
      marginTop: -10,
      marginBottom: -35
    },
    section: {
      marginBottom: 32
    },
    food: {
      paddingTop: 17,
      paddingLeft: 17
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
  showPerFood: boolean;
  showPerDay: boolean;
  showUtilityCosts: boolean;
  utilityCostsStyle: string;
  masterSubordinateFlg: boolean;
}

class BasicFields extends React.Component<Props, State> {
  public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    // fetch完了後の初期化処理だけ行う
    if (!prevState.shouldFirstSetup || !nextProps.isFetchDone) return null;

    const basic = nextProps.formikProps.values.basic;
    const costsStyle =
      basic.utility === utility.PER_MONTH
        ? nextProps.classes.utilityCostsOfMonth
        : nextProps.classes.utilityCostsOfDay;

    return {
      shouldFirstSetup: false,
      showPerFood: basic.foodExpenses === foodExpenses.PER_FOOD,
      showPerDay: basic.foodExpenses === foodExpenses.PER_DAY,
      showUtilityCosts:
        basic.utility === utility.PER_DAY ||
        basic.utility === utility.PER_MONTH,
      utilityCostsStyle: costsStyle,
      masterSubordinateFlg: basic.masterSubordinateFlg
    };
  }

  public state = {
    shouldFirstSetup: true,
    showPerFood: false,
    showPerDay: false,
    showUtilityCosts: false,
    utilityCostsStyle: this.props.classes.utilityCostsOfDay,
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
                    .multiFunctionOfficeFlg
                }
              ]}
              style={{ marginTop: -20, marginLeft: 32, display: "inline" }}
            />
          )}
        </FormGroup>
        <FormGroup>
          <FormikCheckbox
            name="basic.multiFunctionOfficeFlg"
            label="多機能型事業所"
            disabled={
              this.props.formikProps.values.basic.masterSubordinateFlg &&
              this.props.formikProps.values.basic.isMasterRadioValue === "0"
            }
          />
          {this.props.formikProps.values.basic.multiFunctionOfficeFlg && (
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
        <Typography>実施オプションサービス</Typography>
        <FormGroup className={this.props.classes.food}>
          <FormikSwitch name="basic.availableFood" label="食事提供サービス">
            <FormGroup row={true}>
              <div className={this.props.classes.foodExpenses}>
                <FormikRadioButtons
                  name="basic.foodExpenses"
                  label="食事単価"
                  options={FOOD_EXPENSES_TYPE_LIST}
                  onChangeHook={this.onChangeFoodExpenses}
                  style={{ marginBottom: 10 }}
                />
              </div>
              {this.state.showPerFood && (
                <FormikTextField
                  name="basic.foodExpensesBreakfast"
                  label="朝食"
                  maxLength={6}
                  required={true}
                  size="smallMedium"
                  placeholder="0"
                  className={this.props.classes.perFood}
                  style={{ marginBottom: 0 }}
                />
              )}
              {this.state.showPerFood && (
                <FormikTextField
                  name="basic.foodExpensesLunch"
                  label="昼食"
                  maxLength={6}
                  required={true}
                  size="smallMedium"
                  placeholder="0"
                  className={this.props.classes.perFood}
                  style={{ marginBottom: 0 }}
                />
              )}
              {this.state.showPerFood && (
                <FormikTextField
                  name="basic.foodExpensesSupper"
                  label="夕食"
                  maxLength={6}
                  required={true}
                  size="smallMedium"
                  placeholder="0"
                  className={this.props.classes.perFood}
                  style={{ marginBottom: 0 }}
                />
              )}
              {this.state.showPerDay && (
                <FormikTextField
                  name="basic.foodExpensesDay"
                  label="１日"
                  maxLength={6}
                  required={true}
                  size="smallMedium"
                  placeholder="0"
                  className={this.props.classes.perDay}
                  style={{ marginBottom: 0 }}
                />
              )}
            </FormGroup>
          </FormikSwitch>
        </FormGroup>
        <FormGroup row={true}>
          <div className={this.props.classes.utility}>
            <FormikRadioButtons
              name="basic.utility"
              label="光熱水費"
              options={UTILITY_TYPE_LIST}
              onChangeHook={this.onChangeUtility}
            />
          </div>
          {this.state.showUtilityCosts && (
            <FormikTextField
              name="basic.utilityCosts"
              label="単価"
              maxLength={6}
              required={true}
              size="smallMedium"
              placeholder="0"
              className={this.state.utilityCostsStyle}
              style={{ marginBottom: 0 }}
            />
          )}
        </FormGroup>
      </FormPaper>
    );
  }

  /**
   * 食事単価が1の時、朝食・昼食・夕食を表示
   * 食事単価が2の時、1日を表示
   */
  private onChangeFoodExpenses = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({
      showPerFood: value === foodExpenses.PER_FOOD,
      showPerDay: value === foodExpenses.PER_DAY
    });
  };

  /**
   * 光熱水費が1か2の時、単価を表示
   * styleを差し替え
   */
  private onChangeUtility = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let utilityCostsStyleType = "";

    if (value === utility.PER_DAY) {
      utilityCostsStyleType = this.props.classes.utilityCostsOfDay;
    } else if (value === utility.PER_MONTH) {
      utilityCostsStyleType = this.props.classes.utilityCostsOfMonth;
    }
    this.setState({
      showUtilityCosts:
        value === utility.PER_DAY || value === utility.PER_MONTH,
      utilityCostsStyle: utilityCostsStyleType
    });
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
