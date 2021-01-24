import * as React from "react";
import { FieldArray } from "formik";
import { WithStyles, withStyles, createStyles } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormPaper from "@components/atoms/FormPaper";
import SectionTitle from "@components/atoms/SectionTitle";
import { InitialState } from "@stores/domain/mgr/JIRITSUKUNRENSEIKATSU/initial/types";
import FormikSelectDateNotSelectedDefault from "@components/molecules/FormikSelectDateNotSelectedDefault";

const styles = () =>
  createStyles({
    fields: {
      display: "flex",
      alignItems: "center"
    },
    nameField: {
      width: 87,
      height: 24,
      marginRight: 87,
      marginBottom: 20
    }
  });

interface OwnProps {
  isFetchDone: boolean;
  stateInitialDataValues: InitialState;
  setFormikFieldValue: (
    fieldName: string,
    value: number | string | boolean
  ) => void;
}

interface State {
  shouldFirstSetup: boolean;
  isFetchDone: boolean;
}

type Props = OwnProps & WithStyles<typeof styles>;

class SocialLifeSupportFields extends React.Component<Props, State> {
  public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (!prevState.shouldFirstSetup || !nextProps.isFetchDone) {
      return null;
    }

    return {
      shouldFirstSetup: false,
      isFetchDone: nextProps.isFetchDone
    };
  }

  public state = {
    shouldFirstSetup: true,
    isFetchDone: false
  };

  public render() {
    return (
      <FormPaper>
        <div style={{ marginBottom: 18 }}>
          <SectionTitle label="社会生活支援開始日" />
        </div>

        {this.existsUser(this.props.stateInitialDataValues) &&
        this.state.isFetchDone ? (
          <FormGroup>
            <FieldArray name="initialData.users">
              {() =>
                this.props.stateInitialDataValues.users.map((user, index) => {
                  const uifJIRITSUKUNRENSEIKATSU = user.users_in_facility_jiritsukunren_seikatsu
                    ? user.users_in_facility_jiritsukunren_seikatsu
                    : {};
                  if (uifJIRITSUKUNRENSEIKATSU.social_life_support_flg === 1) {
                    return (
                      <div className={this.props.classes.fields} key={index}>
                        <div className={this.props.classes.nameField}>
                          {user.name_sei} {user.name_mei}
                        </div>
                        <FormikSelectDateNotSelectedDefault
                          name={`initialData.users[${index}].users_in_facility_jiritsukunren_seikatsu.social_life_support_start_date`}
                          label=""
                          setFormikFieldValue={this.props.setFormikFieldValue}
                        />
                      </div>
                    );
                  }
                  return;
                })
              }
            </FieldArray>
          </FormGroup>
        ) : (
          <p>
            社会生活支援の対象となる利用者が登録されている場合に入力できます。
          </p>
        )}
      </FormPaper>
    );
  }
  private existsUser = (initialState: InitialState): boolean => {
    const SocialLifeSupportUserCount = initialState.users.reduce(
      (prev, next) => {
        const uifJIRITSUKUNRENSEIKATSU = next.users_in_facility_jiritsukunren_seikatsu
          ? next.users_in_facility_jiritsukunren_seikatsu
          : {};
        return uifJIRITSUKUNRENSEIKATSU.social_life_support_flg === 1
          ? prev + 1
          : prev;
      },
      0
    );
    return initialState.users.length > 0 && SocialLifeSupportUserCount > 0;
  };
}

export default withStyles(styles)(SocialLifeSupportFields);
