// Long-form page layout: title block, sticky contents list, numbered sections.
import Link from "next/link";
import { TBC } from "@/lib/company";

export function DocPage({ eyebrow, title, intro, updated, sections, children }) {
  return (
    <div className="shell doc">
      <p className="crumbs"><Link href="/">Home</Link> / {title}</p>
      <header className="doc-head">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {intro && <p className="doc-intro">{intro}</p>}
        {updated && <p className="muted small">Last updated {updated}</p>}
      </header>
      <div className="doc-body">
        {sections?.length > 0 && (
          <nav className="toc" aria-label="On this page">
            <p className="eyebrow">On this page</p>
            <ol>{sections.map((s, i) => <li key={s.id}><a href={`#${s.id}`}><span>{String(i + 1).padStart(2, "0")}</span>{s.title}</a></li>)}</ol>
          </nav>
        )}
        <div className="doc-main">{children}</div>
      </div>
    </div>
  );
}

export function Sec({ id, n, title, children }) {
  return (
    <section id={id} className="doc-sec">
      <h2><span>{String(n).padStart(2, "0")}</span>{title}</h2>
      {children}
    </section>
  );
}

// Renders a company detail, or a visible "to be confirmed" marker.
export const Fact = ({ v }) => (v === TBC || v == null ? <span className="tbc">to be confirmed</span> : <>{v}</>);
