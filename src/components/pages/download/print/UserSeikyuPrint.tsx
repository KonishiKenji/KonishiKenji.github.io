import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { AppState } from "@stores/type";

import AdminTemplate from "@components/templates/AdminTemplate";
import PrintPreviewTemplate from "@components/templates/PrintPreviewTemplate";
import UserSeikyuPrintPreview from "@components/organisms/download/print/UserSeikyuPrint";

interface Props extends RouteComponentProps, AppState {}

/**
 * 履歴　> 請求書
 */
class UserSeikyuPrint extends React.Component<Props> {
  public render() {
    const { match } = this.props;
    const { dataKey } = match.params as any;
    const query = this.props.location.search;

    return (
      <AdminTemplate pageName="請求 > 請求書">
        <PrintPreviewTemplate
          history={this.props.history}
          location={this.props.location}
          match={this.props.match}
        >
          <UserSeikyuPrintPreview dataKey={dataKey} query={query} />
        </PrintPreviewTemplate>
      </AdminTemplate>
    );
  }
}

const mapStateToProps = (state: AppState): AppState => {
  return { ...state };
};

export default connect<AppState, {}, {}, AppState>(mapStateToProps)(
  UserSeikyuPrint
);
