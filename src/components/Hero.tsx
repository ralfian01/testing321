/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Zap, Users, BarChart3, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-white py-12 lg:py-20 font-sans" id="hero-section">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-radial-[at_top_right,_var(--tw-gradient-stops)] from-emerald-50 via-white to-white opacity-60 z-0"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-100">
              <Zap className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600 animate-bounce" />
              <span>Platform Riset Berbasis Telco Insights No. 1 di Indonesia</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1] font-sans">
              Keputusan Bisnis Akurat Berbasis <span className="text-emerald-600 relative inline-block">
                Telco Big Data
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-emerald-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
              Kumpulkan tanggapan dari 170 Juta+ pelanggan aktif Telkomsel di seluruh Indonesia. Jangkau responden tepercaya dan terverifikasi MSISDN (Bebas Akun Palsu/Bot) dengan parameter penargetan profil terlengkap.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                id="hero-cta-demo"
                onClick={() => onNavigate('demo')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-200 group text-sm sm:text-base cursor-pointer"
              >
                <span>Coba Simulasi Live Demo</span>
                <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                id="hero-cta-services"
                onClick={() => onNavigate('services')}
                className="bg-gray-50 hover:bg-gray-100 text-gray-900 font-medium px-6 py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all border border-gray-200 text-sm sm:text-base cursor-pointer"
              >
                Pilih Layanan Survei
              </button>
            </div>

            {/* Short Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-gray-100 max-w-lg">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>170Jt+ Profil Aktif</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Zap className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Filter Telco Insights</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Users className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Validasi Anti-Bot rill</span>
              </div>
            </div>
          </div>

          {/* Graphical Representation / Hero App Preview Card */}
          <div className="lg:col-span-5 relative" id="hero-interactive-card">
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden group">
              {/* Abs decoration circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-900/20 rounded-full blur-2xl"></div>

              {/* Card Header mockup */}
              <div className="flex justify-between items-center pb-4 border-b border-white/20 relative z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded uppercase tracking-widest text-emerald-100">Live Tracker</span>
              </div>

              {/* Status Stats Mockup */}
              <div className="pt-6 space-y-6 relative z-10 text-left">
                <div>
                  <p className="text-xs text-emerald-100 font-mono tracking-wider">AKTIVITAS RESPONDEN LIVE</p>
                  <p className="text-3xl font-extrabold tracking-tight mt-1">170JT+ <span className="text-xs font-normal text-emerald-200">panel terintegrasi</span></p>
                </div>

                {/* Progress bar animation */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span>Targeting Accuracy</span>
                    <span className="font-semibold text-emerald-100">99.9%</span>
                  </div>
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-300 rounded-full animate-pulse" style={{ width: '99%' }}></div>
                  </div>
                </div>

                {/* Simulated Responses feed */}
                <div className="bg-emerald-950/30 border border-white/10 p-3.5 rounded-xl space-y-2.5 text-xs text-emerald-50 font-sans">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Responden tSurvey Pasca-Bayar</span>
                    <span className="text-[9px] font-mono text-emerald-300">Live Match</span>
                  </div>
                  <p className="italic text-emerald-100/90 leading-snug">"Sangat puas dengan kualitas jangkauan sinyal 5G di wilayah residensial kami saat ini."</p>
                  <div className="flex space-x-2 text-[10px] font-mono">
                    <span className="bg-emerald-800/40 px-1.5 py-0.5 rounded text-emerald-200">Jakarta Selatan</span>
                    <span className="bg-emerald-800/40 px-1.5 py-0.5 rounded text-emerald-200">Pekerja IT (OS iOS, ARPU &gt; 250rb)</span>
                  </div>
                </div>

                {/* CTA inside Card */}
                <button
                  id="hero-card-goto-demo"
                  onClick={() => onNavigate('demo')}
                  className="w-full bg-white text-emerald-900 font-semibold py-2.5 hover:bg-emerald-50 rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5 text-xs cursor-pointer"
                >
                  <Users className="h-4 w-4 text-emerald-700" />
                  <span>Coba Masuk Ke Dasbor Surveyor</span>
                </button>
              </div>
            </div>

            {/* Floating Mini Stats card */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white border border-gray-100 rounded-2xl p-4 shadow-xl flex items-center space-x-3 max-w-xs animate-bounce" style={{ animationDuration: '4s' }} id="hero-floating-badge">
              <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div className="text-left font-sans">
                <span className="block text-[10px] text-gray-400 font-mono">ESTIMASI BIAYA</span>
                <span className="block text-sm font-bold text-gray-900">Mulai Rp 700 / Responden</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
