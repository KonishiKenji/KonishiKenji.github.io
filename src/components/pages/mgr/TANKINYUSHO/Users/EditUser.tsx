import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import AdminTemplate from "@components/templates/AdminTemplate";
import EditUserForm from "@components/organisms/mgr/TANKINYUSHO/Users/EditUserForm";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";

type Props = RouteComponentProps<{ id: string }>;

/**
 * 利用者情報 > 編集
 */
const EditUser: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <AdminTemplate pageName="利用者情報">
      <EditUserForm {...props} />
      <NavigationTransitionPrompt />
    </AdminTemplate>
  );
};

export default EditUser;
