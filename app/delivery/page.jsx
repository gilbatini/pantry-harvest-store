import Link from "next/link";
import { DocPage, Sec } from "@/components/Doc";
import { SHIPPING, FREE_DELIVERY_AT, JAR_CREDIT, money } from "@/lib/data";
import { COMPANY, LAST_UPDATED } from "@/lib/company";

export const metadata = {
  title: "Delivery & returns — The Pantry Harvest Co.",
  description: "Kampala delivery fees and times, kitchen collection, the jar return scheme, cancellations, refunds and what to do if something's wrong.",
};

const SECTIONS = [
  { id: "zones", title: "Delivery areas & fees" },
  { id: "timing", title: "When your order arrives" },
  { id: "collect", title: "Collecting from the kitchen" },
  { id: "receiving", title: "Receiving your order" },
  { id: "jars", title: "The jar return scheme" },
  { id: "cancel", title: "Cancelling an order" },
  { id: "faulty", title: "Damaged or faulty jars" },
  { id: "refunds", title: "How refunds are paid" },
  { id: "faq", title: "Questions" },
];

const FAQ = [
  ["Do you deliver outside Kampala?", "We deliver within Kampala, Entebbe, Mukono and Wakiso. For anywhere else in Uganda, message us before ordering — we can usually arrange a bus or courier parcel at cost."],
  ["Can I choose a delivery time?", "Our rider calls on the morning of delivery to agree a two-hour window. If you need a specific time, add a note at checkout and we'll do our best."],
  ["Is the hummus safe in the heat?", "Hummus travels in an insulated bag with an ice pack and should go straight into the fridge. The other three recipes are fine at room temperature until opened."],
  ["Can someone else receive my order?", "Yes. Anyone at the address can receive it. For pay-on-delivery orders, they'll need to pay the rider."],
  ["I paid by mobile money but didn't get a confirmation.", "Check your SMS for a transaction ID first. If money left your wallet but you have no order confirmation, contact us with the transaction ID — we'll confirm the order or refund you."],
];

export default function Delivery() {
  return (
    <DocPage
      eyebrow="Help"
      title="Delivery & returns"
      intro="Everything about getting your jars to you, bringing the empties back, and putting it right if something goes wrong."
      updated={LAST_UPDATED}
      sections={SECTIONS}
    >
      <Sec id="zones" n={1} title="Delivery areas & fees">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Option</th><th>Where</th><th>When</th><th>Fee</th></tr></thead>
            <tbody>
              <tr><td>{SHIPPING[0].name}</td><td>Kampala</td><td>Within 2 working days of your batch</td><td>{money(SHIPPING[0].amount)}</td></tr>
              <tr><td>{SHIPPING[1].name}</td><td>Kampala, Entebbe, Mukono</td><td>Same day if ordered before 12:00</td><td>{money(SHIPPING[1].amount)}</td></tr>
              <tr><td>{SHIPPING[2].name}</td><td>Kololo kitchen</td><td>Same afternoon, Mon–Sat</td><td>Free</td></tr>
            </tbody>
          </table>
        </div>
        <p><b>Free delivery</b> on Kampala delivery for orders of {money(FREE_DELIVERY_AT)} or more after discounts. Same-day express is always charged. Wakiso deliveries outside these areas are quoted at checkout or by phone.</p>
      </Sec>

      <Sec id="timing" n={2} title="When your order arrives">
        <p>We cook twice a week, on <b>Mondays and Thursdays</b>. Orders placed before <b>12:00 the day before</b> a cooking day join that batch; later orders join the next one. Jars leave the kitchen the same day they are sealed.</p>
        <ul>
          <li>Order by Sunday 12:00 → cooked Monday → delivered Monday to Wednesday.</li>
          <li>Order by Wednesday 12:00 → cooked Thursday → delivered Thursday to Saturday.</li>
          <li>Ready stock (jars already sealed and on our shelf) can go out sooner with same-day express.</li>
        </ul>
        <p>Your order confirmation shows your batch day and an estimated delivery date. We don&apos;t deliver on Sundays or public holidays.</p>
      </Sec>

      <Sec id="collect" n={3} title="Collecting from the kitchen">
        <p>Choose <b>Collect from the kitchen</b> at checkout and we&apos;ll SMS you when your order is ready. Collection is free, from our kitchen in {COMPANY.address.split(",")[0]}, {COMPANY.hours}. Bring your order number; if you chose pay on delivery, you can pay by cash or mobile money when you collect.</p>
        <p>We hold orders for <b>5 days</b>. Hummus is kept chilled until you collect it.</p>
      </Sec>

      <Sec id="receiving" n={4} title="Receiving your order">
        <p>Our rider calls before arriving. Please check your jars at the door — seals should be intact and lids should click down in the centre. If anything is broken or a seal has popped, keep the jar, take a photo and let the rider know, or tell us within 48 hours.</p>
        <p>If nobody is available and we can&apos;t reach you, the rider will bring your order back to the kitchen and we&apos;ll arrange a second attempt free. A third attempt is charged at the standard delivery fee.</p>
      </Sec>

      <Sec id="jars" n={5} title="The jar return scheme">
        <p>Return clean, empty Pantry Harvest jars to our rider or the kitchen and we&apos;ll credit <b>{money(JAR_CREDIT)}</b> per jar to your next online order. Credit is added to your account and never expires.</p>
        <ul>
          <li>Jars should be rinsed and dry. Labels can stay on.</li>
          <li>Lids aren&apos;t reused — keep or recycle them.</li>
          <li>Chipped or cracked jars are recycled, not reused, and still earn the credit.</li>
          <li>Supermarkets can&apos;t accept returns for the scheme.</li>
        </ul>
      </Sec>

      <Sec id="cancel" n={6} title="Cancelling an order">
        <p><b>Before your batch is cooked:</b> cancel any time up to 12:00 the day before your cooking day by replying to your confirmation SMS or email, and we&apos;ll refund you in full.</p>
        <p><b>After delivery:</b> under the Electronic Transactions Act 2011 you can cancel within <b>7 days</b> of receiving your order. Because our jars are food, we can only take back jars that are <b>unopened, sealed and stored as the label says</b>. We&apos;ll refund the price of the returned jars; if you post or courier them back, you pay the direct cost of returning them. Opened jars can&apos;t be resold or reused for food safety reasons, so they can only be refunded if they&apos;re faulty.</p>
      </Sec>

      <Sec id="faulty" n={7} title="Damaged or faulty jars">
        <p>Every jar should arrive sealed, within its best-before date, and taste the way it should. If it doesn&apos;t — a popped seal, broken glass, an off smell or taste, or anything in the jar that shouldn&apos;t be there — <b>don&apos;t eat it</b>. Keep the jar and lid, note the batch code on the lid, and contact us with a photo.</p>
        <p>We&apos;ll replace the jar with your next delivery or refund it, whichever you prefer. This doesn&apos;t affect your rights under the Sale of Goods and Supply of Services Act 2018: food we sell must match its description and be of satisfactory quality.</p>
        <p>Report damage in transit within <b>48 hours</b> of delivery so we can check with our rider. Quality problems can be reported any time before the best-before date.</p>
      </Sec>

      <Sec id="refunds" n={8} title="How refunds are paid">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>You paid with</th><th>We refund to</th><th>Usually within</th></tr></thead>
            <tbody>
              <tr><td>MTN MoMo or Airtel Money</td><td>The same mobile money number</td><td>3 working days</td></tr>
              <tr><td>Visa or Mastercard</td><td>The same card</td><td>5–10 working days, depending on your bank</td></tr>
              <tr><td>Cash on delivery</td><td>Mobile money, to a number you choose</td><td>3 working days</td></tr>
            </tbody>
          </table>
        </div>
        <p>Whatever the method, we always complete refunds within <b>30 days</b> of cancellation, as the law requires. We never ask for your mobile money PIN to send a refund.</p>
      </Sec>

      <Sec id="faq" n={9} title="Questions">
        <div className="faq">
          {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><div>{a}</div></details>)}
        </div>
        <p>Still stuck? Email <b>{COMPANY.email}</b>, {COMPANY.hours}. See also our <Link href="/terms" className="link">terms</Link> and <Link href="/privacy" className="link">privacy notice</Link>.</p>
      </Sec>
    </DocPage>
  );
}
