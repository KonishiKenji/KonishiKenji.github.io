import * as React from "react";
import AdminTemplate from "@components/templates/AdminTemplate";
import EditInitialForm from "@components/organisms/mgr/IAB/initial/EditInitialForm";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";

/**
 * 初期設定情報
 */
const InitialData: React.FunctionComponent = () => {
  return (
    <AdminTemplate pageName="初期設定情報">
      <EditInitialForm />
      <NavigationTransitionPrompt />
    </AdminTemplate>
  );
};

export default InitialData;
