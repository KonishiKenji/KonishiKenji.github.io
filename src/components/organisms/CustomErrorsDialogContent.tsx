import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";

import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";

const styles = (): StyleRules =>
  createStyles({
    root: {
      margin: 0,
      padding: 0,
      "& > li": {
        listStyle: "none"
      }
    },
    facilityName: {
      margin: "1px 0",
      padding: "12px 32px",
      color: "#37474f",
      backgroundColor: "#cfd8dc"
    },
    errorTitle: {
      margin: "1px 0",
      padding: "6px 32px",
      display: "flex",
      alignItems: "center",
      color: "#f44336",
      backgroundColor: "#ffebee"
    },
    warnTitle: {
      margin: "1px 0",
      padding: "6px 32px",
      display: "flex",
      alignItems: "center",
      color: "#37474f",
      backgroundColor: "#f5f5f5"
    },
    errorIcon: {
      marginRight: 8,
      color: "#ff5656"
    },
    warnIcon: {
      marginRight: 8,
      color: "#ffca28"
    },
    content: {
      margin: "18px 0 26px",
      padding: "0 32px",
      "& > li": {
        marginBottom: 12,
        lineHeight: 1.75,
        listStyle: "none",
        paddingLeft: "1em",
        textIndent: "-1em",
        display: "flex",
        alignItems: "flex-start",
        "&:before": {
          display: "block",
          content: "'・'",
          marginRight: 8
        }
      }
    }
  });

interface OwnProps {
  errors?: string[];
  warnings?: string[];
}
type Props = OwnProps & WithStyles<typeof styles>;

const CustomErrorsDialogContent: React.FunctionComponent<Props> = (props) => {
  const errorsList = props.errors
    ? props.errors.map((v) => {
        return <li>{v}</li>;
      })
    : [];
  const warningsList = props.warnings
    ? props.warnings.map((v) => {
        return <li>{v}</li>;
      })
    : [];

  return (
    <ul className={props.classes.root}>
      <li>
        {errorsList.length > 0 && (
          <>
            <div className={props.classes.errorTitle}>
              <ErrorIcon className={props.classes.errorIcon} />
              {`修正が必要なエラーが ${errorsList.length}件 あります。`}
            </div>
            <ul className={props.classes.content}>{errorsList}</ul>
          </>
        )}
        {warningsList.length > 0 && (
          <>
            <div className={props.classes.warnTitle}>
              <WarningIcon className={props.classes.warnIcon} />
              {`修正が推奨される警告が ${warningsList.length}件 あります。`}
            </div>
            <ul className={props.classes.content}>{warningsList}</ul>
          </>
        )}
      </li>
    </ul>
  );
};

export default withStyles(styles)(CustomErrorsDialogContent);
