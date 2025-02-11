import styled from "styled-components";
import { colors } from "../../styles/colors";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;
`;

export const CardUserProfile = styled.div`
  width: 100%;
  max-width: 420px;
  background-color: ${colors.light};
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  padding: 24px;
  text-align: center;

  h3 {
    margin-bottom: 16px;
    font-size: 1.6rem;
    color: ${colors.dark};
  }
`;

export const DivImg = styled.div`
  width: 130px;
  height: 130px;
  margin: 0 auto 16px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${colors.gray};
  border: 3px solid ${colors.primary};
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  label {
    font-size: 1rem;
    color: ${colors.dark};
    text-align: left;
    margin-top: 1rem;
    font-weight: bold;
  }

  input {
    padding: 12px;
    font-size: 1rem;
    border: 1px solid ${colors.gray};
    border-radius: 6px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: ${colors.primary};
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
  }

  button {
    padding: 14px;
    background-color: ${colors.primary};
    color: ${colors.light};
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${colors.secondary};
    }
  }
`;

export const ConsumptionContainer = styled.div`
  width: 100%;
  max-width: 420px;
  background-color: ${colors.light};
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  padding: 24px;
  gap: 10px;

  h3 {
    margin-bottom: 16px;
    font-size: 1.6rem;
    color: ${colors.dark};
  }

  button {
    padding: 14px;
    background-color: ${colors.primary};
    color: ${colors.light};
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${colors.secondary};
    }
  }
`;

export const ContainerCardsConsumption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Card = styled.div`
  background-color: ${colors.backgroundContrast};
  border-radius: 12px;
  margin-top: 10px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

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

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65); /* Mantém o fundo escuro e com opacidade */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; /* Garantir que o overlay fique sobre os outros elementos */
`;


export const ModalContainer = styled.div`
  background: red;
  padding: 24px;
  border-radius: 12px;
  width: 320px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: ${colors.light}; /* Defina uma cor de fundo mais clara ou sólida */
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombras mais suaves */
  z-index: 1000; /* Colocar o modal acima do overlay */

  select, input {
    padding: 10px;
    border: 1px solid ${colors.gray};
    border-radius: 6px;
    font-size: 1rem;
  }

  button {
    padding: 12px;
    margin: 6px;
    border: none;
    cursor: pointer;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: bold;
    background: #4caf50;
    color: white;
  }

  button:last-child {
    background: #d9534f;
  }
`;
