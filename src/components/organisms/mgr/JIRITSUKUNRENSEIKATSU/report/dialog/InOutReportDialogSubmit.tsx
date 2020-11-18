import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { Button } from "@material-ui/core";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import { FormikProps } from "formik";
import { InitialValues } from "@interfaces/mgr/JIRITSUKUNRENSEIKATSU/report/initial";

const styles = ({ spacing }: Theme) =>
  createStyles({
    button: {
      border: "1px solid #cccccc",
      boxShadow: "none",
      borderRadius: 4,
      textTransform: "none",
      width: 120,
      height: 36,
      marginRight: spacing.unit
    },
    submit: {
      width: 120,
      height: 36,
      marginRight: 32,
      "&:disabled": {
        backgroundColor: "#fafafa"
      }
    }
  });

interface StateProps {
  formikPropsValues: FormikProps<InitialValues>;
  onCancel: () => void;
  disabled: boolean;
}

type Props = StateProps & WithStyles<typeof styles>;

const InOutReportDialogSubmit: React.FunctionComponent<Props> = props => {
  return (
    <div>
      <Button
        className={props.classes.button}
        variant="text"
        color="secondary"
        onClick={props.onCancel}
      >
        キャンセル
      </Button>
      <FormikSubmitButton
        className={props.classes.submit}
        buttonName="保存する"
        formikProps={props.formikPropsValues}
        disabled={props.disabled}
      />
    </div>
  );
};

export default withStyles(styles)(InOutReportDialogSubmit);
