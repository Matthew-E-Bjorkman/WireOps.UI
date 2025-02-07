export interface Staffer {
  id: string;
  company_id: string;
  email: string;
  user_id: string;
  given_name: string;
  family_name: string;
  is_owner: boolean;
  role_id: string;
}

export interface StafferGetParams {
  id: string;
  company_id: string;
}
