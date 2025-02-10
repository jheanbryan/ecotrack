import { useState } from "react";
import userImg from "../../assets/jotaro.png";
import {
  DropdownMenu,
  HeaderContainer,
  IconMenu,
  MenuItem,
  Nav,
  ProfileContainer,
  ProfileImage,
  ProfileImageContainer,
  Span,
  UserDetails,
  UserEmail,
  UserName,
} from "./styles";
import settingIcon from '../../assets/icons/settings.png'
import logoutIcon from '../../assets/icons/logout.png'
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Span>Home</Span>
        <Span>Dicas</Span>
      </Nav>

      <ProfileContainer>
        <ProfileImageContainer onClick={toggleMenu}>
          <ProfileImage src={userImg} alt="User Profile" />
        </ProfileImageContainer>

        <DropdownMenu isOpen={isMenuOpen}>
          <UserDetails>
            <UserName>Jotaro Kujo</UserName>
            <UserEmail>jotaro@joestar.com</UserEmail>
          </UserDetails>

          <MenuItem>
            <Link to='/profile'>
              <IconMenu src={settingIcon} alt="" />
              Configurações
            </Link>
          </MenuItem>
          <MenuItem>
          <Link to='/logout'>
            <IconMenu src={logoutIcon} alt="" />
            Sair
          </Link>
          </MenuItem>
        </DropdownMenu>
      </ProfileContainer>
    </HeaderContainer>
  );
};

export default Header;
