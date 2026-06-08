/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import StatsSummary from './components/StatsSummary';
import Pricing from './components/Pricing';
import ServiceSelector from './components/ServiceSelector';
import Blog from './components/Blog';
import InteractiveDemo from './components/InteractiveDemo';
import { PricingPlan } from './types';
import { Award, ShieldCheck, HeartHandshake, ChevronDown, Sparkles, Star } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedPresetPlan, setSelectedPresetPlan] = useState<PricingPlan | null>(null);

  // FAQ state control
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Navigates and scroll to top automatically
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pricing actions: select plan from Pricing page and navigate to calculator
  const handleSelectPricingPlan = (plan: PricingPlan) => {
    setSelectedPresetPlan(plan);
    setCurrentView('services'); // We map selector under "services"
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearPreset = () => {
    setSelectedPresetPlan(null);
  };

  // Static FAQ dataset
  const FAQS = [
    {
      q: 'Bagaimana SurveiKita menjamin keakuratan profil responden?',
      a: 'Kami mewajibkan setiap responden mendaftarkan diri menggunakan verifikasi NIK dan nomor seluler aktif. Kami juga menggunakan algoritma konsistensi bertenaga AI di backend untuk mendeteksi jawaban asal-asalan (straight-lining), bot, atau penyelesaian kuesioner yang terlalu cepat.'
    },
    {
      q: 'Seberapa cepat saya bisa mendapatkan laporan analitik lengkap?',
      a: 'Hasil pengumpulan data kuesioner tersaji secara instan detik demi detik di dasbor surveyor Anda. Setelah kuota target responden terpenuhi, Anda bisa langsung mengekspor visualisasi PDF serta data mentah dengan ekstensi file .xlsx, .csv, atau format SPSS (.sav) dalam hitungan menit.'
    },
    {
      q: 'Apakah bisa menyasar target demografis spesifik (misal: ibu menyusui di Surabaya)?',
      a: 'Tentu. Pada form konfigurasi layanan (atau saat berkonsultasi), Anda dapat menentukan filter khusus penargetan responden kami berdasarkan usia, wilayah kota, pengeluaran bulanan, hobi, hingga perangkat sistem ponsel yang mereka gunakan.'
    },
    {
      q: 'Bagaimana penentuan pemberian insentif bagi responden?',
      a: 'Seluruh struktur harga kami sudah mencakup (all-in) penyaluran reward insentif berupa saldo e-wallet (Gopay/OVO/Dana) atau pulsa untuk menjamin laju respon kuesioner yang tinggi dan menghindari responde drop-out.'
    }
  ];

  // Static Review Feedback dataset
  const CLIENT_REVIEWS = [
    {
      company: 'PT Global FMCG Mandiri',
      author: 'Rina Herawati (Brand Manager)',
      logo: 'FMCG',
      quote: 'Layanan Uji Konsep Rasa baru dari SurveiKita membantu menghemat budget produksi kami hingga ratusan juta rupiah. Data kuesioner keluar dalam 2 hari secara akurat!',
      rating: 5
    },
    {
      company: 'Fintech Go Digital',
      author: 'Ivan Aris (VP of Product)',
      logo: 'FINTECH',
      quote: 'Kemampuan analisis sentimen real-time dasbor surveyor di platform ini sangat mengesankan. Kami bisa langsung memantau kepuasan UI rilis terbaru.',
      rating: 5
    }
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between font-sans selection:bg-emerald-100 selection:text-emerald-950">
      
      {/* Header Navigation */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Content Areas based on selected route */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <div className="animate-fadeIn">
            {/* 1. Hero Area */}
            <Hero onNavigate={handleNavigate} />

            {/* 2. Visual summary (dynamic Recharts and stats) */}
            <StatsSummary />

            {/* 3. Business Core Value pillars */}
            <section className="py-16 bg-white border-b border-gray-100 text-left font-sans">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-bold">
                    MENGAPA PILIH KAMI
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                    Infrastruktur Pengumpulan Data Riset Unggulan
                  </h2>
                  <p className="text-sm text-gray-500">
                    Kami memadukan integritas metodologi penelitian akademis dengan akselerasi teknologi analitik terkini.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Pillar 1 */}
                  <div className="border border-gray-100 bg-gray-50/40 p-6 rounded-2xl flex flex-col space-y-3" id="pillar-card-0">
                    <div className="p-3 bg-emerald-50 text-emerald-600 w-fit rounded-xl">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-gray-950">Keamanan & Kredibilitas Data</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Mematuhi standar kepatuhan ISO 27001 dan regulasi perlindungan data pribadi. Setiap responden diaudit secara berkala untuk menghindari bot manipulasi.
                    </p>
                  </div>

                  {/* Pillar 2 */}
                  <div className="border border-gray-100 bg-gray-50/40 p-6 rounded-2xl flex flex-col space-y-3" id="pillar-card-1">
                    <div className="p-3 bg-blue-50 text-blue-600 w-fit rounded-xl">
                      <Award className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-gray-950">Panel Audiens Spesifik</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Lebih dari satu juta responden tersebar di 34 provinsi dengan kriteria demografi terperinci, siap mengisi kuesioner Anda dengan tingkat tanggapan tinggi.
                    </p>
                  </div>

                  {/* Pillar 3 */}
                  <div className="border border-gray-100 bg-gray-50/40 p-6 rounded-2xl flex flex-col space-y-3" id="pillar-card-2">
                    <div className="p-3 bg-amber-50 text-amber-600 w-fit rounded-xl">
                      <HeartHandshake className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-gray-950">Pendampingan Riset Ahli</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Bukan sekadar sistem self-service. Tim analis senior kami senantiasa siap meninjau draf kuesioner Anda untuk memastikan pertanyaan tidak mengandung bias.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Client Review Testimonials (Social Proof) */}
            <section className="py-16 bg-gray-50 border-b border-gray-100 text-left font-sans">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-bold">
                    VALIDASI KLIENT
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                    Kata Mereka yang Sukses Bersama SurveiKita
                  </h2>
                  <p className="text-sm text-gray-500">
                    Kepercayaan ratusan UMKM hingga korporasi besar di Indonesia adalah bukti komitmen akurasi kami.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {CLIENT_REVIEWS.map((review, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white border border-gray-100 rounded-2.5xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative"
                      id={`client-review-${idx}`}
                    >
                      <div className="space-y-4">
                        <div className="flex text-amber-400 gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4.5 w-4.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
                          "{review.quote}"
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                        <div className="text-left font-sans">
                          <span className="block text-xs font-bold text-gray-900">{review.author}</span>
                          <span className="block text-[10px] text-gray-400 font-medium font-mono">{review.company}</span>
                        </div>
                        <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-bold">{review.logo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. FAQ Accordion */}
            <section className="py-16 bg-white font-sans text-left">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-12 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-bold">
                    FAQ PANEL
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                    Pertanyaan yang Sering Diajukan
                  </h2>
                </div>

                <div className="space-y-3" id="faq-accordion-box">
                  {FAQS.map((faq, idx) => {
                    const isOpen = openFaqIdx === idx;
                    return (
                      <div 
                        key={idx} 
                        className="border border-gray-150 rounded-2xl overflow-hidden transition-all bg-white"
                        id={`faq-item-${idx}`}
                      >
                        <button
                          id={`faq-btn-trigger-${idx}`}
                          onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                          className="w-full flex justify-between items-center px-5 py-4 text-left font-bold text-sm text-gray-900 hover:bg-gray-50/50 transition-colors cursor-pointer"
                        >
                          <span className="font-semibold leading-relaxed pr-4">{faq.q}</span>
                          <ChevronDown className={`h-4.5 w-4.5 text-gray-400 shrink-0 transition-transform duration-250 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                        </button>
                        
                        {isOpen && (
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-650 leading-relaxed border-t border-gray-50 bg-gray-50/40 animate-slideDown" id={`faq-answer-render-${idx}`}>
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 6. End Banner CTA */}
            <section className="py-12 bg-emerald-950 text-white font-sans text-left relative overflow-hidden" id="homepage-cta-banner">
              <div className="absolute inset-0 bg-radial-[at_top_right,_var(--tw-gradient-stops)] from-emerald-900/45 via-emerald-950 to-emerald-950 z-0"></div>
              <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center space-y-5">
                <span className="inline-flex items-center space-x-1.5 bg-emerald-900/60 text-emerald-300 px-3 py-1 rounded-md text-xs font-mono border border-emerald-800/40 uppercase">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  <span>Dapatkan Sampel Gratis Pertama Anda</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Siap Memetakan Preferensi Komunitas Pasar Anda?</h2>
                <p className="text-xs sm:text-sm text-emerald-200/90 max-w-xl mx-auto leading-relaxed">
                  Daftarkan rencana kuesioner Anda sekarang dan diskusikan struktur pertanyaan riset ideal bebas biaya pendampingan awal.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <button
                    onClick={() => handleNavigate('demo')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm cursor-pointer shadow-lg shadow-emerald-950/40 transition-colors"
                  >
                    Mulai Uji Simulasi
                  </button>
                  <button
                    onClick={() => handleNavigate('services')}
                    className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm cursor-pointer transition-colors"
                  >
                    Hitung Estimasi Biaya
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentView === 'services' && (
          <div className="animate-fadeIn">
            {/* The custom service configuration wizard */}
            <ServiceSelector 
              selectedPresetPlan={selectedPresetPlan} 
              onClearPreset={handleClearPreset} 
            />
          </div>
        )}

        {currentView === 'pricing' && (
          <div className="animate-fadeIn">
            <Pricing onSelectPlan={handleSelectPricingPlan} />
          </div>
        )}

        {currentView === 'blog' && (
          <div className="animate-fadeIn">
            <Blog />
          </div>
        )}

        {currentView === 'demo' && (
          <div className="animate-fadeIn">
            <InteractiveDemo />
          </div>
        )}
      </main>

      {/* Footer Navigation */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
