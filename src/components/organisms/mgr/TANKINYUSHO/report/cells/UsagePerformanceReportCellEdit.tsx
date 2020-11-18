import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import dispatches from "@stores/dispatches";
import { createStyles, WithStyles } from "@material-ui/core";
import { StyleRules, withStyles } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import {
  SupplyFoodsServiceList,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST0,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST1,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST2,
  SUPPLY_PICKUP_PREMISES_SERVICE_LIST3
} from "@constants/variables";
import {
  STATUS_TYPE,
  OTHER_SUPPORT,
  OtherSupport,
  SUPPLY_PICKUP_SERVICE_LIST,
  SupplyPickupServiceList,
  PickupPremiseList,
  EMERGENCY_SHORTTERM,
  OVER_HOURS,
  BulkRegistrationItemList,
  EmergencyShortterm,
  OverHours,
  USAGE_PERFORMANCE_ITEM_LIST,
  USAGE_PERFORMANCE_TANKINYUSHO_ITEM_LIST,
  UsagePerformanceStoreParamKeyToSelectBoxName,
  UsagePerformanceTANKINYUSHOStoreParamKeyToSelectBoxName,
  StatusType,
  SUPPLY_FOOD_SERVICE_LIST
} from "@constants/mgr/TANKINYUSHO/variables";
import {
  ReportState,
  UsagePerformanceType,
  UsagePerformanceTANKINYUSHOType,
  ReportType,
  REPEAT_DAILY
} from "@stores/domain/mgr/TANKINYUSHO/report/types";
import Edit from "@material-ui/icons/Edit";
import { AppState } from "@stores/type";
import DropDown from "@components/atoms/DropDown";
import { REPEAT_MONTHLY } from "@stores/domain/report/type";

const styles = (): StyleRules =>
  createStyles({
    dropDownStyle: {
      margin: 0,
      width: "80%"
    },
    cell: {
      width: "8.5%",
      minWidth: 88,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11,
      whiteSpace: "pre-wrap"
    },
    otherSupportCell: {
      width: "16.8%",
      minWidth: 174,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11,
      whiteSpace: "pre-wrap"
    },
    pickupPremiseCell: {
      width: "10%",
      minWidth: 103,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11
    },
    editCell: {
      width: "13.1%",
      minWidth: 135,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11,
      paddingTop: 14,
      paddingBottom: 14
    },
    notMargin: {
      marginTop: 0
    }
  });

interface OwnProps {
  usagePerformance: UsagePerformanceType;
  usagePerformanceTANKINYUSHO: UsagePerformanceTANKINYUSHOType;
  idx: number;
  keyValue: string;
  openModal: (
    usagePerformance: UsagePerformanceType,
    usagePerformanceTANKINYUSHO: UsagePerformanceTANKINYUSHOType
  ) => void;
  reportType: ReportType;
}

interface StateProps {
  reportState: ReportState;
}

interface DispatchProps {
  updateTANKINYUSHOUsagePerformanceItemsDaily: (
    name: string,
    value: string | number,
    keyValue: string,
    usagePerformance: ReportState["reportDaily"]["usagePerformance"]["after"]
  ) => void;
  updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsDaily: (
    name: string,
    value: string | number,
    keyValue: string,
    usagePerformanceTANKINYUSHO: ReportState["reportDaily"]["usagePerformanceTANKINYUSHO"]["after"]
  ) => void;
  updateTANKINYUSHOUsagePerformanceItemsMonthly: (
    name: string,
    value: string | number,
    keyValue: string,
    usagePerformance: ReportState["reportMonthly"]["usagePerformance"]["after"]
  ) => void;
  updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsMonthly: (
    name: string,
    value: string | number,
    keyValue: string,
    usagePerformanceTANKINYUSHO: ReportState["reportMonthly"]["usagePerformanceTANKINYUSHO"]["after"]
  ) => void;
}

type Props = OwnProps & WithStyles<typeof styles> & DispatchProps & StateProps;

class UsagePerformanceReportCellEdit extends React.Component<Props> {
  /**
   * 同一敷地内の選択肢変更イベント
   */
  private changePickupPremisesState = (
    pickupValue: number
  ): { label: string; value: string }[] => {
    let pickupPremisesList;
    switch (pickupValue) {
      case 1:
        pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST1;
        break;
      case 2:
        pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST2;
        break;
      case 3:
        pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST3;
        break;
      default:
        pickupPremisesList = SUPPLY_PICKUP_PREMISES_SERVICE_LIST0;
    }
    return pickupPremisesList;
  };

  /**
   * 編集モーダルの表示イベント
   */
  private openModal = (): void => {
    this.props.openModal(
      this.props.usagePerformance,
      this.props.usagePerformanceTANKINYUSHO
    );
  };

  /**
   * 値の変更イベント
   */
  private changeSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (this.props.reportType === REPEAT_DAILY) {
      this.changeSelectDaily(event);
    }
    if (this.props.reportType === REPEAT_MONTHLY) {
      this.changeSelectMonthly(event);
    }
  };

  /**
   * 値の変更イベント(日ごと)
   */
  private changeSelectDaily = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const targetName = event.target.name as BulkRegistrationItemList;
    const targetValue = event.target.value;
    const { keyValue } = this.props;

    if (USAGE_PERFORMANCE_ITEM_LIST.includes(targetName)) {
      // 変更が無ければ何もしない
      if (this.notUpdateUsagePerformance(targetName, targetValue)) {
        return;
      }
      this.props.updateTANKINYUSHOUsagePerformanceItemsDaily(
        targetName,
        targetValue,
        keyValue,
        this.props.reportState.reportDaily.usagePerformance.after
      );
    } else if (USAGE_PERFORMANCE_TANKINYUSHO_ITEM_LIST.includes(targetName)) {
      // 変更がなければ何もしない
      if (this.notUpdateUsagePerformanceTANKINYUSHO(targetName, targetValue)) {
        return;
      }
      this.props.updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsDaily(
        targetName,
        targetValue,
        keyValue,
        this.props.reportState.reportDaily.usagePerformanceTANKINYUSHO.after
      );
    }
  };

  /**
   * 値の変更イベント(月ごと)
   */
  private changeSelectMonthly = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const targetName = event.target.name as BulkRegistrationItemList;
    const targetValue = event.target.value;
    const { keyValue } = this.props;

    if (USAGE_PERFORMANCE_ITEM_LIST.includes(targetName)) {
      // 変更が無ければ何もしない
      if (this.notUpdateUsagePerformance(targetName, targetValue)) {
        return;
      }
      this.props.updateTANKINYUSHOUsagePerformanceItemsMonthly(
        targetName,
        targetValue,
        keyValue,
        this.props.reportState.reportMonthly.usagePerformance.after
      );
    } else if (USAGE_PERFORMANCE_TANKINYUSHO_ITEM_LIST.includes(targetName)) {
      // 変更がなければ何もしない
      if (this.notUpdateUsagePerformanceTANKINYUSHO(targetName, targetValue)) {
        return;
      }
      this.props.updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsMonthly(
        targetName,
        targetValue,
        keyValue,
        this.props.reportState.reportMonthly.usagePerformanceTANKINYUSHO.after
      );
    }
  };

  /**
   * usagePerformanceの値更新チェック
   */
  private notUpdateUsagePerformance = (
    name: string,
    value: string
  ): boolean => {
    return (
      value ===
      `${
        this.props.usagePerformance[
          UsagePerformanceStoreParamKeyToSelectBoxName[name].storeKey
        ]
      }`
    );
  };

  /**
   * usagePerformanceTANKINYUSHOの値更新チェック
   * usagePerformanceTANKINYUSHOが存在しない場合false
   */
  private notUpdateUsagePerformanceTANKINYUSHO = (
    name: string,
    value: string
  ): boolean => {
    return this.props.usagePerformanceTANKINYUSHO
      ? value ===
          `${
            this.props.usagePerformanceTANKINYUSHO[
              UsagePerformanceTANKINYUSHOStoreParamKeyToSelectBoxName[name]
                .storeKey
            ]
          }`
      : false;
  };

  public render(): JSX.Element {
    const {
      idx,
      usagePerformance,
      usagePerformanceTANKINYUSHO,
      classes
    } = this.props;

    // サービス提供状況が[-]かどうかの判定
    const isStatusNone = `${usagePerformance.statusType}` === StatusType.NONE;

    return (
      <>
        {/* サービス提供の状況 */}
        <TableCellWrap key={`${idx}-status-type`} cellClass={classes.cell}>
          <DropDown
            id={`${idx}-status-type-drop-down`}
            key={`${idx}-status-type-drop-down`}
            options={STATUS_TYPE}
            onChange={this.changeSelect}
            value={`${usagePerformance.statusType}`}
            helperText=""
            InputProps={{ name: BulkRegistrationItemList.STATUS_TYPE }}
            classes={{ dropDown: classes.dropDownStyle }}
          />
        </TableCellWrap>

        {/* 生活介護または指定通所支援等を実施 */}
        <TableCellWrap
          key={`${idx}-other-support`}
          cellClass={classes.otherSupportCell}
        >
          <DropDown
            id={`${idx}-other-support-drop-down`}
            key={`${idx}-other-support-drop-down`}
            options={OTHER_SUPPORT}
            onChange={this.changeSelect}
            value={
              usagePerformanceTANKINYUSHO
                ? `${usagePerformanceTANKINYUSHO.otherSupport}`
                : OtherSupport.NONE
            }
            helperText=""
            InputProps={{ name: BulkRegistrationItemList.OTHER_SUPPORT }}
            classes={{ dropDown: classes.dropDownStyle }}
            isDisabled={isStatusNone}
          />
        </TableCellWrap>

        {/* 食事提供 */}
        <TableCellWrap key={`${idx}-food`} cellClass={classes.cell}>
          <DropDown
            id={`${idx}-food-drop-down`}
            key={`${idx}-food-drop-down`}
            options={SUPPLY_FOOD_SERVICE_LIST}
            onChange={this.changeSelect}
            value={
              usagePerformanceTANKINYUSHO
                ? `${usagePerformanceTANKINYUSHO.food}`
                : SupplyFoodsServiceList["-"]
            }
            helperText=""
            InputProps={{ name: BulkRegistrationItemList.FOOD }}
            classes={{ dropDown: classes.dropDownStyle }}
            isDisabled={isStatusNone}
          />
        </TableCellWrap>

        {/* 送迎 */}
        <TableCellWrap key={`${idx}-pick-up`} cellClass={classes.cell}>
          <DropDown
            id={`${idx}-pick-up-drop-down`}
            key={`${idx}-pick-up-drop-down`}
            options={SUPPLY_PICKUP_SERVICE_LIST}
            onChange={this.changeSelect}
            value={
              usagePerformanceTANKINYUSHO
                ? `${usagePerformanceTANKINYUSHO.pickup}`
                : SupplyPickupServiceList.NONE
            }
            helperText=""
            InputProps={{ name: BulkRegistrationItemList.PICK_UP }}
            classes={{ dropDown: classes.dropDownStyle }}
            isDisabled={isStatusNone}
          />
        </TableCellWrap>

        {/* 同一敷地内 */}
        <TableCellWrap
          key={`${idx}-pick-up-premises`}
          cellClass={classes.pickupPremiseCell}
        >
          <DropDown
            id={`${idx}-pick-up-premises-drop-down`}
            key={`${idx}-pick-up-premises-drop-down`}
            options={this.changePickupPremisesState(
              this.props.usagePerformanceTANKINYUSHO.pickup
            )}
            onChange={this.changeSelect}
            value={
              usagePerformanceTANKINYUSHO
                ? `${usagePerformanceTANKINYUSHO.pickupPremises}`
                : PickupPremiseList.NONE
            }
            helperText=""
            InputProps={{ name: BulkRegistrationItemList.PICK_UP_PREMISE }}
            classes={{ dropDown: classes.dropDownStyle }}
            isDisabled={
              isStatusNone ||
              this.props.usagePerformanceTANKINYUSHO.pickup === 0
            }
          />
        </TableCellWrap>

        {/* 緊急短期入所受入 */}
        <TableCellWrap
          key={`${idx}-emergency-shortitem-flg`}
          cellClass={classes.cell}
        >
          <DropDown
            id={`${idx}-emergency-shortitem-flg-drop-down`}
            key={`${idx}-emergency-shortitem-flg-drop-down`}
            options={EMERGENCY_SHORTTERM}
            onChange={this.changeSelect}
            value={
              usagePerformanceTANKINYUSHO
                ? `${usagePerformanceTANKINYUSHO.emergencyShortterm}`
                : EmergencyShortterm.NONE
            }
            helperText=""
            InputProps={{
              name: BulkRegistrationItemList.EMERGENCY_SHORTTERM
            }}
            classes={{ dropDown: classes.dropDownStyle }}
            isDisabled={isStatusNone}
          />
        </TableCellWrap>

        {/* 単独型18時間以上 */}
        <TableCellWrap key={`${idx}-over-hours-flg`} cellClass={classes.cell}>
          <DropDown
            id={`${idx}-over-hours-flg-drop-down`}
            key={`${idx}-over-hours-flg-drop-down`}
            options={OVER_HOURS}
            onChange={this.changeSelect}
            value={
              usagePerformanceTANKINYUSHO
                ? `${usagePerformanceTANKINYUSHO.overHours}`
                : OverHours.NONE
            }
            helperText=""
            InputProps={{ name: BulkRegistrationItemList.OVER_HOURS }}
            classes={{ dropDown: classes.dropDownStyle }}
            isDisabled={isStatusNone}
          />
        </TableCellWrap>

        {/* 編集ボタン */}
        <TableCellWrap
          key={`${idx}-edit-icon`}
          cellClass={classes.editCell}
          align="right"
        >
          <Edit
            style={{
              width: 18,
              height: 18,
              color: "#0277bd",
              cursor: "pointer"
            }}
            onClick={this.openModal}
          />
        </TableCellWrap>
      </>
    );
  }
}
const mapStateToProps = (state: AppState): StateProps => ({
  reportState: state.TANKINYUSHO.report
});

type Dispatcher = {
  updateTANKINYUSHOUsagePerformanceItemsDaily: (
    name: string,
    value: string | number,
    keyValue: string,
    usagePerformance: ReportState["reportDaily"]["usagePerformance"]["after"]
  ) => Promise<void>;
  updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsDaily: (
    name: string,
    value: string | number,
    keyValue: string,
    usagePerformanceTANKINYUSHO: ReportState["reportDaily"]["usagePerformanceTANKINYUSHO"]["after"]
  ) => Promise<void>;
  updateTANKINYUSHOUsagePerformanceItemsMonthly: (
    name: string,
    value: string | number,
    keyValue: string,
    usagePerformance: ReportState["reportMonthly"]["usagePerformance"]["after"]
  ) => Promise<void>;
  updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsMonthly: (
    name: string,
    value: string | number,
    keyValue: string,
    usagePerformanceTANKINYUSHO: ReportState["reportMonthly"]["usagePerformanceTANKINYUSHO"]["after"]
  ) => Promise<void>;
};

const mapDispatchToProps = (dispatch: Dispatch): Dispatcher => {
  const { TANKINYUSHO } = dispatches;

  return {
    updateTANKINYUSHOUsagePerformanceItemsDaily: (
      name: string,
      value: string | number,
      keyValue: string,
      usagePerformance: ReportState["reportDaily"]["usagePerformance"]["after"]
    ): Promise<void> =>
      TANKINYUSHO.reportDispatcher(
        dispatch
      ).updateTANKINYUSHOUsagePerformanceItemsDaily(
        name,
        value,
        keyValue,
        usagePerformance
      ),
    updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsDaily: (
      name: string,
      value: string | number,
      keyValue: string,
      usagePerformanceTANKINYUSHO: ReportState["reportDaily"]["usagePerformanceTANKINYUSHO"]["after"]
    ): Promise<void> =>
      TANKINYUSHO.reportDispatcher(
        dispatch
      ).updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsDaily(
        name,
        value,
        keyValue,
        usagePerformanceTANKINYUSHO
      ),
    updateTANKINYUSHOUsagePerformanceItemsMonthly: (
      name: string,
      value: string | number,
      keyValue: string,
      usagePerformance: ReportState["reportMonthly"]["usagePerformance"]["after"]
    ): Promise<void> =>
      TANKINYUSHO.reportDispatcher(
        dispatch
      ).updateTANKINYUSHOUsagePerformanceItemsMonthly(
        name,
        value,
        keyValue,
        usagePerformance
      ),
    updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsMonthly: (
      name: string,
      value: string | number,
      keyValue: string,
      usagePerformanceTANKINYUSHO: ReportState["reportMonthly"]["usagePerformanceTANKINYUSHO"]["after"]
    ): Promise<void> =>
      TANKINYUSHO.reportDispatcher(
        dispatch
      ).updateTANKINYUSHOUsagePerformanceTANKINYUSHOItemsMonthly(
        name,
        value,
        keyValue,
        usagePerformanceTANKINYUSHO
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UsagePerformanceReportCellEdit));
