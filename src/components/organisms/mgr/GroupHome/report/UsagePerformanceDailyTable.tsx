import * as React from "react";
import * as ClassNames from "classnames";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { withStyles, StyleRules } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Table from "@components/molecules/Table";
import TableHead, { HeaderProps } from "@components/molecules/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import UsagePerformanceReportDailyCell from "@components/organisms/mgr/GroupHome/report/cells/UsagePerformanceReportDailyCell";
import { REPEAT_DAILY, ReportState } from "@stores/domain/report/type";
import { FacilityState } from "@stores/domain/mgr/GroupHome/facility/types";
import { BASE_GREY_TEXT_COLOR } from "@/constants/styles";

const styles = ({ palette }: Theme): StyleRules =>
  createStyles({
    table: {
      minWidth: 1030
    },
    nightReadOnlyHeader: {
      padding: "0px 16px 0px 0px"
    },
    row: {
      "&:nth-of-type(even)": {
        backgroundColor: palette.background.default
      }
    },
    noData: {
      clear: "both",
      marginTop: 76,
      textAlign: "center",
      height: 104,
      color: BASE_GREY_TEXT_COLOR
    },
    disableCell: {
      display: "none"
    },
    nightShortCell: {
      width: 60,
      minWidth: 60,
      boxSizing: "content-box"
    },
    shortCell: {
      width: 64,
      minWidth: 64,
      boxSizing: "content-box"
    },
    middleCell: {
      width: 130,
      minWidth: 130,
      boxSizing: "content-box"
    },
    longCell: {
      width: 226,
      minWidth: 226,
      boxSizing: "content-box"
    },
    sticky: {
      zIndex: 10,
      position: "sticky"
    }
  });

interface StateProps {
  report: ReportState;
  facility: FacilityState;
}

interface DispatchProps {
  setStatusType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setNightSupportType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setHospitalizationSupportType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setGetHomeSupportType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setDaytimeSupportType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setMedicalSupportType: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setLifeSupportFlg: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setHomeCareFlg: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => void;
  setRemarks: (remarks: string, key: number) => void;
}

interface OwnProps {
  isEditing: boolean;
  headerHeight: number;
  onChangeDisabled: (errorMessage: string, key: number) => void;
}

type Props = StateProps & DispatchProps & OwnProps & WithStyles<typeof styles>;

const reportDailyHeader = (
  isEditing: boolean,
  hasNightSupportType: boolean,
  classes: Record<string, string>
): HeaderProps => {
  const statusTypeClass = hasNightSupportType
    ? classes.middleCell
    : classes.longCell;
  const nightSupportTypeClass = hasNightSupportType
    ? classes.shortCell
    : classes.disableCell;

  let shortCellClass;
  if (hasNightSupportType) {
    shortCellClass = classes.shortCell;
    if (!isEditing) {
      shortCellClass = ClassNames(
        classes.nightShortCell,
        classes.nightReadOnlyHeader
      );
    }
  } else {
    shortCellClass = classes.shortCell;
  }
  return {
    tabIndex: -1,
    key: 0,
    selected: false,
    items: [
      {
        align: "left",
        label: "利用者名",
        className: classes.middleCell
      },
      {
        align: "left",
        label: "サービス提供の状況",
        className: statusTypeClass
      },
      {
        align: "left",
        label: "夜間支援",
        className: nightSupportTypeClass
      },
      {
        align: "left",
        label: (
          <span>
            入院時
            <br />
            支援
          </span>
        ),
        className: shortCellClass
      },
      {
        align: "left",
        label: (
          <span>
            帰宅時
            <br />
            支援
          </span>
        ),
        className: shortCellClass
      },
      {
        align: "left",
        label: "日中支援",
        className: shortCellClass
      },
      {
        align: "left",
        label: "医療連携",
        className: shortCellClass
      },
      {
        align: "left",
        label: "自立支援",
        className: shortCellClass
      },
      {
        align: "left",
        label: "居宅介護",
        className: shortCellClass
      },
      {
        align: "left",
        label: "備考",
        className: classes.middleCell
      }
    ]
  };
};

const UsagePerformanceDailyTable = (props: Props): JSX.Element => {
  const tableHead = reportDailyHeader(
    props.isEditing,
    props.facility.nightSupportFlag,
    props.classes
  );
  const rows = props.isEditing
    ? props.report.reportDaily.after
    : props.report.reportDaily.before;
  const TableList = rows.map((report, index) => {
    const uniqueKey = `table-row-${index}`;
    return (
      <TableRow key={uniqueKey} className={props.classes.row}>
        <UsagePerformanceReportDailyCell
          params={report}
          facility={props.facility}
          key={`${uniqueKey}-cell`}
          idx={index}
          isEditing={props.isEditing}
          hasNightSupportType={props.facility.nightSupportFlag}
          setStatusType={props.setStatusType}
          setNightSupportType={props.setNightSupportType}
          setHospitalizationSupportType={props.setHospitalizationSupportType}
          setGetHomeSupportType={props.setGetHomeSupportType}
          setDaytimeSupportType={props.setDaytimeSupportType}
          setMedicalSupportType={props.setMedicalSupportType}
          setLifeSupportFlg={props.setLifeSupportFlg}
          setHomeCareFlg={props.setHomeCareFlg}
          setRemarks={props.setRemarks}
          onChangeDisabled={props.onChangeDisabled}
        />
      </TableRow>
    );
  });

  return (
    <>
      <div
        className={props.classes.sticky}
        style={{ top: `${props.headerHeight}px` }}
      >
        <Table key="monthly-report-table" className={props.classes.table}>
          <TableHead
            role={tableHead.role}
            ariaChecked={tableHead.ariaChecked}
            tabIndex={tableHead.tabIndex}
            key={tableHead.key}
            selected={tableHead.selected}
            items={tableHead.items}
            rowStyle={tableHead.rowStyle}
          />
        </Table>
      </div>
      <Table key="monthly-report-table" className={props.classes.table}>
        <TableBody>{TableList.length > 0 && TableList}</TableBody>
      </Table>
      {TableList.length === 0 && (
        <div className={props.classes.noData}>
          利用者の情報が登録されていません。
          <br />
          利用者情報ページで利用者を登録した後にご利用ください。
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    report: state.report as ReportState,
    facility: state.GroupHome.facility
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { reportDispatch } = dispatches;
  const reportDispatches = reportDispatch(dispatch);

  return {
    setStatusType: (
      event: React.ChangeEvent<HTMLInputElement>,
      key: number
    ): void =>
      reportDispatches.setStatusType(event.target.value, key, REPEAT_DAILY),
    setNightSupportType: (
      event: React.ChangeEvent<HTMLInputElement>,
      key: number
    ): void =>
      reportDispatches.setNightSupportType(
        event.target.value,
        key,
        REPEAT_DAILY
      ),
    setHospitalizationSupportType: (
      event: React.ChangeEvent<HTMLInputElement>,
      key: number
    ): void =>
      reportDispatches.setHospitalizationSupportType(
        event.target.value,
        key,
        REPEAT_DAILY
      ),
    setGetHomeSupportType: (
      event: React.ChangeEvent<HTMLInputElement>,
      key: number
    ): void =>
      reportDispatches.setGetHomeSupportType(
        event.target.value,
        key,
        REPEAT_DAILY
      ),
    setDaytimeSupportType: (
      event: React.ChangeEvent<HTMLInputElement>,
      key: number
    ): void =>
      reportDispatches.setDaytimeSupportType(
        event.target.value,
        key,
        REPEAT_DAILY
      ),
    setMedicalSupportType: (
      event: React.ChangeEvent<HTMLInputElement>,
      key: number
    ): void =>
      reportDispatches.setMedicalSupportType(
        event.target.value,
        key,
        REPEAT_DAILY
      ),
    setLifeSupportFlg: (
      event: React.ChangeEvent<HTMLInputElement>,
      key: number
    ): void =>
      reportDispatches.setLifeSupportFlg(event.target.value, key, REPEAT_DAILY),
    setHomeCareFlg: (
      event: React.ChangeEvent<HTMLInputElement>,
      key: number
    ): void =>
      reportDispatches.setHomeCareFlg(event.target.value, key, REPEAT_DAILY),
    setRemarks: (remarks: string, key: number): void =>
      reportDispatches.setRemarks(remarks, key, REPEAT_DAILY)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UsagePerformanceDailyTable));
