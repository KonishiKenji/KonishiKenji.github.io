/**
 * 施設区分のラベルを表示する（編集不可）
 */

import * as React from "react";
import MuiTextField from "@components/molecules/MuiTextField";

interface Props {
  facilityType: string;
  facilityTypeList: { label: string; value: string }[];
}

const FacilityTypeField: React.FC<Props> = props => {
  const currentFacility = props.facilityTypeList.find(
    facility => facility.value === props.facilityType
  );
  const value = currentFacility ? currentFacility.label : "";
  return <MuiTextField label="施設区分" value={value} disabled={true} />;
};

export default FacilityTypeField;
