import * as React from "react";
import {
  createStyles,
  WithStyles,
  withStyles,
  TableRow,
  TableBody,
  TableCell
} from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import { FormikProps, getIn } from "formik";
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
import Table from "@components/molecules/Table";
import TableHead from "@components/molecules/TableHead";
import { OptionInterface } from "@components/atoms/DropDown";

import { connect } from "react-redux";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";

import {
  INCOME_KIND_LIST,
  INCOME_KIND_TYPE_LIST_NON_SELECT,
  SUBSIDIZED_UNIT_LIST,
  DEFAULT_SUBSIDIZED_UNIT,
  DEFAULT_SELECT_VALUE,
  UPLIMIT_CONT_ROLLED_BY_LIST,
  RESULT_OF_MANAGEMENT_LIST,
  SUPPLY_FOOD_SERVICE,
  SUPPLY_PICKUP_SERVICE,
  PICKUP_PREMISES_CASE_0,
  PICKUP_PREMISES_CASE_1,
  PICKUP_PREMISES_CASE_2,
  PICKUP_PREMISES_CASE_3,
  AGREED_BY_CONTRACT_LIST,
  FacilityType,
  DISABILITY_CLASS_LIST
} from "@constants/variables";
import { UsersValues } from "@initialize/mgr/IAB/users/initialValues";
import * as ClassNames from "classnames";

const styles = (): StyleRules =>
  createStyles({
    sectionTitle: { marginBottom: 30 },
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
      fontSize: 14
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
      marginRight: 18
    },
    tipsServiceStart: {
      marginLeft: 120,
      marginTop: -4,
      "&+div > div > div": {
        marginTop: -6
      }
    },
    tipsPayStart: {
      marginLeft: 100,
      marginTop: -4,
      "&+div > div > div": {
        marginTop: -6
      }
    },
    formikActionLabel: {
      "&+span": {
        fontSize: 16
      },
      "& label span": {
        fontSize: 16
      }
    },
    wrapperAgreedByContract: {
      marginBottom: 8,
      marginTop: 2
    },
    fieldWrapperForm: {
      marginBottom: 16,
      "& > div": {
        marginBottom: 0
      }
    },
    fieldWrapperAddress: {
      marginBottom: 16,
      "& > div > div": {
        marginBottom: 0
      }
    },
    showFieldAgreedByContract: {
      marginBottom: 30,
      "& > div:nth-of-type(2) > div": {
        marginBottom: 0
      }
    },
    showFieldSubsidized: {
      marginBottom: 30
    },
    fieldWrapperSwitch: {
      "& > div > div": { marginTop: 6 }
    },
    officeInfoTable: {
      marginLeft: 16,
      marginBottom: 16,
      width: 880
    },
    officeInfoTableHeadCell: {
      color: "#37474f",
      paddingLeft: 16,
      borderBottom: "none"
    },
    officeInfoTableCaption: {
      marginLeft: -16,
      marginBottom: 8,
      textAlign: "left"
    },
    officeInfoTableRow: {
      "&:nth-of-type(even)": {
        backgroundColor: "#f5f5f5"
      },
      "&:last-child": {
        borderBottom: "1px solid #eeeeee"
      }
    },
    officeInfoTableCell: {
      padding: "12px 16px",
      borderBottom: "none",
      verticalAlign: "initial",
      "&:last-child": {
        // MuiTableCell:last-child の上書き
        paddingRight: 16
      }
    },
    officeInfoTextInput: {
      width: 176
    },
    officeInfoNameInput: {
      width: 224
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
type Props = OwnProps & StateProps & WithStyles<typeof styles>;

interface State {
  shouldFirstSetup: boolean;
  showIncomeKindType: boolean;
  showSubsidizedPercent: boolean;
  showOfficeInfoTable: boolean;
  showUpperLimitYen: boolean;
  showAgreedByContractFlg: boolean;
  pickupPremisesCase: OptionInterface[];
  showPickupPremises: boolean;
}
interface StateProps {
  user: UserState;
}

class ServiceUseFields extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      shouldFirstSetup: true,
      showIncomeKindType: true,
      showSubsidizedPercent: true,
      showOfficeInfoTable: true,
      showUpperLimitYen: false,
      showAgreedByContractFlg: false,
      pickupPremisesCase: PICKUP_PREMISES_CASE_0,
      showPickupPremises: true
    };
  }

  public static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State
  ): {
    shouldFirstSetup: boolean;
    showIncomeKindType: boolean;
    showSubsidizedPercent: boolean;
    showOfficeInfoTable: boolean;
    showUpperLimitYen: boolean;
    showAgreedByContractFlg: boolean;
    showPickupPremises: boolean;
    pickupPremisesCase: OptionInterface[];
  } | null {
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
      showOfficeInfoTable: serviceUse.upperLimitControlledBy === "1",
      showUpperLimitYen: serviceUse.resultOfManagement === "3",
      showAgreedByContractFlg: serviceUse.agreedByContractFlg === "2",
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
    this.props.setFormikFieldValue("serviceUse.incomeKindType", "");
  };

  /**
   * 契約支給量が選択されたら、日数と事業者記入欄番号を表示
   */
  private onChangeAgreedByContractHook = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    this.setState({ showAgreedByContractFlg: value === "2" });
    this.props.setFormikFieldValue("serviceUse.payDaysAgreed", "");
    this.props.setFormikFieldValue("serviceUse.businessNumberContract", "");
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
   * 自治体助成金対象：ONOFF切り替え時に値をリセット
   */
  private onChangeSubsidizedFlg = (): void => {
    if (getIn(this.props.formikProps.values, "serviceUse.subsidizedFlag")) {
      this.props.setFormikFieldValue("serviceUse.subsidizedFlag", false);
      this.props.setFormikFieldValue("serviceUse.subsidizedPercent", "");
      this.props.setFormikFieldValue("serviceUse.subsidizedYen", "");
      this.props.setFormikFieldValue(
        "serviceUse.subsidizedUnit",
        DEFAULT_SUBSIDIZED_UNIT
      );
      this.props.setFormikFieldValue(
        "serviceUse.subsidizedCityId",
        DEFAULT_SELECT_VALUE
      );
      this.setState({ showSubsidizedPercent: true });
    } else {
      this.props.setFormikFieldValue("serviceUse.subsidizedFlag", true);
    }
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
   * 上限管理事業所あり：ONOFF切り替え時に値をリセット
   */
  private onChangeUpperLimitFacilityFlag = (): void => {
    if (
      getIn(this.props.formikProps.values, "serviceUse.upperLimitFacilityFlag")
    ) {
      this.props.setFormikFieldValue(
        "serviceUse.upperLimitFacilityFlag",
        false
      );
      this.props.setFormikFieldValue("serviceUse.upperLimitControlledBy", "1");
      this.props.setFormikFieldValue("serviceUse.resultOfManagement", "1");
      this.props.setFormikFieldValue("serviceUse.upperLimitYen", "");
      this.setState({
        showUpperLimitYen: false,
        showOfficeInfoTable: true
      });
      this.resetUpperLimitFacilityYenForm();
    } else {
      this.props.setFormikFieldValue("serviceUse.upperLimitFacilityFlag", true);
    }
  };

  private resetUpperLimitFacilityYenForm = (): void => {
    for (let i = 0; i < 4; i += 1) {
      const dataNumber = i !== 0 ? String(i + 1) : "";
      this.props.setFormikFieldValue(
        `serviceUse.upperLimitFacilityNumber${dataNumber}`,
        ""
      );
      this.props.setFormikFieldValue(
        `serviceUse.upperLimitFacilityName${dataNumber}`,
        ""
      );
      this.props.setFormikFieldValue(
        `serviceUse.upperLimitTotalYen${dataNumber}`,
        ""
      );
      this.props.setFormikFieldValue(
        `serviceUse.upperLimitUserLoadYen${dataNumber}`,
        ""
      );
    }
  };

  /**
   * 管理事業所が1の時、総費用額と利用者負担額を表示
   */
  private onChangeUpperLimitControlledBy = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { value } = e.target;
    this.setState({ showOfficeInfoTable: value === "1" });
    this.resetUpperLimitFacilityYenForm();
  };

  /**
   * 管理結果が3の時、自事業所調整上限額を表示
   */
  private onChangeResultOfManagement = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    this.setState({ showUpperLimitYen: value === "3" });
    this.props.setFormikFieldValue("serviceUse.upperLimitYen", "");
  };

  /**
   * 個別支援計画未作成：ONOFF切り替え時に値をリセット
   */
  private onChangeCreateSupportPlanFlag = (): void => {
    if (
      getIn(this.props.formikProps.values, "serviceUse.createSupportPlanFlag")
    ) {
      this.props.setFormikFieldValue("serviceUse.createSupportPlanFlag", false);
      this.props.setFormikFieldValue(
        "serviceUse.notCreateSupportPlanStartDate.year",
        DEFAULT_SELECT_VALUE
      );
      this.props.setFormikFieldValue(
        "serviceUse.notCreateSupportPlanStartDate.month",
        ""
      );
      this.props.setFormikFieldValue(
        "serviceUse.notCreateSupportPlanStartDate.day",
        ""
      );
    } else {
      this.props.setFormikFieldValue("serviceUse.createSupportPlanFlag", true);
    }
  };

  public render(): JSX.Element {
    const startAddYearTo = 1;
    const endAddYearTo = 5;
    const tipsInServiceStartDate = (
      <div className={this.props.classes.tipsServiceStart}>
        <HelpToolTip title={<HelpTipMessages name="in_service_start_date" />} />
      </div>
    );
    const tipsPayStartDate = (
      <div className={this.props.classes.tipsPayStart}>
        <HelpToolTip title={<HelpTipMessages name="pay_start_date" />} />
      </div>
    );
    const tipsSubsidizedFlag = (
      <HelpToolTip title={<HelpTipMessages name="subsidized_flg" />} />
    );
    const tipsDisabilityClass = (
      <HelpToolTip title={<HelpTipMessages name="disability_class" />} />
    );
    return (
      <FormPaper>
        <div className={this.props.classes.sectionTitle}>
          <SectionTitle label="サービス利用詳細" />
        </div>
        <Typography className={this.props.classes.date}>
          サービス提供期間
        </Typography>
        <div className={this.props.classes.groupDate}>
          <FormikSelectDateNotSelectedDefault
            name="serviceUse.inServiceStartDate"
            label="サービス提供開始日"
            style={{ marginBottom: 16 }}
            addYearTo={startAddYearTo}
            setFormikFieldValue={this.props.setFormikFieldValue}
            tooltip={tipsInServiceStartDate}
          />
          <FormikSelectDateNotSelectedDefault
            name="serviceUse.inServiceEndDate"
            label="サービス提供終了日（任意）"
            addYearTo={endAddYearTo}
            setFormikFieldValue={this.props.setFormikFieldValue}
          />
        </div>
        <FormikCheckbox
          name="serviceUse.sameCorporationMovementFlg"
          label="同一法人の事業所からの受け入れ利用者（初期加算対象外）"
          className={this.props.classes.formikActionLabel}
        />
        <Typography className={this.props.classes.date}>受給者証</Typography>
        <div className={this.props.classes.groupDate}>
          <FormikSelectDateNotSelectedDefault
            name="serviceUse.payStartDate"
            label="支給決定開始日"
            style={{ marginBottom: 16 }}
            addYearTo={startAddYearTo}
            setFormikFieldValue={this.props.setFormikFieldValue}
            tooltip={tipsPayStartDate}
          />
          <FormikSelectDateNotSelectedDefault
            name="serviceUse.payEndDate"
            label="支給決定終了日"
            addYearTo={endAddYearTo}
            setFormikFieldValue={this.props.setFormikFieldValue}
          />
        </div>
        {this.props.facility.serviceType === FacilityType.A && (
          <FormikRadioButtons
            name="serviceUse.classifyDisabilitySupport"
            label="障害区分"
            options={DISABILITY_CLASS_LIST}
            tooltip={tipsDisabilityClass}
          />
        )}
        <FormGroup>
          <div
            className={ClassNames(
              {
                [this.props.classes.fieldWrapperForm]: !this.state
                  .showAgreedByContractFlg
              },
              {
                [this.props.classes.showFieldAgreedByContract]: this.state
                  .showAgreedByContractFlg
              }
            )}
          >
            <FormikRadioButtons
              name="serviceUse.agreedByContractFlg"
              label="契約支給量"
              options={AGREED_BY_CONTRACT_LIST}
              onChangeHook={this.onChangeAgreedByContractHook}
              className={ClassNames(
                this.props.classes.formikActionLabel,
                this.props.classes.wrapperAgreedByContract
              )}
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
              className={this.props.classes.formikActionLabel}
            />
            <div className={this.props.classes.incomeKindType}>
              {this.state.showIncomeKindType && (
                <FormikSelect
                  name="serviceUse.incomeKindType"
                  label="所得区分"
                  options={INCOME_KIND_TYPE_LIST_NON_SELECT}
                  placeholder="選択してください"
                  isSelectablePlaceholder
                />
              )}
            </div>
          </div>
        </FormGroup>
        <div
          className={ClassNames({
            [this.props.classes.showFieldSubsidized]: getIn(
              this.props.formikProps.values,
              "serviceUse.subsidizedFlag"
            )
          })}
        >
          <div className={this.props.classes.fieldWrapperSwitch}>
            <FormikSwitch
              name="serviceUse.subsidizedFlag"
              label="自治体助成金対象"
              tooltip={tipsSubsidizedFlag}
              onChange={this.onChangeSubsidizedFlg}
              className={this.props.classes.formikActionLabel}
            >
              <FormGroup row className={this.props.classes.fieldWrapperForm}>
                {this.state.showSubsidizedPercent && (
                  <FormikTextField
                    name="serviceUse.subsidizedPercent"
                    label="助成金"
                    maxLength={9}
                    placeholder="0"
                  />
                )}
                {!this.state.showSubsidizedPercent && (
                  <FormikTextField
                    name="serviceUse.subsidizedYen"
                    label="金額：円"
                    maxLength={11}
                    placeholder="0"
                  />
                )}
                <FormikSelect
                  name="serviceUse.subsidizedUnit"
                  label="単位"
                  options={SUBSIDIZED_UNIT_LIST}
                  onChangeHook={this.onChangeSubsidizedUnitHook}
                />
              </FormGroup>
              <div className={this.props.classes.fieldWrapperAddress}>
                <FormikAddress
                  prefectureIdName="basic.prefectureId"
                  cityIdName="serviceUse.subsidizedCityId"
                  formikProps={this.props.formikProps}
                  required={false}
                  disabledPrefectureId
                  showRegionType={false}
                />
              </div>
            </FormikSwitch>
          </div>
        </div>
        {this.props.facility.serviceType === FacilityType.A && (
          <FormikCheckbox
            name="serviceUse.aTargetForReductionFlg"
            label="A型減免対象"
            className={this.props.classes.formikActionLabel}
            disabled={!this.props.facility.aExecuteMeasuresForLoadReductionFlag}
          />
        )}
        <div className={this.props.classes.fieldWrapperSwitch}>
          <FormikSwitch
            name="serviceUse.upperLimitFacilityFlag"
            label="上限管理事業所あり"
            onChange={this.onChangeUpperLimitFacilityFlag}
            className={this.props.classes.formikActionLabel}
          >
            <div className={this.props.classes.fieldWrapperForm}>
              <FormikSelect
                name="serviceUse.upperLimitControlledBy"
                label="管理事業所"
                options={UPLIMIT_CONT_ROLLED_BY_LIST}
                onChangeHook={this.onChangeUpperLimitControlledBy}
              />
            </div>
            {this.state.showOfficeInfoTable ? (
              <Table
                key="他事業所情報"
                className={this.props.classes.officeInfoTable}
              >
                <caption className={this.props.classes.officeInfoTableCaption}>
                  <Typography>他事業所情報</Typography>
                </caption>
                <TableHead
                  tabIndex={0}
                  key={1}
                  selected={false}
                  items={[
                    {
                      align: "left",
                      label: "事業所番号",
                      className: this.props.classes.officeInfoTableHeadCell
                    },
                    {
                      align: "left",
                      label: "事業所名",
                      className: this.props.classes.officeInfoTableHeadCell
                    },
                    {
                      align: "left",
                      label: "総費用額",
                      className: this.props.classes.officeInfoTableHeadCell
                    },
                    {
                      align: "left",
                      label: "利用者負担額",
                      className: this.props.classes.officeInfoTableHeadCell
                    }
                  ]}
                  headerStyle={{
                    backgroundColor: "#eceff1"
                  }}
                  rowStyle={{
                    color: "#37474f",
                    height: 40
                  }}
                />
                <TableBody>
                  {[0, 1, 2, 3].map((item) => {
                    const dataNumber = item ? String(item + 1) : "";
                    const size = "auto";
                    const filedStyle = {
                      marginRight: 0,
                      marginBottom: 0
                    };
                    return (
                      <TableRow
                        className={this.props.classes.officeInfoTableRow}
                        key={item}
                      >
                        <TableCell
                          className={this.props.classes.officeInfoTableCell}
                        >
                          <FormikTextField
                            name={`serviceUse.upperLimitFacilityNumber${dataNumber}`}
                            maxLength={10}
                            placeholder="0000000000"
                            className={this.props.classes.officeInfoTextInput}
                            size={size}
                            style={filedStyle}
                          />
                        </TableCell>
                        <TableCell
                          className={this.props.classes.officeInfoTableCell}
                        >
                          <FormikTextField
                            name={`serviceUse.upperLimitFacilityName${dataNumber}`}
                            className={this.props.classes.officeInfoNameInput}
                            size={size}
                            style={filedStyle}
                            maxLength={2500}
                          />
                        </TableCell>
                        <TableCell
                          className={this.props.classes.officeInfoTableCell}
                        >
                          <FormikTextField
                            name={`serviceUse.upperLimitTotalYen${dataNumber}`}
                            endAdornmentLabel="円"
                            multiline
                            className={this.props.classes.officeInfoTextInput}
                            size={size}
                            style={filedStyle}
                          />
                        </TableCell>
                        <TableCell
                          className={this.props.classes.officeInfoTableCell}
                        >
                          <FormikTextField
                            name={`serviceUse.upperLimitUserLoadYen${dataNumber}`}
                            endAdornmentLabel="円"
                            maxLength={11}
                            className={this.props.classes.officeInfoTextInput}
                            size={size}
                            style={filedStyle}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <FormGroup row className={this.props.classes.fieldWrapperForm}>
                <FormikTextField
                  name="serviceUse.upperLimitFacilityNumber"
                  label="事業所番号"
                  maxLength={10}
                  placeholder="0000000000"
                />
                <FormikTextField
                  name="serviceUse.upperLimitFacilityName"
                  label="事業所名"
                />
              </FormGroup>
            )}
            <FormikRadioButtons
              name="serviceUse.resultOfManagement"
              label="管理結果"
              options={RESULT_OF_MANAGEMENT_LIST}
              onChangeHook={this.onChangeResultOfManagement}
              style={{ marginTop: 8, marginBottom: 0 }}
              className={this.props.classes.formikActionLabel}
            />
            {this.state.showUpperLimitYen && (
              <FormikTextField
                name="serviceUse.upperLimitYen"
                label="自事業所調整上限額"
                endAdornmentLabel="円"
                style={{ marginTop: 12, marginLeft: 52 }}
                maxLength={11}
              />
            )}
          </FormikSwitch>
        </div>
        <div className={this.props.classes.fieldWrapperSwitch}>
          <FormikSwitch
            name="serviceUse.createSupportPlanFlag"
            label="個別支援計画未作成"
            onChange={this.onChangeCreateSupportPlanFlag}
            className={this.props.classes.formikActionLabel}
          >
            <div className={this.props.classes.fieldWrapperForm}>
              <FormikSelectDateNotSelectedDefault
                name="serviceUse.notCreateSupportPlanStartDate"
                label="未作成期間開始日"
                addYearTo={startAddYearTo}
                setFormikFieldValue={this.props.setFormikFieldValue}
              />
            </div>
          </FormikSwitch>
        </div>
        <Typography className={this.props.classes.scheduledDate}>
          通所予定日
        </Typography>
        <FormGroup row className={this.props.classes.groupWeeks}>
          <div className={this.props.classes.weekDay}>
            <FormikCheckbox
              name="serviceUse.monScheduledFlg"
              label="月"
              className={this.props.classes.formikActionLabel}
            />
          </div>
          <div className={this.props.classes.weekDay}>
            <FormikCheckbox
              name="serviceUse.tueScheduledFlg"
              label="火"
              className={this.props.classes.formikActionLabel}
            />
          </div>
          <div className={this.props.classes.weekDay}>
            <FormikCheckbox
              name="serviceUse.wedScheduledFlg"
              label="水"
              className={this.props.classes.formikActionLabel}
            />
          </div>
          <div className={this.props.classes.weekDay}>
            <FormikCheckbox
              name="serviceUse.thuScheduledFlg"
              label="木"
              className={this.props.classes.formikActionLabel}
            />
          </div>
          <div className={this.props.classes.weekDay}>
            <FormikCheckbox
              name="serviceUse.friScheduledFlg"
              label="金"
              className={this.props.classes.formikActionLabel}
            />
          </div>
          <div className={this.props.classes.weekDay}>
            <FormikCheckbox
              name="serviceUse.satScheduledFlg"
              label="土"
              className={this.props.classes.formikActionLabel}
            />
          </div>
          <div className={this.props.classes.weekDay}>
            <FormikCheckbox
              name="serviceUse.sunScheduledFlg"
              label="日"
              className={this.props.classes.formikActionLabel}
            />
          </div>
        </FormGroup>

        {this.props.user.featureGroup.group_labor_charge === 1 && (
          <FormikCheckbox
            name="serviceUse.defRecordWork"
            label="作業時間を自動的に入力する"
            className={this.props.classes.formikActionLabel}
            tooltip={
              <HelpToolTip title={<HelpTipMessages name="def_record_work" />} />
            }
          />
        )}
        <div className={this.props.classes.fieldWrapperFoods}>
          <Typography className={this.props.classes.def}>
            食事提供サービス デフォルト ※
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
            送迎サービス デフォルト ※
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
              同一敷地内送迎 デフォルト ※
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
          ※
          事業所設定の「実施オプションサービス」にチェックを入れると設定ができます。
        </Typography>
      </FormPaper>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  user: state.user as UserState
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(ServiceUseFields));
