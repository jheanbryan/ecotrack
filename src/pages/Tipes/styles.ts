import styled from "styled-components";
import { colors } from "../../styles/colors";

export const MainContainer = styled.div`
  padding: 20px;
  background-color: ${colors.backgroundLight};
  color: ${colors.dark};
  min-height: 100vh;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

export const TipsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const TipCard = styled.div`
  background-color: ${colors.light};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.005);
  }

  p {
    font-size: 1rem;
  }
`;
