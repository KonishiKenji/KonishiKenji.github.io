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
import UserReceipt from "@components/organisms/download/print/UserReceipt";

import { dateToLocalisedString } from "@utils/date";

const styles = ({ spacing }: Theme) => createStyles({});

interface OwnProps {
  dataKey: string;
  query: string;
}

interface DispatchProps {
  fetchUserReceipt: (data: string) => void;
}

interface Props
  extends OwnProps,
    DispatchProps,
    WithStyles<typeof styles>,
    AppState {}

/**
 * 履歴 > 領収書プレビュー
 */
class UserReceiptPreview extends React.Component<Props> {
  public componentWillMount() {
    const { dataKey } = this.props;
    this.props.fetchUserReceipt(dataKey);
  }

  public render() {
    const queryParam = queryString.parse(this.props.query);
    const targetDate =
      queryParam.target_date ||
      dateToLocalisedString(new Date(), "YYYY年M月D日");
    if (
      this.props.invoice.invoiceUserReceiptData &&
      this.props.invoice.invoiceUserReceiptData.length === 0
    ) {
      return "";
    }
    return (
      <PreviewTemplate>
        {this.props.invoice.invoiceUserReceiptData.map((data, key) => {
          return <UserReceipt key={key} data={data} targetDate={targetDate} />;
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
    fetchUserReceipt: (dataKey: string) => {
      invoiceDispatched.downloadUserReceiptJson(dataKey);
    }
  };
};

export default connect<AppState, DispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserReceiptPreview));
