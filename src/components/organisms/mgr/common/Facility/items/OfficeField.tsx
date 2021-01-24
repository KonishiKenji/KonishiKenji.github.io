import * as React from "react";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormikTextField from "@components/molecules/FormikTextField";
import HelpToolTip from "@components/atoms/HelpToolTip";
import HelpTipMessages from "@components/molecules/HelpTipMessages";

const styles = () =>
  createStyles({
    root: {
      position: "relative"
    },
    tooltip: {
      position: "absolute",
      left: 70,
      top: -5
    }
  });

type Props = WithStyles<typeof styles>;

/**
 * 事業者番号 & 事業所名
 * - 事業者番号は常に非活性
 * - basic.officeNumberとbasic.officeNameが定義されたformik配下の利用が前提
 */
const OfficeField: React.SFC<Props> = props => (
  <FormGroup row={true} className={props.classes.root}>
    <FormikTextField
      name="basic.officeNumber"
      label="事業所番号"
      placeholder="1234567890"
      maxLength={10}
      disabled={true}
    />
    <span className={props.classes.tooltip}>
      <HelpToolTip title={<HelpTipMessages name="officeNumber" />} />
    </span>
    <FormikTextField
      name="basic.officeName"
      label="事業所名"
      placeholder="ノウビー"
      maxLength={255}
      size="halfSuperLong"
      required={true}
    />
  </FormGroup>
);

export default withStyles(styles)(OfficeField);
