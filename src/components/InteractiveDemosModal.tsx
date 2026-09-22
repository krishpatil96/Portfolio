import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Github,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface InteractiveDemosModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const InteractiveDemosModal: React.FC<InteractiveDemosModalProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl bg-[#0d1322] border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto my-auto text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Project Modal"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 uppercase">
              {project.category}
            </span>
            {project.highlightBadge && (
              <span className="text-[11px] font-medium text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full">
                {project.highlightBadge}
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {project.title}
          </h2>
          <p className="text-sm font-mono text-cyan-400 mt-1">
            {project.tagline}
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>

          {/* Interactive Demos based on project type */}
          {project.interactiveType === 'dsa-sorting' && <DsaSortingDemo />}
          {project.interactiveType === 'infix-postfix' && <InfixPostfixDemo />}
          {project.interactiveType === 'quiz' && <QuizGameDemo />}
          {project.interactiveType === 'chart-preview' && <ProgressTrackerDemo />}

          {/* Disclaimer if present */}
          {project.disclaimer && (
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3 text-xs text-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5">Clinical AI Disclaimer:</strong>
                {project.disclaimer}
              </div>
            </div>
          )}

          {/* Key Architectural Highlights */}
          <div className="bg-slate-900/70 rounded-xl p-5 border border-slate-800">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Project Implementation Features</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
              Technologies & Frameworks
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800 text-cyan-300 border border-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-white transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};

// 1. DSA Sarthi Live Sorting Demo
const DsaSortingDemo: React.FC = () => {
  const [array, setArray] = useState<number[]>([45, 18, 72, 33, 91, 54, 26, 68, 12, 80]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [algorithm, setAlgorithm] = useState<'bubble' | 'selection'>('bubble');

  const generateNewArray = () => {
    if (isSorting) return;
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 85) + 15);
    setArray(newArr);
    setActiveIndices([]);
  };

  const runBubbleSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        await new Promise((r) => setTimeout(r, 220));

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          await new Promise((r) => setTimeout(r, 220));
        }
      }
    }
    setActiveIndices([]);
    setIsSorting(false);
  };

  return (
    <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 font-mono">
          <Play className="w-3.5 h-3.5 fill-current" />
          DSA Sarthi Visualizer Engine (Live Simulation)
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={generateNewArray}
            disabled={isSorting}
            className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-50 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Shuffle</span>
          </button>
          <button
            onClick={runBubbleSort}
            disabled={isSorting}
            className="px-3 py-1 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white disabled:opacity-50 cursor-pointer"
          >
            {isSorting ? 'Sorting...' : 'Run Bubble Sort'}
          </button>
        </div>
      </div>

      {/* Array Bars Container */}
      <div className="h-40 flex items-end justify-center gap-2 bg-[#080d18] p-3 rounded-lg border border-slate-800">
        {array.map((val, idx) => {
          const isComparing = activeIndices.includes(idx);
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <span className="text-[10px] font-mono text-slate-400">{val}</span>
              <div
                style={{ height: `${val}%` }}
                className={`w-full rounded-t transition-all duration-200 ${
                  isComparing
                    ? 'bg-amber-400 shadow-md shadow-amber-500/50'
                    : 'bg-gradient-to-t from-cyan-600 to-blue-500'
                }`}
              />
              <span className="text-[9px] font-mono text-slate-500">[{idx}]</span>
            </div>
          );
        })}
      </div>
      <p className="text-[11px] text-slate-400 mt-2 text-center">
        Step-by-step element comparison illustrating algorithmic time complexity O(n²) in real-time.
      </p>
    </div>
  );
};

// 2. Infix to Postfix Step-by-Step Evaluator Demo
const InfixPostfixDemo: React.FC = () => {
  const [expression, setExpression] = useState('A + B * C');
  const [result, setResult] = useState('A B C * +');

  const precedence = (op: string) => {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    if (op === '^') return 3;
    return 0;
  };

  const convertInfixToPostfix = (exp: string) => {
    const stack: string[] = [];
    const output: string[] = [];
    const tokens = exp.replace(/\s+/g, '').split('');

    for (const token of tokens) {
      if (/[a-zA-Z0-9]/.test(token)) {
        output.push(token);
      } else if (token === '(') {
        stack.push(token);
      } else if (token === ')') {
        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
          output.push(stack.pop()!);
        }
        stack.pop();
      } else {
        while (
          stack.length > 0 &&
          precedence(stack[stack.length - 1]) >= precedence(token)
        ) {
          output.push(stack.pop()!);
        }
        stack.push(token);
      }
    }
    while (stack.length > 0) {
      output.push(stack.pop()!);
    }
    return output.join(' ');
  };

  const handleConvert = (inputStr: string) => {
    setExpression(inputStr);
    try {
      setResult(convertInfixToPostfix(inputStr));
    } catch {
      setResult('Invalid expression syntax');
    }
  };

  return (
    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-cyan-300 font-mono">
          Stack Demonstration: Infix → Postfix (Reverse Polish Notation)
        </span>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <input
          type="text"
          value={expression}
          onChange={(e) => handleConvert(e.target.value)}
          placeholder="e.g. (A + B) * C - D / E"
          className="flex-1 bg-slate-950 border border-slate-700 px-3 py-2 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
        />
        <div className="flex gap-2">
          {['(A+B)*C', 'A+B*C-D', 'K+L-M*N'].map((preset) => (
            <button
              key={preset}
              onClick={() => handleConvert(preset)}
              className="px-2 py-1 text-[11px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 cursor-pointer"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>
      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs flex items-center justify-between">
        <span className="text-slate-400">Postfix Output:</span>
        <span className="text-cyan-300 font-bold tracking-wider">{result}</span>
      </div>
    </div>
  );
};

// 3. Flask Quiz Game Demo
const QuizGameDemo: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const questions = [
    {
      q: 'Which data structure follows the LIFO (Last-In First-Out) principle?',
      opts: ['Queue', 'Stack', 'Linked List', 'Binary Tree'],
      ans: 1,
    },
    {
      q: 'What is the primary role of the Flask application object in Python?',
      opts: ['Database ORM', 'WSGI Application Instance', 'HTML Template Engine', 'CSS Minifier'],
      ans: 1,
    },
    {
      q: 'In Machine Learning, what technique prevents overfitting by penalizing complex weights?',
      opts: ['Regularization (L1/L2)', 'Clustering', 'One-Hot Encoding', 'Max-Pooling'],
      ans: 0,
    },
  ];

  const handleSelect = (idx: number) => {
    setSelectedOpt(idx);
  };

  const handleNext = () => {
    if (selectedOpt === questions[currentQ].ans) {
      setScore(score + 1);
    }
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOpt(null);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedOpt(null);
  };

  return (
    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
      <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
        <span className="text-cyan-300 font-bold">Interactive Quiz Engine (Flask JSON Spec)</span>
        <span>
          Question {currentQ + 1} of {questions.length}
        </span>
      </div>

      {!showResult ? (
        <div>
          <p className="text-sm font-semibold text-white mb-3">
            {questions[currentQ].q}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {questions[currentQ].opts.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`text-left p-2.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  selectedOpt === idx
                    ? 'bg-cyan-950/80 border-cyan-400 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {String.fromCharCode(65 + idx)}. {opt}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={selectedOpt === null}
            className="w-full py-2 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-white disabled:opacity-50 transition-colors cursor-pointer"
          >
            {currentQ === questions.length - 1 ? 'Submit Answers' : 'Next Question'}
          </button>
        </div>
      ) : (
        <div className="text-center py-4">
          <h5 className="text-base font-bold text-white mb-1">Quiz Completed!</h5>
          <p className="text-xs text-slate-300 mb-3">
            You scored <strong className="text-cyan-400">{score}</strong> out of{' '}
            {questions.length} (
            {Math.round((score / questions.length) * 100)}%)
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 cursor-pointer"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

// 4. Student Progress Tracker Analytics Demo
const ProgressTrackerDemo: React.FC = () => {
  const semesters = [
    { sem: 'Sem 1', gpa: 8.9, credits: 24 },
    { sem: 'Sem 2', gpa: 9.1, credits: 24 },
    { sem: 'Sem 3', gpa: 9.3, credits: 26 },
    { sem: 'Sem 4', gpa: 9.2, credits: 26 },
    { sem: 'Sem 5 (Current)', gpa: 9.4, credits: 22 },
  ];

  return (
    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
      <div className="flex items-center justify-between mb-3 text-xs font-mono text-cyan-300">
        <span className="flex items-center gap-1.5 font-bold">
          <TrendingUp className="w-4 h-4" /> Academic Progression Dashboard
        </span>
        <span className="text-slate-400">Cumulative: 9.3 CGPA</span>
      </div>

      <div className="space-y-2 mb-3">
        {semesters.map((s) => (
          <div key={s.sem} className="flex items-center gap-3 text-xs">
            <span className="w-28 text-slate-300 font-mono">{s.sem}</span>
            <div className="flex-1 bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
              <div
                style={{ width: `${(s.gpa / 10) * 100}%` }}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full"
              />
            </div>
            <span className="w-12 text-right font-bold text-white font-mono">
              {s.gpa} SGPA
            </span>
          </div>
        ))}
      </div>

      <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200 flex items-center justify-between">
        <span>Recommended Focus Pathways:</span>
        <span className="font-bold text-white">AI Research & Systems Engineering</span>
      </div>
    </div>
  );
};
