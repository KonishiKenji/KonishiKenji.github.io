import * as React from "react";
import * as ClassNames from "classnames";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { withStyles } from "@material-ui/core/styles";
import { createStyles, WithStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import DropDown, { OptionInterface } from "@components/atoms/DropDown";
import DateSelectButtonsMonthly from "@components/molecules/DateSelectButtonsMonthly";
import ContentHeaderSubmit from "@components/molecules/ContentHeaderSubmit";
import { generateDropDownOptions } from "@utils/dataNormalizer";
import { AppState } from "@stores/type";
import { UsersInFacilityState } from "@stores/domain/mgr/GroupHome/userInFacility/types";

const styles = ({ spacing }: Theme) =>
  createStyles({
    floatLeft: {
      float: "left"
    },
    floatRight: {
      float: "right"
    },
    dateButtonsContainer: {
      paddingTop: spacing.unit
    },
    usersDropDown: {
      marginTop: "0px !important",
      marginLeft: spacing.unit * 2
    },
    buttonWidth: {
      width: 120
    },
    buttonContainer: {
      paddingRight: 0,
      paddingLeft: spacing.unit / 2
    }
  });

interface StateProps {
  userInFacility: UsersInFacilityState;
}

interface DispatchProps {
  fetchFacilityUserList: (date: Date) => void;
}

interface OwnProps {
  minDate: Date;
  maxDate: Date;
  selectedMonth: Date;
  isSubmitDisabled: boolean;
  selectedUserId: string | number;
  onChangeMonth: (date: Date) => void;
  onChangeUser: (user: OptionInterface) => void;
  onChangeEditMode: () => void;
}

interface MergeProps extends OwnProps, DispatchProps {
  facilityListOption: OptionInterface[];
}

type Props = MergeProps & WithStyles<typeof styles>;

/**
 * 利用実績（月ごと）- 月変更 & 利用者変更（通常時）
 */
class UsagePerformanceMonthlyHeader extends React.Component<Props> {
  public async componentDidMount() {
    if (!this.props.selectedUserId) {
      await this.props.fetchFacilityUserList(this.props.selectedMonth);
      if (this.props.facilityListOption && this.props.facilityListOption[0]) {
        this.props.onChangeUser(this.props.facilityListOption[0]);
      }
    }
  }

  public componentDidUpdate() {
    if (
      this.props.facilityListOption &&
      this.props.facilityListOption[0] &&
      this.props.selectedUserId &&
      !this.props.facilityListOption.some(
        target => target.value === this.props.selectedUserId
      )
    ) {
      this.props.onChangeUser(this.props.facilityListOption[0]);
    }
  }

  public render() {
    const {
      classes,
      minDate,
      maxDate,
      selectedMonth,
      selectedUserId,
      facilityListOption,
      onChangeEditMode
    } = this.props;
    return (
      <React.Fragment>
        <div
          className={ClassNames(
            classes.floatLeft,
            classes.dateButtonsContainer
          )}
        >
          <DateSelectButtonsMonthly
            selectedMonth={selectedMonth}
            min={minDate}
            max={maxDate}
            onClickSubmit={this.onChangeMonth}
          />
        </div>
        <div className={classes.floatLeft}>
          <DropDown
            id="users-in-facility-list"
            label="利用者"
            isError={false}
            options={facilityListOption}
            value={`${selectedUserId}`}
            styles={classes.usersDropDown}
            onChange={this.onChangeUser}
          />
        </div>
        <div className={classes.floatRight}>
          <ContentHeaderSubmit
            buttonName="編集"
            handleSubmit={onChangeEditMode}
            submitStyle={classes.buttonWidth}
            toolbarStyle={classes.buttonContainer}
            isSubmitDisabled={this.props.isSubmitDisabled}
          />
        </div>
      </React.Fragment>
    );
  }

  /**
   * 月変更
   */
  private onChangeMonth = (date: Date) => {
    this.props.fetchFacilityUserList(date);
    this.props.onChangeMonth(date);
  };

  /**
   * 利用者の変更
   */
  private onChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = this.props.facilityListOption.filter(
      x => x.value === event.target.value
    );
    if (facility.length > 0) {
      this.props.onChangeUser(facility[0]);
    }
  };
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    userInFacility: state.GroupHome.userInFacility
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { GroupHome } = dispatches;
  const userInFacilityDispatcher = GroupHome.userInFacilityDispatcher(dispatch);
  return {
    fetchFacilityUserList: (date: Date) => userInFacilityDispatcher.fetch(date)
  };
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
): MergeProps => {
  // 利用者一覧をドロップダウンで使用する形式に整形する
  const facilityListOption = stateProps.userInFacility.users.map(user => {
    return generateDropDownOptions({
      label: user.displayName,
      value: user.uif_id
    });
  });
  return {
    facilityListOption,
    ...ownProps,
    ...dispatchProps
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withStyles(styles)(UsagePerformanceMonthlyHeader));
