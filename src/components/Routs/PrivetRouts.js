import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { authSelectors } from "redux/authorization";

export function PrivateRoute({ children, redirectTo = "/", ...routeProps }) {
  const isLogged = useSelector(authSelectors.getLogged);
  return (
    <Route {...routeProps}>
      {isLogged ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}
