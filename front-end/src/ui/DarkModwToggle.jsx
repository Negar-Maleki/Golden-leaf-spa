import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon.jsx";
import { useDarkMode } from "../context/DarkModeContext.jsx";

function DarkModwToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode} active={isDark}>
      {isDark ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}

export default DarkModwToggle;
