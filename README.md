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
