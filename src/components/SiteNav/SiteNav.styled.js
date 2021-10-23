import styled from "@emotion/styled";

export const Header = styled.header`
  background-color: ${({ pathname, theme }) => {
    if (pathname === "/contacts") {
      return theme.colors.transparent;
    } else {
      return theme.colors.BackgroundColor;
    }
  }};
`;

export const HeaderWrapper = styled.div`
  padding: 0 70px;
  display: flex;
  align-items: baseline;
`;
