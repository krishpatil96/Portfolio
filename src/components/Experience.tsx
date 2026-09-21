import React from 'react';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Trophy,
  Award,
  Terminal,
  ExternalLink,
} from 'lucide-react';
import { experienceTimeline } from '../data/portfolio';

export const Experience: React.FC = () => {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Hackathon':
        return 'bg-purple-950/60 text-purple-300 border-purple-800/60';
      case 'Leadership / Workshop':
        return 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60';
      case 'Campus Technical Event':
        return 'bg-blue-950/60 text-blue-300 border-blue-800/60';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Leadership & Hackathons</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience & Activities
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mt-2 text-center">
            Hands-on technical leadership, student bootcamp training, and competitive hackathon
            collaborations.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-3" />
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experienceTimeline.map((item, idx) => (
            <div key={item.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#0b0f19] border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>

              {/* Experience Card */}
              <div className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300">
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span
                    className={`px-3 py-1 rounded-md text-[11px] font-mono font-semibold border ${getTypeBadge(
                      item.type
                    )}`}
                  >
                    {item.type}
                  </span>

                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {item.period}
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.role}
                </h3>
                <div className="text-sm font-semibold text-cyan-400 mb-3">
                  {item.organization}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  {item.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Associated project or badge */}
                {item.associatedProject && (
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">
                      Associated Project: <strong className="text-white">{item.associatedProject}</strong>
                    </span>
                    <a
                      href="#projects"
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <span>View in Projects</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
