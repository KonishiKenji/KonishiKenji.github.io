import * as React from "react";

import { createStyles, WithStyles } from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

import { ErrorsState } from "@stores/domain/errors/types";

const styles = ({ spacing }: Theme) =>
  createStyles({
    subHeader: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      marginBottom: spacing.unit,
      paddingTop: spacing.unit,
      paddingRight: 0,
      paddingLeft: 0,
      borderBottom: "1px dashed",
      background: "#fff",
      lineHeight: "40px",
      position: "sticky",
      top: -20,
      zIndex: 1
    },
    heading: {
      fontWeight: "bold"
    },
    list: {
      paddingTop: spacing.unit * 2
    },
    listItem: {
      display: "list-item",
      width: "auto",
      padding: `0 0 ${spacing.unit}px 0`,
      margin: spacing.unit * 2,
      listStyle: "disc"
    }
  });

interface Props extends WithStyles<typeof styles> {
  describeId: string;
  problems: ErrorsState["invoice"]["data"];
}

class InvoiceErrorDialogContent extends React.Component<Props> {
  public render() {
    const { classes } = this.props;
    const isMultipleFacility = this.props.problems.length > 1;

    return (
      <DialogContentText id={this.props.describeId}>
        請求業務を正確に行うためには、以下の修正が必要です。
        {this.props.problems.map(({ facility, errors }, index) => (
          <React.Fragment key={index}>
            <div className={classes.subHeader}>
              <span className={classes.heading}>
                {isMultipleFacility ? facility.name : "詳細内容"}
              </span>
              <span>{errors.length}件</span>
            </div>
            <List key={facility.type_service} classes={{ root: classes.list }}>
              {errors.map((error, idx) => (
                <ListItem key={idx} classes={{ root: classes.listItem }}>
                  {error.content}
                </ListItem>
              ))}
            </List>
          </React.Fragment>
        ))}
      </DialogContentText>
    );
  }
}

export default withStyles(styles)(InvoiceErrorDialogContent);
