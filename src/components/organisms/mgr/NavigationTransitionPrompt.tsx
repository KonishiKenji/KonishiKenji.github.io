import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter, Prompt } from "react-router-dom";
import dispatches from "@stores/dispatches";
import NavigationTransitionDialog from "@components/molecules/dialog/NavigationTransitionDialog";

interface StateProps {
  needsStopHistory: boolean;
}

interface DispatchProps {
  allowChangesToHistory: () => void;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

interface Location {
  pathname: string;
}

interface State {
  openModal: boolean;
  isTransferring: boolean;
  nextLocation: string;
}

class NavigationTransitionPrompt extends React.Component<Props, State> {
  private trigger: symbol;

  constructor(props: Props) {
    super(props);
    this.state = {
      openModal: false,
      isTransferring: !props.needsStopHistory,
      nextLocation: ""
    };
    this.trigger = Symbol.for(`PreventNavigationTransitionPrompt${Date.now()}`);
  }

  public componentDidMount() {
    window[this.trigger] = this.show;
  }

  public componentWillUnmount() {
    delete window[this.trigger];
  }

  public componentDidUpdate() {
    if (this.state.isTransferring && this.state.nextLocation !== "") {
      const currentLocation = this.props.history.location.pathname;
      if (this.state.nextLocation !== currentLocation) {
        // リロードしてからブラウザバックをされると遷移はしないがurlが書き換わるので一旦現在ページに書き換え
        // 上記の状態は複数回ブラウザバックも可能なので、これだと正確な履歴に戻すことができない
        this.props.history.replace(currentLocation);
      }
      this.setState({ isTransferring: false }); // 無限にhistory.pushが実行されるのを防ぐ
      this.props.history.push(this.state.nextLocation);
    }
  }

  public render() {
    return (
      <React.Fragment>
        <Prompt
          when={this.props.needsStopHistory}
          message={this.handleTransition}
        />
        <NavigationTransitionDialog
          isOpen={this.state.openModal}
          onConfirm={this.handleConfirm}
          onCancel={this.handleCancel}
        />
      </React.Fragment>
    );
  }

  private show = (
    allowTransitionCallback: (isTransferring: boolean) => void
  ) => {
    this.setState({ openModal: true, isTransferring: false }, () =>
      allowTransitionCallback(false)
    );
  };

  private handleCancel = () => {
    this.setState({ openModal: false });
  };

  private handleConfirm = () => {
    this.props.allowChangesToHistory();
    this.setState({ openModal: false, isTransferring: true });
  };

  private handleTransition = (location: Location) => {
    this.setState({ nextLocation: location.pathname });
    if (!this.props.needsStopHistory) {
      return true;
    }
    return Symbol.keyFor(this.trigger) || true;
  };
}

const mapStateToProps = (state: any): StateProps => ({
  needsStopHistory: state.ui.needsStopHistory
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { uiDispatch } = dispatches;
  const uiDispatches = uiDispatch(dispatch);
  return {
    allowChangesToHistory: () => uiDispatches.stopHistory(false)
  };
};

export default withRouter(
  connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
  )(NavigationTransitionPrompt)
);
