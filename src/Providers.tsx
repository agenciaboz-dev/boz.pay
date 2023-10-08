import { ConfirmDialog, ConfirmDialogProvider } from "burgos-confirm"
import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import React from "react"
import { IoProvider } from "./contexts/ioContext"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <SnackbarProvider>
            <ConfirmDialogProvider>
                    <IoProvider>
                                                    <Snackbar />
                                                    <ConfirmDialog />
                                                    {children}
                    </IoProvider>
            </ConfirmDialogProvider>
        </SnackbarProvider>
    )
}
