import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: #f5f5f5;
  padding: 1rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-50);
  background-color: var(--color-grey-0);

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.4rem;
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
