import React from 'react';
import {
  ArrowRight,
  FileDown,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  MapPin,
  GraduationCap,
  Terminal,
} from 'lucide-react';
import { personalInfo, heroCodeSnippets } from '../data/portfolio';
import portfolioPhoto from '../assets/portfolio.jpeg';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle Background Glow Elements */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[380px] h-[380px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Floating Animated Code Snippets in Background */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none hidden md:block"
        aria-hidden="true"
      >
        <div className="absolute top-36 left-[8%] px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 font-mono text-xs text-cyan-400/70 backdrop-blur-sm shadow-sm animate-pulse">
          <code>{heroCodeSnippets[0]}</code>
        </div>
        <div className="absolute top-48 right-[10%] px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 font-mono text-xs text-blue-400/70 backdrop-blur-sm shadow-sm">
          <code>{heroCodeSnippets[1]}</code>
        </div>
        <div className="absolute bottom-32 left-[12%] px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 font-mono text-xs text-emerald-400/70 backdrop-blur-sm shadow-sm">
          <code>{heroCodeSnippets[2]}</code>
        </div>
        <div className="absolute bottom-28 right-[14%] px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 font-mono text-xs text-violet-400/70 backdrop-blur-sm shadow-sm">
          <code>{heroCodeSnippets[3]}</code>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        {/* Profile Avatar with Subtle Tech Glow */}
        <div
          id="hero-profile-avatar-container"
          className="relative mb-6 select-none"
        >
          {/* Glowing Gradient Border Container */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full p-[3px] bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all duration-300">
            {/* Inner Dark Rim & Ring */}
            <div className="w-full h-full rounded-full bg-[#0b0f19] p-[2px] flex items-center justify-center overflow-hidden relative ring-1 ring-cyan-400/30">
              {/* Selected Target Element: Fixed Circular Profile Container */}
              <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-950">
                <img
                  id="hero-profile-img"
                  src={portfolioPhoto}
                  alt={`${personalInfo.name} - Profile Photo`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover object-[52%_22%]"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + '/portfolio.jpeg') {
                      target.src = '/portfolio.jpeg';
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Decorative Tech Sparkle Accent Badge */}
          <div
            className="absolute -bottom-1 -right-1 bg-slate-900/95 border border-cyan-500/50 rounded-full p-2 shadow-lg shadow-cyan-950/80 pointer-events-none"
            aria-hidden="true"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
        </div>

        {/* Main Heading */}
        <h1
          id="hero-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight"
        >
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
            {personalInfo.name}
          </span>
        </h1>

        {/* Subtitle */}
        <h2
          id="hero-subtitle"
          className="text-lg sm:text-xl md:text-2xl font-medium text-slate-200 mb-6 max-w-3xl leading-relaxed"
        >
          {personalInfo.title}
        </h2>

        {/* Short Introduction */}
        <p
          id="hero-intro"
          className="text-base sm:text-lg text-slate-300/90 max-w-2xl mb-8 leading-relaxed font-normal"
        >
          {personalInfo.bio}
        </p>

        {/* University & Location Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-300 mb-9 font-medium">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/70 border border-slate-800">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>{personalInfo.university} (SOET)</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/70 border border-slate-800">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span>CGPA: {personalInfo.cgpa} ({personalInfo.currentYear})</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/70 border border-slate-800">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>{personalInfo.location}</span>
          </span>
        </div>

        {/* Call To Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          <a
            href="#projects"
            id="hero-view-projects-btn"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          >
            <span>View My Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            id="hero-download-resume-btn"
            onClick={onOpenResumeModal}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700/80 shadow-md transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <FileDown className="w-4 h-4 text-cyan-400" />
            <span>Download Resume</span>
          </button>

          <a
            href="#contact"
            id="hero-lets-connect-btn"
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white hover:bg-slate-800/40 border border-transparent hover:border-slate-800 transition-all duration-200"
          >
            <Mail className="w-4 h-4 text-slate-400" />
            <span>Let's Connect</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Profiles
          </span>
          <div className="h-4 w-px bg-slate-800" />

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-social-github"
            aria-label="Krish Patil GitHub Profile"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all shadow-sm"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-social-linkedin"
            aria-label="Krish Patil LinkedIn Profile (Configurable)"
            title="LinkedIn profile URL (Editable in src/data/portfolio.ts)"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 text-slate-300 hover:text-white transition-all shadow-sm relative group"
          >
            <Linkedin className="w-5 h-5 text-blue-400" />
          </a>

          <a
            href={`mailto:${personalInfo.email}`}
            id="hero-social-email"
            aria-label="Email Krish Patil"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all shadow-sm"
          >
            <Mail className="w-5 h-5 text-cyan-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
