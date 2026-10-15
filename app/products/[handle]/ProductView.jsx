"use client";
import Link from "next/link";
import { useState } from "react";
import { PRODUCTS, money, fromPrice } from "@/lib/data";
import { useCart } from "@/lib/cart";
import Photo, { img } from "@/components/Photo";
import { badgeClass } from "@/components/Reveal";

const HAS_USE = ["chilli-paste", "basil-pesto"];

export default function ProductView({ handle }) {
  const product = PRODUCTS.find((p) => p.handle === handle);
  const m = product.metadata;
  const { add } = useCart();
  const [variant, setVariant] = useState(product.variants.find((v) => v.inventory_quantity > 0) || product.variants[0]);
  const [qty, setQty] = useState(1);
  const [view, setView] = useState("front");
  const inStock = variant.inventory_quantity > 0;
  const others = PRODUCTS.filter((p) => p.id !== product.id);

  const views = [
    { k: "front", src: img(product, "front"), pack: true, note: "sealed this week", alt: `${product.title} jar` },
    { k: "sizes", src: img(product, "sizes"), pack: true, note: "two sizes", alt: `${product.title} in both jar sizes` },
    ...(HAS_USE.includes(product.handle) ? [{ k: "use", src: img(product, "use"), alt: `${product.title} served at the table` }] : []),
    { k: "life", src: img(product, "life"), alt: `${product.title} jar in the kitchen` },
  ];
  const cur = views.find((x) => x.k === view) || views[0];

  return (
    <div className="shell">
      <p className="crumbs"><Link href="/">Home</Link> / <Link href="/#range">Shop</Link> / {product.title}</p>
      <div className="pdp">
        <div className="pdp-media">
          <div className="pdp-stage" style={{ background: m.stage }}>
            {cur.note && <span className="serif">{cur.note}</span>}
            <Photo key={cur.k} src={cur.src} alt={cur.alt} pack={cur.pack} eager className="fade" />
          </div>
          <div className="views" style={{ gridTemplateColumns: `repeat(${views.length}, 1fr)` }}>
            {views.map((x) => (
              <button key={x.k} className={cur.k === x.k ? "on" : ""} style={{ background: m.stage }} onClick={() => setView(x.k)} aria-label={`Show ${x.alt}`}>
                <Photo src={x.src} alt="" pack={x.pack} />
              </button>
            ))}
          </div>
        </div>

        <div className="pdp-info">
          <p className="eyebrow" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            The Pantry Harvest Co.{m.badge && <span className={`badge ${badgeClass(m.badge)}`}>{m.badge.toUpperCase()}</span>}
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
              <div className="card-stage" style={{ background: p.metadata.stage }}><div><Photo src={img(p, "life")} alt={`${p.title} jar`} /></div></div>
              <h3>{p.title}</h3>
              <p>{p.subtitle} · from {money(fromPrice(p))}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
