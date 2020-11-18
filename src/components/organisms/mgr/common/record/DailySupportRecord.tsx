import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SectionTitle from "@components/atoms/SectionTitle";
import RecordSupportTable from "@components/organisms/mgr/common/record/RecordSupportTable";
import RecordSupportTableRow from "@components/organisms/mgr/common/record/RecordSupportTableRow";
import { OperationsState } from "@stores/domain/operations/types";
import { FieldItem, CategorizedFieldItem } from "@interfaces/ui/form";
import { SUPPORT_RECORD_KEY_LABEL } from "@constants/variables";

const styles = () =>
  createStyles({
    root: {
      padding: 32,
      boxShadow: "none"
    }
  });

interface OwnProps {
  support: OperationsState["dailyRecord"]["support"];
  workOptions: CategorizedFieldItem[];
  staffOptions: FieldItem[];
  isEditing: boolean;
  isMeal: boolean;
  isTransfer: boolean;
}

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 支援記録（日々の記録ページ/利用者ごと>支援記録ページ）
 */
const DailySupportRecord = (props: Props) => {
  if (!props.support) return null;
  return (
    <Paper className={props.classes.root}>
      <SectionTitle label="支援記録" />
      <RecordSupportTable pattern="daily">
        {/* initialValuesのindexと一致している必要があるので順番を変える場合は注意 */}
        {props.support.map((supportRecord, index) => {
          const baseItems: { key: string; label: string }[] =
            SUPPORT_RECORD_KEY_LABEL[supportRecord.inout.status];
          const supportRecordItems: { key: string; label: string }[] = [];
          // 面談があれば面談時間、面談内容を追加
          // SUPPORT_RECORD_KEY_LABELを直接加工するべきだがPreviewに影響が出そうなので落ち着くまでここでやる
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
              displayType="name"
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

export default withStyles(styles)(DailySupportRecord);
