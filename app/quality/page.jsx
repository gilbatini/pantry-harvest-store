import Link from "next/link";
import Photo, { img } from "@/components/Photo";
import { PRODUCTS } from "@/lib/data";

export const metadata = {
  title: "Quality & goodness — The Pantry Harvest Co.",
  description: "What goes into every Pantry Harvest jar, what stays out, and what the research says about chilli, basil, chickpeas and beetroot.",
};

const SOURCES = {
  chilli: { label: "Systematic review: chilli-pepper intake and all-cause and cardiovascular mortality (PubMed Central)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8463741/" },
  basil: { label: "Review: anti-inflammatory, immunomodulatory and antioxidant effects of Ocimum basilicum and its main constituents (PubMed Central)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10237160/" },
  chickpea: { label: "O'Neil, Nicklas & Fulgoni (2014), chickpeas and hummus, nutrient intake and diet quality, NHANES 2003–2010 — summary by NDSU Extension", url: "https://www.ag.ndsu.edu/ndnc/food-nutrition/pulse-crops/research/the-many-health-benefits-of-chickpeas-and-hummus" },
  beet: { label: "Bahadoran et al. (2017), beetroot juice and blood pressure: systematic review and meta-analysis, Advances in Nutrition 8(6)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5683004/" },
};

const SPOTLIGHT = {
  "chilli-paste": {
    head: "Heat with a history",
    body: "Chillies get their heat from capsaicin. Fire-roasting softens the sharp edge and brings out sweetness, so a spoonful adds depth as well as heat — a way to make plain rice, beans or eggs exciting without reaching for extra salt or stock cubes.",
    evidence: "Large population studies, pooled in a systematic review, have linked eating chilli regularly with lower all-cause and cardiovascular mortality. These are associations from observational research — they show that chilli eaters fared better, not that chilli caused it.",
    src: "chilli",
    enjoy: "Stir into rolex eggs, beans or groundnut stew; brush on tilapia before grilling.",
  },
  "basil-pesto": {
    head: "Green, fresh, picked that morning",
    body: "Basil is blended within hours of picking, before its aromatic oils fade. Basil leaves are naturally rich in vitamin K, and pesto brings the leaf together with cashews and cheese for a sauce that makes vegetables and whole grains easy to love.",
    evidence: "Basil contains polyphenols such as rosmarinic acid and aromatic compounds such as eugenol and linalool. Reviews report antioxidant and anti-inflammatory activity — mostly from laboratory and animal studies, so treat it as promising rather than proven in people.",
    src: "basil",
    enjoy: "Toss through hot pasta, swirl into soup, spread on toast under a fried egg.",
  },
  hummus: {
    head: "Plant protein, slowly cooked",
    body: "Chickpeas are soaked overnight and cooked until they fall apart, then whipped with tahini and lemon. Chickpeas bring plant protein and fibre, and their starch is digested slowly — one reason hummus keeps you full longer than a bread-only snack.",
    evidence: "In a US national nutrition survey, people who ate chickpeas or hummus had higher fibre intake and better overall diet quality than people who didn't, with lower average body weight and waist size. That is an association: hummus eaters may simply eat better overall.",
    src: "chickpea",
    enjoy: "With warm chapati or flatbread, crunchy carrots and cucumber, or as a base for grain bowls.",
  },
  beetroot: {
    head: "Earthy, sweet and naturally rich in nitrate",
    body: "Whole beetroots are roasted in their skins, which concentrates their sweetness, then cooked down with orange zest and cumin. Beetroot is one of the richest dietary sources of nitrate, and its deep colour comes from betalain pigments.",
    evidence: "A 2017 meta-analysis of controlled trials found that beetroot juice lowered systolic blood pressure by about 3.6 mmHg on average. Those trials used daily juice; a spoonful of relish contains far less, so enjoy it as part of a vegetable-rich diet rather than as a treatment.",
    src: "beet",
    enjoy: "With goat's cheese on toast, in sandwiches, or alongside roast chicken or beef.",
  },
};

const ALLERGENS = ["Milk", "Tree nuts", "Sesame", "Gluten", "Peanuts"];
const CONTAINS = { "chilli-paste": [], "basil-pesto": ["Milk", "Tree nuts"], hummus: ["Sesame"], beetroot: [] };
const STORAGE = {
  "chilli-paste": ["Cool cupboard", "Fridge, up to 6 weeks", "Keep the chilli under its layer of oil"],
  "basil-pesto": ["Fridge", "Fridge, up to 2 weeks", "Cover with a thin film of oil after each use"],
  hummus: ["Fridge, 0–5°C", "Fridge, up to 4 days", "Always use a clean spoon"],
  beetroot: ["Cool cupboard", "Fridge, up to 4 weeks", "Lid on tight between uses"],
};

export default function Quality() {
  return (
    <div className="shell q">
      <p className="crumbs"><Link href="/">Home</Link> / Quality &amp; goodness</p>

      <section className="q-hero">
        <div>
          <p className="eyebrow">Quality &amp; goodness</p>
          <h1>What goes in the jar — <em>and what never does.</em></h1>
          <p className="doc-intro">
            Four recipes, short ingredient lists, cooked slowly in small batches and sealed in glass the same day.
            Here is exactly how we make them, why we make them this way, and what the research says about the
            ingredients at their heart.
          </p>
        </div>
        <div className="q-hero-img"><Photo src="range-row" alt="The four Pantry Harvest jars with their fresh ingredients" eager /></div>
      </section>

      <section className="q-sec">
        <h2 className="q-h">Our standards</h2>
        <div className="q-grid">
          <div><b>Nothing artificial</b><p>No preservatives, artificial colours, flavour enhancers or thickeners. If you wouldn&apos;t keep it in your own kitchen, it isn&apos;t in our jars.</p></div>
          <div><b>Small batches, twice a week</b><p>We cook on Mondays and Thursdays only, in pots small enough to taste and adjust by hand. Nothing sits in a warehouse for months.</p></div>
          <div><b>Sealed in glass, the same day</b><p>Every batch is jarred hot and sealed within hours of cooking, which locks in flavour and colour without additives.</p></div>
          <div><b>Short, honest labels</b><p>Every ingredient is listed in order of weight, with allergens in bold. Our longest list has eight ingredients.</p></div>
          <div><b>Grown close to home</b><p>We buy chillies, basil, beetroot and onions from growers we know around Kampala, and source chickpeas and tahini from trusted suppliers.</p></div>
          <div><b>Every jar traceable</b><p>The batch code and best-before date on each lid tell us exactly which pot, which day and which suppliers went into your jar.</p></div>
        </div>
      </section>

      <section className="q-sec">
        <h2 className="q-h">From the garden to your jar</h2>
        <ol className="q-steps">
          <li><span>i.</span><b>Choose</b><p>Produce is checked on arrival for ripeness and freshness. Anything bruised, wilted or under-ripe goes back.</p></li>
          <li><span>ii.</span><b>Prepare</b><p>Washed, trimmed and prepped by hand: chillies roasted over flame, beetroots roasted whole, chickpeas soaked overnight.</p></li>
          <li><span>iii.</span><b>Cook slowly</b><p>Small pots, low heat, long times. Each batch is tasted and seasoning adjusted before it&apos;s jarred.</p></li>
          <li><span>iv.</span><b>Jar &amp; seal</b><p>Filled hot into sterilised glass jars and sealed immediately, then labelled with the batch code and best-before date.</p></li>
          <li><span>v.</span><b>Check &amp; release</b><p>Every batch is checked for seal, colour, taste and texture before it leaves the kitchen for shops and riders.</p></li>
        </ol>
      </section>

      <section className="q-sec">
        <h2 className="q-h">Why these ingredients are good for you</h2>
        <p className="q-lede">
          We make food, not medicine. What follows is what published research says about the core ingredient in each
          jar, with the strength of the evidence spelled out and the source linked.
        </p>
        <div className="q-spots">
          {PRODUCTS.map((p) => {
            const s = SPOTLIGHT[p.handle];
            return (
              <article key={p.id} className="q-spot">
                <div className="q-spot-img"><Photo src={img(p, "life")} alt={`${p.title} jar`} /></div>
                <div className="q-spot-body">
                  <p className="eyebrow">{p.title}</p>
                  <h3>{s.head}</h3>
                  <p>{s.body}</p>
                  <div className="q-evidence">
                    <b>What the research says</b>
                    <p>{s.evidence}</p>
                    <a href={SOURCES[s.src].url} target="_blank" rel="noopener noreferrer">Read the source ↗</a>
                  </div>
                  <p className="q-enjoy"><span className="serif">Try it</span> {s.enjoy}</p>
                  <Link href={`/products/${p.handle}`} className="link">Shop {p.title} →</Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="q-sec q-glass">
        <div>
          <h2 className="q-h">Why glass, always</h2>
          <p>
            Glass doesn&apos;t react with food. Oils, acids from lemon and vinegar, and the heat of jarring don&apos;t draw
            anything out of the container and into what you eat, and the jar doesn&apos;t hold on to smells or stains from
            one batch to the next. It keeps flavour and colour truer for longer than plastic, can be sterilised, and can
            be reused or recycled many times over.
          </p>
          <p>
            Bring your clean empties back to our kitchen or hand them to our rider, and we&apos;ll take <b>UGX 1,000</b> off your
            next order for each one. Returned jars are inspected, washed and sterilised before reuse; lids are always new.
          </p>
        </div>
        <div className="q-glass-img"><Photo src="kitchen-shelf" alt="Glass jars on a pantry shelf" /></div>
      </section>

      <section className="q-sec">
        <h2 className="q-h">Allergens at a glance</h2>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Product</th>{ALLERGENS.map((a) => <th key={a}>{a}</th>)}</tr></thead>
            <tbody>
              {PRODUCTS.map((p) => (
                <tr key={p.id}>
                  <td><Link href={`/products/${p.handle}`}>{p.title}</Link></td>
                  {ALLERGENS.map((a) => <td key={a} className={CONTAINS[p.handle].includes(a) ? "yes" : ""}>{CONTAINS[p.handle].includes(a) ? "Contains" : "—"}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted small">
          All four recipes are made in one kitchen that also handles milk, tree nuts (cashews) and sesame. We clean down
          between batches, but cannot guarantee the absence of traces. Always check the label on your jar.
        </p>
      </section>

      <section className="q-sec">
        <h2 className="q-h">Storing your jars</h2>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Product</th><th>Before opening</th><th>Once opened</th><th>Tip</th></tr></thead>
            <tbody>
              {PRODUCTS.map((p) => (
                <tr key={p.id}><td>{p.title}</td>{STORAGE[p.handle].map((x, i) => <td key={i}>{x}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted small">Always use by the best-before date on the lid. If a seal has popped before opening, or the contents smell or look wrong, don&apos;t eat it — <Link href="/delivery#faulty" className="link">tell us and we&apos;ll replace it</Link>.</p>
      </section>

      <section className="q-sec q-sources">
        <h2 className="q-h">Sources</h2>
        <ol>{Object.values(SOURCES).map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ol>
        <p className="muted small">
          This page is general information about food, not medical advice. If you have a health condition, are pregnant, or
          take medication such as blood thinners (basil is high in vitamin K), talk to your doctor about your diet.
        </p>
      </section>
    </div>
  );
}
