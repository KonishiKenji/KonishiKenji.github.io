import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { Provider } from "react-redux";

import store from "@stores/store";
import { theme } from "@styles/theme";

// tslint:disable-next-line:variable-name
function withRoot<P>(Component: React.ComponentType<P>) {
  return (props: P): JSX.Element => {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...props} />
        </MuiThemeProvider>
      </Provider>
    );
  };
}

export default withRoot;
