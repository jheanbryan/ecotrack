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
      icon: "⚡",
    },
    {
      id: 2,
      text: "Evite desperdício de água, tomando banhos mais curtos e consertando vazamentos.",
      condition: consumption.some(item => item.type === "agua") && consumption.some(item => Number(item.quantity) > 110),
      icon: "💧", 
    },
    {
      id: 3,
      text: "Você está gastando muito com lixo! Tente reduzir, reutilizar e reciclar mais.",
      condition: consumption.some(item => item.type === "lixo") && consumption.some(item => Number(item.quantity) > 5),
      icon: "🗑", 
    },
    {
      id: 4,
      text: "Está consumindo mais de 3 kWh de energia? Tente adotar práticas mais eficientes.",
      condition: consumption.some(item => item.type === "energia") && consumption.some(item => Number(item.quantity) > 3),
      icon: "🔋",
    },
    {
      id: 5,
      text: "Considere instalar painéis solares para reduzir o consumo de energia elétrica.",
      condition: consumption.some(item => item.type === "energia") && consumption.some(item => Number(item.quantity) > 100),
      icon: "🌞", 
    },
    {
      id: 6,
      text: "Use economizadores de água em torneiras e chuveiros para reduzir o consumo diário.",
      condition: consumption.some(item => item.type === "agua") && consumption.some(item => Number(item.quantity) > 80),
      icon: "🚿", 
    },
    {
      id: 7,
      text: "Pratique a compostagem para reduzir o desperdício de alimentos e melhorar a qualidade do solo.",
      condition: consumption.some(item => item.type === "lixo") && consumption.some(item => Number(item.quantity) > 5),
      icon: "🌱", 
    },
    {
      id: 8,
      text: "Evite o uso de plásticos descartáveis e opte por alternativas reutilizáveis.",
      condition: consumption.some(item => item.type === "lixo") && consumption.some(item => Number(item.quantity) > 2),
      icon: "♻️",
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
                <p>{tip.icon} {tip.text}</p> 
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
