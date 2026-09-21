import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  ExternalLink,
  Calendar,
  Building,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { certificationsData } from '../data/portfolio';

export const Certifications: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Cybersecurity',
    'Cloud & Systems',
    'AI & ML',
    'Full-Stack',
    'Programming',
  ];

  const filteredCerts =
    selectedCategory === 'All'
      ? certificationsData
      : certificationsData.filter((c) => c.category === selectedCategory);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Cybersecurity':
        return 'bg-rose-950/60 text-rose-300 border-rose-800/60';
      case 'Cloud & Systems':
        return 'bg-red-950/60 text-red-300 border-red-800/60';
      case 'AI & ML':
        return 'bg-purple-950/60 text-purple-300 border-purple-800/60';
      case 'Full-Stack':
        return 'bg-blue-950/60 text-blue-300 border-blue-800/60';
      case 'Programming':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Credentials & Accreditations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications & Training
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mt-2 text-center">
            Verified certifications across Cybersecurity, Linux Systems Administration, Artificial
            Intelligence, and Full-Stack Engineering.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mt-3" />
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 mr-2 font-mono">
            <Filter className="w-3.5 h-3.5" />
            <span>Track:</span>
          </div>
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? certificationsData.length
                : certificationsData.filter((c) => c.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25 font-semibold'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/20"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-semibold border ${getCategoryColor(
                      cert.category
                    )}`}
                  >
                    {cert.category}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{cert.status}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-2 leading-snug">
                  {cert.title}
                </h3>

                <div className="text-xs font-semibold text-cyan-400 mb-1 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 shrink-0" />
                  <span>{cert.issuer}</span>
                </div>

                <div className="text-xs text-slate-400 mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{cert.date}</span>
                </div>

                {cert.hoursOrScope && (
                  <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 mb-3">
                    {cert.hoursOrScope}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                {cert.credentialId ? (
                  <div className="truncate max-w-[180px] text-slate-400" title={`ID: ${cert.credentialId}`}>
                    ID: <span className="text-slate-300">{cert.credentialId}</span>
                  </div>
                ) : (
                  <span className="text-slate-500">Institution Issued</span>
                )}

                {cert.verificationUrl ? (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-500 text-[11px]">Official Certificate</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
