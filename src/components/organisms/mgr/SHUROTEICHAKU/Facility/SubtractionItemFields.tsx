import * as React from "react";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import { RATE_GET_JOB_ITEMS } from "@constants/mgr/SHUROTEICHAKU/variables.ts";
import LackFields from "@components/organisms/mgr/common/Facility/items/LackFields";
import { WithStyles, createStyles, withStyles } from "@material-ui/core";

import { FormikProps } from "formik";

const styles = () =>
  createStyles({
    comment: {
      fontSize: 12
    },
    helpIcon: {
      fontSize: 14.4,
      color: "#607d8b",
      verticalAlign: "sub"
    }
  });

interface OwnProps {
  formikProps: FormikProps<any>;
}

type Props = OwnProps & WithStyles<typeof styles>;

const SubtractionItemFields: React.FunctionComponent<Props> = (
  props: Props
) => (
  <FormPaper>
    <div style={{ marginBottom: 32 }}>
      <SectionTitle label="減算対象" />
    </div>
    <FormikRadioButtons
      name="subtractionItem.rateGetJob"
      label="就労定着率"
      options={RATE_GET_JOB_ITEMS}
    />
    <LackFields formikProps={props.formikProps} name="subtractionItem" />
  </FormPaper>
);

export default withStyles(styles)(SubtractionItemFields);
