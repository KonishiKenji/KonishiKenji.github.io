import * as React from "react";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import LackFields from "@components/organisms/mgr/common/Facility/items/LackFields";
import { WithStyles, withStyles, createStyles } from "@material-ui/core";

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
    <FormikCheckbox
      name="subtractionItem.establishedByLocalGovernmentsFlag"
      label="地方公共団体が設置"
    />
    <FormikCheckbox
      name="subtractionItem.openedOrShortTimeFlag"
      label="短時間(利用時間５時間未満の利用者が全利用者の50％以上)"
    />
    <LackFields formikProps={props.formikProps} name="subtractionItem" />
    <FormikCheckbox
      name="subtractionItem.doctorInstallationFlag"
      label="医師未配置"
      style={{ marginBottom: 0 }}
    />
  </FormPaper>
);

export default withStyles(styles)(SubtractionItemFields);
