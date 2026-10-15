import Link from "next/link";
import { DocPage, Sec, Fact } from "@/components/Doc";
import { COMPANY, LAST_UPDATED } from "@/lib/company";

export const metadata = {
  title: "Privacy notice — The Pantry Harvest Co.",
  description: "What personal information The Pantry Harvest Co. collects, why, who it's shared with, and your rights under Uganda's Data Protection and Privacy Act 2019.",
};

const SECTIONS = [
  { id: "us", title: "Who is responsible" },
  { id: "collect", title: "What we collect" },
  { id: "why", title: "Why we use it" },
  { id: "share", title: "Who we share it with" },
  { id: "abroad", title: "Storage outside Uganda" },
  { id: "keep", title: "How long we keep it" },
  { id: "secure", title: "Keeping it safe" },
  { id: "rights", title: "Your rights" },
  { id: "device", title: "Cookies & your browser" },
  { id: "contact", title: "Questions & complaints" },
];

export default function Privacy() {
  return (
    <DocPage
      eyebrow="Legal"
      title="Privacy notice"
      intro="We collect only what we need to cook, deliver and support your order, and we never sell your information."
      updated={LAST_UPDATED}
      sections={SECTIONS}
    >
      <Sec id="us" n={1} title="Who is responsible">
        <p>{COMPANY.tradingName} (<Fact v={COMPANY.legalName} />), {COMPANY.address}, is the data controller for information collected through this website and our customer service.</p>
        <p>We are registered with Uganda&apos;s Personal Data Protection Office (PDPO) under the Data Protection and Privacy Act 2019. Registration number: <Fact v={COMPANY.pdpoRegistration} />.</p>
      </Sec>

      <Sec id="collect" n={2} title="What we collect">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Information</th><th>Examples</th><th>Where it comes from</th></tr></thead>
            <tbody>
              <tr><td>Contact details</td><td>Name, phone number, email</td><td>You, at checkout</td></tr>
              <tr><td>Delivery details</td><td>Address, area, landmarks, delivery notes</td><td>You, at checkout</td></tr>
              <tr><td>Order history</td><td>What you bought, when, jar credits</td><td>Our shop</td></tr>
              <tr><td>Payment records</td><td>Mobile money number, network, transaction ID, payment status, last four card digits</td><td>You and our payment providers</td></tr>
              <tr><td>Messages</td><td>Emails, SMS and WhatsApp messages with us, complaints, photos of faulty jars</td><td>You</td></tr>
              <tr><td>Technical data</td><td>Basket contents saved in your browser</td><td>Your browser</td></tr>
            </tbody>
          </table>
        </div>
        <p>We <b>never</b> collect or store your mobile money PIN, card PIN, full card number or one-time passwords. Those go only to your network or your bank.</p>
        <p>We don&apos;t knowingly collect information about children, and we don&apos;t collect sensitive information such as health data. If you tell us about an allergy so we can help you choose safely, we use it only to answer you.</p>
      </Sec>

      <Sec id="why" n={3} title="Why we use it">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Purpose</th><th>Our basis under the Act</th></tr></thead>
            <tbody>
              <tr><td>Taking payment, cooking and delivering your order</td><td>Needed to perform our contract with you</td></tr>
              <tr><td>Order updates by SMS, email or WhatsApp</td><td>Needed to perform our contract with you</td></tr>
              <tr><td>Refunds, complaints and quality investigations</td><td>Needed to perform our contract; our legal obligations</td></tr>
              <tr><td>Keeping tax and accounting records</td><td>Legal obligation</td></tr>
              <tr><td>Preventing fraud and payment abuse</td><td>Our legitimate interest in a safe shop</td></tr>
              <tr><td>Recipes, new flavours and offers</td><td>Your consent — only if you opt in, and you can withdraw it any time</td></tr>
            </tbody>
          </table>
        </div>
        <p>We use your information only for these purposes, and only as much as each one needs.</p>
      </Sec>

      <Sec id="share" n={4} title="Who we share it with">
        <ul>
          <li><b>Payment providers</b> — MTN Mobile Money, Airtel Money and our card payment provider — to request and confirm your payment.</li>
          <li><b>Our delivery riders</b> — your name, phone number, address and order, only for delivery.</li>
          <li><b>Service providers</b> who host our website, send SMS and email, and keep our accounts, under contracts that require them to protect your data and use it only on our instructions.</li>
          <li><b>Authorities</b> such as the Uganda Revenue Authority or police, where the law requires it.</li>
        </ul>
        <p>We never sell or rent your personal information, and we don&apos;t share it with supermarkets or other brands for their marketing.</p>
      </Sec>

      <Sec id="abroad" n={5} title="Storage outside Uganda">
        <p>Some of our service providers, such as website hosting and email, store data on servers outside Uganda. Where they do, we make sure the country or the provider offers protection at least equivalent to the Data Protection and Privacy Act, as the Act requires, or we ask for your consent.</p>
      </Sec>

      <Sec id="keep" n={6} title="How long we keep it">
        <ul>
          <li><b>Order and payment records:</b> as long as tax law requires us to keep accounting records.</li>
          <li><b>Delivery addresses:</b> while you have an account, or 2 years after your last order.</li>
          <li><b>Complaint and quality records:</b> 3 years, so we can trace any batch issues.</li>
          <li><b>Marketing preferences:</b> until you unsubscribe, then only a record that you opted out.</li>
        </ul>
        <p>After that we delete or anonymise it.</p>
      </Sec>

      <Sec id="secure" n={7} title="Keeping it safe">
        <p>Our website uses encrypted (HTTPS) connections, payments go through licensed providers, and only staff who need your details for your order can see them. If a breach ever puts your information at risk, we will report it to the Personal Data Protection Office and tell you, as the Act requires.</p>
      </Sec>

      <Sec id="rights" n={8} title="Your rights">
        <p>Under the Data Protection and Privacy Act 2019 you can:</p>
        <ul>
          <li><b>Access</b> the personal information we hold about you;</li>
          <li><b>Correct</b> anything that&apos;s wrong or out of date;</li>
          <li>Ask us to <b>delete</b> information we no longer need;</li>
          <li><b>Object</b> to us using your information, including for marketing;</li>
          <li><b>Withdraw consent</b> to marketing at any time.</li>
        </ul>
        <p>Email {COMPANY.email} from the address on your orders, or tell us the phone number you order with. We&apos;ll respond within 30 days. It&apos;s free.</p>
      </Sec>

      <Sec id="device" n={9} title="Cookies & your browser">
        <p>We store your basket and recent order reference in your browser so they&apos;re still there when you come back. We don&apos;t use advertising cookies or sell browsing data. If we add analytics in future, we&apos;ll update this notice and ask first where required.</p>
      </Sec>

      <Sec id="contact" n={10} title="Questions & complaints">
        <p>Contact us at {COMPANY.email} or write to {COMPANY.tradingName}, {COMPANY.address}. If you&apos;re unhappy with how we&apos;ve handled your information, you can complain to the <b>Personal Data Protection Office</b>, part of the National Information Technology Authority – Uganda (NITA-U).</p>
        <p>See also our <Link href="/terms" className="link">terms &amp; conditions</Link>.</p>
      </Sec>
    </DocPage>
  );
}
