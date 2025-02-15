import styled from "styled-components";
import { colors } from "../../styles/colors";


export const MainContainer = styled.div`
  background-color: ${colors.backgroundLight};
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: ${colors.dark};
  margin-bottom: 20px;
`;

export const FlexCol = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 800px;
  align-items: center;
  padding: 5px;
`;

export const DashboardCard = styled.div`
  background-color: ${colors.backgroundContrast};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  text-align: center;

  h3 {
    font-size: 1.5rem;
    color: ${colors.dark};
    margin-bottom: 10px;
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 200px;
`;

export const TipsContainer = styled.div`
  background-color: ${colors.backgroundContrast};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin-top: 30px;

  h3 {
    font-size: 1.5rem;
    color: ${colors.dark};
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    
    li {
      font-size: 1rem;
      color: ${colors.dark};
      margin-bottom: 8px;
    }
  }
`;


export const ChartContainerStyled = styled.div`
  .recharts-wrapper {
    padding: 0px;
    background-color: #f4f4f4;
    border-radius: 8px;
    font-size: 0.8rem;
  }
  .BarChart {
    left: 20, 
  }
  .recharts-cartesian-axis line,
  .recharts-cartesian-grid line {
    stroke: gray; 
  }

  .recharts-bar-rectangular {
    transition: fill 0.3s ease; 
  }

`;