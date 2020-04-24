import React, { useState } from "react";
import { definePermission } from "./actions";
import { PermissionContext } from "./PermissionContext";

export interface PermissionProviderProps {
  store?: any;
  children?: any;
  reducerKey?: string;
}
export const PermissionProvider = (props: PermissionProviderProps) => {
  const { store, children, reducerKey = "reactReduxPermission" } = props;

  if (!store) {
    return null;
  }

  const state: any = store.getState();
  const permissionsSelector = (state: any) =>
    state[reducerKey] && state[reducerKey].permissions;
  const isLoadedSelector = (state: any) =>
    state[reducerKey] && state[reducerKey].isLoaded;
  const [permissions, setPermissions] = useState(permissionsSelector(state));
  const [isLoaded, setIsLoaded] = useState(isLoadedSelector(state));

  store.subscribe(() => {
    const newState: any = store.getState();
    const newPermissions = permissionsSelector(newState);
    const newIsLoaded = isLoadedSelector(newState);

    if (JSON.stringify(newPermissions) !== JSON.stringify(permissions)) {
      setPermissions(newPermissions);
    }

    if (newIsLoaded !== isLoaded) {
      setIsLoaded(newIsLoaded);
    }
  });

  const hasPermission = (allowedPermissions: string[] | string) => {
    if (permissions) {
      let checkPermission = true;

      if (typeof allowedPermissions === "string") {
        return permissions.indexOf(allowedPermissions) !== -1;
      }

      allowedPermissions.forEach(ap => {
        if (permissions.indexOf(ap) === -1) {
          checkPermission = false;
        }
      });

      return checkPermission;
    }
    return false;
  };

  return (
    <PermissionContext.Provider
      value={{
        store,
        permissions,
        hasPermission,
        definePermission: (definePermissions: string[]) =>
          store.dispatch(definePermission(definePermissions)),
        isLoaded: !!isLoaded
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};
