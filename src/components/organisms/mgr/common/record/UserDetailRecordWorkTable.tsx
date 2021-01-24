import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import RecordSupportTable from "@components/organisms/mgr/common/record/RecordSupportTable";
import RecordSupportTableRow from "@components/organisms/mgr/common/record/RecordSupportTableRow";
import CreateAndUpdateDate from "@components/atoms/CreateAndUpdateDate";
import { SupportsState } from "@stores/domain/supports/types";
import { FieldItem, CategorizedFieldItem } from "@interfaces/ui/form";
import { RecordUserDetailState } from "@stores/pages/record/userDetail/types";
import { FormikProps } from "formik";
import { SERVICE_STATUS } from "@constants/variables";

const styles = () =>
  createStyles({
    root: {
      padding: "18px 32px 32px"
    },
    recordSummary: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end",
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
  isMeal: boolean;
  isTransfer: boolean;
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 作業記録
 */
const UserDetailRecordWorkTable = (props: Props) => {
  if (!props.supportsRecord.support) return null;
  const supportRecordItems = [{ key: "support_work_history", label: "作業" }];
  const workServiceStatus = [
    SERVICE_STATUS[1].value,
    SERVICE_STATUS[2].value,
    SERVICE_STATUS[3].value,
    SERVICE_STATUS[7].value,
    SERVICE_STATUS[8].value
  ];

  return (
    <Paper className={props.classes.root} elevation={0}>
      <div className={props.classes.recordSummary}>
        <CreateAndUpdateDate
          createdAt={props.supportsRecord.created_at}
          updatedAt={props.supportsRecord.updated_at}
        />
      </div>
      <RecordSupportTable pattern="work">
        {props.supportsRecord.support.map((supportRecord, index) => {
          const displayStatus = workServiceStatus.find(
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
                hiddenLabel
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
export default withStyles(styles)(UserDetailRecordWorkTable);
