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
import FormGroup from "@material-ui/core/FormGroup";
import GrayMiddleHeading from "@components/atoms/GrayMiddleHeading";
import MuiTextField from "@components/molecules/MuiTextField";
import RecordTextField from "@components/organisms/mgr/common/record/RecordTextField";
import RecordSelect from "@components/organisms/mgr/common/record/RecordSelect";
import RecordMultipleSelect from "@components/organisms/mgr/common/record/RecordMultipleSelect";
import RecordSelectDate from "@components/organisms/mgr/common/record/RecordSelectDate";
import RecordHeaderAllEditType from "@components/organisms/mgr/common/record/RecordHeaderAllEditType";
import { RecordSupportPlanValues } from "@initialize/mgr/A/record/supportPlan/initialValues";
import { FieldArray, FormikProps, getIn } from "formik";
import { StaffState } from "@stores/domain/staff/types";
import { FieldItem } from "@interfaces/ui/form";
import getStaffRole from "@utils/domain/staffs/getStaffRole";
import { SUPPLY_PICKUP_SERVICE_LIST2 } from "@constants/variables";
import circleNumbersList from "@constants/mgr/IAB/circleNumbersList";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconAdd from "@material-ui/icons/Add";
import IconDelete from "@material-ui/icons/Delete";
import WarningIcon from "@material-ui/icons/Warning";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikSelect from "@components/molecules/FormikSelect";
import KnowbeButton from "@components/presentational/atoms/KnowbeButton";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { SECONDARY_BACKGROUND_COLOR } from "@constants/styles";
import { ErrorsState } from "@stores/domain/errors/types";

const styles = ({ palette }: Theme): StyleRules =>
  createStyles({
    paper: {
      padding: "16px 32px 16px",
      marginBottom: 16
    },
    paper2: {
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
    title3: {
      fontSize: 14,
      marginBottom: 12
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
    groupSubSection: {
      paddingLeft: 16,
      marginBottom: 12
    },
    groupSubSectionLast: {
      borderBottom: "1px solid #e5e5e5",
      marginBottom: 24
    },
    field: {
      marginBottom: 16,
      "& textarea::-webkit-scrollbar": {
        display: "none"
      }
    },
    flexField: {
      flex: 1,
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
    },
    table: {
      width: 560,
      marginBottom: 8
    },
    tableHead: {
      backgroundColor: SECONDARY_BACKGROUND_COLOR,
      color: palette.common.black
    },
    tableHeadCell1: {
      width: 172,
      minWidth: 172,
      padding: "4px 16px"
    },
    tableHeadCell2: {
      width: "100%"
    },
    tableHeadCell3: {
      width: 58,
      minWidth: 58,
      paddingTop: 4,
      paddingRight: "16px !important", // MuiTableCell:last-child の上書き
      paddingLeft: 16,
      paddingBottom: 4
    },
    tableBodyCell1: {
      padding: "4px 16px",
      "& textarea::-webkit-scrollbar": {
        display: "none"
      }
    },
    tableBodyCell2: {
      padding: "4px 16px",
      "& textarea::-webkit-scrollbar": {
        display: "none"
      }
    },
    tableBodyCell3: {
      position: "relative"
    },
    tableBodyCellCheckBox: {
      position: "absolute",
      top: 13,
      left: 20
    },
    addProgramRowButton: {
      width: 172
    },
    warningAlertIconWrapper: {
      position: "relative",
      top: 3,
      left: -10
    },
    warningAlertIcon: {
      width: 18,
      height: 18,
      color: "#ffca28"
    },
    warningListItem: {
      fontSize: 16,
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: 1.75,
      letterSpacing: 0.5,
      textAlign: "center",
      color: "#37474f",
      position: "relative",
      margin: "0 auto",
      listStyle: "none"
    },
    warningBg: {
      backgroundColor: "#fff7df",
      marginTop: 0,
      marginBottom: 32,
      padding: "16px 0"
    }
  });
interface StateProps {
  errorsState: ErrorsState["plan"]["data"];
}
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
  mergedStaffOptions: FieldItem[];
  authorValue: string;
  authorizerValue: string;
  authorizerRole: string;
  participantValue: string;
  history: H.History;
  onClickEdit: (e: React.MouseEvent) => void;
  onClickEditCancel: () => void;
  onClickDelete?: () => void;
  formikProps: FormikProps<RecordSupportPlanValues>;
}
type Props = OwnProps & StateProps & WithStyles<typeof styles>;

const SupportPlanFields: React.FC<Props> = (props: Props) => {
  const { values: formikValues } = props.formikProps;

  // state
  const [showAuthorizer, setShowAuthorizer] = React.useState(false);
  const [staffRole, setStaffRole] = React.useState("-");

  // 承認ステータス変更時
  const currentStatus = getIn(formikValues, "status_type");
  React.useEffect(() => {
    setShowAuthorizer(currentStatus === "1");
  }, [currentStatus]);

  // 承認者変更時
  const currentAuthorizer = getIn(formikValues, "authorizer");
  React.useEffect(() => {
    if (props.isEditing) {
      // 編集状態の場合
      // 変更後の authorizer 値にマッチした役職名を staffRole に流し込む
      setStaffRole(getStaffRole(props.staff, currentAuthorizer) || "-");
    } else {
      // 閲覧状態の場合 ( 初期表示時 )
      // staffRole に snapshot_role を流し込む ( スナップがない場合は role 値が入る )
      setStaffRole(props.authorizerRole || "-");
    }
  }, [currentAuthorizer]);

  const { errorsState, supportPlanId } = props;
  const relationId = Number(supportPlanId);
  const errorTypes = { warn: "warn" };
  const hasError = errorsState && errorsState.length > 0;
  // エラー表示条件は「エラー種別が警告」「A型」「自身(supportPlanId)が等価」であること
  const hasWarningData =
    hasError &&
    errorsState[0].errors.findIndex(
      (e) => e.type === errorTypes.warn && e.relation.value === relationId
    ) > -1;

  // 編集・更新完了時に
  // 「必須ではない」かつ「入力状態が不完全」
  // な日付項目をリセットさせるための施策
  React.useEffect(() => {
    if (props.isEditing) {
      // 編集状態開始時
      // スナップ情報ではなく現行の値に表示を切り替えるため staffRole を更新させる
      setStaffRole(getStaffRole(props.staff, currentAuthorizer) || "-");
    } else {
      props.formikProps.resetForm();
      // 編集状態終了時 ( 編集「キャンセル」時 )
      // スナップ情報を復元させるため staffRole を更新させる
      // ( 編集キャンセル前に値を変更された状態が残るケースのフォロー施策 )
      setStaffRole(props.authorizerRole || "-");
    }
  }, [props.isEditing]);

  return (
    <div>
      <RecordHeaderAllEditType
        pageName={props.pageName}
        userName={props.userName}
        hasRecord // 新規及びリスト経由なので常にtrue
        uifId={props.uifId}
        supportPlanId={supportPlanId}
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
        {!props.isEditing && hasWarningData && (
          <ul className={props.classes.warningBg}>
            {errorsState[0].errors.map((error, index) => {
              if (
                error.relation.value === relationId &&
                error.type === errorTypes.warn
              ) {
                const key = `warning-row-${index}`;
                return (
                  <li className={props.classes.warningListItem} key={key}>
                    <span className={props.classes.warningAlertIconWrapper}>
                      <WarningIcon className={props.classes.warningAlertIcon} />
                    </span>
                    <span>{error.content}</span>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        )}
        <div className={props.classes.section}>
          <div className={props.classes.dateField}>
            <RecordSelectDate
              name="creation_date"
              label="計画作成日"
              required
              value={formikValues.creation_date}
              isEditable={props.isEditing}
              addYearTo={1}
              overrideYearFrom={1989}
            />
          </div>
          <div className={props.classes.dateField}>
            <RecordSelectDate
              name="previous_creation_date"
              label="前回作成日"
              value={formikValues.previous_creation_date}
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
                value={formikValues.support_begin_date}
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
                value={formikValues.support_end_date}
                isEditable={props.isEditing}
                addYearTo={10}
                overrideYearFrom={1989}
              />
            </div>
          </FormGroup>
          <div className={props.classes.longTermGoalSection}>
            <GrayMiddleHeading text="本人情報" />
            <div className={props.classes.field}>
              <RecordTextField
                name="details"
                value={formikValues.details}
                defaultValue=""
                label="就労継続支援A型利用までの経緯（活動歴や病歴等）"
                labelType="default"
                placeholder="入力してください"
                isEditable={props.isEditing}
              />
            </div>
            <div className={props.classes.field}>
              <RecordTextField
                name="user_request_text"
                value={formikValues.user_request_text}
                defaultValue=""
                label="本人の希望（業務内容、労働時間、賃金、一般就労の希望の有無等）"
                labelType="default"
                placeholder="入力してください"
                isEditable={props.isEditing}
              />
            </div>
            <div className={props.classes.field}>
              <RecordTextField
                name="income_status"
                value={formikValues.income_status}
                defaultValue=""
                label="本人の障害基礎年金等の有無や収入状況"
                labelType="default"
                placeholder="入力してください"
                isEditable={props.isEditing}
              />
            </div>
            <div className={props.classes.field}>
              <RecordTextField
                name="user_issue"
                value={formikValues.user_issue}
                defaultValue=""
                label="本人の生産活動を行う際の課題"
                labelType="default"
                placeholder="入力してください"
                isEditable={props.isEditing}
              />
            </div>
            <div className={props.classes.field}>
              <RecordTextField
                name="physical_condition"
                value={formikValues.physical_condition}
                defaultValue=""
                label="健康状態（病名、服薬状況等）"
                labelType="default"
                placeholder="入力してください"
                isEditable={props.isEditing}
              />
            </div>
            <div className={props.classes.field}>
              <RecordTextField
                name="risk_factor"
                value={formikValues.risk_factor}
                defaultValue=""
                label="生産活動や支援で留意する医学的リスクなど"
                labelType="default"
                placeholder="入力してください"
                isEditable={props.isEditing}
              />
            </div>
            <div className={props.classes.field}>
              <RecordTextField
                name="current_status"
                value={formikValues.current_status}
                defaultValue=""
                label="生活環境や自宅での役割などの本人の生活状況"
                labelType="default"
                placeholder="入力してください"
                isEditable={props.isEditing}
              />
            </div>
          </div>
        </div>
        <div className={props.classes.longTermGoalSection}>
          <GrayMiddleHeading text="長期目標" />
          <div className={props.classes.field}>
            <RecordTextField
              name={"support_plan_goal[0]['sprint_goal']"}
              value={formikValues.support_plan_goal[0].sprint_goal}
              defaultValue=""
              label="目標"
              labelType="default"
              placeholder="入力してください"
              isEditable={props.isEditing}
            />
          </div>
          <FormGroup row>
            <div className={props.classes.dateField}>
              <RecordSelectDate
                name={"support_plan_goal[0]['sprint_start_date']"}
                label="設定日"
                value={formikValues.support_plan_goal[0].sprint_start_date}
                isEditable={props.isEditing}
                overrideYearFrom={1989}
                addYearTo={1}
              />
            </div>
            <div className={props.classes.dateField}>
              <RecordSelectDate
                name={"support_plan_goal[0]['sprint_end_date']"}
                label="達成予定日"
                value={formikValues.support_plan_goal[0].sprint_end_date}
                isEditable={props.isEditing}
                overrideYearFrom={1989}
                addYearTo={1}
              />
            </div>
          </FormGroup>
        </div>
        <div className={props.classes.longTermGoalSection}>
          <GrayMiddleHeading text="短期目標" />
          <div className={props.classes.field}>
            <RecordTextField
              name={"support_plan_goal[1]['sprint_goal']"}
              value={formikValues.support_plan_goal[1].sprint_goal}
              defaultValue=""
              label="目標"
              labelType="default"
              placeholder="入力してください"
              isEditable={props.isEditing}
            />
          </div>
          <FormGroup row>
            <div className={props.classes.dateField}>
              <RecordSelectDate
                name={"support_plan_goal[1]['sprint_start_date']"}
                label="設定日"
                value={formikValues.support_plan_goal[1].sprint_start_date}
                isEditable={props.isEditing}
                overrideYearFrom={1989}
                addYearTo={1}
              />
            </div>
            <div className={props.classes.dateField}>
              <RecordSelectDate
                name={"support_plan_goal[1]['sprint_end_date']"}
                label="達成予定日"
                value={formikValues.support_plan_goal[1].sprint_end_date}
                isEditable={props.isEditing}
                overrideYearFrom={1989}
                addYearTo={1}
              />
            </div>
          </FormGroup>
        </div>
        <div className={props.classes.groupSection}>
          <GrayMiddleHeading text="サービス提供内容" />
          {/* 長期目標[0], 短期目標[1], 個別目標[2~6] */}
          {[2, 3, 4, 5, 6].map((num, index) => (
            <div key={`short-${num}`}>
              <div className={props.classes.title3}>
                <>
                  目標と支援の提供方針・内容
                  {circleNumbersList[index]}
                </>
              </div>
              <div
                className={`
                ${props.classes.groupSubSection}  
                ${num === 6 ? props.classes.groupSubSectionLast : ""}
              `}
              >
                <div className={props.classes.field}>
                  <RecordTextField
                    name={`support_plan_goal[${num}]["sprint_goal"]`}
                    value={formikValues.support_plan_goal[num].sprint_goal}
                    defaultValue=""
                    label="目標"
                    labelType="default"
                    placeholder="入力してください"
                    isEditable={props.isEditing}
                  />
                </div>
                <div className={props.classes.field}>
                  <RecordTextField
                    name={`support_plan_goal[${num}]["adopt_info"]`}
                    value={formikValues.support_plan_goal[num].adopt_info}
                    defaultValue=""
                    label="本人の取組内容"
                    labelType="default"
                    placeholder="入力してください"
                    isEditable={props.isEditing}
                  />
                </div>
                <div className={props.classes.field}>
                  <RecordTextField
                    name={`support_plan_goal[${num}]["support_info"]`}
                    value={formikValues.support_plan_goal[num].support_info}
                    defaultValue=""
                    label="職員の支援内容"
                    labelType="default"
                    placeholder="入力してください"
                    isEditable={props.isEditing}
                  />
                </div>
                <FormGroup row>
                  <div className={props.classes.dateField}>
                    <RecordSelectDate
                      name={`support_plan_goal[${num}]["sprint_start_date"]`}
                      label="適用開始日"
                      value={
                        formikValues.support_plan_goal[num].sprint_start_date
                      }
                      isEditable={props.isEditing}
                      overrideYearFrom={1989}
                      addYearTo={1}
                    />
                  </div>
                  <div className={props.classes.dateField}>
                    <RecordSelectDate
                      name={`support_plan_goal[${num}]["sprint_end_date"]`}
                      label="適用終了日"
                      value={
                        formikValues.support_plan_goal[num].sprint_end_date
                      }
                      isEditable={props.isEditing}
                      overrideYearFrom={1989}
                      addYearTo={1}
                    />
                  </div>
                </FormGroup>
              </div>
            </div>
          ))}
          <div>
            <div className={props.classes.title3}>
              <>プログラム（1日の流れ）</>
            </div>
            <div className={props.classes.groupSubSection}>
              <FormikSelect
                name="pickup"
                label="送迎"
                options={SUPPLY_PICKUP_SERVICE_LIST2}
                disabled={!props.isEditing}
              />
            </div>
            <FieldArray name="support_plan_program">
              {({ push }): JSX.Element => {
                const addProgramRow = (): void => {
                  push({
                    id: NaN,
                    number: formikValues.support_plan_program.length,
                    service_content: "",
                    scheduled_time: "",
                    delete: false
                  });
                };
                return (
                  <div className={props.classes.groupSubSection}>
                    <Table className={props.classes.table}>
                      <TableHead className={props.classes.tableHead}>
                        <TableRow>
                          <TableCell
                            className={props.classes.tableHeadCell1}
                            align="left"
                          >
                            予定時間
                          </TableCell>
                          <TableCell
                            className={props.classes.tableHeadCell2}
                            align="left"
                          >
                            サービス内容
                          </TableCell>
                          {props.isEditing && (
                            <TableCell
                              className={props.classes.tableHeadCell3}
                              align="left"
                            >
                              削除
                            </TableCell>
                          )}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {formikValues.support_plan_program.map((p, index) => {
                          const key = `supprt-program-row-${index}`;
                          return (
                            <TableRow key={key}>
                              <TableCell
                                className={props.classes.tableBodyCell1}
                              >
                                <RecordTextField
                                  name={`support_plan_program[${index}].scheduled_time`}
                                  value={
                                    formikValues.support_plan_program[index]
                                      .scheduled_time
                                  }
                                  defaultValue=""
                                  label=""
                                  labelType="default"
                                  placeholder=""
                                  isEditable={props.isEditing}
                                />
                              </TableCell>
                              <TableCell
                                className={props.classes.tableBodyCell2}
                              >
                                <RecordTextField
                                  name={`support_plan_program[${index}].service_content`}
                                  value={
                                    formikValues.support_plan_program[index]
                                      .service_content
                                  }
                                  defaultValue=""
                                  label=""
                                  labelType="default"
                                  placeholder=""
                                  isEditable={props.isEditing}
                                />
                              </TableCell>
                              {props.isEditing && (
                                <TableCell
                                  className={props.classes.tableBodyCell3}
                                >
                                  <div
                                    className={
                                      props.classes.tableBodyCellCheckBox
                                    }
                                  >
                                    <FormikCheckbox
                                      label=""
                                      name={`support_plan_program[${index}].delete`}
                                      disabled={
                                        !formikValues.support_plan_program[
                                          index
                                        ].id
                                      }
                                    />
                                  </div>
                                </TableCell>
                              )}
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                    {props.isEditing && (
                      <KnowbeButton
                        kind="iconText"
                        onClick={addProgramRow}
                        disabled={
                          formikValues.support_plan_program.length >= 10
                        }
                      >
                        <IconAdd />
                        プログラムを追加
                      </KnowbeButton>
                    )}
                  </div>
                );
              }}
            </FieldArray>
          </div>
        </div>
        <div className={props.classes.groupSection}>
          <GrayMiddleHeading text="その他" />
          <div className={props.classes.field}>
            <RecordTextField
              name="remarks"
              value={formikValues.remarks}
              defaultValue=""
              label="特記事項"
              labelType="default"
              placeholder="入力してください"
              isEditable={props.isEditing}
            />
          </div>
          <div className={props.classes.field}>
            <RecordTextField
              name="staff_comment"
              value={formikValues.staff_comment}
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
              label="計画作成者"
              placeholder="選択してください"
              options={props.staffOptions}
              isEditable={props.isEditing}
              isSelectablePlaceholder
              emptyText="職員の登録がありません。職員情報画面から職員を登録してください。"
            />
          </div>
        </div>
      </Paper>
      <Paper className={props.classes.paper2} elevation={0}>
        <div className={props.classes.title2}>
          <Typography variant="h6">個別支援会議議事録</Typography>
        </div>
        <FormGroup row>
          <div className={props.classes.field}>
            <RecordSelectDate
              name="minutes_date"
              label="実施日"
              value={formikValues.minutes_date}
              isEditable={props.isEditing}
              addYearTo={10}
              overrideYearFrom={1989}
            />
          </div>
          <div className={props.classes.flexField}>
            <RecordMultipleSelect
              name="participant"
              value={props.participantValue}
              defaultValue="選択してください"
              label="参加者"
              labelType="default"
              placeholder="選択してください"
              options={[{ categoryName: "", items: props.mergedStaffOptions }]}
              isEditable={props.isEditing}
              emptyText="職員の登録がありません。職員情報画面から職員を登録してください。"
            />
          </div>
        </FormGroup>
        <div className={props.classes.field}>
          <RecordTextField
            name="minutes"
            value={formikValues.minutes}
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
            value={formikValues.status_type === "1" ? "承認済" : "未承認"}
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
          <KnowbeButton kind="iconText" onClick={props.onClickDelete}>
            <IconDelete />
            個別支援計画書を削除する
          </KnowbeButton>
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(SupportPlanFields);
