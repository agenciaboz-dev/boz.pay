import React from "react"
import { Box, CircularProgress, Dialog } from "@mui/material"
import { backdropStyle } from "../style/backdrop"
import LockIcon from "@mui/icons-material/Lock"

interface LoadingOverlayProps {
    open: boolean
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ open }) => {
    return (
        <Dialog
            open={open}
            BackdropProps={{ sx: backdropStyle }}
            PaperProps={{
                sx: {
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: "100vw",
                    margin: 0,
                    height: "100vh",
                    maxHeight: "100vh",
                    width: "100vw",
                    background: "transparent",
                    justifyContent: "center",
                    gap: "2vw",
                },
            }}
        >
            <Box sx={{ position: "relative" }}>
                <LockIcon sx={{ width: "7vw", height: "7vw" }} />
                <CircularProgress size={"9vw"} sx={{ position: "absolute", top: "-1vw", left: "-1vw" }} />
            </Box>
            <h2>Aguarde um instante, seu pagamento está sendo processado com segurança...</h2>
            <h2 style={{ fontWeight: "normal", color: "black" }}>Por favor, não feche ou recarregue esta página.</h2>
        </Dialog>
    )
}
