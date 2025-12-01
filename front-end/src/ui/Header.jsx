import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #f5f5f5;
  padding: 1rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-50);
  background-color: var(--color-grey-0);
`;

function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;
