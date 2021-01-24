import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { Button } from "@material-ui/core";
import FormikSubmitButton from "@components/molecules/FormikSubmitButton";
import { FormikProps } from "formik";
import { InitialValues } from "@interfaces/mgr/IAB/report/initial";

const styles = ({ spacing }: Theme) =>
  createStyles({
    button: {
      border: "1px solid #cccccc",
      boxShadow: "none",
      borderRadius: 4,
      textTransform: "none",
      width: 110,
      marginBottom: 4,
      marginTop: 8,
      marginRight: spacing.unit
    },
    submit: {
      width: 110,
      marginBottom: 4,
      marginTop: 8,
      marginRight: 32
    }
  });

interface StateProps {
  formikPropsValues: FormikProps<InitialValues>;
  onCancel: () => void;
  disabled: boolean;
}

type Props = StateProps & WithStyles<typeof styles>;

class InOutReportDialogSubmit extends React.Component<Props> {
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          className={classes.button}
          variant="text"
          color="secondary"
          onClick={this.props.onCancel}
        >
          キャンセル
        </Button>
        <FormikSubmitButton
          className={classes.submit}
          buttonName="保存する"
          formikProps={this.props.formikPropsValues}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}

export default withStyles(styles)(InOutReportDialogSubmit);
