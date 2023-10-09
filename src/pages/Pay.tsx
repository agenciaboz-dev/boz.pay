import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { Header } from "../components/Header"
import { PaymentMethods } from "../components/PaymentMethods"
import colors from "../style/colors"
import { useParams } from "react-router-dom"
import { useIo } from "../hooks/useIo"
import { OrderDetails } from "../components/OrderDetails"
import { PaymentDetails } from "../components/PaymentDetails"

interface PayProps {}

export const Pay: React.FC<PayProps> = ({}) => {
    const io = useIo()
    const orderId = Number(useParams().orderId)

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
    const [order, setOrder] = useState<Order>()

    useEffect(() => {
        io.emit("order:get", orderId)

        io.on("order", (data) => {
            setOrder(data)
        })

        return () => {
            io.off("order")
        }
    }, [])

    return (
        <Box sx={{ bgcolor: "background.default", flexDirection: "column", color: colors.unactive, fontWeight: "bold" }}>
            <Header />
            <Box sx={{ flexDirection: "column", padding: "2vw 5vw", gap: "2vw" }}>
                <PaymentMethods paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                <Box sx={{ flexDirection: "column", gap: "1vw", width: "30vw" }}>
                    <OrderDetails order={order} />
                    <PaymentDetails order={order} paymentMethod={paymentMethod} />
                </Box>
            </Box>
        </Box>
    )
}
