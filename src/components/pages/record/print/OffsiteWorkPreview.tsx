import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
// store
import dispatches from "@stores/dispatches";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AppState } from "@stores/type";
import { InitialState } from "@stores/domain/offsiteWork/types";
import OffsiteWorkPrint from "@components/organisms/record/print/OffsiteWorkPrint";

interface DispatchProps {
  fetch: (year: string, month: string) => void;
}

interface StateProps {
  offsiteWork: InitialState;
}

type Props = DispatchProps &
  StateProps &
  RouteComponentProps<{ year: string; month: string }>;

interface State {
  targetDate: Date;
}

/**
 * 施設外就労実施報告書プレビュー
 */
class RecordOffsiteWorkPreview extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      targetDate: new Date()
    };
  }

  public componentDidMount(): void {
    const { year, month } = this.props.match.params;
    this.setState({
      targetDate: new Date(Number(year), Number(month) - 1, 1)
    });
    this.props.fetch(year, month);
  }

  public render(): JSX.Element | null {
    return this.state.targetDate ? (
      <OffsiteWorkPrint
        offsiteWork={this.props.offsiteWork}
        targetDate={this.state.targetDate}
      />
    ) : null;
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  offsiteWork: state.offsiteWork
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { offsiteWorkDispatch } = dispatches;
  const offsiteWorkDispatched = offsiteWorkDispatch(dispatch);
  return {
    fetch: (year: string, month: string): void => {
      offsiteWorkDispatched.fetchDownload(year, month);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordOffsiteWorkPreview);
