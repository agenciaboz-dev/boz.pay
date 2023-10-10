import React from "react"
import { Box, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { FormikProps } from "formik"
import MaskedInput from "./MaskedInput"
import masks from "../tools/masks"

interface PaymentFormProps {}

export const PaymentForm: React.FC<FormikProps<Form | CardForm> & { paymentMethod: PaymentMethod }> = ({
    values,
    handleChange,
    paymentMethod,
    setFieldValue,
    initialValues,
}) => {
    return (
        <Box sx={{ flexDirection: "column", gap: "1vw", flexWrap: "wrap", height: "90vh", width: paymentMethod == "card" ? "29vw" : "58vw" }}>
            <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                <h3>DETALHES DE COBRANÇA</h3>

                <TextField
                    label="Nome"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    InputProps={{ readOnly: !!initialValues.name }}
                    required
                />
                <TextField
                    label="CPF"
                    name="cpf"
                    value={values.cpf}
                    onChange={handleChange}
                    InputProps={{ readOnly: !!initialValues.cpf, inputComponent: MaskedInput, inputProps: { mask: masks.cpf } }}
                    required
                />
                <TextField
                    label="Telefone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    InputProps={{ readOnly: !!initialValues.phone, inputComponent: MaskedInput, inputProps: { mask: masks.phone } }}
                    required
                />
                <TextField
                    label="E-mail"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    InputProps={{ readOnly: !!initialValues.email }}
                    required
                />
            </Box>

            <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                <h3>ENDEREÇO</h3>

                <TextField
                    label="CEP"
                    name="postcode"
                    value={values.postcode}
                    onChange={handleChange}
                    InputProps={{ readOnly: !!initialValues.postcode, inputComponent: MaskedInput, inputProps: { mask: masks.cep } }}
                    required
                />
                <TextField
                    label="Logradouro"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    InputProps={{ readOnly: !!initialValues.address }}
                    required
                />
                <Box sx={{ gap: "1vw" }}>
                    <TextField
                        label="Bairro"
                        name="district"
                        value={values.district}
                        onChange={handleChange}
                        sx={{ width: "48%" }}
                        InputProps={{ readOnly: !!initialValues.district }}
                        required
                    />
                    <TextField
                        label="Complemento"
                        name="complement"
                        value={values.complement}
                        onChange={handleChange}
                        sx={{ width: "48%" }}
                        InputProps={{ readOnly: !!initialValues.complement }}
                    />
                </Box>
                <Box sx={{ gap: "1vw" }}>
                    <TextField
                        label="Cidade"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        sx={{ width: "48%" }}
                        InputProps={{ readOnly: !!initialValues.city }}
                        required
                    />
                    <TextField
                        label="Estado"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        sx={{ width: "48%" }}
                        InputProps={{ readOnly: !!initialValues.state }}
                        required
                    />
                </Box>
            </Box>

            {paymentMethod == "card" && (
                <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                    <h3>DADOS DO TITULAR DO CARTÃO</h3>
                    <TextField
                        label="Número do cartão"
                        name="cardNumber"
                        value={(values as CardForm).cardNumber || ""}
                        onChange={handleChange}
                        required
                    />

                    <Box sx={{ gap: "1vw" }}>
                        <TextField
                            label="Validade"
                            name="expiry"
                            value={(values as CardForm).expiry || ""}
                            onChange={handleChange}
                            sx={{ width: "48%" }}
                            required
                            InputProps={{ inputComponent: MaskedInput, inputProps: { mask: masks.expiry } }}
                        />
                        <TextField
                            label="Código de segurança"
                            name="cvv"
                            value={(values as CardForm).cvv || ""}
                            onChange={handleChange}
                            sx={{ width: "48%" }}
                            required
                            InputProps={{ inputComponent: MaskedInput, inputProps: { mask: "000" } }}
                        />
                    </Box>
                    <TextField
                        label="Nome do titular"
                        name="cardOwner"
                        value={(values as CardForm).cardOwner || ""}
                        onChange={handleChange}
                        required
                    />

                    <RadioGroup value={(values as CardForm).type || "credit"} onChange={(_, value) => setFieldValue("type", value)}>
                        <FormControlLabel label="Crédito" control={<Radio value={"credit"} />} />
                        <FormControlLabel label="Débito" control={<Radio value={"debit"} />} />
                    </RadioGroup>
                </Box>
            )}
        </Box>
    )
}
