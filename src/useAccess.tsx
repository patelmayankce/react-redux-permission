import { useContext, useMemo } from "react";
import { PermissionContext, PermissionContextProps } from "./PermissionContext";

export const useAccess = () => {
  const {
    hasPermission: checkPermission,
    definePermission,
    isLoaded
  }: PermissionContextProps = useContext(PermissionContext);

  const hasPermission = (permissions: string[] | string) => {
    return useMemo(() => checkPermission(permissions), [permissions]);
  };

  return { isLoaded, hasPermission, definePermission };
};
