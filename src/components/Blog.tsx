/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, User, Clock, Search, BookOpen, ChevronRight, Tag } from 'lucide-react';

export default function Blog() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const activeArticle = BLOG_POSTS.find(post => post.id === selectedArticleId);

  // Search filter
  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Custom simple Markdown renderer to avoid third-party HTML injection problems in React 19
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('# ')) {
        return <h1 key={idx} className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-6 mb-3 font-sans leading-tight">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-xl sm:text-2xl font-bold text-gray-950 mt-5 mb-2 font-sans border-b border-gray-100 pb-1">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-lg font-bold text-gray-900 mt-4 mb-2 font-sans">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('* ')) {
        return (
          <ul key={idx} className="list-disc pl-5 my-1.5 space-y-1 text-sm text-gray-700 font-sans">
            <li>{line.replace('* ', '')}</li>
          </ul>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-2"></div>;
      }
      return <p key={idx} className="text-sm sm:text-base text-gray-700 leading-relaxed my-2 font-sans">{line}</p>;
    });
  };

  return (
    <section className="py-12 bg-white font-sans" id="blog-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {activeArticle ? (
          /* ================= DETAIL VIEW ================= */
          <div className="max-w-3xl mx-auto animate-fadeIn" id={`blog-detail-${activeArticle.id}`}>
            {/* Back Button */}
            <button
              id="btn-back-to-blog"
              onClick={() => setSelectedArticleId(null)}
              className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl mb-6 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Daftar Artikel</span>
            </button>

            {/* Categorization & Title */}
            <div className="space-y-4 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 font-mono bg-emerald-50 px-2.5 py-1 rounded-md">
                {activeArticle.category}
              </span>
              
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-[1.2]">
                {activeArticle.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 border-y border-gray-100 py-3 font-mono">
                <div className="flex items-center space-x-1.5">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>Penulis: <strong>{activeArticle.author}</strong></span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{activeArticle.date}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              {/* Cover Image */}
              <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-gray-100 shadow-sm border border-gray-100">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Rendered Content */}
              <div className="prose max-w-none text-left py-4" id="blog-body-content">
                {renderMarkdown(activeArticle.content)}
              </div>

              {/* Tags Section */}
              <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-2 items-center text-left">
                <Tag className="h-4 w-4 text-gray-400 mr-1 shrink-0" />
                {activeArticle.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ================= LIST VIEW ================= */
          <div className="space-y-10 animate-fadeIn" id="blog-list-view">
            
            {/* Section heading + search bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-gray-100">
              <div className="text-left max-w-xl">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">
                  BLOG & INSIGHTS
                </span>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight mt-2">
                  Artikel Riset Pasar & Survei Konsumen
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Dapatkan kiat praktis mengevaluasi perilaku pasar, menyusun metodologi kuesioner profesional, dan mendobrak strategi pertumbuhan merek bisnis Anda.
                </p>
              </div>

              {/* Search input bar */}
              <div className="relative w-full md:max-w-xs shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="search-blog-input"
                  type="text"
                  placeholder="Cari topik artikel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Grid Articles */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 text-gray-400 space-y-2">
                <BookOpen className="h-10 w-10 mx-auto text-gray-300" />
                <p className="text-sm">Tidak menemukan artikel riset yang cocok dengan pencarian Anda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="blog-grid-posts">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    id={`blog-card-${post.id}`}
                    onClick={() => setSelectedArticleId(post.id)}
                    className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-gray-200 transition-all flex flex-col justify-between bg-white text-left group cursor-pointer"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="aspect-[16/10] overflow-hidden bg-gray-150 relative">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-2 left-2 bg-emerald-600 text-white text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold">
                          {post.category}
                        </span>
                      </div>

                      {/* Content Info */}
                      <div className="p-5 space-y-2.5">
                        <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-mono">
                          <span>{post.date}</span>
                          <span>&bull;</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA read */}
                    <div className="px-5 pb-5 pt-2 border-t border-gray-50 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                      <span>Mulai Membaca</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Special Highlight box */}
            <div className="bg-emerald-50 rounded-3xl p-6 sm:p-8 border border-emerald-100 flex flex-col md:flex-row justify-between items-center text-left gap-6 max-w-5xl mx-auto">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-emerald-950">Ingin Mempublikasikan Riset Kolaboratif Anda?</h3>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                  Kami mengundang akademisi, peneliti pasar independen, dan konsultan bisnis untuk menyebarkan ringkasan hasil riset berskala nasional yang kredibel di platform kami.
                </p>
              </div>
              <button
                id="btn-collaborative-cta"
                onClick={() => alert('Fitur kolaborasi masih dalam pengembangan. Silakan hubungi admin kami melalui surat elektronik resmi.')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-xl text-xs shrink-0 transition-colors cursor-pointer shadow-md shadow-emerald-200"
              >
                Kirim Draf Riset
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
