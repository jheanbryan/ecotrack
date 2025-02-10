import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Config/firebase";
import { MainContainer, DashboardCard, FlexRow, Title, ChartContainer, TipsContainer } from "./styles";
import { signOut } from "firebase/auth";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Header from "../../components/Header";

const mockData = [
  { day: "Seg", consumo: 3.2 },
  { day: "Ter", consumo: 2.8 },
  { day: "Qua", consumo: 3.5 },
  { day: "Qui", consumo: 3.0 },
  { day: "Sex", consumo: 3.8 },
  { day: "Sáb", consumo: 4.1 },
  { day: "Dom", consumo: 3.7 }
];


const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);


  return (
    <>
    <Header />
    <MainContainer>
      <Title>Bem-vindo, {user || "Usuário"}!</Title>
      
      <FlexRow>
        <DashboardCard>
          <h3>Seu consumo semanal</h3>
          <ChartContainer>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={mockData}>
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
