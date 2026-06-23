"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [qty, setQty] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*')
      if (data) setProducts(data)
    }
    fetchProducts()
  }, [])

  // Hitung total item di keranjang
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  // Hitung total harga
  const totalHarga = Object.entries(cart).reduce((total, [id, q]) => {
    const prod = products.find(p => p.id === parseInt(id));
    return total + (prod ? prod.price * q : 0);
  }, 0);

  // Format rupiah
  const formatRupiah = (num) => "Rp " + num.toLocaleString("id-ID");

  // Tambah ke keranjang
  const addToCart = (productId) => {
    const q = qty[productId] || 1;
    setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + q }));
  };

  // Update qty di keranjang langsung
  const updateCartQty = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev => ({ ...prev, [productId]: newQty }));
    }
  };

  // Hapus dari keranjang
  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  // Pesan via WhatsApp
  const pesanWA = () => {
    let pesan = "Halo Ovara, saya mau pesan:\n";
    Object.entries(cart).forEach(([id, q]) => {
      const prod = products.find(p => p.id === parseInt(id));
      if (prod) pesan += `- ${prod.name}: ${q} Kg = ${formatRupiah(prod.price * q)}\n`;
    });
    pesan += `Total: ${formatRupiah(totalHarga)}\nMohon konfirmasi ketersediaan. Terima kasih!`;
    window.open("https://wa.me/6281996522114?text=" + encodeURIComponent(pesan));
  };

  return (
    <main className="min-h-screen">

      {/* ============ SECTION 1: ANNOUNCEMENT BAR ============ */}
      <div className="bg-[#F59E0B] py-2 overflow-hidden relative z-50">
        <div className="marquee-track text-black text-sm font-semibold tracking-wide whitespace-nowrap">
          <span>🥚 Promo Jumat Berkah: Gratis Ongkir radius 5km Cibadak!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>🥚 Promo Jumat Berkah: Gratis Ongkir radius 5km Cibadak!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>🥚 Promo Jumat Berkah: Gratis Ongkir radius 5km Cibadak!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>🥚 Promo Jumat Berkah: Gratis Ongkir radius 5km Cibadak!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* ============ SECTION 2: NAVBAR ============ */}
      <nav className="sticky top-0 z-50 bg-[#1a1a1a] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-2 group">
            <div className="w-8 h-10 rounded-[50%] bg-[#F59E0B] border-2 border-white flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white text-xs">🥚</span>
            </div>
            <span className="text-white font-extrabold text-xl tracking-[0.2em]">OVARA</span>
          </a>

          {/* Menu Tengah */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { name: "Beranda", href: "#beranda" },
              { name: "Produk", href: "#produk" },
              { name: "Keunggulan", href: "#keunggulan" },
              { name: "Testimoni", href: "#testimoni" },
            ].map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold tracking-wide text-white/80 hover:text-[#F59E0B] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Icon Keranjang */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 rounded-full text-white hover:text-[#F59E0B] transition-colors cursor-pointer"
            aria-label="Buka Keranjang"
            id="cart-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center bg-[#F59E0B] text-black text-xs font-bold rounded-full px-1">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* ============ SECTION 3: HERO ============ */}
      <section id="beranda" className="relative min-h-screen flex items-center">
        <img
          src="https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=1600"
          alt="Kandang ayam Ovara"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 pt-20 max-w-4xl">
          {/* Badge panen */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white text-sm font-bold tracking-wide">Panen Hari Ini Tersedia</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-2">
            Telur Bersih, Timbangan Jujur,
          </h1>
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#F59E0B] italic mb-6">
            Harga Wajar.
          </h1>

          <p className="text-lg text-white/90 mb-10 max-w-xl leading-relaxed">
            Telur ayam segar premium langsung dari kandang kami.
            Kuning telur padat, cangkang bersih, dijamin 100% segar.
            Pesan hari ini, nikmati kesegarannya!
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#produk"
              className="bg-[#F59E0B] text-black rounded-full px-8 py-3 font-bold hover:bg-[#D97706] transition-all hover:scale-105 active:scale-95 text-center"
            >
              Lihat Menu Pilihan ›
            </a>
            <a
              href="#testimoni"
              className="bg-gray-700 text-white rounded-full px-8 py-3 font-bold hover:bg-gray-600 transition-all text-center"
            >
              ⭐⭐⭐⭐⭐ 100+ Ulasan Pelanggan Puas
            </a>
          </div>
        </div>
      </section>

      {/* ============ SECTION 4: PRODUK ============ */}
      <section id="produk" className="py-24 bg-[#FFFBEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#92400E] mb-4">Pilih Telurmu</h2>
            <p className="text-lg text-stone-600">Kami menyediakan berbagai jenis telur ayam segar untuk kebutuhan dapur Anda.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <div key={p.id} className="rounded-2xl shadow-md overflow-hidden bg-white hover:-translate-y-1 transition-transform duration-300 group">
                {/* Foto Produk */}
                <div className="relative aspect-square overflow-hidden">
                  <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-[#F59E0B] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    PREMIUM
                  </div>
                </div>

                {/* Info Produk */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{p.name}</h3>
                  <p className="text-[#D97706] font-bold text-xl mb-2">{formatRupiah(p.price)} / Kg</p>

                  {p.stock ? (
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-semibold mb-3">Stok Tersedia</span>
                  ) : (
                    <span className="inline-block bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-semibold mb-3">Stok Habis</span>
                  )}

                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{p.description}</p>

                  {/* Kontrol Qty + Tombol Keranjang */}
                  <div className={`flex items-center gap-2 ${!p.stock ? "opacity-50 pointer-events-none" : ""}`}>
                    <button
                      onClick={() => setQty(prev => ({ ...prev, [p.id]: Math.max(1, (prev[p.id] || 1) - 1) }))}
                      className="rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer font-bold"
                      disabled={!p.stock}
                    >
                      −
                    </button>
                    <div className="text-center min-w-[40px]">
                      <span className="font-bold text-gray-900">{qty[p.id] || 1}</span>
                      <p className="text-xs text-gray-400 leading-none">KG</p>
                    </div>
                    <button
                      onClick={() => setQty(prev => ({ ...prev, [p.id]: (prev[p.id] || 1) + 1 }))}
                      className="rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer font-bold"
                      disabled={!p.stock}
                    >
                      +
                    </button>
                    <button
                      onClick={() => addToCart(p.id)}
                      className="bg-[#F59E0B] hover:bg-[#D97706] rounded-full p-2 ml-auto transition-colors cursor-pointer active:scale-90"
                      disabled={!p.stock}
                      aria-label={`Tambah ${p.name} ke keranjang`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 5: KEUNGGULAN ============ */}
      <section id="keunggulan" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">Keunggulan Ovara</h2>
            <p className="text-lg text-stone-600">Kami memastikan kualitas terbaik dari kandang hingga ke piring Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Segar Dipanen Hari Ini */}
            <div className="bg-gray-100 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#D97706] mb-6 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Segar Dipanen Hari Ini</h3>
              <p className="text-stone-500 leading-relaxed">Dipanen dari kandang bersih Cibadak, memastikan telur segar tanpa bau amis.</p>
            </div>

            {/* Timbangan Jujur */}
            <div className="bg-gray-100 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#D97706] mb-6 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Timbangan Jujur</h3>
              <p className="text-stone-500 leading-relaxed">1 Kg ditimbang pas sebelum dikemas. Anda mendapatkan kualitas premium tanpa kekurangan.</p>
            </div>

            {/* Antar ke Lokasi */}
            <div className="bg-gray-100 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#D97706] mb-6 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Antar ke Lokasi</h3>
              <p className="text-stone-500 leading-relaxed">Pesan pagi dikirim siang. Gratis ongkir radius 5km dari Cibadak.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 6: GALERI KUALITAS ============ */}
      <section id="galeri" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">Melihat Langsung Kualitas Kami</h2>
            <p className="text-lg text-stone-600">Dari kandang bersih yang terawat, hingga proses penimbangan yang jujur. Inilah komitmen Ovara untuk Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Kiri: Foto besar */}
            <div className="relative rounded-3xl overflow-hidden group h-[400px] md:row-span-2">
              <img
                src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600"
                alt="Kandang Bersih Ovara"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                <div className="bg-white px-4 py-2 rounded-xl inline-block mb-2 shadow-lg">
                  <h4 className="font-extrabold text-stone-900 text-lg">Kandang Bersih</h4>
                </div>
                <p className="text-white font-medium flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5z" clipRule="evenodd" />
                  </svg>
                  Cibadak, Sukabumi
                </p>
              </div>
            </div>

            {/* Kanan atas: Foto kecil */}
            <div className="relative rounded-3xl overflow-hidden group h-[200px]">
              <img
                src="https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400"
                alt="Dipanen Segar"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="bg-[#FFFBEB] text-[#D97706] font-bold px-3 py-1.5 rounded-lg text-sm shadow-md">
                  Dipanen Segar
                </span>
              </div>
            </div>

            {/* Kanan bawah: 2 kotak kuning */}
            <div className="grid grid-cols-2 gap-4 h-[180px]">
              <div className="bg-[#F59E0B] rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-[#D97706] transition-colors group">
                <span className="text-4xl mb-2">🔥</span>
                <h4 className="text-white font-extrabold text-lg leading-tight">Kandang Terawat</h4>
              </div>
              <div className="bg-[#F59E0B] rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-[#D97706] transition-colors group">
                <span className="text-4xl mb-2">⚖️</span>
                <h4 className="text-white font-extrabold text-lg leading-tight">Timbangan Jujur</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 7: B2B BANNER ============ */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#D97706] rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="inline-block bg-[#FEF3C7] text-[#92400E] font-black uppercase tracking-wider text-xs px-3 py-1.5 rounded-full mb-4">
                  Khusus B2B
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Punya Usaha Kuliner?</h2>
                <p className="text-white/90 leading-relaxed">
                  Dapatkan suplai telur ayam segar secara rutin dengan harga khusus grosir untuk Warung Makan, Katering, atau Toko Anda.
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-center">
                <a
                  href="https://wa.me/6281996522114"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#451A03] font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mb-2"
                >
                  💬 Hubungi Kami
                </a>
                <span className="text-white/80 text-sm italic">*(Minimal pembelian 10 Kg)*</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 8: TESTIMONI ============ */}
      <section id="testimoni" className="py-24 bg-[#FFFBEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">Kata Mereka</h2>
            <p className="text-lg text-stone-600">Lebih dari 100+ keluarga di Sukabumi telah mempercayakan kebutuhan telur mereka kepada Ovara.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Telurnya fresh banget, kuning telurnya padat dan bagus. Suami sampai minta dimasak tiap hari!",
                name: "Ibu Ratna",
                initial: "R"
              },
              {
                text: "Benar-benar masih segar pas sampai! Cangkang bersih, beda sama yang di pasar. Pokoknya mantap.",
                name: "Bapak Budi",
                initial: "B"
              },
              {
                text: "Timbangan jujur dan telurnya besar-besar. Langganan terus buat stok warung setiap minggu.",
                name: "Teh Nisa",
                initial: "N"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-1 transition-transform duration-300">
                <div className="text-[#F59E0B] text-xl mb-4 tracking-widest">⭐⭐⭐⭐⭐</div>
                <p className="text-stone-600 italic leading-relaxed mb-6 min-h-[80px]">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                  <div className="w-10 h-10 bg-[#FDE68A] text-[#92400E] rounded-full flex items-center justify-center font-black text-lg">
                    {t.initial}
                  </div>
                  <h4 className="font-extrabold text-stone-900">{t.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 9: FOOTER ============ */}
      <footer className="bg-[#1a1a1a] py-16 text-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Kolom 1: Logo */}
            <div>
              <a href="#beranda" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-10 rounded-[50%] bg-[#F59E0B] flex items-center justify-center">
                  <span className="text-white text-xs">🥚</span>
                </div>
                <span className="text-white font-extrabold text-xl tracking-[0.2em]">OVARA</span>
              </a>
              <p className="text-lg font-medium text-white mb-4">Telur Segar, Keluarga Bahagia</p>
              <p className="text-sm">Beli telur ayam segar langsung dari kandang Cibadak, Sukabumi. Dipanen hari ini, timbangan jujur, siap antar ke lokasimu.</p>
            </div>

            {/* Kolom 2: Menu */}
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Menu</h4>
              <ul className="space-y-3">
                {[
                  { name: "Beranda", href: "#beranda" },
                  { name: "Produk", href: "#produk" },
                  { name: "Keunggulan", href: "#keunggulan" },
                  { name: "Testimoni", href: "#testimoni" },
                ].map(l => (
                  <li key={l.name}>
                    <a href={l.href} className="hover:text-[#F59E0B] transition-colors">{l.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolom 3: Kontak */}
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Kontak</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://wa.me/6281996522114" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#F59E0B] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                    </svg>
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 hover:text-[#F59E0B] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.036 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                    @ovara.id
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-sm">
            <p>&copy; 2026 Ovara. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ============ SIDEBAR KERANJANG ============ */}
      {cartOpen && (
        <>
          {/* Overlay gelap */}
          <div
            className="fixed inset-0 bg-black/50 z-50 transition-opacity"
            onClick={() => setCartOpen(false)}
            id="cart-overlay"
          />

          {/* Drawer dari kanan */}
          <div className="fixed right-0 top-0 h-full w-80 md:w-96 bg-white z-50 shadow-2xl flex flex-col" id="cart-drawer">
            {/* Header drawer */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-bold text-lg">🛒 Keranjang Belanja</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer text-gray-600 font-bold"
                aria-label="Tutup Keranjang"
                id="cart-close"
              >
                ✕
              </button>
            </div>

            {/* List produk di keranjang */}
            <div className="flex-1 overflow-y-auto p-4">
              {totalItems === 0 ? (
                <div className="text-center text-gray-400 mt-8">
                  <p className="text-4xl mb-2">🛒</p>
                  <p>Keranjang masih kosong</p>
                </div>
              ) : (
                Object.entries(cart).map(([id, q]) => {
                  const prod = products.find(p => p.id === parseInt(id));
                  if (!prod) return null;
                  return (
                    <div key={id} className="flex items-center gap-3 py-3 border-b">
                      <img src={prod.image_url} alt={prod.name} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">{prod.name}</p>
                        <p className="text-[#D97706] font-bold">{formatRupiah(prod.price * q)}</p>
                        {/* Kontrol qty di dalam keranjang */}
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateCartQty(parseInt(id), q - 1)}
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                          >
                            −
                          </button>
                          <span className="text-sm font-bold">{q} Kg</span>
                          <button
                            onClick={() => updateCartQty(parseInt(id), q + 1)}
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {/* Tombol hapus */}
                      <button
                        onClick={() => removeFromCart(parseInt(id))}
                        className="text-red-400 hover:text-red-600 text-lg cursor-pointer transition-colors shrink-0"
                        aria-label={`Hapus ${prod.name}`}
                      >
                        🗑️
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer drawer: total + tombol pesan */}
            {totalItems > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total:</span>
                  <span className="text-[#D97706]">{formatRupiah(totalHarga)}</span>
                </div>
                <button
                  onClick={pesanWA}
                  className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-95"
                  id="order-whatsapp"
                >
                  💬 Pesan via WhatsApp
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}
