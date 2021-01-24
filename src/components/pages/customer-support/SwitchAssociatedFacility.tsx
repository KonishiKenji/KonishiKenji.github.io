import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import AdminTemplate from "@components/templates/AdminTemplate";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { HEADER_HEIGHT } from "@constants/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";
import { AssociatedFacilityListState } from "@stores/domain/facilities/types";
import { UserState } from "@stores/domain/user/type";
import AssociatedFacilityList from "@components/organisms/customer-support/AssociatedFacilityList";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      height: `calc(100vh - ${HEADER_HEIGHT}px)`,
      backgroundColor: "#f5f5f5",
      overflowY: "scroll"
    },
    wrapper: {
      height: `calc(90vh)`,
      margin: "21px 80px 10px 37px",
      overflow: "scroll"
    },
    list: {
      backgroundColor: "#fff",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
      border: "solid 1px #dcdcdc",
      paddingTop: 0,
      paddingBottom: 0
    },
    listItemRoot: {
      width: "auto",
      boxSizing: "content-box"
    },
    divider: {
      margin: "0px 32px"
    }
  });

/**
 * 施設切替
 */

interface DispatchProps {
  handleLogout: () => void;
  fetchInitialData: () => void;
  updateAssociatedFacility: (value: {
    facility_id: UserState["facility_id"];
  }) => void;
}

interface StateProps {
  facilities: AssociatedFacilityListState["data"];
}

type Props = DispatchProps &
  StateProps &
  RouteComponentProps &
  WithStyles<typeof styles>;

class SwitchAssociatedFacilityPage extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchInitialData();
  }

  public handleClick = (facility: { id: number }) => {
    this.props.updateAssociatedFacility({ facility_id: facility.id });
  };

  public render() {
    const { classes, facilities } = this.props;

    return (
      <AdminTemplate pageName="施設切替">
        <div className={classes.wrapper}>
          <List className={classes.list}>
            {facilities.map((facility, index) => (
              <React.Fragment key={index}>
                {index !== 0 ? <Divider className={classes.divider} /> : null}
                <AssociatedFacilityList
                  facility={facility}
                  handleClick={this.handleClick}
                />
              </React.Fragment>
            ))}
          </List>
        </div>
      </AdminTemplate>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    facilities: state.facilities.data
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { authDispatch, FacilityDispatcher, userDispatch } = dispatches;

  return {
    handleLogout: authDispatch(dispatch).logout,
    fetchInitialData: FacilityDispatcher(dispatch).AssociatedFacilityList,
    updateAssociatedFacility: userDispatch(dispatch).updateAssociatedFacility
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SwitchAssociatedFacilityPage));
