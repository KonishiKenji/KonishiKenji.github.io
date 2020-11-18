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

class VisitFields extends React.Component<Props, State> {
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
          <SectionTitle label="訪問（生活訓練サービス費Ⅱ）開始日" />
        </div>

        {this.state.isFetchDone && (
          <FormGroup>
            <FieldArray name="initialData.users">
              {() =>
                this.props.stateInitialDataValues.users.map((user, index) => {
                  return (
                    <div className={this.props.classes.fields} key={index}>
                      <div className={this.props.classes.nameField}>
                        {user.name_sei} {user.name_mei}
                      </div>
                      <FormikSelectDateNotSelectedDefault
                        name={`initialData.users[${index}].users_in_facility_jiritsukunren_seikatsu.visit_start_date`}
                        label=""
                        setFormikFieldValue={this.props.setFormikFieldValue}
                      />
                    </div>
                  );
                })
              }
            </FieldArray>
          </FormGroup>
        )}
      </FormPaper>
    );
  }
}

export default withStyles(styles)(VisitFields);
