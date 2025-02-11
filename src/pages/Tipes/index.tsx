import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { MainContainer, Title, TipsContainer, TipCard } from "./styles";
import Header from "../../components/Header";

const Tipes = () => {
  const { consumption } = useContext(UserContext); 

  const tips = [
    {
      id: 1,
      text: "Reduza o consumo de energia utilizando lâmpadas LED e desconectando aparelhos eletrônicos quando não estiverem em uso.",
      condition: consumption.some(item => item.type === "energia") && consumption.some(item => Number(item.quantity) > 50),
    },
    {
      id: 2,
      text: "Evite desperdício de água, tomando banhos mais curtos e consertando vazamentos.",
      condition: consumption.some(item => item.type === "agua") && consumption.some(item => Number(item.quantity) > 100),
    },
    {
      id: 3,
      text: "Procure usar transporte público ou caronas para reduzir a emissão de gases poluentes.",
      condition: consumption.some(item => item.type === "transporte") && consumption.some(item => Number(item.quantity) > 30),
    },
    {
      id: 4,
      text: "Compre produtos com menos embalagens plásticas e recicle sempre que possível.",
      condition: true, 
    },
  ];

  const relevantTips = tips.filter(tip => tip.condition);

  return (
    <>
      <Header />
      <MainContainer>
        <Title>Dicas Sustentáveis:</Title>

        <TipsContainer>
          {relevantTips.length > 0 ? (
            relevantTips.map(tip => (
              <TipCard key={tip.id}>
                <p>{tip.text}</p>
              </TipCard>
            ))
          ) : (
            <p>Sem dicas personalizadas no momento. Continue registrando seu consumo para mais sugestões!</p>
          )}
        </TipsContainer>
      </MainContainer>
    </>
  );
};

export default Tipes;
