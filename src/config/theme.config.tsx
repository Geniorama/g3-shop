import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";

type ThemeProp = {
    children: JSX.Element
}

enum themePalette {
    BG = "#f8f8f8",
    PURPLE = "#4D2566",
    PINK = "#E30E81",
    FONT_GLOBAL = "'Inter', sans-serif",
    FONT_BUTTON = "'Montserrat', sans-serif"
}

const theme = createTheme({
    palette:{
        mode:"light",
        background:{
            default: themePalette.BG
        },
        primary: {
            main: themePalette.PURPLE
        },

        secondary:{
            main: themePalette.PINK
        }
    },

    typography:{
        fontFamily: themePalette.FONT_GLOBAL
    },

    components:{
        MuiButton:{
            defaultProps:{
                style:{
                    textTransform: 'none',
                    letterSpacing: '0.1px',
                    fontFamily: themePalette.FONT_BUTTON,
                    borderRadius: '50px',
                    fontWeight: '700',
                    fontSize: '20px'
                }
            }
        }
    }
})

export const ThemeConfig: React.FC<ThemeProp> = ({children}) => {
    return (
        <ThemeProvider theme={theme} >
            {children}
        </ThemeProvider>
    );
}