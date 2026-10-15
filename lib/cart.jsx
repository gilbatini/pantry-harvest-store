"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { sdk } from "./sdk";

const Ctx = createContext(null);
const CART_KEY = "ph_cart_id";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    (async () => {
      let id = null;
      try { id = localStorage.getItem(CART_KEY); } catch {}
      let c = id ? (await sdk.store.cart.retrieve(id)).cart : null;
      if (!c) {
        c = (await sdk.store.cart.create()).cart;
        try { localStorage.setItem(CART_KEY, c.id); } catch {}
      }
      setCart(c);
    })();
  }, []);

  const ensure = useCallback(async () => {
    if (cart) return cart.id;
    const c = (await sdk.store.cart.create()).cart;
    try { localStorage.setItem(CART_KEY, c.id); } catch {}
    setCart(c);
    return c.id;
  }, [cart]);

  const add = useCallback(async (variant_id, quantity = 1, label) => {
    const id = await ensure();
    const { cart: c } = await sdk.store.cart.createLineItem(id, { variant_id, quantity });
    setCart(c);
    setOpen(true);
    if (label) { setToast(label); setTimeout(() => setToast(null), 2200); }
  }, [ensure]);

  const setQty = useCallback(async (itemId, quantity) => {
    const { cart: c } = await sdk.store.cart.updateLineItem(cart.id, itemId, { quantity });
    setCart(c);
  }, [cart]);

  const replace = useCallback((c) => setCart(c), []);

  const reset = useCallback(async () => {
    const c = (await sdk.store.cart.create()).cart;
    try { localStorage.setItem(CART_KEY, c.id); } catch {}
    setCart(c);
  }, []);

  const count = cart ? cart.items.reduce((s, i) => s + i.quantity, 0) : 0;

  return (
    <Ctx.Provider value={{ cart, count, open, setOpen, add, setQty, replace, reset, toast }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => useContext(Ctx);
