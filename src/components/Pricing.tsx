/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PRICING_PLANS } from '../data';
import { Check, Info, ArrowRight, User, Building, HelpCircle } from 'lucide-react';
import { PricingPlan } from '../types';

interface PricingProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  const [billingType, setBillingType] = useState<'personal' | 'enterprise'>('personal');

  const filteredPlans = PRICING_PLANS.filter(plan => plan.type === billingType);

  // Format currency Helper
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  return (
    <section className="py-12 bg-white font-sans" id="pricing-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">
            INVESTASI RISET
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Pilihan Paket Harga Survei Transparan
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Pilih paket yang sesuai dengan volume target responden dan kebutuhan metodologi riset Anda. Bebas biaya tersembunyi.
          </p>
        </div>

        {/* Pricing Category Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1.5 rounded-2xl inline-flex shadow-inner">
            <button
              id="pricing-toggle-personal"
              onClick={() => setBillingType('personal')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                billingType === 'personal'
                  ? 'bg-white text-emerald-700 shadow-sm border border-gray-200/50'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Perorangan (Personal)</span>
            </button>
            <button
              id="pricing-toggle-enterprise"
              onClick={() => setBillingType('enterprise')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                billingType === 'enterprise'
                  ? 'bg-white text-emerald-700 shadow-sm border border-gray-200/50'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Building className="h-4 w-4" />
              <span>Perusahaan (Enterprise)</span>
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              id={`pricing-card-${plan.id}`}
              className={`bg-white border rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all text-left relative ${
                plan.recommended
                  ? 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-xl shadow-emerald-50'
                  : 'border-gray-200 shadow-sm hover:border-gray-300'
              }`}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-full font-bold shadow-md">
                  Paling Direkomendasikan
                </span>
              )}

              {/* Header Box */}
              <div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed min-h-[40px]">{plan.description}</p>
                
                {/* Price Label */}
                <div className="mt-5 mb-5 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                    {formatIDR(plan.price)}
                  </span>
                  <span className="text-xs font-mono text-gray-400 ml-1.5">
                    / {plan.period}
                  </span>
                </div>

                <hr className="border-gray-100 my-4" />

                {/* Key Benefits */}
                <ul className="space-y-3 mb-6" id={`pricing-${plan.id}-features`}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-xs text-gray-600 leading-snug">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Specifications Panel */}
              <div className="mt-4 space-y-4">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-[11px] space-y-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Target Responden:</span>
                    <strong className="text-gray-800">{plan.maxRespondents.toLocaleString('id-ID')} user</strong>
                  </div>
                  {Object.entries(plan.specs).map(([specKey, specVal]) => (
                    <div key={specKey} className="flex justify-between">
                      <span className="text-gray-400">{specKey}:</span>
                      <strong className="text-gray-800">
                        {typeof specVal === 'boolean' ? (specVal ? 'Ya' : 'Tidak') : String(specVal)}
                      </strong>
                    </div>
                  ))}
                </div>

                <button
                  id={`btn-choose-plan-${plan.id}`}
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                    plan.recommended
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200'
                      : 'bg-gray-950 text-white hover:bg-gray-900 shadow-md shadow-gray-200'
                  }`}
                >
                  <span>Pilih Paket {plan.name}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Double-Check note */}
        <div className="bg-emerald-50/50 rounded-2xl p-4 sm:p-5 border border-emerald-100/50 max-w-4xl mx-auto mt-12 flex items-start gap-3 text-left">
          <Info className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-emerald-900 font-sans">Pertanyaan Mengenai Faktur Corporate Custom?</h4>
            <p className="text-xs text-emerald-700/90 leading-relaxed font-sans">
              Untuk kebutuhan survei tingkat nasional dikoordinasikan secara kustom dengan penandatanganan NDA (Perjanjian Kerahasiaan Data), silakan memilih paket <strong>Corporate Custom Campaign</strong> atau menghubungi Account Executive representatif kantor kami.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
