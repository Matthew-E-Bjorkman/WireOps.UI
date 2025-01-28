import { Address } from "../Common/Address";

export interface Company {
  id: string;
  name: string;
  address: Address;
}

export interface CompanyRequest {
  name: string;
  owneremail: string;
  ownergivenname: string;
  ownerfamilyname: string;
  userid: string;
}
