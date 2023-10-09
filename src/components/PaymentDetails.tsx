import React, { useState } from "react"
import { Box, MenuItem, Skeleton, TextField } from "@mui/material"
import colors from "../style/colors"
import { CurrencyText } from "./CurrencyText"
import { getParcelas } from "../tools/parcelas"

interface PaymentDetailsProps {
    order?: Order
    paymentMethod: PaymentMethod
    formikValues: CardForm | Form
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({ order, paymentMethod, formikValues }) => {
    const [parcelamento, setParcelamento] = useState(1)

    return order ? (
        <Box
            sx={{
                bgcolor: "white",
                flexDirection: "column",
                borderRadius: "1vw",
                border: `1px solid ${colors.border}`,
                padding: "1vw 2vw",
                gap: "1vw",
            }}
        >
            <TextField
                select
                disabled={paymentMethod != "card" || (formikValues as CardForm).type != "credit"}
                value={paymentMethod != "card" || (formikValues as CardForm).type != "credit" ? 1 : parcelamento}
                onChange={(ev) => setParcelamento(Number(ev.target.value))}
            >
                {getParcelas(order.total).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.text}
                    </MenuItem>
                ))}
            </TextField>
            <Box sx={{ justifyContent: "space-between" }}>
                <p>Total a pagar:</p>
                <CurrencyText value={order.total} color="black" />
            </Box>
        </Box>
    ) : (
        <>
            <Skeleton variant="rounded" sx={{ width: "30vw", height: "20vw", borderRadius: "1vw" }} />
        </>
    )
}
