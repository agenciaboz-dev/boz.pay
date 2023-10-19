import "./App.css"
import { BrowserRouter } from "react-router-dom"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { Box, ThemeProvider } from "@mui/material"
import { Providers } from "./Providers"
import { Routes } from "./Routes"
import { DarkModeProvider } from "./contexts/darkModeContext"

const Themed = () => {
    const theme = useMuiTheme()

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Box sx={{ fontSize: "1vw" }}>
                    <Providers>
                        <Routes />
                    </Providers>
                </Box>
            </BrowserRouter>
        </ThemeProvider>
    )
}

const App = () => {
    Notification.requestPermission()
    
    return (
        <DarkModeProvider>
            <Themed />
        </DarkModeProvider>
    )
}

export default App
