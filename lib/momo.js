// Uganda mobile money helpers: number cleanup and network detection by prefix.
// Prefixes as allocated to MTN Uganda and Airtel Uganda (national format 0XX).
const NETWORKS = {
  mtn: { id: "mtn", name: "MTN MoMo", short: "MTN", provider_id: "pp_mobile-money_mtn", prefixes: ["76", "77", "78", "39"], menu: "*165#", pinLength: 5 },
  airtel: { id: "airtel", name: "Airtel Money", short: "Airtel", provider_id: "pp_mobile-money_airtel", prefixes: ["70", "74", "75", "20"], menu: "*185#", pinLength: 4 },
};

export const MOMO = NETWORKS;

// Returns the 9-digit subscriber number (e.g. "772123456") or null.
export function normalise(input) {
  let d = String(input || "").replace(/\D/g, "");
  if (d.startsWith("256")) d = d.slice(3);
  if (d.startsWith("0")) d = d.slice(1);
  return d.length === 9 ? d : null;
}

export function detectNetwork(input) {
  const n = normalise(input);
  if (!n) return null;
  return Object.values(NETWORKS).find((x) => x.prefixes.includes(n.slice(0, 2))) || null;
}

// "0772 123 456"
export const display = (input) => {
  const n = normalise(input);
  return n ? `0${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}` : String(input || "");
};

// "0772 ••• 456"
export const masked = (input) => {
  const n = normalise(input);
  return n ? `0${n.slice(0, 3)} ••• ${n.slice(6)}` : "";
};
