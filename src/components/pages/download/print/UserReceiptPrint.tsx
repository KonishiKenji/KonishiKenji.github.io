import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { AppState } from "@stores/type";

import AdminTemplate from "@components/templates/AdminTemplate";
import PrintPreviewTemplate from "@components/templates/PrintPreviewTemplate";
import UserReceiptPrintPreview from "@components/organisms/download/print/UserReceiptPrint";

interface Props extends RouteComponentProps, AppState {}

/**
 * 履歴 > 領収書
 */
class UserReceiptPrint extends React.Component<Props> {
  public render() {
    const { match } = this.props;
    const { dataKey } = match.params as any;
    const query = this.props.location.search;

    return (
      <AdminTemplate pageName="請求 > 領収書">
        <PrintPreviewTemplate
          history={this.props.history}
          location={this.props.location}
          match={this.props.match}
        >
          <UserReceiptPrintPreview dataKey={dataKey} query={query} />
        </PrintPreviewTemplate>
      </AdminTemplate>
    );
  }
}

const mapStateToProps = (state: AppState): AppState => {
  return { ...state };
};

export default connect<AppState, {}, {}, AppState>(mapStateToProps)(
  UserReceiptPrint
);
