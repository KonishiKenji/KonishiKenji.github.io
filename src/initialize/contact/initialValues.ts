import { ContactValues } from "@interfaces/contact/contact";
import { getBrowserFromUA } from "@utils/browser";

const initialValues = (
  facilityName: string,
  businessOwner: string
): ContactValues => {
  return {
    contact: {
      agreement: false,
      browser: getBrowserFromUA(),
      content: "",
      email: "",
      facilityName: facilityName || "",
      govBusinessOwner: businessOwner || "",
      os: navigator.platform,
      userAgent: navigator.userAgent,
      overview: "",
      responsibleName: ""
    }
  };
};

export default initialValues;
