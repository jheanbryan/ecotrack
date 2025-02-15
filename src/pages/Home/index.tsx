import { useEffect, useState, useContext } from "react";
//import { useNavigate } from "react-router-dom";
import { auth } from "../../Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { store } from "../../Config/firebase"; // Certifique-se de importar corretamente
import {
  MainContainer,
  DashboardCard,
  Title,
  ChartContainer,
  FlexCol,
} from "./styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
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
            day: item.date,
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
          {Object.keys(groupedData).map((type) => (
            <DashboardCard key={type}>
              <h3>Consumo de {type}</h3>

              <ChartContainer>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={groupedData[type]}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#ccc" />
                    <Line
                      type="monotone"
                      dataKey="consumo"
                      stroke={
                        type === "energia"
                          ? "#FF5733"
                          : type === "agua"
                          ? "#3498DB"
                          : "#2ECC71"
                      }
                      strokeWidth={1}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </DashboardCard>
          ))}
        </FlexCol>
      </MainContainer>
    </>
  );
};

export default Dashboard;
