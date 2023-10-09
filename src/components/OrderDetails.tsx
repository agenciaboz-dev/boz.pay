import React from "react"
import { Box, Skeleton } from "@mui/material"
import colors from "../style/colors"
import { Shipping } from "./Shipping"

interface OrderDetailsProps {
    order?: Order
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
    return order ? (
        <Box
            sx={{
                border: `1px solid ${colors.border}`,
                flexDirection: "column",
                bgcolor: "white",
                padding: "1vw 2vw",
                borderRadius: "1vw",
                width: "30vw",
                gap: "1vw",
            }}
        >
            <h3>RESUMO DO PEDIDO</h3>
            <Shipping shipping={order.shipping} />
        </Box>
    ) : (
        <>
            <Skeleton variant="rounded" sx={{ width: "30vw", height: "50vw", borderRadius: "1vw" }} />
        </>
    )
}
