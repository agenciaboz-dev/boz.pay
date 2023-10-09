import React from "react"
import { Box, TextField } from "@mui/material"
import { FormikProps } from "formik"

interface PaymentFormProps {}

export const PaymentForm: React.FC<FormikProps<Form | CardForm> & { paymentMethod: PaymentMethod }> = ({ values, handleChange, paymentMethod }) => {
    return (
        <Box sx={{ flexDirection: "column", gap: "1vw", flexWrap: "wrap", height: "90vh", width: paymentMethod == "card" ? "29vw" : "58vw" }}>
            <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                <h3>DETALHES DE COBRANÇA</h3>

                <TextField label="Nome" name="name" value={values.name} onChange={handleChange} />
                <TextField label="CPF" name="cpf" value={values.cpf} onChange={handleChange} />
                <TextField label="Telefone" name="phone" value={values.phone} onChange={handleChange} />
                <TextField label="E-mail" name="email" value={values.email} onChange={handleChange} />
            </Box>

            <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                <h3>ENDEREÇO</h3>

                <TextField label="CEP" name="postcode" value={values.postcode} onChange={handleChange} />
                <TextField label="Logradouro" name="address" value={values.address} onChange={handleChange} />
                <Box sx={{ gap: "1vw" }}>
                    <TextField label="Bairro" name="district" value={values.district} onChange={handleChange} sx={{ width: "48%" }} />
                    <TextField label="Complemento" name="complement" value={values.complement} onChange={handleChange} sx={{ width: "48%" }} />
                </Box>
                <Box sx={{ gap: "1vw" }}>
                    <TextField label="Cidade" name="city" value={values.city} onChange={handleChange} sx={{ width: "48%" }} />
                    <TextField label="Estado" name="state" value={values.state} onChange={handleChange} sx={{ width: "48%" }} />
                </Box>
            </Box>

            {paymentMethod == "card" && (
                <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                    <p>DADOS DO TITULAR DO CARTÃO</p>
                    <TextField label="Número do cartão" name="cardNumber" value={(values as CardForm).cardNumber} onChange={handleChange} />

                    <Box sx={{ gap: "1vw" }}>
                        <TextField label="Validade" name="expiry" value={(values as CardForm).expiry} onChange={handleChange} sx={{ width: "48%" }} />
                        <TextField
                            label="Código de segurança"
                            name="cvv"
                            value={(values as CardForm).cvv}
                            onChange={handleChange}
                            sx={{ width: "48%" }}
                        />
                    </Box>
                    <TextField label="Data de nascimento" name="birth" value={(values as CardForm).birth} onChange={handleChange} />
                </Box>
            )}
        </Box>
    )
}
