// Mock of @medusajs/js-sdk's store client. Same method names and response shapes,
// so going live is replacing this file with:
//
//   import Medusa from "@medusajs/js-sdk"
//   export const sdk = new Medusa({ baseUrl: process.env.NEXT_PUBLIC_MEDUSA_URL,
//                                   publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PK })
//
// Cart and orders persist in localStorage for the demo.

import { PRODUCTS, SHIPPING, PROMOS } from "./data";

const KEY = "ph_demo_v1";
const read = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || { carts: {}, orders: {} }; } catch { return { carts: {}, orders: {} }; }
};
const write = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} };
const uid = (p) => `${p}_${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

const findVariant = (id) => {
  for (const p of PRODUCTS) for (const v of p.variants) if (v.id === id) return { product: p, variant: v };
  return null;
};

function totals(cart) {
  const item_subtotal = cart.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  const rate = cart.promo_codes?.length ? PROMOS[cart.promo_codes[0]] || 0 : 0;
  const discount_total = Math.round((item_subtotal * rate) / 100) * 100; // whole shillings, nearest 100
  const shipping_total = cart.shipping_methods?.[0]?.amount ?? 0;
  return { ...cart, item_subtotal, discount_total, shipping_total, total: item_subtotal - discount_total + shipping_total };
}

function mutate(cartId, fn) {
  const s = read();
  const cart = s.carts[cartId];
  if (!cart) throw new Error("Cart not found");
  fn(cart);
  s.carts[cartId] = totals(cart);
  write(s);
  return { cart: s.carts[cartId] };
}

export const sdk = {
  store: {
    product: {
      list: async () => ({ products: PRODUCTS, count: PRODUCTS.length }),
      retrieve: async (handle) => ({ product: PRODUCTS.find((p) => p.handle === handle) }),
    },
    cart: {
      create: async () => {
        const s = read();
        const cart = totals({ id: uid("cart"), currency_code: "ugx", items: [], promo_codes: [], shipping_methods: [] });
        s.carts[cart.id] = cart;
        write(s);
        return { cart };
      },
      retrieve: async (id) => ({ cart: read().carts[id] }),
      update: async (id, body) => mutate(id, (c) => Object.assign(c, body)),
      createLineItem: async (id, { variant_id, quantity }) =>
        mutate(id, (c) => {
          const found = findVariant(variant_id);
          const existing = c.items.find((i) => i.variant_id === variant_id);
          if (existing) existing.quantity += quantity;
          else
            c.items.push({
              id: uid("item"),
              variant_id,
              product_handle: found.product.handle,
              product_title: found.product.title,
              variant_title: found.variant.title,
              unit_price: found.variant.calculated_price.calculated_amount,
              quantity,
            });
        }),
      updateLineItem: async (id, itemId, { quantity }) =>
        mutate(id, (c) => {
          const it = c.items.find((i) => i.id === itemId);
          if (it) it.quantity = quantity;
          c.items = c.items.filter((i) => i.quantity > 0);
        }),
      deleteLineItem: async (id, itemId) => mutate(id, (c) => { c.items = c.items.filter((i) => i.id !== itemId); }),
      addShippingMethod: async (id, { option_id }) =>
        mutate(id, (c) => { const o = SHIPPING.find((x) => x.id === option_id); c.shipping_methods = [{ ...o, shipping_option_id: o.id }]; }),
      complete: async (id) => {
        const s = read();
        const cart = s.carts[id];
        const order = { ...cart, id: uid("order"), display_id: 1000 + Math.floor(Math.random() * 9000), created_at: new Date().toISOString(), status: "pending" };
        s.orders[order.id] = order;
        delete s.carts[id];
        write(s);
        return { type: "order", order };
      },
    },
    payment: {
      // Same call the storefront makes against Medusa; the provider (e.g. Flutterwave,
      // Pesapal or MTN MoMo API) then pushes a PIN prompt to the customer's phone.
      initiatePaymentSession: async (cart, { provider_id, data }) =>
        mutate(cart.id, (c) => {
          c.payment_collection = {
            id: uid("paycol"),
            amount: c.total,
            currency_code: "ugx",
            payment_sessions: [{ id: uid("payses"), provider_id, status: "pending", data: { ...data, reference: `PH-${Math.floor(1000 + Math.random() * 9000)}` } }],
          };
        }),
    },
    order: { retrieve: async (id) => ({ order: read().orders[id] }) },
  },
};

export const applyPromo = (id, code) => {
  const c = String(code || "").trim().toUpperCase();
  if (!PROMOS[c]) return Promise.reject(new Error("That code isn't valid"));
  return sdk.store.cart.update(id, { promo_codes: [c] });
};

// ---------------------------------------------------------------------------
// DEMO ONLY: stands in for the mobile money provider's webhook. In production
// the provider calls the backend when the customer approves or declines on
// their phone, and the storefront polls the payment session status.
export const simulateMobileMoney = (cartId, outcome) =>
  sdk.store.cart.update(cartId, {}).then(({ cart }) => {
    const ses = cart.payment_collection.payment_sessions[0];
    const ok = outcome === "approved";
    const net = ses.provider_id.includes("mtn") ? "MTN" : "AIRTEL";
    const k = new Date(Date.now() + 3 * 3600 * 1000); // Kampala time (UTC+3)
    const stamp = k.toISOString().replace(/\D/g, "").slice(2, 12);
    const session = {
      ...ses,
      status: ok ? "authorized" : outcome,
      data: { ...ses.data, transaction_id: ok ? `${net === "MTN" ? "MP" : "AM"}${stamp}.${Math.floor(1000 + Math.random() * 9000)}` : null },
    };
    return sdk.store.cart.update(cartId, { payment_collection: { ...cart.payment_collection, payment_sessions: [session] } });
  });
