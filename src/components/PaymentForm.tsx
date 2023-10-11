import React from "react"
import { Box, FormControlLabel, Grid, Radio, RadioGroup, TextField, useMediaQuery } from "@mui/material"
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
    const isMobile = useMediaQuery('(orientation: portrait)')

    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "1vw",
                flexWrap: "wrap",
                height: isMobile? "auto" : "90vh",
                width: isMobile? "90vw" : (paymentMethod == "card" ? "29vw" : "58vw")
                }}
            >
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
                <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                        <TextField
                            label="Bairro"
                            name="district"
                            value={values.district}
                            onChange={handleChange}
                            InputProps={{ readOnly: !!initialValues.district }}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Complemento"
                            name="complement"
                            value={values.complement}
                            onChange={handleChange}
                            InputProps={{ readOnly: !!initialValues.complement }}
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                        <TextField
                            label="Cidade"
                            name="city"
                            fullWidth
                            value={values.city}
                            onChange={handleChange}
                            InputProps={{ readOnly: !!initialValues.city }}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Estado"
                            name="state"
                            fullWidth
                            value={values.state}
                            onChange={handleChange}
                            InputProps={{ readOnly: !!initialValues.state }}
                            required
                        />
                    </Grid>
                </Grid>
                <Box sx={{ gap: "1vw" }}></Box>
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

                    <Grid container spacing={1.5}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Validade"
                                name="expiry"
                                value={(values as CardForm).expiry}
                                onChange={handleChange}
                                InputProps={{ inputComponent: MaskedInput, inputProps: { mask: masks.expiry } }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Código de segurança"
                                name="cvv"
                                value={(values as CardForm).cvv}
                                onChange={handleChange}
                                InputProps={{ inputComponent: MaskedInput, inputProps: { mask: "000" } }}
                            />
                        </Grid>
                    </Grid>

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
