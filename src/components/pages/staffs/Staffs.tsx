import * as React from "react";
import AdminTemplate from "@components/templates/AdminTemplate";
import StaffsForm from "@components/organisms/staffs/StaffsForm";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";
import AlertDialog from "@components/organisms/AlertDialog";

/**
 * 職員情報
 */
const Works: React.FunctionComponent = () => {
  return (
    <AdminTemplate pageName="職員情報">
      <StaffsForm />
      <NavigationTransitionPrompt />
      <AlertDialog />
    </AdminTemplate>
  );
};

export default Works;
