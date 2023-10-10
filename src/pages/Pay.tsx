import React, { useCallback, useEffect, useState } from "react"
import { Box, Button, CircularProgress } from "@mui/material"
import { Header } from "../components/Header"
import { PaymentMethods } from "../components/PaymentMethods"
import colors from "../style/colors"
import { useNavigate, useParams } from "react-router-dom"
import { useIo } from "../hooks/useIo"
import { OrderDetails } from "../components/OrderDetails"
import { PaymentDetails } from "../components/PaymentDetails"
import LockIcon from "@mui/icons-material/Lock"
import brazilFlag from "../assets/brazil.svg"
import { getPaymentForm } from "../tools/paymentForm"
import { Form, Formik } from "formik"
import { PaymentForm } from "../components/PaymentForm"
import { useSnackbar } from "burgos-snackbar"
import { encrypt } from "../tools/pagseguro_script"

interface PayProps {}

export const Pay: React.FC<PayProps> = ({}) => {
    const io = useIo()
    const orderId = Number(useParams().orderId)
    const navigate = useNavigate()

    const { snackbar } = useSnackbar()

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
    const [order, setOrder] = useState<Order>()
    const [loading, setLoading] = useState(false)

    const initialValues = getPaymentForm(paymentMethod, order?.billing)

    const handleSubmit = useCallback(
        async (values: Form | CardForm) => {
            if (loading) return
            let encrypted
            if (paymentMethod == "card") {
                const card = values as CardForm
                try {
                    encrypted = await encrypt(card)
                } catch (error) {
                    console.error("Encryption failed:", error)
                    // Handle the error, maybe show a message to the user
                    return
                }
            }

            const data = { ...values, id: order?.id, method: paymentMethod, total: order?.total, encrypted }

            setLoading(true)
            io.emit("order:pay", data)
        },
        [order]
    )

    useEffect(() => {
        io.on("pagseguro:paid", (data) => {
            const id = data.id
            const charge = data.charge
            console.log(id)

            if (id == order?.id) {
                console.log(charge)
                setLoading(false)

                if (charge.status == "PAID") {
                    navigate("/paid", {
                        state: {
                            data: {
                                order,
                                date: new Date(charge.paid_at),
                                installments: charge.payment_method?.installments,
                                method: paymentMethod,
                                type: charge.payment_method.type,
                                card: charge.payment_method.card,
                            },
                        },
                    })
                }
            }
        })

        return () => {
            io.off("pagseguro:paid")
        }
    }, [order])

    useEffect(() => {
        io.emit("order:get", orderId)

        io.on("order", (data) => {
            setOrder(data)
        })

        io.on("order:pay:success", () => {
            alert("pago")
            setLoading(false)
        })

        io.on("order:pay:error", (error) => {
            console.log(error)
            snackbar({ severity: "error", text: error.description })
            setLoading(false)
        })

        return () => {
            io.off("order")
            io.off("order:pay:success")
            io.off("order:pay:error")
        }
    }, [])

    return (
        <Box sx={{ bgcolor: "background.default", color: colors.unactive, fontWeight: "bold", flexDirection: "column", overflow: "hidden" }}>
            <Header />
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                {(formikProps) => (
                    <Form>
                        <Box sx={{ flexDirection: "column", padding: "2vw 5vw", gap: "2vw", height: "90vh", overflowY: "auto" }}>
                            <PaymentMethods paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                            <Box sx={{ justifyContent: "space-between" }}>
                                <PaymentForm {...formikProps} paymentMethod={paymentMethod} />
                                <Box sx={{ flexDirection: "column", gap: "1vw", width: "30vw" }}>
                                    <OrderDetails order={order} />
                                    <PaymentDetails
                                        order={order}
                                        paymentMethod={paymentMethod}
                                        formikValues={formikProps.values}
                                        setInstallments={(value) => formikProps.setFieldValue("installments", value)}
                                    />
                                    <Button
                                        disabled={!order}
                                        type="submit"
                                        variant="contained"
                                        sx={{ padding: "2vw", color: "white" }}
                                        endIcon={<LockIcon />}
                                    >
                                        {loading ? <CircularProgress size="1.5rem" color="secondary" /> : "Finalizar compra"}
                                    </Button>
                                    <Box sx={{ gap: "1vw", fontWeight: "normal", alignItems: "center", justifyContent: "space-between" }}>
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
