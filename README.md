# react-redux-permission

> React Redux Permission

[![NPM](https://img.shields.io/npm/v/react-redux-permission.svg)](https://www.npmjs.com/package/react-redux-permission) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-redux-permission
```

## Usage

```tsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { configureStore } from "./redux/store";
import { Provider } from "react-redux";
import { PermissionProvider, Show, useAccess } from "react-redux-permission";

const store = configureStore();

const App = () => {
  const { hasPermission, definePermission, isLoaded } = useAccess();

  useEffect(() => {
    definePermission(["feature:read", "feature:write"]);
  }, []);

  const canRead = hasPermission("feature:read");
  const canWrite = hasPermission("feature:write");
  const canDelete = hasPermission("feature:delete");

  if (!isLoaded) return <div>LOADING...</div>;

  return (
    <div>
      <div>feature:read Access ({`${canRead}`})</div>
      <div>feature:write Access ({`${canWrite}`})</div>
      <div>feature:delete Access ({`${canDelete}`})</div>
      <Show when="feature:read">
        <div>i'm visible because the user has the feature:read permission.</div>
      </Show>
      <Show when="feature:write">
        <div>
          i'm visible because the user has the feature:write permission.
        </div>
      </Show>
      <Show
        when="feature:delete"
        fallback={
          <div>
            I'm a fallback that's rendering because the user doesn't have access
            to feature:delete
          </div>
        }
      >
        <div>
          i'm visible because the user has the feature:delete permission.
        </div>
      </Show>
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <PermissionProvider store={store} reducerKey="permission">
      <App />
    </PermissionProvider>
  </Provider>,
  document.getElementById("root")
);
```

## License

MIT © [patelmayankce](https://github.com/patelmayankce)
