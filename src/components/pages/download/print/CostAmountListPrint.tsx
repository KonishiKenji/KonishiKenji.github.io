import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { AppState } from "@stores/type";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import AdminTemplate from "@components/templates/AdminTemplate";
import PrintPreviewTemplate from "@components/templates/PrintPreviewTemplate";
import CostAmountListPrintPreview from "@components/organisms/download/print/CostAmountListPrint";

const HEADER_HEIGHT = 16;
const NOT_PRINTED_AREA = 16;

const styles = ({ spacing }: Theme) =>
  createStyles({
    wrapper: {
      height: spacing.unit * 8,
      top: spacing.unit * 8
    },
    body: {
      height: `calc(95vh - ${HEADER_HEIGHT}px - ${NOT_PRINTED_AREA}px)`,
      paddingTop: 21
    }
  });

interface Props
  extends WithStyles<typeof styles>,
    RouteComponentProps,
    AppState {}

/**
 * 利用者負担額一覧表のプリント画面
 */
class CostAmountListPrint extends React.Component<Props> {
  public render() {
    const { match } = this.props;
    const { year, month } = match.params as any;
    const excludedUserIds = this.props.appDownload.excludedUserIds.join(",");

    return (
      <AdminTemplate pageName="請求 > 利用者負担額一覧表">
        <PrintPreviewTemplate
          history={this.props.history}
          location={this.props.location}
          match={this.props.match}
        >
          <CostAmountListPrintPreview
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
  withStyles(styles)(CostAmountListPrint)
);
