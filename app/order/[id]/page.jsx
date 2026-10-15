"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { sdk } from "@/lib/sdk";
import { PRODUCTS, money } from "@/lib/data";
import { MOMO, masked } from "@/lib/momo";
import Photo, { img } from "@/components/Photo";

const fmt = (d) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

export default function Order() {
  const { id } = useParams();
  const [order, setOrder] = useState(undefined);
  useEffect(() => { sdk.store.order.retrieve(id).then(({ order }) => setOrder(order || null)); }, [id]);

  if (order === undefined) return <div className="shell" style={{ padding: "120px 0" }} />;
  if (order === null)
    return (
      <div className="shell done">
        <p className="serif" style={{ fontSize: 34 }}>We couldn&apos;t find that order.</p>
        <p className="lede">Orders in this demo live in the browser they were placed from.</p>
        <Link href="/" className="btn solid">Back to the shop</Link>
      </div>
    );

  const placed = new Date(order.created_at);
  let batch = new Date(placed);
  do batch.setDate(batch.getDate() + 1); while (![1, 4].includes(batch.getDay()));
  const deliver = new Date(batch); deliver.setDate(batch.getDate() + (order.shipping_methods?.[0]?.id === "so_express" ? 1 : 2));
  const pickup = order.shipping_methods?.[0]?.id === "so_pickup";

  const steps = [
    { t: "Order placed", s: "We've got it — confirmation sent to " + (order.email || "your email"), d: fmt(placed), on: true },
    { t: "Cooking your batch", s: "Your jars join the next kitchen batch", d: fmt(batch) },
    { t: "Sealed & packed", s: "Jarred, sealed and labelled the same day", d: fmt(batch) },
    { t: pickup ? "Ready to collect" : "Out for delivery", s: pickup ? "Collect from the kitchen, Mon–Sat 08:00–17:00" : "Our rider will call before arriving", d: fmt(deliver) },
  ];
  const byHandle = (h) => PRODUCTS.find((p) => p.handle === h);

  const ses = order.payment_collection?.payment_sessions?.[0];
  const net = ses && Object.values(MOMO).find((n) => n.provider_id === ses.provider_id);
  const paid = ses?.status === "authorized";
  const payment = net
    ? { label: `${net.name} · ${masked(ses.data.phone)}`, status: paid ? "Paid" : "Not paid", ref: ses.data.transaction_id, sub: `Ref ${ses.data.reference}` }
    : ses?.provider_id === "pp_card"
      ? { label: ses.data.card || "Card", status: "Paid", ref: null, sub: null }
      : { label: "Pay on delivery", status: "Due on delivery", ref: null, sub: `Pay ${money(order.total)} in cash or mobile money to the rider` };
  steps.splice(1, 0, paid
    ? { t: "Payment received", s: `${net ? net.name : "Card"} · ${money(order.total)}`, d: fmt(placed), on: true }
    : { t: "Payment on delivery", s: `${money(order.total)} due to the rider`, d: fmt(deliver) });

  return (
    <div className="shell done">
      <div className="tick">✓</div>
      <p className="eyebrow" style={{ marginBottom: 14 }}>Order #{order.display_id}</p>
      <h1>Thank you, {order.shipping_address?.first || "friend"}.<br /><em>Your jars are on the list.</em></h1>
      <p className="lede">We cook twice a week, so your order goes into the {batch.toLocaleDateString("en-GB", { weekday: "long" })} batch and leaves the kitchen the same day it&apos;s sealed.</p>

      <div className="track">
        <div className="track-h">
          <p className="eyebrow">Track your order</p>
          <p className="muted small">Estimated {pickup ? "ready" : "arrival"}: <b style={{ color: "var(--ink)" }}>{fmt(deliver)}</b></p>
        </div>
        <div className="tl">
          {steps.map((x) => (
            <div key={x.t} className={`tl-step ${x.on ? "on" : ""}`}>
              <span className="d">{x.on ? "✓" : ""}</span>
              <div><b>{x.t}</b><span>{x.s}</span></div>
              <em>{x.d}</em>
            </div>
          ))}
        </div>
      </div>

      <div className="track">
        <p className="eyebrow" style={{ marginBottom: 6 }}>Receipt</p>
        <div className="paybox">
          <div>
            <b>{payment.label}</b>
            {payment.ref && <span>Transaction ID {payment.ref}</span>}
            {payment.sub && <span>{payment.sub}</span>}
          </div>
          <span className={`paystate ${paid ? "ok" : ""}`}>{payment.status}</span>
        </div>
        {order.items.map((i) => {
          const p = byHandle(i.product_handle);
          return (
            <div className="line" key={i.id} style={{ gridTemplateColumns: "56px 1fr auto" }}>
              <div className="line-thumb" style={{ background: p.metadata.stage, width: 56, height: 66 }}><Photo src={img(p, "front")} alt="" pack /></div>
              <div><p className="line-title">{i.product_title}</p><p className="muted small">{i.variant_title} × {i.quantity}</p></div>
              <div className="line-end"><p>{money(i.unit_price * i.quantity)}</p></div>
            </div>
          );
        })}
        <div className="sums" style={{ borderTop: 0 }}>
          {order.discount_total > 0 && <div className="row"><span>Discount</span><b>−{money(order.discount_total)}</b></div>}
          <div className="row"><span>Delivery</span><b>{order.shipping_total ? money(order.shipping_total) : "Free"}</b></div>
          <div className="row total"><span>{paid ? "Total paid" : "Total due"}</span><b>{money(order.total)}</b></div>
        </div>
      </div>

      <Link href="/#range" className="btn ghost">Continue shopping</Link>
    </div>
  );
}
