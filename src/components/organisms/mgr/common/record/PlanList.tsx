import * as React from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import ErrorIcon from "@material-ui/icons/Error";

import { dateToLocalisedString } from "@/utils/date";
import { theme } from "@styles/theme";

import { SupportPlanState } from "@stores/domain/supportPlan/types";
import { ErrorsState } from "@stores/domain/errors/types";

const styles = () =>
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
        marginBottom: 40
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
    buttonWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    checkIcon: {
      marginRight: 10
    },
    approvedButton: {
      backgroundColor: "#455a64",
      float: "right",
      color: "#ffffff"
    },
    unapprovedButton: {
      height: 32,
      color: "#ffffff",
      border: "2px solid #f5f5f5",
      backgroundColor: "#455a64",
      opacity: 0.12,
      float: "right"
    },
    planDocButton: {
      color: "#0277bd",
      width: 158,
      float: "right",
      marginRight: 16,
      borderColor: "#d5d5d5",
      "&:disabled": {
        color: "#bababa",
        backgroundColor: "#f5f5f5"
      },
      "&:hover": {
        backgroundColor: "rgba(33, 150, 243, 0.08)"
      }
    },
    planPeriodFinish: {
      marginTop: 60
    }
  });

type Props = OwnProps & WithStyles<typeof styles>;

interface OwnProps {
  planTitle: string;
  targetPlans: SupportPlanState["supportPlan"];
  errors: ErrorsState["plan"]["data"];
  handleClickPlanDoc: (planId: number) => () => void;
}

const PlanList = (props: Props) => {
  return (
    <div className={props.classes.planWrapper}>
      <h2 className={props.classes.planTitle}>{props.planTitle}</h2>
      {props.targetPlans &&
        props.targetPlans.map((plan, idx) => {
          return (
            <div className={props.classes.planBox} key={`${plan.id}_${idx}`}>
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
                {props.errors &&
                  props.errors.length > 0 &&
                  props.errors[0].errors.map((error, index) => {
                    if (!plan.archive && error.relation.value === plan.id) {
                      return (
                        <span className={props.classes.alertPeriod} key={index}>
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
                {!!plan.author && typeof plan.author !== "number"
                  ? plan.author.name
                  : "-"}
                <Chip
                  label={plan.status_type ? "承認済" : "未承認"}
                  className={
                    plan.status_type
                      ? `${props.classes.approvedButton}`
                      : `${props.classes.unapprovedButton}`
                  }
                />
                <Button
                  variant="outlined"
                  className={props.classes.planDocButton}
                  onClick={props.handleClickPlanDoc(plan.id)}
                >
                  個別支援計画書
                </Button>
              </div>
              <div className={props.classes.planItem}>
                承認者:
                {plan.authorizer && typeof plan.authorizer !== "number"
                  ? plan.authorizer.name
                  : "-"}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default withStyles(styles)(PlanList);
