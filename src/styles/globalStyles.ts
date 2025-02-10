import { createGlobalStyle } from "styled-components";
import { colors } from "./colors";

export const MyGlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html{
        font-size: 16px; 
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        background-color: ${colors.backgroundLight};
    }
`;