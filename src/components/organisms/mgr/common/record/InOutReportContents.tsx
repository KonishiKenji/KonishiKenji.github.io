import * as React from "react";
import {
  createStyles,
  WithStyles,
  withStyles,
  StyleRules
} from "@material-ui/core/styles";
import InOutReportTableList from "@components/organisms/mgr/common/record/InOutReportTableList";
import {
  DailyInOutRecords,
  UserInOutRecords
} from "@stores/domain/report/type";
import { FacilityType } from "@constants/variables";

const styles = (): StyleRules =>
  createStyles({
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
  mainContentData: DailyInOutRecords[] | UserInOutRecords[];
  serviceType: FacilityType;
}

type Props = OwnProps & WithStyles<typeof styles>;

const InOutReportContents: React.FunctionComponent<Props> = ({
  classes,
  mainContentData,
  serviceType
}) => {
  return (
    <div className={classes.tableBody}>
      <InOutReportTableList
        inOutRecords={mainContentData as DailyInOutRecords[]}
        serviceType={serviceType}
      />
    </div>
  );
};

export default withStyles(styles)(InOutReportContents);
