import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { AppState } from "@stores/type";
import { AppDownloadState } from "@stores/ui/download/type";
import UplimitPrintPreview from "@components/organisms/download/print/UplimitPrint";
import { getUrlParams } from "@utils/url";

interface StateProps {
  appDownload: AppDownloadState;
}
interface Props extends RouteComponentProps, StateProps {}

/**
 * 利用者負担上限額管理結果票のプレビュー（v1用）
 */
const UplimitPrint: React.FC<Props> = (props) => {
  const { match } = props;
  const { year, month } = match.params as any;
  const query: { excludedUserIds?: string } = getUrlParams(
    window.location.search
  );
  const excludedUserIds = query.excludedUserIds || "";

  return (
    <UplimitPrintPreview year={year} month={month} idList={excludedUserIds} />
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  appDownload: state.appDownload as AppDownloadState
});

export default connect(mapStateToProps)(UplimitPrint);
