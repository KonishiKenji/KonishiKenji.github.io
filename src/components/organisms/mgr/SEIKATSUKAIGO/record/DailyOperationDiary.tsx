import * as React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import SectionTitle from "@components/atoms/SectionTitle";
import CreateAndUpdateDate from "@components/atoms/CreateAndUpdateDate";
import UsageSituationBox from "@components/atoms/UsageSituationBox";
import RecordTextField from "@components/organisms/mgr/common/record/RecordTextField";
import RecordSelect from "@components/organisms/mgr/common/record/RecordSelect";
import RecordMultipleSelect from "@components/organisms/mgr/common/record/RecordMultipleSelect";
import InOutReportModal from "@components/organisms/mgr/common/report/InOutReportModal";
import { SEIKATSUKAIGO_SUMMARY_SERVICE_STATUS } from "@constants/variables";
import { GetOperationsAndSupports } from "@api/requests/operations/getOperationsAndSupports";
import get from "lodash-es/get";
import convertMinutesToTime from "@utils/date/convertMinutesToTime";
import generateWorkOptions from "@utils/domain/work/generateWorkOptions";
import { FieldItem, CategorizedFieldItem } from "@interfaces/ui/form";
import {
  REPEAT_DAILY,
  SEIKATSUKAIGOInOutReportState
} from "@stores/domain/mgr/SEIKATSUKAIGO/report/types";
import { UserResult } from "@stores/domain/user/type";
import { AppState } from "@stores/type";
import { connect } from "react-redux";

const styles = (): StyleRules =>
  createStyles({
    root: {
      padding: 32,
      marginTop: 8
    },
    usageSituation: {
      display: "flex",
      marginBottom: 16,
      "& > div": {
        marginRight: 16
      }
    },
    usageDetailButton: {
      padding: "2px 16px"
    },
    recordWrapper: {
      margin: "32px 0 40px"
    },
    splitSection: {
      display: "flex",
      marginBottom: 16,
      "& > :first-child": {
        marginRight: 16
      }
    },
    section: {
      marginBottom: 16
    },
    recorder: {
      width: 240,
      marginLeft: "auto"
    }
  });

interface OwnProps {
  operation: GetOperationsAndSupports["data"]["operation"];
  workOptions: CategorizedFieldItem[];
  staffOptions: FieldItem[];
  contentData: SEIKATSUKAIGOInOutReportState;
  created_at: string | null;
  updated_at: string | null;
  isEditing: boolean;
  targetDate: Date;
  disabled: boolean;
}

interface StateProps {
  user: UserResult;
}

type Props = OwnProps & StateProps & WithStyles<typeof styles>;

/**
 * 業務日誌 (日々の記録ページ/業務日誌ページ)
 */
const DailyOperationDiary = (props: Props): JSX.Element => {
  const operationWorkHistory = props.operation.operation_work_history || [];
  const operationWorkHistoryValue = operationWorkHistory
    .map((history) => history.item_name)
    .join("、");
  const workOptions = generateWorkOptions(
    props.workOptions,
    props.operation.operation_work_history
  );
  // 面談時間
  const interviewTime = convertMinutesToTime(
    props.operation.counts.totalInterviewMinutes
  );
  const interviewTimeUnit =
    interviewTime.hour === "0" && interviewTime.minutes === "00"
      ? "0分"
      : `${interviewTime.hour}時間${interviewTime.minutes}分`;

  // 利用状況の詳細
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const openDialog = (): void => {
    setIsOpenDialog(true);
  };
  const closeDialog = (): void => {
    setIsOpenDialog(false);
  };
  return (
    <>
      <CreateAndUpdateDate
        createdAt={props.created_at}
        updatedAt={props.updated_at}
      />
      <Paper classes={{ root: props.classes.root }}>
        <SectionTitle label="業務日誌" />
        <div className={props.classes.usageSituation}>
          <UsageSituationBox
            label="通所"
            value={props.operation.counts.numberOfUsingServiceUsers}
            unit={`/${props.operation.counts.numberOfUsers}人`}
          />
          <UsageSituationBox
            label="欠席時対応"
            value={props.operation.counts.numberOfAbsence}
            unit={`/${props.operation.counts.numberOfUsers}人`}
          />
          <UsageSituationBox
            label="面談"
            value={props.operation.counts.numberOfHavingInterview}
            unit={`/${props.operation.counts.numberOfUsers}人(${interviewTimeUnit})`}
          />
        </div>
        <Button
          variant="outlined"
          color="secondary"
          classes={{ outlined: props.classes.usageDetailButton }}
          onClick={openDialog}
          disabled={props.disabled}
        >
          利用状況の詳細
        </Button>
        <div className={props.classes.recordWrapper}>
          <div className={props.classes.splitSection}>
            <RecordTextField
              name="operation.operation_in_the_morning"
              label="午前"
              value={
                get(props.operation.record, "operation_in_the_morning") || ""
              }
              defaultValue="-"
              placeholder="入力してください"
              isEditable={props.isEditing}
            />
            <RecordTextField
              name="operation.operation_in_the_afternoon"
              label="午後"
              value={
                get(props.operation.record, "operation_in_the_afternoon") || ""
              }
              defaultValue="-"
              placeholder="入力してください"
              isEditable={props.isEditing}
            />
          </div>
          <div className={props.classes.section}>
            <RecordMultipleSelect
              name="operation.operation_work_history.itemIdList"
              label="作業"
              value={operationWorkHistoryValue}
              options={workOptions}
              defaultValue="未実施"
              placeholder="選択してください"
              isEditable={props.isEditing}
              emptyText="作業の登録がありません。作業情報画面から作業を登録してください。"
            />
          </div>
          <div className={props.classes.section}>
            <RecordTextField
              name="operation.operation_other_comment"
              label="その他"
              value={
                get(props.operation.record, "operation_other_comment") || ""
              }
              defaultValue="-"
              placeholder="入力してください"
              isEditable={props.isEditing}
            />
          </div>
        </div>
        <div className={props.classes.recorder}>
          <RecordSelect
            name="operation.staff_id"
            label="記録者"
            value={get(props.operation.record, "staff_name") || ""}
            options={props.staffOptions}
            defaultValue="未設定"
            placeholder="選択してください"
            isEditable={props.isEditing}
            isSelectablePlaceholder
            emptyText="職員の登録がありません。職員情報画面から職員を登録してください。"
          />
        </div>
      </Paper>
      {isOpenDialog && (
        <InOutReportModal
          countsPerStatus={
            props.contentData.SEIKATSUKAIGOSummary.countsPerStatus
          }
          inOutRecords={props.contentData.SEIKATSUKAIGOSummary.inoutRecords}
          isOpen={isOpenDialog}
          onClose={closeDialog}
          targetName=""
          date={props.targetDate}
          type={REPEAT_DAILY}
          pageType="record"
          serviceType={props.user.facility_type}
          summaryServiceStatus={SEIKATSUKAIGO_SUMMARY_SERVICE_STATUS}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  user: state.user as UserResult
});

export default withStyles(styles)(
  connect(mapStateToProps)(DailyOperationDiary)
);
