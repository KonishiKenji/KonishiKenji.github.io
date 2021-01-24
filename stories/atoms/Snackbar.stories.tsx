import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import Snackbar from "@components/atoms/Snackbar";

const stories = storiesOf("Atoms", module);

stories.add(
  "Snackbar Success",
  () => (
    <Snackbar
      open={true}
      message="保存が完了しました"
      onClose={action("onClose")}
      variant="success"
    />
  )
);

stories.add(
  "Snackbar Failed",
  () => (
    <Snackbar
      open={true}
      message="入力に誤りがあります"
      onClose={action("onClose")}
      variant="warning"
    />
  )
);
