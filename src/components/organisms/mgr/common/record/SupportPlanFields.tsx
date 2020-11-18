import * as React from "react";
import * as H from "history";
import {
  createStyles,
  withStyles,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import FormGroup from "@material-ui/core/FormGroup";
import DeleteButton from "@components/atoms/buttons/DeleteButton";
import GrayMiddleHeading from "@components/atoms/GrayMiddleHeading";
import CreateAndUpdateDate from "@components/atoms/CreateAndUpdateDate";
import MuiTextField from "@components/molecules/MuiTextField";
import RecordTextField from "@components/organisms/mgr/common/record/RecordTextField";
import RecordSelect from "@components/organisms/mgr/common/record/RecordSelect";
import RecordMultipleSelect from "@components/organisms/mgr/common/record/RecordMultipleSelect";
import RecordSelectDate from "@components/organisms/mgr/common/record/RecordSelectDate";
import RecordHeaderAllEditType from "@components/organisms/mgr/common/record/RecordHeaderAllEditType";
import { RecordSupportPlanValues } from "@initialize/record/supportPlan/initialValues";
import { FormikProps, getIn } from "formik";
import { StaffState } from "@stores/domain/staff/types";
import { FieldItem } from "@interfaces/ui/form";
import getStaffRole from "@utils/domain/staffs/getStaffRole";

const styles = (): StyleRules =>
  createStyles({
    paper: {
      padding: "16px 32px 16px"
    },
    title: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingBottom: 32
    },
    title2: {
      paddingBottom: 16
    },
    section: {
      marginBottom: 32
    },
    longTermGoalSection: {
      "& > :first-child": {
        marginBottom: 32
      },
      marginBottom: 32
    },
    groupSection: {
      "& > :first-child": {
        marginBottom: 24
      },
      marginBottom: 32
    },
    field: {
      marginBottom: 16
    },
    dateField: {
      marginBottom: 32
    },
    selectField: {
      margin: "32px 0",
      width: 245
    },
    authorizer: {
      width: 245,
      margin: "0px 16px 16px 0px"
    },
    divider: {
      backgroundColor: "rgba(0, 0, 0, 0.54)",
      margin: "32px 0"
    },
    deleteButton: {
      marginTop: 24
    }
  });

interface OwnProps {
  pageName: string;
  userName: string;
  uifId: string;
  supportPlanId?: string;
  creationDate: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  isEditing: boolean;
  staff: StaffState;
  staffOptions: FieldItem[];
  authorValue: string;
  authorizerValue: string;
  participantValue: string;
  initialValues: RecordSupportPlanValues;
  history: H.History;
  onClickEdit: (e: React.MouseEvent) => void;
  onClickEditCancel: () => void;
  onClickDelete?: () => void;
  formikProps: FormikProps<any>;
}
type Props = OwnProps & WithStyles<typeof styles>;

/**
 *
 */
const SupportPlanFields: React.FC<Props> = (props: Props) => {
  // state
  const [showAuthorizer, setShowAuthorizer] = React.useState(false);
  const [staffRole, setStaffRole] = React.useState("-");

  // 承認ステータス変更時
  const currentStatus = getIn(props.formikProps.values, "status_type");
  React.useEffect(() => {
    setShowAuthorizer(currentStatus === "1");
  }, [currentStatus]);

  // 承認者変更時
  const currentAuthorizer = getIn(props.formikProps.values, "authorizer");
  React.useEffect(() => {
    setStaffRole(getStaffRole(props.staff, currentAuthorizer) || "-");
  }, [currentAuthorizer]);

  return (
    <div>
      <RecordHeaderAllEditType
        pageName={props.pageName}
        userName={props.userName}
        hasRecord // 新規及びリスト経由なので常にtrue
        uifId={props.uifId}
        supportPlanId={props.supportPlanId}
        year="2000" // TODO 不要
        month="12" // TODO 不要
        recordType="support_plan"
        isEditing={props.isEditing}
        onClickEdit={props.onClickEdit}
        onClickEditCancel={props.onClickEditCancel}
        formikProps={props.formikProps}
        history={props.history}
      />
      <Paper className={props.classes.paper} elevation={0}>
        <div className={props.classes.title}>
          <Typography variant="h6">個別支援計画書</Typography>
          <div>
            {props.createdAt && (
              <CreateAndUpdateDate
                createdAt={props.createdAt}
                updatedAt={props.updatedAt}
              />
            )}
          </div>
        </div>
        <div className={props.classes.section}>
          <div className={props.classes.dateField}>
            <RecordSelectDate
              name="creation_date"
              label="計画作成日"
              required
              value={props.initialValues.creation_date}
              isEditable={props.isEditing}
              addYearTo={1}
              overrideYearFrom={1989}
            />
          </div>
          <FormGroup row>
            <div className={props.classes.dateField}>
              <RecordSelectDate
                name="support_begin_date"
                label="支援開始日"
                required
                value={props.initialValues.support_begin_date}
                isEditable={props.isEditing}
                addYearTo={1}
                overrideYearFrom={1989}
              />
            </div>
            <div className={props.classes.dateField}>
              <RecordSelectDate
                name="support_end_date"
                label="支援終了日"
                required
                value={props.initialValues.support_end_date}
                isEditable={props.isEditing}
                addYearTo={10}
                overrideYearFrom={1989}
              />
            </div>
          </FormGroup>
          <div className={props.classes.field}>
            <RecordTextField
              name="user_request_text"
              value={props.initialValues.user_request_text}
              defaultValue=""
              label="本人・家族の意向"
              labelType="default"
              placeholder="入力してください"
              isEditable={props.isEditing}
            />
          </div>
          <div className={props.classes.field}>
            <RecordTextField
              name="current_status"
              value={props.initialValues.current_status}
              defaultValue=""
              label="本人の現状"
              labelType="default"
              placeholder="入力してください"
              isEditable={props.isEditing}
            />
          </div>
        </div>
        <div className={props.classes.longTermGoalSection}>
          <GrayMiddleHeading text="長期目標" />
          <div className={props.classes.field}>
            <RecordTextField
              name="long_term_goal"
              value={props.initialValues.long_term_goal}
              defaultValue=""
              placeholder="入力してください"
              isEditable={props.isEditing}
            />
          </div>
        </div>
        {/* 短期入所 1,2,3 (固定3つ) */}
        {[1, 2, 3].map((num, index) => (
          <div className={props.classes.groupSection} key={`short-${num}`}>
            <GrayMiddleHeading text={`短期目標 ${num}`} />
            <div className={props.classes.field}>
              <RecordTextField
                name={`support_plan_goal[${index}]["sprint_goal"]`}
                value={props.initialValues.support_plan_goal[index].sprint_goal}
                defaultValue=""
                label="目標"
                labelType="default"
                placeholder="入力してください"
                isEditable={props.isEditing}
              />
            </div>
            <div className={props.classes.field}>
              <RecordTextField
                name={`support_plan_goal[${index}]["adopt_info"]`}
                value={props.initialValues.support_plan_goal[index].adopt_info}
                defaultValue=""
                label="本人の取組内容"
                labelType="default"
                placeholder="入力してください"
                isEditable={props.isEditing}
              />
            </div>
            <div className={props.classes.field}>
              <RecordTextField
                name={`support_plan_goal[${index}]["support_info"]`}
                value={
                  props.initialValues.support_plan_goal[index].support_info
                }
                defaultValue=""
                label="職員の支援内容"
                labelType="default"
                placeholder="入力してください"
                isEditable={props.isEditing}
              />
            </div>
          </div>
        ))}
        <div className={props.classes.groupSection}>
          <GrayMiddleHeading text="その他" />
          <div className={props.classes.field}>
            <RecordTextField
              name="remarks"
              value={props.initialValues.remarks}
              defaultValue=""
              label="備考"
              labelType="default"
              placeholder="入力してください"
              isEditable={props.isEditing}
            />
          </div>
          <div className={props.classes.field}>
            <RecordTextField
              name="staff_comment"
              value={props.initialValues.staff_comment}
              defaultValue=""
              label="職員コメント"
              labelType="default"
              placeholder="入力してください"
              isEditable={props.isEditing}
            />
          </div>
          <div className={props.classes.selectField}>
            <RecordSelect
              name="author"
              value={props.authorValue}
              defaultValue="未設定"
              label="作成者"
              placeholder="選択してください"
              options={props.staffOptions}
              isEditable={props.isEditing}
              isSelectablePlaceholder
              emptyText="職員の登録がありません。職員情報画面から職員を登録してください。"
            />
          </div>
        </div>
        <Divider className={props.classes.divider} />
        <div className={props.classes.title2}>
          <Typography variant="h6">個別支援会議議事録</Typography>
        </div>
        <div className={props.classes.field}>
          <RecordSelectDate
            name="minutes_date"
            label="実施日"
            value={props.initialValues.minutes_date}
            isEditable={props.isEditing}
            addYearTo={10}
            overrideYearFrom={1989}
          />
        </div>
        <div className={props.classes.field}>
          <RecordMultipleSelect
            name="participant"
            value={props.participantValue}
            defaultValue="選択してください"
            label="参加者"
            labelType="default"
            placeholder="選択してください"
            options={[{ categoryName: "", items: props.staffOptions }]}
            isEditable={props.isEditing}
            emptyText="職員の登録がありません。職員情報画面から職員を登録してください。"
            isNotShot
          />
        </div>
        <div className={props.classes.field}>
          <RecordTextField
            name="minutes"
            value={props.initialValues.minutes}
            defaultValue=""
            label="会議議事録"
            labelType="default"
            placeholder="入力してください"
            isEditable={props.isEditing}
          />
        </div>
        <div className={props.classes.selectField}>
          <RecordSelect
            name="status_type"
            value={
              props.initialValues.status_type === "1" ? "承認済" : "未承認"
            }
            defaultValue=""
            label="承認ステータス"
            placeholder="入力してください"
            options={[
              { label: "未承認", value: "0" },
              { label: "承認済", value: "1" }
            ]}
            isEditable={props.isEditing}
          />
        </div>
        {showAuthorizer && (
          <FormGroup row>
            <div className={props.classes.authorizer}>
              <RecordSelect
                name="authorizer"
                value={props.authorizerValue}
                defaultValue="未設定"
                label="承認者"
                placeholder="選択してください"
                options={props.staffOptions}
                isEditable={props.isEditing}
                isSelectablePlaceholder
                emptyText="職員の登録がありません。職員情報画面から職員を登録してください。"
              />
            </div>
            <div className={props.classes.authorizer}>
              <MuiTextField
                value={staffRole}
                label="役職"
                disabled
                style={{ marginBottom: 0 }}
              />
            </div>
          </FormGroup>
        )}
      </Paper>
      {props.isEditing && props.onClickDelete && (
        <div className={props.classes.deleteButton}>
          <DeleteButton
            text="個別支援計画書を削除する"
            onClick={props.onClickDelete}
          />
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(SupportPlanFields);
