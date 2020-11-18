import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import { FormikProps } from "formik";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import FormikSelectDateNotSelectedDefault from "@components/molecules/FormikSelectDateNotSelectedDefault";
import SubsidizedFields from "@components/organisms/mgr/common/Users/items/SubsidizedFields";
import { FacilityState } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/facility/types";
import { OptionInterface } from "@components/atoms/DropDown";
import {
  DISABILITY_CLASS_LIST,
  INCOME_KIND_TYPE_LIST,
  INCOME_KIND_LIST,
  UPLIMIT_CONT_ROLLED_BY_LIST,
  RESULT_OF_MANAGEMENT_LIST,
  SUPPLY_FOOD_SERVICE,
  SUPPLY_PICKUP_SERVICE,
  PICKUP_PREMISES_CASE_0,
  PICKUP_PREMISES_CASE_1,
  PICKUP_PREMISES_CASE_2,
  PICKUP_PREMISES_CASE_3,
  AGREED_BY_CONTRACT_LIST
} from "@constants/variables";
import { UsersValues } from "@initialize/mgr/JIRITSUKUNRENSEIKATSU/users/initialValues";

const styles = (): StyleRules =>
  createStyles({
    groupDate: {
      marginLeft: 16
    },
    fieldWrapper: {
      position: "relative"
    },
    fieldWrapperFoods: {
      position: "relative",
      marginTop: 20
    },
    incomeKindType: {
      position: "absolute",
      top: 22,
      left: 140
    },
    supplyPickupInSameSiteService: {
      position: "absolute",
      top: 83,
      left: 293
    },
    checkOption: {
      color: "#666666",
      fontSize: "1.1rem"
    },
    payDaysAgreed: {
      width: 213,
      marginLeft: 30
    },
    businessNumberContract: {
      width: 245
    },
    def: {
      marginBottom: -18
    },
    date: {
      marginBottom: 12
    }
  });

interface OwnProps {
  formikProps: FormikProps<UsersValues>;
  isFetchDone?: boolean;
  facility: FacilityState;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}
type Props = OwnProps & WithStyles<typeof styles>;

interface State {
  shouldFirstSetup: boolean;
  showIncomeKindType: boolean;
  showUpperLimitTotalYenAndUserLoadYen: boolean;
  showUpperLimitYen: boolean;
  showAgreedByContractFlg: boolean;
  pickupPremisesCase: OptionInterface[];
  showPickupPremises: boolean;
}

class ServiceUseFields extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shouldFirstSetup: true,
      showIncomeKindType: true,
      showUpperLimitTotalYenAndUserLoadYen: true,
      showUpperLimitYen: false,
      showAgreedByContractFlg: false,
      pickupPremisesCase: PICKUP_PREMISES_CASE_0,
      showPickupPremises: true
    };
  }

  public static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State
  ): State | null {
    if (!prevState.shouldFirstSetup || !nextProps.isFetchDone) {
      return null;
    }

    const { serviceUse } = nextProps.formikProps.values;
    let pickupPremisesList = PICKUP_PREMISES_CASE_0;
    switch (serviceUse.defPickup) {
      case "1":
        pickupPremisesList = PICKUP_PREMISES_CASE_1;
        break;
      case "2":
        pickupPremisesList = PICKUP_PREMISES_CASE_2;
        break;
      case "3":
        pickupPremisesList = PICKUP_PREMISES_CASE_3;
        break;
      default:
    }
    return {
      shouldFirstSetup: false,
      showIncomeKindType: serviceUse.incomeKind === "1",
      showUpperLimitTotalYenAndUserLoadYen:
        serviceUse.upperLimitControlledBy === "1",
      showUpperLimitYen: serviceUse.resultOfManagement === "3",
      showAgreedByContractFlg: serviceUse.agreedByContractFlg === "2",
      showPickupPremises: serviceUse.defPickup === "0",
      pickupPremisesCase: pickupPremisesList
    };
  }

  /**
   * 負担上限額が1の時、所得区分を表示
   */
  private onChangeIncomeKindHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { value } = e.target;
    this.setState({ showIncomeKindType: value === "1" });
  };

  /**
   * 契約支給量が選択されたら、日数と事業者記入欄番号を表示
   */
  private onChangeAgreedByContractHook = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    this.setState({ showAgreedByContractFlg: value === "2" });
  };

  /**
   * 送迎サービスデフォルトの値によって、同一敷地内のセレクトリストを変更
   */
  private onChangePickupPremisesHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { value } = e.target;
    let pickupPremisesList = PICKUP_PREMISES_CASE_0;
    switch (value) {
      case "1":
        pickupPremisesList = PICKUP_PREMISES_CASE_1;
        break;
      case "2":
        pickupPremisesList = PICKUP_PREMISES_CASE_2;
        break;
      case "3":
        pickupPremisesList = PICKUP_PREMISES_CASE_3;
        break;
      default:
    }
    this.setState({
      pickupPremisesCase: pickupPremisesList,
      showPickupPremises: value === "0"
    });
    this.props.setFormikFieldValue("serviceUse.pickupPremises", "0");
  };

  /**
   * 管理事業所が1の時、総費用額と利用者負担額を表示
   */
  private onChangeUpperLimitControlledBy = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { value } = e.target;
    this.setState({ showUpperLimitTotalYenAndUserLoadYen: value === "1" });
  };

  /**
   * 管理結果が3の時、自事業所調整上限額を表示
   */
  private onChangeResultOfManagement = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    this.setState({ showUpperLimitYen: value === "3" });
  };

  public render(): JSX.Element {
    const startAddYearTo = 1;
    const endAddYearTo = 5;
    return (
      <FormPaper>
        <div style={{ marginBottom: 32 }}>
          <SectionTitle label="サービス利用詳細" />
        </div>
        <Typography className={this.props.classes.date}>
          サービス提供期間
        </Typography>
        <div className={this.props.classes.groupDate}>
          <FormikSelectDateNotSelectedDefault
            name="serviceUse.inServiceStartDate"
            label="サービス提供開始日"
            required
            style={{ marginBottom: 12 }}
            addYearTo={startAddYearTo}
            setFormikFieldValue={this.props.setFormikFieldValue}
          />
          <FormikSelectDateNotSelectedDefault
            name="serviceUse.inServiceEndDate"
            label="サービス提供終了日"
            addYearTo={endAddYearTo}
            setFormikFieldValue={this.props.setFormikFieldValue}
          />
        </div>
        <Typography className={this.props.classes.date}>受給者証</Typography>
        <div className={this.props.classes.groupDate}>
          <FormikSelectDateNotSelectedDefault
            name="serviceUse.payStartDate"
            label="支給決定開始日 "
            required
            style={{ marginBottom: 12 }}
            addYearTo={startAddYearTo}
            setFormikFieldValue={this.props.setFormikFieldValue}
          />
          <FormikSelectDateNotSelectedDefault
            name="serviceUse.payEndDate"
            label="支給決定終了日"
            required
            addYearTo={endAddYearTo}
            setFormikFieldValue={this.props.setFormikFieldValue}
          />
        </div>
        <FormGroup>
          <div className={this.props.classes.fieldWrapper}>
            <FormikRadioButtons
              name="serviceUse.disabilityClass"
              label="障害区分"
              options={DISABILITY_CLASS_LIST}
            />
          </div>
          <div className={this.props.classes.fieldWrapper}>
            <FormikRadioButtons
              name="serviceUse.agreedByContractFlg"
              label="契約支給量"
              options={AGREED_BY_CONTRACT_LIST}
              onChangeHook={this.onChangeAgreedByContractHook}
            />
            <FormGroup row>
              {this.state.showAgreedByContractFlg && (
                <FormikTextField
                  className={this.props.classes.payDaysAgreed}
                  name="serviceUse.payDaysAgreed"
                  label="日数"
                  placeholder="00"
                  maxLength={2}
                  endAdornmentLabel="日"
                />
              )}
              {this.state.showAgreedByContractFlg && (
                <FormikTextField
                  className={this.props.classes.businessNumberContract}
                  name="serviceUse.businessNumberContract"
                  label="事業者記入欄番号"
                  placeholder="00"
                  maxLength={2}
                />
              )}
            </FormGroup>
          </div>
          <FormikCheckbox name="serviceUse.blindnessFlg" label="視覚障害" />
          <div className={this.props.classes.fieldWrapper}>
            <FormikRadioButtons
              name="serviceUse.incomeKind"
              label="負担上限額"
              options={INCOME_KIND_LIST}
              onChangeHook={this.onChangeIncomeKindHook}
            />
            <div className={this.props.classes.incomeKindType}>
              {this.state.showIncomeKindType && (
                <FormikSelect
                  name="serviceUse.incomeKindType"
                  label="所得区分"
                  options={INCOME_KIND_TYPE_LIST}
                />
              )}
            </div>
          </div>
        </FormGroup>
        <SubsidizedFields formikProps={this.props.formikProps} />
        <FormikSwitch
          name="serviceUse.upperLimitFacilityFlag"
          label="上限管理事業所あり"
        >
          <FormikSelect
            name="serviceUse.upperLimitControlledBy"
            label="管理事業所"
            options={UPLIMIT_CONT_ROLLED_BY_LIST}
            onChangeHook={this.onChangeUpperLimitControlledBy}
          />
          <FormGroup row>
            <FormikTextField
              name="serviceUse.upperLimitFacilityNumber"
              label="事業所番号"
              maxLength={10}
            />
            <FormikTextField
              name="serviceUse.upperLimitFacilityName"
              label="事業所名"
            />
          </FormGroup>
          {this.state.showUpperLimitTotalYenAndUserLoadYen && (
            <FormGroup row>
              <FormikTextField
                name="serviceUse.upperLimitTotalYen"
                label="総費用額"
                endAdornmentLabel="円"
                maxLength={11}
              />
              <FormikTextField
                name="serviceUse.upperLimitUserLoadYen"
                label="利用者負担額"
                endAdornmentLabel="円"
                maxLength={11}
              />
            </FormGroup>
          )}
          <FormikRadioButtons
            name="serviceUse.resultOfManagement"
            label="管理結果"
            options={RESULT_OF_MANAGEMENT_LIST}
            onChangeHook={this.onChangeResultOfManagement}
            style={{ marginBottom: 0 }}
          />
          {this.state.showUpperLimitYen && (
            <FormikTextField
              name="serviceUse.upperLimitYen"
              label="自事業所調整上限額"
              endAdornmentLabel="円"
              style={{ marginTop: 32 }}
              maxLength={11}
            />
          )}
        </FormikSwitch>
        <FormikSwitch
          name="serviceUse.createSupportPlanFlag"
          label="個別支援計画未作成"
        >
          <FormikSelectDateNotSelectedDefault
            name="serviceUse.notCreateSupportPlanStartDate"
            label="未作成期間開始日"
            style={{ marginBottom: 0 }}
            addYearTo={startAddYearTo}
            setFormikFieldValue={this.props.setFormikFieldValue}
          />
        </FormikSwitch>
        <FormikCheckbox
          name="serviceUse.individualTrainingImplementationPlanFlg"
          label="個別訓練支援計画作成済み"
        />
        <FormikCheckbox
          name="serviceUse.socialLifeSupportFlg"
          label="社会生活支援特別加算"
        />

        <div className={this.props.classes.fieldWrapperFoods}>
          <Typography className={this.props.classes.def}>
            食事提供サービス デフォルト*
          </Typography>
          <div className={this.props.classes.groupDate}>
            <FormikSelect
              name="serviceUse.defFood"
              label=""
              options={SUPPLY_FOOD_SERVICE}
              disabled={!this.props.facility.mealSaservedServiceFlag}
            />
          </div>
          <Typography className={this.props.classes.def}>
            送迎サービス デフォルト*
          </Typography>
          <div className={this.props.classes.groupDate}>
            <FormikSelect
              name="serviceUse.defPickup"
              label=""
              options={SUPPLY_PICKUP_SERVICE}
              disabled={!this.props.facility.transferServiceFlag}
              onChangeHook={this.onChangePickupPremisesHook}
            />
          </div>
          <div className={this.props.classes.supplyPickupInSameSiteService}>
            <Typography className={this.props.classes.def}>
              同一敷地内送迎 デフォルト*
            </Typography>
            <div className={this.props.classes.groupDate}>
              <FormikSelect
                name="serviceUse.pickupPremises"
                label=""
                options={this.state.pickupPremisesCase}
                disabled={
                  !this.props.facility.transferServiceFlag ||
                  this.state.showPickupPremises
                }
              />
            </div>
          </div>
        </div>
        <Typography className={this.props.classes.checkOption}>
          *
          事業所設定の「実施オプションサービス」にチェックを入れると設定ができます。
        </Typography>
      </FormPaper>
    );
  }
}

export default withStyles(styles)(ServiceUseFields);
