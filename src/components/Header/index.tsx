import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, store } from "../../Config/firebase"; // Importando Firebase
import userImg from "../../assets/jotaro.png";
import {
  DropdownMenu,
  HeaderContainer,
  IconMenu,
  LinkButton,
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
import settingIcon from '../../assets/icons/settings.png';
import logoutIcon from '../../assets/icons/logout.png';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Carregando...");
  const [userEmail, setUserEmail] = useState("Carregando...");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser; // Pegando usuário autenticado
      
      if (currentUser) {
        const userRef = doc(store, "users", currentUser.uid); // Referência ao Firestore
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserName(userSnap.data().name);
          setUserEmail(userSnap.data().email);
        } else {
          console.log("Usuário não encontrado no Firestore!");
        }
      }
    };

    fetchUserData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <HeaderContainer>
      <Nav>
        <LinkButton to='/home'>
          <Span>Home</Span>
        </LinkButton>

        <LinkButton to='/tipes'>
          <Span>Dicas</Span>
        </LinkButton>
      </Nav>

      <ProfileContainer>
        <ProfileImageContainer onClick={toggleMenu}>
          <ProfileImage src={userImg} alt="User Profile" />
        </ProfileImageContainer>

        <DropdownMenu $isOpen={isMenuOpen}>

          <UserDetails>
            <UserName>{userName}</UserName>
            <UserEmail>{userEmail}</UserEmail>
          </UserDetails>

          <MenuItem>
            <LinkButton to='/profile'>
              <IconMenu src={settingIcon} alt="" />
              Configurações
            </LinkButton>
          </MenuItem>
          <MenuItem>
            <LinkButton to='/logout'>
              <IconMenu src={logoutIcon} alt="" />
              Sair
            </LinkButton>
          </MenuItem>
        </DropdownMenu>
      </ProfileContainer>
    </HeaderContainer>
  );
};

export default Header;
