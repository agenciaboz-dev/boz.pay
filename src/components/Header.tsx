import React from 'react'
import { Box } from '@mui/material'
import logo from '../assets/logo.svg'

interface HeaderProps {
    
}

export const Header:React.FC<HeaderProps> = ({  }) => {
    
    return (
        <Box sx={{width: '100vw', justifyContent: 'center', alignItems: 'center', height: '10vw', borderBottom: '1px solid #C8C9CD'}}>
            <img src={logo} alt="Boz" style={{width: '10vw'}} />
        </Box>
    )
}