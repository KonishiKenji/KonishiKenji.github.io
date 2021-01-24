import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import AdminTemplate from "@components/templates/AdminTemplate";
import CreateUserForm from "@components/organisms/mgr/IAB/Users/CreateUserForm";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";

type Props = RouteComponentProps;

/**
 * 利用実績
 */
const Facility: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <AdminTemplate pageName="利用者情報">
      <CreateUserForm {...props} />
      <NavigationTransitionPrompt />
    </AdminTemplate>
  );
};

export default Facility;
