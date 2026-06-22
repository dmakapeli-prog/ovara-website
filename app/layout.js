import "./globals.css";

export const metadata = {
  title: "Ovara | Telur Ayam Segar Premium Cibadak",
  description: "Beli telur ayam segar langsung dari kandang Cibadak, Sukabumi. Dipanen hari ini, timbangan jujur, siap antar ke lokasimu.",
  keywords: "jual telur ayam, telur segar, telur ayam kampung, telur omega-3, Ovara, Cibadak, Sukabumi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-white text-stone-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
