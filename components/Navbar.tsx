'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Terminal, 
  Share2,
  Info
} from 'lucide-react';
import { sounds } from '@/utils/audioEffects';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  waTheme: 'dark' | 'light';
  onToggleWaTheme: () => void;
  onOpenDeployModal: () => void;
  onOpenExplainer: () => void;
}

export function Navbar({
  soundEnabled,
  onToggleSound,
  waTheme,
  onToggleWaTheme,
  onOpenDeployModal,
  onOpenExplainer,
}: NavbarProps) {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="bg-[#111b21] border-b border-[#222e35] sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-950/40 border border-emerald-400/30">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#111b21]"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>CyberRaksha Guardian</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                  AI Defense
                </span>
              </h1>
            </div>
            <p className="text-xs text-[#8696a0] hidden sm:block">
              AI WhatsApp Guardian &amp; Community Scam Defense
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Audio sound toggle */}
          <button
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) {
                sounds.playReply();
              }
            }}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-[#202c33] border-[#2a3942] text-emerald-400 hover:bg-[#2a3942]'
                : 'bg-[#182229] border-[#222e35] text-[#8696a0] hover:text-white'
            }`}
            title={soundEnabled ? 'Audio Effects On (Click to Mute)' : 'Audio Effects Muted (Click to Enable)'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden md:inline">{soundEnabled ? 'Audio On' : 'Muted'}</span>
          </button>

          {/* WhatsApp Simulator Theme Switch */}
          <button
            onClick={onToggleWaTheme}
            className="p-2 rounded-lg bg-[#202c33] border border-[#2a3942] text-[#8696a0] hover:text-white hover:bg-[#2a3942] transition-colors cursor-pointer text-xs flex items-center gap-1.5"
            title={`Switch WhatsApp view to ${waTheme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {waTheme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden lg:inline text-gray-300">WA Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-400" />
                <span className="hidden lg:inline text-gray-300">WA Dark</span>
              </>
            )}
          </button>

          {/* Educational Explainer */}
          <button
            onClick={onOpenExplainer}
            className="p-2 rounded-lg bg-[#202c33] border border-[#2a3942] text-amber-400 hover:bg-[#2a3942] transition-colors cursor-pointer text-xs hidden sm:flex items-center gap-1.5"
            title="Learn about Digital Arrest Scams & Fake APKs"
          >
            <Info className="w-4 h-4" />
            <span className="hidden xl:inline text-gray-300">Fraud Guide</span>
          </button>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-[#202c33] border border-[#2a3942] text-[#8696a0] hover:text-white hover:bg-[#2a3942] transition-colors cursor-pointer text-xs flex items-center gap-1.5"
            title="Share platform link"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden md:inline">{copied ? 'Copied!' : 'Share'}</span>
          </button>

          {/* Vercel CLI Deploy instructions button */}
          <button
            onClick={onOpenDeployModal}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950 transition-all cursor-pointer border border-emerald-400/30"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Vercel Deploy</span>
          </button>
        </div>
      </div>
    </header>
  );
}

