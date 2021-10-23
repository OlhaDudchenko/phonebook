export const getLogged = (state) => state.authorization.isLoggedIn;
export const getUserName = (state) => state.authorization.user.name;
export const getIsRefreshing = (state) =>
  state.authorization.isRefreshCurrentUser;
