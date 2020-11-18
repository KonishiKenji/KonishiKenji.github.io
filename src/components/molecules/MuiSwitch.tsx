import * as React from "react";
import Switch, { SwitchProps } from "@material-ui/core/Switch";
import FieldWrapper from "@components/atoms/FieldWrapper";
import FormLabel from "@components/molecules/FormLabel";
interface OwnProps {
  label: string;
  tooltip?: React.ReactElement<any>;
}

export type MuiSwitchProps = OwnProps & SwitchProps;

const MuiSwitch: React.FunctionComponent<MuiSwitchProps> = ({
  label,
  tooltip,
  children,
  style,
  ...props
}) => {
  return (
    <FieldWrapper type="switch" size="auto" style={style}>
      <FormLabel control={<Switch {...props} />} label={label}>
        {tooltip}
      </FormLabel>
      {props.checked && <div style={{ marginLeft: 48 }}>{children}</div>}
    </FieldWrapper>
  );
};

MuiSwitch.defaultProps = {
  color: "secondary"
};

export default MuiSwitch;
