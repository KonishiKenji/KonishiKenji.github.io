import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";

import PreviewTemplate from "@components/templates/PreviewTemplate";
import Uplimit from "@components/organisms/download/print/Uplimit";

interface OwnProps {
  year: string;
  month: string;
  idList: string;
}

interface DispatchProps {
  fetchUplimit: (year: string, month: string, excludeUserIds: number[]) => void;
}

interface Props extends OwnProps, DispatchProps, AppState {}

/**
 * 利用者負担上限額管理結果票のプリント画面
 */
class UplimitPrint extends React.Component<Props> {
  public componentWillMount() {
    const { year, month, idList } = this.props;
    const excludedUserIds = idList
      ? (idList.split(",").map(str => parseInt(str, 10)) as number[])
      : ([] as number[]);

    this.props.fetchUplimit(year, month, excludedUserIds);
  }

  public render() {
    const { invoiceUplimitData } = this.props.invoice;
    return (
      <PreviewTemplate>
        <Uplimit uplimitResults={invoiceUplimitData} />
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
    fetchUplimit: (year: string, month: string, excludeUserIds: number[]) => {
      invoiceDispatched.downloadUplimitJson(year, month, excludeUserIds);
    }
  };
};

export default connect<AppState, DispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(UplimitPrint);
