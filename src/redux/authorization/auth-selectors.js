export const getLogged = (state) => state.auth.isLoggedIn;
export const getUserName = (state) => state.auth.user.name;
export const token = (state) => state.auth.token;
export const logout = (state) => state.auth.isLogout;
