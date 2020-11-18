import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikTextField from "@components/molecules/FormikTextField";
import FormikTime from "@components/molecules/FormikTime";
import {
  TRAIL_USAGE_KIND,
  SUPPLY_FOOD_SERVICE_LIST,
  SUPPLY_PICKUP_SERVICE_LIST,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST0,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST1,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST2,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST3,
  MEDICAL_COOPERATION_TEXT
} from "@constants/variables";
import { JIRITSUKUNRENSEIKATSU_IN_OUT_RECORDS_STATUS_MODAL } from "@constants/mgr/JIRITSUKUNRENSEIKATSU/variables";
import InOutReportFormPaper from "@components/organisms/mgr/JIRITSUKUNRENSEIKATSU/report/dialog/InOutReportFormPaper";
import { FieldItem } from "@interfaces/ui/form";
import { FormikProps } from "formik";
import { InitialValues } from "@interfaces/mgr/JIRITSUKUNRENSEIKATSU/report/initial";

const styles = (): StyleRules =>
  createStyles({
    checkbox: {
      paddingLeft: 12,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 16,
      height: 24
    },
    disabled: {
      color: "rgba(0, 0, 0, 0.38)"
    }
  });

interface StateProps {
  formikPropsValues: FormikProps<InitialValues>;
  isPickupAvailable: boolean;
  isFoodAvailable: boolean;
  isSupportMentallyAvailable: boolean;
  isShortStayAvailable: boolean;
  isSocialLifeAvailable: boolean;
  isVisualImpairment: boolean;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

interface State {
  isTrial: boolean;
  isCommute: boolean;
  isVisit: boolean;
  enableSputumImplementationFlg: boolean;
  pickupPremisesList: FieldItem[];
  pickupValue: string;
  pickupPremisesValue: string;
}

type Props = StateProps & WithStyles<typeof styles>;

// モーダル内の各ItemのmarginBottomの定数
const MODAL_ITEM_MARGIN_BOTTOM = 22;
// checkBoxの<div>のstyleの定数
const CHECK_BOX_STYLE = { margin: 0, marginBottom: 22, height: 24 };

class InOutReportDialogFields extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { formikPropsValues } = this.props;
    this.state = {
      isTrial: false,
      isCommute: false,
      isVisit: false,
      enableSputumImplementationFlg: false,
      pickupValue: formikPropsValues.values.initial.travelTime,
      pickupPremisesValue: formikPropsValues.values.initial.pickupPremises,
      pickupPremisesList: SUPPLY_PICKUP_PREMISES_SERVICE_LIST0
    };
  }

  public componentDidMount(): void {
    this.changeState(this.props.formikPropsValues.values.initial.status);
    this.changePickupPremisesState(
      this.props.formikPropsValues.values.initial.travelTime
    );

    if (
      this.props.formikPropsValues.values.initial.status === "2" &&
      this.props.formikPropsValues.values.initial.medicalCooperation === "4"
    ) {
      this.setState({ enableSputumImplementationFlg: true });
    } else {
      this.setState({ enableSputumImplementationFlg: false });
    }
  }

  private handleChangeStatusHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    this.props.setFormikFieldValue("initial.trialUsageKind", "1");
    if (e.target.value === "2") {
      this.changePickupPremisesState(
        this.props.formikPropsValues.values.initial.travelTime
      );
    }
    this.changeState(e.target.value);
  };

  /**
   * propsからの追加処理とリアルタイムにバリデーションを行う
   */
  private handleChangeInitialTime = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    beforeValue: string,
    autoCorrectValue: string
  ): string | void => {
    this.props.setFormikFieldValue(event.target.name, autoCorrectValue);
  };

  // リアルタイムにバリデーションを行いたい為、onChangeごとにFormikの更新を行う
  private onChangeText = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): string | void => {
    this.props.setFormikFieldValue(event.target.name, event.target.value);
  };

  private handleChangePickupHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    this.props.setFormikFieldValue(
      "initial.pickupPremises",
      e.target.value === this.state.pickupValue
        ? this.state.pickupPremisesValue
        : "0"
    );

    this.changePickupPremisesState(e.target.value);
  };

  private handleChangeMedicalCooperationHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (e.target.value === "4") {
      this.setState({ enableSputumImplementationFlg: true });
    } else {
      this.setState({ enableSputumImplementationFlg: false });
    }
  };

  private changeState = (status: string): void => {
    // 一度表示の初期化
    this.setState({
      isCommute: false,
      isTrial: false,
      isVisit: false
    });
    switch (status) {
      // 通所の場合
      case "2":
        this.setState({
          isCommute: true
        });
        break;
      // 訪問の場合
      case "6":
        this.setState({ isVisit: true });
        break;
      // 体験利用の場合
      case "7":
        this.setState({ isTrial: true });
        break;
      default:
    }
  };

  private changePickupPremisesState = (pickupValue: string): void => {
    let pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST0;
    switch (pickupValue) {
      case "1":
        pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST1;
        break;
      case "2":
        pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST2;
        break;
      case "3":
        pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST3;
        break;
      default:
    }
    this.setState({ pickupPremisesList });
  };

  public render(): JSX.Element {
    return (
      <InOutReportFormPaper>
        <FormGroup row>
          <FormikSelect
            name="initial.status"
            label="サービス提供の状況"
            required
            options={JIRITSUKUNRENSEIKATSU_IN_OUT_RECORDS_STATUS_MODAL}
            size="smallMedium"
            onChangeHook={this.handleChangeStatusHook}
            style={{ marginBottom: MODAL_ITEM_MARGIN_BOTTOM, minHeight: 52 }}
          />
          {this.state.isTrial && (
            <div>
              <FormikSelect
                name="initial.trialUsageKind"
                label="体験利用支援種別"
                required
                options={TRAIL_USAGE_KIND}
                size="medium"
                style={{
                  marginBottom: 8,
                  marginRight: 0,
                  width: 335,
                  minHeight: 52
                }}
              />
              <FormikCheckbox
                name="initial.lifeSupportHubInDistrictFlg"
                label="地域生活支援拠点"
                classes={{ root: this.props.classes.checkbox }}
                style={CHECK_BOX_STYLE}
              />
            </div>
          )}
        </FormGroup>
        <FormGroup row>
          <FormikTime
            name="initial.inTime"
            label="開始時間"
            required={this.state.isCommute || this.state.isVisit}
            placeholder="00:00"
            size="smallMedium"
            maxLength={5}
            disabled={!(this.state.isCommute || this.state.isVisit)}
            style={{ marginBottom: MODAL_ITEM_MARGIN_BOTTOM, minHeight: 52 }}
            error={
              this.props.formikPropsValues.errors &&
              this.props.formikPropsValues.errors.initial
                ? this.props.formikPropsValues.errors.initial.inTime !==
                  undefined
                : false
            }
            onChangeHookTime={this.handleChangeInitialTime}
          />
          <FormikTime
            name="initial.outTime"
            label="終了時間"
            placeholder="00:00"
            size="smallMedium"
            maxLength={5}
            disabled={!(this.state.isCommute || this.state.isVisit)}
            style={{ marginBottom: MODAL_ITEM_MARGIN_BOTTOM, minHeight: 52 }}
            error={
              this.props.formikPropsValues.errors &&
              this.props.formikPropsValues.errors.initial
                ? this.props.formikPropsValues.errors.initial.outTime !==
                  undefined
                : false
            }
            onChangeHookTime={this.handleChangeInitialTime}
          />
        </FormGroup>
        {this.props.isFoodAvailable && (
          <FormikSelect
            name="initial.didGetFood"
            label="食事提供"
            size="smallMedium"
            disabled={!this.state.isCommute}
            options={SUPPLY_FOOD_SERVICE_LIST}
            style={{ marginBottom: MODAL_ITEM_MARGIN_BOTTOM, minHeight: 52 }}
            FormLabelClasses={
              !this.state.isCommute
                ? { root: this.props.classes.disabled }
                : undefined
            }
          />
        )}
        {this.props.isPickupAvailable && (
          <FormGroup row>
            <FormikSelect
              name="initial.travelTime"
              label="送迎"
              size="smallMedium"
              disabled={!this.state.isCommute}
              options={SUPPLY_PICKUP_SERVICE_LIST}
              onChangeHook={this.handleChangePickupHook}
              style={{ marginBottom: MODAL_ITEM_MARGIN_BOTTOM, minHeight: 52 }}
              FormLabelClasses={
                !this.state.isCommute
                  ? { root: this.props.classes.disabled }
                  : undefined
              }
            />
            <FormikSelect
              name="initial.pickupPremises"
              label="同一敷地内送迎"
              size="smallMedium"
              options={this.state.pickupPremisesList}
              disabled={
                !this.state.isCommute ||
                this.props.formikPropsValues.values.initial.travelTime === "0"
              }
              style={{ marginBottom: MODAL_ITEM_MARGIN_BOTTOM, minHeight: 52 }}
              FormLabelClasses={
                !this.state.isCommute
                  ? { root: this.props.classes.disabled }
                  : undefined
              }
            />
          </FormGroup>
        )}
        {this.props.isVisualImpairment && (
          <FormikCheckbox
            name="initial.visitSupport"
            label="訪問支援（視覚障害者に対する専門的訓練）"
            disabled={!this.state.isVisit}
            classes={{ root: this.props.classes.checkbox }}
            style={CHECK_BOX_STYLE}
          />
        )}
        <FormGroup row>
          <FormikSelect
            name="initial.medicalCooperation"
            label="医療連携体制"
            size="smallMedium"
            options={MEDICAL_COOPERATION_TEXT}
            disabled={!this.state.isCommute}
            style={{
              marginBottom: MODAL_ITEM_MARGIN_BOTTOM,
              width: 333,
              height: 52
            }}
            onChangeHook={this.handleChangeMedicalCooperationHook}
            FormLabelClasses={
              !this.state.isCommute
                ? { root: this.props.classes.disabled }
                : undefined
            }
          />
          <FormikCheckbox
            name="initial.sputumImplementationFlg"
            label="喀痰吸引等実施"
            disabled={
              !(
                this.state.isCommute && this.state.enableSputumImplementationFlg
              )
            }
            classes={{ root: this.props.classes.checkbox }}
            style={{ margin: 0, marginTop: 24, height: 24 }}
          />
        </FormGroup>
        <FormikCheckbox
          name="initial.helpSocialLifeFlg"
          label="社会生活支援"
          disabled={!(this.state.isCommute && this.props.isSocialLifeAvailable)}
          classes={{ root: this.props.classes.checkbox }}
          style={CHECK_BOX_STYLE}
        />
        {this.props.isShortStayAvailable && (
          <FormikCheckbox
            name="initial.shortStayFlg"
            label="短期滞在"
            disabled={!this.state.isCommute}
            classes={{ root: this.props.classes.checkbox }}
            style={CHECK_BOX_STYLE}
          />
        )}
        {this.props.isSupportMentallyAvailable && (
          <FormikCheckbox
            name="initial.supportForMentallyIllDischarge"
            label="精神障害者退院支援"
            disabled={!this.state.isCommute}
            classes={{ root: this.props.classes.checkbox }}
            style={CHECK_BOX_STYLE}
          />
        )}
        <FormikCheckbox
          name="initial.specialAreaFlg"
          label="特別地域加算"
          disabled={!this.state.isVisit}
          classes={{ root: this.props.classes.checkbox }}
          style={CHECK_BOX_STYLE}
        />
        <FormikTextField
          name="initial.memo"
          label="備考"
          size="quarterSuperLong"
          style={{ marginBottom: 32, width: "100%", minHeight: 52 }}
          error={
            this.props.formikPropsValues.errors &&
            this.props.formikPropsValues.errors.initial
              ? this.props.formikPropsValues.errors.initial.memo !== undefined
              : false
          }
          onChangeHook={this.onChangeText}
        />
      </InOutReportFormPaper>
    );
  }
}

export default withStyles(styles)(InOutReportDialogFields);
