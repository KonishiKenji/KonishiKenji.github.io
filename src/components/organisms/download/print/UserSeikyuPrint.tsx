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
import UserInvoice from "@components/organisms/download/print/UserInvoice";

import { dateToLocalisedString } from "@utils/date";

const styles = ({ spacing }: Theme) => createStyles({});

interface OwnProps {
  dataKey: string;
  query: string;
}

interface DispatchProps {
  fetchUserSeikyu: (data: string) => void;
}

interface Props
  extends OwnProps,
    DispatchProps,
    WithStyles<typeof styles>,
    AppState {}

/**
 * 履歴からの請求書プレビュー
 */
class UserSeikyuPreview extends React.Component<Props> {
  public componentWillMount() {
    const { dataKey } = this.props;
    this.props.fetchUserSeikyu(dataKey);
  }

  public render() {
    if (
      this.props.invoice.invoiceUserSeikyuData &&
      this.props.invoice.invoiceUserSeikyuData.length === 0
    ) {
      return "";
    }
    const queryParam = queryString.parse(this.props.query);
    const targetDate =
      queryParam.target_date ||
      dateToLocalisedString(new Date(), "YYYY年M月D日");
    return (
      <PreviewTemplate>
        {this.props.invoice.invoiceUserSeikyuData.map((data, key) => {
          return <UserInvoice key={key} data={data} targetDate={targetDate} />;
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
    fetchUserSeikyu: (dataKey: string) => {
      invoiceDispatched.downloadUserSeikyuJson(dataKey);
    }
  };
};

export default connect<AppState, DispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserSeikyuPreview));
