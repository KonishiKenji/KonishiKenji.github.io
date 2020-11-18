import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikSelectYearMonth from "@components/molecules/FormikSelectYearMonth";

const styles = () =>
  createStyles({
    groupDate: {
      margin: "6px 0 0 16px"
    }
  });

type Props = WithStyles<typeof styles>;

class FirstInvoiceDataFields extends React.Component<Props> {
  public render() {
    return (
      <FormPaper>
        <div style={{ marginBottom: 18 }}>
          <SectionTitle label="初回請求月の指定" />
        </div>
        <p>初回の請求作業の対象となる月を入力して下さい。</p>
        <div className={this.props.classes.groupDate}>
          <FormikSelectYearMonth
            name="initialData.facility.first_time_bill_date"
            label="初回請求年月"
            required={true}
            style={{ marginBottom: 12 }}
          />
        </div>
      </FormPaper>
    );
  }
}

export default withStyles(styles)(FirstInvoiceDataFields);
