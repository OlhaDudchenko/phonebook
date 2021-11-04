import React, { useEffect } from "react";
import { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SiteNav } from "./components/SiteNav/SiteNav";
import { AppWrapper } from "./App.styled";
import { PrivateRoute } from "./components/Routs/PrivetRouts";
import { PublicRoute } from "./components/Routs/PublicRouts";
import { useFetchCurrentUserQuery } from "redux/authorization/auth";
import { authSelectors } from "./redux/authorization";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { refreshCredentials } from "redux/authorization/authSlice";
import Loader from "react-loader-spinner";

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
  const token = useSelector(authSelectors.token);

  const location = useLocation();
  const { data, isFetching } = useFetchCurrentUserQuery(token, {
    skip: token === null,
  });

  useEffect(() => {
    (async () => {
      await data;
      if (data) {
        dispatch(refreshCredentials(data));
      }
    })();
  }, [data, dispatch]);

  return (
    <AppWrapper pathname={location.pathname}>
      <>
        {!isFetching && (
          <>
            <SiteNav />
            <Switch>
              <Suspense
                fallback={
                  <Loader
                    type="ThreeDots"
                    color="rgb(255, 222, 173)"
                    height={80}
                    width={80}
                  />
                }
              >
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
      </>
    </AppWrapper>
  );
}

export default App;
