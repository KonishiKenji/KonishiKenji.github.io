/**
 * サービス種類のラベルを表示する（編集不可）
 */

import * as React from "react";
import MuiTextField from "@components/molecules/MuiTextField";
import { FACILITY_TYPE_NAME_LIST } from "@constants/variables";

interface Props {
  serviceType: string;
}

const ServiceTypeField: React.FC<Props> = ({ serviceType }) => {
  const currentService = FACILITY_TYPE_NAME_LIST.find(
    service => service.value === serviceType
  );
  const value = currentService ? currentService.label : "";
  return <MuiTextField label="サービス種類" value={value} disabled={true} />;
};

export default ServiceTypeField;
