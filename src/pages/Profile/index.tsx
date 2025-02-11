import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, store } from "../../Config/firebase";
import { 
  Card, 
  CardUserProfile, 
  ConsumptionContainer, 
  ContainerCardsConsumption, 
  DivImg, 
  Img, 
  InputsContainer, 
  MainContainer 
} from "./styles";
import userImage from '../../assets/jotaro.png';
import Header from "../../components/Header";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(userImage);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userRef = doc(store, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setName(userData.name || "");
          setEmail(userData.email || currentUser.email);
          setCep(userData.cep || "");
          setAddress(userData.address || "");
          setPhoto(userData.photo || userImage);
        } else {
          console.log("Usuário não encontrado!");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = doc(store, "users", currentUser.uid);
      try {
        await updateDoc(userRef, {
          name,
          cep,
          address,
        });
        alert("Dados atualizados com sucesso!");
        setIsEditing(false);
      } catch (error) {
        console.error("Erro ao atualizar os dados: ", error);
      }
    }
  };

  return (
    <>
      <Header />
      <MainContainer>
        <CardUserProfile>
          <h3>Perfil de usuário</h3>

          <DivImg>
            <Img src={photo} alt="Imagem do usuário" />
          </DivImg>

          <InputsContainer>
            <label>Nome:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} readOnly={!isEditing} />

            <label>Email:</label>
            <input type="email" value={email} readOnly />

            <label>CEP:</label>
            <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} readOnly={!isEditing} />

            <label>Endereço:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} readOnly={!isEditing} />

            {isEditing ? (
              <button onClick={handleSave}>Salvar</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>Editar</button>
            )}
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
  );
};

export default UserProfile;
