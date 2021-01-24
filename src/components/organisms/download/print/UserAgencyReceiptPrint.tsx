import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as queryString from "query-string";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";

import PreviewTemplate from "@components/templates/PreviewTemplate";
import UserAgencyReceipt from "@components/organisms/download/print/UserAgencyReceipt";

const styles = ({ spacing }: Theme) => createStyles({});

interface OwnProps {
  dataKey: string;
  query: string;
}

interface DispatchProps {
  fetchUserAgencyReceipt: (dataKey: string) => void;
}

interface Props
  extends OwnProps,
    DispatchProps,
    WithStyles<typeof styles>,
    AppState {}

/**
 * 履歴 > 代理受領書 プレビュー
 */
class UserAgencyReceiptPreview extends React.Component<Props> {
  public componentWillMount() {
    const { dataKey } = this.props;
    this.props.fetchUserAgencyReceipt(dataKey);
  }

  public render() {
    if (
      this.props.invoice.invoiceUserAgencyReceiptData &&
      this.props.invoice.invoiceUserAgencyReceiptData.length === 0
    ) {
      return "";
    }
    const queryParams = queryString.parse(this.props.query);
    const targetDate = queryParams.target_date;
    const noticeDate = queryParams.notice_date;
    return (
      <PreviewTemplate>
        {this.props.invoice.invoiceUserAgencyReceiptData.map((data, key) => {
          return (
            <UserAgencyReceipt
              key={key}
              data={data}
              targetDate={targetDate}
              noticeDate={noticeDate}
            />
          );
        })}
      </PreviewTemplate>
    );
  }
}

const mapStateToProps = (state: AppState): AppState => {
  return { ...state };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { invoiceDispatch } = dispatches;
  const invoiceDispatched = invoiceDispatch(dispatch);
  return {
    fetchUserAgencyReceipt: (dataKey: string) => {
      invoiceDispatched.downloadUserAgencyReceiptJson(dataKey);
    }
  };
};

export default connect<AppState, DispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserAgencyReceiptPreview));
