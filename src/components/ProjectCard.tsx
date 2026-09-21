import React from 'react';
import {
  Github,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  Play,
  Layers,
} from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDemo: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDemo }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'AI/ML':
        return 'bg-purple-950/60 text-purple-300 border-purple-800/60';
      case 'Web Development':
        return 'bg-blue-950/60 text-blue-300 border-blue-800/60';
      case 'Data Science':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60';
      case 'DSA':
        return 'bg-amber-950/60 text-amber-300 border-amber-800/60';
      default:
        return 'bg-slate-800/80 text-slate-300 border-slate-700/60';
    }
  };

  return (
    <div
      id={`project-card-${project.id}`}
      className="glass-card rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1.5 shadow-lg shadow-black/20"
    >
      <div>
        {/* Card Header / Visual Accent Bar */}
        <div className="p-5 pb-0 flex items-center justify-between gap-2">
          <span
            className={`px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider font-semibold border ${getCategoryColor(
              project.category
            )}`}
          >
            {project.category}
          </span>

          {project.highlightBadge && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>{project.highlightBadge}</span>
            </span>
          )}
        </div>

        {/* Project Content */}
        <div className="p-5 pt-3">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
            {project.title}
          </h3>
          <p className="text-xs font-mono text-cyan-400/90 mb-3">
            {project.tagline}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Medical Disclaimer if applicable */}
          {project.disclaimer && (
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200/90 mb-4">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="italic leading-snug">{project.disclaimer}</p>
            </div>
          )}

          {/* Key Features Bullet List */}
          <div className="mb-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Key Highlights</span>
            </h4>
            <ul className="space-y-1.5">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Card Footer: Technologies & Action Buttons */}
      <div className="p-5 pt-0">
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-slate-800/60">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700/90 text-white border border-slate-700/80 transition-colors"
          >
            <Github className="w-4 h-4 text-slate-300" />
            <span>Source Code</span>
          </a>

          {project.hasInteractiveDemo ? (
            <button
              onClick={() => onOpenDemo(project)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Interactive Demo</span>
            </button>
          ) : (
            <button
              onClick={() => onOpenDemo(project)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Details</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
