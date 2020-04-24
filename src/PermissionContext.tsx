import React from "react";

export interface PermissionContextProps {
  store?: any;
  isLoaded?: boolean;
  hasPermission?: (allowedPermissions: string[] | string) => boolean;
  definePermission?: (permissions: string[]) => void;
  permissions?: string[];
}

const initialContext: PermissionContextProps = {};

export const PermissionContext = React.createContext(initialContext);
