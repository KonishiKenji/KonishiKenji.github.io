import * as React from "react";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  StyleRules
} from "@material-ui/core/styles";
import {
  REPEAT_DAILY,
  REPEAT_MONTHLY,
  REPEAT_USER,
  ReportTypeInterface,
  DailyInOutRecords,
  UserInOutRecords,
  InOutReportState
} from "@stores/domain/report/type";
import { IABReport } from "@stores/domain//mgr/IAB/report/types";
import { SEIKATSUKAIGOReport } from "@stores/domain/mgr/SEIKATSUKAIGO/report/types";
import { ReportInterface as JIRITSUKUNRENSEIKATSUReport } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/report/interfaces/reportInterface";
import InOutDetailDailyTableList from "@components/organisms/mgr/common/report/detail/InOutDetailDailyTableList";
import InOutDetailUserTableList from "@components/organisms/mgr/common/report/detail/InOutDetailUserTableList";
import InOutDetailMonthlyTableList from "@components/organisms/mgr/IAB/report/detail/InOutDetailMonthlyTableList";
import { FacilityType } from "@constants/variables";

const styles = ({ palette }: Theme): StyleRules =>
  createStyles({
    row: {
      "&:nth-of-type(even)": {
        backgroundColor: palette.background.default
      }
    },
    longCell: {
      width: 291,
      boxSizing: "content-box",
      borderRight: "dashed 1px #979797",
      padding: 0
    },
    headMiddle: {
      width: "129px",
      boxSizing: "content-box",
      height: "88px",
      backgroundColor: "#90a4ae",
      padding: "0px",
      "&:nth-of-type(even)": {
        backgroundColor: "#9badb6"
      },
      "&:last-child": {
        padding: "0px"
      }
    },
    headFirst: {
      width: "292px",
      boxSizing: "content-box",
      height: "88px",
      lineHeight: 3,
      letterSpacing: "0.1px",
      verticalAlign: "bottom",
      padding: "0px",
      backgroundColor: "#90a4ae"
    },
    idCell: {
      color: "rgba(0, 0, 0, 0.38)",
      fontSize: "12px"
    },
    nameCell: {
      fontSize: "16px"
    },
    firstCell: {
      margin: "12px 0px 12px 32px"
    },
    tableBody: {
      overflowY: "auto",
      overflowX: "hidden",
      height: "100%",
      // スクロールバーのデザイン対応のため（Googole Chromeのみの適用）
      "&::-webkit-scrollbar": {
        width: "12px"
      },
      "&::-webkit-scrollbar-track": {
        background: "#fff",
        border: "none",
        borderRadius: 10,
        boxShadow: "inset 0 0 2px #777"
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#aaa",
        borderRadius: 10,
        boxShadow: "none"
      }
    }
  });
interface OwnProps {
  mainContentData: InOutReportState["summary"]["inoutRecords"];
  type: ReportTypeInterface["type"];
  date: Date;
  userReportList?:
    | SEIKATSUKAIGOReport[]
    | JIRITSUKUNRENSEIKATSUReport[]
    | IABReport[];
  serviceType: FacilityType;
}

type Props = OwnProps & WithStyles<typeof styles>;

const InOutDetailModalContents: React.FunctionComponent<Props> = ({
  classes,
  type,
  mainContentData,
  date,
  userReportList,
  serviceType
}) => {
  return (
    <>
      <div className={classes.tableBody}>
        {type === REPEAT_DAILY && (
          <InOutDetailDailyTableList
            inOutRecords={mainContentData as DailyInOutRecords[]}
            serviceType={serviceType}
          />
        )}
        {type === REPEAT_MONTHLY && (
          <InOutDetailMonthlyTableList
            inOutRecords={mainContentData as UserInOutRecords[]}
            date={date}
            userReportList={userReportList as IABReport[]}
          />
        )}
        {type === REPEAT_USER && (
          <InOutDetailUserTableList
            inOutRecords={mainContentData as UserInOutRecords[]}
            date={date}
            userReportList={userReportList}
            serviceType={serviceType}
          />
        )}
      </div>
    </>
  );
};

export default withStyles(styles)(InOutDetailModalContents);
