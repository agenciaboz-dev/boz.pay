import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import logo from '../assets/logo.svg'
import colors from "../style/colors"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    const isMobile = useMediaQuery('(orientation: portrait)')

    return (
        <Box
            sx={{
                width: "100vw",
                justifyContent: "center",
                alignItems: "center",
                height: isMobile? "10vw" : "7vw",
                borderBottom: `1px solid ${colors.border}`,
                bgcolor: "white",
            }}
        >
            <img src={logo} alt="Boz" style={{ width: isMobile? "10vw" : "7vw" }} />
        </Box>
    )
}