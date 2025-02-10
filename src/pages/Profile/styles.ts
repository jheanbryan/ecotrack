import styled from "styled-components";
import { colors } from "../../styles/colors";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

export const CardUserProfile = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: ${colors.light};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;

  h3 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: ${colors.dark};
  }
`;

export const DivImg = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${colors.gray};
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  label {
    font-size: 1rem;
    color: ${colors.dark};
    text-align: left;
    margin-top: 1.2rem;
  }

  input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid ${colors.gray};
    border-radius: 5px;
    outline: none;

    &:focus {
      border-color: ${colors.primary};
    }
  }

  button {
    padding: 12px;
    background-color: ${colors.primary};
    color: ${colors.light};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${colors.secondary};
    }
  }
`;

export const ConsumptionContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: ${colors.light};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;

  h3 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: ${colors.dark};
  }

  button {
    padding: 12px;
    background-color: ${colors.primary};
    color: ${colors.light};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-bottom: 20px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${colors.primary};
    }
  }
`;

export const ContainerCardsConsumption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Card = styled.div`
  background-color: ${colors.backgroundContrast};
  border-radius: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  span {
    font-size: 1rem;
    color: ${colors.dark};
  }

  span:nth-child(1) {
    font-weight: bold;
  }

  span:nth-child(2) {
    color: ${colors.primary};
  }
`;

