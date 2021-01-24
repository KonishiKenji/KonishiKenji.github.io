import * as React from "react";
import {
  createStyles,
  StyleRules,
  WithStyles,
  withStyles
} from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";

import KnowbeButton from "@components/presentational/atoms/KnowbeButton";
import GrayMiddleHeading from "@components/atoms/GrayMiddleHeading";
import ReadonlyTextField from "@components/molecules/ReadonlyTextField";

import { SupportPlanAState } from "@stores/domain/mgr/A/supportPlan/types";
import { GetSupportPlanResponse } from "@api/requests/supportPlan/A/getSupportPlan";

import { SprintType } from "@constants/mgr/IAB/variables";
import circleNumbersList from "@constants/mgr/IAB/circleNumbersList";
import { SUPPLY_PICKUP_SERVICE_LIST2 } from "@constants/variables";
import { SECONDARY_BACKGROUND_COLOR } from "@constants/styles";

import { dateToLocalisedString } from "@/utils/date";
import getSnapOrRealName from "@utils/domain/mgr/getSnapOrRealName";

const styles = ({ palette }: Theme): StyleRules =>
  createStyles({
    dialogTitle: {
      color: "rgba(0, 0, 0, 0.87)",
      background: "#f5f5f5",
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
    headSection: {
      display: "flex",
      fontSize: 20,
      marginTop: 24,
      marginBottom: 24,
      borderBottom: "solid 1px rgba(0, 0, 0, 0.54)",
      "& > span": {
        lineHeight: "45px"
      }
    },
    space: {
      marginLeft: 20
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
    section: {
      padding: "0 8px"
    },
    group: {
      marginBottom: 40
    },
    textField: {
      margin: "24px 8px 16px",
      " & > div": {
        marginBottom: 16
      },
      "& textarea::-webkit-scrollbar": {
        display: "none"
      }
    },
    textFieldFlex: {
      display: "flex"
    },
    textFieldCol: {
      width: 245,
      marginRight: 14
    },
    textFieldPickup: {
      width: 245,
      marginBottom: 30
    },
    subContainer: {
      "& > :first-child": {
        paddingTop: 24
      },
      "& > :last-child": {
        borderBottom: "1px solid #e5e5e5",
        paddingBottom: 16,
        marginBottom: 24
      }
    },
    subGroup: {
      marginBottom: 48
    },
    subTitle: {
      fontSize: 14,
      marginBottom: 12
    },
    subSection: {
      paddingLeft: 8,
      marginBottom: 12
    },
    table: {
      width: 504,
      marginBottom: 32
    },
    tableHead: {
      backgroundColor: SECONDARY_BACKGROUND_COLOR,
      color: palette.common.black,
      "& > tr": {
        height: 40
      }
    },
    tableHeadCell1: {
      width: 186,
      minWidth: 186,
      padding: "4px 16px"
    },
    tableHeadCell2: {
      width: "100%"
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
    }
  });

const buttonStyle: React.CSSProperties = {
  minWidth: 100,
  position: "absolute",
  top: 8,
  right: 0,
  marginRight: 32
};

interface OwnProps {
  isOpen: boolean;
  onClose: () => void;
  supportPlan: GetSupportPlanResponse["data"];
  userName: string;
}

type Props = OwnProps & WithStyles<typeof styles>;

type SprintData = {
  number: number;
  sprint_goal: string;
  adopt_info: string;
  support_info: string;
  sprint_start_date: string;
  sprint_end_date: string;
};

type ProgramData = {
  scheduled_time: string;
  service_content: string;
};

const supplementSupportPlanGoal = (
  supportPlanGoal: SupportPlanAState["supportPlan"][0]["support_plan_goal"]
): SprintData[] => {
  const numberOfLongOrShort = 1;
  const convertPrivateToRecord = (
    res:
      | SupportPlanAState["supportPlan"][0]["support_plan_goal"][0]
      | undefined,
    defaultNumber: number
  ): SprintData => {
    return res
      ? {
          number: res.number,
          sprint_goal: res.sprint_goal || "",
          adopt_info: res.adopt_info || "",
          support_info: res.support_info || "",
          sprint_start_date: res.sprint_start_date || "",
          sprint_end_date: res.sprint_end_date || ""
        }
      : {
          number: defaultNumber,
          sprint_goal: "",
          adopt_info: "",
          support_info: "",
          sprint_start_date: "",
          sprint_end_date: ""
        };
  };

  const supportPlanGoalLong = convertPrivateToRecord(
    supportPlanGoal.find((g) => g.sprint_type === SprintType.LONG),
    numberOfLongOrShort
  );
  const supportPlanGoalShort = convertPrivateToRecord(
    supportPlanGoal.find((g) => g.sprint_type === SprintType.SHORT),
    numberOfLongOrShort
  );
  const tmpSupportPlanGoalIndividuals = supportPlanGoal.filter(
    (g) => g.sprint_type === SprintType.INDIVIDUAL
  );
  const individualNumbers = [1, 2, 3, 4, 5]; // 個別目標 1~5
  const supportPlanGoalIndividuals = individualNumbers.map((num) => {
    const res = tmpSupportPlanGoalIndividuals.find((s) => s.number === num);
    return convertPrivateToRecord(res, num);
  });
  return [
    supportPlanGoalLong,
    supportPlanGoalShort,
    ...supportPlanGoalIndividuals
  ];
};

const supplementSupportProgram = (
  supportPlanGoal: SupportPlanAState["supportPlan"][0]["support_plan_program"]
): ProgramData[] => {
  if (supportPlanGoal && supportPlanGoal.length > 0) {
    return supportPlanGoal.map((p) => {
      const { scheduled_time, service_content } = p;
      return {
        scheduled_time: scheduled_time || "",
        service_content: service_content || ""
      };
    });
  }
  // ブランク表示用に 1 件返す
  return [{ scheduled_time: "", service_content: "" }];
};

const desiredFormat = "YYYY年M月D日";

const generateGoalContent = (
  goal: SprintData,
  classes: ClassNameMap,
  isIndividual: boolean
): JSX.Element => {
  return (
    <>
      <div className={classes.textField}>
        <ReadonlyTextField
          label="目標"
          value={goal.sprint_goal || ""}
          defaultValue=""
          multiline
        />
      </div>
      {isIndividual && (
        <>
          <div className={classes.textField}>
            <ReadonlyTextField
              label="本人の取組内容"
              value={goal.adopt_info || ""}
              defaultValue=""
              multiline
            />
          </div>
          <div className={classes.textField}>
            <ReadonlyTextField
              label="職員の支援内容"
              value={goal.support_info || ""}
              defaultValue=""
              multiline
            />
          </div>
        </>
      )}
      <div className={classes.textField}>
        <div className={classes.textFieldFlex}>
          <div className={classes.textFieldCol}>
            <ReadonlyTextField
              label={isIndividual ? "適用開始日" : "設定日"}
              value={
                goal.sprint_start_date
                  ? dateToLocalisedString(goal.sprint_start_date, desiredFormat)
                  : "-"
              }
              defaultValue=""
            />
          </div>
          <div className={classes.textFieldCol}>
            <ReadonlyTextField
              label={isIndividual ? "適用終了日" : "達成予定日"}
              value={
                goal.sprint_end_date
                  ? dateToLocalisedString(goal.sprint_end_date, desiredFormat)
                  : "-"
              }
              defaultValue=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

const PlannedTargetDialog = (props: Props): JSX.Element => {
  const filteredPlan = props.supportPlan.filter((plan) => {
    return !plan.archive;
  });
  const latestPlan =
    filteredPlan.length > 0 &&
    filteredPlan.reduce((prev, current) => {
      return prev.id > current.id ? prev : current;
    });
  if (!latestPlan) {
    return <></>;
  }

  // 作成者名
  const { author } = latestPlan;
  const authorValue = getSnapOrRealName(author, "-");

  const goals = supplementSupportPlanGoal(latestPlan.support_plan_goal);

  const programs = supplementSupportProgram(latestPlan.support_plan_program);

  const pickupValue = SUPPLY_PICKUP_SERVICE_LIST2.find(
    (p) => Number(p.value) === latestPlan.pickup
  );
  const pickupDefaultValue = SUPPLY_PICKUP_SERVICE_LIST2[0].label;

  return (
    <Dialog open={props.isOpen} disableBackdropClick maxWidth={false}>
      <DialogTitle className={props.classes.dialogTitle}>
        <span>{props.userName}</span>
        <span className={props.classes.space}>計画目標</span>
        <KnowbeButton
          kind="outline"
          style={buttonStyle}
          onClick={props.onClose}
        >
          閉じる
        </KnowbeButton>
      </DialogTitle>
      <DialogContent className={props.classes.dialogContent}>
        <div className={props.classes.headSection}>
          <span>支援期間</span>
          <span className={props.classes.space}>
            {latestPlan.support_begin_date &&
              dateToLocalisedString(
                latestPlan.support_begin_date,
                desiredFormat
              )}
          </span>
          <span className={props.classes.space}>〜</span>
          <span className={props.classes.space}>
            {latestPlan.support_end_date &&
              dateToLocalisedString(latestPlan.support_end_date, desiredFormat)}
          </span>
          <div className={props.classes.createData}>
            <div>
              <span>計画作成日：</span>
              <span>
                {latestPlan.creation_date
                  ? dateToLocalisedString(
                      latestPlan.creation_date,
                      desiredFormat
                    )
                  : "-"}
              </span>
            </div>
            <div>
              <span>計画作成者：</span>
              <span>{authorValue}</span>
            </div>
          </div>
        </div>

        <div className={props.classes.section}>
          <GrayMiddleHeading text="本人情報" />
          <div className={props.classes.group}>
            <div className={props.classes.textField}>
              <ReadonlyTextField
                label="就労継続支援A型利用までの経緯（活動歴や病歴等）"
                value={latestPlan.details || ""}
                defaultValue=""
                multiline
              />
            </div>
            <div className={props.classes.textField}>
              <ReadonlyTextField
                label="本人の希望（業務内容、労働時間、賃金、一般就労の希望の有無等）"
                value={latestPlan.user_request_text || ""}
                defaultValue=""
                multiline
              />
            </div>
            <div className={props.classes.textField}>
              <ReadonlyTextField
                label="本人の障害基礎年金等の有無や収入状況"
                value={latestPlan.income_status || ""}
                defaultValue=""
                multiline
              />
            </div>
            <div className={props.classes.textField}>
              <ReadonlyTextField
                label="本人の生産活動を行う際の課題"
                value={latestPlan.user_issue || ""}
                defaultValue=""
                multiline
              />
            </div>
            <div className={props.classes.textField}>
              <ReadonlyTextField
                label="健康状態（病名、服薬状況等）"
                value={latestPlan.physical_condition || ""}
                defaultValue=""
                multiline
              />
            </div>
            <div className={props.classes.textField}>
              <ReadonlyTextField
                label="生産活動や支援で留意する医学的リスクなど"
                value={latestPlan.risk_factor || ""}
                defaultValue=""
                multiline
              />
            </div>
            <div className={props.classes.textField}>
              <ReadonlyTextField
                label="生活環境や自宅での役割などの本人の生活状況"
                value={latestPlan.current_status || ""}
                defaultValue=""
                multiline
              />
            </div>
          </div>

          <GrayMiddleHeading text="長期目標" />
          <div className={props.classes.group}>
            {generateGoalContent(goals[0], props.classes, false)}
          </div>

          <GrayMiddleHeading text="短期目標" />
          <div className={props.classes.group}>
            {generateGoalContent(goals[1], props.classes, false)}
          </div>

          <GrayMiddleHeading text="サービス提供内容" />
          <div className={props.classes.subContainer}>
            {/* 長期目標[0], 短期目標[1], 個別目標[2~6] */}
            {[2, 3, 4, 5, 6].map((num, index) => {
              const individualKey = `individualKey-${index}`;
              return (
                <div className={props.classes.subGroup} key={individualKey}>
                  <div className={props.classes.subTitle}>
                    <>
                      目標と支援の提供方針・内容
                      {circleNumbersList[index]}
                    </>
                  </div>
                  <div className={props.classes.subSection}>
                    {generateGoalContent(goals[num], props.classes, true)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={props.classes.subTitle}>
            <>プログラム（1日の流れ）</>
          </div>
          <div className={props.classes.subSection}>
            <div className={props.classes.textFieldPickup}>
              <ReadonlyTextField
                label="送迎"
                value={pickupValue ? pickupValue.label : pickupDefaultValue}
                defaultValue={pickupDefaultValue}
              />
            </div>

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
                {programs.map((p, index) => {
                  const key = `supprt-program-row-${index}`;
                  return (
                    <TableRow key={key}>
                      <TableCell className={props.classes.tableBodyCell1}>
                        <ReadonlyTextField
                          label=""
                          value={p.scheduled_time || ""}
                          defaultValue=""
                          multiline
                        />
                      </TableCell>
                      <TableCell className={props.classes.tableBodyCell2}>
                        <ReadonlyTextField
                          label=""
                          value={p.service_content || ""}
                          defaultValue=""
                          multiline
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <GrayMiddleHeading text="その他" />
        <div className={props.classes.textField}>
          <ReadonlyTextField
            label="特記事項"
            value={latestPlan.remarks || ""}
            defaultValue=""
            multiline
          />
          <ReadonlyTextField
            label="職員コメント"
            value={latestPlan.staff_comment || ""}
            defaultValue=""
            multiline
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(PlannedTargetDialog);
