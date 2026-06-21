"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ============================================
   WHATSAPP HELPER
   ============================================ */
const WA_NUMBER = "6281996522114";
const waLink = (text) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
const defaultWaText = "Halo Ovara, saya ingin pesan telur segar";

/* ============================================
   DATA
   ============================================ */
const stats = [
  { value: "500+", label: "Pelanggan Setia" },
  { value: "100%", label: "Timbangan Jujur" },
  { value: "3 Jenis", label: "Telur Tersedia" },
  { value: "Setiap Hari", label: "Dipanen Segar" },
];

const products = [
  {
    name: "Telur Ayam Negeri",
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=300&fit=crop&auto=format&q=80",
    badge: "Paling Laris 🔥",
    badgeColor: "bg-amber-500 text-white",
    desc: "Telur segar berprotein tinggi dari ayam negeri pilihan. Kuning telur besar dan padat, cocok untuk masakan sehari-hari.",
    features: [
      "Kuning telur besar & padat",
      "Kulit bersih & mulus",
      "Cocok untuk semua masakan",
    ],
    price: "Rp 28.000/kg",
    waText: "Halo Ovara, saya ingin pesan Telur Ayam Negeri",
  },
  {
    name: "Telur Ayam Kampung",
    image:
      "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=400&h=300&fit=crop&auto=format&q=80",
    badge: "Organik 🌿",
    badgeColor: "bg-green-600 text-white",
    desc: "Telur organik dari ayam kampung yang dibesarkan secara alami. Rasa lebih gurih dan bergizi tinggi.",
    features: [
      "Rasa lebih gurih & lezat",
      "Bergizi lebih tinggi",
      "Ayam dibesarkan alami",
    ],
    price: "Rp 45.000/kg",
    waText: "Halo Ovara, saya ingin pesan Telur Ayam Kampung",
  },
  {
    name: "Telur Bebek",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop&auto=format&q=80",
    badge: "Premium 👑",
    badgeColor: "bg-violet-600 text-white",
    desc: "Telur bebek segar dengan ukuran besar dan kuning telur yang lebih kaya. Sempurna untuk asin atau masakan spesial.",
    features: [
      "Ukuran lebih besar",
      "Kuning telur lebih kaya",
      "Cocok untuk telur asin",
    ],
    price: "Rp 50.000/kg",
    waText: "Halo Ovara, saya ingin pesan Telur Bebek",
  },
];

const advantages = [
  {
    icon: "🌿",
    title: "Segar Dipanen Hari Ini",
    desc: "Setiap telur yang kami jual dipanen langsung hari ini dari kandang kami. Kesegaran terjamin 100%.",
  },
  {
    icon: "⚖️",
    title: "Timbangan Selalu Jujur",
    desc: "Kami berkomitmen pada kejujuran. Setiap pesanan ditimbang dengan akurat sesuai yang Anda bayar.",
  },
  {
    icon: "🚚",
    title: "Siap Antar ke Rumah Anda",
    desc: "Layanan antar tersedia ke seluruh wilayah Cibadak dan sekitar Sukabumi. Cepat dan aman.",
  },
  {
    icon: "💪",
    title: "Kualitas Premium Terjamin",
    desc: "Telur kami berasal dari ayam dan bebek yang diberi pakan berkualitas untuk menghasilkan telur terbaik.",
  },
];

const testimonials = [
  {
    text: "Telurnya segar banget! Kuning telurnya besar dan padat. Udah langganan setiap minggu, timbangan juga selalu pas.",
    name: "Ibu Sari",
    location: "Cibadak",
  },
  {
    text: "Telur kampungnya enak banget, rasanya beda dari yang dijual di pasar. Pengiriman juga cepat dan aman sampai ke rumah.",
    name: "Pak Budi",
    location: "Sukabumi",
  },
  {
    text: "Sering beli telur bebek untuk bikin telur asin. Ukurannya besar-besar dan segar. Recommended banget!",
    name: "Ibu Dewi",
    location: "Cicurug",
  },
];

const steps = [
  {
    num: "1",
    title: "Pilih Produk",
    desc: "Pilih jenis telur dan jumlah yang Anda butuhkan dari daftar produk kami",
  },
  {
    num: "2",
    title: "Hubungi via WhatsApp",
    desc: "Klik tombol pesan dan chat langsung dengan tim Ovara kami",
  },
  {
    num: "3",
    title: "Terima di Rumah",
    desc: "Konfirmasi pesanan dan telur segar langsung diantar ke rumah Anda",
  },
];

/* ============================================
   INTERSECTION OBSERVER HOOK
   ============================================ */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    const items = el.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ============================================
   NAVBAR COMPONENT
   ============================================ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Beranda", href: "#beranda" },
    { label: "Produk", href: "#produk" },
    { label: "Keunggulan", href: "#keunggulan" },
    { label: "Kontak", href: "#kontak" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-amber-900/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-1 group">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] tracking-tight">
              Ovara
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-blink mt-1" />
            <span className="hidden sm:block text-xs text-amber-700 font-medium ml-2 border-l border-amber-300 pl-2">
              Telur Segar Premium
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#1C1917]/70 hover:text-amber-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-amber-500 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <a
              href={waLink(defaultWaText)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5"
            >
              Pesan Sekarang
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-[#1C1917] transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#1C1917] transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#1C1917] transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-white/95 backdrop-blur-md border-t border-amber-100`}
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-[#1C1917]/70 hover:text-amber-600 py-2 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={waLink(defaultWaText)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-6 py-3 rounded-full text-center transition-all mt-2"
          >
            Pesan Sekarang
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ============================================
   MAIN PAGE COMPONENT
   ============================================ */
export default function Home() {
  const sectionRef = useReveal();

  return (
    <div ref={sectionRef}>
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section
        id="beranda"
        className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FFFBF0 0%, #FFFFFF 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-32 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div className="reveal-left">
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-300 bg-amber-50 text-amber-700 text-sm font-medium mb-6">
                🌿 Dipanen Segar Hari Ini
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                <span className="text-[#1C1917]">Telur Segar</span>
                <br />
                <span className="text-amber-600 italic">Premium Cibadak</span>
              </h1>

              <p className="text-lg text-[#1C1917]/60 leading-relaxed mb-8 max-w-lg">
                Langsung dari kandang ke meja makan Anda. Telur ayam negeri, ayam
                kampung, dan bebek segar dengan timbangan jujur dan kualitas
                terjamin.
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-4 mb-8">
                {["Dipanen Hari Ini", "Timbangan Jujur", "Siap Antar"].map(
                  (item) => (
                    <span
                      key={item}
                      className="flex items-center gap-2 text-sm font-medium text-[#1C1917]/70"
                    >
                      <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">
                        ✓
                      </span>
                      {item}
                    </span>
                  )
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={waLink(defaultWaText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/25 hover:-translate-y-0.5"
                >
                  Pesan via WhatsApp 🛒
                </a>
                <a
                  href="#produk"
                  className="inline-flex items-center justify-center gap-2 border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-bold text-base px-8 py-4 rounded-full transition-all duration-300"
                >
                  Lihat Produk
                </a>
              </div>
            </div>

            {/* Right image */}
            <div className="relative reveal-right">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/20">
                <img
                  src="https://images.unsplash.com/photo-1569288052389-dac9b0ac6b0f?w=600&h=600&fit=crop&auto=format&q=80"
                  alt="Telur segar premium Ovara"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 sm:bottom-6 sm:left-6 glass px-4 py-3 rounded-2xl border border-amber-300/50 animate-float shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 text-lg">⭐</span>
                  <div>
                    <p className="text-sm font-bold text-[#1C1917]">
                      4.9/5 Rating
                    </p>
                    <p className="text-xs text-[#1C1917]/60">
                      Pelanggan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section
        className="py-12 sm:py-16"
        style={{
          background: "linear-gradient(135deg, #D97706 0%, #B45309 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="reveal text-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm sm:text-base text-white/80 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUK SECTION ===== */}
      <section id="produk" className="py-16 sm:py-24 bg-[#FFFBF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 reveal">
            <span className="text-amber-600 font-bold text-sm tracking-widest uppercase">
              Produk Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] mt-3 mb-4">
              Pilih Telur Segar Anda
            </h2>
            <p className="text-[#1C1917]/60 max-w-2xl mx-auto text-base sm:text-lg">
              Semua telur dipanen segar setiap hari dengan kualitas premium dan
              timbangan yang selalu jujur
            </p>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <div
                key={i}
                className="reveal group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-500 hover:-translate-y-2 border border-amber-100/50"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span
                    className={`absolute top-4 left-4 ${product.badgeColor} px-3 py-1 rounded-full text-xs font-bold shadow-md`}
                  >
                    {product.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1C1917] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#1C1917]/60 leading-relaxed mb-4">
                    {product.desc}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {product.features.map((f, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 text-sm text-[#1C1917]/70"
                      >
                        <span className="text-green-500 font-bold">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-amber-100">
                    <span className="text-2xl font-extrabold text-amber-600">
                      {product.price}
                    </span>
                    <a
                      href={waLink(product.waText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25"
                    >
                      Pesan 🛒
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KEUNGGULAN SECTION ===== */}
      <section id="keunggulan" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 reveal">
            <span className="text-amber-600 font-bold text-sm tracking-widest uppercase">
              Kenapa Pilih Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] mt-3 mb-4">
              Kenapa Pilih Ovara?
            </h2>
          </div>

          {/* Advantage Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {advantages.map((adv, i) => (
              <div
                key={i}
                className="reveal glass-amber rounded-2xl p-8 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-500 hover:-translate-y-1 group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                  {adv.icon}
                </span>
                <h3 className="text-xl font-bold text-[#1C1917] mb-3">
                  {adv.title}
                </h3>
                <p className="text-[#1C1917]/60 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONI SECTION ===== */}
      <section className="py-16 sm:py-24 bg-[#FFFBF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 reveal">
            <span className="text-amber-600 font-bold text-sm tracking-widest uppercase">
              Kata Mereka
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] mt-3 mb-4">
              Apa Kata Pelanggan Ovara?
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="reveal bg-white rounded-2xl p-8 border border-amber-200 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-500 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-amber-400 text-lg">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-[#1C1917]/70 leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-amber-100">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[#1C1917] text-sm">
                      {t.name}
                    </p>
                    <p className="text-xs text-[#1C1917]/50">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CARA PESAN SECTION ===== */}
      <section
        className="py-16 sm:py-24"
        style={{
          background: "linear-gradient(135deg, #D97706 0%, #B45309 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-12 sm:mb-16 reveal">
            Cara Pesan Mudah
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="reveal text-center"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/30">
                  <span className="text-2xl font-extrabold text-white">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/80 leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KONTAK & LOKASI SECTION ===== */}
      <section id="kontak" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Contact Info */}
            <div className="reveal-left">
              <span className="text-amber-600 font-bold text-sm tracking-widest uppercase">
                Kontak
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] mt-3 mb-8">
                Hubungi Kami
              </h2>

              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold text-[#1C1917]">Alamat</p>
                    <p className="text-[#1C1917]/60">
                      Cibadak, Sukabumi, Jawa Barat
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="font-semibold text-[#1C1917]">WhatsApp</p>
                    <p className="text-[#1C1917]/60">+62 819-9652-2114</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🕐</span>
                  <div>
                    <p className="font-semibold text-[#1C1917]">Jam Layanan</p>
                    <p className="text-[#1C1917]/60">07.00 - 20.00 WIB</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🚚</span>
                  <div>
                    <p className="font-semibold text-[#1C1917]">Area Antar</p>
                    <p className="text-[#1C1917]/60">
                      Cibadak & sekitar Sukabumi
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={waLink(defaultWaText)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/25 hover:-translate-y-0.5"
              >
                Chat WhatsApp Sekarang 💬
              </a>
            </div>

            {/* Right - Map */}
            <div className="reveal-right">
              <div className="rounded-2xl overflow-hidden border-2 border-amber-200 shadow-lg h-full min-h-[300px]">
                <iframe
                  src="https://www.google.com/maps?q=Cibadak,+Sukabumi,+Jawa+Barat&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "300px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Ovara - Cibadak, Sukabumi"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#1C1917] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-1 mb-3">
                <span className="text-2xl font-extrabold text-white">
                  Ovara
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1" />
              </div>
              <p className="text-amber-500 font-medium text-sm mb-3">
                Telur Segar Premium
              </p>
              <p className="text-white/50 text-sm leading-relaxed">
                Segar dari Kandang, Langsung ke Meja Anda
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                Menu
              </h4>
              <div className="flex flex-col gap-2.5">
                {["Beranda", "Produk", "Keunggulan", "Kontak"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-white/50 hover:text-amber-500 text-sm transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                Ikuti Kami
              </h4>
              <div className="flex gap-4">
                <a
                  href={waLink(defaultWaText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-1"
                  aria-label="WhatsApp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-1"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm">
              © 2026 Ovara. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ===== FLOATING WHATSAPP BUTTON ===== */}
      <a
        href={waLink(defaultWaText)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 animate-pulse-glow transition-all duration-300 hover:scale-110 group"
        aria-label="Pesan Sekarang via WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>

        {/* Tooltip */}
        <span className="absolute right-16 bg-[#1C1917] text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Pesan Sekarang
        </span>
      </a>
    </div>
  );
}
