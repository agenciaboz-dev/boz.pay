// returns PAID
// Número: 4539620659922097
// Cód. de Seg.: 123
// Data Exp.:12/2026

// returns DECLINED
// Número: 4929291898380766
// Cód. de Seg.: 123
// Data Exp.:12/2026

export const encrypt = (card: Card): Promise<string> => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        document.body.appendChild(script) // Appending the script to the body

        script.src = "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js"
        script.async = true

        script.onload = () => {
            console.log("encrypting")
            const expiryMonth = card.expiry.split("/")[0]
            const expiryYear = card.expiry.split("/")[1]

            // @ts-ignore
            const pagseguro_card = window.PagSeguro?.encryptCard({
                // sandbox
                publicKey:
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr+ZqgD892U9/HXsa7XqBZUayPquAfh9xx4iwUbTSUAvTlmiXFQNTp0Bvt/5vK2FhMj39qSv1zi2OuBjvW38q1E374nzx6NNBL5JosV0+SDINTlCG0cmigHuBOyWzYmjgca+mtQu4WczCaApNaSuVqgb8u7Bd9GCOL4YJotvV5+81frlSwQXralhwRzGhj/A57CGPgGKiuPT+AOGmykIGEZsSD9RKkyoKIoc0OS8CPIzdBOtTQCIwrLn2FxI83Clcg55W8gkFSOS6rWNbG5qFZWMll6yl02HtunalHmUlRUL66YeGXdMDC2PuRcmZbGO5a/2tbVppW6mfSWG3NPRpgwIDAQAB",
                // production
                // publicKey:
                //     "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvgwj+Bb1x8SieUMF4o1NWQhgeV4bX0nI7IAa+W+rEVGFk6aNqmKCqzSYLwbw7dwUBWr9GaKyD7aXFvcSGlNimd9/6ix0lGsOoQvzlfPYKn6at10jy8lMxmQPw3u6Z3gX57omXWh2DNHBBxhWTwimXv/nKxIH74F+avvOmjeQHYSz47z71GnEjCQbf05YHkOtbdBW8x8gchyQ6t1nUxohb0keTkmn1YYGNBVA6C6RS1bGVkMVtrzXjtQgwBBAG4JhIExw19ic+4d4YEOWe7UTcKH5EHO1zCAsZorNq9gEfpumTUUI5EX4/ioD2RUvrox0+POHQCwdpNAExGTbRPIPcQIDAQAB",
                holder: card.cardOwner,
                number: card.cardNumber.replace(/\D/g, "").replace(/\s/g, ""),
                expMonth: expiryMonth,
                expYear: expiryYear,
                securityCode: card.cvv,
            })

            document.body.removeChild(script)
            resolve(pagseguro_card.encryptedCard) // Resolve the Promise with the encrypted card
        }

        script.onerror = () => {
            reject(new Error("Failed to load the PagSeguro script")) // Reject the Promise on error
        }

        // Set a timeout to reject the Promise if the script doesn't load within a certain timeframe (e.g., 15 seconds)
        setTimeout(() => {
            reject(new Error("PagSeguro script loading timed out"))
        }, 15000)
    })
}
