/**
 * [ GET or POST ] /mgr/contact
 */
export interface ContactResultAPI {
  agreement: boolean;
  browser: string;
  content: string;
  email: string;
  facility_name: string;
  gov_business_owner: string;
  os: string;
  overview: string;
  responsible_name: string;
  userAgent: string;
}

export interface ContactState {
  agreement: boolean;
  browser: string;
  content: string;
  email: string;
  facilityName: string;
  govBusinessOwner: string;
  os: string;
  overview: string;
  responsibleName: string;
  userAgent: string;
}
