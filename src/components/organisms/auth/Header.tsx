import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import KnowbeMgrLogo from "@components/atoms/KnowbeMgrLogo";

import * as React from "react";

class Header extends React.Component {
  public render() {
    return (
      <AppBar>
        <Toolbar>
          <KnowbeMgrLogo />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
