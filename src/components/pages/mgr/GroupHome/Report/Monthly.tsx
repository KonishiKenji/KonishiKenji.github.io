import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import AdminTemplate from "@components/templates/AdminTemplate";
import KnowbeTabs from "@components/molecules/Tabs";
import UsagePerformanceMonthly from "@components/organisms/mgr/GroupHome/report/UsagePerformanceMonthly";
import ErrorsDialog from "@components/organisms/ErrorsDialog";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";
import { ReportTabInfo, REPORT_TABS_INFO } from "@constants/variables";
import * as URL from "@constants/url";

type Props = RouteComponentProps;

/**
 * 利用実績
 */
const Report: React.FunctionComponent<Props> = (props: Props) => {
  const onChangeTag = (event: any, value: number) => {
    if (value === ReportTabInfo.DAILY) {
      props.history.push(URL.REPORT_DAILY);
    }
  };
  return (
    <AdminTemplate pageName="利用実績">
      <>
        <KnowbeTabs
          key={"tab"}
          tabInfo={REPORT_TABS_INFO}
          handleChange={onChangeTag}
          selectedTab={ReportTabInfo.MONTHLY}
          tabsStyle={{
            height: 32,
            backgroundColor: "#fff"
          }}
        />
        <UsagePerformanceMonthly />
        <ErrorsDialog errorsKey="inout" />
        <NavigationTransitionPrompt />
      </>
    </AdminTemplate>
  );
};

export default Report;
