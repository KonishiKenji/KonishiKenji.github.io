import * as React from "react";

import { GetFacilityUsersResponse } from "@api/requests/facility/getFacilityUsers";
import { ErrorsState } from "@stores/domain/errors/types";
import { BASE_PUBLIC_URL } from "@config";
import SectionTitle from "@components/atoms/SectionTitle";
import ErrorIcon from "@material-ui/icons/Error";
import {
  createStyles,
  withStyles,
  WithStyles,
  Button,
  Paper
} from "@material-ui/core";

import ClassNames from "classnames";

const styles = () =>
  createStyles({
    buttons: {
      width: 125,
      height: 36
    },
    paperContainer: {
      padding: "30px 32px 32px 32px",
      margin: 16
    },
    ul: {
      listStyle: "none",
      padding: 0,
      marginTop: 8,
      marginBottom: 0
    },
    li: {
      display: "flex",
      "&:nth-child(2n)": {
        backgroundColor: "#f5f5f5"
      },
      "&:last-child": {
        borderBottom: "1px solid rgba(0, 0, 0, 0.54)"
      }
    },
    userName: {
      margin: "21px auto 0 16px",
      color: "rgba(0, 0, 0, 0.87)"
    },
    recordButton: {
      fontSize: 14,
      width: 120,
      height: 36,
      color: "#0277bd",
      backgroundColor: "#ffffff",
      border: "1px solid rgba(0, 0, 0, 0.12)",
      margin: "14px 0 14px 8px"
    },
    buttonMargin: {
      marginRight: 16
    },
    alertPeriod: {
      color: "#f44336",
      fontSize: 12,
      position: "relative",
      paddingLeft: 20
    },
    alertWrapper: {
      position: "absolute",
      top: 0,
      right: 0,
      zIndex: 5
    },
    alertIconUpper: {
      width: 15,
      height: 15,
      color: "#ff5656",
      position: "absolute",
      top: 7,
      left: -10
    }
  });

interface OwnProps {
  users: GetFacilityUsersResponse["data"];
  errorState: ErrorsState["records"]["data"];
}

type Props = OwnProps & WithStyles<typeof styles>;

const RecordEachUser = (props: Props) => {
  return (
    <Paper elevation={0} className={props.classes.paperContainer}>
      <SectionTitle label={"利用者ごとの記録"} isTitleNoMargin={true} />
      <ul className={props.classes.ul}>
        {props.users.map(user => (
          <li key={user.uif_id} className={props.classes.li}>
            <span className={props.classes.userName}>{user.displayName}</span>
            <div className={props.classes.alertPeriod}>
              {props.errorState &&
                props.errorState.length > 0 &&
                props.errorState[0].errors.map((error, index) => {
                  if (error.relation.value === user.uif_id) {
                    return (
                      <span className={props.classes.alertWrapper} key={index}>
                        <ErrorIcon className={props.classes.alertIconUpper} />
                      </span>
                    );
                  }
                  return null;
                })}
              <Button
                className={props.classes.recordButton}
                href={`${BASE_PUBLIC_URL}/#/record/${user.uif_id}/support_plan`}
              >
                個別支援計画
              </Button>
            </div>
            <Button
              className={props.classes.recordButton}
              href={`${BASE_PUBLIC_URL}/#/record/${user.uif_id}/support`}
            >
              支援記録
            </Button>
            <Button
              className={props.classes.recordButton}
              href={`${BASE_PUBLIC_URL}/#/record/${user.uif_id}/work`}
            >
              作業記録
            </Button>
            <Button
              className={ClassNames(
                props.classes.recordButton,
                props.classes.buttonMargin
              )}
              href={`${BASE_PUBLIC_URL}/#/record/${user.uif_id}/interview`}
            >
              面談記録
            </Button>
          </li>
        ))}
      </ul>
    </Paper>
  );
};

export default withStyles(styles)(RecordEachUser);
