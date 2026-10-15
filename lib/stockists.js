// Retail locations shown on /stockists. Branches are the chains' published Kampala-area
// stores; which of them actually carry Pantry Harvest is illustrative for the demo —
// replace with the client's confirmed listings before launch.

export const AREAS = [
  { id: "central", name: "Central Kampala" },
  { id: "east", name: "Kampala East & Kira" },
  { id: "south", name: "Entebbe Road" },
];

export const RETAILERS = [
  {
    id: "carrefour",
    name: "Carrefour",
    note: "Hypermarket — find us in the condiments and international foods aisle.",
    branches: [
      { name: "Oasis Mall", area: "central", place: "Yusuf Lule Road, Kampala" },
      { name: "Acacia Mall", area: "central", place: "Kisementi, Kololo" },
      { name: "Lugogo Mall", area: "east", place: "Lugogo Bypass, Kampala" },
      { name: "Village Mall", area: "east", place: "Bugolobi, Kampala" },
      { name: "Naalya", area: "east", place: "Naalya, Kira" },
      { name: "Victoria Mall", area: "south", place: "Entebbe" },
    ],
  },
  {
    id: "capital",
    name: "Capital Shoppers",
    note: "Uganda's home-grown supermarket chain.",
    branches: [
      { name: "City Centre", area: "central", place: "Dastur Street, Nakasero" },
      { name: "Garden City", area: "central", place: "Garden City Mall, Kampala" },
      { name: "Nakawa", area: "east", place: "Port Bell Road, Nakawa" },
      { name: "Ntinda", area: "east", place: "Capital Shoppers Mall, Ntinda" },
    ],
  },
  {
    id: "quality",
    name: "Quality Supermarkets",
    note: "Neighbourhood supermarkets with a strong fresh and deli offer.",
    branches: [
      { name: "Old Kampala", area: "central", place: "Martin Street, Old Kampala" },
      { name: "Naalya", area: "east", place: "Quality Shopping Mall, Naalya" },
      { name: "Lubowa", area: "south", place: "Quality Shopping Village, Lubowa" },
      { name: "Kitende", area: "south", place: "Kitende, Entebbe Road" },
    ],
  },
];

export const mapsUrl = (retailer, b) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${retailer} ${b.name} ${b.place} Uganda`)}`;

export const branchCount = RETAILERS.reduce((n, r) => n + r.branches.length, 0);
