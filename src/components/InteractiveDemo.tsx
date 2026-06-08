/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_FEEDBACKS } from '../data';
import { SurveyFeedback } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import { Smartphone, Monitor, RotateCcw, CheckCircle2, Send, Activity, Users, Star, ClipboardList, Clock } from 'lucide-react';

export default function InteractiveDemo() {
  const [feedbacks, setFeedbacks] = useState<SurveyFeedback[]>(() => {
    const saved = localStorage.getItem('tsurvey_demo_feedbacks');
    return saved ? JSON.parse(saved) : INITIAL_FEEDBACKS;
  });

  // Active perspective switcher on mobile (since desktop uses side-by-side split)
  const [mobilePerspective, setMobilePerspective] = useState<'respondent' | 'surveyor'>('respondent');

  // Respondent Form inputs
  const [ageGroup, setAgeGroup] = useState('18-24 tahun (Gen Z)');
  const [frequency, setFrequency] = useState('2-3 Kali Seminggu');
  const [preferredPlatform, setPreferredPlatform] = useState('E-commerce (Shopee/Tokopedia)');
  const [rating, setRating] = useState(5);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [showLiveNotification, setShowLiveNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  // Persist demo feedbacks
  useEffect(() => {
    localStorage.setItem('tsurvey_demo_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  const handleClearDemoData = () => {
    if (window.confirm('Apakah Anda ingin menyetel ulang visualisasi simulasi ke data awal?')) {
      setFeedbacks(INITIAL_FEEDBACKS);
      localStorage.removeItem('tsurvey_demo_feedbacks');
      setJustSubmitted(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get current time formatted
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    // Create item
    const newFeedback: SurveyFeedback = {
      id: `live-feed-${Date.now()}`,
      ageGroup,
      frequency,
      preferredPlatform,
      rating,
      submittedAt: timeStr
    };

    setFeedbacks(prev => [newFeedback, ...prev]);
    setJustSubmitted(true);
    setNotificationMsg(`Tanggapan baru dari kelompok ${ageGroup.split(' ')[0]} berhasil dicatat!`);
    setShowLiveNotification(true);

    // Fade notification out after 4 seconds
    setTimeout(() => {
      setShowLiveNotification(false);
    }, 4000);
  };

  // Compile calculations for Surveyor Panel
  const totalResponses = feedbacks.length;
  const averageRating = (feedbacks.reduce((acc, f) => acc + f.rating, 0) / totalResponses).toFixed(1);

  // Group age frequencies
  const getAgeChartData = () => {
    const counts = feedbacks.reduce((acc: { [key: string]: number }, f) => {
      acc[f.ageGroup] = (acc[f.ageGroup] || 0) + 1;
      return acc;
    }, {});

    return [
      { name: 'Gen Z', jumlah: counts['18-24 tahun (Gen Z)'] || 0, fill: '#10b981' },
      { name: 'Milenial', jumlah: counts['25-34 tahun (Milenial)'] || 0, fill: '#3b82f6' },
      { name: '35-44 th', jumlah: counts['35-44 tahun'] || 0, fill: '#f59e0b' },
      { name: '45+ th', jumlah: counts['45+ tahun'] || 0, fill: '#6366f1' }
    ];
  };

  // Group preferred platform
  const getPlatformChartData = () => {
    const counts = feedbacks.reduce((acc: { [key: string]: number }, f) => {
      acc[f.preferredPlatform] = (acc[f.preferredPlatform] || 0) + 1;
      return acc;
    }, {});

    return [
      { name: 'E-commerce', value: counts['E-commerce (Shopee/Tokopedia)'] || 0, color: '#10b981' },
      { name: 'Sosial Commerce', value: counts['Social Commerce (Tiktok Shop)'] || 0, color: '#3b82f6' },
      { name: 'Web Resmi', value: counts['Situs Web Resmi Brand'] || 0, color: '#8b5cf6' }
    ];
  };

  return (
    <section className="py-12 bg-white font-sans" id="realtime-demo-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">
            EXPERIENCE LIVE ENVIRONMENT
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Uji Simulasi Interaktif 2 Sisi (Live)
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Rasakan langsung bagaimana data yang Anda isi di sisi **Responden** seketika meng-update dashboard visual analitik di sisi **Surveyor** secara akurat tanpa reload halaman.
          </p>
        </div>

        {/* Live Notification Toast */}
        {showLiveNotification && (
          <div className="fixed bottom-5 right-5 sm:right-8 bg-emerald-950 text-emerald-300 px-4 py-3 rounded-xl shadow-2xl border border-emerald-800 z-50 flex items-center gap-3 animate-slideIn" id="live-toast-bar">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold">{notificationMsg}</span>
          </div>
        )}

        {/* Action Button: Clear/Reset Local Data */}
        <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto px-2">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono">SIMULATION STATUS: ACTIVE</span>
          </div>
          <button
            onClick={handleClearDemoData}
            className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1.5 transition-colors cursor-pointer"
            id="btn-clear-demo"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Sajikan Data Awal (Reset)</span>
          </button>
        </div>

        {/* Mobile View Toggle Buttons */}
        <div className="flex md:hidden bg-gray-100 p-1 rounded-xl mb-6 max-w-sm mx-auto shadow-inner">
          <button
            id="mobile-btn-respondent"
            onClick={() => setMobilePerspective('respondent')}
            className={`w-1/2 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobilePerspective === 'respondent'
                ? 'bg-white text-emerald-700 shadow'
                : 'text-gray-500'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>Sisi Responden</span>
          </button>
          <button
            id="mobile-btn-surveyor"
            onClick={() => setMobilePerspective('surveyor')}
            className={`w-1/2 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobilePerspective === 'surveyor'
                ? 'bg-white text-emerald-700 shadow'
                : 'text-gray-500'
            }`}
          >
            <Monitor className="h-4 w-4" />
            <span>Sisi Surveyor</span>
          </button>
        </div>

        {/* Main Grid: Responsive Split-Screen */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* ========================================================= */}
          {/* SISI RESPONDEN (LEFT SCREEN)                              */}
          {/* ========================================================= */}
          <div 
            className={`md:col-span-5 bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between ${
              mobilePerspective === 'respondent' ? 'block' : 'hidden md:flex'
            }`}
            id="perspective-respondent-box"
          >
            <div className="space-y-4">
              {/* Header Box */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 text-left">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
                    <Smartphone className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-none">Perspective: Responden</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-mono">TAMPILAN PENGISI KUESIONER</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded tracking-wide">Live Form</span>
              </div>

              {justSubmitted ? (
                /* Thank you screen */
                <div className="py-12 text-center space-y-4 animate-fadeIn" id="respondent-thank-you">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-gray-900">Tanggapan Berhasil Dikirim!</h4>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                      Seketika data jawaban Anda meng-update grafik interaktif di sisi Surveyor secara real-time. Perhatikan panel surveyor di sebelah kanan.
                    </p>
                  </div>
                  <button
                    onClick={() => setJustSubmitted(false)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Kirim Jawaban Baru Lagi
                  </button>
                </div>
              ) : (
                /* Questionnaire Form */
                <form onSubmit={handleFormSubmit} className="space-y-4 pt-2 text-left" id="respondent-form-demo">
                  <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-widest font-mono">
                    KUESIONER: Preferensi Belanja Online
                  </h4>

                  {/* Q1: Age Group */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">1. Berapa rentang usia Anda saat ini?</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {['18-24 tahun (Gen Z)', '25-34 tahun (Milenial)', '35-44 tahun', '45+ tahun'].map((option) => (
                        <div
                          key={option}
                          onClick={() => setAgeGroup(option)}
                          className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                            ageGroup === option
                              ? 'bg-emerald-600 text-white border-emerald-600 font-semibold'
                              : 'bg-white text-gray-650 border-gray-200 hover:border-gray-350'
                          }`}
                        >
                          {option.split(' ')[0]} {option.includes('(') ? option.substring(option.indexOf('(')) : ''}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Q2: Frequency */}
                  <div className="space-y-1.5">
                    <label htmlFor="q-freq" className="text-xs font-bold text-gray-700 block text-left">2. Seberapa sering Anda berbelanja online?</label>
                    <select
                      id="q-freq"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 text-left cursor-pointer"
                    >
                      <option value="Hampir Setiap Hari">Hampir Setiap Hari</option>
                      <option value="2-3 Kali Seminggu">2-3 Kali Seminggu</option>
                      <option value="1-2 Kali Sebulan">1-2 Kali Sebulan</option>
                      <option value="Jarang Sekali">Jarang Sekali</option>
                    </select>
                  </div>

                  {/* Q3: Platform */}
                  <div className="space-y-1.5">
                    <label htmlFor="q-platform" className="text-xs font-bold text-gray-700 block text-left">3. Saluran belanja online apa pilihan utama Anda?</label>
                    <select
                      id="q-platform"
                      value={preferredPlatform}
                      onChange={(e) => setPreferredPlatform(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-emerald-500 text-left cursor-pointer"
                    >
                      <option value="E-commerce (Shopee/Tokopedia)">E-commerce (Shopee / Tokopedia / Blibli)</option>
                      <option value="Social Commerce (Tiktok Shop)">Social Commerce (Tiktok Shop)</option>
                      <option value="Situs Web Resmi Brand">Situs Web Resmi Brand (Nike, Uniqlo, dll)</option>
                    </select>
                  </div>

                  {/* Q4: Rating */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">4. Berikan tingkat kenyamanan belanja online (1-5)</label>
                    <div className="flex justify-center items-center gap-2 pt-1">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setRating(val)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold font-mono transition-all border ${
                            rating === val
                              ? 'bg-amber-500 text-white border-amber-500 scale-110 shadow-md shadow-amber-100'
                              : 'bg-white text-gray-605 border-gray-250 hover:bg-gray-50'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono px-1">
                      <span>Sangat Buruk</span>
                      <span>Sangat Nyaman</span>
                    </div>
                  </div>

                  <button
                    id="btn-submit-respondent"
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-md shadow-emerald-100"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Kirim Jawaban Survei</span>
                  </button>
                </form>
              )}
            </div>

            {/* Note responding info footer */}
            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-100/50 text-left text-[11px] leading-relaxed mt-6">
              * Di simulasi web aslinya, kuesioner disajikan dengan transisi animasi elegan per halaman pertunjukan demi menghindari responden kelelahan (survey fatigue).
            </div>
          </div>

          {/* ========================================================= */}
          {/* SISI SURVEYOR (RIGHT SCREEN)                              */}
          {/* ========================================================= */}
          <div 
            className={`md:col-span-7 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative ${
              mobilePerspective === 'surveyor' ? 'block' : 'hidden md:flex'
            }`}
            id="perspective-surveyor-box"
          >
            {/* Live Indicator Dot absolute right top */}
            <div className="absolute top-6 right-6 flex items-center space-x-1.5 text-[9px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>LIVE FEEDER</span>
            </div>

            <div className="space-y-6">
              {/* Header Box */}
              <div className="flex items-center space-x-2 pb-4 border-b border-gray-150 text-left">
                <div className="p-1.5 bg-gray-900 rounded-lg text-white">
                  <Monitor className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-none">Perspective: Surveyor Console</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5 font-mono">DASBOR ANALITIK REAL-TIME</p>
                </div>
              </div>

              {/* 3 Overview Badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-left">
                  <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                    <Users className="h-3 w-3 text-emerald-600" /> RES-VOL
                  </span>
                  <span className="block text-lg font-extrabold text-gray-900 mt-1 font-sans">{totalResponses} data</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-left">
                  <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-500" /> SAT-INDEX
                  </span>
                  <span className="block text-lg font-extrabold text-gray-900 mt-1 font-sans">{averageRating}/5.0</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-left">
                  <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                    <Activity className="h-3 w-3 text-blue-500" /> SPEED
                  </span>
                  <span className="block text-lg font-extrabold text-gray-900 mt-1 font-sans">&lt; 1 Detik</span>
                </div>
              </div>

              {/* 2 Mini Charts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Age chart (Bar) */}
                <div className="border border-gray-100 rounded-xl p-3 space-y-2 text-left">
                  <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-wide font-mono">Kelompok Umur Terkumpul</h4>
                  <div className="h-[130px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getAgeChartData()} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <XAxis dataKey="name" fontSize={9} stroke="#9ca3af" tickLine={false} axisLine={false} />
                        <YAxis fontSize={9} stroke="#9ca3af" tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Bar dataKey="jumlah" fill="#10b981" radius={[4, 4, 0, 0]}>
                          {getAgeChartData().map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Platform chart (Pie) */}
                <div className="border border-gray-100 rounded-xl p-3 space-y-2 text-left">
                  <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-wide font-mono">Preferensi Saluran Belanja</h4>
                  <div className="h-[130px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getPlatformChartData()}
                          cx="50%"
                          cy="50%"
                          outerRadius={38}
                          innerRadius={20}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {getPlatformChartData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Miniature descriptions */}
                  <div className="flex justify-center gap-2 text-[9px] text-gray-500 font-mono">
                    <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Ecom</span>
                    <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Social</span>
                    <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> Web</span>
                  </div>
                </div>

              </div>

              {/* Live Ticker Feed */}
              <div className="space-y-2 text-left">
                <h4 className="text-xs font-bold text-gray-900 flex items-center justify-between font-mono uppercase">
                  <span>Aliran Tanggapan Terbaru (Live Feed)</span>
                  <span className="text-[10px] text-emerald-600 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Updated {feedbacks[0]?.submittedAt || 'Instan'}
                  </span>
                </h4>
                <div className="max-h-[120px] overflow-y-auto space-y-1.5 border border-gray-100 rounded-xl p-2 bg-gray-50 scrollbar-thin">
                  {feedbacks.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-100 p-2 rounded-lg text-[10px] flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-gray-900">{item.ageGroup.split(' ')[0]}</span>
                          <span className="text-gray-400">&bull;</span>
                          <span className="text-gray-500">{item.preferredPlatform.split(' ')[0]}</span>
                        </div>
                        <p className="text-gray-400 italic">"Belanja online {item.frequency.toLowerCase()} dengan rating {item.rating}/5"</p>
                      </div>
                      <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded shrink-0">{item.submittedAt}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Simulated Live Analytics bottom summary */}
            <div className="text-[10px] text-gray-400 font-mono mt-6 text-center border-t border-gray-100 pt-4">
              SECURE WEB API ACCESS &bull; REAL-TIME WS STREAM SIMULATION &bull; ISO 27001
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
