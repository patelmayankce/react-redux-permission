import React, { useEffect } from "react";
import { Show, useAccess } from "react-redux-permission";

const divStyle = {
  borderBottom: "1px solid rgba(32,32,32,0.1)",
  padding: 20,
  fontSize: 20
};

const App = () => {
  const { hasPermission, definePermission, isLoaded } = useAccess();

  useEffect(() => {
    setTimeout(() => {
      definePermission(["feature:read", "feature:write"]);
    }, 2500);
    return () => {};
  }, []);

  const canRead = hasPermission("feature:read");
  const canWrite = hasPermission("feature:write");
  const canDelete = hasPermission("feature:delete");

  if (!isLoaded) return <div>LOADING...</div>;

  return (
    <div style={{ padding: 14 }}>
      <h1>React Redux Permission </h1>
      <p>RRP for conditional rendering of components and routes.</p>

      <div style={divStyle}>feature:read Access ({`${canRead}`})</div>
      <div style={divStyle}>feature:write Access ({`${canWrite}`})</div>
      <div style={divStyle}>feature:delete Access ({`${canDelete}`})</div>

      <Show when="feature:read">
        <div style={divStyle}>
          i'm visible because the user has the feature:read permission.
        </div>
      </Show>
      <Show when="feature:write">
        <div style={divStyle}>
          i'm visible because the user has the feature:write permission.
        </div>
      </Show>
      <Show
				when="feature:delete"
				fallback={<div style={divStyle}>I'm a fallback that's rendering because the user doesn't have access to feature:delete</div>}
			>
				<div style={divStyle}>i'm visible because the user has the feature:delete permission.</div>
			</Show>
    </div>
  );
};

export default App;
