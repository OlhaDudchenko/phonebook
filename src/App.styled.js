import styled from "@emotion/styled";

export const AppWrapper = styled.div`
  color: ${({ pathname, theme }) =>
    pathname !== "/contacts" ? theme.colors.dark : theme.colors.textColor};
  background-image: url("${({ pathname, theme }) =>
    pathname !== "/contacts" ? theme.homeSrc : theme.src}");
  background-size: ${({ pathname, theme }) =>
    pathname !== "/contacts" ? theme.BackgroundSize : theme.size};
  background-repeat: ${(props) => props.theme.BackgroundRepeat};
  background-position: ${({ pathname, theme }) =>
    pathname !== "/contacts" ? theme.BackgroundPosition : theme.position};
  background-color: ${(props) => props.theme.colors.BackgroundColor};
  height: 100vh;
  width: 100%;
`;
