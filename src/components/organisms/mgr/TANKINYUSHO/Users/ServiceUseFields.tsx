import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import { FormikProps, getIn } from "formik";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikAddress from "@components/molecules/FormikAddress";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import FormikSelectDateNotSelectedDefault from "@components/molecules/FormikSelectDateNotSelectedDefault";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import { FacilityState } from "@stores/domain/mgr/TANKINYUSHO/facility/types";
import { UsersValues } from "@initialize/mgr/TANKINYUSHO/users/initialValues";
import {
  DISABILITY_CLASS_LIST,
  INCOME_KIND_TYPE_LIST,
  INCOME_KIND_LIST,
  SUBSIDIZED_UNIT_LIST,
  UPLIMIT_CONT_ROLLED_BY_LIST,
  RESULT_OF_MANAGEMENT_LIST,
  DEFAULT_SELECT_VALUE
} from "@constants/variables";
import {
  DISABILITY_CHILD_CLASS_LIST,
  SEVERE_DISABILITY_SUPPORT_TYPE_LIST,
  SUPPORT_TYPE_LIST,
  SPECIAL_SEVERE_DISABILITY_SUPPORT_TYPE_LIST
} from "@constants/mgr/TANKINYUSHO/variables";

const styles = (): StyleRules =>
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
    title: {
      marginBottom: 12
    },
    section: {
      marginBottom: 32
    },
    useAddTitle: {
      marginBottom: 8
    },
    remarks: {
      fontSize: 14,
      color: "#37474f",
      margin: 0
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
  disableDisabilityChildClass: boolean;
  disableSevereDisabilitySupport: boolean;
}

class ServiceUseFields extends React.Component<Props, State> {
  public static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State
  ): State | null {
    if (!prevState.shouldFirstSetup || !nextProps.isFetchDone) {
      return null;
    }

    const { serviceUse } = nextProps.formikProps.values;
    return {
      shouldFirstSetup: false,
      showIncomeKindType: serviceUse.incomeKind === "1",
      showSubsidizedPercent: serviceUse.subsidizedUnit === "1",
      showUpperLimitTotalYenAndUserLoadYen:
        serviceUse.upperLimitControlledBy === "1",
      showUpperLimitYen: serviceUse.resultOfManagement === "3",
      disableDisabilityChildClass: !serviceUse.classifyHandicappedFlag,
      disableSevereDisabilitySupport: serviceUse.disabilityClass !== "6"
    };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      shouldFirstSetup: true,
      showIncomeKindType: true,
      showSubsidizedPercent: true,
      showUpperLimitTotalYenAndUserLoadYen: true,
      showUpperLimitYen: false,
      disableDisabilityChildClass: true,
      disableSevereDisabilitySupport: true
    };
  }

  public render(): JSX.Element {
    const startAddYearTo = 1;
    const endAddYearTo = 5;
    const inServiceEndDateYear: string = getIn(
      this.props.formikProps.values,
      "serviceUse.inServiceEndDate.year"
    );
    const inServiceEndDateMonth: string = getIn(
      this.props.formikProps.values,
      "serviceUse.inServiceEndDate.month"
    );
    const inServiceEndDateDay: string = getIn(
      this.props.formikProps.values,
      "serviceUse.inServiceEndDate.day"
    );
    return (
      <FormPaper>
        <div className={this.props.classes.section}>
          <SectionTitle label="サービス利用詳細" />
        </div>
        <Typography className={this.props.classes.title}>
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
          name="serviceUse.endInServiceSameCorporationMovementFlg"
          label="同一敷地内への移動による退所"
          disabled={
            inServiceEndDateYear === DEFAULT_SELECT_VALUE ||
            inServiceEndDateMonth === "" ||
            inServiceEndDateDay === ""
          }
        />
        <Typography className={this.props.classes.title}>受給者証</Typography>
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
        <FormikCheckbox
          name="serviceUse.classifyHandicappedFlag"
          label="障害児"
          onChange={this.onChangeClassifyHandicappedFlag}
        />
        <FormGroup>
          <FormikRadioButtons
            name="serviceUse.disabilityChildClass"
            label="障害児区分"
            options={DISABILITY_CHILD_CLASS_LIST}
            disabled={this.state.disableDisabilityChildClass}
          />
          <FormikRadioButtons
            name="serviceUse.disabilityClass"
            label="障害区分"
            options={DISABILITY_CLASS_LIST}
            disabled={!this.state.disableDisabilityChildClass}
            onChangeHook={this.onChangeDisabilityClassHook}
          />
          <FormikRadioButtons
            name="serviceUse.severeDisabilitySupport"
            label="重度障害者支援"
            options={SEVERE_DISABILITY_SUPPORT_TYPE_LIST}
            disabled={
              !this.state.disableDisabilityChildClass ||
              this.state.disableSevereDisabilitySupport
            }
          />
        </FormGroup>
        <div className={this.props.classes.fieldWrapper}>
          <Typography className={this.props.classes.title}>
            契約支給量
          </Typography>
          <div className={this.props.classes.groupDate}>
            <FormGroup row={true}>
              <FormikTextField
                name="serviceUse.payDaysAgreed"
                label="日数"
                placeholder="00"
                required={true}
                maxLength={2}
                endAdornmentLabel="日"
                style={{ width: 213 }}
              />
              <FormikTextField
                name="serviceUse.businessNumberContract"
                label="事業者記入欄番号"
                placeholder="00"
                required={true}
                maxLength={2}
                style={{ width: 245 }}
              />
            </FormGroup>
          </div>
          <FormikRadioButtons
            name="serviceUse.supportType"
            label="支援内容"
            options={SUPPORT_TYPE_LIST}
          />
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
        <FormikSwitch name="serviceUse.subsidizedFlag" label="自治体助成金対象">
          <FormGroup row={true}>
            {this.state.showSubsidizedPercent && (
              <FormikTextField
                name="serviceUse.subsidizedPercent"
                label="助成金"
                required={true}
                maxLength={9}
              />
            )}
            {!this.state.showSubsidizedPercent && (
              <FormikTextField
                name="serviceUse.subsidizedYen"
                label="金額：円"
                required={true}
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
            required={true}
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
              required={true}
              maxLength={10}
            />
            <FormikTextField
              name="serviceUse.upperLimitFacilityName"
              label="事業所名"
              required={true}
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
              required={true}
              endAdornmentLabel="円"
              style={{ marginTop: 32 }}
              maxLength={11}
            />
          )}
        </FormikSwitch>
        <FormikCheckbox
          name="serviceUse.severelyDisabledFlg"
          label="重症心身障害"
          disabled={
            this.props.facility.facilityType !== 1 &&
            this.props.facility.facilityType !== 2
          }
        />
        <FormikCheckbox
          name="serviceUse.useType"
          label="医療型特定施設日中利用のみ"
          disabled={this.props.facility.facilityType !== 2}
        />
        <FormikCheckbox
          name="serviceUse.medicalCareFlg"
          label="医療的ケア対応支援"
        />
        <FormikRadioButtons
          name="serviceUse.specialSevereDisabilitySupport"
          label="特別重度支援"
          options={SPECIAL_SEVERE_DISABILITY_SUPPORT_TYPE_LIST}
        />
        <Typography className={this.props.classes.useAddTitle}>
          短期利用加算
        </Typography>
        <p className={this.props.classes.remarks}>
          ※初期設定情報から各利用者の算定期間を設定してください。
        </p>
      </FormPaper>
    );
  }

  /**
   * 障害児の値が変更されたら、checkboxの値を更新
   */
  private onChangeClassifyHandicappedFlag = (): void => {
    const {
      classifyHandicappedFlag
    } = this.props.formikProps.values.serviceUse;
    this.props.setFormikFieldValue(
      "serviceUse.classifyHandicappedFlag",
      !classifyHandicappedFlag
    );
    this.setState({ disableDisabilityChildClass: classifyHandicappedFlag });
  };

  /**
   * 障害区分が6の時、重度障害者支援をenabled
   */
  private onChangeDisabilityClassHook = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    this.setState({ disableSevereDisabilitySupport: value !== "6" });
  };

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
}

export default withStyles(styles)(ServiceUseFields);
