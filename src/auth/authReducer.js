import { RESET_STATES, USER_LOGIN, USER_LOGOUT, CARRITO } from "./actions";

const reducer = (state, { type, payload }) => {
  const setState = (payload) => {
    return Object.assign({}, state, {
      ...payload,
    });
  };

  switch (type) {
    case RESET_STATES:
      return setState({});
    case USER_LOGIN:
      return setState({
        isUserLoggedIn: true,
        userData: payload,
      });
    case USER_LOGOUT:
      return setState({
        isUserLoggedIn: false,
        userData: undefined,
      });
    case CARRITO:
      return setState({
        carrito: payload,
      });
    default:
      return state;
  }
};

export default reducer;
