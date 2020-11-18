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
import FormikSelectDateNotSelectedDefault from "@components/molecules/FormikSelectDateNotSelectedDefault";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import {
  INCOME_KIND_TYPE_LIST,
  INCOME_KIND_LIST,
  SUBSIDIZED_UNIT_LIST,
  UPLIMIT_CONT_ROLLED_BY_LIST,
  RESULT_OF_MANAGEMENT_LIST
} from "@constants/variables";
import { UsersValues } from "@initialize/mgr/SHUROTEICHAKU/users/initialValues";

const styles = () =>
  createStyles({
    groupDate: {
      marginLeft: 16
    },
    fieldWrapper: {
      position: "relative"
    },
    incomeKindType: {
      position: "absolute",
      top: 22,
      left: 140
    },
    date: {
      marginBottom: 12
    }
  });

interface OwnProps {
  formikProps: FormikProps<UsersValues>;
  isFetchDone?: boolean;
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
}

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
            required={true}
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
            required={true}
            style={{ marginBottom: 12 }}
            addYearTo={startAddYearTo}
            setFormikFieldValue={this.props.setFormikFieldValue}
          />
          <FormikSelectDateNotSelectedDefault
            name="serviceUse.payEndDate"
            label="支給決定終了日"
            required={true}
            addYearTo={endAddYearTo}
            setFormikFieldValue={this.props.setFormikFieldValue}
          />
        </div>
        <FormGroup>
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
          <FormGroup row={true}>
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
              maxLength={10}
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
      </FormPaper>
    );
  }

  /**
   * 負担上限額が1の時、所得区分を表示
   */
  private onChangeIncomeKindHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    this.setState({ showIncomeKindType: value === "1" });
  };

  /**
   * 自治体助成金対象: 助成金 <=> 金額：円
   */
  private onChangeSubsidizedUnitHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    this.setState({ showSubsidizedPercent: value === "1" });
  };

  /**
   * 管理事業所が1の時、総費用額と利用者負担額を表示
   */
  private onChangeUpperLimitControlledBy = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    this.setState({ showUpperLimitTotalYenAndUserLoadYen: value === "1" });
  };

  /**
   * 管理結果が3の時、自事業所調整上限額を表示
   */
  private onChangeResultOfManagement = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    this.setState({ showUpperLimitYen: value === "3" });
  };
}

export default withStyles(styles)(ServiceUseFields);
