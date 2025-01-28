export interface User {
  created_at: string;
  email: string;
  email_verified: boolean;
  identities: Identity[];
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
  user_id: string;
  app_metadata: AppMetadata;
  last_ip: string;
  last_login: string;
  logins_count: number;
}

export interface Identity {
  connection: string;
  provider: string;
  user_id: string;
  isSocial: boolean;
}

export interface AppMetadata {
  company_name: string;
  subscription: Subscription;
  company_id: string;
  given_name: string;
  family_name: string;
}

export interface Subscription {
  paymentMethodId: string;
  payment_method_id: string;
  customerId: string;
  customer_id: string;
  priceIds: string[];
  price_ids: string[];
  subscriptionId: string;
  subscription_id: string;
  trialDays: number;
  trial_days: number;
}

export interface UserUpdateRequest {
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  app_metadata: AppMetadata;
}
