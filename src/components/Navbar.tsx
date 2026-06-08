/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, ClipboardList, Activity } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Beranda', id: 'home' },
    { label: 'Layanan', id: 'services' },
    { label: 'Paket Harga', id: 'pricing' },
    { label: 'Blog Riset', id: 'blog' },
    { label: 'Simulasi Live Demo', id: 'demo', highlight: true },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => handleNavClick('home')}
            id="brand-logo"
          >
            <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
              <ClipboardList className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <span className="text-xl font-bold font-sans tracking-tight text-gray-900 flex items-center gap-1.5">
                tSurvey<span className="text-emerald-600">.id</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </span>
              <p className="text-[9px] text-gray-400 font-mono leading-none">BY TELKOMSEL INSIGHTS</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center">
            {menuItems.map((item) => {
              const isActive = currentView === item.id || (item.id === 'blog' && currentView.startsWith('blog'));
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    item.highlight
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-200 ml-2 animate-pulse hover:animate-none'
                      : isActive
                      ? 'text-emerald-700 bg-emerald-50/50'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-emerald-600 hover:bg-gray-50 focus:outline-none"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white" id="mobile-menu-drawer">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {menuItems.map((item) => {
              const isActive = currentView === item.id || (item.id === 'blog' && currentView.startsWith('blog'));
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    item.highlight
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 text-center shadow-md shadow-emerald-100 mt-2'
                      : isActive
                      ? 'text-emerald-700 bg-emerald-50/80 font-semibold'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
