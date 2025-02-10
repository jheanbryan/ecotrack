import styled from 'styled-components';
import { colors } from '../../styles/colors';

interface DropdownMenuProps {
    isOpen: boolean;
  }
export const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${colors.light};
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

export const Span = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.dark};
  cursor: pointer;

  &:hover {
    color: ${colors.primary};
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ProfileImageContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${colors.gray};
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DropdownMenu = styled.div<DropdownMenuProps>`
  position: absolute;
  top: 80px;
  right: 0;
  background-color: ${colors.light};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  padding: 10px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  flex-direction: column;
`;

export const MenuItem = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 8px;
  font-size: 1rem;
  color: ${colors.dark};
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray};
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const UserDetails = styled.div`
  margin-bottom: 10px;
`;

export const UserName = styled.div`
  font-weight: bold;
`;

export const UserEmail = styled.div`
  font-size: 0.9rem;
  color: ${colors.dark};
`;

export const IconMenu = styled.img`
  width: 28px;
  height: 28px;
`;