import {
  InitialDataValues,
  InitialDataErrors
} from "@interfaces/mgr/SHUROTEICHAKU/report/initialData";
import validator from "@validator";

const reportValidation = (values: InitialDataValues): InitialDataErrors => {
  const validatedUsers = values.ReportData.map((report) => {
    return {
      remarks: validator(report.remarks ? report.remarks : "", {
        type: "checkCharacterLength",
        length: 50
      })
    };
  });
  return {
    ReportData: validatedUsers
  };
};
export default reportValidation;
