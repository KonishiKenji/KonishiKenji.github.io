import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ServiceTypes } from "@constants/variables";
import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";

import PreviewTemplate from "@components/templates/PreviewTemplate";

import InvoiceSummaryCity from "@components/organisms/download/print/InvoiceSummaryCity";
import InvoiceSummaryTotal from "@components/organisms/download/print/InvoiceSummaryTotal";
import InvoiceSummaryDetail from "@components/organisms/download/print/InvoiceSummaryDetail";
import InvoiceSummaryDetailGroupHome from "@components/organisms/download/print/InvoiceSummaryDetailGroupHome";

interface OwnProps {
  year: string;
  month: string;
  idList: string;
}
interface DispatchProps {
  handleLogout: () => void;
  fetchSeikyu: (year: string, month: string, excludeUserIds: number[]) => void;
}

interface Props extends OwnProps, DispatchProps, AppState {}

/**
 * 請求書・明細書のプリント画面
 */
class SeikyuPreview extends React.Component<Props> {
  public componentWillMount() {
    const { year, month, idList } = this.props;
    const excludedUserIds = idList
      ? (idList.split(",").map(str => parseInt(str, 10)) as number[])
      : ([] as number[]);

    this.props.fetchSeikyu(year, month, excludedUserIds);
  }

  public render() {
    const {
      summaryByCity,
      summaryByMonth
    } = this.props.invoice.invoiceSeikyuData;

    if (!summaryByMonth || !summaryByMonth) {
      return "";
    }
    return (
      <PreviewTemplate>
        <InvoiceSummaryTotal data={summaryByMonth} />
        {summaryByCity.map((city, key) => {
          const { users } = city.detail;
          return (
            <React.Fragment key={key}>
              <InvoiceSummaryCity data={city} />
              {users.map((user, index) => {
                return user.serviceTypes[0].s01 !== ServiceTypes.GROUP_HOME ? (
                  <InvoiceSummaryDetail
                    data={city.detail}
                    key={index}
                    user={user}
                  />
                ) : (
                  <InvoiceSummaryDetailGroupHome
                    data={city.detail}
                    key={index}
                    user={user}
                  />
                );
              })}
            </React.Fragment>
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
  const { authDispatch, userDispatch, invoiceDispatch } = dispatches;
  const invoiceDispatched = invoiceDispatch(dispatch);
  return {
    handleLogout: authDispatch(dispatch).logout,
    fetchUser: userDispatch(dispatch).me,
    fetchSeikyu: (year: string, month: string, excludeUserIds: number[]) => {
      invoiceDispatched.downloadSeikyuJson(year, month, excludeUserIds);
    }
  };
};

export default connect<AppState, DispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(SeikyuPreview);
