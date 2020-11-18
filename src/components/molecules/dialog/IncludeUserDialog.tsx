import * as React from "react";

import ExcludeUsersDialog from "@components/molecules/dialog/ExcludeUsersDialog";

interface Props {
  labelId?: string;
  title: string;
  open: boolean;
  includedUserIds: number[];
  users: {
    id: string | number;
    recipientNumber: string;
    name: string;
  }[];
  onSubmit: (excludedUserIds: number[]) => void;
  onClose: () => void;
}

const IncludeUsersDialog: React.SFC<Props> = (props: Props) => {
  const { users, onClose } = props;
  const allUserIds = users.map((user) => parseInt(`${user.id}`, 10));

  const includedToExcludedUserIds = allUserIds.filter(
    (id) => !props.includedUserIds.includes(parseInt(`${id}`, 10))
  );

  const excludedToIncludedUserIds = (excludedUserIds: number[]): void => {
    const includedUserIds = allUserIds.filter(
      (id) => !excludedUserIds.includes(parseInt(`${id}`, 10))
    );
    props.onSubmit(includedUserIds);
  };

  return (
    <ExcludeUsersDialog
      {...props}
      shouldDisabledNoUser
      excludedUserIds={includedToExcludedUserIds}
      onSubmit={excludedToIncludedUserIds}
      onClose={onClose}
    />
  );
};

export default IncludeUsersDialog;
