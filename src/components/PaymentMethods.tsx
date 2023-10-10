import React from "react"
import { Box, MenuItem } from "@mui/material"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import PixIcon from "@mui/icons-material/Pix"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import colors from "../style/colors"

interface PaymentMethodsProps {
    paymentMethod: PaymentMethod
    setPaymentMethod: (value: PaymentMethod) => void
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({ paymentMethod, setPaymentMethod }) => {
    const methods = [
        {
            name: "Cartão",
            icon: <CreditCardIcon />,
            method: "card" as PaymentMethod,
        },
        {
            name: "PIx",
            icon: <PixIcon />,
            method: "pix" as PaymentMethod,
        },
        {
            name: "Boleto",
            icon: <AccessTimeIcon />,
            method: "boleto" as PaymentMethod,
            disabled: true,
        },
    ]

    return (
        <Box sx={{ flexDirection: "column", gap: "2vw" }}>
            <h3>MÉTODOS DE PAGAMENTO</h3>

            <Box sx={{ gap: "1vw" }}>
                {methods.map((item) => {
                    const current = paymentMethod == item.method
                    return (
                        <MenuItem
                            key={item.name}
                            sx={{
                                flexDirection: "column",
                                border: `1px solid ${colors.border}`,
                                borderRadius: "1vw",
                                color: current ? "white" : colors.unactive,
                                width: "10vw",
                                bgcolor: current ? colors.primary : "white",
                                pointerEvents: current ? "none" : "auto",
                            }}
                            disabled={item.disabled}
                            onClick={() => setPaymentMethod(item.method)}
                        >
                            {item.icon}
                            {item.name}
                        </MenuItem>
                    )
                })}
            </Box>
        </Box>
    )
}
