import * as React from "react";
import {
  withStyles,
  WithStyles,
  createStyles,
  StyleRules
} from "@material-ui/core/styles";

// store
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";
import { SupportPlanState } from "@stores/domain/supportPlan/types";
import { UsersInFacilityState as SEIKATSUKAIGOUsersInFacilityState } from "@stores/domain/mgr/SEIKATSUKAIGO/userInFacility/types";
import { UsersInFacilityState as IABUsersInFacilityState } from "@stores/domain/mgr/IAB/userInFacility/types";
import dispatches from "@stores/dispatches";

// constants
import { FacilityType } from "@constants/variables";
import {
  PRINT_PAGE_HEIGHT,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_WIDTH,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@/constants/styles";
import { getUrlParams } from "@/utils/url";
import { dateToLocalisedString } from "@/utils/date";

const styles = (): StyleRules =>
  createStyles({
    page: {
      minHeight: PRINT_PAGE_HEIGHT,
      width: PRINT_PAGE_WIDTH,
      margin: `0 auto ${PRINT_PAGE_MARGIN_BOTTOM}px`,
      padding: `10px ${PRINT_PAGE_PADDING / 2}px`,
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
      "&:last-child": {
        margin: "0 auto"
      }
    },
    flexContainer: {
      display: "flex",
      justifyContent: "flex-start",
      marginBottom: 8
    },
    createdDate: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 24,
      letterSpacing: "0.1em"
    },
    planningPeriodDate: {
      letterSpacing: "0.1em"
    },
    entryField: {
      marginBottom: 24
    },
    entryFieldColumn: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8
    },
    entryFieldContainer: {
      fontSize: 10,
      borderBottom: "1px solid #000",
      width: "45%",
      paddingLeft: 8,
      paddingRight: 8
    },
    entryFieldLabel: {
      fontSize: 9,
      marginBottom: 12
    },
    entryFieldContentContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 3
    },
    role: {
      fontSize: 8
    },
    authorizer: {
      marginLeft: 24
    },
    entryFieldMark: {
      color: "#999",
      fontSize: 12
    },
    tableContainer: {
      fontSize: 10,
      marginBottom: 24,
      whiteSpace: "pre-line"
    },
    tableTitle: {
      fontWeight: "bold",
      borderBottom: "1px solid #000",
      paddingBottom: 5,
      marginBottom: 8,
      paddingLeft: 8,
      display: "flex",
      justifyContent: "space-between"
    },
    table: {
      borderCollapse: "collapse",
      borderSpacing: 0,
      border: "2px solid",
      textAlign: "left",
      "&.sprintGoal": {
        marginTop: 8,
        marginBottom: 8
      },
      "&.fullWidth": {
        width: "100%"
      },
      "& th": {
        fontWeight: "normal",
        width: 120,
        borderRight: "1px solid",
        paddingLeft: 8,
        verticalAlign: "top"
      },
      "& td": {
        padding: "4px 12px",
        fontSize: 10,
        letterSpacing: 0.6,
        height: 20,
        color: "rgba(0, 0, 0, 0.84)",
        "&.label": {
          textAlign: "center"
        },
        "&.prise": {
          textAlign: "right"
        },
        "&.small": {
          height: 100
        },
        "&.middle": {
          height: 200
        },
        "&.large": {
          height: 300
        },
        "&.sssize": {
          width: 40
        },
        "&.ssize": {
          width: 60
        },
        "&.msize": {
          width: 80
        },
        "&.lsize": {
          width: 100
        },
        "&.llsize": {
          width: 180
        },
        "&.borderBold": {
          borderRight: "2px solid"
        },
        "&.borderDashed": {
          borderRight: "1px dashed"
        }
      },
      "& tr": {
        borderBottom: "1px solid",
        "&.borderBold": {
          borderBottom: "2px solid"
        }
      }
    },
    implementDate: {
      fontWeight: "normal",
      letterSpacing: "0.1em",
      fontSize: 8
    },
    title: {
      margin: 0,
      fontSize: 24,
      fontWeight: "normal",
      letterSpacing: 1.2,
      textAlign: "center",
      color: "rgba(0, 0, 0, 0.84)"
    },
    counts: {
      fontSize: 10,
      letterSpacing: "0.1em"
    },
    signature: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end"
    },
    signatureDate: {
      fontSize: 14,
      display: "flex",
      "& :nth-of-type(n+2)": {
        marginLeft: 48
      }
    },
    agreeText: {
      fontSize: 14
    },
    userNameContainer: {
      marginLeft: 18,
      borderBottomColor: "#999"
    },
    userEntryFieldLabel: {
      fontSize: 12
    },
    userEntryFieldContentContainer: {
      textAlign: "right",
      fontSize: 16
    },
    hideStaffComment: {
      display: "none"
    },
    "@media print": {
      page: {
        width: "172mm",
        height: "251mm",
        minHeight: 0,
        padding: 0,
        margin: "0 auto",
        boxShadow: "none",
        pageBreakAfter: "always",
        "&:last-child": {
          pageBreakAfter: "auto"
        }
      }
    }
  });

/**
 * interface
 */
interface StateProps {
  user: UserState;
  userInFacility:
    | SEIKATSUKAIGOUsersInFacilityState["user"]
    | IABUsersInFacilityState["user"];
  privateSupportPlan: SupportPlanState["privateSupportPlan"];
}
interface OwnProps {
  uifId: string;
  supportPlanId: string;
  query: string;
}
interface DispatchProps {
  getPrivateSupportPlanRecordData: (
    uifId: string,
    supportPlanId: string
  ) => void;
  getUserDetailInFacilityData: (
    uifId: string,
    facility_type: FacilityType
  ) => void;
}
type Props = StateProps & OwnProps & DispatchProps & WithStyles<typeof styles>;

interface SheetOwnProps {
  userDetail: {
    nameSei?: string;
    nameMei?: string;
    facilityName: string;
    recipientNumber?: string;
  };
  fixPlanData: SupportPlanState["privateSupportPlan"];
  displayOptions: {
    display_info?: string;
    display_comment?: string;
    display_minutes?: string;
  };
}
interface SectionTableOwnProps {
  sectionTitle: string;
  sectionPlanData: { itemTitle: string; content: string | null }[];
  sprintPlanData?: SupportPlanState["privateSupportPlan"]["support_plan_goal"];
  implementDate?: string | null;
  displayOptions?: {
    display_info?: string;
    display_comment?: string;
    display_minutes?: string;
  };
}
type SheetProps = SheetOwnProps & WithStyles<typeof styles>;

type SectionTableProps = SectionTableOwnProps & WithStyles<typeof styles>;

class PreviewSupportPlanReports extends React.Component<Props> {
  public displayOptions: {
    display_info?: string;
    display_comment?: string;
    display_minutes?: string;
  };

  constructor(props: Props) {
    super(props);
    this.displayOptions = {};
  }

  public async componentDidMount(): Promise<void> {
    const { uifId, supportPlanId, query, user } = this.props;
    const queryParameters: {
      display_info?: string;
      display_comment?: string;
      display_minutes?: string;
    } = getUrlParams(query);

    this.props.getUserDetailInFacilityData(uifId, user.facility_type);
    this.props.getPrivateSupportPlanRecordData(uifId, supportPlanId);
    this.displayOptions = queryParameters;
  }

  public render(): JSX.Element | null {
    const { classes, privateSupportPlan, user, userInFacility } = this.props;

    if (
      !privateSupportPlan ||
      Object.keys(privateSupportPlan).length === 0 ||
      Object.keys(userInFacility.user_in_facility).length === 0 ||
      !userInFacility.user_in_facility.id ||
      !user
    ) {
      return null;
    }

    const userDetail = {
      nameSei: userInFacility.user_in_facility.name_sei,
      nameMei: userInFacility.user_in_facility.name_mei,
      facilityName: user.facility_name,
      recipientNumber: userInFacility.user_in_facility.recipient_number
    };

    return (
      <>
        {Object.keys(privateSupportPlan).length > 0 && (
          <Sheet
            classes={classes}
            userDetail={userDetail}
            fixPlanData={privateSupportPlan}
            displayOptions={this.displayOptions}
          />
        )}
      </>
    );
  }
}

const SectionTable = (props: SectionTableProps): JSX.Element => {
  const {
    classes,
    sectionTitle,
    sectionPlanData,
    sprintPlanData,
    implementDate,
    displayOptions
  } = props;

  return (
    <section>
      <div className={classes.tableTitle}>
        <span>{sectionTitle}</span>
        {implementDate && (
          <span className={classes.implementDate}>
            実施日:
            {dateToLocalisedString(implementDate, "YYYY年M月D日")}
          </span>
        )}
      </div>

      <table className={`${classes.table} fullWidth`}>
        <tbody>
          {sectionPlanData.map((planKey) => {
            return (
              <tr
                className={
                  displayOptions &&
                  !displayOptions.display_comment &&
                  planKey.itemTitle === "職員コメント"
                    ? classes.hideStaffComment
                    : ""
                }
              >
                <th>{planKey.itemTitle}</th>
                <td>{planKey.content}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {(sprintPlanData || []).map((planKey) => {
        return (
          <table className={`${classes.table} fullWidth sprintGoal`}>
            {(planKey.sprint_goal ||
              planKey.adopt_info ||
              planKey.support_info) && (
              <tbody>
                <tr>
                  <th>
                    短期目標
                    {planKey.number}
                  </th>
                  <td>{planKey.sprint_goal}</td>
                </tr>
                <tr>
                  <th>本人の取組内容</th>
                  <td>{planKey.adopt_info}</td>
                </tr>
                {displayOptions && displayOptions.display_info && (
                  <tr>
                    <th>職員の支援内容</th>
                    <td>{planKey.support_info}</td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        );
      })}
    </section>
  );
};

const Sheet = (props: SheetProps): JSX.Element => {
  const { classes, userDetail, fixPlanData, displayOptions } = props;
  const filteredName: string[] = [];
  if (fixPlanData.participant) {
    fixPlanData.participant
      .filter((result) => result.name)
      .map((participant) => filteredName.push(participant.name));
  }
  const mtgData = [
    {
      itemTitle: "会議議事録",
      content: fixPlanData.minutes
    },
    {
      itemTitle: "参加者",
      content: filteredName.join("、")
    }
  ];
  const hopeData = [
    {
      itemTitle: "本人・家族の意向",
      content: fixPlanData.user_request_text
    },
    {
      itemTitle: "本人の現状",
      content: fixPlanData.current_status
    }
  ];
  const goalData = [
    {
      itemTitle: "長期目標",
      content: fixPlanData.long_term_goal
    }
  ];
  const otherData = [
    {
      itemTitle: "備考欄",
      content: fixPlanData.remarks
    },
    {
      itemTitle: "職員コメント",
      content: fixPlanData.staff_comment
    }
  ];
  return (
    <div className={classes.page}>
      <header>
        <h1 className={classes.title}>個別支援計画書</h1>
      </header>
      <div className={classes.createdDate}>
        <span className={classes.counts}>
          計画作成日:
          {dateToLocalisedString(
            fixPlanData.creation_date !== null ? fixPlanData.creation_date : "",
            "YYYY年M月D日"
          )}
        </span>
      </div>
      <div className={classes.entryField}>
        <div className={classes.entryFieldColumn}>
          <div className={classes.entryFieldContainer}>
            <span className={classes.entryFieldLabel}>利用者名</span>
            <div className={classes.entryFieldContentContainer}>
              <span>{`${userDetail.nameSei}${userDetail.nameMei}`}</span>
              <span>様</span>
            </div>
          </div>
          <div className={classes.entryFieldContainer}>
            <span className={classes.entryFieldLabel}>事業所</span>
            <div className={classes.entryFieldContentContainer}>
              <span>{userDetail.facilityName}</span>
            </div>
          </div>
        </div>
        <div className={classes.entryFieldColumn}>
          <div className={classes.entryFieldContainer}>
            <span className={classes.entryFieldLabel}>受給者証番号</span>
            <div className={classes.entryFieldContentContainer}>
              <span>{userDetail.recipientNumber}</span>
            </div>
          </div>
          <div className={classes.entryFieldContainer}>
            <span className={classes.entryFieldLabel}>作成者</span>
            <div className={classes.entryFieldContentContainer}>
              <span>
                {typeof fixPlanData.author === "object" &&
                  fixPlanData.author.name}
              </span>
              <span className={classes.entryFieldMark}>印</span>
            </div>
          </div>
        </div>
        <div className={classes.entryFieldColumn}>
          <div className={classes.entryFieldContainer}>
            <span className={classes.entryFieldLabel}>支援期間</span>
            <div className={classes.entryFieldContentContainer}>
              <span className="planningPeriodDate">
                {dateToLocalisedString(
                  fixPlanData.support_begin_date !== null
                    ? fixPlanData.support_begin_date
                    : "",
                  "YYYY年M月D日"
                )}
                ~
                {dateToLocalisedString(
                  fixPlanData.support_end_date !== null
                    ? fixPlanData.support_end_date
                    : "",
                  "YYYY年M月D日"
                )}
              </span>
            </div>
          </div>
          <div className={classes.entryFieldContainer}>
            <span className={classes.entryFieldLabel}>承認者</span>
            <div className={classes.entryFieldContentContainer}>
              <div>
                <span className={classes.role}>
                  {typeof fixPlanData.authorizer === "object" &&
                    fixPlanData.authorizer.role}
                </span>
                <span className={classes.authorizer}>
                  {typeof fixPlanData.authorizer === "object" &&
                    fixPlanData.authorizer.name}
                </span>
              </div>
              <span className={classes.entryFieldMark}>印</span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.tableContainer}>
        <SectionTable
          classes={classes}
          sectionTitle="本人の状況"
          sectionPlanData={hopeData}
        />
      </div>
      <div className={classes.tableContainer}>
        <SectionTable
          classes={classes}
          sectionTitle="目標と支援方針"
          sectionPlanData={goalData}
          sprintPlanData={fixPlanData.support_plan_goal}
          displayOptions={displayOptions}
        />
      </div>
      <div className={classes.tableContainer}>
        <SectionTable
          classes={classes}
          sectionTitle="その他"
          sectionPlanData={otherData}
          displayOptions={displayOptions}
        />
      </div>
      {displayOptions.display_minutes && (
        <div className={classes.tableContainer}>
          <SectionTable
            classes={classes}
            sectionTitle="個別支援会議の議事録"
            implementDate={fixPlanData.minutes_date}
            sectionPlanData={mtgData}
          />
        </div>
      )}
      <div>
        <p className={classes.agreeText}>
          上記個別支援計画書の内容についてサービス管理責任者より説明を受け、同意の上受領しました。
        </p>
        <div className={classes.signature}>
          <div className={classes.signatureDate}>
            <span>年</span>
            <span>月</span>
            <span>日</span>
          </div>
          <div
            className={`${classes.entryFieldContainer} ${classes.userNameContainer}`}
          >
            <span className={classes.userEntryFieldLabel}>利用者名</span>
            <div className={classes.userEntryFieldContentContainer}>
              <span className={classes.entryFieldMark}>印</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: AppState): StateProps => {
  const user = state.user as UserState;
  const userInFacility =
    user.facility_type === FacilityType.SEIKATSUKAIGO
      ? state.SEIKATSUKAIGO.userInFacility.user
      : state.IAB.userInFacility.user;
  return {
    user,
    userInFacility,
    privateSupportPlan: state.supportPlan.privateSupportPlan
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { supportPlanDispatcher } = dispatches;
  const getPrivateSupportPlanRecordData = (
    uifId: string,
    supportPlanId: string
  ): Promise<void> =>
    supportPlanDispatcher(dispatch).fetchPrivateSupportPlan(
      uifId,
      supportPlanId
    );
  const getUserDetailInFacilityData = (
    uifId: string,
    facility_type: FacilityType
  ): Promise<void> => {
    // 種別として移行AB or 生活介護が利用する機能なので
    // facility_typeで該当種別のdispatcherを選択する
    const dispatcher =
      facility_type === FacilityType.SEIKATSUKAIGO
        ? dispatches.SEIKATSUKAIGO
        : dispatches.IAB;

    return dispatcher.userInFacilityDispatcher(dispatch).fetchOne(uifId);
  };

  return {
    getPrivateSupportPlanRecordData,
    getUserDetailInFacilityData
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PreviewSupportPlanReports));
