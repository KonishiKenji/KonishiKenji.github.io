import * as React from "react";
import * as sentry from "@utils/sentry";
import { connect } from "react-redux";
import withRoot from "./withRoot";
import NavigationRoot from "./NavigationRoot";
import Loading from "@components/atoms/LoadingContainer";
import Snackbar from "@components/atoms/SnackbarContainer";
// see: https://babeljs.io/blog/2019/03/19/7.4.0#migration-from-core-js-2
import "core-js/stable";
import "regenerator-runtime/runtime";
import { AppState } from "@stores/type";

interface StateProps {
  userId: number;
}

class App extends React.Component<StateProps> {
  public componentDidMount(): void {
    sentry.initSentry();
  }

  public componentDidCatch(error: Error | null, info: object): void {
    sentry.sendReactError(error, info, this.props.userId);
  }

  public render(): JSX.Element {
    return (
      <>
        <Loading />
        <NavigationRoot />
        <Snackbar />
      </>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  userId: state.user.id
});

export default withRoot(connect(mapStateToProps)(App));
