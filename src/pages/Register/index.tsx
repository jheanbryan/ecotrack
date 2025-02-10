import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Config/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
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
  SocialIcon,
  SocialLoginContainer,
  IconEye
} from "./styles";

import registerImg from '../../assets/icons/login.png';
import emailIcon from '../../assets/icons/email.png';
import passwordIcon from '../../assets/icons/password.png';
import userIcon from '../../assets/icons/user.png';
import googleIcon from '../../assets/icons/google.png';
import githubIcon from '../../assets/icons/github.png';
import closedEyeIcon from '../../assets/icons/closedEye.png';
import openEyeIcon from '../../assets/icons/openEye.png';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const [
    createUserWithEmailAndPassword,
    loading,
  ] = useCreateUserWithEmailAndPassword(auth);

  const handleSignOut = async(e: any) => {
    try {
      e.preventDefault()
      await createUserWithEmailAndPassword(email, password);
      navigate("/home");

    } catch (error) {
      console.error("Erro ao criar conta:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (loading) 
    return <p>Carregando...</p>;

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
        <Label htmlFor="name">Nome</Label>
        <DivInput>
          <Input type="text" placeholder="Nome" name="name" required />
          <InputIcon src={userIcon} alt="User Icon" />
        </DivInput>

        <Label htmlFor="email">Email</Label>
        <DivInput>
          <Input type="email" placeholder="Email" name="email" required onChange={e => setEmail(e.target.value)} />
          <InputIcon src={emailIcon} alt="Email Icon" />
        </DivInput>

        <Label htmlFor="password">Senha</Label>
        <DivInput>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            name="password"
            required
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

        <Button onClick={handleSignOut}>Cadastrar</Button>
      </FlexCollCenter>

      <FlexCollCenter>
        <span>Ou cadastre-se com:</span>

        <SocialLoginContainer>
          <DivImg>
            <SocialIcon src={googleIcon} alt="Google" />
          </DivImg>
          <DivImg>
            <SocialIcon src={githubIcon} alt="Github" />
          </DivImg>
        </SocialLoginContainer>

        <div>
          Já tem uma conta?
          <Link to='/login'>Entre aqui</Link>
        </div>
      </FlexCollCenter>
    </MainContainer>
  );
};

export default Register;
