import React from 'react';
import {
  X,
  FileDown,
  Printer,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Github,
  CheckCircle2,
} from 'lucide-react';
import {
  personalInfo,
  educationData,
  skillCategories,
  projectsData,
  experienceTimeline,
  certificationsData,
} from '../data/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate a downloadable text/markdown or trigger file download
    const link = document.createElement('a');
    link.href = personalInfo.resumeUrl;
    link.download = 'Krish_Patil_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto my-auto text-left">
        {/* Modal Controls Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 no-print">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800">
              ATS-Optimized Resume Preview
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              (Updated 2026)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save as PDF</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-white shadow-sm cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close resume preview"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Canvas */}
        <div
          id="printable-resume-content"
          className="bg-[#0b0f19] p-6 sm:p-10 rounded-xl border border-slate-800 text-slate-200 font-sans space-y-6 print:bg-white print:text-black print:p-0 print:border-none"
        >
          {/* Header */}
          <div className="text-center pb-4 border-b border-slate-800 print:border-slate-300">
            <h1 className="text-3xl font-extrabold text-white tracking-tight print:text-black">
              {personalInfo.fullName}
            </h1>
            <p className="text-sm font-semibold text-cyan-400 mt-1 print:text-slate-800">
              {personalInfo.degree} (Specialization: {personalInfo.specialization})
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 mt-2 font-mono print:text-slate-700">
              <span>{personalInfo.location}</span>
              <span>•</span>
              <a href={`mailto:${personalInfo.email}`} className="text-cyan-400 underline">
                {personalInfo.email}
              </a>
              <span>•</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">
                github.com/krishpatil96
              </a>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 pb-1 border-b border-slate-800 mb-3 print:text-slate-900 print:border-slate-300">
              Education
            </h2>
            <div className="flex justify-between items-start text-xs sm:text-sm">
              <div>
                <strong className="font-bold text-white print:text-black">
                  {educationData.institution} — {educationData.school}
                </strong>
                <p className="text-slate-300 print:text-slate-700">
                  {educationData.degree} in {educationData.specialization}
                </p>
                <p className="text-xs text-slate-400 print:text-slate-600">
                  Coursework: Data Structures, Artificial Intelligence, Machine Learning, DBMS, OS, Networks
                </p>
              </div>
              <div className="text-right text-xs">
                <span className="font-bold text-cyan-400 print:text-slate-900">
                  CGPA: {educationData.cgpa}
                </span>
                <p className="text-slate-400 print:text-slate-600">2023 – 2027</p>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 pb-1 border-b border-slate-800 mb-3 print:text-slate-900 print:border-slate-300">
              Technical Skills
            </h2>
            <div className="space-y-1.5 text-xs">
              {skillCategories.map((c) => (
                <div key={c.title} className="flex">
                  <span className="w-36 sm:w-44 font-semibold text-slate-300 shrink-0 print:text-black">
                    {c.title}:
                  </span>
                  <span className="text-slate-400 print:text-slate-800">
                    {c.skills.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 pb-1 border-b border-slate-800 mb-3 print:text-slate-900 print:border-slate-300">
              Selected Projects
            </h2>
            <div className="space-y-4">
              {projectsData.slice(0, 4).map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex justify-between font-bold text-white print:text-black mb-1">
                    <span>
                      {proj.title} <span className="font-normal text-slate-400">| {proj.technologies.join(', ')}</span>
                    </span>
                    <span className="font-mono text-cyan-400 print:text-slate-700">{proj.category}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-300 print:text-slate-700">
                    {proj.features.slice(0, 3).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership & Activities */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 pb-1 border-b border-slate-800 mb-3 print:text-slate-900 print:border-slate-300">
              Leadership & Experience
            </h2>
            <div className="space-y-3">
              {experienceTimeline.slice(0, 3).map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between font-bold text-white print:text-black">
                    <span>
                      {exp.role} — <span className="font-normal text-cyan-300 print:text-slate-800">{exp.organization}</span>
                    </span>
                    <span className="font-mono text-slate-400 print:text-slate-600">{exp.period}</span>
                  </div>
                  <p className="text-slate-300 print:text-slate-700 mt-0.5">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Highlights */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 pb-1 border-b border-slate-800 mb-3 print:text-slate-900 print:border-slate-300">
              Verified Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {certificationsData.slice(0, 4).map((c) => (
                <div key={c.id} className="flex items-start gap-1.5 text-slate-300 print:text-slate-800">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>{c.title}</strong> — {c.issuer} ({c.date})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="mt-6 flex justify-end gap-3 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-white transition-colors cursor-pointer"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};
