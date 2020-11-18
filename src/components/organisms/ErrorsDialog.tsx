import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "@stores/type";
import { ErrorsState } from "@stores/domain/errors/types";
import { ErrorsDialogState } from "@stores/ui/errorsDialog/types";
import * as errorsDialogActions from "@stores/ui/errorsDialog/actions";
import {
  createStyles,
  WithStyles,
  withStyles,
  StyleRulesCallback
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import ErrorsDialogContent from "@components/organisms/ErrorsDialogContent";
import CustomErrorsDialogContent from "@components/organisms/CustomErrorsDialogContent";

const styles: StyleRulesCallback = () =>
  createStyles({
    paper: {
      width: 800,
      maxWidth: 800
    },
    title: {
      padding: "14px 32px"
    },
    content: {
      borderTop: "1px solid #cfd8dc",
      borderBottom: "1px solid #cfd8dc",
      padding: 0
    },
    footer: {
      margin: "8px 32px"
    },
    cancelButton: {
      width: 120
    },
    actionButton: {
      width: 245,
      boxShadow: "none"
    }
  });

interface OwnProps {
  errorsKey?: "invoice" | "users" | "inout" | "offsiteWork";
  actionButton?: {
    text: string;
    clickHandler: () => void;
  };
  customErrors?: string[]; // 独自でエラーを表示させたい場合
  customWarnings?: string[]; // 独自でワーニングを表示させたい場合
}
interface StateProps {
  errors: ErrorsState;
  errorsDialog: ErrorsDialogState;
  isMultipleFacility: boolean;
}
interface DispatchProps {
  closeErrorsDialog: () => void;
}
type Props = OwnProps & DispatchProps & StateProps & WithStyles<typeof styles>;

/**
 * errorsDialogのkeyに対応するerrorsを表示するダイアログ
 */
const ErrorsDialog: React.FC<Props> = (props) => {
  const { classes } = props;
  return (
    <Dialog open={props.errorsDialog.show} classes={{ paper: classes.paper }}>
      <DialogTitle className={classes.title}>ご確認ください</DialogTitle>
      <DialogContent className={classes.content}>
        {props.errorsKey ? (
          <ErrorsDialogContent
            errorsKey={props.errorsKey}
            errors={props.errors}
            isMultipleFacility={props.isMultipleFacility}
          />
        ) : (
          <CustomErrorsDialogContent
            errors={props.customErrors}
            warnings={props.customWarnings}
          />
        )}
      </DialogContent>
      <DialogActions className={classes.footer}>
        <Button
          className={classes.cancelButton}
          color="secondary"
          variant="outlined"
          onClick={props.closeErrorsDialog}
        >
          閉じる
        </Button>
        {props.actionButton && (
          <Button
            className={classes.actionButton}
            color="secondary"
            variant="contained"
            onClick={props.actionButton.clickHandler}
          >
            {props.actionButton.text}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  errors: state.errors,
  errorsDialog: state.ui.errorsDialog,
  isMultipleFacility: state.user.isMultipleFacility
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  closeErrorsDialog: () => dispatch(errorsDialogActions.hideErrorsDialog())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ErrorsDialog));
