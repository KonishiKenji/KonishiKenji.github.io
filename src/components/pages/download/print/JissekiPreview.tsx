import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { AppState } from "@stores/type";
import { AppDownloadState } from "@stores/ui/download/type";
import JissekiPrintPreview from "@components/organisms/download/print/JissekiPrint";
import { getUrlParams } from "@utils/url";

interface StateProps {
  appDownload: AppDownloadState;
}
interface Props extends RouteComponentProps, StateProps {}

/**
 * 実績記録票のプレビュー（v1用）
 */
const JissekiPrint: React.FC<Props> = (props) => {
  const { match } = props;
  const { year, month } = match.params as any;
  const query: { excludedUserIds?: string } = getUrlParams(
    window.location.search
  );
  const excludedUserIds = query.excludedUserIds || "";
  return (
    <JissekiPrintPreview year={year} month={month} idList={excludedUserIds} />
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  appDownload: state.appDownload as AppDownloadState
});

export default connect(mapStateToProps)(JissekiPrint);
