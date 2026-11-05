'use client';

import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ShieldAlert,
  Flame,
  Radio,
  Download,
  BellRing,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileWarning,
  Eye,
  Check,
  Smartphone,
  PhoneCall,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { RadarMetrics, ThreatTrendItem } from '@/types';

interface ThreatRadarProps {
  metrics: RadarMetrics;
  trendItems: ThreatTrendItem[];
  onSelectTrendPreset: (snippet: string) => void;
  onOpenDigestModal: () => void;
  onOpenInCallDemo: () => void;
  onOpenExplainer: () => void;
}

export function ThreatRadar({
  metrics,
  trendItems,
  onSelectTrendPreset,
  onOpenDigestModal,
  onOpenInCallDemo,
  onOpenExplainer,
}: ThreatRadarProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

  const categories = ['All', 'Phishing', 'Digital Arrest', 'Malicious APK'];

  const filteredTrends = trendItems.filter((item) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Phishing') return item.category === 'Phishing';
    if (selectedFilter === 'Digital Arrest') return item.category === 'Digital Arrest';
    if (selectedFilter === 'Malicious APK') return item.category === 'Malicious APK';
    return true;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribedEmail.trim()) return;
    setSubscribedSuccess(true);
    setTimeout(() => {
      setSubscribedSuccess(false);
      setSubscribedEmail('');
    }, 4000);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* 1. LIVE COUNTER METRICS HUB */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Scams Inspected */}
        <div className="bg-[#111b21] border border-[#222e35] rounded-xl p-3.5 shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between text-[#8696a0] text-xs mb-1">
            <span className="font-medium">Total Inspected</span>
            <Activity className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-baseline gap-1">
            <span>{metrics.inspectedToday.toLocaleString()}</span>
            <span className="text-[10px] text-emerald-400 font-bold">today</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% activity</span>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Digital Arrest Intercepted */}
        <div className="bg-[#111b21] border border-red-950/60 rounded-xl p-3.5 shadow-lg relative overflow-hidden group hover:border-rose-500/50 transition-all">
          <div className="flex items-center justify-between text-[#8696a0] text-xs mb-1">
            <span className="font-medium">Digital Arrest</span>
            <ShieldAlert className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-rose-400 tracking-tight flex items-baseline gap-1">
            <span>{metrics.digitalArrestIntercepted.toLocaleString()}</span>
            <span className="text-[10px] text-rose-500 font-bold">halted</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-rose-400 font-medium">
            <Flame className="w-3 h-3 animate-pulse" />
            <span>High Severity vector</span>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Malicious APKs Flagged */}
        <div className="bg-[#111b21] border border-amber-950/60 rounded-xl p-3.5 shadow-lg relative overflow-hidden group hover:border-amber-500/50 transition-all">
          <div className="flex items-center justify-between text-[#8696a0] text-xs mb-1">
            <span className="font-medium">Trojan APKs</span>
            <FileWarning className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-300 tracking-tight flex items-baseline gap-1">
            <span>{metrics.apksFlagged.toLocaleString()}</span>
            <span className="text-[10px] text-amber-400 font-bold">blocked</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-400 font-medium">
            <Download className="w-3 h-3" />
            <span>Predatory Loan apps</span>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Phishing Domains Blacklisted */}
        <div className="bg-[#111b21] border border-[#222e35] rounded-xl p-3.5 shadow-lg relative overflow-hidden group hover:border-sky-500/40 transition-all">
          <div className="flex items-center justify-between text-[#8696a0] text-xs mb-1">
            <span className="font-medium">Phishing URLs</span>
            <AlertTriangle className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-sky-300 tracking-tight flex items-baseline gap-1">
            <span>{metrics.phishingDomainsBlacklisted.toLocaleString()}</span>
            <span className="text-[10px] text-sky-400 font-bold">domains</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-sky-400 font-medium">
            <Radio className="w-3 h-3 text-sky-400 animate-pulse" />
            <span>Blacklist shared to CERT-In</span>
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500/5 rounded-full blur-xl pointer-events-none" />
        </div>
      </div>

      {/* 2. SCAM TREND FEED ("Trending in Your Region") */}
      <div className="bg-[#111b21] border border-[#222e35] rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#222e35]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Flame className="w-5 h-5 animate-pulse text-rose-500" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Community Live Threat Radar</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-rose-950 text-rose-400 border border-rose-800/40 font-semibold animate-pulse">
                  LIVE STREAM
                </span>
              </h3>
              <p className="text-xs text-[#8696a0]">
                Real-time regional spikes reported across Indian cities
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedFilter === cat
                    ? 'bg-emerald-600 text-white font-bold shadow-md'
                    : 'bg-[#202c33] hover:bg-[#2a3942] text-[#8696a0] hover:text-white border border-[#2a3942]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Live Stream List */}
        <div className="mt-3 space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {filteredTrends.map((trend) => (
            <div
              key={trend.id}
              className="p-3 sm:p-3.5 rounded-xl bg-[#182229] hover:bg-[#202c33] border border-[#222e35] hover:border-[#2a3942] transition-all group flex flex-col gap-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      trend.risk === 'DANGEROUS'
                        ? 'bg-rose-950/80 text-rose-400 border border-rose-800/50'
                        : 'bg-amber-950/80 text-amber-400 border border-amber-800/50'
                    }`}
                  >
                    {trend.risk}
                  </span>

                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/30">
                    {trend.category}
                  </span>

                  <span className="text-[11px] text-[#8696a0]">{trend.timeAgo}</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-950/30 px-2 py-0.5 rounded border border-rose-900/40">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{trend.spikePercentage}%</span>
                </div>
              </div>

              {/* Title & snippet */}
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {trend.title}
                </h4>
                <p className="text-xs font-mono text-[#8696a0] mt-1 bg-[#111b21] p-1.5 rounded border border-[#222e35] truncate">
                  {trend.sampleSnippet}
                </p>
              </div>

              {/* Footer info: target sector & quick test button */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <div className="text-[11px] text-[#8696a0]">
                  Target: <strong className="text-gray-300">{trend.targetSector}</strong> •{' '}
                  <span className="text-emerald-400">{trend.spikeRegion}</span>
                </div>

                <button
                  onClick={() => onSelectTrendPreset(trend.presetText || trend.sampleSnippet || trend.title)}
                  className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer"
                  title="Load this real scam into the WhatsApp simulator"
                >
                  <span>Test in Simulator</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. ROADMAP SPOTLIGHT: REAL-TIME IN-CALL AUDIO WARNING ENGINE */}
      <div className="bg-gradient-to-br from-[#111b21] via-[#15232d] to-[#0c1317] border border-cyan-800/40 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <PhoneCall className="w-5 h-5 animate-bounce-slight" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-700/40">
                  Roadmap Spotlight 2026
                </span>
                <span className="text-[10px] text-amber-300 flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3" /> Patent-Pending Architecture
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                Real-Time In-Call Audio Warning Engine
              </h3>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#8696a0] leading-relaxed mb-3">
          On-device acoustic &amp; speech analysis model running during WhatsApp voice/video calls.
          Detects extortion speech patterns, fake police room ambiance, and illegal &quot;Digital Arrest&quot;
          interrogation scripts in 12 Indian languages without violating user privacy.
        </p>

        {/* Live Audio Visualizer Simulator */}
        <div className="bg-[#0b141a] p-3 rounded-xl border border-cyan-900/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 h-6">
            <span className="w-1 bg-cyan-400 rounded-full animate-wave-1" />
            <span className="w-1 bg-cyan-400 rounded-full animate-wave-2" />
            <span className="w-1 bg-cyan-400 rounded-full animate-wave-3" />
            <span className="w-1 bg-cyan-400 rounded-full animate-wave-4" />
            <span className="w-1 bg-cyan-400 rounded-full animate-wave-5" />
            <span className="w-1 bg-cyan-400 rounded-full animate-wave-2" />
            <span className="w-1 bg-cyan-400 rounded-full animate-wave-4" />
          </div>

          <div className="text-[11px] text-cyan-200 truncate">
            Edge DSP: <span className="text-gray-400">Zero Audio Uplinked (On-Device Inference)</span>
          </div>

          <button
            onClick={onOpenInCallDemo}
            className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <span>Simulate Live Call Alert</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. WEEKLY SAFETY DIGEST SIMULATOR CARD */}
      <div className="bg-[#111b21] border border-[#222e35] rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Proactive Weekly Safety Digest
              </h3>
              <p className="text-xs text-[#8696a0]">
                Delivered every Sunday to protect elderly parents &amp; communities
              </p>
            </div>
          </div>

          <button
            onClick={onOpenDigestModal}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Digest</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Digest Snippet Preview */}
        <div className="p-3 rounded-xl bg-[#182229] border border-[#222e35] space-y-2 mb-3 text-xs">
          <div className="flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
            <span>Issue #48 • Indian Cyber Digest</span>
            <span>Sunday Morning Edition</span>
          </div>
          <div className="space-y-1.5 text-gray-300">
            <div className="flex items-start gap-1.5">
              <span className="text-rose-400 font-bold">•</span>
              <span>
                <strong>Modus Operandi of the Week:</strong> Digital arrest extortion via WhatsApp video calls
                posing as Mumbai Police &amp; Customs.
              </span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span>
                <strong>Senior Citizen Rule:</strong> No police officer can arrest you via Skype or ask for money online.
              </span>
            </div>
          </div>
        </div>

        {/* Subscribe Simulation Form */}
        <form onSubmit={handleSubscribe} className="flex gap-2">
          <input
            type="text"
            value={subscribedEmail}
            onChange={(e) => setSubscribedEmail(e.target.value)}
            placeholder="Enter WhatsApp Number or Email (e.g. +91 98765 43210)"
            className="flex-1 px-3 py-2 rounded-xl bg-[#202c33] border border-[#2a3942] text-xs text-white placeholder-[#8696a0] focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            {subscribedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Subscribed!</span>
              </>
            ) : (
              <span>Subscribe Free</span>
            )}
          </button>
        </form>
      </div>

      {/* 5. QUICK EXPLAINER TEASER ON DIGITAL ARREST */}
      <div className="p-3.5 rounded-xl bg-[#182229] border border-[#222e35] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <span className="text-gray-300">
            Need to educate family about <strong className="text-rose-300">&quot;Digital Arrest&quot;</strong> scams?
          </span>
        </div>
        <button
          onClick={onOpenExplainer}
          className="text-xs font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer"
        >
          Read Citizen Guide →
        </button>
      </div>
    </div>
  );
}

