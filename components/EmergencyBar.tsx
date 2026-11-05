'use client';

import React from 'react';
import { PhoneCall, ShieldAlert, ExternalLink, AlertTriangle } from 'lucide-react';

interface EmergencyBarProps {
  onOpenExplainer: () => void;
}

export function EmergencyBar({ onOpenExplainer }: EmergencyBarProps) {
  return (
    <div className="bg-gradient-to-r from-red-950 via-rose-900 to-red-950 border-b border-rose-700/50 text-white px-4 py-2 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
          </span>
          <div className="flex items-center gap-1.5 font-semibold text-rose-200">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>National Cyber Threat Advisory:</span>
          </div>
          <span className="text-rose-100 hidden md:inline">
            Indian Law Enforcement NEVER puts anyone under &quot;Digital Arrest&quot; via video calls.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenExplainer}
            className="flex items-center gap-1 text-amber-300 hover:text-amber-200 font-medium underline underline-offset-2 transition-colors cursor-pointer text-xs"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Digital Arrest Anatomy</span>
          </button>

          <div className="h-3 w-px bg-rose-700 hidden sm:block" />

          <a
            href="tel:1930"
            className="flex items-center gap-1.5 bg-rose-800 hover:bg-rose-700 text-white font-bold px-2.5 py-1 rounded shadow-sm transition-all border border-rose-600 cursor-pointer"
            title="Dial Indian National Cyber Crime Helpline"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-200 animate-bounce-slight" />
            <span>Helpline: 1930</span>
          </a>

          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1 text-rose-200 hover:text-white transition-colors text-xs"
          >
            <span>cybercrime.gov.in</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
