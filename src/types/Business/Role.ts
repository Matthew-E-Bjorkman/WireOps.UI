export interface Role {
  id: string;
  company_id: string;
  name: string;
  is_admin: boolean;
  is_owner_role: boolean;
  permissions: Permission[];
}

export interface Permission {
  resource: string;
  action: string;
}

export interface RoleGetParams {
  id: string;
  company_id: string;
}

export enum Resources {
  //Business
  companies = "companies",
  roles = "roles",
  staffers = "staffers",
  //Inventory
  items = "items",
}

export enum Actions {
  read = "read",
  write = "write",
}
