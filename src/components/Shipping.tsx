import React from "react"
import { Box } from "@mui/material"
import colors from "../style/colors"

interface ShippingProps {
    shipping: Shipping
}

export const Shipping: React.FC<ShippingProps> = ({ shipping }) => {
    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "1vw",
                borderBottom: `1px solid ${colors.border}`,
                borderTop: `1px solid ${colors.border}`,
                padding: "1vw 0",
            }}
        >
            <p>ENDEREÇO DE ENTREGA</p>

            <Box sx={{ flexDirection: "column", color: "black", gap: "1vw", fontWeight: "bold" }}>
                <p>{shipping.address_1}</p>
                <p>{shipping.address_2}</p>
                <p>{shipping.city}</p>
            </Box>
        </Box>
    )
}
