import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Ovara | Telur Segar Premium Cibadak",
  description:
    "Beli telur segar premium langsung dari Cibadak. Telur ayam negeri, ayam kampung, dan bebek segar dipanen hari ini. Timbangan jujur, siap antar ke seluruh Cibadak & Sukabumi.",
  keywords:
    "jual telur segar, telur Cibadak, telur Sukabumi, telur ayam kampung, telur bebek, Ovara",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${plusJakarta.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
