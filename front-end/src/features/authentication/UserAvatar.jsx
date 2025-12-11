import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;
function UserAvatar() {
  const { user } = useUser();

  const getAvatarUrl = (avatar) => {
    if (!avatar)
      return `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(
        user?.name || "User"
      )}`;
    if (avatar.startsWith("http")) return avatar;
    return `http://localhost:5000${avatar}`;
  };

  return (
    <StyledUserAvatar>
      <Avatar src={getAvatarUrl(user?.avatar)} alt="User Avatar" />
      <span>{user?.name || "User"}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
