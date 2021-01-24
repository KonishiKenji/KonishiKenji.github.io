import * as React from "react";

import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

import { GetSupportPlanResponse } from "@api/requests/supportPlan/getSupportPlan";

import GrayMiddleHeading from "@components/atoms/GrayMiddleHeading";
import ReadonlyTextField from "@components/molecules/ReadonlyTextField";

import { dateToLocalisedString } from "@/utils/date";

const styles = () =>
  createStyles({
    dialogTitle: {
      color: "rgba(0, 0, 0, 0.87)",
      fontSize: 20,
      borderBottom: "solid 1px",
      borderBottomColor: "#cfd8dc",
      height: 53,
      display: "flex",
      alignItems: "center",
      position: "relative",
      "& > :first-child": {
        marginLeft: 8
      }
    },
    button: {
      minWidth: 100,
      position: "absolute",
      top: 8,
      right: 0,
      marginRight: 32
    },
    section: {
      display: "flex",
      fontSize: 20,
      marginTop: 24,
      borderBottom: "solid 1px rgba(0, 0, 0, 0.54)",
      "& > span": {
        lineHeight: "45px"
      }
    },
    createData: {
      justifyContent: "space-between",
      color: "rgba(0, 0, 0, 0.6)",
      fontSize: 12,
      marginLeft: "auto",
      marginBottom: 9
    },
    dialogContent: {
      width: 1070,
      padding: "0 32px"
    },
    textField: {
      margin: "24px 8px 16px",
      " & > div": {
        marginBottom: 16
      }
    },
    space: {
      marginLeft: 20
    }
  });

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
  supportPlan: GetSupportPlanResponse["data"];
  userName: string;
}

type Props = OwnProps & WithStyles<typeof styles>;

const PlannedTargetDialog = (props: Props) => {
  const filteredPlan = props.supportPlan.filter(plan => {
    return !plan.archive;
  });
  const latestPlan =
    filteredPlan.length > 0 &&
    filteredPlan.reduce((prev, current) => {
      return prev.id > current.id ? prev : current;
    });
  if (!latestPlan) {
    return null;
  }
  const SHORT_TERM_GOALS_NUM = 3;
  const shortTermGoals =
    latestPlan.support_plan_goal.length > 0
      ? latestPlan.support_plan_goal
      : [
          {
            id: 0,
            number: 1,
            sprint_goal: "",
            adopt_info: null,
            support_info: null,
            user_comment: null,
            improvement_plan: null
          }
        ];
  for (let i = 0; i < SHORT_TERM_GOALS_NUM; i += 1) {
    if (!shortTermGoals[i] || shortTermGoals[i].number !== i + 1) {
      shortTermGoals.splice(i, 0, {
        id: 0,
        number: i + 1,
        sprint_goal: "",
        adopt_info: null,
        support_info: null,
        user_comment: null,
        improvement_plan: null
      });
    }
  }
  return (
    <Dialog open={props.isOpen} disableBackdropClick={true} maxWidth={false}>
      <DialogTitle className={props.classes.dialogTitle}>
        <span>{props.userName}</span>
        <span className={props.classes.space}>計画目標</span>
        <Button
          className={props.classes.button}
          variant="outlined"
          color="secondary"
          onClick={props.onClose}
        >
          閉じる
        </Button>
      </DialogTitle>
      <DialogContent className={props.classes.dialogContent}>
        <div className={props.classes.section}>
          <span>支援期間</span>
          <span className={props.classes.space}>
            {latestPlan.support_begin_date
              ? dateToLocalisedString(
                  latestPlan.support_begin_date,
                  "YYYY年M月D日"
                )
              : null}
          </span>
          <span className={props.classes.space}>〜</span>
          <span className={props.classes.space}>
            {latestPlan.support_end_date
              ? dateToLocalisedString(
                  latestPlan.support_end_date,
                  "YYYY年M月D日"
                )
              : null}
          </span>
          <div className={props.classes.createData}>
            <div>
              <span>作成日：</span>
              <span>
                {latestPlan.creation_date
                  ? dateToLocalisedString(
                      latestPlan.creation_date,
                      "YYYY年 MM月 DD日"
                    )
                  : "-"}
              </span>
            </div>
            <div>
              <span>作成者：</span>
              <span>
                {typeof latestPlan.author === "number"
                  ? "-"
                  : latestPlan.author.name}
              </span>
            </div>
          </div>
        </div>
        <div className={props.classes.textField}>
          <ReadonlyTextField
            label="本人・家族の意向"
            value={latestPlan.user_request_text || ""}
            defaultValue=""
            multiline={true}
          />
          <ReadonlyTextField
            label="本人の現状"
            value={latestPlan.current_status || ""}
            defaultValue=""
            multiline={true}
          />
        </div>

        <GrayMiddleHeading text="長期目標" />
        <div className={props.classes.textField}>
          <ReadonlyTextField
            value={latestPlan.long_term_goal || ""}
            defaultValue=""
            multiline={true}
          />
        </div>
        {shortTermGoals.map((item, index) => (
          <div key={`index_${index}`}>
            <GrayMiddleHeading text={`短期目標 ${item.number}`} />
            <div className={props.classes.textField}>
              <ReadonlyTextField
                label="目標"
                value={item.sprint_goal || ""}
                defaultValue=""
                multiline={true}
              />
              <ReadonlyTextField
                label="本人の取組内容"
                value={item.adopt_info || ""}
                defaultValue=""
                multiline={true}
              />
              <ReadonlyTextField
                label="職員の支援内容"
                value={item.support_info || ""}
                defaultValue=""
                multiline={true}
              />
            </div>
          </div>
        ))}
        <GrayMiddleHeading text="その他" />
        <div className={props.classes.textField}>
          <ReadonlyTextField
            label="備考欄"
            value={latestPlan.remarks || ""}
            defaultValue=""
            multiline={true}
          />
          <ReadonlyTextField
            label="職員コメント"
            value={latestPlan.staff_comment || ""}
            defaultValue=""
            multiline={true}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(PlannedTargetDialog);
