import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import Header from "@components/organisms/mgr/Header";

action("toggle-click");

const stories = storiesOf("Headers", module);

stories.add(
  "MgrHeader",
  () => <Header toggleDrawer={action("toggle-click")} pageName="ヘッダー" />,
  { info: "業務支援管理画面のヘッダー" }
);
