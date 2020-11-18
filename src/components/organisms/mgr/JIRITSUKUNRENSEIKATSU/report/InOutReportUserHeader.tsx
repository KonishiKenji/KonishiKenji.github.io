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
import { generateDropDownOptions } from "@utils/dataNormalizer";
import { AppState } from "@stores/type";
import { UsersInFacilityState } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/userInFacility/types";

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
      marginTop: 0,
      marginLeft: spacing.unit * 2
    },
    buttonWidth: {
      width: 120
    },
    buttonContainer: {
      paddingRight: 0,
      paddingLeft: spacing.unit / 2
    },
    headerInfoContainer: {
      minHeight: 56,
      marginTop: 16,
      marginLeft: 16,
      width: "100%"
    }
  });

interface StateProps {
  userInFacility: UsersInFacilityState;
}

interface DispatchProps {
  fetchFacilityUserList: (date: Date) => Promise<void>;
  fetchOneUser: (id: string) => Promise<void>;
}

interface OwnProps {
  minDate: Date;
  maxDate: Date;
  selectedMonth: Date;
  selectedUserId: string | number;
  onChangeMonth: (date: Date, user: OptionInterface) => void;
  onChangeUser: (user: OptionInterface) => void;
}

interface MergeProps extends OwnProps, DispatchProps {
  facilityListOption: OptionInterface[];
}

type Props = MergeProps & WithStyles<typeof styles>;

/**
 * 利用実績（月ごと）- 月変更 & 利用者変更（通常時）
 */
class InOutReportUserHeader extends React.Component<Props> {
  public async componentDidMount() {
    if (!this.props.selectedUserId) {
      await this.props.fetchFacilityUserList(this.props.selectedMonth);
      if (this.props.facilityListOption && this.props.facilityListOption[0]) {
        this.props
          .fetchOneUser(`${this.props.facilityListOption[0].value}`)
          .then(() => {
            this.props.onChangeUser(this.props.facilityListOption[0]);
          });
      }
    }
  }

  public render() {
    const {
      classes,
      minDate,
      maxDate,
      selectedMonth,
      selectedUserId,
      facilityListOption
    } = this.props;
    return (
      <div className={classes.headerInfoContainer}>
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
      </div>
    );
  }

  /**
   * 月変更
   */
  private onChangeMonth = (date: Date) => {
    this.props.fetchFacilityUserList(date).then(() => {
      const selectedUserOption = this.props.facilityListOption.filter(
        userOption => userOption.value === this.props.selectedUserId
      );
      let selectedUser;
      if (selectedUserOption.length > 0) {
        selectedUser = selectedUserOption[0];
      } else if (this.props.facilityListOption.length > 0) {
        selectedUser = this.props.facilityListOption[0];
      } else {
        selectedUser = { label: "", value: this.props.selectedUserId };
      }
      this.props.onChangeMonth(date, selectedUser);
    });
  };

  /**
   * 利用者の変更
   */
  private onChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedUserOption = this.props.facilityListOption.filter(
      userOption => userOption.value === event.target.value
    );
    if (selectedUserOption.length > 0) {
      this.props.fetchOneUser(`${selectedUserOption[0].value}`);
      this.props.onChangeUser(selectedUserOption[0]);
    }
  };
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    userInFacility: state.JIRITSUKUNRENSEIKATSU.userInFacility
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { JIRITSUKUNRENSEIKATSU } = dispatches;
  const userInFacilityDispatcher = JIRITSUKUNRENSEIKATSU.userInFacilityDispatcher(
    dispatch
  );
  return {
    fetchFacilityUserList: (date: Date) => userInFacilityDispatcher.fetch(date),
    fetchOneUser: JIRITSUKUNRENSEIKATSU.userInFacilityDispatcher(dispatch)
      .fetchOne
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
)(withStyles(styles)(InOutReportUserHeader));
