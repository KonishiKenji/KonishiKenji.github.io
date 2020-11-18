import * as React from "react";
import {
  createStyles,
  WithStyles,
  withStyles,
  Typography
} from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikTextField from "@components/molecules/FormikTextField";
import { FormikProps } from "formik";
import { InitialValues } from "@interfaces/mgr/SHISETSUNYUSHO/report/initial";
import {
  ORAL_TRANSITION,
  ORAL_PRESERVATION,
  STATUS_TYPE,
  StatusType,
  OralPreservation,
  OralTransition,
  HOSPITALIZATION_OVERNIGHTSTAY_BY_DIALOG
} from "@constants/mgr/SHISETSUNYUSHO/variables";
import Paper from "@material-ui/core/Paper";
import { FacilityState } from "@stores/domain/mgr/SHISETSUNYUSHO/facility/types";

const styles = (): StyleRules =>
  createStyles({
    checkbox: {
      paddingLeft: 12,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 16,
      height: 22.8
    },
    typographyMargin: { marginBottom: 11 },
    disabled: {
      color: "rgba(0, 0, 0, 0.38)"
    },
    foodGroup: {
      marginBottom: 30,
      marginTop: 0,
      minHeight: 24
    }
  });

interface StateProps {
  formikPropsValues: FormikProps<InitialValues>;
  isSevereDisabilitySupport: boolean;
  facilityState: FacilityState;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

interface State {
  isStatusTypeNone: boolean;
}

type Props = StateProps & WithStyles<typeof styles>;

class UsagePerformanceReportDialogFields extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isStatusTypeNone: true
    };
  }

  public componentDidMount(): void {
    this.setIsCommuteByStatus(
      this.props.formikPropsValues.values.initial.statusType
    );
  }

  // サービス提供実施の値が変更されたら、他項目のdisableの変更を行う
  private handleChangeStatusHook = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    this.setIsCommuteByStatus(e.target.value);
  };

  // サービス提供の状況の判定
  private setIsCommuteByStatus = (status: string): void => {
    // 【-】時に他項目をdisableにする
    const isStatusTypeNone = status === StatusType.NONE.toString();
    this.setState({ isStatusTypeNone });
  };

  // リアルタイムにバリデーションを行いたい為、onChangeごとにFormikの更新を行う
  private onChangeText = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): string | void => {
    this.props.setFormikFieldValue(event.target.name, event.target.value);
  };

  public render(): JSX.Element {
    const checkBoxStyle = { marginBottom: 22, marginTop: 0, minHeight: 24 };
    const selectBoxStyle = { marginBottom: 30, minHeight: 52, minWidth: 330 };
    const foodCheckBoxStyle = { marginBottom: 0, marginTop: 0 };
    return (
      <Paper component="section" elevation={0}>
        <FormikSelect
          name="initial.statusType"
          label="サービス提供の状況"
          options={STATUS_TYPE}
          onChangeHook={this.handleChangeStatusHook}
          style={{ ...selectBoxStyle, marginBottom: 22 }}
          required
        />
        <FormikSelect
          name="initial.hospitalizationOvernightStay"
          label="入院・外泊"
          size="smallMedium"
          disabled={this.state.isStatusTypeNone}
          options={HOSPITALIZATION_OVERNIGHTSTAY_BY_DIALOG}
          style={selectBoxStyle}
          FormLabelClasses={
            this.state.isStatusTypeNone
              ? { root: this.props.classes.disabled }
              : undefined
          }
        />
        <FormikCheckbox
          name="initial.regionalTransitionFlg"
          label="地域移行加算"
          classes={{ root: this.props.classes.checkbox }}
          disabled={this.state.isStatusTypeNone}
          style={checkBoxStyle}
        />
        <FormikCheckbox
          name="initial.collectionOfUtilityFeeFlg"
          label="光熱水費提供"
          classes={{ root: this.props.classes.checkbox }}
          disabled={this.state.isStatusTypeNone}
          style={checkBoxStyle}
        />
        {this.props.facilityState.nutritionManagementFlg && (
          <FormikCheckbox
            name="initial.nutritionManagementFlg"
            label="栄養マネジメント"
            classes={{ root: this.props.classes.checkbox }}
            disabled={this.state.isStatusTypeNone}
            style={checkBoxStyle}
          />
        )}
        {this.props.facilityState.availableFood && (
          <>
            <Typography
              classes={{
                root: !this.state.isStatusTypeNone
                  ? this.props.classes.typographyMargin
                  : `${this.props.classes.typographyMargin} ${this.props.classes.disabled}`
              }}
            >
              食事提供
            </Typography>
            <FormGroup row className={this.props.classes.foodGroup}>
              <FormikCheckbox
                name="initial.foodBreakfastFlg"
                label="朝"
                classes={{ root: this.props.classes.checkbox }}
                disabled={this.state.isStatusTypeNone}
                style={foodCheckBoxStyle}
              />
              <FormikCheckbox
                name="initial.foodLunchFlg"
                label="昼"
                classes={{ root: this.props.classes.checkbox }}
                disabled={this.state.isStatusTypeNone}
                style={foodCheckBoxStyle}
              />
              <FormikCheckbox
                name="initial.foodSupperFlg"
                label="夜"
                classes={{ root: this.props.classes.checkbox }}
                disabled={this.state.isStatusTypeNone}
                style={foodCheckBoxStyle}
              />
            </FormGroup>
          </>
        )}

        <FormikSelect
          name="initial.oralTransition"
          label="経口移行"
          size="smallMedium"
          disabled={this.state.isStatusTypeNone}
          options={ORAL_TRANSITION}
          style={selectBoxStyle}
          FormLabelClasses={
            this.state.isStatusTypeNone
              ? { root: this.props.classes.disabled }
              : undefined
          }
        />
        <FormikSelect
          name="initial.oralPreservation"
          label="経口維持"
          size="smallMedium"
          disabled={this.state.isStatusTypeNone}
          options={ORAL_PRESERVATION}
          style={selectBoxStyle}
          FormLabelClasses={
            this.state.isStatusTypeNone
              ? { root: this.props.classes.disabled }
              : undefined
          }
        />
        <FormikCheckbox
          name="initial.medicalFoodsFlg"
          label="療養食"
          classes={{ root: this.props.classes.checkbox }}
          disabled={
            this.state.isStatusTypeNone ||
            !(
              this.props.formikPropsValues.values.initial.oralPreservation ===
                OralPreservation.NONE.toString() &&
              this.props.formikPropsValues.values.initial.oralTransition ===
                OralTransition.NONE.toString()
            )
          }
          style={checkBoxStyle}
        />
        <FormikCheckbox
          name="initial.severeDisabilitySupportFlg"
          label="研修修了者による重度障害者支援（個別支援）を実施"
          classes={{ root: this.props.classes.checkbox }}
          disabled={
            this.state.isStatusTypeNone ||
            this.props.facilityState.seriousDisability === 0 ||
            !this.props.isSevereDisabilitySupport
          }
          style={checkBoxStyle}
        />
        <FormikTextField
          name="initial.remarks"
          label="備考"
          size="quarterSuperLong"
          style={{ marginBottom: 48, width: 536, minHeight: 52 }}
          error={
            this.props.formikPropsValues.errors &&
            this.props.formikPropsValues.errors.initial
              ? this.props.formikPropsValues.errors.initial.remarks !==
                undefined
              : false
          }
          onChangeHook={this.onChangeText}
        />
      </Paper>
    );
  }
}
export default withStyles(styles)(UsagePerformanceReportDialogFields);
