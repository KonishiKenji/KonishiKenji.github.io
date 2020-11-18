import * as React from "react";
import { ErrorsState } from "@stores/domain/errors/types";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";

const styles = ({ spacing }: Theme) =>
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
  errorsKey: "invoice" | "users" | "inout" | "offsiteWork";
  errors: ErrorsState;
  isMultipleFacility: boolean;
}
type Props = OwnProps & WithStyles<typeof styles>;

const ErrorsDialogContent: React.FunctionComponent<Props> = props => {
  const errorsData = props.errors[props.errorsKey].data;
  if (!errorsData.length) {
    return <div />;
  }

  const ErrorsData = errorsData.map(data => {
    const errorList: JSX.Element[] = [];
    const warnList: JSX.Element[] = [];
    // 重要度順で並べる
    data.errors.forEach(error => {
      if (error.type === "error") {
        errorList.push(<li>{error.content}</li>);
      } else if (error.type === "warn") {
        warnList.push(<li>{error.content}</li>);
      }
    });
    return (
      <li key={data.facility.name}>
        {props.isMultipleFacility && (
          <div className={props.classes.facilityName}>{data.facility.name}</div>
        )}
        {errorList.length > 0 && (
          <>
            <div className={props.classes.errorTitle}>
              <ErrorIcon className={props.classes.errorIcon} />
              修正が必要なエラーが {errorList.length}件 あります。
            </div>
            <ul className={props.classes.content}>{errorList}</ul>
          </>
        )}
        {warnList.length > 0 && (
          <>
            <div className={props.classes.warnTitle}>
              <WarningIcon className={props.classes.warnIcon} />
              修正が推奨される警告が {warnList.length}件 あります。
            </div>
            <ul className={props.classes.content}>{warnList}</ul>
          </>
        )}
      </li>
    );
  });
  return <ul className={props.classes.root}>{ErrorsData}</ul>;
};

export default withStyles(styles)(ErrorsDialogContent);
