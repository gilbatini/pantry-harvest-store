"use client";
import Link from "next/link";
import { PRODUCTS, money, fromPrice } from "@/lib/data";
import { useCart } from "@/lib/cart";
import Photo, { img } from "@/components/Photo";
import Reveal, { badgeClass } from "@/components/Reveal";

const firstInStock = (p) => p.variants.find((v) => v.inventory_quantity > 0);

export default function Home() {
  const { add } = useCart();
  const [chilli] = PRODUCTS;
  const hero = firstInStock(chilli);

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Small-batch kitchen · Sealed in glass</p>
          <h1>Real food,<br />sealed<br /><em>in glass.</em></h1>
          <p className="hero-lede">
            Chilli paste, basil pesto, hummus and beetroot — cooked twice a week in small batches,
            with nothing you couldn&apos;t find in your own kitchen.
          </p>
          <div className="hero-cta">
            <Link href="#range" className="btn solid">Shop the range</Link>
            <Link href="#method" className="btn ghost">How we make it →</Link>
          </div>
          <div className="facts">
            <div><b>48 hrs</b><span>From pot to jar</span></div>
            <div><b>4 recipes</b><span>Made to be used daily</span></div>
            <div><b>0 added</b><span>Preservatives or colours</span></div>
          </div>
        </div>

        <div className="stage stage-hero">
          <Photo src="hero" alt="Chilli Paste jar on a granite counter with Basil Pesto and Beetroot behind it" eager position="50% 60%" />
          <div className="chip">
            <p>{chilli.title}<span>{money(hero.calculated_price.calculated_amount)} · {hero.title} · fresh batch</span></p>
            <button onClick={() => add(hero.id, 1, `${chilli.title} ${hero.title}`)}>+ Add</button>
          </div>
        </div>
      </section>

      {/* ---------------- 01 kitchen ---------------- */}
      <section className="sec" id="kitchen">
        <div className="shell">
          <div className="sec-label eyebrow"><span>01</span>Our kitchen</div>
          <div className="kitchen">
            <Reveal className="kitchen-art">
              <Photo src="kitchen-shelf" alt="Wooden pantry shelves stocked with all four Pantry Harvest jars" />
              <p className="caption">straight from the pantry shelf</p>
            </Reveal>
            <Reveal className="kitchen-copy">
              <p className="big">
                The Pantry Harvest Co. is a small kitchen built around slow cooking, honest ingredients and the
                simple pleasure of opening a jar that tastes like someone made it for you.
              </p>
              <div className="kitchen-meta">
                <span className="eyebrow">Cooked Mon &amp; Thu / Sealed same day</span>
                <Link href="#method">Our story →</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- 02 range ---------------- */}
      <section className="sec" id="range">
        <div className="shell">
          <div className="sec-label eyebrow"><span>02</span>The range</div>
          <div className="range">
            <Reveal>
              <div className="range-head">
                <h2>This week&apos;s batch</h2>
                <span className="serif">jarred Monday, 10:00</span>
              </div>
              <div className="rows">
                {PRODUCTS.map((p) => {
                  const v = firstInStock(p);
                  const low = p.variants.some((x) => x.inventory_quantity > 0 && x.inventory_quantity < 10);
                  return (
                    <div className="prow" key={p.id}>
                      <Link href={`/products/${p.handle}`} className="thumb" style={{ background: p.metadata.stage }}>
                        <Photo src={img(p, "front")} alt="" pack />
                      </Link>
                      <Link href={`/products/${p.handle}`}>
                        <h3>{p.title}{p.metadata.badge && <span className={`badge ${badgeClass(p.metadata.badge)}`}>{p.metadata.badge.toUpperCase()}</span>}</h3>
                        <p>{p.subtitle}{low ? " · only a few jars left" : ""}</p>
                      </Link>
                      <span className="price">from {money(fromPrice(p))}</span>
                      <button className="addbtn" disabled={!v} onClick={() => add(v.id, 1, `${p.title} ${v.title}`)}>+ Add</button>
                    </div>
                  );
                })}
              </div>
              <p className="muted small" style={{ marginTop: 16 }}>Sizes and full details on each product page. Free Kampala delivery over UGX 100,000.</p>
            </Reveal>

            <div className="feature">
              {PRODUCTS.map((p) => (
                <Link key={p.id} href={`/products/${p.handle}`} style={{ background: p.metadata.stage }}>
                  <div><Photo src={img(p, "life")} alt={`${p.title} jar in the kitchen`} /></div>
                  <span>{p.title.toLowerCase()}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 03 method ---------------- */}
      <section className="sec" id="method">
        <div className="shell">
          <div className="sec-label eyebrow"><span>03</span>How it&apos;s made</div>
          <Reveal className="method">
            <div className="step"><span className="n">i.</span><h3>Sourced close</h3><p>Chillies, basil and beetroot bought from growers we know by name, picked days — not weeks — before they reach the pot.</p></div>
            <div className="step"><span className="n">ii.</span><h3>Cooked slowly</h3><p>Two batches a week, by hand, in small pots. Roasted, pounded and simmered the long way, because that&apos;s where the flavour is.</p></div>
            <div className="step"><span className="n">iii.</span><h3>Sealed in glass</h3><p>Jarred and sealed the same day. No plastic, no stabilisers — and every empty you return takes UGX 1,000 off your next order.</p></div>
          </Reveal>
        </div>
      </section>

      <section className="band">
        <div className="shell band-in">
          <div className="band-copy">
            <h2>Four jars. One very <em>good pantry.</em></h2>
            <p>Chilli Paste, Basil Pesto, Hummus and Beetroot, made to sit side by side on your shelf.</p>
            <Link href="#range" className="btn ghost">Shop the range →</Link>
          </div>
          <div className="band-img"><Photo src="range-row" alt="All four Pantry Harvest jars in a row with fresh chillies, basil, chickpeas and beetroot" /></div>
        </div>
      </section>
    </>
  );
}
