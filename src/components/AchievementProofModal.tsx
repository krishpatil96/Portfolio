import React, { useEffect, useState } from 'react';
import {
  X,
  Award,
  Calendar,
  Building,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileCheck,
  Camera,
  Layers,
} from 'lucide-react';
import { AchievementItem, ProofItem } from '../types/portfolio';

interface AchievementProofModalProps {
  achievement: AchievementItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementProofModal: React.FC<AchievementProofModalProps> = ({
  achievement,
  isOpen,
  onClose,
}) => {
  const [activeProofIndex, setActiveProofIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  // Reset proof index and error state whenever the opened achievement changes
  useEffect(() => {
    setActiveProofIndex(0);
    setImageError(false);
    setUseFallback(false);
  }, [achievement]);

  // Keyboard navigation & Esc support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && achievement?.proofs && achievement.proofs.length > 1) {
        setActiveProofIndex((prev) => (prev + 1) % achievement.proofs!.length);
        setImageError(false);
        setUseFallback(false);
      } else if (e.key === 'ArrowLeft' && achievement?.proofs && achievement.proofs.length > 1) {
        setActiveProofIndex(
          (prev) => (prev - 1 + achievement.proofs!.length) % achievement.proofs!.length
        );
        setImageError(false);
        setUseFallback(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, achievement, onClose]);

  if (!isOpen || !achievement) return null;

  // Resolve current active proof
  const proofsList: ProofItem[] =
    achievement.proofs && achievement.proofs.length > 0
      ? achievement.proofs
      : achievement.proofImage
      ? [
          {
            id: 'primary-proof',
            title: achievement.title,
            type: achievement.proofType === 'event-photo' ? 'event-photo' : 'certificate',
            imageUrl: achievement.proofImage,
            fallbackImageUrl: achievement.fallbackProofImage,
            caption: achievement.description,
            date: achievement.date,
            issuer: achievement.organization,
          },
        ]
      : [];

  const currentProof = proofsList[activeProofIndex] || proofsList[0];

  const handleNext = () => {
    if (proofsList.length <= 1) return;
    setActiveProofIndex((prev) => (prev + 1) % proofsList.length);
    setImageError(false);
    setUseFallback(false);
  };

  const handlePrev = () => {
    if (proofsList.length <= 1) return;
    setActiveProofIndex((prev) => (prev - 1 + proofsList.length) % proofsList.length);
    setImageError(false);
    setUseFallback(false);
  };

  const currentSrc =
    useFallback && currentProof?.fallbackImageUrl
      ? currentProof.fallbackImageUrl
      : currentProof?.imageUrl;

  const getProofTypeIcon = (type?: string) => {
    switch (type) {
      case 'event-photo':
        return <Camera className="w-3.5 h-3.5 text-amber-400" />;
      case 'achievement':
        return <Award className="w-3.5 h-3.5 text-cyan-400" />;
      default:
        return <FileCheck className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <div
      id="achievement-lightbox-backdrop"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 transition-all duration-300 animate-fadeIn"
      onClick={(e) => {
        // Close when clicking directly on the backdrop container
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="proof-modal-title"
    >
      <div
        id="achievement-lightbox-dialog"
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Lightbox Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5 min-w-0 pr-3">
            <span className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-amber-400 shrink-0">
              {getProofTypeIcon(currentProof?.type)}
            </span>
            <div className="truncate">
              <h2
                id="proof-modal-title"
                className="text-sm sm:text-base font-bold text-white truncate"
              >
                {achievement.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-400 truncate">
                <span className="flex items-center gap-1 text-cyan-400 shrink-0">
                  <Building className="w-3 h-3" />
                  {achievement.organization}
                </span>
                <span className="flex items-center gap-1 shrink-0">
                  <Calendar className="w-3 h-3" />
                  {achievement.date}
                </span>
                {achievement.badgeText && (
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-950/60 border border-amber-500/30 text-amber-300">
                    {achievement.badgeText}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Direct Open in New Tab if URL is available */}
            {currentSrc && (
              <a
                id="proof-open-newtab-btn"
                href={currentSrc}
                target="_blank"
                rel="noopener noreferrer"
                title="View original image in new tab"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </a>
            )}

            {/* Close Button */}
            <button
              id="proof-modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer"
              title="Close (Esc)"
              aria-label="Close proof viewer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Multi-Item Proof Tabs (e.g. Python Bootcamp with certificate + 2 photos) */}
        {proofsList.length > 1 && (
          <div className="px-4 sm:px-6 py-2 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-thin">
              <span className="text-[11px] font-mono text-slate-400 mr-1 flex items-center gap-1 shrink-0">
                <Layers className="w-3 h-3 text-cyan-400" />
                Proof Documents ({proofsList.length}):
              </span>
              {proofsList.map((proof, idx) => (
                <button
                  key={proof.id || idx}
                  onClick={() => {
                    setActiveProofIndex(idx);
                    setImageError(false);
                    setUseFallback(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeProofIndex === idx
                      ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 font-semibold shadow-sm'
                      : 'bg-slate-800/60 border border-slate-700/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {getProofTypeIcon(proof.type)}
                  <span>{proof.title}</span>
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-1 shrink-0 text-slate-400 text-xs font-mono">
              <span>{activeProofIndex + 1}</span>
              <span>/</span>
              <span>{proofsList.length}</span>
            </div>
          </div>
        )}

        {/* Lightbox Image Stage */}
        <div className="relative flex-1 bg-black/95 flex items-center justify-center min-h-[320px] max-h-[68vh] overflow-hidden p-3 sm:p-5">
          {/* Navigation Arrows for Multiple Proofs */}
          {proofsList.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 z-10 p-2 sm:p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shadow-lg backdrop-blur-sm transition-all cursor-pointer hover:scale-105"
                title="Previous proof (Left Arrow)"
                aria-label="Previous proof"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 z-10 p-2 sm:p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shadow-lg backdrop-blur-sm transition-all cursor-pointer hover:scale-105"
                title="Next proof (Right Arrow)"
                aria-label="Next proof"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Active Image or Dignified Fallback */}
          {currentSrc && !imageError ? (
            <img
              id="proof-modal-image"
              src={currentSrc}
              alt={currentProof?.title || achievement.title}
              className="max-h-[62vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-200 select-none"
              referrerPolicy="no-referrer"
              onError={() => {
                // If primary failed and fallback exists, try fallback
                if (!useFallback && currentProof?.fallbackImageUrl) {
                  setUseFallback(true);
                } else {
                  setImageError(true);
                }
              }}
            />
          ) : (
            <div className="w-full max-w-xl p-8 rounded-2xl bg-slate-900/90 border border-slate-800 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4">
                <FileCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {currentProof?.title || achievement.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-4 leading-relaxed">
                {currentProof?.caption || achievement.description}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 border border-slate-700 text-cyan-300">
                  {achievement.organization}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 border border-slate-700 text-slate-300">
                  {achievement.date}
                </span>
                {currentProof?.credentialId && (
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 border border-slate-700 text-amber-300">
                    ID: {currentProof.credentialId}
                  </span>
                )}
              </div>
              {currentProof?.verificationUrl && (
                <a
                  href={currentProof.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Verify Credential on Official Portal</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Lightbox Footer Info */}
        <div className="px-4 sm:px-6 py-3 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-semibold text-slate-200">
              {currentProof?.title || achievement.title}
            </span>
            {currentProof?.caption && (
              <>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 truncate max-w-md hidden md:inline">
                  {currentProof.caption}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {currentProof?.verificationUrl && (
              <a
                href={currentProof.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                <span>Verify Online</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <span className="text-[11px] font-mono text-slate-500">
              Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Esc</kbd> to
              close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
