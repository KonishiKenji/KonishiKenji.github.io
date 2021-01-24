import { storiesOf } from "@storybook/react";
import * as React from "react";

import KnowbeMgrLogo from "@components/atoms/KnowbeMgrLogo";

const stories = storiesOf("Atoms", module);

stories.add(
  "KnowbeMgrLogo",
  // knobe業務支援の画像
  () => <KnowbeMgrLogo />
);
