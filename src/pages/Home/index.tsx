import { useEffect, useState, useContext } from "react";
//import { useNavigate } from "react-router-dom";
import { auth } from "../../Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { store } from "../../Config/firebase"; 
import {
  MainContainer,
  DashboardCard,
  Title,
  FlexCol,
  ChartContainerStyled,
} from "./styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Header from "../../components/Header";
import { UserContext } from "../../Context/UserContext";

interface ConsumptionType {
  day: string;
  consumo: number;
  type: string;
  unit: string;
}

const Dashboard = () => {
  //const navigate = useNavigate();
  const [data, setData] = useState<ConsumptionType[]>([]);

  const { name: userName } = useContext(UserContext);

  useEffect(() => {
    const fetchConsumption = async () => {
      if (!auth.currentUser) return;

      const userRef = doc(store, "users", auth.currentUser.uid);

      try {
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const consumptionData = userData.consumption || [];

          const formattedConsumption = consumptionData.map((item: any) => ({
            day: new Date(item.date).toLocaleDateString('pt-BR'),
            consumo: Number(item.quantity),
            type: item.type,
            unit: item.unit,
          }));

          setData(formattedConsumption);
        }
      } catch (error) {
        console.error("Erro ao buscar consumo:", error);
      }
    };

    fetchConsumption();
  }, []);

  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, ConsumptionType[]>);

  if (data.length === 0) {
    return (
      <>
        <Header />
        <MainContainer>
          <Title>Bem-vindo, {userName}!</Title>
          <p>
            Você ainda não cadastrou seu consumo semanal. Por favor, registre
            seus dados.
          </p>
        </MainContainer>
      </>
    );
  }

  return (
    <>
      <Header />
      <MainContainer>
        <Title>Bem-vindo, {userName}!</Title>
        <FlexCol>
          {Object.keys(groupedData).map((type) => {
            const unit = groupedData[type][0].unit;

            return (
              <DashboardCard key={type}>
                <h3>Consumo de {type} - {unit}</h3>

                <ChartContainerStyled>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                      data={groupedData[type]}
                      margin={{ left: 0, right: 5, top: 20, bottom: 20 }}
                    >
                      <XAxis dataKey="day" />
                      <YAxis />
                      <CartesianGrid />
                      <Bar
                        dataKey="consumo"
                        fill={
                          type === "energia"
                            ? "#FF5733"
                            : type === "agua"
                            ? "#3498DB"
                            : "#2ECC71"
                        }
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainerStyled>
              </DashboardCard>
            );
          })}
        </FlexCol>
      </MainContainer>
    </>
  );
};

export default Dashboard;
