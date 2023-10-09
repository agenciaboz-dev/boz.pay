declare type PaymentMethod = "card" | "pix" | "boleto"

declare interface CardForm extends Form {
    cardNumber: string
    expiry: string
    cvv: string
    cardOwner: string
    type: "credit" | "debit"
}

declare interface Form {
    name: string
    cpf: string
    phone: string
    email: string

    postcode: string
    address: string
    district: string
    city: string
    state: string
    complement: string
}