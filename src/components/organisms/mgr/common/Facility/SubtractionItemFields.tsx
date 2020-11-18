import * as React from "react";

import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import FormikCheckbox from "@components/molecules/FormikCheckbox";
import FormikSwitch from "@components/molecules/FormikSwitch";
import FormikRadioButtons from "@components/molecules/FormikRadioButtons";
import LackFields from "@components/organisms/mgr/common/Facility/items/LackFields";

import { FormikProps } from "formik";

import { SUBTRACTION_OF_LARGE_SCALE_HOUSING } from "@constants/variables";

interface Props {
  formikProps: FormikProps<any>;
}

const SubtractionItemFields: React.FunctionComponent<Props> = ({
  formikProps
}) => {
  return (
    <FormPaper>
      <div style={{ marginBottom: 32 }}>
        <SectionTitle label="減算対象項目" />
      </div>
      <FormikCheckbox
        name="subtractionItem.establishedByLocalGovernmentsFlag"
        label="地方公共団体が設置"
      />
      <LackFields formikProps={formikProps} name="subtractionItem" />
      <FormikSwitch
        name="subtractionItem.subtractionOfLargeScaleHousingFlag"
        label="大規模住居等減算"
        style={{ marginBottom: 0 }}
      >
        <FormikRadioButtons
          name="subtractionItem.subtractionOfLargeScaleHousing"
          label=""
          options={SUBTRACTION_OF_LARGE_SCALE_HOUSING}
          style={{ marginTop: 0, marginLeft: 0 }}
        />
      </FormikSwitch>
    </FormPaper>
  );
};

export default SubtractionItemFields;
