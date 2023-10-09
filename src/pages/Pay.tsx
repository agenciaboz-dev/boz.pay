import React, { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import { Header } from "../components/Header"
import { PaymentMethods } from "../components/PaymentMethods"
import colors from "../style/colors"
import { useParams } from "react-router-dom"
import { useIo } from "../hooks/useIo"
import { OrderDetails } from "../components/OrderDetails"
import { PaymentDetails } from "../components/PaymentDetails"
import LockIcon from "@mui/icons-material/Lock"
import brazilFlag from "../assets/brazil.svg"
import { getPaymentForm } from "../tools/paymentForm"
import { Form, Formik } from "formik"
import { PaymentForm } from "../components/PaymentForm"

interface PayProps {}

export const Pay: React.FC<PayProps> = ({}) => {
    const io = useIo()
    const orderId = Number(useParams().orderId)

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
    const [order, setOrder] = useState<Order>()

    const initialValues = getPaymentForm(paymentMethod, order?.billing)

    const handleSubmit = (values: Form | CardForm) => {
        console.log(values)
    }

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
        <Box sx={{ bgcolor: "background.default", color: colors.unactive, fontWeight: "bold", flexDirection: "column" }}>
            <Header />
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                {(formikProps) => (
                    <Form>
                        <Box sx={{ flexDirection: "column", padding: "2vw 5vw", gap: "2vw" }}>
                            <PaymentMethods paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                            <Box sx={{ justifyContent: "space-between" }}>
                                <PaymentForm {...formikProps} paymentMethod={paymentMethod} />
                                <Box sx={{ flexDirection: "column", gap: "1vw", width: "30vw" }}>
                                    <OrderDetails order={order} />
                                    <PaymentDetails order={order} paymentMethod={paymentMethod} />
                                    <Button type="submit" variant="contained" sx={{ padding: "2vw", color: "white" }} endIcon={<LockIcon />}>
                                        Finalizar compra
                                    </Button>
                                    <Box sx={{ gap: "1vw", fontWeight: "normal" }}>
                                        <p>Esta operação está sendo realizada no Brasil</p>
                                        <img src={brazilFlag} alt="Brasil" />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
