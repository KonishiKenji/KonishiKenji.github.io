import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import AdminTemplate from "@components/templates/AdminTemplate";
import PrintPreviewTemplate from "@components/templates/PrintPreviewTemplate";
import OperationsPrint from "@components/organisms/record/print/OperationsPrint";

// /**
//  * 業務日誌のプリント画面
//  */
const RecordOperationsPrint = (
  props: RouteComponentProps<{ year: string; month: string }>
) => {
  const year = props.match.params.year;
  const month = props.match.params.month;

  return (
    <AdminTemplate pageName="業務日誌">
      <PrintPreviewTemplate
        history={props.history}
        location={props.location}
        match={props.match}
      >
        <OperationsPrint year={year} month={month} />
      </PrintPreviewTemplate>
    </AdminTemplate>
  );
};

export default RecordOperationsPrint;
