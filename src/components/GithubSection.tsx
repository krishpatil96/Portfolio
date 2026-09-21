import React, { useState, useEffect } from 'react';
import {
  Github,
  GitBranch,
  Star,
  ExternalLink,
  Code2,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { personalInfo, staticGithubRepos } from '../data/portfolio';

interface GithubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

export const GithubSection: React.FC = () => {
  const [repos, setRepos] = useState<any[]>(staticGithubRepos);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Attempt to fetch public repositories from GitHub API
    const fetchGithubData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://api.github.com/users/krishpatil96/repos?sort=updated&per_page=6');
        if (res.ok) {
          const data: GithubRepo[] = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const mapped = data.map((r) => ({
              name: r.name,
              description: r.description || 'Public repository maintained by Krish Patil.',
              language: r.language || 'Code',
              stars: r.stargazers_count,
              forks: r.forks_count,
              url: r.html_url,
            }));
            setRepos(mapped);
          }
        }
      } catch (err) {
        // Fallback to static repositories
        console.debug('GitHub API rate limit or network issue; using verified fallback data.');
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  return (
    <section id="github" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Open Source & Code Activity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            GitHub Activity & Repositories
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mt-2 text-center">
            Explore public source code repositories, open-source experiments, and version-controlled projects on GitHub.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-3" />
        </div>

        {/* GitHub Banner Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-white shadow-lg">
              <Github className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">krishpatil96</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-800">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                B.Tech CSE (AI & ML) • Pune • Algorithms, Python, AI/ML & Web
              </p>
            </div>
          </div>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            id="github-view-profile-btn"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-white shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>Visit GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, idx) => (
            <a
              key={idx}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    <Code2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate">{repo.name}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-slate-800/60">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {repo.language}
                </span>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-3 h-3 text-blue-400" />
                    {repo.forks}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
