import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "@stores/type";
import { AlertDialogState } from "@stores/ui/alertDialog/types";
import * as alertDialogActions from "@stores/ui/alertDialog/actions";
import Button from "@material-ui/core/Button";
import MessageDialog from "@components/molecules/dialog/MessageDialog";

interface StateProps {
  alertDialog: AlertDialogState;
}
interface DispatchProps {
  closeAlertDialog: () => void;
}
type Props = StateProps & DispatchProps;

/**
 *
 */
const AlertDialog: React.FunctionComponent<Props> = ({
  alertDialog,
  closeAlertDialog
}) => (
  <MessageDialog
    isOpen={alertDialog.show}
    title={alertDialog.title}
    message={alertDialog.message}
    closeButton={
      <Button onClick={closeAlertDialog} color="secondary">
        閉じる
      </Button>
    }
  />
);

const mapStateToProps = (state: AppState): StateProps => ({
  alertDialog: state.ui.alertDialog
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  closeAlertDialog: () => dispatch(alertDialogActions.hideAlertDialog())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertDialog);
