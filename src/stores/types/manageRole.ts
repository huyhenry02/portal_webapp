export type IPermissionCommon = {
  id: string;
  name: string;
  description: string;
  enable: boolean;
};

export type IListPermissionsCommon = {
  description: string;
  name: string;
  permissions: IPermissionCommon[];
}[];

export type IListPermissionsResponseCommon = {
  description: string;
  name: string;
  permissions: IPermissionResponseCommon[];
  meta: object;
}[];

export type IPermissionResponseCommon = {
  id: string;
  name: string;
  description: string;
  in_role: boolean;
};
