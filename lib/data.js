// Catalogue shaped like Medusa v2 `GET /store/products` (fields the storefront reads).
// Prices are placeholders in USD — the client hasn't fixed its market yet.
// When the real backend is live, this file is replaced by the Medusa seed.

export const CURRENCY = "usd";

const v = (id, title, amount, inventory_quantity) => ({
  id,
  title,
  options: [{ option: { title: "Size" }, value: title }],
  calculated_price: { calculated_amount: amount, currency_code: CURRENCY },
  inventory_quantity,
  manage_inventory: true,
});

export const PRODUCTS = [
  {
    id: "prod_chilli",
    handle: "chilli-paste",
    title: "Chilli Paste",
    subtitle: "Fire-roasted chilli, garlic, cold-pressed sunflower oil",
    description:
      "Chillies roasted over open flame until the skins blister, then pounded with garlic and a little smoked salt and settled under sunflower oil. Heat that builds rather than bites.",
    metadata: {
      badge: "Bestseller",
      fill: "#9a2f1d",
      fillDeep: "#6e1d12",
      stage: "#e9d5c3",
      heat: 4,
      pairs: ["Fried eggs", "Rolex & chapati", "Grilled tilapia"],
      ingredients: "Red chilli (52%), sunflower oil, garlic, onion, smoked salt, lemon juice.",
      storage: "Keep in a cool cupboard. Once open, refrigerate and use within 6 weeks — keep the chilli under the oil.",
    },
    variants: [v("var_chilli_200", "200 g", 9, 42), v("var_chilli_350", "350 g", 14, 18)],
  },
  {
    id: "prod_pesto",
    handle: "basil-pesto",
    title: "Basil Pesto",
    subtitle: "Garden basil, toasted cashew, aged hard cheese",
    description:
      "Basil picked in the morning and blended the same day with toasted cashews, garlic and aged cheese. Bright, green and loose enough to stir straight into hot pasta.",
    metadata: {
      badge: "New",
      fill: "#56702c",
      fillDeep: "#3b4f1c",
      stage: "#dfe2cc",
      heat: 0,
      pairs: ["Fresh pasta", "Roast potatoes", "Toasted sourdough"],
      ingredients: "Basil (45%), sunflower oil, cashew nuts, hard cheese (milk), garlic, lemon juice, salt.",
      storage: "Refrigerate. Once open, cover with a film of oil and use within 2 weeks.",
    },
    variants: [v("var_pesto_180", "180 g", 10, 30), v("var_pesto_300", "300 g", 15, 12)],
  },
  {
    id: "prod_hummus",
    handle: "hummus",
    title: "Hummus",
    subtitle: "Slow-cooked chickpeas, tahini, lemon, cumin",
    description:
      "Chickpeas soaked overnight and cooked until they fall apart, then whipped with tahini, lemon and a whisper of cumin. Silky enough to swipe, thick enough to hold a drizzle.",
    metadata: {
      badge: "Small batch",
      fill: "#d4b47a",
      fillDeep: "#b28f52",
      stage: "#efe3cc",
      heat: 0,
      pairs: ["Warm flatbread", "Crunchy vegetables", "Grain bowls"],
      ingredients: "Chickpeas (60%), tahini (sesame), water, lemon juice, olive oil, garlic, cumin, salt.",
      storage: "Keep chilled at 0–5°C. Once open, use within 4 days.",
    },
    variants: [v("var_hummus_250", "250 g", 8, 26), v("var_hummus_400", "400 g", 12, 20)],
  },
  {
    id: "prod_beetroot",
    handle: "beetroot",
    title: "Beetroot",
    subtitle: "Roasted beetroot, orange zest, toasted cumin",
    description:
      "Whole beetroots roasted in their skins, then cooked down slowly with orange zest, toasted cumin and a splash of vinegar. Earthy, sweet and a little sharp.",
    metadata: {
      badge: "Few left",
      fill: "#7a1f3d",
      fillDeep: "#541429",
      stage: "#ead3d6",
      heat: 0,
      pairs: ["Goat's cheese", "Sandwiches", "Roast meats"],
      ingredients: "Beetroot (70%), cane sugar, apple cider vinegar, orange zest, onion, cumin, salt.",
      storage: "Keep in a cool cupboard. Once open, refrigerate and use within 4 weeks.",
    },
    variants: [v("var_beet_250", "250 g", 8, 6), v("var_beet_400", "400 g", 12, 0)],
  },
];

export const money = (amount) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: amount % 1 ? 2 : 0 }).format(amount);

export const fromPrice = (p) => Math.min(...p.variants.map((x) => x.calculated_price.calculated_amount));

export const FREE_DELIVERY_AT = 40;

export const SHIPPING = [
  { id: "so_standard", name: "Standard delivery", detail: "2–3 working days", amount: 4 },
  { id: "so_express", name: "Next-day delivery", detail: "Order before 12:00", amount: 8 },
  { id: "so_pickup", name: "Collect from the kitchen", detail: "Ready same afternoon", amount: 0 },
];

export const PROMOS = { HARVEST10: 0.1 };
