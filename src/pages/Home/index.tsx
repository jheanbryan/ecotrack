import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Config/firebase";
import { MainContainer, DashboardCard, FlexRow, Title, ChartContainer } from "./styles";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Header from "../../components/Header";
import { UserContext } from "../../Context/UserContext"; 

interface ConsumptionType {
  day: string; 
  consumo: number; 
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ConsumptionType[]>([]); 

  const { consumption, name: userName } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate("/");
      }
    });

    
    const formattedConsumption = consumption.map((item: any) => ({
      day: item.day, 
      consumo: item.consumo,
    }));

    setData(formattedConsumption); 

    return () => unsubscribe();
  }, [navigate, consumption]);

  if (data.length === 0) {
    return (
      <>
        <Header />
        <MainContainer>
          <Title>Bem-vindo, {userName}!</Title>
          <p>Você ainda não cadastrou seu consumo semanal. Por favor, registre seus dados.</p>
        </MainContainer>
      </>
    );
  }

  return (
    <>
      <Header />
      <MainContainer>
        <Title>Bem-vindo, {userName}!</Title>
        <FlexRow>
          <DashboardCard>
            <h3>Seu consumo semanal</h3>
            <ChartContainer>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid stroke="#ccc" />
                  <Line type="monotone" dataKey="consumo" stroke="#4CAF50" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </DashboardCard>
        </FlexRow>
      </MainContainer>
    </>
  );
};

export default Dashboard;
