import React from "react";
import { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SiteNav } from "./components/SiteNav/SiteNav";
import { AppWrapper } from "./App.styled";
import { fetchCurrentUser } from "./redux/authorization/auth-operations";
import { PrivateRoute } from "./components/Routs/PrivetRouts";
import { PublicRoute } from "./components/Routs/PublicRouts";
import { authSelectors } from "./redux/authorization";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeView = lazy(() =>
  import("./views/HomeView" /* webpackChunkName: "home-view" */)
);

const RegisterView = lazy(() =>
  import("./views/RegisterView" /* webpackChunkName: "register-view" */)
);

const LoginView = lazy(() =>
  import("./views/LoginView" /* webpackChunkName: "login-view" */)
);

const ContactsView = lazy(() =>
  import("./views/ContactsView" /* webpackChunkName: "contacts-view" */)
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(authSelectors.getIsRefreshing);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <AppWrapper pathname={location.pathname}>
      {!isRefreshing && (
        <>
          <SiteNav />
          <Switch>
            <Suspense fallback={<p>Загружаем...</p>}>
              <PublicRoute exact path="/">
                <HomeView />
              </PublicRoute>
              <PublicRoute path="/register" restricted>
                <RegisterView />
              </PublicRoute>
              <PublicRoute path="/login" restricted redirectTo="/contacts">
                <LoginView />
              </PublicRoute>
              <PrivateRoute path="/contacts" redirectTo="/login">
                <ContactsView />
              </PrivateRoute>
            </Suspense>
          </Switch>
        </>
      )}
      <ToastContainer />
    </AppWrapper>
  );
}

export default App;
