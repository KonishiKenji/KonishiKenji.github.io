import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import AdminTemplate from "@components/templates/AdminTemplate";
import EditUserForm from "@components/organisms/mgr/IAB/Users/EditUserForm";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";

type Props = RouteComponentProps<{ id: string }>;

/**
 * 利用実績
 */
const Facility: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <AdminTemplate pageName="利用者情報">
      <EditUserForm {...props} />
      <NavigationTransitionPrompt />
    </AdminTemplate>
  );
};

export default Facility;
