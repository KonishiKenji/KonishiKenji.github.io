import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import dispatches from "@stores/dispatches";
import { createStyles, WithStyles } from "@material-ui/core";
import { StyleRules, withStyles } from "@material-ui/core/styles";
import TableCellWrap from "@components/atoms/TableCellWrap";
import {
  COLLECTION_OF_UTILITY_FEE,
  FOOD_BREAKFAST,
  FOOD_LUNCH,
  FOOD_SUPPER,
  HOSPITALIZATION_OVERNIGHTSTAY,
  REGIONAL_TRANSITION,
  STATUS_TYPE,
  StatusType,
  HospitalizationOvernightstay,
  BulkRegistrationItemList,
  RegionalTransition,
  CollectionOfUtilityFee,
  FoodBreakfast,
  FoodLunch,
  FoodSupper,
  UsagePerformanceStoreParamKeyToSelectBoxName,
  UsagePerformanceSHISETSUNYUSHOStoreParamKeyToSelectBoxName,
  USAGE_PERFORMANCE_SHISETSUNYUSHO_ITEM_LIST,
  USAGE_PERFORMANCE_ITEM_LIST
} from "@constants/mgr/SHISETSUNYUSHO/variables";
import {
  ReportState,
  UsagePerformanceType,
  UsagePerformanceSHISETSUNYUSHOType,
  ReportType,
  REPEAT_DAILY,
  REPEAT_USERS
} from "@stores/domain/mgr/SHISETSUNYUSHO/report/types";
import EditIcon from "@material-ui/icons/Edit";
import { AppState } from "@stores/type";
import DropDown from "@components/atoms/DropDown";

const styles = (): StyleRules =>
  createStyles({
    dropDownStyle: {
      margin: 0,
      width: "80%"
    },
    superLongCell: {
      width: "15%",
      minWidth: 256,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11
    },
    longCell: {
      width: "15%",
      minWidth: 158,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11
    },
    middleCell: {
      width: "7%",
      minWidth: 72,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11
    },
    shortCell: {
      width: "5%",
      minWidth: 54,
      boxSizing: "content-box",
      paddingRight: 0,
      paddingLeft: 11
    },
    editCell: {
      width: "5%",
      minWidth: 77,
      boxSizing: "content-box",
      paddingLeft: 0,
      paddingTop: 14,
      paddingBottom: 14
    },
    notMargin: {
      marginTop: 0
    },
    hidden: {
      display: "none"
    },
    minWidth: {
      minWidth: 64
    },
    statusWidth: {
      width: 256
    }
  });

interface OwnProps {
  usagePerformance: UsagePerformanceType;
  usagePerformanceSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType;
  idx: number;
  keyValue: string;
  openModal: (
    usagePerformance: UsagePerformanceType,
    usagePerformanceSHISETSUNYUSHO: UsagePerformanceSHISETSUNYUSHOType
  ) => void;
  isDisabledFood: boolean;
  reportType: ReportType;
}

interface StateProps {
  reportState: ReportState;
}

interface DispatchProps {
  updateSHISETSUNYUSHOUsagePerformanceItemsDaily: (
    name: string,
    value: string | number,
    keyValue: string,
    reportState: ReportState
  ) => void;
  updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsDaily: (
    name: string,
    value: string | number,
    keyValue: string,
    reportState: ReportState
  ) => void;
  updateSHISETSUNYUSHOUsagePerformanceItemsUsers: (
    name: string,
    value: string | number,
    keyValue: string,
    reportState: ReportState
  ) => void;
  updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsUsers: (
    name: string,
    value: string | number,
    keyValue: string,
    reportState: ReportState
  ) => void;
}

type Props = OwnProps & WithStyles<typeof styles> & DispatchProps & StateProps;

class UsagePerformanceReportCellEdit extends React.Component<Props> {
  /**
   * 編集モーダルの表示イベント
   */
  private openModal = (): void => {
    this.props.openModal(
      this.props.usagePerformance,
      this.props.usagePerformanceSHISETSUNYUSHO
    );
  };

  /**
   * 値の変更イベント
   */
  private changeSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const targetName = event.target.name as BulkRegistrationItemList;
    const targetValue = event.target.value;
    const { reportType } = this.props;

    if (reportType === REPEAT_DAILY) {
      this.updateStoreData(
        targetName,
        targetValue,
        this.props.updateSHISETSUNYUSHOUsagePerformanceItemsDaily,
        this.props.updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsDaily
      );
    } else if (reportType === REPEAT_USERS) {
      this.updateStoreData(
        targetName,
        targetValue,
        this.props.updateSHISETSUNYUSHOUsagePerformanceItemsUsers,
        this.props.updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsUsers
      );
    }
  };

  /**
   * store反映
   */
  private updateStoreData = (
    targetName: BulkRegistrationItemList,
    targetValue: string,
    updateUsagePerformanceDispatcher:
      | Props["updateSHISETSUNYUSHOUsagePerformanceItemsDaily"]
      | Props["updateSHISETSUNYUSHOUsagePerformanceItemsUsers"],
    updateUsagePerformanceSHISETSUNYUSHODispatcher:
      | Props["updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsDaily"]
      | Props["updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsUsers"]
  ): void => {
    if (USAGE_PERFORMANCE_ITEM_LIST.includes(targetName)) {
      // 変更が無ければ何もしない
      if (this.notUpdateUsagePerformance(targetName, targetValue)) {
        return;
      }
      updateUsagePerformanceDispatcher(
        targetName,
        targetValue,
        this.props.keyValue,
        this.props.reportState
      );
    } else if (
      USAGE_PERFORMANCE_SHISETSUNYUSHO_ITEM_LIST.includes(targetName)
    ) {
      // 変更がなければ何もしない
      if (
        this.notUpdateUsagePerformanceSHISETSUNYUSHO(targetName, targetValue)
      ) {
        return;
      }
      updateUsagePerformanceSHISETSUNYUSHODispatcher(
        targetName,
        targetValue,
        this.props.keyValue,
        this.props.reportState
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
   * usagePerformanceSHISETSUNYUSHOの値更新チェック
   * usagePerformanceSHISETSUNYUSHOが存在しない場合false
   */
  private notUpdateUsagePerformanceSHISETSUNYUSHO = (
    name: string,
    value: string
  ): boolean => {
    return this.props.usagePerformanceSHISETSUNYUSHO
      ? value ===
          `${
            this.props.usagePerformanceSHISETSUNYUSHO[
              UsagePerformanceSHISETSUNYUSHOStoreParamKeyToSelectBoxName[name]
                .storeKey
            ]
          }`
      : false;
  };

  public render(): JSX.Element {
    const {
      idx,
      usagePerformance,
      usagePerformanceSHISETSUNYUSHO,
      classes,
      isDisabledFood
    } = this.props;

    // サービス提供状況が[-]かどうかの判定
    const isStatusNone = `${usagePerformance.statusType}` === StatusType.NONE;

    return (
      <>
        {/* サービス提供の状況 */}
        <TableCellWrap
          key={`${idx}-status-type`}
          cellClass={classes.superLongCell}
        >
          <DropDown
            id={`${idx}-status-type-drop-down`}
            key={`${idx}-status-type-drop-down`}
            options={STATUS_TYPE}
            onChange={this.changeSelect}
            value={`${usagePerformance.statusType}`}
            helperText=""
            InputProps={{ name: BulkRegistrationItemList.STATUS_TYPE }}
            classes={{ dropDown: classes.dropDownStyle }}
            styles={classes.statusWidth}
          />
        </TableCellWrap>

        {/* 入院・外泊 */}
        <TableCellWrap
          key={`${idx}-hospitalization-overnight-stay`}
          cellClass={classes.longCell}
        >
          <DropDown
            id={`${idx}-hospitalization-overnight-stay-drop-down`}
            key={`${idx}-hospitalization-overnight-stay-drop-down`}
            options={HOSPITALIZATION_OVERNIGHTSTAY}
            onChange={this.changeSelect}
            value={
              usagePerformanceSHISETSUNYUSHO
                ? `${usagePerformanceSHISETSUNYUSHO.hospitalizationOvernightStay}`
                : HospitalizationOvernightstay.NONE
            }
            helperText=""
            InputProps={{
              name: BulkRegistrationItemList.HOSPITALIZATION_OVERNIGHTSTAY
            }}
            classes={{ dropDown: classes.dropDownStyle }}
            isDisabled={isStatusNone}
          />
        </TableCellWrap>

        {/* 地域移行加算 */}
        <TableCellWrap
          key={`${idx}-regional-transition`}
          cellClass={classes.middleCell}
        >
          <DropDown
            id={`${idx}-regional-transition-drop-down`}
            key={`${idx}-regional-transition-drop-down`}
            options={REGIONAL_TRANSITION}
            onChange={this.changeSelect}
            value={
              usagePerformanceSHISETSUNYUSHO
                ? `${usagePerformanceSHISETSUNYUSHO.regionalTransition}`
                : RegionalTransition.NONE
            }
            helperText=""
            InputProps={{
              name: BulkRegistrationItemList.REGIONAL_TRANSITION
            }}
            classes={{ dropDown: classes.dropDownStyle }}
            isDisabled={isStatusNone}
            styles={classes.minWidth}
          />
        </TableCellWrap>

        {/* 光熱水費 */}
        <TableCellWrap
          key={`${idx}-collection-of-utility-fee`}
          cellClass={classes.middleCell}
        >
          <DropDown
            id={`${idx}-collection-of-utility-fee-drop-down`}
            key={`${idx}-collection-of-utility-fee-drop-down`}
            options={COLLECTION_OF_UTILITY_FEE}
            onChange={this.changeSelect}
            value={
              usagePerformanceSHISETSUNYUSHO
                ? `${usagePerformanceSHISETSUNYUSHO.collectionOfUtilityFee}`
                : CollectionOfUtilityFee.NONE
            }
            helperText=""
            InputProps={{
              name: BulkRegistrationItemList.COLLECTION_OF_UTILITY_FEE
            }}
            classes={{ dropDown: classes.dropDownStyle }}
            isDisabled={isStatusNone}
            styles={classes.minWidth}
          />
        </TableCellWrap>

        {/* 食事提供(朝) */}
        <TableCellWrap
          key={`${idx}-food-breakfast`}
          cellClass={isDisabledFood ? classes.hidden : classes.middleCell}
        >
          <DropDown
            id={`${idx}-food-breakfast-drop-down`}
            key={`${idx}-food-breakfast-drop-down`}
            options={FOOD_BREAKFAST}
            onChange={this.changeSelect}
            value={
              usagePerformanceSHISETSUNYUSHO
                ? `${usagePerformanceSHISETSUNYUSHO.foodBreakfast}`
                : FoodBreakfast.NONE
            }
            helperText=""
            InputProps={{ name: BulkRegistrationItemList.FOOD_BREAKFAST }}
            classes={{ dropDown: classes.dropDownStyle }}
            isDisabled={isStatusNone}
            styles={classes.minWidth}
          />
        </TableCellWrap>

        {/* 食事提供(昼) */}
        <TableCellWrap
          key={`${idx}-food-lunch`}
          cellClass={isDisabledFood ? classes.hidden : classes.shortCell}
        >
          <DropDown
            id={`${idx}-food-lunch-drop-down`}
            key={`${idx}-food-lunch-drop-down`}
            options={FOOD_LUNCH}
            onChange={this.changeSelect}
            value={
              usagePerformanceSHISETSUNYUSHO
                ? `${usagePerformanceSHISETSUNYUSHO.foodLunch}`
                : FoodLunch.NONE
            }
            helperText=""
            InputProps={{
              name: BulkRegistrationItemList.FOOD_LUNCH
            }}
            classes={{ dropDown: classes.dropDownStyle }}
            isDisabled={isStatusNone}
            styles={classes.minWidth}
          />
        </TableCellWrap>

        {/* 食事提供(夜) */}
        <TableCellWrap
          key={`${idx}-food-supper`}
          cellClass={isDisabledFood ? classes.hidden : classes.shortCell}
        >
          <DropDown
            id={`${idx}-food-supper-drop-down`}
            key={`${idx}-food-supper-drop-down`}
            options={FOOD_SUPPER}
            onChange={this.changeSelect}
            value={
              usagePerformanceSHISETSUNYUSHO
                ? `${usagePerformanceSHISETSUNYUSHO.foodSupper}`
                : FoodSupper.NONE
            }
            helperText=""
            InputProps={{ name: BulkRegistrationItemList.FOOD_SUPPER }}
            classes={{ dropDown: classes.dropDownStyle }}
            isDisabled={isStatusNone}
            styles={classes.minWidth}
          />
        </TableCellWrap>

        {/* 編集ボタン */}
        <TableCellWrap
          key={`${idx}-edit-icon`}
          cellClass={classes.editCell}
          align="right"
        >
          <EditIcon
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
  reportState: state.SHISETSUNYUSHO.report
});

type Dispatcher = {
  updateSHISETSUNYUSHOUsagePerformanceItemsDaily: (
    name: string,
    value: string | number,
    keyValue: string,
    reportState: ReportState
  ) => Promise<void>;
  updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsDaily: (
    name: string,
    value: string | number,
    keyValue: string,
    reportState: ReportState
  ) => Promise<void>;
  updateSHISETSUNYUSHOUsagePerformanceItemsUsers: (
    name: string,
    value: string | number,
    keyValue: string,
    reportState: ReportState
  ) => Promise<void>;
  updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsUsers: (
    name: string,
    value: string | number,
    keyValue: string,
    reportState: ReportState
  ) => Promise<void>;
};

const mapDispatchToProps = (dispatch: Dispatch): Dispatcher => {
  const { SHISETSUNYUSHO } = dispatches;

  return {
    updateSHISETSUNYUSHOUsagePerformanceItemsDaily: (
      name: string,
      value: string | number,
      keyValue: string,
      reportState: ReportState
    ): Promise<void> =>
      SHISETSUNYUSHO.reportDispatcher(
        dispatch
      ).updateSHISETSUNYUSHOUsagePerformanceItemsDaily(
        name,
        value,
        keyValue,
        reportState
      ),
    updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsDaily: (
      name: string,
      value: string | number,
      keyValue: string,
      reportState: ReportState
    ): Promise<void> =>
      SHISETSUNYUSHO.reportDispatcher(
        dispatch
      ).updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsDaily(
        name,
        value,
        keyValue,
        reportState
      ),
    updateSHISETSUNYUSHOUsagePerformanceItemsUsers: (
      name: string,
      value: string | number,
      keyValue: string,
      reportState: ReportState
    ): Promise<void> =>
      SHISETSUNYUSHO.reportDispatcher(
        dispatch
      ).updateSHISETSUNYUSHOUsagePerformanceItemsUsers(
        name,
        value,
        keyValue,
        reportState
      ),
    updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsUsers: (
      name: string,
      value: string | number,
      keyValue: string,
      reportState: ReportState
    ): Promise<void> =>
      SHISETSUNYUSHO.reportDispatcher(
        dispatch
      ).updateSHISETSUNYUSHOUsagePerformanceSHISETSUNYUSHOItemsUsers(
        name,
        value,
        keyValue,
        reportState
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UsagePerformanceReportCellEdit));
