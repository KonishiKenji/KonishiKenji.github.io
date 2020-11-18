import { ContactValues } from "@interfaces/contact/contact";
import { ContactResultAPI } from "@stores/domain/contact/type";

export const normalizeContactDataToAPI = (
  state: ContactValues
): ContactResultAPI => {
  return {
    agreement: state.contact.agreement,
    browser: state.contact.browser,
    content: state.contact.content,
    email: state.contact.email,
    facility_name: state.contact.facilityName,
    gov_business_owner: state.contact.govBusinessOwner,
    os: state.contact.os,
    overview: state.contact.overview,
    responsible_name: state.contact.responsibleName,
    userAgent: state.contact.userAgent
  };
};
