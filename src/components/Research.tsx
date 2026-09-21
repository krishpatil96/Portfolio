import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Search,
  Users,
  Compass,
  X,
  ExternalLink,
} from 'lucide-react';
import { researchInterestData, personalInfo } from '../data/portfolio';

export const Research: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-purple-400 text-xs font-mono uppercase tracking-wider mb-3">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Academic Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Research & Academic Interests
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mt-2 text-center">
            Theoretical study and prototype explorations in autonomous multi-agent reasoning, adaptive
            memory systems, and clinical explainability.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-3" />
        </div>

        {/* Featured Research Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-purple-500/20 bg-gradient-to-b from-purple-950/20 via-slate-900/60 to-slate-950/80 shadow-2xl relative overflow-hidden mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-900/40 text-purple-300 border border-purple-700/50 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>{researchInterestData.status}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
                {researchInterestData.title}
              </h3>

              <p className="text-sm font-mono text-cyan-400 mb-4">
                {researchInterestData.subtitle}
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {researchInterestData.description}
              </p>

              {/* Research Topics Tags */}
              <div className="flex flex-wrap gap-2">
                {researchInterestData.topics.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 border border-slate-700/80 text-purple-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                id="view-research-btn"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Research Scope</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={`mailto:${personalInfo.email}?subject=Research Collaboration Inquiry - Krish Patil`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-xs text-slate-300 hover:text-white bg-slate-800/70 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Discuss Opportunities</span>
              </a>
            </div>
          </div>
        </div>

        {/* Candid Research Transparency Note */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 flex items-center justify-between flex-wrap gap-2">
          <span>
            <strong className="text-slate-300">Status Notice:</strong> Currently in literature review
            and prototype experiment phase; actively seeking faculty/industry co-authorship.
          </span>
          <span className="font-mono text-cyan-400/80">3rd Year Undergraduate Research Track</span>
        </div>

        {/* Research Modal */}
        {modalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          >
            <div className="relative w-full max-w-2xl bg-[#0d1322] border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto my-auto text-left">
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close research modal"
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 pr-8">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-purple-950/80 text-purple-300 border border-purple-800">
                  Exploratory Roadmap
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">
                  {researchInterestData.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400 mt-1">
                  Target Domain: Multi-Agent Systems & Adaptive Context Memory
                </p>
              </div>

              <div className="space-y-5 text-sm text-slate-300">
                <p className="leading-relaxed">
                  My investigation targets the architectural bottlenecks in multi-agent orchestration,
                  specifically evaluating how autonomous agents coordinate tool execution, retain
                  episodic memory, and minimize error cascading across multi-turn reasoning workflows.
                </p>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Search className="w-4 h-4 text-purple-400" />
                    <span>Methodological Focus Areas:</span>
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {researchInterestData.methodologies.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200">
                  <strong className="block text-white mb-1">Collaboration Objectives:</strong>
                  {researchInterestData.exploratoryGoal}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={`mailto:${personalInfo.email}?subject=Research Paper Collaboration`}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  <span>Inquire for Co-Authored Studies</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
