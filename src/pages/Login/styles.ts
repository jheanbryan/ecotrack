import styled from "styled-components";
import { colors } from "../../styles/colors";
import { Link } from "react-router-dom";

export const MainContainer = styled.div`
    max-width: 400px;
    width: 100%;
    background-color: ${colors.backgroundContrast};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const FlexCollCenter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 0.5rem;

    form{
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
    }
`;

export const DivImg = styled.div`
    max-width: 60px;
    width: 100%;
    padding: 5px;
`;

export const Img = styled.img`
    width: 100%;
    width: 60px;
`;

export const DivDescription = styled.div`
    text-align: center;
    margin-bottom: 1rem;
    color: ${colors.dark};

    p{
        font-size: 0.8rem;
        margin-top: 0.2rem;
        margin-bottom: 1rem;
    }
`;

export const Label = styled.label`
    width: 100%;
    margin-top: 0.8rem;
`;

export const DivInput = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid ${colors.primary};
    border-radius: 8px;
    padding: 10px;
    background-color: ${colors.gray};
`;

export const Input = styled.input`
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: ${colors.dark};
    padding-left: 1.8rem;
`;
export const InputIcon = styled.img`
    position: absolute;
    width: 1.5rem;
`;

export const ForgotPassword = styled.span`
    color: ${colors.primary};
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s;
    text-align: right;

    &:hover {
        text-decoration: underline;
    }
`;

export const IconEye = styled.img`
    position: absolute;
    width: 1.5rem;
    right: 40px;
    cursor: pointer;
`;

export const Button = styled.button`
    width: 100%;
    padding: 10px;
    background: ${colors.primary};
    color: white;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
    margin-bottom: 1.2rem;
    margin-top: 0.5rem;

    &:hover {
        background: ${colors.dark};
    }
`;

export const SocialLoginContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
`;

export const SocialIcon = styled.img`
    width: 35px;
    height: 35px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        transform: scale(1.1);
    }
`;

export const DivLine = styled.div`
    display: flex;
    gap: 5px;
    width: 100%;

`;

export const LinkText  = styled(Link)`
    text-decoration: none;
    display: flex;
    color: ${colors.primary};

    &:hover{
        text-decoration: underline;
    }
`;