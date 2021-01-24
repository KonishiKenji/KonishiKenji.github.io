import * as React from "react";
import { SupportsState } from "@stores/domain/supports/types";
import { SUPPORT_RECORD_KEY_LABEL, FacilityType } from "@constants/variables";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CreateAndUpdateDate from "@components/atoms/CreateAndUpdateDate";
import UsageSituationBox from "@components/atoms/UsageSituationBox";
import RecordSupportTable from "@components/organisms/mgr/common/record/RecordSupportTable";
import RecordSupportTableRow from "@components/organisms/mgr/common/record/RecordSupportTableRow";
import { FieldItem, CategorizedFieldItem } from "@interfaces/ui/form";
import convertMinutesToTime from "@utils/date/convertMinutesToTime";

const styles = () =>
  createStyles({
    root: {
      padding: "18px 32px 32px"
    },
    recordSummary: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginBottom: 32
    },
    usageSituation: {
      display: "flex",
      "& > div": {
        marginRight: 8
      }
    }
  });

interface OwnProps {
  supportsRecord: SupportsState["supportsRecord"];
  workOptions: CategorizedFieldItem[];
  staffOptions: FieldItem[];
  isEditing: boolean;
  serviceType?: string;
  isMeal: boolean;
  isTransfer: boolean;
}
type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 面談記録
 */
const UserSupportRecord = (props: Props) => {
  if (
    !props.supportsRecord.support ||
    props.supportsRecord.support.length === 0
  ) {
    return null;
  }

  // 面談時間
  const interviewTime = convertMinutesToTime(
    props.supportsRecord.counts.totalInterviewMinutes
  );
  const interviewTimeUnit =
    interviewTime.hour === "0" && interviewTime.minutes === "00"
      ? "0分"
      : `${interviewTime.hour}時間${interviewTime.minutes}分`;

  return (
    <Paper className={props.classes.root} elevation={0}>
      <div className={props.classes.recordSummary}>
        <div className={props.classes.usageSituation}>
          <UsageSituationBox
            label="利用日数"
            value={props.supportsRecord.counts.numberOfServiceUsage}
            unit={`/${props.supportsRecord.counts.supportDays}日`}
            size="small"
          />
          {/* unit => 障害者総合支援法に基づき1月につき4回 */}
          <UsageSituationBox
            label="欠席時対応"
            value={props.supportsRecord.counts.numberOfAbsence}
            unit="/4回"
            size="small"
          />
          {/* 移行のみ表示 */}
          {props.serviceType === FacilityType.IKOU && (
            <UsageSituationBox
              label="移行準備支援体制加算Ⅰ"
              value={props.supportsRecord.counts.numberOfSupportIkou1}
              unit="/180日"
              size="small"
            />
          )}
          {/* ABのみ表示 */}
          {(props.serviceType === FacilityType.A ||
            props.serviceType === FacilityType.B) && (
            <UsageSituationBox
              label="施設外支援"
              value={props.supportsRecord.counts.numberOfSupportOutOfFacility}
              unit="/180日"
              size="small"
            />
          )}
          <UsageSituationBox
            label="面談"
            value={props.supportsRecord.counts.numberOfHavingInterview}
            unit={`回(${interviewTimeUnit})`}
            size="small"
          />
        </div>
        <CreateAndUpdateDate
          createdAt={props.supportsRecord.created_at}
          updatedAt={props.supportsRecord.updated_at}
        />
      </div>
      <RecordSupportTable>
        {props.supportsRecord.support.map((supportRecord, index) => {
          const baseItems: { key: string; label: string }[] =
            SUPPORT_RECORD_KEY_LABEL[supportRecord.inout.status];
          const supportRecordItems: {
            key: string;
            label: string;
          }[] = [];
          // 日々の記録の支援記録と同じ
          baseItems.forEach((option) => {
            supportRecordItems.push(option);
            if (option.key === "interview_flg") {
              supportRecordItems.push({
                key: "interview_time_show_only",
                label: "面談"
              });
              supportRecordItems.push({
                key: "interview_time",
                label: "面談時間"
              });
              supportRecordItems.push({
                key: "interview_comment",
                label: "面談内容"
              });
            }
          });
          const formikFieldNamePrefix = `support[${index}]`;
          return (
            <RecordSupportTableRow
              key={supportRecord.inout.id}
              editType="all"
              displayType="date"
              support={supportRecord}
              workOptions={props.workOptions}
              staffOptions={props.staffOptions}
              supportRecordItems={supportRecordItems}
              formikFieldNamePrefix={formikFieldNamePrefix}
              isEditing={props.isEditing}
              isMeal={props.isMeal}
              isTransfer={props.isTransfer}
            />
          );
        })}
      </RecordSupportTable>
    </Paper>
  );
};

export default withStyles(styles)(UserSupportRecord);
