import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import AdminTemplate from "@components/templates/AdminTemplate";
import EditUserForm from "@components/organisms/mgr/GroupHome/Users/EditUserForm";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";
import AlertDialog from "@components/organisms/AlertDialog";

type Props = RouteComponentProps<{ id: string }>;

/**
 * 利用実績
 */
const Facility: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <AdminTemplate pageName="利用者情報 > 編集">
      <EditUserForm {...props} />
      <NavigationTransitionPrompt />
      <AlertDialog />
    </AdminTemplate>
  );
};

export default Facility;
