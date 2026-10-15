"use client";
import Link from "next/link";
import { useState } from "react";
import { PRODUCTS, money, fromPrice } from "@/lib/data";
import { useCart } from "@/lib/cart";
import Jar from "@/components/Jar";
import { badgeClass } from "@/components/Reveal";

const VIEWS = ["front", "pair", "shelf"];

export default function ProductView({ handle }) {
  const product = PRODUCTS.find((p) => p.handle === handle);
  const m = product.metadata;
  const { add } = useCart();
  const [variant, setVariant] = useState(product.variants.find((v) => v.inventory_quantity > 0) || product.variants[0]);
  const [qty, setQty] = useState(1);
  const [view, setView] = useState("front");
  const inStock = variant.inventory_quantity > 0;
  const others = PRODUCTS.filter((p) => p.id !== product.id);

  const Stage = ({ kind, w }) => {
    if (kind === "pair")
      return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: w * 0.08 }}>
          <Jar product={product} size={product.variants[0].title} width={w * 0.62} />
          <Jar product={product} size={product.variants[1].title} width={w * 0.8} />
        </div>
      );
    if (kind === "shelf")
      return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: w * 0.04 }}>
          {[0, 1, 2].map((i) => <Jar key={i} product={product} size={variant.title} width={w * 0.48} shadow={i === 1} />)}
        </div>
      );
    return <Jar product={product} size={variant.title} width={w} />;
  };

  return (
    <div className="shell">
      <p className="crumbs"><Link href="/">Home</Link> / <Link href="/#range">Shop</Link> / {product.title}</p>
      <div className="pdp">
        <div className="pdp-media">
          <div className="pdp-stage" style={{ background: m.stage }}>
            <span className="serif">{view === "front" ? "sealed this week" : view === "pair" ? "two sizes" : "stock the shelf"}</span>
            <div key={view} style={{ animation: "pop .45s ease" }}>{Stage({ kind: view, w: 280 })}</div>
          </div>
          <div className="views">
            {VIEWS.map((k) => (
              <button key={k} className={view === k ? "on" : ""} style={{ background: m.stage }} onClick={() => setView(k)} aria-label={`${k} view`}>
                {Stage({ kind: k, w: 80 })}
              </button>
            ))}
          </div>
        </div>

        <div className="pdp-info">
          <p className="eyebrow" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            Pantry Harvest Co.{m.badge && <span className={`badge ${badgeClass(m.badge)}`}>{m.badge.toUpperCase()}</span>}
          </p>
          <h1>{product.title}</h1>
          <p className="sub">{product.subtitle}</p>

          <div className="pdp-price">
            <b>{money(variant.calculated_price.calculated_amount)}</b>
            <span className="muted">{variant.title} jar{fromPrice(product) < variant.calculated_price.calculated_amount ? ` · from ${money(fromPrice(product))}` : ""}</span>
          </div>

          <div className="opt-label">
            <span className="eyebrow">Size</span>
            <span className="muted">
              {inStock ? (variant.inventory_quantity < 10 ? `Only ${variant.inventory_quantity} jars left` : "In stock · ships next batch") : "Sold out this batch"}
            </span>
          </div>
          <div className="sizes">
            {product.variants.map((v) => (
              <button key={v.id} className={v.id === variant.id ? "on" : ""} disabled={v.inventory_quantity === 0} onClick={() => setVariant(v)}>
                <b>{v.title}</b><span>{v.inventory_quantity === 0 ? "Sold out" : money(v.calculated_price.calculated_amount)}</span>
              </button>
            ))}
          </div>

          <div className="buy">
            <div className="stepper lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Increase">+</button>
            </div>
            <button className="btn solid" disabled={!inStock} onClick={() => add(variant.id, qty, `${qty} × ${product.title} ${variant.title}`)}>
              {inStock ? `Add to basket — ${money(variant.calculated_price.calculated_amount * qty)}` : "Sold out"}
            </button>
          </div>

          <div className="trust">
            <div><b>Free delivery</b>On orders over $40</div>
            <div><b>Cooked {product.handle === "hummus" ? "fresh" : "twice weekly"}</b>Monday &amp; Thursday</div>
            <div><b>Jar return</b>$0.50 off per empty</div>
          </div>

          <p style={{ fontSize: 16, color: "var(--ink-2)", marginBottom: 26 }}>{product.description}</p>

          <details open>
            <summary>Use it with</summary>
            <div className="pairs">{m.pairs.map((x) => <span key={x}>{x}</span>)}</div>
          </details>
          <details>
            <summary>Ingredients</summary>
            <div>
              {m.ingredients}
              {m.heat > 0 && (
                <p style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center" }}>
                  <span className="muted small">Heat</span>
                  <span className="heat">{[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= m.heat ? "on" : ""} />)}</span>
                </p>
              )}
            </div>
          </details>
          <details>
            <summary>Storage</summary>
            <div>{m.storage}</div>
          </details>
        </div>
      </div>

      <section className="sec" style={{ paddingTop: 80, paddingBottom: 40 }}>
        <div className="sec-label eyebrow"><span>—</span>The rest of the pantry</div>
        <div className="more">
          {others.map((p) => (
            <Link key={p.id} href={`/products/${p.handle}`} className="card">
              <div className="card-stage" style={{ background: p.metadata.stage }}><div><Jar product={p} size={p.variants[0].title} width={150} /></div></div>
              <h3>{p.title}</h3>
              <p>{p.subtitle} · from {money(fromPrice(p))}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
