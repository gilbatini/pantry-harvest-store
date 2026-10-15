"use client";
import Link from "next/link";
import { useState } from "react";
import { AREAS, RETAILERS, mapsUrl, branchCount } from "@/lib/stockists";
import Photo from "@/components/Photo";

export default function StockistsView() {
  const [area, setArea] = useState("all");
  const [sent, setSent] = useState(false);
  const shown = RETAILERS.map((r) => ({ ...r, branches: r.branches.filter((b) => area === "all" || b.area === area) })).filter((r) => r.branches.length);
  const count = shown.reduce((n, r) => n + r.branches.length, 0);

  return (
    <div className="shell">
      <p className="crumbs"><Link href="/">Home</Link> / Stockists</p>

      <section className="stk-hero">
        <div>
          <p className="eyebrow">Find us in store</p>
          <h1>On the shelf at <em>{branchCount} stores</em> in Kampala &amp; Entebbe.</h1>
          <p className="doc-intro">
            Pick up a jar on your weekly shop at Uganda&apos;s major supermarkets, or order online and have it
            delivered by our rider. Every store jar comes from the same twice-weekly batches as online orders.
          </p>
          <div className="stk-chains">
            {RETAILERS.map((r) => <span key={r.id}>{r.name}</span>)}
          </div>
        </div>
        <div className="stk-img"><Photo src="kitchen-shelf" alt="Pantry Harvest jars on a shelf" eager /></div>
      </section>

      <div className="stk-bar" role="tablist" aria-label="Filter by area">
        <button role="tab" aria-selected={area === "all"} className={area === "all" ? "on" : ""} onClick={() => setArea("all")}>All areas</button>
        {AREAS.map((a) => (
          <button key={a.id} role="tab" aria-selected={area === a.id} className={area === a.id ? "on" : ""} onClick={() => setArea(a.id)}>{a.name}</button>
        ))}
        <span className="muted small">{count} {count === 1 ? "store" : "stores"}</span>
      </div>

      <div className="stk-list">
        {shown.map((r) => (
          <section key={r.id} className="stk-retailer">
            <header>
              <h2>{r.name}</h2>
              <p className="muted">{r.note}</p>
            </header>
            <ul>
              {r.branches.map((b) => (
                <li key={b.name}>
                  <div>
                    <b>{r.name} {b.name}</b>
                    <span>{b.place}</span>
                    <span className="stk-area">{AREAS.find((a) => a.id === b.area).name}</span>
                  </div>
                  <a href={mapsUrl(r.name, b)} target="_blank" rel="noopener noreferrer" className="stk-dir">Directions ↗</a>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {(area === "all" || area === "central") && <section className="stk-retailer stk-kitchen">
          <header>
            <h2>Our kitchen</h2>
            <p className="muted">Collect online orders for free, or pick up a jar straight from the batch.</p>
          </header>
          <ul>
            <li>
              <div>
                <b>The Pantry Harvest Co. kitchen</b>
                <span>Kololo, Kampala · Mon–Sat 08:00–17:00</span>
                <span className="stk-area">Central Kampala</span>
              </div>
              <Link href="/delivery#collect" className="stk-dir">How collection works →</Link>
            </li>
          </ul>
        </section>}
      </div>

      <section className="stk-tips">
        <div><b>Not on the shelf?</b><p>Batches sell through quickly. Ask at customer service — stores can order from us twice a week.</p></div>
        <div><b>Same jar, same price</b><p>Store prices are set by each retailer and may differ slightly from our online prices.</p></div>
        <div><b>Return your empties</b><p>The UGX 1,000 jar credit works on online orders and at our kitchen, not in supermarkets.</p></div>
      </section>

      <section className="stk-trade" id="trade">
        <div>
          <p className="eyebrow">For shops, delis and restaurants</p>
          <h2>Stock The Pantry Harvest Co.</h2>
          <p>
            We supply supermarkets, delis, hotels and restaurants in Kampala and Entebbe with twice-weekly
            deliveries, shelf-ready cases of 12 and point-of-sale cards for each flavour.
          </p>
        </div>
        {sent ? (
          <div className="trade-ok"><b>Thanks — we&apos;ll be in touch within two working days.</b><p className="muted small">Demo: this form doesn&apos;t send anywhere yet.</p></div>
        ) : (
          <form className="trade-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <label className="field"><span>Business name</span><input id="trade-biz" required /></label>
            <label className="field"><span>Your name</span><input id="trade-name" required /></label>
            <label className="field"><span>Phone</span><input id="trade-phone" type="tel" placeholder="+256 7XX XXX XXX" required /></label>
            <label className="field"><span>Type of business</span>
              <select id="trade-type" defaultValue="Supermarket"><option>Supermarket</option><option>Deli or shop</option><option>Restaurant or hotel</option><option>Other</option></select>
            </label>
            <button className="btn solid">Request a trade price list</button>
          </form>
        )}
      </section>

      <p className="muted small stk-note">Stockist list shown for this demo — confirm current listings before launch.</p>
    </div>
  );
}
