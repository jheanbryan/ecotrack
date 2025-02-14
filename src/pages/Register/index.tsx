import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, store } from "../../Config/firebase";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  Button,
  DivDescription,
  DivImg,
  DivInput,
  FlexCollCenter,
  Img,
  Input,
  InputIcon,
  Label,
  MainContainer,
  IconEye,
  LinkText,
  DivLine
} from "./styles";

import registerImg from '../../assets/icons/login.png';
import emailIcon from '../../assets/icons/email.png';
import passwordIcon from '../../assets/icons/password.png';
import userIcon from '../../assets/icons/user.png';
import closedEyeIcon from '../../assets/icons/closedEye.png';
import openEyeIcon from '../../assets/icons/openEye.png';
import { UserContext } from "../../Context/UserContext";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 
  const { isSessionValid } = useContext(UserContext);

  const [createUserWithEmailAndPassword, loading] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword, loginLoading] = useSignInWithEmailAndPassword(auth);

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(email, password);
      
      if (!userCredential || !userCredential.user) {
        console.error("Erro: Usuário não foi criado.");
        return;
      }
  
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
  
      await setDoc(doc(store, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        cep: null,
        address: null,
        photo: null,
        consumption: [],
        createdAt: new Date(),
      });
  
      console.log("Usuário criado com sucesso! Logando agora...");
  
      const loginResult = await signInWithEmailAndPassword(email, password);
      console.log(loginResult);

      if (!loginResult || !loginResult.user) {
        console.error("Erro ao logar.");
        return;
      }

      console.log("Auth Current User:", auth.currentUser);
      console.log("Is session valid?", isSessionValid());

      navigate("/home");
  
    } catch (error) {
      console.error("Erro ao criar conta e logar:", error);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (loading || loginLoading) return <p>Carregando...</p>;

  return (
    <MainContainer>
      <FlexCollCenter>
        <DivImg>
          <Img src={registerImg} alt="Register Image" />
        </DivImg>

        <DivDescription>
          <h3>Crie sua Conta</h3>
          <p>
            Cadastre-se para monitorar seus consumos, atividades diárias e receber dicas para uma vida mais sustentável.
          </p>
        </DivDescription>
      </FlexCollCenter>

      <FlexCollCenter>
        <form onSubmit={handleSignUp}>
          <Label htmlFor="name">Nome</Label>
          <DivInput>
            <Input 
              type="text" 
              placeholder="Nome" 
              name="name" 
              required 
              value={name}
              onChange={e => setName(e.target.value)} 
            />
            <InputIcon src={userIcon} alt="User Icon" />
          </DivInput>

          <Label htmlFor="email">Email</Label>
          <DivInput>
            <Input 
              type="email" 
              placeholder="Email" 
              name="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)} 
            />
            <InputIcon src={emailIcon} alt="Email Icon" />
          </DivInput>

          <Label htmlFor="password">Senha</Label>
          <DivInput>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              name="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <InputIcon src={passwordIcon} alt="Password Icon" />
            <IconEye
              src={showPassword ? openEyeIcon : closedEyeIcon}
              alt="Toggle password visibility"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }} 
            />
          </DivInput>

          <Button type="submit" disabled={loading || loginLoading}>Cadastrar</Button>
        </form>
      </FlexCollCenter>

      <FlexCollCenter>
        <DivLine>
          <p>
            Já tem uma conta?  
            <LinkText to='/login'>Faça login aqui</LinkText>
          </p>
        </DivLine>
      </FlexCollCenter>
    </MainContainer>
  );
};

export default Register;
