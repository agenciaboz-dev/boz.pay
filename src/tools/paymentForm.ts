export const getPaymentForm = (method: PaymentMethod, billing: Billing) => {
    const notCard = {
        name: `${billing?.first_name || ""} ${billing?.last_name || ""}`,
        cpf: "",
        phone: billing?.phone || "",
        email: billing?.email || "",

        postcode: billing?.postcode || "",
        address: billing?.address_1 || "",
        district: "",
        city: billing?.city || "",
        state: billing?.state || "",
        complement: billing?.address_2 || "",
    }

    const form: Record<PaymentMethod, CardForm | Form> = {
        card: {
            ...notCard,

            cardNumber: "",
            expiry: "",
            cvv: "",
            birth: "",
        },
        boleto: notCard,
        pix: notCard,
    }

    return form[method]
}
