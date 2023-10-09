import React from 'react'
import { Box } from '@mui/material'
import logo from '../assets/logo.svg'
import colors from "../style/colors"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    return (
        <Box
            sx={{
                width: "100vw",
                justifyContent: "center",
                alignItems: "center",
                height: "7vw",
                borderBottom: `1px solid ${colors.border}`,
                bgcolor: "white",
            }}
        >
            <img src={logo} alt="Boz" style={{ width: "7vw" }} />
        </Box>
    )
}