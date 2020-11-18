import * as React from "react";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import InOutDetailHeader from "@components/molecules/dialog/InOutDetailHeader";
import InOutReportTableList from "@components/organisms/mgr/SEIKATSUKAIGO/record/InOutReportTableList";
const styles = ({ palette }: Theme) =>
  createStyles({
    tableBody: {
      overflowY: "auto",
      height: "84%",
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

interface DailyInOutRecords {
  // 作業実績：名前
  userName: string | undefined;
  // 作業実績：受給者証番号
  recipientNumber: string | undefined;
  // 作業実績：利用実績
  status: number | undefined | null;
}
interface UserInOutRecords {
  // 作業実績：日
  date: string | undefined;
  // 作業実績：利用実績
  status: number | undefined | null;
}

interface OwnProps {
  headerData: React.ReactElement[];
  mainContentData: DailyInOutRecords[] | UserInOutRecords[];
}

type Props = OwnProps & WithStyles<typeof styles>;

const InOutReportContents: React.FunctionComponent<Props> = ({
  classes,
  headerData,
  mainContentData
}) => {
  return (
    <React.Fragment>
      <div>
        <InOutDetailHeader headerData={headerData} />
      </div>
      <div className={classes.tableBody}>
        <InOutReportTableList
          inOutRecords={mainContentData as DailyInOutRecords[]}
        />
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(InOutReportContents);
