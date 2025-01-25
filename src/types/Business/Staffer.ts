export interface Staffer {
  id: string;
  company_id: string;
  email: string;
  user_id: string;
  given_name: string;
  family_name: string;
}

export interface StafferGetParams {
  id: string;
  company_id: string;
}

export interface StafferRequest {
  company_id: string;
  email: string;
  given_name: string;
  family_name: string;
}

export interface StafferLinkToUserRequest {
  id: string;
  company_id: string;
  user_id: string;
}
