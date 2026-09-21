import React from 'react';
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  CheckCircle2,
  Building,
} from 'lucide-react';
import { educationData } from '../data/portfolio';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-3" />
        </div>

        {/* Education Highlight Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/60 text-cyan-300 border border-cyan-700/50 mb-3">
                <Building className="w-3.5 h-3.5 text-cyan-400" />
                <span>{educationData.currentYear}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {educationData.degree}
              </h3>
              <p className="text-base font-semibold text-cyan-400 mt-1">
                Specialization: {educationData.specialization}
              </p>
              <div className="text-sm text-slate-300 mt-1">
                {educationData.school}, {educationData.institution}
              </div>
            </div>

            {/* GPA Callout Pill */}
            <div className="shrink-0 flex flex-col items-start md:items-end">
              <div className="px-5 py-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-left md:text-right">
                <span className="text-xs font-mono text-cyan-300 block uppercase tracking-wider">
                  Academic Performance
                </span>
                <span className="text-3xl font-black text-white tracking-tight">
                  {educationData.cgpa}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Consistent Distinction
                </span>
              </div>
            </div>
          </div>

          {/* Sub details: Location & Duration */}
          <div className="py-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300 border-b border-slate-800">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Duration: {educationData.duration}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>{educationData.location}</span>
            </span>
          </div>

          {/* Relevant Coursework */}
          <div className="mt-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Core Relevant Coursework</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {educationData.relevantCoursework.map((course, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 border border-slate-700/80 text-slate-200 hover:border-cyan-500/40 transition-colors"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* Academic Highlights */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Campus & Departmental Highlights</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {educationData.achievements.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
