import React, { useEffect } from "react"
import { Box, Button, TextField } from "@mui/material"
import colors from "../style/colors"
import { useLocation, useNavigate } from "react-router-dom"
import { SuccessText } from "../components/SuccessText"
import { Header } from "../components/Header"
import { QRCode } from "react-qrcode-logo"
import { useSnackbar } from "burgos-snackbar"
import { useIo } from "../hooks/useIo"

interface PixProps {}

export const Pix: React.FC<PixProps> = ({}) => {
    const data: { order: Order; qrcode: QrCode } = useLocation().state.data

    const total = `R$ ${data.order.total.replace(".", ",")}`
    const width = window.innerWidth

    const io = useIo()

    const { snackbar } = useSnackbar()

    const navigate = useNavigate()

    const handleCopy = () => {
        navigator.clipboard.writeText(data.qrcode.text)
        snackbar({ severity: "info", text: "Copiado" })
    }

    useEffect(() => {
        io.on("pagseguro:paid", (data) => {
            const id = data.id
            const charge = data.charge
            console.log(id)

            if (id == data.order.id) {
                console.log(charge)

                if (charge.status == "PAID") {
                    navigate("/paid", {
                        state: {
                            data: {
                                order: data.order,
                                date: new Date(charge.paid_at),
                                installments: charge.payment_method?.installments,
                                method: data.method,
                                type: charge.payment_method.type,
                            },
                        },
                    })
                } else {
                    snackbar({ severity: "error", text: charge.payment_response.message })
                }
            }
        })

        return () => {
            io.off("pagseguro:paid")
        }
    }, [data.order])

    useEffect(() => {
        if (!data) navigate("/404")
        console.log(data)
    }, [])

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                color: colors.unactive,
                fontWeight: "bold",
                flexDirection: "column",
                overflow: "hidden",
                alignItems: "center",
                gap: "3vw",
            }}
        >
            <Header />
            <SuccessText email={data.order.billing.email} />

            <Box
                sx={{
                    border: `1px solid ${colors.border}`,
                    borderRadius: "2vw",
                    width: "80vw",
                    padding: "2vw",
                    flexDirection: "column",
                    gap: "2vw",
                    alignItems: "center",
                }}
            >
                <h3 style={{ color: colors.primary }}>FINALIZE O PAGAMENTO USANDO PIX!</h3>

                <Box sx={{ flexDirection: "column", borderTop: `1px solid ${colors.border}`, padding: "2vw 0", gap: "2vw", fontWeight: "normal" }}>
                    <p>Você pode utilizar a câmera do seu celular para ler o QR CODE ou copiar o código e pagar no aplicativo de seu banco:</p>

                    <Box sx={{ gap: "1vw" }}>
                        <QRCode value={data.qrcode.text} size={width * 0.1} bgColor={colors.background} />

                        <Box sx={{ flexDirection: "column", width: "80%", gap: "1vw", padding: "0.5vw 0" }}>
                            <TextField value={data.qrcode.text} multiline InputProps={{ readOnly: true }} />
                            <Button variant="contained" sx={{ alignSelf: "flex-end", color: "white" }} onClick={handleCopy}>
                                Copiar código
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
