import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

import IncludeUsersDialog from "@components/molecules/dialog/IncludeUserDialog";

const users = [
  { id: 1, recipientNumber: "1234500000", name: "id: 1 山田　太郎" },
  { id: 2, recipientNumber: "6789000000", name: "id: 2 佐藤　圭一" },
  { id: 3, recipientNumber: "1111111111", name: "id: 3 渡辺　雅之" },
  { id: 4, recipientNumber: "1234567890", name: "id: 4 辻　綾女" }
];

const App: React.SFC<{}> = () => {
  const [includedUserIds, setIncludedUserIds] = React.useState([1]);

  const onSubmit = (ids: number[]): void => {
    setIncludedUserIds(ids);
  };

  return (
    <>
      <div>選択済みのid(保存するで更新)</div>
      {includedUserIds.map((v) => (
        <p>{v}</p>
      ))}
      <IncludeUsersDialog
        labelId="id"
        title={text("title", "タイトル")}
        open={boolean("open", true)}
        includedUserIds={includedUserIds}
        users={users}
        onSubmit={onSubmit}
        onClose={action("onClose")}
      />
    </>
  );
};

storiesOf("Molecules", module)
  .addDecorator(withKnobs)
  .add(
    "IncludeUsersDialog",
    () => <App />
  );
