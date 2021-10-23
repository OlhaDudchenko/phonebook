import { StyledNavLink } from "../Navigation/Navigation.styled";

export function AuthNav() {
  return (
    <>
      <StyledNavLink
        exact
        to="/register"
        activeStyle={{
          fontWeight: "bold",
          borderBottom: "1px solid",
        }}
      >
        Register
      </StyledNavLink>
      <StyledNavLink
        to="/login"
        activeStyle={{
          fontWeight: "bold",
          borderBottom: "1px solid",
        }}
      >
        Login
      </StyledNavLink>
    </>
  );
}
