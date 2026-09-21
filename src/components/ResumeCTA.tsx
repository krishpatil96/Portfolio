import React from 'react';
import { FileDown, Eye, Mail, Sparkles, ArrowRight, Calendar } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

interface ResumeCTAProps {
  onOpenResumeModal: () => void;
}

export const ResumeCTA: React.FC<ResumeCTAProps> = ({ onOpenResumeModal }) => {
  return (
    <section id="resume-cta" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 relative">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-cyan-950/40 via-slate-900/90 to-blue-950/40 border border-cyan-500/30 shadow-2xl text-center">
          {/* Subtle Glow */}
          <div
            className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Available for 2026 Internships & Collaborations</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Interested in working together?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              I'm actively building my skills through projects, hackathons, research, and practical
              development experience. Let's discuss internship opportunities, hackathon partnerships,
              or engineering roles.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="#contact"
                id="cta-schedule-meeting-btn"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/25 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Meeting</span>
              </a>

              <button
                id="cta-preview-resume-btn"
                onClick={onOpenResumeModal}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Resume</span>
              </button>

              <button
                id="cta-download-resume-btn"
                onClick={onOpenResumeModal}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>Download Resume (PDF)</span>
              </button>

              <a
                href="#contact"
                id="cta-contact-btn"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
