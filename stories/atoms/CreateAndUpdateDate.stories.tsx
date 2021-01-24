import * as React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, date } from "@storybook/addon-knobs";

import CreateAndUpdateDate from "@components/atoms/CreateAndUpdateDate";

storiesOf("Atoms", module)
  .addDecorator(withKnobs)
  .add(
    "CreateAndUpdateDate",
    // 作成日・更新日の表示
    () => (
      <div>
        <CreateAndUpdateDate
          createdAt={date("createdAt", new Date())}
          updatedAt={date("updatedAt", new Date())}
        />
      </div>
    )
  );
