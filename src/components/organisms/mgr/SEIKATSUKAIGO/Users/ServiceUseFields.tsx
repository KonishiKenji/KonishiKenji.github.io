import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import { FormikProps } from "formik";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikAddress from "@components/molecules/FormikAddress";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import FormikSelectDateNotSelectedDefault from "@components/molecules/FormikSelectDateNotSelectedDefault";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import { FacilityState } from "@stores/domain/mgr/SEIKATSUKAIGO/facility/types";
import { OptionInterface } from "@components/atoms/DropDown";
import { REHABILITATION_TYPE_LIST } from "@constants/mgr/SEIKATSUKAIGO/variables";
import {
  DISABILITY_CLASS_LIST,
  INCOME_KIND_LIST,
  INCOME_KIND_TYPE_LIST,
  SUBSIDIZED_UNIT_LIST,
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
import { UsersValues } from "@initialize/mgr/SEIKATSUKAIGO/users/initialValues";

const styles = (): StyleRules =>
  createStyles({
    groupDate: {
      margin: "6px 0 0 16px"
    },
    fieldWrapper: {
      position: "relative"
    },
    fieldWrapperFoods: {
      position: "relative",
      marginTop: 20
    },
    irregularTooltip1: {
      position: "absolute",
      top: "50%",
      marginTop: -9,
      left: 276
    },
    irregularTooltip2: {
      position: "absolute",
      top: "50%",
      marginTop: -9,
      left: 260
    },
    incomeKindType: {
      position: "absolute",
      top: 22,
      left: 140
    },
    supplyPickupInSameSiteService: {
      position: "absolute",
      top: 89,
      left: 293
    },
    SeriousSupporterFlag: {
      margin: "-24px 0 -16px 16px"
    },
    severeDisabilitySupport: {
      marginTop: 25
    },
    checkOption: {
      color: "#666666",
      fontSize: "14px"
    },
    payDaysAgreed: {
      width: 213,
      marginLeft: 30
    },
    businessNumberContract: {
      width: 245
    },
    rehabilitationStartDate: {
      marginLeft: 15
    },
    def: {
      marginBottom: -18
    },
    date: {
      marginBottom: 12
    },
    scheduledDate: {
      marginTop: 24
    },
    groupWeeks: {
      margin: "16px 0 0 16px"
    },
    weekDay: {
      marginRight: 24
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
  showSubsidizedPercent: boolean;
  showUpperLimitTotalYenAndUserLoadYen: boolean;
  showUpperLimitYen: boolean;
  showAgreedByContractFlg: boolean;
  showRehabilitationType: boolean;
  pickupPremisesCase: OptionInterface[];
  showPickupPremises: boolean;
}

class ServiceUseFields extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shouldFirstSetup: true,
      showIncomeKindType: true,
      showSubsidizedPercent: true,
      showUpperLimitTotalYenAndUserLoadYen: true,
      showUpperLimitYen: false,
      showAgreedByContractFlg: false,
      showRehabilitationType: false,
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
      showSubsidizedPercent: serviceUse.subsidizedUnit === "1",
      showUpperLimitTotalYenAndUserLoadYen:
        serviceUse.upperLimitControlledBy === "1",
      showUpperLimitYen: serviceUse.resultOfManagement === "3",
      showAgreedByContractFlg: serviceUse.agreedByContractFlg === "2",
      showRehabilitationType:
        serviceUse.rehabilitation === "1" || serviceUse.rehabilitation === "2",
      showPickupPremises: serviceUse.defPickup === "0",
      pickupPremisesCase: pickupPremisesList
    };
  }

  /**
   * 負担上限額が0の時、所得区分を表示
   */
  private onChangeIncomeKindHook = (
    e: React.ChangeEvent<HTMLInputElement>
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
  private onChangepickupPremisesHook = (
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
   * リハビリテーション加算が1か2の時、リハビリテーション実施計画作成を表示
   */
  private onChangeRehabilitationHook = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    this.setState({ showRehabilitationType: value === "2" || value === "1" });
  };

  /**
   * 自治体助成金対象: 助成金 <=> 金額：円
   */
  private onChangeSubsidizedUnitHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { value } = e.target;
    this.setState({ showSubsidizedPercent: value === "1" });
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
        <FormikCheckbox
          name="serviceUse.sameCorporationMovementFlg"
          label="同一法人の事業所からの受け入れ利用者（初期加算対象外）"
        />
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
              tooltip={(
                <HelpToolTip
                  title={
                    <HelpTipMessages name="disability_class_SEIKATSUKAIGO" />
                  }
                />
              )}
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
        <FormikSwitch
          name="serviceUse.subsidizedFlag"
          label="自治体助成金対象"
          tooltip={
            <HelpToolTip title={<HelpTipMessages name="subsidized_flg" />} />
          }
        >
          <FormGroup row>
            {this.state.showSubsidizedPercent && (
              <FormikTextField
                name="serviceUse.subsidizedPercent"
                label="助成金"
                maxLength={9}
              />
            )}
            {!this.state.showSubsidizedPercent && (
              <FormikTextField
                name="serviceUse.subsidizedYen"
                label="金額：円"
                maxLength={11}
              />
            )}
            <FormikSelect
              name="serviceUse.subsidizedUnit"
              label="単位"
              options={SUBSIDIZED_UNIT_LIST}
              onChangeHook={this.onChangeSubsidizedUnitHook}
            />
          </FormGroup>
          <FormikAddress
            prefectureIdName="basic.prefectureId"
            cityIdName="serviceUse.subsidizedCityId"
            formikProps={this.props.formikProps}
            required={false}
            disabledPrefectureId
            showRegionType={false}
          />
        </FormikSwitch>
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
          style={{ marginBottom: 0 }}
        >
          <FormikSelectDateNotSelectedDefault
            name="serviceUse.notCreateSupportPlanStartDate"
            label="未作成期間開始日"
            style={{ marginBottom: 0 }}
            addYearTo={startAddYearTo}
            setFormikFieldValue={this.props.setFormikFieldValue}
          />
        </FormikSwitch>

        <Typography className={this.props.classes.scheduledDate}>
          通所予定日
        </Typography>
        <FormGroup row className={this.props.classes.groupWeeks}>
          <div className={this.props.classes.weekDay}>
            <FormikCheckbox name="serviceUse.monScheduledFlg" label="月" />
          </div>
          <div className={this.props.classes.weekDay}>
            <FormikCheckbox name="serviceUse.tueScheduledFlg" label="火" />
          </div>
          <div className={this.props.classes.weekDay}>
            <FormikCheckbox name="serviceUse.wedScheduledFlg" label="水" />
          </div>
          <div className={this.props.classes.weekDay}>
            <FormikCheckbox name="serviceUse.thuScheduledFlg" label="木" />
          </div>
          <div className={this.props.classes.weekDay}>
            <FormikCheckbox name="serviceUse.friScheduledFlg" label="金" />
          </div>
          <div className={this.props.classes.weekDay}>
            <FormikCheckbox name="serviceUse.satScheduledFlg" label="土" />
          </div>
          <div className={this.props.classes.weekDay}>
            <FormikCheckbox name="serviceUse.sunScheduledFlg" label="日" />
          </div>
        </FormGroup>

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
              onChangeHook={this.onChangepickupPremisesHook}
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
        <div className={this.props.classes.fieldWrapper}>
          <div className={this.props.classes.severeDisabilitySupport}>
            {this.props.facility.severeFailureSupportFlag && (
              <FormikSwitch
                name="serviceUse.severeDisabilitySupport"
                label="重度障害者支援の個別支援対象者である"
                tooltip={
                  <HelpToolTip
                    title={
                      <HelpTipMessages name="severeDisabilitySupportFlag" />
                    }
                  />
                }
              >
                <FormikSelectDateNotSelectedDefault
                  name="serviceUse.severeDisabilitySupportStartData"
                  label="加算算定開始日"
                  addYearTo={startAddYearTo}
                  setFormikFieldValue={this.props.setFormikFieldValue}
                  required
                />
              </FormikSwitch>
            )}
          </div>
        </div>
        <div className={this.props.classes.fieldWrapper}>
          <FormikRadioButtons
            name="serviceUse.rehabilitation"
            label="リハビリテーション加算"
            options={REHABILITATION_TYPE_LIST}
            onChangeHook={this.onChangeRehabilitationHook}
          />
          <div className={this.props.classes.groupDate}>
            {this.state.showRehabilitationType && (
              <div className={this.props.classes.rehabilitationStartDate}>
                <FormikSelectDateNotSelectedDefault
                  name="serviceUse.rehabilitationStartDate"
                  label="リハビリ実施計画作成日"
                  addYearTo={startAddYearTo}
                  setFormikFieldValue={this.props.setFormikFieldValue}
                />
              </div>
            )}
          </div>
        </div>
      </FormPaper>
    );
  }
}

export default withStyles(styles)(ServiceUseFields);
