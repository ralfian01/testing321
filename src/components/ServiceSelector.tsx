/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SURVEY_SERVICES } from '../data';
import { PricingPlan, SurveyService } from '../types';
import { Smile, Lightbulb, TrendingUp, MapPin, Check, Plus, Minus, Calculator, Sparkles, Send, CheckCircle2 } from 'lucide-react';

interface ServiceSelectorProps {
  selectedPresetPlan?: PricingPlan | null;
  onClearPreset?: () => void;
}

export default function ServiceSelector({ selectedPresetPlan, onClearPreset }: ServiceSelectorProps) {
  // Select service type
  const [selectedServiceId, setSelectedServiceId] = useState(SURVEY_SERVICES[0].id);
  // Respondent counts
  const [respondents, setRespondents] = useState(1000);
  // Input fields
  const [businessName, setBusinessName] = useState('');
  const [researchGoal, setResearchGoal] = useState('');
  const [emailContact, setEmailContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // If a preset plan was selected from pricing page, adjust defaults
  useEffect(() => {
    if (selectedPresetPlan) {
      setRespondents(selectedPresetPlan.maxRespondents);
      // Auto choose service matching enterprise vs personal
      if (selectedPresetPlan.type === 'enterprise') {
        setSelectedServiceId('srv-2'); // Market fit uploader
      } else {
        setSelectedServiceId('srv-1'); // CSAT
      }
    }
  }, [selectedPresetPlan]);

  const activeService = SURVEY_SERVICES.find(s => s.id === selectedServiceId) || SURVEY_SERVICES[0];

  // Dynamically compute pricing
  // Baseprice + (cost per respondent * respondents)
  // Cost per respondent varies by service complexity
  const getCostPerRes = (id: string) => {
    switch (id) {
      case 'srv-1': return 1200; // CSAT
      case 'srv-2': return 3500; // Concept Testing
      case 'srv-3': return 2200; // Brand Awareness
      case 'srv-4': return 4000; // Regional studies
      default: return 2000;
    }
  };

  const costPerRespondent = getCostPerRes(activeService.id);
  const calculatedTotal = activeService.basePrice + (costPerRespondent * respondents);

  // Format IDR currency
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  // Helper mapping icon key to Lucide Component
  const renderServiceIcon = (iconName: string) => {
    const cls = "h-6 w-6 text-emerald-600";
    switch (iconName) {
      case 'Smile': return <Smile className={cls} />;
      case 'Lightbulb': return <Lightbulb className={cls} />;
      case 'TrendingUp': return <TrendingUp className={cls} />;
      case 'MapPin': return <MapPin className={cls} />;
      default: return <Smile className={cls} />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !researchGoal || !emailContact) {
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onClearPreset) {
        onClearPreset();
      }
    }, 1200);
  };

  const handleResetForm = () => {
    setBusinessName('');
    setResearchGoal('');
    setEmailContact('');
    setIsSuccess(false);
  };

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100 font-sans" id="service-selector-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">
            SURVEY CALCULATOR & WIZARD
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Konfigurasikan Rencana Layanan Survei Anda
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Gunakan fungsionalitas simulator di bawah untuk memilih sasaran kuesioner, memodifikasi kuota responden, dan menghitung estimasi rincian investasi riset Anda seketika.
          </p>
        </div>

        {/* Preset Notification Banner if navigated from Pricing tab */}
        {selectedPresetPlan && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-8 flex justify-between items-center text-left max-w-4xl mx-auto" id="preset-notification-bar">
            <div>
              <p className="text-xs text-emerald-800 font-mono">KONFIGURASI PRESET AKTIF:</p>
              <h4 className="text-sm font-bold text-emerald-950 font-sans mt-0.5">Menggunakan Paket: {selectedPresetPlan.name}</h4>
            </div>
            <button
              onClick={onClearPreset}
              className="px-3 py-1 bg-white border border-emerald-200 text-xs font-semibold text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Hapus Preset
            </button>
          </div>
        )}

        {isSuccess ? (
          <div className="bg-white border border-gray-150 rounded-3xl p-8 max-w-2xl mx-auto text-center space-y-5 shadow-xl shadow-gray-100 animate-fadeIn" id="builder-success-dialog">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Pengajuan Konfigurasi Berhasil Terkirim!</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Terima kasih telah menyusun rencana survei Anda. Konsultan Riset Senior kami akan memvalidasi sasaran riset dan mengirimkan draft rincian kuesioner ke email <strong>{emailContact}</strong> dalam kurun waktu maks 2 jam (Hari Kerja).
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-left text-xs text-gray-600 mt-4 font-mono max-w-md mx-auto space-y-1.5">
              <p><strong>Layanan Terpilih:</strong> {activeService.title}</p>
              <p><strong>Jumlah Responden:</strong> {respondents.toLocaleString('id-ID')} Panel</p>
              <p><strong>Estimasi Investasi:</strong> {formatIDR(calculatedTotal)}</p>
              <p><strong>Kontak Bisnis:</strong> {businessName}</p>
            </div>
            <button
              onClick={handleResetForm}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all"
            >
              Ulangi Konfigurasi Alternatif
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            
            {/* Left Part: Service Selector & Slider Configuration */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* 1. Select Service Category */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-950 font-sans block">1. Pilih Bentuk Layanan Penelitian</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="service-options-picker">
                  {SURVEY_SERVICES.map((srv) => (
                    <div
                      key={srv.id}
                      id={`srv-option-card-${srv.id}`}
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 ${
                        selectedServiceId === srv.id
                          ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="p-2 bg-emerald-50 rounded-xl shrink-0 mt-0.5">
                        {renderServiceIcon(srv.icon)}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-gray-900 leading-tight">{srv.title}</h4>
                        <p className="text-[10px] text-gray-400 font-medium">Mulai {formatIDR(srv.basePrice)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Respondent Counter / Slider */}
              <div className="space-y-4 bg-white p-6 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-gray-950 font-sans">2. Tentukan Sasaran Volume Responden</label>
                  <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">
                    {respondents.toLocaleString('id-ID')} Orang
                  </span>
                </div>

                {/* Range Slider */}
                <div className="space-y-2">
                  <input
                    id="respondents-slider"
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={respondents}
                    onChange={(e) => setRespondents(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-gray-100 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>100 PANEL</span>
                    <span>5.000 PANEL</span>
                    <span>10.000 PANEL</span>
                  </div>
                </div>

                {/* Counter control as helper */}
                <div className="flex justify-center items-center space-x-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setRespondents(prev => Math.max(100, prev - 100))}
                    className="p-2 bg-gray-50 border border-gray-250 hover:bg-gray-100 rounded-lg text-gray-500"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-xs font-mono text-gray-600">Tekan halus untuk menyesuaikan &plusmn; 100</span>
                  <button
                    type="button"
                    onClick={() => setRespondents(prev => Math.min(10000, prev + 100))}
                    className="p-2 bg-gray-50 border border-gray-250 hover:bg-gray-100 rounded-lg text-gray-500"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* 3. Operational Questionnaire Wizard Info Details */}
              <div className="bg-emerald-950 text-emerald-100 rounded-2xl p-5 relative overflow-hidden">
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs text-emerald-300 font-mono uppercase bg-emerald-900/45 px-2.5 py-1 rounded-md w-fit">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Metodologi Premium</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-sans">{activeService.title}</h4>
                  <p className="text-xs text-emerald-200/90 leading-relaxed">{activeService.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
                    {activeService.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span className="text-emerald-100">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <hr className="border-emerald-800 my-2" />
                  <p className="text-[10px] text-emerald-300/80 font-mono uppercase tracking-wider">AUDIENS TARGET: {activeService.targetAudience}</p>
                </div>
              </div>

            </div>

            {/* Right Part: Dynamic Estimator Summary & Application Form */}
            <div className="lg:col-span-5 bg-white border border-gray-150 rounded-2xl p-6 shadow-md text-left space-y-6">
              
              {/* Title estimator */}
              <div className="flex items-center space-x-2 pb-4 border-b border-gray-100">
                <Calculator className="h-5 w-5 text-emerald-600" />
                <h3 className="text-base font-bold text-gray-900">Rincian Estimasi Investasi</h3>
              </div>

              <div className="space-y-3 font-mono text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Biaya Setup ({activeService.title}):</span>
                  <span className="text-gray-900 font-semibold">{formatIDR(activeService.basePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Panel ({respondents} x {formatIDR(costPerRespondent)}):</span>
                  <span className="text-gray-900 font-semibold">{formatIDR(costPerRespondent * respondents)}</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between text-sm py-2">
                  <span className="font-bold text-gray-900">Total Perkiraan Biaya:</span>
                  <span className="text-emerald-700 font-extrabold text-base">{formatIDR(calculatedTotal)}</span>
                </div>
                <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-lg text-[10px] leading-relaxed">
                  * Biaya di atas bersifat perkiraan pra-desain. Sudah termasuk insentif tunai/e-wallet untuk pengisi kuesioner Anda secara transparan.
                </div>
              </div>

              {/* Form Submission */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-gray-100">
                <div className="space-y-1">
                  <label htmlFor="businessName" className="text-xs font-bold text-gray-700 block">Nama Bisnis / Lembaga Anda</label>
                  <input
                    id="businessName"
                    type="text"
                    required
                    placeholder="Contoh: PT Kuliner Mandiri Utama"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="researchGoal" className="text-xs font-bold text-gray-700 block font-sans">Kebutuhan / Sasaran Riset Singkat</label>
                  <textarea
                    id="researchGoal"
                    required
                    rows={2}
                    placeholder="Contoh: Menguji preferensi kemasan bento box baru bagi pekerja kantor berumur 22-30 tahun."
                    value={researchGoal}
                    onChange={(e) => setResearchGoal(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="emailContact" className="text-xs font-bold text-gray-700 block">Alamat Email Bisnis</label>
                  <input
                    id="emailContact"
                    type="email"
                    required
                    placeholder="Contoh: ralfian@kuliner.co.id"
                    value={emailContact}
                    onChange={(e) => setEmailContact(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  id="btn-submit-service"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-lg shadow-emerald-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{isSubmitting ? 'Memproses Pengajuan...' : 'Ajukan Penawaran Sekarang'}</span>
                </button>
              </form>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
