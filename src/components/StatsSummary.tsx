/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, Clipboard, Zap, Award, BarChart3, PieChart as PieIcon, HelpCircle } from 'lucide-react';

export default function StatsSummary() {
  const [activeTab, setActiveTab] = useState<'industry' | 'demographics'>('industry');

  // Stats data
  const statsOverview = [
    { label: 'Jangkauan Pelanggan', value: '170Jt+ Pengguna', change: 'Terluas di seluruh Indonesia', icon: Users, color: 'text-emerald-600 bg-emerald-50 font-bold' },
    { label: 'Survei Terselesaikan', value: '150,000+', change: 'Tanggapan rill bebas bot fiktif', icon: Clipboard, color: 'text-blue-600 bg-blue-50' },
    { label: 'Waktu Pengumpulan Data', value: '< 24 Jam', change: 'Kecepatan seketika via SMS/Web', icon: Zap, color: 'text-amber-600 bg-amber-50' },
    { label: 'Akurasi Profil Responden', value: '100% Valid', change: 'Termasuk ARPU & kebiasaan transaksi', icon: Award, color: 'text-indigo-600 bg-indigo-50' }
  ];

  // Industry dataset for BarChart
  const industryData = [
    { name: 'FMCG & Ritel', survei: 1240, responden: 250000 },
    { name: 'Aplikasi & IT', survei: 980, responden: 180000 },
    { name: 'Fintech/Finance', survei: 720, responden: 150000 },
    { name: 'F&B Kuliner', survei: 850, responden: 95000 },
    { name: 'Kesehatan', survei: 430, responden: 75000 },
  ];

  // Demographics dataset for PieChart
  const ageDemographics = [
    { name: '18-24 tahun (Gen Z)', value: 45, color: '#059669' }, // emerald 600
    { name: '25-34 tahun (Milenial)', value: 35, color: '#2563eb' }, // blue 600
    { name: '35-44 tahun', value: 12, color: '#d97706' }, // amber 600
    { name: '45+ tahun', value: 8, color: '#4f46e5' } // indigo 600
  ];

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100 font-sans" id="stats-summary-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">
            INTELLIGENT STATS
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Metrik Responden & Hasil Riset Pasar Komprehensif
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Berikut ringkasan statistik komprehensif terkait sirkulasi kuesioner dan keterwakilan demografis panel responden aktif kami yang berkembang setiap detiknya.
          </p>
        </div>

        {/* 4-Column Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsOverview.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:shadow-gray-100 transition-all text-left"
                id={`overview-stat-card-${idx}`}
              >
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50/50 px-2 py-0.5 rounded-full font-semibold">Live</span>
                </div>
                <div className="mt-4 space-y-1">
                  <span className="text-xs text-gray-400 block font-medium">{stat.label}</span>
                  <span className="text-2xl font-extrabold text-gray-900 block font-sans tracking-tight">{stat.value}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>{stat.change}</span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Chart Card (Interactive Visual Data Representation) */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-100 mb-6 gap-4">
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-900">Visualisasi Distribusi Riset Aktif</h3>
              <p className="text-xs text-gray-500 mt-1">Gunakan tab untuk memfilter kategori demografi atau sebaran sektor bisnis.</p>
            </div>
            
            {/* Tab switchers */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                id="tab-industry"
                onClick={() => setActiveTab('industry')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all text-left cursor-pointer ${
                  activeTab === 'industry'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5" />
                <span>Sektor Bisnis Teraktif</span>
              </button>
              <button
                id="tab-demographics"
                onClick={() => setActiveTab('demographics')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all text-left cursor-pointer ${
                  activeTab === 'demographics'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <PieIcon className="h-3.5 w-3.5" />
                <span>Rentang Usia Demografi</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[320px]">
            {/* Chart Area */}
            <div className="lg:col-span-8 h-[280px] sm:h-[320px] w-full" id="stats-chart-render">
              {activeTab === 'industry' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={industryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111827', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }} 
                      cursor={{ fill: 'rgba(16, 185, 129, 0.05)' }}
                    />
                    <Bar dataKey="responden" name="Estimasi Responden" fill="#10b981" radius={[8, 8, 0, 0]} barSize={40} />
                    <Bar dataKey="survei" name="Survei Aktif" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ageDemographics}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {ageDemographics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Context Legends & Insights Details */}
            <div className="lg:col-span-4 space-y-4 text-left">
              {activeTab === 'industry' ? (
                <div className="space-y-4" id="insight-industry-content">
                  <h4 className="text-sm font-bold text-gray-900 border-l-4 border-emerald-500 pl-2">Sektor Teratas & Keaktifan</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Sektor FMCG (Barang Konsumen Cepat Habis) dan Ritel memimpin penggunaan kampanye survei bulanan untuk riset penentuan varian rasa & preferensi kemasan.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs text-gray-600 space-y-2">
                    <div className="flex justify-between font-mono">
                      <span>Total Sampel Swadaya:</span>
                      <strong className="text-gray-900">750,000 Responden</strong>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>Laju Pengisian Rata-rata:</span>
                      <strong className="text-emerald-600">~67 Respon / Detik</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4" id="insight-demographics-content">
                  <h4 className="text-sm font-bold text-gray-900 border-l-4 border-blue-500 pl-2">Detail Porsi Keterwakilan</h4>
                  
                  {/* Custom Legends style with color bullet points */}
                  <div className="space-y-2.5 text-xs text-gray-600" id="pie-legends-list">
                    {ageDemographics.map((entry, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-gray-50/50 p-2 rounded-lg border border-gray-100/50">
                        <div className="flex items-center space-x-2">
                          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: entry.color }}></span>
                          <span>{entry.name}</span>
                        </div>
                        <strong className="text-gray-850 font-mono font-semibold">{entry.value}%</strong>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed pt-1.5">
                    Mayoritas responden panel merupakan kelompok usia produktif (Gen Z & Milenial), memberikan insights yang paling relevan bagi tren e-commerce dan inovasi teknologi terkini.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
