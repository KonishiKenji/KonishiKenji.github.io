import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";

import PreviewTemplate from "@components/templates/PreviewTemplate";
import UserCostAmountList from "@components/organisms/download/print/UserCostAmountList";
interface OwnProps {
  year: string;
  month: string;
  idList: string;
}
interface DispatchProps {
  fetchCostAmountList: (
    year: string,
    month: string,
    excludeUserIds: number[]
  ) => void;
}

interface Props extends OwnProps, DispatchProps, AppState {}

/**
 * 利用者負担額一覧表のプリント画面
 */
class CostAmountList extends React.Component<Props> {
  public componentWillMount() {
    const { year, month, idList } = this.props;
    const excludedUserIds = idList
      ? (idList.split(",").map(str => parseInt(str, 10)) as number[])
      : ([] as number[]);

    this.props.fetchCostAmountList(year, month, excludedUserIds);
  }

  public render() {
    const { invoiceCostAmountListData } = this.props.invoice;
    return (
      <PreviewTemplate>
        <UserCostAmountList userCostAmount={invoiceCostAmountListData} />
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
    fetchCostAmountList: (
      year: string,
      month: string,
      excludeUserIds: number[]
    ) => {
      invoiceDispatched.downloadCostAmountListJson(year, month, excludeUserIds);
    }
  };
};

export default connect<AppState, DispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(CostAmountList);
