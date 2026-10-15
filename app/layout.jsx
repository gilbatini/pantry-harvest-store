import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Header, CartDrawer, Footer, Toast } from "@/components/Chrome";

const site = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000";
const description = "Chilli Paste, Basil Pesto, Hummus and Beetroot — cooked twice a week in small batches and sealed in glass.";

export const metadata = {
  metadataBase: new URL(site),
  title: "The Pantry Harvest Co. — Small-batch condiments, sealed in glass",
  description,
  openGraph: { title: "The Pantry Harvest Co.", description, images: [{ url: "/og.jpg", width: 1200, height: 630 }], type: "website" },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export const viewport = { themeColor: "#f3ede1" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
