import * as React from "react";
import * as H from "history";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { SupportsState } from "@stores/domain/supports/types";
import SectionTitle from "@components/atoms/SectionTitle";
import DropDown from "@components/atoms/DropDown";
import Typography from "@material-ui/core/Typography";
import {
  createStyles,
  withStyles,
  WithStyles,
  Button,
  Paper
} from "@material-ui/core";
import UserSummaryModal from "@components/organisms/mgr/common/record/UserSummaryModal";
import { RECORD_MODAL_TYPE } from "@constants/variables";

const styles = () =>
  createStyles({
    paperContainer: {
      padding: "30px 32px 32px 32px",
      margin: 16
    },
    text: {
      fontSize: 16,
      color: "#37474f",
      margin: "16px 0 28px 0"
    },
    selectRecord: {
      width: 214,
      height: 52,
      marginTop: 0,
      marginRight: 16,
      marginBottom: 0
    },
    printButton: {
      width: 120,
      height: 36,
      marginTop: 12,
      boxShadow: "none"
    }
  });

interface OwnProps {
  history: H.History;
}

interface StateProps {
  supportsMonths: SupportsState["report"]["months"];
  supportsUsers: SupportsState["report"]["users"];
}

interface DispatchProps {
  fetchReportMonths: (target: string) => void;
  fetchReportUsers: (target: string, month: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps & WithStyles<typeof styles>;

const RecordBatchPrinting = (props: Props) => {
  const [isOpenPrintModal, setOpenDetailModal] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState("");
  const selectableRecordOptions = [
    { label: "記録を選択", value: "" },
    { label: "支援記録", value: "support" },
    { label: "作業記録", value: "work" },
    { label: "面談記録", value: "interview" }
  ];
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRecord(event.target.value);
  };
  const openPrintModal = async () => {
    await props.fetchReportMonths(selectedRecord);
    setModalType(RECORD_MODAL_TYPE[selectedRecord]);
    setOpenDetailModal(true);
  };
  const closePrintModal = () => {
    setOpenDetailModal(false);
  };
  const [modalType, setModalType] = React.useState(0);

  return (
    <Paper elevation={0} className={props.classes.paperContainer}>
      <SectionTitle label={"記録の一括印刷"} isTitleNoMargin={true} />
      <Typography
        component="p"
        variant="caption"
        className={props.classes.text}
      >
        任意の利用者の記録を一括で印刷できます。
      </Typography>
      <DropDown
        id="selectRecord"
        label="対象記録"
        isError={false}
        size="textFieldSmall"
        options={selectableRecordOptions}
        value={selectedRecord}
        styles={props.classes.selectRecord}
        onChange={handleChange}
      />
      <Button
        className={props.classes.printButton}
        variant="contained"
        color="secondary"
        onClick={openPrintModal}
        disabled={!selectedRecord}
      >
        印刷
      </Button>
      {isOpenPrintModal && (
        <UserSummaryModal
          isModalOpen={isOpenPrintModal}
          onClose={closePrintModal}
          onMonthChange={props.fetchReportUsers}
          modalType={modalType}
          targetMonths={props.supportsMonths}
          targetUsers={props.supportsUsers}
          history={props.history}
        />
      )}
    </Paper>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  supportsMonths: state.supports.report.months,
  supportsUsers: state.supports.report.users
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { supportsDispatcher } = dispatches;
  const supportsDispatches = supportsDispatcher(dispatch);
  return {
    fetchReportMonths: async (target: string) => {
      await supportsDispatches.fetchReportMonths(target);
    },
    fetchReportUsers: async (target: string, month: string) => {
      await supportsDispatches.fetchReportUsers(target, month);
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RecordBatchPrinting)
);
