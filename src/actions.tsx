export const DEFINE_PERMISSIONS = "@@RRP:DEFINE_PERMISSIONS";
export const RESET_PERMISSIONS = "@@RRP:RESET_PERMISSIONS";

export interface PermissionSchema {
  isLoaded: boolean;
  permissions: string[];
}

export const definePermission = (payload: string[]) => ({
  type: DEFINE_PERMISSIONS,
  payload
});

export const resetPermission = () => ({
  type: RESET_PERMISSIONS,
  payload: {}
});
