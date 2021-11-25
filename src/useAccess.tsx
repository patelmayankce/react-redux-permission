import { useContext, useMemo } from "react";
import { PermissionContext, PermissionContextProps } from "./PermissionContext";

export const useAccess = () => {
  const {
    hasPermission: checkPermission,
    definePermission,
    isLoaded
  }: PermissionContextProps = useContext(PermissionContext);

  const hasPermission = (
    permissions: string[] | string,
    orPermissions?: string[] | string
  ) => {
    return useMemo(() => checkPermission(permissions, orPermissions), [
      permissions,
      orPermissions
    ]);
  };

  return { isLoaded, hasPermission, definePermission };
};
