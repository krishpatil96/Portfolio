import React from 'react';
import {
  GraduationCap,
  BookOpen,
  FolderGit2,
  Trophy,
  Sparkles,
  Compass,
  CheckCircle2,
  Calendar,
  Building,
} from 'lucide-react';
import {
  personalInfo,
  quickStats,
  aboutInterests,
  aboutActivities,
} from '../data/portfolio';

export const About: React.FC = () => {
  const getStatIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-cyan-400" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-blue-400" />;
      case 'FolderGit2':
        return <FolderGit2 className="w-5 h-5 text-emerald-400" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Profile & Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-3" />
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {quickStats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <div className="p-2.5 w-fit rounded-xl bg-slate-800/70 border border-slate-700/60 mb-3 group-hover:scale-110 transition-transform">
                {getStatIcon(stat.iconName)}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-cyan-300 mt-0.5">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* Narrative & Interests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Narrative Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800/80">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">#</span> Academic & Engineering Foundation
              </h3>
              <p className="text-slate-300 text-base leading-relaxed mb-4">
                I am a third-year Computer Science Engineering student specializing in{' '}
                <strong className="text-white font-semibold">
                  Artificial Intelligence and Machine Learning
                </strong>{' '}
                at {personalInfo.college}, {personalInfo.university}. With a{' '}
                <span className="text-cyan-300 font-semibold">{personalInfo.cgpa} CGPA</span>, I pair deep theoretical
                rigor with hands-on systems implementation.
              </p>
              <p className="text-slate-300 text-base leading-relaxed mb-4">
                I enjoy building practical software solutions that seamlessly combine AI models,
                structured data analytics, and modern web architectures. My engineering philosophy
                centers on clean code, explainability in AI systems, and user-centric problem solving.
              </p>
              <p className="text-slate-300 text-base leading-relaxed">
                Beyond standard coursework, I actively engage as a technical trainer, hackathon
                competitor (including reaching the final round of HackACE 2026), and collaborative
                community contributor within university developer initiatives.
              </p>
            </div>

            {/* University Card */}
            <div className="rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-900/60 border border-slate-800/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/20 text-cyan-400">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                    Institution
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white">
                    {personalInfo.university}
                  </div>
                  <div className="text-xs text-slate-400">
                    {personalInfo.college} • {personalInfo.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-800/60 px-3.5 py-2 rounded-xl border border-slate-700/50 self-start sm:self-auto">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Class of 2027 (3rd Year)</span>
              </div>
            </div>
          </div>

          {/* Interests & Activities Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Core Interests */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800/80">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Core Fields of Interest</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {aboutInterests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/70 border border-slate-700/60 text-slate-200 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Engagements */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800/80">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-blue-400" />
                <span>Active Engagements</span>
              </h3>
              <ul className="space-y-2.5">
                {aboutActivities.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
