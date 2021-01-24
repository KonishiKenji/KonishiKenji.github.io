import * as React from "react";

// props
import * as H from "history";
import { SupportPlanAState } from "@stores/domain/mgr/A/supportPlan/types";
import { RecordUserDetailState } from "@stores/pages/record/userDetail/types";
import { ErrorsState } from "@stores/domain/errors/types";

// ui
import {
  createStyles,
  withStyles,
  StyleRules,
  WithStyles
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@components/molecules/Table";
import NoRecord from "@components/organisms/mgr/common/record/NoRecord";
import PlanList from "@components/organisms/mgr/A/record/PlanList";
import RecordHeaderLinkButtonType from "@components/organisms/mgr/common/record/RecordHeaderLinkButtonType";

const styles = (): StyleRules =>
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

interface StateProps {
  planErrors: ErrorsState["plan"]["data"];
  goalErrors: ErrorsState["goal"]["data"];
}

interface OwnProps {
  pageName: string;
  userName: string;
  uifId: string;
  supportPlanRecord: SupportPlanAState["supportPlan"];
  recordUserDetail: RecordUserDetailState;
  history: H.History;
  year: string;
  month: string;
}

type Props = OwnProps & StateProps & WithStyles<typeof styles>;

/**
 * 個別支援計画
 */
const SupportPlanRecordList = (props: Props): JSX.Element => {
  const ids: number[] = [];
  const periodData: SupportPlanAState["supportPlan"] = [];
  const outPeriodData: SupportPlanAState["supportPlan"] = [];

  if (props.supportPlanRecord) {
    props.supportPlanRecord.forEach((supportPlan): void => {
      const planCreateCheck =
        ids.indexOf(supportPlan.id) === -1 && supportPlan.id !== 0;
      if (!supportPlan.archive && planCreateCheck) {
        ids.push(supportPlan.id);
        periodData.push(supportPlan);
      } else if (planCreateCheck) {
        ids.push(supportPlan.id);
        outPeriodData.push(supportPlan);
      }
    });
  }
  const onClickPlanDoc = (planId: number) => (): void => {
    const url = `/record/${props.uifId}/support_plan/${planId}`;
    props.history.push(url);
  };
  const onClickPlanEvaluationDoc = (planId: number) => (): void => {
    const url = `/record/${props.uifId}/support_plan/evaluation/${planId}`;
    props.history.push(url);
  };

  let noRecordMessage = "";
  if (
    !props.supportPlanRecord ||
    props.supportPlanRecord.length === 0 ||
    props.supportPlanRecord[0].id === 0
  ) {
    noRecordMessage =
      "個別支援計画書がありません。新規作成ボタンから作成してください。";
  }
  const hasRecord = noRecordMessage === "";

  return (
    <>
      <RecordHeaderLinkButtonType
        pageName={props.pageName}
        userName={props.userName}
        hasRecord // ボタンを表示するかどうかを見ているので無条件にtrueを渡す
        uifId={props.uifId}
        year={props.year}
        month={props.month}
        recordType="support_plan"
        isEditing={props.recordUserDetail.isEditing}
        history={props.history}
      />
      {hasRecord ? (
        <Paper className={props.classes.root} elevation={0}>
          <Table key="support-plan-table">
            <TableBody>
              {periodData.length > 0 && (
                <TableRow>
                  <TableCell>
                    <PlanList
                      planTitle="支援期間中の計画書一覧"
                      targetPlans={periodData}
                      planErrors={props.planErrors}
                      goalErrors={props.goalErrors}
                      handleClickPlanDoc={onClickPlanDoc}
                      handleClickPlanEvaluationDoc={onClickPlanEvaluationDoc}
                    />
                  </TableCell>
                </TableRow>
              )}
              {outPeriodData.length > 0 && (
                <TableRow>
                  <TableCell>
                    <PlanList
                      planTitle="支援期間外の計画書一覧"
                      targetPlans={outPeriodData}
                      planErrors={props.planErrors}
                      goalErrors={props.goalErrors}
                      handleClickPlanDoc={onClickPlanDoc}
                      handleClickPlanEvaluationDoc={onClickPlanEvaluationDoc}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <NoRecord message={noRecordMessage} />
      )}
    </>
  );
};

export default withStyles(styles)(SupportPlanRecordList);
