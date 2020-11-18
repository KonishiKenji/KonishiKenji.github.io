import { ContactErrors, ContactValues } from "@interfaces/contact/contact";
import validator from "@validator";

const contactValidation = (values: ContactValues): ContactErrors => {
  return {
    contact: {
      overview: validator(values.contact.overview, "required"),
      content: validator(values.contact.content, "required"),
      govBusinessOwner: validator(values.contact.govBusinessOwner, "required"),
      facilityName: validator(values.contact.facilityName, "required"),
      responsibleName: validator(values.contact.responsibleName, "required"),
      email: validator(values.contact.email, "required", "email")
    }
  };
};

const validation = (values: ContactValues): ContactErrors => {
  const contactErrors = contactValidation(values);
  return { ...contactErrors };
};

export default validation;
