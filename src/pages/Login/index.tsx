import { Button, DivDescription, DivImg, DivInput, FlexCollCenter, ForgotPassword, IconEye, Img, Input, InputIcon, Label, MainContainer } from "./styles";
import loginImg from '../../assets/icons/login.png'
import emailIcon from '../../assets/icons/email.png'
import passwordIcon from '../../assets/icons/password.png'
//import googleIcon from '../../assets/icons/google.png'
//import githubIcon from '../../assets/icons/github.png'
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import closedEyeIcon from '../../assets/icons/closedEye.png';
import openEyeIcon from '../../assets/icons/openEye.png';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, store } from "../../Config/firebase";
import { UserContext } from "../../Context/UserContext";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  
  const {
    setAuthTime,
    setExp,
    setName,
    setEmailUser,
    setPhotoURL,
    setCep,
    setAddress,
    isSessionValid,
  } = useContext(UserContext);

  const [signInWithEmailAndPassword, loading] = useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (isSessionValid()) {
      navigate("/home");
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const getUserFromFirestore = async (uid: any) => {
    const userRef = doc(store, "users", uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const result = await signInWithEmailAndPassword(email, password);
      if (result && result.user) {
        const currentUser = result.user;
        const tokenResult = await currentUser.getIdTokenResult();
        
        setAuthTime(new Date(tokenResult.authTime).getTime());
        setExp(new Date(tokenResult.expirationTime).getTime());
        setName(currentUser.displayName || "");
        setEmailUser(currentUser.email || "");
        setPhotoURL(currentUser.photoURL || "");

        const userDoc = await getUserFromFirestore(currentUser.uid);
        if (userDoc) {
          setCep(userDoc.cep || "");
          setAddress(userDoc.address || "");
        }

        localStorage.setItem("user", JSON.stringify({
          name: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          authTime: tokenResult.authTime,
          expirationTime: tokenResult.expirationTime,
          cep: userDoc?.cep || "",
          address: userDoc?.address || "",
        }));

        navigate("/home");
      } else {
        throw new Error("Falha na autenticação");
      }
    } catch (error) {
      console.error("Erro ao acessar conta:", error);
      if (error === "auth/wrong-password") {
        alert("Senha incorreta");
      } else if (error === "auth/user-not-found") {
        alert("Usuário não encontrado");
      } else {
        alert("Erro ao fazer login. Por favor, tente novamente.");
      }
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <MainContainer>
      <FlexCollCenter>
        <DivImg>
          <Img src={loginImg} alt="Login Image" />
        </DivImg>

        <DivDescription>
          <h3>Entre com seu Email</h3>
          <p>
            Monitore seus consumos, atividades diárias e receba dicas para uma vida mais sustentável.
          </p>
        </DivDescription>
      </FlexCollCenter>

      <FlexCollCenter>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="email">Email</Label>
          <DivInput>
            <Input type="email" placeholder="Email" name="email" required onChange={e => setEmail(e.target.value)} />
            <InputIcon src={emailIcon} alt="Email Icon" />
          </DivInput>

          <Label htmlFor="password">Senha</Label>
          <DivInput>
            <Input type={showPassword ? "text" : "password"} placeholder="Senha" name="password" required onChange={e => setPassword(e.target.value)} />
            <InputIcon src={passwordIcon} alt="Password Icon" />
            <IconEye
              src={showPassword ? openEyeIcon : closedEyeIcon}
              alt="Toggle password visibility"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }} 
            />
          </DivInput>

          <ForgotPassword>Esqueceu a senha?</ForgotPassword>

          <Button type="submit">Entrar</Button>
        </form>
      </FlexCollCenter>

    
      <FlexCollCenter>
      {/*
        <span>Ou entre com:</span>

        <SocialLoginContainer>
          <DivImg>
            <SocialIcon src={googleIcon} alt="Google" />
          </DivImg>

          <DivImg>
            <SocialIcon src={githubIcon} alt="Github" />
          </DivImg>
        </SocialLoginContainer>
        */}

        <div>
          Você não tem uma conta? 
          <Link to='/register'>Crie uma conta aqui</Link>
        </div>
      </FlexCollCenter>
    </MainContainer>
  );
};

export default Login;