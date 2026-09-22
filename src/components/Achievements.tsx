import React, { useState } from 'react';
import {
  Trophy,
  GraduationCap,
  Code2,
  Brain,
  Award,
  Sparkles,
  Calendar,
  Building,
  Eye,
} from 'lucide-react';
import { achievementsData } from '../data/portfolio';
import { AchievementItem } from '../types/portfolio';
import { AchievementProofModal } from './AchievementProofModal';

export const Achievements: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'trophy':
        return <Trophy className="w-6 h-6 text-amber-400" />;
      case 'academic':
        return <GraduationCap className="w-6 h-6 text-cyan-400" />;
      case 'code':
        return <Code2 className="w-6 h-6 text-blue-400" />;
      case 'python':
        return <Brain className="w-6 h-6 text-emerald-400" />;
      case 'quiz':
        return <Award className="w-6 h-6 text-purple-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-amber-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Achievements
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mt-2 text-center">
            Competitive hackathon recognitions, top academic performance, and official departmental
            leadership commendations.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-cyan-500 rounded-full mt-3" />
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {achievementsData.map((ach) => {
            const hasProof = Boolean(
              ach.proofButtonText || ach.proofImage || (ach.proofs && ach.proofs.length > 0)
            );

            return (
              <div
                key={ach.id}
                id={`achievement-card-${ach.id}`}
                className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/20"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700/60 group-hover:scale-110 transition-transform">
                      {getAchievementIcon(ach.iconType)}
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/40 border border-amber-500/30 text-amber-300">
                      {ach.badgeText}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-1.5">
                    {ach.title}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-400 mb-1 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 shrink-0" />
                    <span>{ach.organization}</span>
                  </div>
                  <div className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{ach.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between gap-2">
                  <div className="text-[11px] font-mono text-slate-400 truncate">
                    Event: <span className="text-slate-300">{ach.event}</span>
                  </div>

                  {hasProof && (
                    <button
                      id={`view-proof-btn-${ach.id}`}
                      type="button"
                      onClick={() => setSelectedAchievement(ach)}
                      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 hover:border-cyan-400 transition-all cursor-pointer active:scale-95 shadow-sm"
                      title={ach.proofButtonText || 'View Proof'}
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{ach.proofButtonText || 'View Proof'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Proof Lightbox Modal */}
      <AchievementProofModal
        achievement={selectedAchievement}
        isOpen={Boolean(selectedAchievement)}
        onClose={() => setSelectedAchievement(null)}
      />
    </section>
  );
};
