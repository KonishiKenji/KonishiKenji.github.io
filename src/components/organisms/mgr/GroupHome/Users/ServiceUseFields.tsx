import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
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
import FormikSelectDate from "@components/molecules/FormikSelectDate";
import { FieldItem } from "@interfaces/ui/form";
import {
  DISABILITY_CLASS_LIST,
  REGIONAL_TRANSFER_FOR_STRONG_BEHAVIOR_TYPE_LIST,
  MENTAL_DISORDER_SUPPORT_TYPE_LIST,
  INCOME_KIND_LIST,
  INCOME_KIND_TYPE_LIST,
  SUBSIDIZED_UNIT_LIST,
  UPLIMIT_CONT_ROLLED_BY_LIST,
  RESULT_OF_MANAGEMENT_LIST
} from "@constants/variables";

const styles = () =>
  createStyles({
    groupDate: {
      margin: "6px 0 0 16px"
    },
    fieldWrapper: {
      position: "relative"
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
    specifiedPersonsDisabilitiesBenefits: {
      margin: "6px 0 0 16px"
    },
    incomeKindType: {
      position: "absolute",
      top: 22,
      left: 140
    }
  });

interface OwnProps {
  formikProps: FormikProps<any>;
  isFetchDone?: boolean;
  unitsOptions: FieldItem[];
  isUnitOperating: boolean;
}
type Props = OwnProps & WithStyles<typeof styles>;

interface State {
  shouldFirstSetup: boolean;
  showIncomeKindType: boolean;
  showSubsidizedPercent: boolean;
  showUpperLimitTotalYenAndUserLoadYen: boolean;
  showUpperLimitYen: boolean;
}

const START_ADD_YEAR = 1;
const END_ADD_YEAR = 5;

class ServiceUseFields extends React.Component<Props, State> {
  public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (!prevState.shouldFirstSetup || !nextProps.isFetchDone) {
      return null;
    }

    const serviceUse = nextProps.formikProps.values.serviceUse;
    return {
      shouldFirstSetup: false,
      showIncomeKindType: serviceUse.incomeKind === "1",
      showSubsidizedPercent: serviceUse.subsidizedUnit === "1",
      showUpperLimitTotalYenAndUserLoadYen:
        serviceUse.upperLimitControlledBy === "1",
      showUpperLimitYen: serviceUse.resultOfManagement === "3"
    };
  }

  public state = {
    shouldFirstSetup: true,
    showIncomeKindType: true,
    showSubsidizedPercent: true,
    showUpperLimitTotalYenAndUserLoadYen: true,
    showUpperLimitYen: false
  };

  public render() {
    return (
      <FormPaper>
        <div style={{ marginBottom: 32 }}>
          <SectionTitle label="サービス利用詳細" />
        </div>
        {this.props.isUnitOperating && (
          <FormikSelect
            name="serviceUse.facilityUnitId"
            label="入居ユニット名"
            options={this.props.unitsOptions}
            isSelectablePlaceholder={true}
            placeholder="選択してください"
            size="halfSuperLong"
            required={true}
          />
        )}
        <Typography>入居期間</Typography>
        <div className={this.props.classes.groupDate}>
          <FormikSelectDate
            name="serviceUse.inServiceStartDate"
            label="入居日"
            required={true}
            style={{ marginBottom: 12 }}
            addYearTo={START_ADD_YEAR}
          />
          <FormikSelectDate
            name="serviceUse.inServiceEndDate"
            label="退居日"
            addYearTo={END_ADD_YEAR}
          />
        </div>
        <Typography>受給者証</Typography>
        <div className={this.props.classes.groupDate}>
          <FormikSelectDate
            name="serviceUse.payStartDate"
            label="支給決定開始日 "
            required={true}
            style={{ marginBottom: 12 }}
            addYearTo={START_ADD_YEAR}
          />
          <FormikSelectDate
            name="serviceUse.payEndDate"
            label="支給決定終了日"
            required={true}
            addYearTo={END_ADD_YEAR}
          />
        </div>
        <FormGroup>
          <div className={this.props.classes.fieldWrapper}>
            <FormikRadioButtons
              name="serviceUse.disabilityClass"
              label="障害区分"
              options={DISABILITY_CLASS_LIST}
              tooltip={
                <HelpToolTip
                  title={<HelpTipMessages name="disability_class" />}
                />
              }
            />
          </div>
          <div className={this.props.classes.fieldWrapper}>
            <FormikRadioButtons
              name="serviceUse.regionalTransferForStrongBehaviorType"
              label="強度行動障害者地域移行体制・重度障害支援体制加算"
              options={REGIONAL_TRANSFER_FOR_STRONG_BEHAVIOR_TYPE_LIST}
            />
            <div className={this.props.classes.irregularTooltip1}>
              <HelpToolTip
                title={
                  <HelpTipMessages name="intensityBehavioralSpecialAddition" />
                }
              />
            </div>
          </div>
          <div className={this.props.classes.fieldWrapper}>
            <FormikRadioButtons
              name="serviceUse.mentalDisorderSupportType"
              label="地域生活移行個別支援特別加算・精神障害者地域移行体制加算"
              options={MENTAL_DISORDER_SUPPORT_TYPE_LIST}
            />
            <div className={this.props.classes.irregularTooltip2}>
              <HelpToolTip
                title={<HelpTipMessages name="localLifeSpecialAddition" />}
              />
            </div>
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
          <div className={this.props.classes.fieldWrapper}>
            <Typography>特定障害者特別給付金</Typography>
            <div
              className={
                this.props.classes.specifiedPersonsDisabilitiesBenefits
              }
            >
              <FormikTextField
                name="serviceUse.specifiedPersonsDisabilitiesBenefits"
                label="実費算定額（月額家賃）"
                required={true}
                endAdornmentLabel="円"
              />
            </div>
          </div>
        </FormGroup>
        <FormikSwitch name="serviceUse.subsidizedFlag" label="自治体助成金対象">
          <FormGroup row={true}>
            {this.state.showSubsidizedPercent ? (
              <FormikTextField
                name="serviceUse.subsidizedPercent"
                label="助成金"
              />
            ) : (
              <FormikTextField
                name="serviceUse.subsidizedYen"
                label="金額：円"
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
            disabledPrefectureId={true}
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
          <FormGroup row={true}>
            <FormikTextField
              name="serviceUse.upperLimitFacilityNumber"
              label="事業所番号"
            />
            <FormikTextField
              name="serviceUse.upperLimitFacilityName"
              label="事業所名"
            />
          </FormGroup>
          {this.state.showUpperLimitTotalYenAndUserLoadYen && (
            <FormGroup row={true}>
              <FormikTextField
                name="serviceUse.upperLimitTotalYen"
                label="総費用額"
                endAdornmentLabel="円"
              />
              <FormikTextField
                name="serviceUse.upperLimitUserLoadYen"
                label="利用者負担額"
                endAdornmentLabel="円"
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
            />
          )}
        </FormikSwitch>
        <FormikSwitch
          name="serviceUse.createSupportPlanFlag"
          label="個別支援計画未作成"
          style={{ marginBottom: 0 }}
        >
          <FormikSelectDate
            name="serviceUse.notCreateSupportPlanStartDate"
            label="未作成期間開始日"
            style={{ marginBottom: 0 }}
            addYearTo={START_ADD_YEAR}
          />
        </FormikSwitch>
      </FormPaper>
    );
  }

  /**
   * 負担上限額が1の時、所得区分を表示
   */
  private onChangeIncomeKindHook = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    this.setState({ showIncomeKindType: value === "1" });
  };

  /**
   * 自治体助成金対象: 助成金 <=> 金額：円
   */
  private onChangeSubsidizedUnitHook = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    this.setState({ showSubsidizedPercent: value === "1" });
  };

  /**
   * 管理事業所が1の時、総費用額と利用者負担額を表示
   */
  private onChangeUpperLimitControlledBy = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    this.setState({ showUpperLimitTotalYenAndUserLoadYen: value === "1" });
  };

  /**
   * 管理結果が3の時、自事業所調整上限額を表示
   */
  private onChangeResultOfManagement = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    this.setState({ showUpperLimitYen: value === "3" });
  };
}

export default withStyles(styles)(ServiceUseFields);
