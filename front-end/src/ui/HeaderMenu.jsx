import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ButtonIcon from "./ButtonIcon";
import Logout from "../features/authentication/Logout";
import { HiOutlineUser } from "react-icons/hi2";
import DarkModwToggle from "./DarkModwToggle";

const StyledHeaderMenu = styled.div`
  display: flex;
  gap: 0.4rem;

  list-style: none;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModwToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
