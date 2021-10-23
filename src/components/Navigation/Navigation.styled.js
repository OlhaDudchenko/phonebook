import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const StyledNavLink = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  padding: 12px;
  font-weight: 500;
  color: inherit;
  font-size: 20px;
  transition: ${(props) =>
    `transform ${props.theme.transaction.time},${props.theme.transaction.timeFunction} `};
  &:hover {
    transform: scale(1.03);
  }
`;
