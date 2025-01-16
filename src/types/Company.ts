export interface Company {
  id: string;
  name: string;
  address: Address;
}

export interface Address {
  address1: string;
  address2: string;
  city: string;
  stateProvince: string;
  country: string;
  postalCode: string;
}

export interface CompanyRequest {
  name: string;
  owneremail: string;
  ownergivenname: string;
  ownerfamilyname: string;
  userid: string;
}
