import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import dispatches from "@stores/dispatches";
import {
  AttendanceList as AttendanceListType,
  FormatedAttendanceList
} from "@stores/domain/attendance/type";
import AttendanceTemplate from "@components/templates/AttendanceTemplate";
import AttendanceList from "@components/organisms/attendance/AttendanceList";
import AttendanceModal from "@components/organisms/attendance/AttendanceModal";

interface DispatchProps {
  handleLogout: () => void;
  fetchAttendanceList: () => void;
  fetchAttendance: (id: number, kana: string) => void;
  inTime: (id: number, name: string, status: number) => Promise<void>;
  outTime: (id: number, name: string, status: number) => Promise<void>;
}

const styles = createStyles({
  wrapper: {
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#fafafa"
  }
});

interface StateProps {
  attendanceList: AttendanceListType;
  userName: string;
  punchInButtonLabel: string;
  punchOutButtonLabel: string;
}

interface MergeProps extends StateProps, DispatchProps {
  formatedAttendanceList: FormatedAttendanceList;
}

type Props = MergeProps & WithStyles<typeof styles>;

interface State {
  isModalOpen: boolean;
  modalTargetId?: number;
}

const initialState: State = {
  isModalOpen: false,
  modalTargetId: undefined
};

interface KanaListInterFace {
  targetKana: RegExp;
  viewKana: string;
}

const listFormat: KanaListInterFace[] = [
  { viewKana: "あ", targetKana: /^[ァ-オ].*$/ },
  { viewKana: "か", targetKana: /^[カ-ゴ].*$/ },
  { viewKana: "さ", targetKana: /^[サ-ゾ].*$/ },
  { viewKana: "た", targetKana: /^[タ-ド].*$/ },
  { viewKana: "な", targetKana: /^[ナ-ノ].*$/ },
  { viewKana: "は", targetKana: /^[ハ-ポ].*$/ },
  { viewKana: "ま", targetKana: /^[マ-モ].*$/ },
  { viewKana: "や", targetKana: /^[ャ-ヨ].*$/ },
  { viewKana: "ら", targetKana: /^[ラ-ロ].*$/ },
  { viewKana: "わ", targetKana: /^[ヮ-ヴ].*$/ }
];

const formatAttendanceList = (list: AttendanceListType) => {
  return listFormat
    .map((target) => {
      return {
        viewKana: target.viewKana,
        attendance: list.filter((res) => {
          return target.targetKana.test(res.kanaName);
        })
      };
    })
    .filter((target) => {
      return target.attendance.length;
    });
};

/**
 * タイムカード
 */
class Attendance extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  public componentDidMount(): void {
    Promise.all([this.props.fetchAttendanceList()]);
  }

  private getModalTargetAttendance = () => {
    const targetResult = this.props.attendanceList.find((res) => {
      return res.uif_id === this.state.modalTargetId;
    });
    return targetResult;
  };

  private targetSelect = (id: number, kana: string): void => {
    if (this.state.isModalOpen) return;
    this.setState({
      isModalOpen: true,
      modalTargetId: id
    });
    this.props.fetchAttendance(id, kana);
  };

  private modalClose = (): void => {
    this.setState({
      isModalOpen: false
    });
  };

  private onInTime = async (
    id: number,
    name: string,
    status: number
  ): Promise<void> => {
    await this.props.inTime(id, name, status);
    this.modalClose();
  };

  private onOutTime = async (
    id: number,
    name: string,
    status: number
  ): Promise<void> => {
    await this.props.outTime(id, name, status);
    this.modalClose();
  };

  public render(): JSX.Element {
    return (
      <div className={this.props.classes.wrapper}>
        <AttendanceTemplate
          userName={this.props.userName}
          handleLogout={this.props.handleLogout}
        >
          <AttendanceList
            targetSelect={this.targetSelect}
            attendanceList={this.props.formatedAttendanceList}
          />
        </AttendanceTemplate>
        <AttendanceModal
          isOpen={this.state.isModalOpen}
          onClose={this.modalClose}
          onInTime={this.onInTime}
          onOutTime={this.onOutTime}
          punchInButtonLabel={this.props.punchInButtonLabel}
          punchOutButtonLabel={this.props.punchOutButtonLabel}
          targetAttendance={this.getModalTargetAttendance()}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { authDispatch, attendanceDispatch } = dispatches;
  return {
    handleLogout: authDispatch(dispatch).logout,
    fetchAttendanceList: attendanceDispatch(dispatch).fetchAttendanceList,
    fetchAttendance: attendanceDispatch(dispatch).fetchAttendance,
    inTime: attendanceDispatch(dispatch).inTime,
    outTime: attendanceDispatch(dispatch).outTime
  };
};

const mapStateToProps = (state: any): StateProps => {
  return {
    attendanceList: state.attendance.attendanceList,
    userName: state.user.name || "",
    punchInButtonLabel: state.user.labels
      ? state.user.labels.punch_in
      : "通所する",
    punchOutButtonLabel: state.user.labels
      ? state.user.labels.punch_out
      : "退所する"
  };
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: WithStyles<typeof styles>
): MergeProps => {
  return {
    formatedAttendanceList: formatAttendanceList(stateProps.attendanceList),
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  };
};

export default withStyles(styles)(
  connect<StateProps, DispatchProps, WithStyles<typeof styles>, MergeProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(Attendance)
);
