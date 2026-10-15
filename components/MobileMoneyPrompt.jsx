"use client";
import { useEffect, useRef, useState } from "react";
import { money } from "@/lib/data";
import { display } from "@/lib/momo";

const WAIT_SECONDS = 90;

// Simulates the customer's side of a mobile money collection: the request is
// sent, a PIN prompt appears on their phone, and they approve or decline.
export default function MobileMoneyPrompt({ network, phone, amount, reference, txn, stage, onPin, onDecline, onTimeout, onResend, onSwitch, onClose }) {
  const [pin, setPin] = useState("");
  const [left, setLeft] = useState(WAIT_SECONDS);
  const pinRef = useRef(null);

  useEffect(() => {
    if (stage !== "awaiting") return;
    setLeft(WAIT_SECONDS);
    setPin("");
    setTimeout(() => pinRef.current?.focus(), 50);
    const t = setInterval(() => setLeft((s) => (s <= 1 ? (clearInterval(t), onTimeout(), 0) : s - 1)), 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const step = (k) => {
    const order = ["sending", "awaiting", "confirming", "approved"];
    const i = order.indexOf(stage), j = order.indexOf(k);
    if (stage === "declined" || stage === "timeout") return j === 0 ? "is-done" : j === 1 ? "is-fail" : "";
    return j < i || stage === "approved" ? "is-done" : j === i ? "is-now" : "";
  };
  const mmss = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
  const failed = stage === "declined" || stage === "timeout";

  return (
    <div className="mm-scrim" role="dialog" aria-modal="true" aria-label={`${network.name} payment`}>
      <div className="mm">
        <div className="mm-side">
          <p className="eyebrow">Pay with {network.name}</p>
          <h2>{failed ? "Payment not completed" : stage === "approved" ? "Payment received" : "Approve on your phone"}</h2>
          <p className="mm-amount">{money(amount)}</p>

          <ol className="mm-steps">
            <li className={step("sending")}><i /> <span>Payment request sent to <b>{display(phone)}</b></span></li>
            <li className={step("awaiting")}>
              <i />
              <span>
                {stage === "declined" ? "Payment declined on your phone" : stage === "timeout" ? "No response before the request expired" : "Enter your PIN on the prompt to approve"}
                {stage === "awaiting" && <em className="mm-timer">Expires in {mmss}</em>}
              </span>
            </li>
            <li className={step("confirming")}><i /> <span>Confirming with {network.short}</span></li>
            <li className={step("approved")}><i /> <span>Order confirmed{txn ? <> · <b>{txn}</b></> : ""}</span></li>
          </ol>

          {stage === "awaiting" && (
            <p className="muted small">
              No prompt after 30 seconds? Check your phone has signal and enough balance on your {network.name} wallet ({network.menu}), then resend.
            </p>
          )}

          <div className="mm-actions">
            {stage === "awaiting" && <button className="link" onClick={onResend}>Resend prompt</button>}
            {failed && <button className="btn solid" onClick={onResend}>Try again</button>}
            {failed && <button className="btn ghost" onClick={onSwitch}>Choose another way to pay</button>}
            {stage !== "approved" && stage !== "confirming" && <button className="link" onClick={onClose}>Cancel</button>}
          </div>
        </div>

        <div className={`mm-phone net-${network.id}`} aria-label="Simulated customer phone">
          <div className="mm-notch" />
          <div className="mm-screen">
            <div className="mm-bar"><span>{new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Kampala" })}</span><span>{network.short} ▂▄▆ ▮</span></div>

            {stage === "sending" && <div className="mm-wait"><span className="mm-spin" />Connecting…</div>}

            {stage === "awaiting" && (
              <form className="ussd" onSubmit={(e) => { e.preventDefault(); if (pin.length >= 4) onPin(pin); }}>
                <p className="ussd-h">{network.name}</p>
                <p>Pay <b>{money(amount)}</b> to THE PANTRY HARVEST CO.</p>
                <p>Ref: {reference}</p>
                <p>Enter PIN to confirm:</p>
                <input
                  ref={pinRef}
                  id="mm-pin"
                  inputMode="numeric"
                  type="password"
                  autoComplete="off"
                  maxLength={network.pinLength}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  aria-label={`${network.name} PIN`}
                />
                <div className="ussd-btns">
                  <button type="button" onClick={onDecline}>Cancel</button>
                  <button type="submit" disabled={pin.length < 4}>Send</button>
                </div>
              </form>
            )}

            {stage === "confirming" && <div className="mm-wait"><span className="mm-spin" />Processing…</div>}

            {stage === "approved" && (
              <div className="sms">
                <p className="sms-from">{network.short === "MTN" ? "MobileMoney" : "AirtelMoney"}</p>
                <p className="sms-body">
                  You have paid {money(amount)} to THE PANTRY HARVEST CO. Ref {reference}. Transaction ID: {txn}.
                </p>
              </div>
            )}

            {failed && (
              <div className="sms">
                <p className="sms-from">{network.short === "MTN" ? "MobileMoney" : "AirtelMoney"}</p>
                <p className="sms-body">
                  {stage === "declined" ? `Transaction ${reference} cancelled. You have not been charged.` : `Payment request ${reference} has expired. You have not been charged.`}
                </p>
              </div>
            )}
          </div>
          <p className="mm-demo">Demo: this screen shows the prompt your customer receives. Any 4–5 digit PIN approves.</p>
        </div>
      </div>
    </div>
  );
}
