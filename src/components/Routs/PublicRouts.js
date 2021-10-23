import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { authSelectors } from "redux/authorization";

export function PublicRoute({
  children,
  restricted = false,
  redirectTo = "/",
  ...routeProps
}) {
  const isLogged = useSelector(authSelectors.getLogged);
  const shouldRedirect = isLogged && restricted;

  return (
    <Route {...routeProps}>
      {shouldRedirect ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
}
