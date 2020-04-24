import React, { useContext } from "react";
import { PermissionContext, PermissionContextProps } from "./PermissionContext";

interface ShowProps {
  when?: string | string[];
  fallback?: any;
  children?: any;
}

export const Show = ({ when = "", fallback, children, ...rest }: ShowProps) => {
  const { hasPermission }: PermissionContextProps | any = useContext(
    PermissionContext
  );

  const show = hasPermission(when);

  if (show) {
    // pass any other props to the children below.. this is needed for things like wrapping <Menu.Item /> components
    return React.Children.map(children, child =>
      React.cloneElement(child, rest)
    );
  }

  return fallback || null;
};
