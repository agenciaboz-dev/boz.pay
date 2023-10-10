import React from "react"
import { Box } from "@mui/material"
import check from "../assets/check.svg"
import colors from "../style/colors"

interface SuccessTextProps {
    email: string
}

export const SuccessText: React.FC<SuccessTextProps> = ({ email }) => {
    return (
        <Box sx={{ flexDirection: "column", alignItems: "center", gap: "2vw" }}>
            <Box sx={{ gap: "2vw", alignItems: "center" }}>
                <img src={check} alt="Check" style={{ width: "3vw" }} />
                <h3 style={{ color: colors.primary }}>Sua transação foi concluída com sucesso!</h3>
            </Box>

            <p style={{ color: "black", fontWeight: "normal" }}>
                Acabamos de enviar os dados de seu pedido para o e-mail <span style={{ fontWeight: "bold" }}>{email}</span>.
            </p>
        </Box>
    )
}
