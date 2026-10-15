"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { sdk, applyPromo, simulateMobileMoney } from "@/lib/sdk";
import { MOMO, detectNetwork, normalise, display } from "@/lib/momo";
import MobileMoneyPrompt from "@/components/MobileMoneyPrompt";
import { PRODUCTS, SHIPPING, FREE_DELIVERY_AT, money } from "@/lib/data";
import Photo, { img } from "@/components/Photo";

const PAY = [
  { id: "momo", name: "Mobile Money", detail: "MTN MoMo or Airtel Money — approve with your PIN", logos: ["MTN", "AIRTEL"] },
  { id: "card", name: "Visa or Mastercard", detail: "Paid on the provider's secure page", logos: ["VISA", "MC"] },
  { id: "cod", name: "Pay on delivery", detail: "Cash or mobile money to the rider when your jars arrive", logos: [] },
];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Checkout() {
  const router = useRouter();
  const { cart, replace, reset } = useCart();
  const [ship, setShip] = useState("so_standard");
  const [pay, setPay] = useState("momo");
  const [code, setCode] = useState("");
  const [promoMsg, setPromoMsg] = useState(null);
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({ email: "", phone: "", first: "", last: "", address: "", area: "", city: "Kampala" });
  const [momoNumber, setMomoNumber] = useState("");
  const [momoEdited, setMomoEdited] = useState(false);
  const [netPick, setNetPick] = useState(null);
  const [mm, setMm] = useState(null); // { stage, reference, txn }

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

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (k === "phone" && !momoEdited) setMomoNumber(e.target.value);
  };
  const detected = detectNetwork(momoNumber);
  const network = netPick ? MOMO[netPick] : detected;
  const momoOk = pay !== "momo" || (normalise(momoNumber) && network);
  const valid = form.email.includes("@") && normalise(form.phone) && form.first && (ship === "so_pickup" || form.address) && momoOk;

  const onPromo = async () => {
    try { const { cart: c } = await applyPromo(cart.id, code); replace(c); setPromoMsg({ ok: true, t: `${code.toUpperCase()} applied — 10% off` }); }
    catch (e) { setPromoMsg({ ok: false, t: e.message }); }
  };

  const finish = async () => {
    const { order } = await sdk.store.cart.complete(cart.id);
    await reset();
    router.push(`/order/${order.id}`);
  };

  // Mobile money: push a PIN prompt to the customer's phone, then wait.
  const sendPrompt = async () => {
    setMm({ stage: "sending" });
    const { cart: c } = await sdk.store.payment.initiatePaymentSession(cart, {
      provider_id: network.provider_id,
      data: { phone: normalise(momoNumber), network: network.id },
    });
    replace(c);
    await wait(1600);
    setMm({ stage: "awaiting", reference: c.payment_collection.payment_sessions[0].data.reference });
  };
  const onPin = async () => {
    setMm((m) => ({ ...m, stage: "confirming" }));
    await wait(1800);
    const { cart: c } = await simulateMobileMoney(cart.id, "approved");
    const txn = c.payment_collection.payment_sessions[0].data.transaction_id;
    setMm((m) => ({ ...m, stage: "approved", txn }));
    await wait(2200);
    await finish();
  };
  const onFail = (outcome) => async () => {
    await simulateMobileMoney(cart.id, outcome);
    setMm((m) => ({ ...m, stage: outcome }));
  };

  const place = async () => {
    setPlacing(true);
    await sdk.store.cart.update(cart.id, { email: form.email, shipping_address: { ...form } });
    if (pay === "momo") {
      setPlacing(false);
      return sendPrompt();
    }
    const provider_id = pay === "card" ? "pp_card" : "pp_system_default";
    await sdk.store.payment.initiatePaymentSession(cart, { provider_id, data: {} });
    if (pay === "card") {
      await wait(1200);
      await sdk.store.cart.update(cart.id, {}).then(({ cart: c }) => {
        const ses = { ...c.payment_collection.payment_sessions[0], status: "authorized", data: { ...c.payment_collection.payment_sessions[0].data, card: "Visa •••• 4242" } };
        return sdk.store.cart.update(cart.id, { payment_collection: { ...c.payment_collection, payment_sessions: [ses] } });
      });
    }
    await finish();
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
              <div key={o.id}>
                <div className={`opt ${pay === o.id ? "on" : ""}`} onClick={() => setPay(o.id)} role="radio" aria-checked={pay === o.id} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setPay(o.id)}>
                  <span className="dot" />
                  <div><b>{o.name}</b><span>{o.detail}</span></div>
                  <span className="logos">{o.logos.map((l) => <i key={l} className={`lg-${l.toLowerCase()}`}>{l}</i>)}</span>
                </div>
                {o.id === "momo" && pay === "momo" && (
                  <div className="momo-panel">
                    <label className="field">
                      <span>Mobile money number</span>
                      <input id="momo-number" type="tel" inputMode="tel" placeholder="0772 123 456" value={momoNumber}
                        onChange={(e) => { setMomoNumber(e.target.value); setMomoEdited(true); setNetPick(null); }} />
                    </label>
                    <div className="nets" role="radiogroup" aria-label="Network">
                      {Object.values(MOMO).map((n) => (
                        <button key={n.id} type="button" role="radio" aria-checked={network?.id === n.id}
                          className={`net net-${n.id} ${network?.id === n.id ? "on" : ""}`} onClick={() => setNetPick(n.id)}>
                          {n.name}
                        </button>
                      ))}
                    </div>
                    <p className="muted small">
                      {!normalise(momoNumber)
                        ? "Enter the number registered for MTN MoMo or Airtel Money."
                        : detected && !netPick
                          ? <>Detected <b>{detected.name}</b> from the number. You&apos;ll get a prompt on {display(momoNumber)} to approve with your PIN.</>
                          : network
                            ? <>You&apos;ll get a {network.name} prompt on {display(momoNumber)} to approve with your PIN.</>
                            : "We couldn't tell the network from this number — pick MTN or Airtel."}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="muted small" style={{ marginTop: 14 }}>Demo checkout — no real money moves.</p>
        </div>

        <button className="btn solid wide" disabled={!valid || placing} onClick={place} style={{ height: 58, fontSize: 16 }}>
          {placing ? "Placing your order…" : pay === "momo" ? `Pay ${money(cart.total)} with ${network ? network.name : "mobile money"}` : `Place order — ${money(cart.total)}`}
        </button>
        {!valid && <p className="muted small" style={{ marginTop: 10 }}>Add your email, a Ugandan phone number, your name{ship !== "so_pickup" ? ", your address" : ""}{pay === "momo" ? " and your mobile money number" : ""} to continue.</p>}
        {mm && network && (
          <MobileMoneyPrompt
            network={network}
            phone={momoNumber}
            amount={cart.total}
            reference={mm.reference}
            txn={mm.txn}
            stage={mm.stage}
            onPin={onPin}
            onDecline={onFail("declined")}
            onTimeout={onFail("timeout")}
            onResend={sendPrompt}
            onSwitch={() => { setMm(null); setPay("cod"); }}
            onClose={() => setMm(null)}
          />
        )}
      </div>

      <aside className="summary">
        <p className="eyebrow" style={{ marginBottom: 6 }}>Order summary</p>
        {cart.items.map((i) => {
          const p = byHandle(i.product_handle);
          return (
            <div className="line" key={i.id}>
              <div className="line-thumb" style={{ background: p.metadata.stage }}>
                <span className="qty-dot">{i.quantity}</span>
                <Photo src={img(p, "front")} alt="" pack />
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
        <p className="muted small">All prices in Uganda Shillings.</p>
      </aside>
    </div>
  );
}
