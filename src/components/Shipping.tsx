import React, { useEffect, useState } from "react"
import { Box, Skeleton, useMediaQuery } from "@mui/material"
import colors from "../style/colors"
import { useIo } from "../hooks/useIo"
import { QuoteDetails } from "./QuoteDetails"

interface ShippingProps {
    shipping: Shipping
}

export const Shipping: React.FC<ShippingProps> = ({ shipping }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()

    const [quoteList, setQuoteList] = useState<Quote[]>()

    useEffect(() => {
        io.on("quote", (quoteList) => {
            setQuoteList(quoteList)
        })

        return () => {
            io.off("quote")
        }
    }, [])

    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: isMobile ? "5vw" : "1vw",
                // borderBottom: `1px solid ${colors.border}`,
                borderTop: `1px solid ${colors.border}`,
                padding: isMobile ? "5vw 0 0" : "1vw 0",
            }}
        >
            <p>ENDEREÇO DE ENTREGA</p>

            <Box sx={{ flexDirection: "column", color: "black", gap: "1vw", fontWeight: "bold" }}>
                <p>{shipping.address_1}</p>
                <p>{shipping.address_2}</p>
                <p>{shipping.city}</p>
            </Box>

            {quoteList ? (
                <QuoteDetails quoteList={quoteList} />
            ) : (
                <Skeleton variant="rounded" sx={{ width: "25vw", height: "10vw", borderRadius: "1vw", alignSelf: "center" }} />
            )}
        </Box>
    )
}
