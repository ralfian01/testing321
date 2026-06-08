/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClipboardList, Mail, Phone, MapPin, Globe, Award, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-900 font-sans" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1.5">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onNavigate('home')}
              id="footer-logo"
            >
              <div className="p-2 bg-emerald-950/30 rounded-lg border border-emerald-800/50">
                <ClipboardList className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                tSurvey<span className="text-emerald-400">.id</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Platform riset pasar modern dari Telkomsel yang mengumpulkan tanggapan responden rill secara instan dengan segmentasi terverifikasi demi akurasi data keputusan bisnis Anda.
            </p>
            <div className="flex space-x-4 pt-2">
              <div className="flex items-center space-x-1.5 text-xs text-gray-400 bg-gray-900 px-2.5 py-1.5 rounded-md border border-gray-800">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>ISO 27001 Certified</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-gray-400 bg-gray-900 px-2.5 py-1.5 rounded-md border border-gray-800">
                <Award className="h-3.5 w-3.5 text-amber-400" />
                <span>Kredibel Telkomsel</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 font-mono">Navigasi</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-emerald-400 transition-colors text-gray-400 text-left cursor-pointer"
                  id="footer-link-home"
                >
                  Beranda Utama
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="hover:text-emerald-400 transition-colors text-gray-400 text-left cursor-pointer"
                  id="footer-link-services"
                >
                  Layanan Survei
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('pricing')} 
                  className="hover:text-emerald-400 transition-colors text-gray-400 text-left cursor-pointer"
                  id="footer-link-pricing"
                >
                  Daftar Paket Harga
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('blog')} 
                  className="hover:text-emerald-400 transition-colors text-gray-400 text-left cursor-pointer"
                  id="footer-link-blog"
                >
                  Blog & Artikel Riset
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('demo')} 
                  className="hover:text-emerald-400 text-emerald-400 font-semibold transition-colors text-left cursor-pointer"
                  id="footer-link-demo"
                >
                  Simulasi Live Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Business Hours & General Info */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 font-mono">Informasi Kontak</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Telkomsel Smart Office, Jl. Jend. Gatot Subroto Kav. 52, Jakarta Selatan, DKI Jakarta 12710</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>(021) 5092-2300</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>cs@tsurvey.id</span>
              </li>
            </ul>
          </div>

          {/* Weekly Tips Mock Newsletter */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 font-mono">Tips Riset Mingguan</h3>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              Daftarkan email Anda untuk tips berkala seputar segmentasi konsumen, taktik riset, dan analisis trends gratis.
            </p>
            {isSubscribed ? (
              <div className="bg-emerald-950/40 border border-emerald-900/50 p-3 rounded-lg text-xs text-emerald-400">
                Terima kasih! Email Anda telah terdaftar dalam buletin riset tSurvey.id.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Alamat email Anda..."
                  className="bg-gray-900 border border-gray-800 text-white rounded-l-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 w-full"
                />
                <button
                  id="footer-newsletter-btn"
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-4 py-2 rounded-r-lg transition-colors cursor-pointer"
                >
                  Ikuti
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-gray-900 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {currentYear} PT Telekomunikasi Selular (Telkomsel) & tSurvey.id. Hak Cipta Dilindungi.</p>
          <div className="flex space-x-4 mt-3 sm:mt-0">
            <span className="hover:text-gray-400 cursor-pointer">Kebijakan Privasi</span>
            <span>&bull;</span>
            <span className="hover:text-gray-400 cursor-pointer">Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
