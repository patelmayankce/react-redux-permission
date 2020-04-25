# react-redux-permission

> React Redux Permission controls rendering of permission components & routes using redux.

[![NPM](https://img.shields.io/npm/v/react-redux-permission.svg)](https://www.npmjs.com/package/react-redux-permission) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-redux-permission
```

## Features
- Restrict views and components
- Provide a fallback component for users without permission
- Designed for react-redux
- SSR Support
- Hooks support


## Usage

### Reducer

```tsx
import { createStore, compose } from 'redux';
import { combineReducers } from "redux";
import { permissionsReducer as permissions } from "react-redux-permission";

export const configureStore = (initialState = {}) => {
  return createStore(
    combineReducers({
      permissions,
    }), initialState,);
}
```

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

  if (!isLoaded) return <div>LOADING...</div>;

  return (
    <div>
      <div>feature:read Access ({`${canRead}`})</div>
      <div>feature:write Access ({`${canWrite}`})</div>
      <Show when="feature:read">
        <div>i'm visible because the user has the feature:read permission.</div>
      </Show>
      <Show
        when="feature:write"
        fallback={
          <div>I'm a fallback that's rendering because the user doesn't have access to feature:delete</div>
        }
      >
        <div>i'm visible because the user has the feature:delete permission.</div>
      </Show>
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <PermissionProvider store={store} reducerKey="permissions">
      <App />
    </PermissionProvider>
  </Provider>,
  document.getElementById("root")
);
```

## API Reference

### PermissionProvider

By Wrapping up your application with `<PermissionProvider />`, all your  hierarchy components will have ability to work with react-redux-permission.

```tsx
import { PermissionProvider } from "react-redux-permission";

<PermissionProvider store={store} reducerKey="permission">
  <App />
</PermissionProvider>
```

Has 2 available props

|    params    |   value  |             default value            |   description    |
|:------------:|:--------:|:------------------------------------:|:----------------:|
|    store  |  object  |               REQUIRED               | Redux store object. |
|    reducerKey  |  string  |               permissionsReducer               | State key of your reducer. |

### Show

A Component can be use when want to render something conditionally, you can pass permission(s) into `when` prop.

```tsx
import { Show } from "react-redux-permission";

<Show
  when="feature:delete"
  fallback={
    <div>user doesn't have permission to feature:delete</div>
  }
>
  <div>user have feature:delete permission.</div>
</Show>
```

Has 2 available props

|    params    |   value  |             default value            |   description    |
|:------------:|:--------:|:------------------------------------:|:----------------:|
|    when  |  string / array  |               REQUIRED               | The permission(s) we want to check against. |
|    fallback  |  ReactNode  |               -               | What to render when the user doesn't have access. |

### useAccess

A hook gives you access to `PermissionContext` context.

#### isLoaded

isLoaded will be false if `definePermission` has never been called. Once `definePermission` is called we assume isLoaded is true. This flag can be used to prevent loading the app until permissions have been fetched and loaded.

```tsx
definePermission(["feature:read", "feature:write"]);
```

you can use action too, to define permissions through redux as below.

```tsx
import { definePermission as define } from "./actions";

import { useDispatch } from 'react-redux';

export const ExampleComponent = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(define(["feature:read", "feature:write"]))
  },[])

  return <div>example component</div>
}
```

#### hasPermission

```tsx
const canRead = hasPermission("feature:read");
const canWrite = hasPermission("feature:write");
const canDelete = hasPermission("feature:delete");
```

## License

MIT © [patelmayankce](https://github.com/patelmayankce)
