"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { sdk, applyPromo } from "@/lib/sdk";
import { PRODUCTS, SHIPPING, FREE_DELIVERY_AT, money } from "@/lib/data";
import Jar from "@/components/Jar";

const PAY = [
  { id: "momo", name: "Mobile Money", detail: "MTN MoMo or Airtel Money — approve on your phone", logos: ["MTN", "AIRTEL"] },
  { id: "card", name: "Card", detail: "Visa, Mastercard — secured by the payment provider", logos: ["VISA", "MC"] },
  { id: "cod", name: "Pay on delivery", detail: "Cash or mobile money when your jars arrive", logos: [] },
];

export default function Checkout() {
  const router = useRouter();
  const { cart, replace, reset } = useCart();
  const [ship, setShip] = useState("so_standard");
  const [pay, setPay] = useState("momo");
  const [code, setCode] = useState("");
  const [promoMsg, setPromoMsg] = useState(null);
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({ email: "", phone: "", first: "", last: "", address: "", area: "", city: "Kampala" });

  useEffect(() => {
    if (!cart || !cart.items.length) return;
    const free = cart.item_subtotal >= FREE_DELIVERY_AT && ship !== "so_express";
    sdk.store.cart.addShippingMethod(cart.id, { option_id: ship }).then(({ cart: c }) => {
      if (free && c.shipping_total > 0) {
        sdk.store.cart.update(c.id, { shipping_methods: [{ ...c.shipping_methods[0], amount: 0 }] }).then(({ cart: c2 }) => replace(c2));
      } else replace(c);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ship, cart?.item_subtotal]);

  if (!cart) return <div className="shell" style={{ padding: "120px 0" }} />;

  if (!cart.items.length)
    return (
      <div className="shell done">
        <p className="serif" style={{ fontSize: 34 }}>Your basket is empty.</p>
        <p className="lede">Pick a jar or two and come back here to check out.</p>
        <Link href="/#range" className="btn solid">Shop the range</Link>
      </div>
    );

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const valid = form.email.includes("@") && form.phone.length > 6 && form.first && (ship === "so_pickup" || form.address);

  const onPromo = async () => {
    try { const { cart: c } = await applyPromo(cart.id, code); replace(c); setPromoMsg({ ok: true, t: `${code.toUpperCase()} applied — 10% off` }); }
    catch (e) { setPromoMsg({ ok: false, t: e.message }); }
  };

  const place = async () => {
    setPlacing(true);
    await sdk.store.cart.update(cart.id, { email: form.email, shipping_address: { ...form }, payment: pay });
    await new Promise((r) => setTimeout(r, 900));
    const { order } = await sdk.store.cart.complete(cart.id);
    await reset();
    router.push(`/order/${order.id}`);
  };

  const byHandle = (h) => PRODUCTS.find((p) => p.handle === h);

  return (
    <div className="shell co">
      <div>
        <p className="steps"><b>Basket</b> → <b>Details</b> → <span>Confirmation</span></p>
        <h1>Checkout</h1>

        <div className="block">
          <div className="block-h"><span className="n">i.</span><h2>Contact</h2></div>
          <div className="grid2">
            <label className="field"><span>Email</span><input type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} /></label>
            <label className="field"><span>Phone (for delivery &amp; mobile money)</span><input type="tel" placeholder="+256 7XX XXX XXX" value={form.phone} onChange={set("phone")} /></label>
          </div>
        </div>

        <div className="block">
          <div className="block-h"><span className="n">ii.</span><h2>Delivery</h2></div>
          <div className="choice" style={{ marginBottom: 20 }}>
            {SHIPPING.map((o) => {
              const free = cart.item_subtotal >= FREE_DELIVERY_AT && o.id !== "so_express" && o.amount > 0;
              return (
                <div key={o.id} className={`opt ${ship === o.id ? "on" : ""}`} onClick={() => setShip(o.id)} role="radio" aria-checked={ship === o.id} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setShip(o.id)}>
                  <span className="dot" />
                  <div><b>{o.name}</b><span>{o.detail}</span></div>
                  <span className="r">{o.amount === 0 || free ? "Free" : money(o.amount)}</span>
                </div>
              );
            })}
          </div>
          <div className="grid2">
            <label className="field"><span>First name</span><input value={form.first} onChange={set("first")} /></label>
            <label className="field"><span>Last name</span><input value={form.last} onChange={set("last")} /></label>
            {ship !== "so_pickup" && (
              <>
                <label className="field full"><span>Street address</span><input placeholder="House, street, landmark" value={form.address} onChange={set("address")} /></label>
                <label className="field"><span>Area</span><input placeholder="e.g. Kololo" value={form.area} onChange={set("area")} /></label>
                <label className="field"><span>City</span><select value={form.city} onChange={set("city")}><option>Kampala</option><option>Entebbe</option><option>Mukono</option><option>Wakiso</option></select></label>
              </>
            )}
          </div>
        </div>

        <div className="block">
          <div className="block-h"><span className="n">iii.</span><h2>Payment</h2></div>
          <div className="choice">
            {PAY.map((o) => (
              <div key={o.id} className={`opt ${pay === o.id ? "on" : ""}`} onClick={() => setPay(o.id)} role="radio" aria-checked={pay === o.id} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setPay(o.id)}>
                <span className="dot" />
                <div><b>{o.name}</b><span>{o.detail}</span></div>
                <span className="logos">{o.logos.map((l) => <i key={l}>{l}</i>)}</span>
              </div>
            ))}
          </div>
          <p className="muted small" style={{ marginTop: 14 }}>Demo checkout — no payment is taken.</p>
        </div>

        <button className="btn solid wide" disabled={!valid || placing} onClick={place} style={{ height: 58, fontSize: 16 }}>
          {placing ? "Placing your order…" : `Place order — ${money(cart.total)}`}
        </button>
        {!valid && <p className="muted small" style={{ marginTop: 10 }}>Add your email, phone, name{ship !== "so_pickup" ? " and address" : ""} to continue.</p>}
      </div>

      <aside className="summary">
        <p className="eyebrow" style={{ marginBottom: 6 }}>Order summary</p>
        {cart.items.map((i) => {
          const p = byHandle(i.product_handle);
          return (
            <div className="line" key={i.id}>
              <div className="line-thumb" style={{ background: p.metadata.stage }}>
                <span className="qty-dot">{i.quantity}</span>
                <Jar product={p} size={i.variant_title} width={38} shadow={false} />
              </div>
              <div><p className="line-title">{i.product_title}</p><p className="muted small">{i.variant_title}</p></div>
              <div className="line-end"><p>{money(i.unit_price * i.quantity)}</p></div>
            </div>
          );
        })}
        <div className="promo">
          <input placeholder="Promo code (try HARVEST10)" value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onPromo()} />
          <button onClick={onPromo}>Apply</button>
        </div>
        {promoMsg && <p className={promoMsg.ok ? "ok" : "err"} style={{ marginTop: -8, marginBottom: 12 }}>{promoMsg.t}</p>}
        <div className="sums">
          <div className="row"><span>Subtotal</span><b>{money(cart.item_subtotal)}</b></div>
          {cart.discount_total > 0 && <div className="row"><span>Discount</span><b>−{money(cart.discount_total)}</b></div>}
          <div className="row"><span>Delivery</span><b>{cart.shipping_total ? money(cart.shipping_total) : "Free"}</b></div>
          <div className="row total"><span>Total</span><b>{money(cart.total)}</b></div>
        </div>
        <p className="muted small">Prices in USD for the demo.</p>
      </aside>
    </div>
  );
}
