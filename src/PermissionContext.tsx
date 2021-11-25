import React from "react";

export interface PermissionContextProps {
  isLoaded: boolean;
  hasPermission: (
    allowedPermissions: string[] | string,
    orAllowedPermissions?: string[] | string
  ) => boolean;
  definePermission: (permissions: string[]) => void;
  permissions: string[];
}

const initialContext: any = {};

export const PermissionContext = React.createContext(initialContext);
