import * as React from "react";

import {
  createStyles,
  StyleRules,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import KnowbeButton from "@components/presentational/atoms/KnowbeButton";
import Chip from "@material-ui/core/Chip";
import ErrorIcon from "@material-ui/icons/Error";

import { dateToLocalisedString } from "@/utils/date";
import { theme } from "@styles/theme";

import { SupportPlanAState } from "@stores/domain/mgr/A/supportPlan/types";
import { ErrorsState } from "@stores/domain/errors/types";
import getSnapOrRealName from "@utils/domain/mgr/getSnapOrRealName";

const styles = (): StyleRules =>
  createStyles({
    planWrapper: {
      "&:not(:last-of-type)": {
        marginBottom: 60
      }
    },
    planTitle: {
      fontSize: 16,
      fontWeight: "normal",
      backgroundColor: "#f5f5f5",
      height: "34px",
      padding: "5px 8px"
    },
    planBox: {
      borderRadius: 4,
      backgroundColor: "#ffffff",
      "&:not(:last-of-type)": {
        marginBottom: theme.spacing.unit * 2
      }
    },
    planPeriod: {
      display: "flex",
      alignItems: "center",
      fontSize: 16,
      borderTop: "solid 1px",
      borderBottom: "solid 1px",
      borderTopColor: "#b5b5b5",
      borderBottomColor: "#d9d9d9",
      padding: "8px 16px",
      backgroundColor: "rgba(245,245,245, 0.38)",
      color: "rgba(0,0,0,0.87)",
      marginBottom: 8,
      "& span": {
        "&:nth-child(2)": {
          marginLeft: theme.spacing.unit * 2
        },
        "&:nth-child(3)": {
          marginLeft: theme.spacing.unit * 3
        }
      }
    },
    planItem: {
      color: "#37474f",
      marginBottom: 8,
      padding: "8px 16px 0px",
      marginTop: 8,
      "&:last-child": {
        marginBottom: 40,
        clear: "both"
      }
    },
    alertPeriod: {
      color: "#f44336",
      fontSize: 12,
      position: "relative",
      paddingLeft: 20
    },
    alertIconUpper: {
      width: 15,
      height: 15,
      color: "#ff5656",
      position: "absolute",
      top: 2,
      left: 0
    },
    warningAlertIconWrapper: {
      top: -7,
      right: -9,
      position: "absolute"
    },
    warningAlertIcon: {
      width: 18,
      height: 18,
      color: "#ffc416"
    },
    buttonWrapper: {
      width: 158,
      float: "right",
      marginRight: 16,
      position: "relative"
    },
    checkIcon: {
      marginRight: 10
    },
    approvedButton: {
      width: 67,
      backgroundColor: "#455a64",
      float: "right",
      color: "#ffffff"
    },
    unapprovedButton: {
      width: 67,
      height: 32,
      color: "#ffffff",
      border: "2px solid #f5f5f5",
      backgroundColor: "#455a64",
      opacity: 0.12,
      float: "right"
    },
    planPeriodFinish: {
      marginTop: 60
    }
  });

const buttonStyle: React.CSSProperties = {
  width: 158
};

interface StateProps {
  planErrors: ErrorsState["plan"]["data"];
  goalErrors: ErrorsState["goal"]["data"];
}

interface OwnProps {
  planTitle: string;
  targetPlans: SupportPlanAState["supportPlan"];
  handleClickPlanDoc: (planId: number) => () => void;
  handleClickPlanEvaluationDoc: (planId: number) => () => void;
}

type Props = OwnProps & StateProps & WithStyles<typeof styles>;

const PlanList = (props: Props): JSX.Element => {
  const { planErrors, goalErrors } = props;
  const errorTypes = { warn: "warn", error: "error" };

  const displayWarnIcon = (
    planId: number,
    errors: ErrorsState["plan"]["data"] | ErrorsState["goal"]["data"]
  ): JSX.Element => {
    const hasError = errors && errors.length > 0;
    if (hasError) {
      const hasWarningData =
        errors[0].errors.findIndex(
          (e) =>
            e.type === errorTypes.warn &&
            e.relation.key === "support_plan_id" &&
            e.relation.value === planId
        ) > -1;
      if (hasWarningData) {
        return (
          <span className={props.classes.warningAlertIconWrapper}>
            <ErrorIcon className={props.classes.warningAlertIcon} />
          </span>
        );
      }
    }
    return <></>;
  };

  return (
    <div className={props.classes.planWrapper}>
      <h2 className={props.classes.planTitle}>{props.planTitle}</h2>
      {props.targetPlans &&
        props.targetPlans.map((plan, idx) => {
          const key = `${plan.id}_${idx}`;
          const { author, authorizer } = plan;

          // 作成者名
          const authorValue = getSnapOrRealName(author, "-");

          // 承認者名
          const authorizerValue = getSnapOrRealName(authorizer, "-");

          return (
            <div className={props.classes.planBox} key={key}>
              <div className={`${props.classes.planPeriod}`}>
                <span>支援期間</span>
                <span>
                  {plan.support_begin_date
                    ? dateToLocalisedString(
                        plan.support_begin_date,
                        "YYYY年M月D日"
                      )
                    : ""}
                  &emsp;〜&emsp;
                  {plan.support_end_date
                    ? dateToLocalisedString(
                        plan.support_end_date,
                        "YYYY年M月D日"
                      )
                    : ""}
                </span>
                {props.planErrors &&
                  props.planErrors.length > 0 &&
                  props.planErrors[0].errors.map((error, index) => {
                    if (
                      !plan.archive &&
                      error.type === "error" &&
                      error.relation.key === "support_plan_id" &&
                      error.relation.value === plan.id
                    ) {
                      const alertKey = `alert-${index}`;
                      return (
                        <span
                          className={props.classes.alertPeriod}
                          key={alertKey}
                        >
                          <ErrorIcon className={props.classes.alertIconUpper} />
                          {error.content}
                        </span>
                      );
                    }
                    return null;
                  })}
              </div>
              <div className={props.classes.planItem}>
                作成者:
                {authorValue}
                <Chip
                  label={plan.status_type ? "承認済" : "未承認"}
                  className={
                    plan.status_type
                      ? `${props.classes.approvedButton}`
                      : `${props.classes.unapprovedButton}`
                  }
                />
                <div className={props.classes.buttonWrapper}>
                  <KnowbeButton
                    kind="outlineWhite"
                    style={buttonStyle}
                    onClick={props.handleClickPlanDoc(plan.id)}
                  >
                    個別支援計画書
                  </KnowbeButton>
                  {displayWarnIcon(plan.id, planErrors)}
                </div>
              </div>
              <div className={props.classes.planItem}>
                承認者:
                {authorizerValue}
                <Chip
                  label={plan.evaluation_status ? "実施済" : "未実施"}
                  className={
                    plan.evaluation_status
                      ? `${props.classes.approvedButton}`
                      : `${props.classes.unapprovedButton}`
                  }
                />
                <div className={props.classes.buttonWrapper}>
                  <KnowbeButton
                    kind="outlineWhite"
                    style={buttonStyle}
                    onClick={props.handleClickPlanEvaluationDoc(plan.id)}
                  >
                    評価・振り返り
                  </KnowbeButton>
                  {displayWarnIcon(plan.id, goalErrors)}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default withStyles(styles)(PlanList);
