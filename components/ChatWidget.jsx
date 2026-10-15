"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/lib/cart";

export const CONTACT = {
  wa: "256773041379", // international format, no + or spaces (wa.me requirement)
  tel: "+256773041379",
  display: "+256 773 041 379",
};

export const waLink = (text) => `https://wa.me/${CONTACT.wa}?text=${encodeURIComponent(text)}`;

export const ChatIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M12 3.5c-4.7 0-8.5 3.4-8.5 7.7 0 2.3 1.1 4.3 2.9 5.7l-.7 3.6 3.8-2.1c.8.2 1.6.3 2.5.3 4.7 0 8.5-3.4 8.5-7.6S16.7 3.5 12 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <circle cx="8.3" cy="11.3" r="1.1" fill="currentColor" /><circle cx="12" cy="11.3" r="1.1" fill="currentColor" /><circle cx="15.7" cy="11.3" r="1.1" fill="currentColor" />
  </svg>
);

function hoursNow() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Kampala" }));
  const open = now.getDay() >= 1 && now.getDay() <= 6 && now.getHours() >= 8 && now.getHours() < 17;
  return open;
}

// Quick questions change with the page the customer is on.
function suggestions(pathname) {
  const m = pathname.match(/^\/products\/([\w-]+)/);
  const p = m && PRODUCTS.find((x) => x.handle === m[1]);
  if (p) return {
    hello: `Questions about ${p.title}? Ask us anything — ingredients, heat, how to use it.`,
    chips: [
      `Is ${p.title} suitable for children?`,
      `How long does ${p.title} keep once opened?`,
      `Can I order ${p.title} in bulk?`,
      `What goes well with ${p.title}?`,
    ],
  };
  const o = pathname.match(/^\/order\/([\w-]+)/);
  if (o) return {
    hello: "Thanks for your order! Questions about delivery or payment? We're here.",
    chips: [`Where is my order ${o[1]}?`, "Can I change my delivery address?", "I paid by mobile money but have questions"],
  };
  if (pathname.startsWith("/stockists")) return {
    hello: "Looking for a jar near you, or want to stock us in your shop?",
    chips: ["Which store near me has stock?", "I'd like to stock your products", "Do you supply restaurants?"],
  };
  return {
    hello: "Hello! Ask us about our jars, delivery, or an order — we reply on WhatsApp.",
    chips: ["Track my order", "Do you deliver to my area?", "Which jar should I try first?", "I'd like to stock your products"],
  };
}

export default function ChatWidget() {
  const pathname = usePathname() || "/";
  const { open: cartOpen } = useCart();
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(true);
  const [teaser, setTeaser] = useState(false);
  const [text, setText] = useState("");
  const [online, setOnline] = useState(true);
  const inputRef = useRef(null);
  const s = suggestions(pathname);
  const hidden = pathname.startsWith("/checkout") || cartOpen;

  useEffect(() => { setOnline(hoursNow()); }, [open]);

  // A gentle one-time nudge per visit, a few seconds after landing.
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("ph_chat_teased") === "1"; } catch {}
    if (seen) return;
    const t = setTimeout(() => { setTeaser(true); try { sessionStorage.setItem("ph_chat_teased", "1"); } catch {} }, 7000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    setTeaser(false);
    setTyping(true);
    const t = setTimeout(() => { setTyping(false); inputRef.current?.focus({ preventScroll: true }); }, 850);
    const k = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => { clearTimeout(t); window.removeEventListener("keydown", k); };
  }, [open, pathname]);

  const send = (msg) => {
    const body = (msg || text).trim();
    if (!body) return;
    window.open(waLink(body), "_blank", "noopener,noreferrer");
    setText("");
  };

  if (hidden) return null;

  return (
    <div className={`chat ${open ? "is-open" : ""}`}>
      {teaser && !open && (
        <div className="chat-teaser" role="status">
          <button className="chat-teaser-x" onClick={() => setTeaser(false)} aria-label="Dismiss">×</button>
          <button className="chat-teaser-body" onClick={() => setOpen(true)}>
            <b>Questions about a jar?</b>
            <span>Chat with our kitchen team on WhatsApp.</span>
          </button>
        </div>
      )}

      <section className="chat-panel" role="dialog" aria-label="Chat with The Pantry Harvest Co." aria-hidden={!open}>
        <header className="chat-head">
          <span className="chat-avatar"><img src="/brand/logo-mark.svg" alt="" width="26" height="26" /><i className={online ? "on" : ""} /></span>
          <div>
            <b>The Pantry Harvest Co.</b>
            <span>{online ? "Kitchen team · online now" : "Closed now · we reply from 08:00"}</span>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </header>

        <div className="chat-body">
          <p className="chat-day">Today</p>
          {typing ? (
            <div className="bubble them typing" aria-label="Typing"><i /><i /><i /></div>
          ) : (
            <>
              <div className="bubble them">{s.hello}</div>
              <div className="chips">
                {s.chips.map((c, i) => (
                  <button key={c} onClick={() => send(c)} style={{ animationDelay: `${i * 70}ms` }}>{c}</button>
                ))}
              </div>
            </>
          )}
        </div>

        <form className="chat-compose" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <label htmlFor="chat-input" className="sr-only">Your message</label>
          <input id="chat-input" ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message…" autoComplete="off" />
          <button type="submit" disabled={!text.trim()} aria-label="Send on WhatsApp">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 12 20 4l-6 16-2.5-6.5L4 12Z" fill="currentColor" /></svg>
          </button>
        </form>
        <p className="chat-foot">Opens WhatsApp · or call <a href={`tel:${CONTACT.tel}`}>{CONTACT.display}</a></p>
      </section>

      <button className="chat-launch" onClick={() => setOpen(!open)} aria-label={open ? "Close chat" : "Chat with us"} aria-expanded={open}>
        <span className="chat-launch-ico"><ChatIcon /></span>
        <span className="chat-launch-x">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </span>
        {!open && <span className="chat-dot" aria-hidden="true" />}
      </button>
    </div>
  );
}
