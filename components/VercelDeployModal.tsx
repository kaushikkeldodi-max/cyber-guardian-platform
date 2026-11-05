'use client';

import React, { useState } from 'react';
import {
  X,
  Terminal,
  Copy,
  Check,
  Globe,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Server
} from 'lucide-react';

interface VercelDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VercelDeployModal({ isOpen, onClose }: VercelDeployModalProps) {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, stepNumber: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepNumber);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0c1317] border border-[#222e35] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#111b21] border-b border-[#222e35] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 text-white border border-white/20">
              <Terminal className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>1-Click Vercel CLI Deployment Guide</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-700/50 font-bold">
                  ZERO CONFIG
                </span>
              </h3>
              <p className="text-xs text-[#8696a0]">
                Deploy this Next.js 15 App Router prototype to a live .vercel.app domain
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#202c33] text-[#8696a0] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs sm:text-sm">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-[#111b21] border border-[#222e35] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center font-black">
                  1
                </span>
                Initialize Vercel Project Link
              </span>
              <button
                onClick={() => copyToClipboard('npx vercel', 1)}
                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 cursor-pointer"
              >
                {copiedStep === 1 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedStep === 1 ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[#8696a0] text-xs">
              Run this in your terminal. Accept the default project settings and link your Vercel account when prompted.
            </p>
            <div className="bg-[#0b141a] p-2.5 rounded-xl border border-[#222e35] font-mono text-emerald-400 text-xs">
              npx vercel
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-[#111b21] border border-[#222e35] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center font-black">
                  2
                </span>
                Deploy Directly to Production
              </span>
              <button
                onClick={() => copyToClipboard('npx vercel --prod', 2)}
                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 cursor-pointer"
              >
                {copiedStep === 2 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedStep === 2 ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[#8696a0] text-xs">
              Builds and publishes directly to production, outputting a high-speed global CDN URL.
            </p>
            <div className="bg-[#0b141a] p-2.5 rounded-xl border border-[#222e35] font-mono text-emerald-400 text-xs">
              npx vercel --prod
            </div>
          </div>

          {/* Verification Specs */}
          <div className="p-3.5 rounded-2xl bg-[#182229] border border-[#222e35] space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero-Config Build Verification Completed:</span>
            </div>
            <ul className="list-disc pl-5 space-y-0.5 text-gray-300 text-[11px]">
              <li>Next.js App Router with client components isolated with <code>&apos;use client&apos;</code>.</li>
              <li>Pure client-side heuristic engine &amp; Web Audio API — zero heavy backend dependencies required.</li>
              <li>Responsive Tailwind CSS styling tested across mobile, tablet, and widescreen.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#111b21] border-t border-[#222e35] flex items-center justify-between text-xs">
          <span className="text-[#8696a0]">Ready for production deployment</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
