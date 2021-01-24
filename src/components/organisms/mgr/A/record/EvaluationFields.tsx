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
import WarningIcon from "@material-ui/icons/Warning";
import FormikSelect from "@components/molecules/FormikSelect";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { SECONDARY_BACKGROUND_COLOR } from "@constants/styles";
import { ErrorsState } from "@stores/domain/errors/types";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";
import ClassNames from "classnames";
import KnowbeButton from "@components/presentational/atoms/KnowbeButton";

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
    },
    secondaryWrapper: {
      backgroundColor: "#fafafa",
      borderRadius: "4px",
      border: "1px solid #bdbdbd",
      fontSize: 14,
      padding: "4px 24px",
      marginBottom: 32
    },
    inputBundler: {
      borderBottom: "1px solid #e0e0e0",
      paddingBottom: 20,
      "&:last-child": {
        borderBottom: "none"
      }
    },
    inputAlignment: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    secondaryInputLabel: {
      display: "flex",
      alignItems: "center",
      width: 150
    },
    withTooltip: {
      marginRight: 5
    },
    secondaryInputWrapper: {
      width: "100%",
      "& textarea::-webkit-scrollbar": {
        display: "none"
      }
    },
    summaryInput: {
      display: "flex",
      alignItems: "center",
      padding: "20px 0"
    },
    userInfo: {
      marginTop: 10
    },
    hidden: {
      visibility: "hidden",
      height: 0
    },
    hideIcon: {
      "&::before": {
        content: "''",
        display: "inline-block",
        borderTop: "1px solid #0277bd",
        borderLeft: "1px solid #0277bd",
        transform: "rotate(45deg)",
        width: 6,
        height: 6,
        marginRight: 10
      }
    },
    showIcon: {
      "&::before": {
        content: "''",
        display: "inline-block",
        borderBottom: "1px solid #0277bd",
        borderRight: "1px solid #0277bd",
        transform: "rotate(45deg)",
        width: 6,
        height: 6,
        marginRight: 10,
        marginBottom: 2
      }
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
  evaluationAuthorizerValue: string;
  evaluationAuthorizerRole: string;
  history: H.History;
  errorsState: ErrorsState["goal"]["data"];
  onClickEdit: (e: React.MouseEvent) => void;
  onClickEditCancel: () => void;
  formikProps: FormikProps<RecordSupportPlanValues>;
}

type EvaluationPros = {
  dataIndex: number;
};

type Props = OwnProps & WithStyles<typeof styles>;

/**
 * 評価振り返り閲覧編集
 */
const EvaluationFields: React.FC<Props> = (props: Props) => {
  const { values: formikValues } = props.formikProps;
  const currentEvaluationStatus = getIn(formikValues, "evaluation_status");
  const currentEvaluationAuthorizer = getIn(
    formikValues,
    "evaluation_authorizer"
  );

  // state
  const [showReviewer, setShowReviewer] = React.useState(false);
  const [evaluationStaffRole, setEvaluationStaffRole] = React.useState("-");
  const [showUserInfo, setShowUserInfo] = React.useState(false);

  // 評価ステータス変更時
  React.useEffect(() => {
    setShowReviewer(currentEvaluationStatus === "1");
  }, [currentEvaluationStatus]);

  // 評価者変更時
  React.useEffect(() => {
    if (props.isEditing) {
      // 編集状態の場合
      // 変更後の evaluation_authorizer 値にマッチした役職名を evaluationStaffRole に流し込む
      setEvaluationStaffRole(
        getStaffRole(props.staff, currentEvaluationAuthorizer) || "-"
      );
    } else {
      // 閲覧状態の場合 ( 初期表示時 )
      // evaluationStaffRole に snapshot_role を流し込む ( スナップがない場合は role 値が入る )
      setEvaluationStaffRole(props.evaluationAuthorizerRole || "-");
    }
  }, [currentEvaluationAuthorizer]);

  // 編集・更新完了時に
  // 「必須ではない」かつ「入力状態が不完全」
  // な日付項目をリセットさせるための施策
  React.useEffect(() => {
    if (props.isEditing) {
      // 編集状態開始時
      // スナップ情報ではなく現行の値に表示を切り替えるため evaluationStaffRole を更新させる
      setEvaluationStaffRole(
        getStaffRole(props.staff, currentEvaluationAuthorizer) || "-"
      );
    } else {
      props.formikProps.resetForm();
      // 編集状態終了時 ( 編集「キャンセル」時 )
      // スナップ情報を復元させるため evaluationStaffRole を更新させる
      // ( 編集キャンセル前に値を変更された状態が残るケースのフォロー施策 )
      setEvaluationStaffRole(props.evaluationAuthorizerRole || "-");
    }
  }, [props.isEditing]);

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

  const evaluationStateData = [
    { label: "実施", value: "1", disabled: !props.isEditing },
    { label: "一部実施", value: "2", disabled: !props.isEditing },
    { label: "未実施", value: "0", disabled: !props.isEditing }
  ];

  const goalAchievementData = [
    { label: "達成", value: "1", disabled: !props.isEditing },
    { label: "一部達成", value: "2", disabled: !props.isEditing },
    { label: "未達成", value: "0", disabled: !props.isEditing }
  ];

  const EvaluationForm = (evaluationProps: EvaluationPros): JSX.Element => {
    const { dataIndex } = evaluationProps;
    const radioButtonStyle: React.CSSProperties = {
      flexDirection: "row",
      margin: "12px 0"
    };
    return (
      <div className={props.classes.secondaryWrapper}>
        <div className={props.classes.inputBundler}>
          <div className={props.classes.inputAlignment}>
            <div className={props.classes.secondaryInputLabel}>実施</div>
            <div className={props.classes.secondaryInputWrapper}>
              <FormikRadioButtons
                name={`support_plan_goal[${dataIndex}]['sprint_result']`}
                label=""
                options={evaluationStateData}
                style={radioButtonStyle}
              />
            </div>
          </div>
          <div className={props.classes.inputAlignment}>
            <span className={props.classes.secondaryInputLabel}>振り返り</span>
            <div className={props.classes.secondaryInputWrapper}>
              <RecordTextField
                name={`support_plan_goal[${dataIndex}]['sprint_review']`}
                value={
                  formikValues.support_plan_goal[dataIndex].sprint_review || ""
                }
                defaultValue=""
                label=""
                placeholder="入力してください"
                isEditable={props.isEditing}
              />
            </div>
          </div>
        </div>
        <div className={props.classes.inputBundler}>
          <div className={props.classes.inputAlignment}>
            <div className={props.classes.secondaryInputLabel}>
              <span className={props.classes.withTooltip}>本人の評価</span>
              <HelpToolTip title={<HelpTipMessages name="selfEvaluation" />} />
            </div>
            <div className={props.classes.secondaryInputWrapper}>
              <FormikRadioButtons
                name={`support_plan_goal[${dataIndex}]['sprint_user_evaluation']`}
                label=""
                options={goalAchievementData}
                style={radioButtonStyle}
              />
            </div>
          </div>
          <div className={props.classes.inputAlignment}>
            <span className={props.classes.secondaryInputLabel}>
              本人振り返り
            </span>
            <div className={props.classes.secondaryInputWrapper}>
              <RecordTextField
                name={`support_plan_goal[${dataIndex}]['sprint_user_review']`}
                value={
                  formikValues.support_plan_goal[dataIndex]
                    .sprint_user_review || ""
                }
                defaultValue=""
                label=""
                placeholder="入力してください"
                isEditable={props.isEditing}
              />
            </div>
          </div>
        </div>
        <div className={props.classes.inputBundler}>
          <div className={props.classes.inputAlignment}>
            <div className={props.classes.secondaryInputLabel}>
              <span className={props.classes.withTooltip}>職員からの評価</span>
              <HelpToolTip title={<HelpTipMessages name="staffEvaluation" />} />
            </div>
            <div className={props.classes.secondaryInputWrapper}>
              <FormikRadioButtons
                name={`support_plan_goal[${dataIndex}]['sprint_staff_evaluation']`}
                label=""
                options={goalAchievementData}
                style={radioButtonStyle}
              />
            </div>
          </div>
          <div className={props.classes.inputAlignment}>
            <span className={props.classes.secondaryInputLabel}>
              職員振り返り
            </span>
            <div className={props.classes.secondaryInputWrapper}>
              <RecordTextField
                name={`support_plan_goal[${dataIndex}]['sprint_staff_review']`}
                value={
                  formikValues.support_plan_goal[dataIndex]
                    .sprint_staff_review || ""
                }
                defaultValue=""
                label=""
                placeholder="入力してください"
                isEditable={props.isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const toggleUserInfo = (): void => {
    setShowUserInfo((isShowUserInfo) => !isShowUserInfo);
  };

  return (
    <div>
      <RecordHeaderAllEditType
        pageName={props.pageName}
        userName={props.userName}
        hasRecord // 新規及びリスト経由なので常にtrue
        uifId={props.uifId}
        supportPlanId={supportPlanId}
        recordType="support_plan"
        isEditing={props.isEditing}
        onClickEdit={props.onClickEdit}
        onClickEditCancel={props.onClickEditCancel}
        formikProps={props.formikProps}
        history={props.history}
        isEvaluation
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
              isEditable={false}
              addYearTo={1}
              overrideYearFrom={1989}
            />
          </div>
          <div className={props.classes.dateField}>
            <RecordSelectDate
              name="previous_creation_date"
              label="前回作成日"
              value={formikValues.previous_creation_date}
              isEditable={false}
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
                isEditable={false}
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
                isEditable={false}
                addYearTo={10}
                overrideYearFrom={1989}
              />
            </div>
          </FormGroup>
          <KnowbeButton kind="text" onClick={toggleUserInfo}>
            <span
              className={
                showUserInfo ? props.classes.hideIcon : props.classes.showIcon
              }
            >
              本人情報を
              <span>{showUserInfo ? <>非表示</> : <>表示</>}</span>
            </span>
          </KnowbeButton>
          <div
            className={ClassNames(
              !showUserInfo && props.classes.hidden,
              props.classes.userInfo
            )}
          >
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
                  isEditable={false}
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
                  isEditable={false}
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
                  isEditable={false}
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
                  isEditable={false}
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
                  isEditable={false}
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
                  isEditable={false}
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
                  isEditable={false}
                />
              </div>
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
              isEditable={false}
            />
          </div>
          <FormGroup row>
            <div className={props.classes.dateField}>
              <RecordSelectDate
                name={"support_plan_goal[0]['sprint_start_date']"}
                label="設定日"
                value={formikValues.support_plan_goal[0].sprint_start_date}
                isEditable={false}
              />
            </div>
            <div className={props.classes.dateField}>
              <RecordSelectDate
                name={"support_plan_goal[0]['sprint_end_date']"}
                label="達成予定日"
                value={formikValues.support_plan_goal[0].sprint_end_date}
                isEditable={false}
              />
            </div>
          </FormGroup>
          <EvaluationForm dataIndex={0} />
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
              isEditable={false}
            />
          </div>
          <FormGroup row>
            <div className={props.classes.dateField}>
              <RecordSelectDate
                name={"support_plan_goal[1]['sprint_start_date']"}
                label="設定日"
                value={formikValues.support_plan_goal[1].sprint_start_date}
                isEditable={false}
              />
            </div>
            <div className={props.classes.dateField}>
              <RecordSelectDate
                name={"support_plan_goal[1]['sprint_end_date']"}
                label="達成予定日"
                value={formikValues.support_plan_goal[1].sprint_end_date}
                isEditable={false}
              />
            </div>
          </FormGroup>
          <EvaluationForm dataIndex={1} />
        </div>
        <div className={props.classes.groupSection}>
          <GrayMiddleHeading text="サービス提供内容" />
          {[2, 3, 4, 5, 6].map((num, index) => (
            <div key={`short-${num}`}>
              <div className={props.classes.title3}>
                <>
                  目標と支援の提供方針・内容
                  {circleNumbersList[index]}
                </>
              </div>
              <div className={props.classes.groupSubSection}>
                <div className={props.classes.field}>
                  <RecordTextField
                    name={`support_plan_goal[${num}]["sprint_goal"]`}
                    value={formikValues.support_plan_goal[num].sprint_goal}
                    defaultValue=""
                    label="目標"
                    labelType="default"
                    placeholder="入力してください"
                    isEditable={false}
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
                    isEditable={false}
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
                    isEditable={false}
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
                      isEditable={false}
                    />
                  </div>
                  <div className={props.classes.dateField}>
                    <RecordSelectDate
                      name={`support_plan_goal[${num}]["sprint_end_date"]`}
                      label="適用終了日"
                      value={
                        formikValues.support_plan_goal[num].sprint_end_date
                      }
                      isEditable={false}
                    />
                  </div>
                </FormGroup>
              </div>
              {(formikValues.support_plan_goal[num].sprint_goal ||
                formikValues.support_plan_goal[num].adopt_info ||
                formikValues.support_plan_goal[num].support_info) && (
                <EvaluationForm dataIndex={num} />
              )}
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
                disabled
              />
            </div>
            <FieldArray name="support_plan_program">
              {(): JSX.Element => {
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
                                  isEditable={false}
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
                                  isEditable={false}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
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
              isEditable={false}
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
              isEditable={false}
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
              isEditable={false}
              isSelectablePlaceholder
              emptyText="職員の登録がありません。職員情報画面から職員を登録してください。"
            />
          </div>
          <div className={props.classes.longTermGoalSection}>
            <GrayMiddleHeading text="実施後の変化(総括)" />
            <div className={props.classes.secondaryWrapper}>
              <div className={props.classes.summaryInput}>
                <RecordTextField
                  name="after_summary"
                  value={formikValues.after_summary}
                  defaultValue=""
                  label="総括"
                  labelType="default"
                  placeholder="入力してください"
                  isEditable={props.isEditing}
                />
              </div>
              <div className={props.classes.summaryInput}>
                <RecordSelectDate
                  name="revaluation_date"
                  label="再評価日"
                  value={formikValues.revaluation_date}
                  isEditable={props.isEditing}
                  addYearTo={10}
                  overrideYearFrom={1989}
                />
              </div>
            </div>
            <div>
              <div className={props.classes.selectField}>
                <RecordSelect
                  name="evaluation_status"
                  value={
                    formikValues.evaluation_status === "1" ? "評価済" : "未評価"
                  }
                  defaultValue=""
                  label="評価・振り返りステータス"
                  placeholder="入力してください"
                  options={[
                    { label: "未評価", value: "0" },
                    { label: "評価済", value: "1" }
                  ]}
                  isEditable={props.isEditing}
                />
              </div>
              {showReviewer && (
                <FormGroup row>
                  <div className={props.classes.authorizer}>
                    <RecordSelect
                      name="evaluation_authorizer"
                      value={props.evaluationAuthorizerValue}
                      defaultValue="未設定"
                      label="評価者"
                      placeholder="選択してください"
                      options={props.staffOptions}
                      isEditable={props.isEditing}
                      isSelectablePlaceholder
                      emptyText="職員の登録がありません。職員情報画面から職員を登録してください。"
                    />
                  </div>
                  <div className={props.classes.authorizer}>
                    <MuiTextField
                      value={evaluationStaffRole}
                      label="役職"
                      disabled
                      style={{ marginBottom: 0 }}
                    />
                  </div>
                </FormGroup>
              )}
            </div>
          </div>
        </div>
      </Paper>
      <Paper className={props.classes.paper2} elevation={0}>
        <div className={props.classes.title2}>
          <Typography variant="h6">評価・振り返り会議 議事録</Typography>
        </div>
        <FormGroup row>
          <div className={props.classes.field}>
            <RecordSelectDate
              name="evaluation_date"
              label="実施日"
              value={formikValues.evaluation_date}
              isEditable={props.isEditing}
              addYearTo={10}
              overrideYearFrom={1989}
            />
          </div>
        </FormGroup>
        <div className={props.classes.field}>
          <RecordTextField
            name="evaluation_minutes"
            value={formikValues.evaluation_minutes}
            defaultValue=""
            label="議事録"
            labelType="default"
            placeholder="入力してください"
            isEditable={props.isEditing}
          />
        </div>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(EvaluationFields);
