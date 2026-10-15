"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { FREE_DELIVERY_AT, PRODUCTS, money } from "@/lib/data";
import Photo, { img } from "./Photo";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Kitchen cooks Monday and Thursday; orders placed before 12:00 the day before join that batch.
// Calculated in Kampala time so it always answers "when will my jars be made?".
function kitchenStatus() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Kampala" }));
  const h = now.getHours();
  const open = now.getDay() >= 1 && now.getDay() <= 6 && h >= 8 && h < 17;
  for (let i = 1; i <= 8; i++) {
    const d = new Date(now); d.setDate(now.getDate() + i);
    if (d.getDay() === 1 || d.getDay() === 4) {
      const cutoff = new Date(d); cutoff.setDate(d.getDate() - 1); cutoff.setHours(12, 0, 0, 0);
      if (now < cutoff) return { open, label: `${open ? "Kitchen open" : "Kitchen closed"} · next batch ${i === 1 ? "tomorrow" : DAYS[d.getDay()]}` };
    }
  }
  return { open, label: open ? "Kitchen open" : "Kitchen closed" };
}

export function Header() {
  const { count, setOpen } = useCart();
  const [status, setStatus] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    setStatus(kitchenStatus());
    const t = setInterval(() => setStatus(kitchenStatus()), 60000);
    const s = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", s, { passive: true });
    return () => { clearInterval(t); window.removeEventListener("scroll", s); };
  }, []);
  return (
    <header className={`hdr ${scrolled ? "is-scrolled" : ""}`}>
      <div className="shell hdr-in">
        <nav className="nav">
          <Link href="/#range">Shop</Link>
          <Link href="/#kitchen">Our kitchen</Link>
          <Link href="/#method">How it&apos;s made</Link>
          <Link href="/#visit">Stockists</Link>
        </nav>
        <Link href="/" className="mark" aria-label="The Pantry Harvest Co. home">
          <img src="/brand/logo-header.svg" alt="The Pantry Harvest Co." width="150" height="100" />
        </Link>
        <div className="hdr-right">
          {status && (
            <span className="status"><i className={status.open ? "on" : ""} />{status.label}</span>
          )}
          <button className="cartbtn" onClick={() => setOpen(true)} aria-label={`Basket, ${count} items`}>
            Basket <b>{count}</b>
          </button>
        </div>
      </div>
    </header>
  );
}

export function CartDrawer() {
  const { cart, open, setOpen, setQty, count } = useCart();
  useEffect(() => {
    const k = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [setOpen]);
  const sub = cart?.item_subtotal || 0;
  const left = Math.max(0, FREE_DELIVERY_AT - sub);
  const byHandle = (h) => PRODUCTS.find((p) => p.handle === h);
  return (
    <>
      <div className={`scrim ${open ? "on" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`drawer ${open ? "on" : ""}`} aria-hidden={!open}>
        <div className="drawer-head">
          <p className="eyebrow">Your basket · {count} {count === 1 ? "jar" : "jars"}</p>
          <button className="x" onClick={() => setOpen(false)} aria-label="Close">×</button>
        </div>
        <div className="ship-meter">
          <p>{left > 0 ? <>Add <b>{money(left)}</b> more for free delivery</> : <><b>Free delivery</b> unlocked</>}</p>
          <div className="bar"><span style={{ width: `${Math.min(100, (sub / FREE_DELIVERY_AT) * 100)}%` }} /></div>
        </div>
        <div className="drawer-body">
          {!cart || cart.items.length === 0 ? (
            <div className="empty">
              <p className="serif">Your pantry is empty.</p>
              <button className="btn ghost" onClick={() => setOpen(false)}>Browse the range</button>
            </div>
          ) : (
            cart.items.map((i) => {
              const p = byHandle(i.product_handle);
              return (
                <div className="line" key={i.id}>
                  <div className="line-thumb" style={{ background: p.metadata.stage }}><Photo src={img(p, "front")} alt="" pack /></div>
                  <div className="line-info">
                    <p className="line-title">{i.product_title}</p>
                    <p className="muted">{i.variant_title} · {money(i.unit_price)}</p>
                    <div className="stepper">
                      <button onClick={() => setQty(i.id, i.quantity - 1)} aria-label="Decrease">−</button>
                      <span>{i.quantity}</span>
                      <button onClick={() => setQty(i.id, i.quantity + 1)} aria-label="Increase">+</button>
                    </div>
                  </div>
                  <div className="line-end">
                    <p>{money(i.unit_price * i.quantity)}</p>
                    <button className="link" onClick={() => setQty(i.id, 0)}>Remove</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {cart && cart.items.length > 0 && (
          <div className="drawer-foot">
            <div className="row"><span>Subtotal</span><b>{money(sub)}</b></div>
            <p className="muted small">Delivery and codes are applied at checkout.</p>
            <Link href="/checkout" className="btn solid wide" onClick={() => setOpen(false)}>Checkout →</Link>
          </div>
        )}
      </aside>
    </>
  );
}

export function Toast() {
  const { toast } = useCart();
  return <div className={`toast ${toast ? "on" : ""}`}>{toast ? <>✓ {toast} added</> : null}</div>;
}

export function Footer() {
  return (
    <footer className="foot" id="visit">
      <div className="shell foot-in">
        <div>
          <img className="foot-logo" src="/brand/logo-full.svg" alt="The Pantry Harvest Co. — Pure Harvest. Pure Flavour." width="220" height="182" loading="lazy" />
          <p className="muted">Small-batch condiments, cooked twice a week and sealed in glass.</p>
        </div>
        <div>
          <p className="eyebrow">Shop</p>
          {PRODUCTS.map((p) => <Link key={p.id} href={`/products/${p.handle}`}>{p.title}</Link>)}
        </div>
        <div>
          <p className="eyebrow">Kitchen</p>
          <span>Cooking Monday &amp; Thursday</span>
          <span>Open Mon–Sat, 08:00–17:00</span>
          <span>hello@pantryharvest.co</span>
        </div>
        <div>
          <p className="eyebrow">The jar promise</p>
          <span>Return your empties for UGX 1,000 off</span>
          <span>No preservatives, ever</span>
        </div>
      </div>
      <div className="shell foot-base">
        <span>© 2026 The Pantry Harvest Co.</span>
        <span>Demo storefront · demo prices in UGX</span>
      </div>
    </footer>
  );
}
