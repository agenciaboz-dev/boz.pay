import React, { useEffect, useState } from "react"
import { Box, MenuItem, Skeleton, TextField } from "@mui/material"
import colors from "../style/colors"
import { CurrencyText } from "./CurrencyText"
import { getParcelas } from "../tools/parcelas"

interface PaymentDetailsProps {
    order?: Order
    paymentMethod: PaymentMethod
    formikValues: CardForm | Form
    setInstallments: (value: number) => void
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({ order, paymentMethod, formikValues, setInstallments }) => {
    const notInstallments = paymentMethod != "card" || (formikValues as CardForm).type != "credit"

    const [parcelamento, setParcelamento] = useState(1)

    useEffect(() => {
        if (notInstallments) {
            console.log(":(")
            setInstallments(1)
            setParcelamento(1)
        }
    }, [notInstallments])

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
                disabled={notInstallments}
                value={notInstallments ? 1 : parcelamento}
                onChange={(ev) => {
                    setParcelamento(Number(ev.target.value))
                    setInstallments(Number(ev.target.value))
                }}
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
