import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { FacilityType } from "@constants/variables";

import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import dispatches from "@stores/dispatches";
import { AppState } from "@stores/type";

import PreviewTemplate from "@components/templates/PreviewTemplate";
import InoutRecordTable from "@components/organisms/download/print/InoutRecordTable";
import UsagePerformanceTable from "@components/organisms/download/print/UsagePerformanceTable";
import SEIKATSUKAIGOJisseki from "@components/organisms/mgr/SEIKATSUKAIGO/download/preview/Jisseki";
import SHUROTEICHAKUJisseki from "@components/organisms/mgr/SHUROTEICHAKU/download/preview/Jisseki";
import JIRITSUKUNRENSEIKATSUJisseki from "@components/organisms/mgr/JIRITSUKUNRENSEIKATSU/download/preview/Jisseki";
import TANKINYUSHOJisseki from "@components/organisms/mgr/TANKINYUSHO/download/preview/Jisseki";
import SHISETSUNYUSHOJisseki from "@components/organisms/mgr/SHISETSUNYUSHO/download/preview/Jisseki";

const styles = ({ spacing }: Theme) => createStyles({});

interface OwnProps {
  year: string;
  month: string;
  idList: string;
}

interface DispatchProps {
  fetchInvoice: (year: string, month: string, excludeUserIds: number[]) => void;
}

interface Props
  extends OwnProps,
    DispatchProps,
    WithStyles<typeof styles>,
    AppState {}

/**
 * 実績記録票のプリント画面
 */
class JissekiPrint extends React.Component<Props> {
  public componentWillMount() {
    const { year, month, idList } = this.props;
    const excludedUserIds = idList
      ? (idList.split(",").map(str => parseInt(str, 10)) as number[])
      : ([] as number[]);

    this.props.fetchInvoice(year, month, excludedUserIds);
  }

  public render() {
    if (
      this.props.invoice.invoiceData &&
      this.props.invoice.invoiceData.data &&
      this.props.invoice.invoiceData.data.length === 0
    ) {
      return "";
    }
    return (
      <PreviewTemplate>
        {this.props.invoice.invoiceData.data.map((invoiceData, key) => {
          switch (invoiceData.facility.kindService) {
            case FacilityType.IKOU:
            case FacilityType.A:
            case FacilityType.B:
              return <InoutRecordTable key={key} invoiceData={invoiceData} />;
            case FacilityType.GROUP_HOME:
              return (
                <UsagePerformanceTable key={key} invoiceData={invoiceData} />
              );
            case FacilityType.SEIKATSUKAIGO:
              return (
                <SEIKATSUKAIGOJisseki key={key} invoiceData={invoiceData} />
              );
            case FacilityType.JIRITSUKUNRENSEIKATSU:
              return (
                <JIRITSUKUNRENSEIKATSUJisseki
                  key={key}
                  invoiceData={invoiceData}
                />
              );
            case FacilityType.SHUROTEICHAKU:
              return (
                <SHUROTEICHAKUJisseki key={key} invoiceData={invoiceData} />
              );
            case FacilityType.TANKINYUSHO:
              return <TANKINYUSHOJisseki key={key} invoiceData={invoiceData} />;
            case FacilityType.SHISETSUNYUSHO:
              return (
                <SHISETSUNYUSHOJisseki key={key} invoiceData={invoiceData} />
              );
          }
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
    fetchInvoice: (year: string, month: string, excludeUserIds: number[]) => {
      invoiceDispatched.downloadJissekiJson(year, month, excludeUserIds);
    }
  };
};

export default connect<AppState, DispatchProps, {}, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(JissekiPrint));
