// Product photography. Packshots are shot on white; `pack` blends that white
// into whatever tinted backdrop the slot uses, so no cut-outs are needed.
export default function Photo({ src, alt, pack = false, className = "", eager = false, position, style }) {
  return (
    <img
      src={`/images/${src}.webp`}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`photo ${pack ? "photo-pack" : ""} ${className}`}
      style={{ objectPosition: position, ...style }}
    />
  );
}

export const img = (p, kind) => `${p.handle}-${kind}`;
