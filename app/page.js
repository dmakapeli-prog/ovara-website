"use client";

import { useEffect, useState } from "react";

const WA_NUMBER = "6281234567890";
const WA_URL = `https://wa.me/${WA_NUMBER}`;

const products = [
  {
    name: "Telur Ayam Negeri",
    img: "https://images.unsplash.com/photo-1518569656558-1f25e69d2fd4?w=400",
    price: 27000,
    priceLabel: "Rp 27.000 / Kg",
    stock: "Tersedia",
    desc: "1 Kg isi ±18 butir. Cocok untuk masak harian, kuning telur padat."
  },
  {
    name: "Telur Ayam Kampung",
    img: "https://images.unsplash.com/photo-1491524062933-cb0289261700?w=400",
    price: 45000,
    priceLabel: "Rp 45.000 / Kg",
    stock: "Tersedia",
    desc: "1 Kg isi ±12 butir. Lebih gurih, favorit MPASI dan menu sehat."
  },
  {
    name: "Telur Bebek",
    img: "https://images.unsplash.com/photo-1587486937303-a31014873bc6?w=400",
    price: 35000,
    priceLabel: "Rp 35.000 / Kg",
    stock: "Tersedia",
    desc: "1 Kg isi ±8 butir. Cocok untuk asin, martabak, dan kue tradisional."
  },
  {
    name: "Telur Omega-3",
    img: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=400",
    price: 55000,
    priceLabel: "Rp 55.000 / Kg",
    stock: "Tersedia",
    desc: "1 Kg isi ±10 butir. Kaya nutrisi, cocok untuk keluarga aktif."
  }
];

function formatRupiah(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Cart state: { "Telur Ayam Negeri": 2, ... }
  const [cart, setCart] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Qty selector per product card (starts at 1)
  const [qty, setQty] = useState(() => {
    const init = {};
    products.forEach(p => { init[p.name] = 1; });
    return init;
  });

  const updateQty = (name, delta) => {
    setQty(prev => ({
      ...prev,
      [name]: Math.max(1, (prev[name] || 1) + delta)
    }));
  };

  const addToCart = (name, amount) => {
    setCart(prev => ({
      ...prev,
      [name]: (prev[name] || 0) + amount
    }));
    // Reset qty selector back to 1
    setQty(prev => ({ ...prev, [name]: 1 }));
  };

  const removeFromCart = (name) => {
    setCart(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const cartItems = products.filter(p => cart[p.name] && cart[p.name] > 0);
  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce((sum, p) => sum + p.price * cart[p.name], 0);

  const getWhatsAppCartLink = () => {
    if (cartItems.length === 0) return WA_URL;
    let lines = cartItems.map(p => {
      const subtotal = p.price * cart[p.name];
      return `- ${p.name}: ${cart[p.name]} Kg = ${formatRupiah(subtotal)}`;
    });
    const text = `Halo Ovara, saya mau pesan:\n${lines.join("\n")}\nTotal: ${formatRupiah(cartTotal)}\nMohon konfirmasi ketersediaan. Terima kasih!`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["beranda", "produk", "keunggulan", "testimoni"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((n) => io.observe(n));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      io.disconnect();
    };
  }, []);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Prevent body scroll when drawer open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const navLinks = [
    { name: "Beranda", id: "beranda" },
    { name: "Produk", id: "produk" },
    { name: "Keunggulan", id: "keunggulan" },
    { name: "Testimoni", id: "testimoni" },
  ];

  return (
    <main className="min-h-screen">
      {/* SECTION 1: ANNOUNCEMENT BAR */}
      <div className="bg-[#F59E0B] py-2 overflow-hidden relative z-50">
        <div className="marquee-track text-black text-sm font-semibold tracking-wide flex gap-4">
          <span>🥚 Promo Jumat Berkah: Gratis Ongkir radius 5km Cibadak!</span>
          <span>🥚 Promo Jumat Berkah: Gratis Ongkir radius 5km Cibadak!</span>
          <span>🥚 Promo Jumat Berkah: Gratis Ongkir radius 5km Cibadak!</span>
          <span>🥚 Promo Jumat Berkah: Gratis Ongkir radius 5km Cibadak!</span>
        </div>
      </div>

      {/* SECTION 2: NAVBAR */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'navbar-solid py-3' : 'navbar-transparent py-5'} top-9`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#beranda" className="flex items-center gap-2 group">
            <div className="w-8 h-10 rounded-[50%] bg-[#F59E0B] border-2 border-white flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white text-xs">🥚</span>
            </div>
            <span className="text-white font-extrabold text-xl tracking-[0.2em]">OVARA</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-sm font-bold tracking-wide transition-colors ${
                  activeSection === link.id ? 'text-[#F59E0B]' : 'text-white/80 hover:text-white'
                } nav-link ${activeSection === link.id ? 'active' : ''}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Cart Icon with Badge */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#F59E0B] text-white hover:bg-[#D97706] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Buka Keranjang Belanja"
            id="cart-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        </div>
      </nav>

      {/* CART DRAWER OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setDrawerOpen(false)}
        id="cart-overlay"
      />

      {/* CART DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        id="cart-drawer"
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-stone-100">
            <h2 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-[#D97706]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              Keranjang Belanja
            </h2>
            <button
              onClick={() => setDrawerOpen(false)}
              className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Tutup Keranjang"
              id="cart-close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-[#FEF3C7] rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-[#D97706]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </div>
                <p className="text-stone-500 text-lg font-semibold">Keranjang masih kosong</p>
                <p className="text-stone-400 text-sm mt-2">Tambahkan produk dari katalog kami</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(p => {
                  const subtotal = p.price * cart[p.name];
                  return (
                    <div key={p.name} className="flex gap-4 bg-[#FFFBEB] rounded-2xl p-4 border border-[#FDE68A]/40" id={`cart-item-${p.name.replace(/\s+/g, '-').toLowerCase()}`}>
                      <img src={p.img} alt={p.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-stone-900 text-sm truncate">{p.name}</h4>
                        <p className="text-[#D97706] font-extrabold text-sm mt-1">{cart[p.name]} Kg × {formatRupiah(p.price)}</p>
                        <p className="text-stone-500 text-xs mt-0.5">Subtotal: <span className="font-bold text-stone-700">{formatRupiah(subtotal)}</span></p>
                      </div>
                      <button
                        onClick={() => removeFromCart(p.name)}
                        className="self-start w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-400 hover:text-red-600 transition-colors shrink-0 cursor-pointer"
                        aria-label={`Hapus ${p.name}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-stone-100 p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-stone-500 font-semibold">Total</span>
                <span className="text-2xl font-extrabold text-[#92400E]">{formatRupiah(cartTotal)}</span>
              </div>
              <a
                href={getWhatsAppCartLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold text-lg px-6 py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#25D366]/30"
                id="order-whatsapp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                Pesan via WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: HERO */}
      <section id="beranda" className="relative min-h-screen flex items-center">
        <img
          src="https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=1600"
          alt="Kandang ayam Ovara"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 anim-fade-up">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 anim-pulse-dot" />
              <span className="text-white text-sm font-bold tracking-wide">Panen Hari Ini Tersedia</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-2 anim-fade-up" style={{ animationDelay: '0.1s' }}>
              Langsung dari<br/>Kandang ke
            </h1>
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#F59E0B] italic mb-6 anim-fade-up" style={{ animationDelay: '0.2s' }}>
              Dapurmu.
            </h1>

            <p className="text-lg text-white/90 mb-10 max-w-xl leading-relaxed anim-fade-up" style={{ animationDelay: '0.3s' }}>
              Telur ayam segar premium langsung dari kandang Cibadak.<br/>
              Kuning telur padat, cangkang bersih, dijamin 100% segar.<br/>
              Pesan hari ini, nikmati kesegarannya!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 anim-fade-up" style={{ animationDelay: '0.4s' }}>
              <a
                href="#produk"
                className="inline-flex justify-center items-center px-8 py-4 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95"
              >
                Lihat Menu Pilihan &rsaquo;
              </a>
              <a
                href="#testimoni"
                className="inline-flex justify-center items-center px-8 py-4 bg-[#2A2A2A] hover:bg-[#333333] text-white rounded-full font-bold transition-all border border-white/10 hover:border-white/30"
              >
                <span className="text-[#F59E0B] mr-2">⭐⭐⭐⭐⭐</span>
                100+ Ulasan Pelanggan Puas
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PRODUK */}
      <section id="produk" className="py-24 bg-gradient-to-b from-white to-[#FFFBEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#92400E] mb-4">Pilih Telurmu</h2>
            <p className="text-lg text-stone-600">Kami menyediakan berbagai jenis telur ayam segar untuk kebutuhan dapur Anda.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-xl shadow-[#D97706]/5 border border-[#FDE68A]/30 overflow-hidden hover:-translate-y-2 transition-transform duration-300 reveal group" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="relative h-56 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-[#F59E0B] text-black text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                    Premium
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-extrabold text-[#451A03]">{p.name}</h3>
                  </div>
                  <div className="text-xl font-extrabold text-[#D97706] mb-2">{p.priceLabel}</div>
                  
                  <div className="inline-block bg-[#FEF3C7] text-[#D97706] text-xs font-bold px-2.5 py-1 rounded-md mb-3">
                    Stok {p.stock}
                  </div>
                  
                  <p className="text-stone-500 text-sm mb-5 min-h-[40px] leading-relaxed">{p.desc}</p>
                  
                  <div className="flex items-center gap-3 bg-[#FFFBEB] p-2 rounded-full border border-[#FDE68A]">
                    <div className="flex items-center gap-3 bg-white rounded-full px-2 py-1 shadow-sm border border-[#FDE68A]/50 flex-1 justify-center">
                      <button onClick={() => updateQty(p.name, -1)} className="qty-btn" aria-label="Kurangi">-</button>
                      <span className="font-bold text-[#92400E] w-8 text-center text-sm">{qty[p.name]} KG</span>
                      <button onClick={() => updateQty(p.name, 1)} className="qty-btn" aria-label="Tambah">+</button>
                    </div>
                    <button
                      onClick={() => addToCart(p.name, qty[p.name])}
                      className="bg-[#F59E0B] hover:bg-[#D97706] text-white p-3 rounded-full transition-colors shrink-0 cursor-pointer active:scale-90"
                      aria-label={`Tambah ${p.name} ke keranjang`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
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

      {/* SECTION 5: KEUNGGULAN */}
      <section id="keunggulan" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">Keunggulan Ovara</h2>
            <p className="text-lg text-stone-600">Kami memastikan kualitas terbaik dari kandang hingga ke piring Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M11.996 4c-3.13 0-5.748 3.514-6.402 7.641-.444 2.802.26 5.674 2.124 7.54C9.176 20.64 10.552 21 11.996 21c1.444 0 2.82-.36 4.278-1.819 1.864-1.866 2.568-4.738 2.124-7.54C17.744 7.514 15.126 4 11.996 4z" /></svg>,
                title: "Segar Dipanen Hari Ini",
                desc: "Dipanen dari kandang bersih Cibadak, memastikan telur segar tanpa bau amis."
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>,
                title: "Timbangan Jujur",
                desc: "1 Kg ditimbang pas sebelum dikemas. Anda mendapatkan kualitas premium tanpa kekurangan."
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>,
                title: "Antar ke Lokasi",
                desc: "Pesan pagi dikirim siang. Gratis ongkir radius 5km dari Cibadak."
              }
            ].map((k, i) => (
              <div key={i} className="bg-[#F3F4F6] rounded-3xl p-10 reveal hover:-translate-y-2 transition-transform duration-300" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#D97706] mb-6 shadow-sm">
                  {k.icon}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">{k.title}</h3>
                <p className="text-stone-500 leading-relaxed">{k.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: GALERI KEUNGGULAN */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-2xl reveal">
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">Melihat Langsung Kualitas Kami</h2>
            <p className="text-lg text-stone-600">Dari kandang bersih yang terawat, hingga proses penimbangan yang jujur. Inilah komitmen Ovara untuk Anda.</p>
          </div>

          <div className="gallery-grid reveal">
            {/* Foto Besar */}
            <div className="gallery-big relative rounded-3xl overflow-hidden group h-[400px] md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1518569656558-1f25e69d2fd4?w=600" 
                alt="Kandang Bersih Ovara" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                <div className="bg-white px-4 py-2 rounded-xl inline-block mb-2 shadow-lg">
                  <h4 className="font-extrabold text-stone-900 text-lg">Kandang Bersih</h4>
                </div>
                <p className="text-white font-medium flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>
                  Cibadak, Sukabumi
                </p>
              </div>
            </div>

            {/* Foto Kecil Atas */}
            <div className="relative rounded-3xl overflow-hidden group h-[200px] md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1491524062933-cb0289261700?w=400" 
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

            {/* 2 Kotak Info Bawah */}
            <div className="grid grid-cols-2 gap-4 md:gap-5 h-[200px] md:h-auto">
              <div className="bg-[#F59E0B] rounded-3xl p-6 flex flex-col justify-end relative overflow-hidden group hover:bg-[#D97706] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white/30 absolute -right-2 -top-2 group-hover:scale-110 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" /></svg>
                <span className="text-4xl mb-3">🔥</span>
                <h4 className="text-white font-extrabold text-lg md:text-xl leading-tight">Kandang Terawat</h4>
              </div>
              <div className="bg-[#F59E0B] rounded-3xl p-6 flex flex-col justify-end relative overflow-hidden group hover:bg-[#D97706] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white/30 absolute -right-2 -top-2 group-hover:scale-110 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>
                <span className="text-4xl mb-3">⚖️</span>
                <h4 className="text-white font-extrabold text-lg md:text-xl leading-tight">Timbangan Jujur</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: B2B BANNER */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#D97706] rounded-[2rem] p-8 md:p-14 relative overflow-hidden reveal shadow-2xl shadow-[#D97706]/20">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              <div className="max-w-2xl">
                <span className="inline-block bg-[#FEF3C7] text-[#92400E] font-black uppercase tracking-wider text-xs px-3 py-1.5 rounded-full mb-6">
                  Khusus B2B
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Punya Usaha Kuliner?</h2>
                <p className="text-lg text-white/90 leading-relaxed">
                  Dapatkan suplai telur ayam segar secara rutin dengan harga khusus grosir untuk Warung Makan, Katering, atau Toko Anda.
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-center md:items-end">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#451A03] font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mb-3"
                >
                  💬 Hubungi Kami
                </a>
                <span className="text-white/80 text-sm italic">*(Minimal pembelian 10 Kg)*</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: TESTIMONI */}
      <section id="testimoni" className="py-24 bg-gradient-to-b from-[#FFFBEB] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
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
              <div key={i} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] reveal hover:-translate-y-2 transition-transform duration-300" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="text-[#F59E0B] text-xl mb-6 tracking-widest">⭐⭐⭐⭐⭐</div>
                <p className="text-stone-600 italic leading-relaxed mb-8 h-24">"{t.text}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-stone-100">
                  <div className="w-12 h-12 bg-[#FDE68A] text-[#92400E] rounded-full flex items-center justify-center font-black text-xl">
                    {t.initial}
                  </div>
                  <h4 className="font-extrabold text-stone-900">{t.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: FOOTER */}
      <footer className="bg-[#111111] py-16 text-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <a href="#beranda" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-10 rounded-[50%] bg-[#F59E0B] flex items-center justify-center">
                  <span className="text-white text-xs">🥚</span>
                </div>
                <span className="text-white font-extrabold text-xl tracking-[0.2em]">OVARA</span>
              </a>
              <p className="text-lg font-medium text-white mb-6">Telur Segar, Keluarga Bahagia</p>
              <p className="text-sm">Beli telur ayam segar langsung dari kandang Cibadak, Sukabumi. Dipanen hari ini, timbangan jujur, siap antar ke lokasimu.</p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Menu</h4>
              <ul className="space-y-4">
                {navLinks.map(l => (
                  <li key={l.id}>
                    <a href={`#${l.id}`} className="hover:text-[#F59E0B] transition-colors">{l.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Kontak</h4>
              <ul className="space-y-4">
                <li>
                  <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#F59E0B] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 hover:text-[#F59E0B] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.036 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/></svg>
                    @ovara.id
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Ovara. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
