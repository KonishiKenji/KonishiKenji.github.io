import * as React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { AssociatedFacilityListState } from "@stores/domain/facilities/types";
import { connect } from "react-redux";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    listItemRoot: {
      width: "auto",
      boxSizing: "content-box"
    },
    listItem: {
      height: 32,
      paddingTop: 12,
      paddingBottom: 12,
      "&:hover": {
        backgroundColor: "#eceff1"
      }
    },
    listItemText: {
      fontSize: 16,
      margin: "0px 32px"
    }
  });

interface OwnProps {
  facility: AssociatedFacilityListState["data"][0];
  handleClick: (facility: { id: number }) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const AssociatedFacilityList: React.FunctionComponent<Props> = (
  props: Props
) => {
  const { classes, facility, handleClick } = props;
  const changeFacility = () => handleClick({ id: facility.id });

  return (
    <ListItem
      button={true}
      component="li"
      classes={{ root: classes.listItemRoot }}
      className={classes.listItem}
      onClick={changeFacility}
      disabled={facility.selected}
    >
      <ListItemText className={classes.listItemText} primary={facility.name} />
    </ListItem>
  );
};

export default connect()(withStyles(styles)(AssociatedFacilityList));
