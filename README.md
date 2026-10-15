# Pantry Harvest Co. — storefront

Next.js 15 storefront for Pantry Harvest Co. Product, cart and order data come from
`lib/sdk.js`, a mock shaped like Medusa v2's Store API (`@medusajs/js-sdk`).

## Run
    npm install
    npm run dev

## Going live on Medusa
Replace `lib/sdk.js` with the real client:

    import Medusa from "@medusajs/js-sdk"
    export const sdk = new Medusa({ baseUrl: process.env.NEXT_PUBLIC_MEDUSA_URL,
                                    publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PK })

Prices are USD placeholders. Jars are SVG illustrations until label artwork is supplied.

## Payments (demo)
Prices are in Uganda Shillings. Checkout offers MTN MoMo, Airtel Money, card and pay on delivery.

Mobile money is simulated: `lib/momo.js` detects the network from the number prefix,
`sdk.store.payment.initiatePaymentSession` mirrors Medusa's call, and `simulateMobileMoney`
in `lib/sdk.js` stands in for the provider's webhook. For production, register a Medusa
payment provider (e.g. Flutterwave, Pesapal or MTN MoMo / Airtel Money collections APIs),
have it push the PIN prompt, and poll the payment session status instead of simulating it.
