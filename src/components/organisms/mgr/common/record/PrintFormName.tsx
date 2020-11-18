import * as React from "react";
import {
  withStyles,
  WithStyles,
  createStyles,
  StyleRules
} from "@material-ui/core/styles";
import MuiRadioButtons from "@components/molecules/MuiRadioButtons";

const styles = (): StyleRules =>
  createStyles({
    wrapper: {
      "& > div > div": {
        marginLeft: 0,
        marginBottom: 0
      }
    }
  });

interface OwnProps {
  value: string;
  changeFormName: (e: React.ChangeEvent<any>) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const PrintFormName: React.FC<Props> = (props) => {
  return (
    <MuiRadioButtons
      label=""
      options={[
        { label: "支援記録", value: "support_record" },
        { label: "サービス提供記録", value: "service_record" }
      ]}
      value={props.value}
      onChange={props.changeFormName}
    />
  );
};

export default withStyles(styles)(PrintFormName);
