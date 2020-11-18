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
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import { FacilityState } from "@stores/domain/mgr/SHISETSUNYUSHO/facility/types";
import {
  DISABILITY_CLASS_LIST,
  INCOME_KIND_TYPE_LIST,
  INCOME_KIND_LIST,
  UPLIMIT_CONT_ROLLED_BY_LIST,
  RESULT_OF_MANAGEMENT_LIST,
  SUPPLY_FOOD_SERVICE
} from "@constants/variables";
import { UsersValues } from "@initialize/mgr/SHISETSUNYUSHO/users/initialValues";

const Tooltip = (
  <HelpToolTip title={<HelpTipMessages name="severeDisabilitySupportFlag" />} />
);

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
    checkOption: {
      color: "#666666",
      fontSize: "1.1rem",
      marginBottom: 28
    },
    check: {
      marginRight: 8,
      fontSize: 15
    },
    option: {
      marginLeft: 5,
      fontSize: 11
    },
    default: {
      marginLeft: 5
    },
    def: {
      marginBottom: -13
    },
    date: {
      marginBottom: 12
    },
    supplementaryBenefitYen: {
      marginTop: -25,
      marginLeft: 160
    },
    section: {
      marginBottom: 32
    },
    innerItem: {
      marginLeft: -20
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
}

class ServiceUseFields extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shouldFirstSetup: true,
      showIncomeKindType: true,
      showUpperLimitTotalYenAndUserLoadYen: true,
      showUpperLimitYen: false
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
    return {
      shouldFirstSetup: false,
      showIncomeKindType: serviceUse.incomeKind === "1",
      showUpperLimitTotalYenAndUserLoadYen:
        serviceUse.upperLimitControlledBy === "1",
      showUpperLimitYen: serviceUse.resultOfManagement === "3"
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
    const START_ADD_YEAR_TO = 1;
    const END_ADD_YEAR_TO = 5;
    return (
      <FormPaper>
        <div className={this.props.classes.section}>
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
            addYearTo={START_ADD_YEAR_TO}
            setFormikFieldValue={this.props.setFormikFieldValue}
          />
          <FormikSelectDateNotSelectedDefault
            name="serviceUse.inServiceEndDate"
            label="サービス提供終了日"
            addYearTo={END_ADD_YEAR_TO}
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
            addYearTo={START_ADD_YEAR_TO}
            setFormikFieldValue={this.props.setFormikFieldValue}
          />
          <FormikSelectDateNotSelectedDefault
            name="serviceUse.payEndDate"
            label="支給決定終了日"
            required
            addYearTo={END_ADD_YEAR_TO}
            setFormikFieldValue={this.props.setFormikFieldValue}
          />
        </div>
        <FormGroup>
          <FormikRadioButtons
            name="serviceUse.disabilityClass"
            label="障害区分"
            options={DISABILITY_CLASS_LIST}
          />
          {this.props.facility.seriousDisability !== 0 && (
            <FormikSwitch
              name="serviceUse.severeDisabilitySupport"
              label="重度障害者支援の個別支援対象者である"
              tooltip={Tooltip}
            >
              <FormikSelectDateNotSelectedDefault
                name="serviceUse.severeDisabilitySupportStartData"
                label="加算算定開始日"
                addYearTo={START_ADD_YEAR_TO}
                setFormikFieldValue={this.props.setFormikFieldValue}
                required
              />
            </FormikSwitch>
          )}
        </FormGroup>
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
        <SubsidizedFields formikProps={this.props.formikProps} />
        <FormikSwitch
          name="serviceUse.supplementaryBenefitFlg"
          label="補足給付"
        >
          <div className={this.props.classes.innerItem}>
            <FormikTextField
              name="serviceUse.supplementaryBenefitYen"
              label="補足給付金額"
              required
              endAdornmentLabel="円"
              maxLength={6}
            />
          </div>
        </FormikSwitch>
        <FormikSwitch
          name="serviceUse.upperLimitFacilityFlag"
          label="上限管理事業所あり"
        >
          <div className={this.props.classes.innerItem}>
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
                required
                maxLength={10}
              />
              <FormikTextField
                name="serviceUse.upperLimitFacilityName"
                label="事業所名"
                required
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
                required
                endAdornmentLabel="円"
                style={{ marginTop: 32 }}
                maxLength={11}
              />
            )}
          </div>
        </FormikSwitch>
        <FormikSwitch
          name="serviceUse.createSupportPlanFlg"
          label="個別支援計画未作成"
        >
          <div className={this.props.classes.innerItem}>
            <FormikSelectDateNotSelectedDefault
              name="serviceUse.notCreateSupportPlanStartDate"
              label="未作成期間開始日"
              required
              style={{ marginBottom: 0 }}
              addYearTo={START_ADD_YEAR_TO}
              setFormikFieldValue={this.props.setFormikFieldValue}
            />
          </div>
        </FormikSwitch>
        <div className={this.props.classes.fieldWrapperFoods}>
          <Typography className={this.props.classes.def}>
            食事提供サービス
            <span className={this.props.classes.default}>デフォルト</span>
            <span className={this.props.classes.option}>※</span>
          </Typography>
          <FormGroup row>
            <FormikSelect
              name="serviceUse.defFood"
              label=""
              options={SUPPLY_FOOD_SERVICE}
              disabled={!this.props.facility.availableFood}
              className={this.props.classes.groupDate}
              style={{ marginBottom: 16 }}
            />
            <FormikCheckbox
              name="serviceUse.foodBreakfastFlg"
              label="朝"
              style={{ marginBottom: 0, marginTop: 14 }}
              disabled={
                !this.props.facility.availableFood ||
                this.props.formikProps.values.serviceUse.defFood !== "1"
              }
            />
            <FormikCheckbox
              name="serviceUse.foodLunchFlg"
              label="昼"
              style={{ marginBottom: 0, marginTop: 14 }}
              disabled={
                !this.props.facility.availableFood ||
                this.props.formikProps.values.serviceUse.defFood !== "1"
              }
            />
            <FormikCheckbox
              name="serviceUse.foodSupperFlg"
              label="夜"
              style={{ marginBottom: 0, marginTop: 14 }}
              disabled={
                !this.props.facility.availableFood ||
                this.props.formikProps.values.serviceUse.defFood !== "1"
              }
            />
          </FormGroup>
        </div>
        <Typography className={this.props.classes.checkOption}>
          <span className={this.props.classes.check}>※</span>
          事業所設定の「実施オプションサービス」にチェックを入れると設定ができます。
        </Typography>
        <FormikCheckbox
          name="serviceUse.regionalLifeTransition2"
          label="地域生活移行個別支援特別加算（Ⅱ）"
          disabled={!this.props.facility.regionalLifeTransition}
          style={{ marginBottom: 0 }}
        />
      </FormPaper>
    );
  }
}

export default withStyles(styles)(ServiceUseFields);
