import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import AdminTemplate from "@components/templates/AdminTemplate";
import CreateUserForm from "@components/organisms/mgr/JIRITSUKUNRENSEIKATSU/Users/CreateUserForm";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";

type Props = RouteComponentProps;

/**
 * 利用者情報 > 新規作成
 */
const CreateUser: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <AdminTemplate pageName="利用者情報">
      <CreateUserForm {...props} />
      <NavigationTransitionPrompt />
    </AdminTemplate>
  );
};

export default CreateUser;
