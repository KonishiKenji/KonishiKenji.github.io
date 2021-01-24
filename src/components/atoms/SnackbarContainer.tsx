import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { SnackbarParams } from "@stores/ui/type";
import Snackbar from "@components/atoms/Snackbar";

type StateProps = SnackbarParams;

interface DispatchProps {
  closeSnackbar: (params: SnackbarParams) => void;
}

interface OwnProps {
  autoHideDuration?: number;
}

interface MergeProps extends StateProps {
  onClose: () => void;
}

const mapStateToProps = (state: AppState): StateProps => ({
  open: state.ui.snackbar.show,
  message: state.ui.snackbar.message,
  variant: state.ui.snackbar.variant
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { uiDispatch } = dispatches;
  const uiDispatches = uiDispatch(dispatch);
  return {
    closeSnackbar: (params: SnackbarParams) => {
      uiDispatches.snackbar(params);
    }
  };
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
): MergeProps => {
  const onClose = () => {
    dispatchProps.closeSnackbar({
      open: false,
      message: stateProps.message,
      variant: stateProps.variant
    });
  };
  return {
    onClose,
    ...stateProps,
    ...ownProps
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Snackbar);
