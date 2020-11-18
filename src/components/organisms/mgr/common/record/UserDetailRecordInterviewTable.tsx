import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import RecordSupportTable from "@components/organisms/mgr/common/record/RecordSupportTable";
import RecordSupportTableRow from "@components/organisms/mgr/common/record/RecordSupportTableRow";
import UsageSituationBox from "@components/atoms/UsageSituationBox";
import CreateAndUpdateDate from "@components/atoms/CreateAndUpdateDate";
import { SupportsState } from "@stores/domain/supports/types";
import { FieldItem, CategorizedFieldItem } from "@interfaces/ui/form";
import { RecordUserDetailState } from "@stores/pages/record/userDetail/types";
import convertMinutesToTime from "@utils/date/convertMinutesToTime";
import { FormikProps } from "formik";
import { SERVICE_STATUS } from "@constants/variables";

const styles = () =>
  createStyles({
    root: {
      padding: "18px 32px 32px"
    },
    interviewWrapper: {
      width: "100%",
      textAlign: "center"
    },
    interviewChild: {
      fontSize: 14,
      fontWeight: "normal",
      marginLeft: 1
    },
    interviewTime: {
      "&:first-child": {
        marginRight: 4
      }
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
  recordUserDetail: RecordUserDetailState;
  formikProps: FormikProps<any>;
  setEditing: (inoutId?: number) => void;
  onClickEditCancel: () => void;
  onSubmitError: () => void;
  isMeal: boolean;
  isTransfer: boolean;
}
type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 面談記録
 */
const UserDetailRecordInterviewTable = (props: Props) => {
  if (!props.supportsRecord.support) return null;
  const supportRecordItems = [
    { key: "interview_flg", label: "面談" },
    { key: "interview_time_show_only", label: "時間" },
    { key: "interview_time", label: "時間" },
    { key: "interview_comment", label: "内容" }
  ];
  const interviewServiceStatus = [
    SERVICE_STATUS[1].value,
    SERVICE_STATUS[2].value,
    SERVICE_STATUS[3].value,
    SERVICE_STATUS[6].value,
    SERVICE_STATUS[7].value,
    SERVICE_STATUS[8].value
  ];

  // 面談時間
  const interviewTime = convertMinutesToTime(
    props.supportsRecord.counts.totalInterviewMinutes
  );

  const interviewCount = (
    <div className={props.classes.interviewWrapper}>
      {props.supportsRecord.counts.numberOfHavingInterview}
      <span className={props.classes.interviewChild}>回</span>
    </div>
  );

  const interviewTimeUnit =
    interviewTime.hour === "0" && interviewTime.minutes === "00" ? (
      <div className={props.classes.interviewWrapper}>
        0
<span className={props.classes.interviewChild}>分</span>
      </div>
    ) : (
      <div className={props.classes.interviewWrapper}>
        {interviewTime.hour}
        <span
          className={`${props.classes.interviewTime} ${props.classes.interviewChild}`}
        >
          時間
        </span>
        {interviewTime.minutes}
        <span className={props.classes.interviewChild}>分</span>
      </div>
    );

  return (
    <Paper className={props.classes.root} elevation={0}>
      <div className={props.classes.recordSummary}>
        <div className={props.classes.usageSituation}>
          <UsageSituationBox
            label="面談回数"
            value={interviewCount}
            size="small"
          />
          <UsageSituationBox
            label="面談時間"
            value={interviewTimeUnit}
            size="small"
          />
        </div>
        <CreateAndUpdateDate
          createdAt={props.supportsRecord.created_at}
          updatedAt={props.supportsRecord.updated_at}
        />
      </div>
      <RecordSupportTable pattern="interview">
        {props.supportsRecord.support.map((supportRecord, index) => {
          const displayStatus = interviewServiceStatus.find(
            (value) => value === supportRecord.inout.status
          );
          const formikFieldNamePrefix = `support[${index}]`;
          const editable =
            props.recordUserDetail.isEditingInoutId === supportRecord.inout.id;
          const onClickEdit = () => {
            props.setEditing(supportRecord.inout.id);
          };
          return (
            displayStatus && (
              <RecordSupportTableRow
                key={supportRecord.inout.id}
                editType="individual"
                recordUserDetail={props.recordUserDetail}
                support={supportRecord}
                workOptions={props.workOptions}
                staffOptions={props.staffOptions}
                supportRecordItems={supportRecordItems}
                formikFieldNamePrefix={formikFieldNamePrefix}
                formikProps={props.formikProps}
                isEditing={editable}
                onClickEdit={onClickEdit}
                onClickCancel={props.onClickEditCancel}
                onSubmitError={props.onSubmitError}
                isMeal={props.isMeal}
                isTransfer={props.isTransfer}
              />
            )
          );
        })}
      </RecordSupportTable>
    </Paper>
  );
};

export default withStyles(styles)(UserDetailRecordInterviewTable);
