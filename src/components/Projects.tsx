import React, { useState } from 'react';
import { FolderGit2, Sparkles, Filter } from 'lucide-react';
import { projectsData } from '../data/portfolio';
import { ProjectItem, ProjectCategory } from '../types/portfolio';
import { ProjectCard } from './ProjectCard';
import { InteractiveDemosModal } from './InteractiveDemosModal';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories: ProjectCategory[] = [
    'All',
    'AI/ML',
    'Web Development',
    'Data Science',
    'DSA',
    'Other',
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? projectsData
      : projectsData.filter((proj) => {
          if (activeCategory === 'Other') {
            return proj.category === 'Other' || (proj.category !== 'AI/ML' && proj.category !== 'Web Development' && proj.category !== 'Data Science' && proj.category !== 'DSA');
          }
          return proj.category === activeCategory;
        });

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Projects
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mt-2 text-center">
            A portfolio of practical AI/ML models, algorithm visualizers, exploratory analytics
            dashboards, and full-stack web applications.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-3" />
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 mr-2 font-mono">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? projectsData.length
                : projectsData.filter((p) => {
                    if (cat === 'Other') return p.category === 'Other' || (p.category !== 'AI/ML' && p.category !== 'Web Development' && p.category !== 'Data Science' && p.category !== 'DSA');
                    return p.category === cat;
                  }).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25 font-semibold'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDemo={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

        {/* Interactive Modal for Demos and Details */}
        <InteractiveDemosModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
