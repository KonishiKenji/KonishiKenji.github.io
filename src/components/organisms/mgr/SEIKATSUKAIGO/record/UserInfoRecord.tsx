import * as React from "react";
import { FacilityState } from "@stores/domain/mgr/SEIKATSUKAIGO/facility/types";
import { UsersInFacilityState } from "@stores/domain/mgr/SEIKATSUKAIGO/userInFacility/types";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import SectionTitleWithButton from "@components/molecules/SectionTitleWithButton";
import { dateToLocalisedString } from "@/utils/date";
import { GetSupportPlanResponse } from "@api/requests/supportPlan/getSupportPlan";
import PlannedTargetDialog from "@components/organisms/mgr/common/record/PlannedTargetDialog";

const styles = () =>
  createStyles({
    root: {
      padding: "32px 32px 24px"
    },
    appBar: {
      marginTop: 32,
      borderRadius: 3
    },
    button: {
      minWidth: 120
    },
    table: {
      marginTop: 8
    },
    labelCell: {
      fontSize: 14,
      color: "#37474f",
      padding: "8px 16px 8px 0"
    },
    cell: {
      fontWeight: 500,
      padding: "0 8px"
    },
    week: {
      display: "flex",
      color: "#fff",
      "& > span": {
        display: "block",
        fontWeight: "normal",
        lineHeight: 1,
        padding: 6,
        marginRight: 8,
        borderRadius: "50%"
      }
    },
    greenLabel: {
      backgroundColor: "#3daa8d"
    },
    grayLabel: {
      backgroundColor: "#bababa"
    },
    colorlessLabel: {
      color: "#333"
    }
  });

interface OwnProps {
  userName: string;
  facility: FacilityState;
  user: UsersInFacilityState["user"];
  supportPlan?: GetSupportPlanResponse["data"];
  isEditing: boolean;
}
type Props = OwnProps & WithStyles<typeof styles>;

const UserInfoRecord = (props: Props) => {
  // 通所予定日
  const daysOfTheWeek = [
    {
      label: "月",
      userKey: "mon_scheduled_flg",
      facilityKey: "mondaySchedule"
    },
    {
      label: "火",
      userKey: "tue_scheduled_flg",
      facilityKey: "tuesdaySchedule"
    },
    {
      label: "水",
      userKey: "wed_scheduled_flg",
      facilityKey: "wednesdaySchedule"
    },
    {
      label: "木",
      userKey: "thu_scheduled_flg",
      facilityKey: "thursdaySchedule"
    },
    {
      label: "金",
      userKey: "fri_scheduled_flg",
      facilityKey: "fridaySchedule"
    },
    {
      label: "土",
      userKey: "sat_scheduled_flg",
      facilityKey: "saturdaySchedule"
    },
    {
      label: "日",
      userKey: "sun_scheduled_flg",
      facilityKey: "sundaySchedule"
    }
  ];

  // 障害種別
  const {
    classify_physical_flg,
    classify_intelligence_flg,
    classify_mind_flg,
    classify_growth_flg,
    classify_brain_flg,
    classify_handicapped_flg,
    classify_incurable_flg
  } = props.user.user_in_facility;
  const classifies: string[] = [];
  if (classify_physical_flg === "1") {
    classifies.push("身体障害");
  }
  if (classify_intelligence_flg === "1") {
    classifies.push("知的障害");
  }
  if (classify_mind_flg === "1") {
    classifies.push("精神障害");
  }
  if (classify_growth_flg === "1") {
    classifies.push("発達障害");
  }
  if (classify_brain_flg === "1") {
    classifies.push("高次脳機能障害");
  }
  if (classify_handicapped_flg === "1") {
    classifies.push("障害児");
  }
  if (classify_incurable_flg === "1") {
    classifies.push("難病等対象者");
  }

  // 計画目標モーダル
  const filteredPlan = (props.supportPlan || []).filter(plan => {
    return !plan.archive;
  });
  const latestPlan =
    filteredPlan.length > 0 &&
    filteredPlan.reduce((prev, current) => {
      return prev.id > current.id ? prev : current;
    });
  const [isOpenDialog, setOpenDialog] = React.useState(false);
  const openModal = () => {
    setOpenDialog(true);
  };
  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Paper className={props.classes.root} elevation={0}>
        <SectionTitleWithButton label={props.userName}>
          <Button
            className={props.classes.button}
            variant="outlined"
            color="secondary"
            onClick={openModal}
            disabled={!latestPlan || props.isEditing}
          >
            計画目標
          </Button>
        </SectionTitleWithButton>
        <table className={props.classes.table}>
          <tbody>
            <tr>
              <td className={props.classes.labelCell}>サービス提供開始日</td>
              <td className={props.classes.cell}>
                {props.user.user_in_facility.date_begin_in_service &&
                  dateToLocalisedString(
                    props.user.user_in_facility.date_begin_in_service,
                    "YYYY年M月D日"
                  )}
              </td>
            </tr>
            <tr>
              <td className={props.classes.labelCell}>通所予定日</td>
              <td className={props.classes.cell}>
                <div className={props.classes.week}>
                  {daysOfTheWeek.map(day => {
                    // 事業所の営業日と利用者の通所予定日に応じて曜日に色付けをする
                    const facilitySchedule: boolean =
                      props.facility[day.facilityKey];
                    const userSchedule: string =
                      props.user.user_in_facility[day.userKey];

                    let labelClassName = "";
                    if (facilitySchedule && userSchedule === "0") {
                      // 営業日だが通所予定日ではない
                      labelClassName = props.classes.grayLabel;
                    } else if (userSchedule === "1") {
                      // 営業日に関わらず通所予定日が入っている
                      labelClassName = props.classes.greenLabel;
                    } else if (!facilitySchedule && userSchedule === "0") {
                      // 営業日でも通所予定日でもない
                      labelClassName = props.classes.colorlessLabel;
                    }
                    return (
                      <span key={day.userKey} className={labelClassName}>
                        {day.label}
                      </span>
                    );
                  })}
                </div>
              </td>
            </tr>
            <tr>
              <td className={props.classes.labelCell}>障害種別</td>
              <td className={props.classes.cell}>
                {classifies.length > 0 ? classifies.join("、") : "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </Paper>
      {props.supportPlan && (
        <PlannedTargetDialog
          isOpen={isOpenDialog}
          onClose={closeDialog}
          supportPlan={props.supportPlan}
          userName={props.userName}
        />
      )}
    </>
  );
};

export default withStyles(styles)(UserInfoRecord);
