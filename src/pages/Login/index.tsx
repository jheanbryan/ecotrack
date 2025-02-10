import { Button, Description, DivDescription, DivImg, DivInput, FlexCollCenter, ForgotPassword, Img, Input, InputArea, MainContainer, Others } from "./styles";
import loginImg from '../../assets/icons/login.png'
import emailIcon from '../../assets/icons/email.png'
import passwordIcon from '../../assets/icons/password.png'
import googleIcon from '../../assets/icons/google.png'
import githubIcon from '../../assets/icons/github.png'

const Login = () => {

  return (
    <MainContainer>
      <FlexCollCenter>
        <DivImg>
          <Img
          src={loginImg}
          alt="Login Image"
          />
        </DivImg>

        <DivDescription>
          <h3>Entre com seu Email</h3>
          <p>
            Monitore seus consumos, atividades diárias e receba dicas spara uma vida mais sustentável.
          </p>
        </DivDescription>
      </FlexCollCenter>


      <FlexCollCenter>
        <DivInput>
          <Input type="email" placeholder="Email"/>
          <Img
          src={emailIcon}
          alt="Login Image"
          />
        </DivInput>

        <DivInput>
        <Input type="paassword" placeholder="Senha"/>
          <Img
          src={passwordIcon}
          alt="Login Image"
          />
        </DivInput>

        <ForgotPassword>
          Esqueceu a senha?
        </ForgotPassword>

        <Button>
          Entrar
        </Button>
      </FlexCollCenter>

      <FlexCollCenter>
        <span>Ou entre com:</span>

        <div>
          <DivImg>
            <Img
            src={googleIcon}
            alt="Google"
            />
          </DivImg>

          <DivImg>
            <Img
            src={githubIcon}
            alt="Github"
            />
          </DivImg>
        </div>
      </FlexCollCenter>
    </MainContainer>
  )
};

export default Login;