import { Card, CardUserProfile, ConsumptionContainer, ContainerCardsConsumption, DivImg, Img, InputsContainer, MainContainer } from "./styles";
import userImage from '../../assets/jotaro.png'
import Header from "../../components/Header";

const UserProfile = () => {

  return (
    <>
    <Header />
    <MainContainer>
        <CardUserProfile>
          <h3>Perfil de usuário</h3>

            <DivImg>
                <Img src={userImage} alt="Imagem do usuario" />
            </DivImg>


            <InputsContainer>
                <label htmlFor="">Nome:</label>
                <input type="text" placeholder="Nome"/>

                <label htmlFor="">Email:</label>
                <input type="email" placeholder="Email"/>

                <label htmlFor="">CEP:</label>
                <input type="text" placeholder="Cep"/>

                <label htmlFor="">Endereço:</label>
                <input type="text" placeholder="Endereço"/>

                <button>Salvar</button>
            </InputsContainer>
        </CardUserProfile>


        <ConsumptionContainer>
          <h3>Consumos</h3>

          <button>Novo Consumo</button>

          <ContainerCardsConsumption>
            <Card>
              <span>💧</span>
              <span>Consumo de Água</span>
              <span>10 kw</span>
              <span>20/01/2024</span>
            </Card>
          </ContainerCardsConsumption>
        </ConsumptionContainer>
    </MainContainer>
    </>
  )
};

export default UserProfile;