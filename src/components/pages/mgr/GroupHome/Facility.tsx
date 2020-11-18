import * as React from "react";
import AdminTemplate from "@components/templates/AdminTemplate";
import FacilityForm from "@components/organisms/mgr/GroupHome/Facility/FacilityForm";
import NavigationTransitionPrompt from "@components/organisms/mgr/NavigationTransitionPrompt";

/**
 * 利用実績
 */
const Facility: React.FunctionComponent = () => {
  return (
    <AdminTemplate pageName="事業者情報">
      <FacilityForm />
      <NavigationTransitionPrompt />
    </AdminTemplate>
  );
};

export default Facility;
