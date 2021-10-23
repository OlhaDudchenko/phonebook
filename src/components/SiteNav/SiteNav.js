import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation";
import { AuthNav } from "../AuthNav/AuthNav";
import { UserMenu } from "../UserMenu/UserMenu";
import { authSelectors } from "redux/authorization";
import { Header, HeaderWrapper } from "./SiteNav.styled";

export function SiteNav() {
  const isLogged = useSelector(authSelectors.getLogged);
  const isRefreshing = useSelector(authSelectors.getIsRefreshing);
  const location = useLocation();

  return (
    <Header pathname={location.pathname}>
      <HeaderWrapper>
        <Navigation />
        {isLogged && isRefreshing && <UserMenu />}
        {isLogged ? <UserMenu /> : <AuthNav />}
      </HeaderWrapper>
    </Header>
  );
}
