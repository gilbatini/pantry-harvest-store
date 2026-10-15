"use client";
import { useId } from "react";

// Illustrated glass jar standing in for product photography until the label
// artwork and shoot are ready. Colours come from product.metadata.
export default function Jar({ product, size = "200 g", width = 200, shadow = true }) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, "");
  const m = product.metadata;
  const g = (n) => `${n}${raw}`;
  return (
    <svg viewBox="0 0 200 270" width={width} height={(width * 270) / 200} role="img" aria-label={`${product.title} jar`} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={g("lid")} x1="0" x2="1">
          <stop offset="0" stopColor="#8a6a2c" />
          <stop offset=".35" stopColor="#d9b866" />
          <stop offset=".6" stopColor="#b8913f" />
          <stop offset="1" stopColor="#6f5320" />
        </linearGradient>
        <linearGradient id={g("fill")} x1="0" x2="1">
          <stop offset="0" stopColor={m.fillDeep} />
          <stop offset=".45" stopColor={m.fill} />
          <stop offset="1" stopColor={m.fillDeep} />
        </linearGradient>
        <linearGradient id={g("glass")} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".18" stopColor="#fff" stopOpacity=".05" />
          <stop offset=".8" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".22" />
        </linearGradient>
        <radialGradient id={g("shadow")}>
          <stop offset="0" stopColor="#2a1d10" stopOpacity=".35" />
          <stop offset="1" stopColor="#2a1d10" stopOpacity="0" />
        </radialGradient>
      </defs>

      {shadow && <ellipse cx="100" cy="252" rx="92" ry="12" fill={`url(#${g("shadow")})`} />}

      {/* body */}
      <rect x="28" y="62" width="144" height="186" rx="28" fill={`url(#${g("fill")})`} />
      <rect x="28" y="62" width="144" height="18" rx="9" fill="#fff" opacity=".10" />
      {/* label */}
      <rect x="28" y="122" width="144" height="88" fill="#f6f0e3" />
      <rect x="28" y="122" width="144" height="4" fill="#24402c" />
      <rect x="28" y="206" width="144" height="4" fill="#24402c" />
      <text x="100" y="143" textAnchor="middle" fontFamily="Inter Tight, system-ui" fontSize="7.5" letterSpacing="2.4" fill="#24402c" fontWeight="600">PANTRY HARVEST CO.</text>
      <line x1="76" x2="124" y1="150" y2="150" stroke="#b8913f" strokeWidth=".8" />
      <text x="100" y="174" textAnchor="middle" fontFamily="Instrument Serif, Georgia, serif" fontStyle="italic" fontSize={product.title.length > 9 ? 19 : 23} fill="#1d1a15">{product.title}</text>
      <text x="100" y="194" textAnchor="middle" fontFamily="Inter Tight, system-ui" fontSize="7" letterSpacing="1.6" fill="#6e665a">SMALL BATCH · {size.toUpperCase()}</text>
      {/* glass sheen */}
      <rect x="28" y="62" width="144" height="186" rx="28" fill={`url(#${g("glass")})`} />
      <rect x="40" y="76" width="9" height="150" rx="4.5" fill="#fff" opacity=".28" />
      <rect x="54" y="80" width="3" height="120" rx="1.5" fill="#fff" opacity=".18" />
      <rect x="28.5" y="62.5" width="143" height="185" rx="27.5" fill="none" stroke="#000" strokeOpacity=".18" />

      {/* neck + lid */}
      <rect x="42" y="50" width="116" height="16" rx="4" fill={m.fillDeep} />
      <rect x="36" y="18" width="128" height="36" rx="7" fill={`url(#${g("lid")})`} />
      {Array.from({ length: 15 }, (_, i) => (
        <line key={i} x1={44 + i * 8} x2={44 + i * 8} y1="22" y2="50" stroke="#000" strokeOpacity=".12" strokeWidth="1.2" />
      ))}
      <rect x="36" y="18" width="128" height="6" rx="3" fill="#fff" opacity=".22" />
    </svg>
  );
}
