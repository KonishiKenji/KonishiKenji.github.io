import * as React from "react";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import FieldWrapper from "@components/atoms/FieldWrapper";
import FormLabel from "@components/molecules/FormLabel";

interface OwnProps {
  label: string | JSX.Element;
  tooltip?: React.ReactElement<any>;
}

export type MuiCheckboxProps = OwnProps & CheckboxProps;

const MuiCheckbox: React.FunctionComponent<MuiCheckboxProps> = ({
  label,
  tooltip,
  style,
  ...props
}) => (
  <FieldWrapper type="checkbox" size="auto" style={style}>
    <FormLabel control={<Checkbox {...props} />} label={label}>
      {tooltip}
    </FormLabel>
  </FieldWrapper>
);

MuiCheckbox.defaultProps = {
  color: "secondary"
};

export default MuiCheckbox;
