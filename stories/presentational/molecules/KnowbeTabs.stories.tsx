import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import KnowbeTabs from "@components/presentational/molecules/KnowbeTabs";

import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "@styles/theme";

const reportInfo = [
  { label: "日ごと", value: "daily" },
  { label: "月ごと", value: "monthly" }
];

const supportInfo = [
  { label: "支援記録", value: "support" },
  { label: "面談記録", value: "interview" },
  { label: "フェイスシート", value: "face_sheet" }
];

const recordInfo = [
  { label: "個別支援計画", value: "support_plan" },
  { label: "支援記録", value: "support" },
  { label: "作業記録", value: "work" },
  { label: "面談記録", value: "interview" }
];

const supportRecordInfo = [
  { label: "個別支援計画", value: "support_plan" },
  { label: "支援記録", value: "support" },
  { label: "作業記録", value: "work" },
  { label: "面談記録", value: "interview" },
  { label: "フェイスシート", value: "face_sheet" }
];

const App: React.SFC<{}> = () => {
  const [selectedTab, setSelectedTab] = React.useState("daily");
  const [selectedRecord, setSelectedRecord] = React.useState("support");
  const [selectType, setSelectType] = React.useState("support_plan");
  const [selectSupportRecord, setSelectSupportRecord] = React.useState(
    "support_plan"
  );

  const onChangeTab = (e: any, value: string): void => {
    setSelectedTab(value);
  };

  const onChangeRecord = (e: any, value: string): void => {
    setSelectedRecord(value);
  };

  const onChangeRecordTab = (e: any, value: string): void => {
    setSelectType(value);
  };

  const onChangeSupportRecordTab = (e: any, value: string): void => {
    setSelectSupportRecord(value);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <p>2rows</p>
      <div>
        <KnowbeTabs
          key="tab2"
          tabInfo={reportInfo}
          onChange={onChangeTab}
          value={selectedTab}
        />
      </div>
      <p>2rows disabled</p>
      <div>
        <KnowbeTabs
          key="tab2_disabled"
          tabInfo={reportInfo}
          onChange={onChangeTab}
          value="daily"
          disabled
        />
      </div>
      <p>3rows</p>
      <div>
        <KnowbeTabs
          key="tab3"
          tabInfo={supportInfo}
          onChange={onChangeRecord}
          value={selectedRecord}
        />
      </div>
      <p>3rows disabled</p>
      <div>
        <KnowbeTabs
          key="tab3_disabled"
          tabInfo={supportInfo}
          onChange={onChangeRecord}
          value="support"
          disabled
        />
      </div>
      <p>4rows</p>
      <div>
        <KnowbeTabs
          key="tab4"
          tabInfo={recordInfo}
          value={selectType}
          onChange={onChangeRecordTab}
        />
      </div>
      <p>4rows disabled</p>
      <div>
        <KnowbeTabs
          key="tab4_disabled"
          tabInfo={recordInfo}
          value="support_plan"
          onChange={onChangeRecordTab}
          disabled
        />
      </div>
      <p>5rows</p>
      <div>
        <KnowbeTabs
          key="tab5"
          tabInfo={supportRecordInfo}
          value={selectSupportRecord}
          onChange={onChangeSupportRecordTab}
        />
      </div>
      <p>5rows disabled</p>
      <div>
        <KnowbeTabs
          key="tab5_disabled"
          tabInfo={supportRecordInfo}
          value="support_plan"
          onChange={onChangeSupportRecordTab}
          disabled
        />
      </div>
    </MuiThemeProvider>
  );
};

storiesOf("Presentational", module)
  .addDecorator(withKnobs)
  .add(
    "KnowbeTabs",
    () => <App />
  );
