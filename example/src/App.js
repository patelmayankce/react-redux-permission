import React, { useContext, useEffect } from "react";
import { PermissionContext, Show } from "react-redux-permission";

const divStyle = {
  borderBottom: "1px solid rgba(32,32,32,0.1)",
  padding: 20,
  fontSize: 20
};

const App = () => {
  const { hasPermission, definePermission, isLoaded } = useContext(
    PermissionContext
  );

  useEffect(() => {
    setTimeout(() => {
      definePermission(["todos:read", "todos:write"]);
    }, 2500);
    return () => {};
  }, [definePermission]);

  const canRead = hasPermission("todos:read");
  const canWrite = hasPermission("todos:write");
  const canDelete = hasPermission("todos:delete");

  if (!isLoaded) return <div>LOADING...</div>;

  return (
    <div style={{ padding: 14 }}>
      <h1>React Redux Permission </h1>
      <p>RRP for conditional rendering of components and routes.</p>

      <div style={divStyle}>Can Access: todos:read ({`${canRead}`})</div>
      <div style={divStyle}>Can Access: todos:write ({`${canWrite}`})</div>
      <div style={divStyle}>Can Access: todos:delete ({`${canDelete}`})</div>

      <Show when="todos:read">
        <div style={divStyle}>
          i'm visible because the user has the todos:read permission.
        </div>
      </Show>
      <Show when="todos:write">
        <div style={divStyle}>
          i'm visible because the user has the todos:write permission.
        </div>
      </Show>
      <Show
				when="todos:delete"
				fallback={<div style={divStyle}>I'm a fallback that's rendering because the user doesn't have access to todos:delete</div>}
			>
				<div style={divStyle}>i'm visible because the user has the todos:delete permission.</div>
			</Show>
    </div>
  );
};

export default App;
