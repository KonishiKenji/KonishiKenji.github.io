import * as React from "react";
import AdminTemplate from "@components/templates/AdminTemplate";
import WorksForm from "@components/organisms/works/WorksForm";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";
import AlertDialog from "@components/organisms/AlertDialog";

/**
 * 作業情報
 */
const Works: React.FunctionComponent = () => {
  return (
    <AdminTemplate pageName="作業情報">
      <WorksForm />
      <NavigationTransitionPrompt />
      <AlertDialog />
    </AdminTemplate>
  );
};

export default Works;
