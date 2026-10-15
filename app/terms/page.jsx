import Link from "next/link";
import { DocPage, Sec, Fact } from "@/components/Doc";
import { COMPANY, LAST_UPDATED } from "@/lib/company";
import { FREE_DELIVERY_AT, money } from "@/lib/data";

export const metadata = {
  title: "Terms & conditions — The Pantry Harvest Co.",
  description: "The terms that apply when you buy from The Pantry Harvest Co. online, under the laws of Uganda.",
};

const SECTIONS = [
  { id: "who", title: "Who we are" },
  { id: "scope", title: "These terms" },
  { id: "orders", title: "Placing an order" },
  { id: "prices", title: "Prices" },
  { id: "payment", title: "Payment" },
  { id: "delivery", title: "Delivery" },
  { id: "cancel", title: "Your right to cancel" },
  { id: "quality", title: "Quality, faults & your legal rights" },
  { id: "allergens", title: "Allergens & food information" },
  { id: "promos", title: "Promotions & jar credit" },
  { id: "liability", title: "Our liability" },
  { id: "privacy", title: "Your information" },
  { id: "comms", title: "Messages from us" },
  { id: "law", title: "Complaints, law & disputes" },
  { id: "changes", title: "Changes to these terms" },
];

export default function Terms() {
  return (
    <DocPage
      eyebrow="Legal"
      title="Terms & conditions"
      intro="Plain-language terms for buying from our online shop. They don't take away any rights you have under Ugandan law — where the law gives you more, the law wins."
      updated={LAST_UPDATED}
      sections={SECTIONS}
    >
      <Sec id="who" n={1} title="Who we are">
        <p>This shop is run by {COMPANY.tradingName}. The Electronic Transactions Act 2011 requires us to tell you:</p>
        <dl className="facts-list">
          <dt>Legal name</dt><dd><Fact v={COMPANY.legalName} /></dd>
          <dt>Company registration no. (URSB)</dt><dd><Fact v={COMPANY.registrationNumber} /></dd>
          <dt>Directors</dt><dd><Fact v={COMPANY.directors} /></dd>
          <dt>TIN</dt><dd><Fact v={COMPANY.tin} /></dd>
          <dt>Physical address (also for legal notices)</dt><dd>{COMPANY.address}</dd>
          <dt>Phone</dt><dd><Fact v={COMPANY.phone} /></dd>
          <dt>Email</dt><dd>{COMPANY.email}</dd>
          <dt>Customer service hours</dt><dd>{COMPANY.hours}</dd>
        </dl>
      </Sec>

      <Sec id="scope" n={2} title="These terms">
        <p>These terms apply to every order placed on this website by a consumer — someone buying for their own use, not for resale. Shops, restaurants and other businesses buying wholesale are covered by a separate trade agreement; <Link href="/stockists#trade" className="link">ask us for one</Link>.</p>
        <p>You can save or print these terms at any time. A copy of the terms in force when you ordered is included with your order confirmation email.</p>
      </Sec>

      <Sec id="orders" n={3} title="Placing an order">
        <ol>
          <li>Add jars to your basket and go to checkout.</li>
          <li>Before you pay, you&apos;ll see a full summary — every item, size, quantity, delivery option and the total in Uganda Shillings. You can go back and correct anything, or leave without ordering.</li>
          <li>When you press <b>Pay</b> or <b>Place order</b>, you are offering to buy those items on these terms.</li>
          <li>Our contract is formed when we send your order confirmation with an order number. Until then we may decline an order — for example if an item has sold out, a price was clearly displayed in error, or we can&apos;t deliver to your address. If we decline after you&apos;ve paid, we refund you in full.</li>
        </ol>
        <p>You must be 18 or over, or have a parent or guardian&apos;s permission, to place an order.</p>
      </Sec>

      <Sec id="prices" n={4} title="Prices">
        <p>All prices are in <b>Uganda Shillings (UGX)</b> and include any taxes that apply. Delivery is shown separately at checkout before you pay; Kampala delivery is free on orders of {money(FREE_DELIVERY_AT)} or more. The total you see before you pay is the total you pay — there are no hidden fees.</p>
        <p>Supermarket prices are set by each retailer and may differ from ours.</p>
      </Sec>

      <Sec id="payment" n={5} title="Payment">
        <p>You can pay with:</p>
        <ul>
          <li><b>MTN MoMo or Airtel Money</b> — we send a payment request to the number you give us, and you approve it with your PIN on your own phone. The amount is reserved only when you approve it.</li>
          <li><b>Visa or Mastercard</b> — you pay on our payment provider&apos;s secure page. We never see or store your full card number.</li>
          <li><b>Pay on delivery</b> — cash or mobile money to our rider, for Kampala-area deliveries and kitchen collection.</li>
        </ul>
        <p>Payments are processed by licensed payment providers over encrypted connections, as the Electronic Transactions Act 2011 requires. <b>We will never ask for your mobile money PIN, card PIN or one-time password</b> by phone, SMS, WhatsApp or email. If anyone does, it isn&apos;t us.</p>
        <p>If a mobile money payment leaves your wallet but you don&apos;t receive an order confirmation, contact us with the transaction ID and we&apos;ll confirm the order or refund you.</p>
      </Sec>

      <Sec id="delivery" n={6} title="Delivery">
        <p>Delivery areas, fees and timings are set out on our <Link href="/delivery" className="link">delivery &amp; returns page</Link>, which forms part of these terms. Your order is yours, and at your risk, once it has been handed to you or someone at your delivery address. If we can&apos;t deliver within 30 days of your order for reasons within our control, you can cancel and we&apos;ll refund you in full.</p>
      </Sec>

      <Sec id="cancel" n={7} title="Your right to cancel">
        <ul>
          <li><b>Before your batch is cooked</b> you can cancel any order free, for a full refund, up to 12:00 the day before your cooking day.</li>
          <li><b>After delivery</b>, under section 25 of the Electronic Transactions Act 2011, you can cancel within <b>7 days</b> of receiving your goods. You pay only the direct cost of returning them, and we refund you within <b>30 days</b> of cancellation.</li>
          <li>Because our products are perishable food, returned jars must be <b>unopened, sealed and stored as directed</b>. For food safety we cannot accept back opened jars that aren&apos;t faulty.</li>
        </ul>
        <p>To cancel, reply to your order confirmation or contact us using the details above with your order number.</p>
      </Sec>

      <Sec id="quality" n={8} title="Quality, faults & your legal rights">
        <p>Under the Sale of Goods and Supply of Services Act 2018, the food we sell must <b>match its description</b> and be of <b>satisfactory quality</b> — safe, in good condition and fit to eat by its best-before date when stored as directed.</p>
        <p>If a jar isn&apos;t, we&apos;ll <b>replace it</b> at no cost, or if you prefer, <b>refund</b> it. Just tell us, with a photo and the batch code from the lid if you can. See <Link href="/delivery#faulty" className="link">damaged or faulty jars</Link>. Nothing in these terms limits these rights.</p>
        <p>Natural variation is part of small-batch cooking: colour, texture and heat can vary slightly between batches. That isn&apos;t a fault.</p>
      </Sec>

      <Sec id="allergens" n={9} title="Allergens & food information">
        <p>Each product page lists full ingredients with allergens highlighted, and our <Link href="/quality" className="link">quality page</Link> has an allergen table. The label on the jar you receive is the definitive source: if it ever differs from the website, follow the label and let us know.</p>
        <p>Our kitchen handles <b>milk, tree nuts (cashews) and sesame</b>. If you have a severe allergy, please contact us before ordering.</p>
        <p>Health information on our website is general information about ingredients, not medical advice.</p>
      </Sec>

      <Sec id="promos" n={10} title="Promotions & jar credit">
        <p>Promo codes apply to product prices only, not delivery, can&apos;t be exchanged for cash, and one code applies per order. Each code&apos;s expiry and conditions are shown where it&apos;s published.</p>
        <p>Jar return credit (UGX 1,000 per returned jar) is added to your account, never expires, can&apos;t be exchanged for cash, and is used on online orders only.</p>
      </Sec>

      <Sec id="liability" n={11} title="Our liability">
        <p>We are responsible for loss or damage you suffer that is a foreseeable result of us breaking these terms or failing to take reasonable care. We are not responsible for losses that weren&apos;t foreseeable, or for business losses — our products are for household use.</p>
        <p>Nothing in these terms limits our liability for death or personal injury caused by our negligence, for fraud, or for anything else the law doesn&apos;t allow us to limit. Any term that tries to remove rights you have under Part IV of the Electronic Transactions Act 2011 has no effect.</p>
      </Sec>

      <Sec id="privacy" n={12} title="Your information">
        <p>We use your personal information to take, deliver and support your orders, as described in our <Link href="/privacy" className="link">privacy notice</Link>, in line with the Data Protection and Privacy Act 2019.</p>
      </Sec>

      <Sec id="comms" n={13} title="Messages from us">
        <p>We&apos;ll send you SMS, email or WhatsApp messages about your order. We&apos;ll only send recipes, new flavours and offers if you&apos;ve said yes, and every marketing message has a free way to stop them. Reply STOP or use the unsubscribe link at any time.</p>
      </Sec>

      <Sec id="law" n={14} title="Complaints, law & disputes">
        <p>If something has gone wrong, please contact us first — most problems are fixed within a day. We aim to respond to complaints within 2 working days and resolve them within 14.</p>
        <p>These terms are governed by the laws of Uganda, and the courts of Uganda have jurisdiction over any dispute. This doesn&apos;t stop you using any consumer protection or mediation process available to you.</p>
      </Sec>

      <Sec id="changes" n={15} title="Changes to these terms">
        <p>We may update these terms, for example when the law or our services change. The version that applies to your order is the one on our website when you placed it. The date at the top shows when they last changed.</p>
      </Sec>
    </DocPage>
  );
}
