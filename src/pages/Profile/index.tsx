import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, store } from "../../Config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Card,
  CardUserProfile,
  ConsumptionContainer,
  ContainerCardsConsumption,
  DivImg,
  Img,
  InputsContainer,
  MainContainer,
  Overlay,
  ModalContent
} from "./styles";
import userImageNoImage from '../../assets/noimage.png'; 
import Header from "../../components/Header";
import { Button } from "../Login/styles";

interface Consumption {
  type: string;
  quantity: string;
  unit: string;
  date: string;
}

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(userImageNoImage); 
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consumptionType, setConsumptionType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [consumptions, setConsumptions] = useState<Consumption[]>([]);

  const storage = getStorage(); // Instância do Firebase Storage

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

          setPhoto(userData.photo || userImageNoImage);
          setConsumptions(userData.consumption || []);
        } else {
          console.log("Usuário não encontrado!");
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSaveConsumption = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("Usuário não autenticado!");
      return;
    }

    if (!consumptionType || !quantity || !date) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const userRef = doc(store, "users", currentUser.uid);
    const unit = consumptionType === "energia" ? "kWh" : consumptionType === "lixo" ? "kg" : "litros";

    const newConsumption = {
      type: consumptionType,
      quantity: quantity,
      unit: unit,
      date: date,
    };

    try {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const existingConsumption = Array.isArray(userData.consumption) ? userData.consumption : [];

        await updateDoc(userRef, {
          consumption: [...existingConsumption, newConsumption],
        });

        alert("Consumo salvo com sucesso!");
        setIsModalOpen(false);
        setConsumptions([...existingConsumption, newConsumption]);
      }
    } catch (error) {
      console.error("Erro ao salvar o consumo:", error);
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("Usuário não autenticado!");
      return;
    }

    try {
      const storageRef = ref(storage, `users/${currentUser?.uid}/profile.jpg`);

      await uploadBytes(storageRef, file);
      console.log("Imagem carregada com sucesso!");

      const downloadURL = await getDownloadURL(storageRef);
      setPhoto(downloadURL); //foto no estado

      const userRef = doc(store, "users", currentUser.uid);
      await updateDoc(userRef, {
        photo: downloadURL,
      });
      console.log("Foto de perfil atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
    }
  };

  const renderIcon = (type: any) => {
    switch (type) {
      case "agua":
        return "💧"; 
      case "energia":
        return "⚡"; 
      case "lixo":
        return "🗑️";
      default:
        return "";
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
              <button onClick={handleSaveConsumption}>Salvar</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>Editar</button>
            )}
          </InputsContainer>

       
          <Button onClick={() => document.getElementById('upload-image')?.click()}>Editar Imagem</Button>
          <input
            type="file"
            id="upload-image"
            style={{ display: 'none' }}
            onChange={handleUploadImage}
          />
        </CardUserProfile>

        <ConsumptionContainer>
          <h3>Consumos</h3>
          <button onClick={() => setIsModalOpen(true)}>Novo Consumo</button>

          <ContainerCardsConsumption>
            {consumptions.map((consumption: any, index) => (
              <Card key={index}>
                <h4>{renderIcon(consumption.type)} {consumption.type}</h4>
                <p>{consumption.quantity} {consumption.unit}</p>
                <p>{consumption.date}</p>
              </Card>
            ))}
          </ContainerCardsConsumption>
        </ConsumptionContainer>
      </MainContainer>

      {isModalOpen && (
        <Overlay>
          <ModalContent>
            <h3>Adicionar Consumo</h3>
            <label>Tipo:</label>

            <select onChange={(e) => setConsumptionType(e.target.value)}>
              <option value="">Selecione</option>
              <option value="agua">Água</option>
              <option value="energia">Energia</option>
              <option value="lixo">Lixo</option>
            </select>

            <label>Quantidade ({consumptionType === "energia" ? "kWh" : consumptionType === "lixo" ? "kg" : "litros"}):</label>
            <input type="number" onChange={(e) => setQuantity(e.target.value)} />
            <label>Data:</label>
            <input type="date" onChange={(e) => setDate(e.target.value)} />

            <button onClick={handleSaveConsumption}>Salvar</button>
            <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
          </ModalContent>
        </Overlay>
      )}
    </>
  );
};

export default UserProfile;
