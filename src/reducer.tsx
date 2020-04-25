import {
  PermissionSchema,
  RESET_PERMISSIONS,
  DEFINE_PERMISSIONS
} from "./actions";

const initialState: PermissionSchema = {
  isLoaded: false,
  permissions: []
};

export const getInitialState = () => JSON.parse(JSON.stringify(initialState));

export const permissionsReducer = (
  state = getInitialState(),
  action: any
) => {
  switch (action.type) {
    case DEFINE_PERMISSIONS:
      return Object.assign({}, state, {
        isLoaded: true,
        permissions: action.payload,
      });
    case RESET_PERMISSIONS:
      return getInitialState();
    default:
      return state;
  }
};
