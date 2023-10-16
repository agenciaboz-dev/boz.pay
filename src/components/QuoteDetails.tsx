import React, { useEffect, useState } from "react"
import { Box, MenuItem, TextField } from "@mui/material"
import { QuoteComponent } from "./QuoteComponent"
import { CurrencyText } from "./CurrencyText"
import { useTotalValue } from "../hooks/useTotalValue"

interface QuoteDetailsProps {
    quoteList: Quote[]
    order: Order
}

export const QuoteDetails: React.FC<QuoteDetailsProps> = ({ quoteList, order }) => {
    const { setTotalValue } = useTotalValue()

    const [selectedQuote, setSelectedQuote] = useState(quoteList[0].ServiceCode)

    useEffect(() => {
        setTotalValue(Number(order.total) + Number(quoteList.find((quote) => quote.ServiceCode == selectedQuote)!.ShippingPrice))
    }, [])

    return (
        <>
            <p>COTAÇÃO DE ENTREGA</p>

            <Box sx={{ flexDirection: "column", color: "black", gap: "1vw", fontWeight: "bold" }}>
                <TextField
                    select
                    value={selectedQuote}
                    onChange={(ev) => {
                        const quote = quoteList.find((quote) => quote.ServiceCode == ev.target.value)!

                        setTotalValue(Number(order.total) + Number(quote.ShippingPrice))
                        setSelectedQuote(quote.ServiceCode)
                    }}
                    InputProps={{ sx: { paddingRight: "5vw" } }}
                >
                    {quoteList
                        .filter((quote) => !quote.Error)
                        .map((quote) => (
                            <MenuItem sx={{ flexDirection: "column", alignItems: "flex-start" }} key={quote.ServiceCode} value={quote.ServiceCode}>
                                <p style={{ fontWeight: "bold" }}>{quote.ServiceDescription}</p>

                                <Box sx={{ justifyContent: "space-between", width: "100%" }}>
                                    <p>{quote.DeliveryTime} dias</p>
                                    <CurrencyText value={quote.ShippingPrice} />
                                </Box>
                            </MenuItem>
                        ))}
                </TextField>
            </Box>
        </>
    )
}