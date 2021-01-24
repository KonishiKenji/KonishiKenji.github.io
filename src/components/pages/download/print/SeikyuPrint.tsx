import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { AppState } from "@stores/type";

import AdminTemplate from "@components/templates/AdminTemplate";
import PrintPreviewTemplate from "@components/templates/PrintPreviewTemplate";
import SeikyuPrintPreview from "@components/organisms/download/print/SeikyuPrint";

interface Props extends RouteComponentProps, AppState {}

/**
 * 請求書・明細書のプリント画面
 */
class SeikyuPrint extends React.Component<Props> {
  public render() {
    const { match } = this.props;
    const { year, month } = match.params as any;
    const excludedUserIds = this.props.appDownload.excludedUserIds.join(",");

    return (
      <AdminTemplate pageName="請求 > 請求書・明細書">
        <PrintPreviewTemplate
          history={this.props.history}
          location={this.props.location}
          match={this.props.match}
        >
          <SeikyuPrintPreview
            year={year}
            month={month}
            idList={excludedUserIds}
          />
        </PrintPreviewTemplate>
      </AdminTemplate>
    );
  }
}

const mapStateToProps = (state: AppState): AppState => {
  return { ...state };
};

export default connect<AppState, {}, {}, AppState>(mapStateToProps)(
  SeikyuPrint
);
