'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { EmergencyBar } from '@/components/EmergencyBar';
import { WhatsAppSimulator } from '@/components/WhatsAppSimulator';
import { ThreatRadar } from '@/components/ThreatRadar';
import { InCallAudioModal } from '@/components/InCallAudioModal';
import { WeeklyDigestModal } from '@/components/WeeklyDigestModal';
import { DigitalArrestExplainerModal } from '@/components/DigitalArrestExplainerModal';
import { VercelDeployModal } from '@/components/VercelDeployModal';
import { RadarMetrics, ThreatTrendItem, Verdict } from '@/types';
import { INITIAL_TREND_ITEMS } from '@/data/scamDatabase';
import { sounds } from '@/utils/audioEffects';
import { ShieldAlert, MessageSquare, Radio, CheckCircle, Terminal } from 'lucide-react';

export default function Home() {
  // Theme and Audio State
  const [waTheme, setWaTheme] = useState<'dark' | 'light'>('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Active view tab on mobile/small screens
  const [mobileTab, setMobileTab] = useState<'simulator' | 'radar'>('simulator');

  // Modal states
  const [inCallModalOpen, setInCallModalOpen] = useState(false);
  const [digestModalOpen, setDigestModalOpen] = useState(false);
  const [explainerModalOpen, setExplainerModalOpen] = useState(false);
  const [deployModalOpen, setDeployModalOpen] = useState(false);

  // Live Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live Metrics state
  const [metrics, setMetrics] = useState<RadarMetrics>({
    inspectedToday: 14892,
    digitalArrestIntercepted: 3140,
    apksFlagged: 1829,
    phishingDomainsBlacklisted: 6423,
    citizenReports: 890,
  });

  // Community Threat Trend Stream
  const [trendItems, setTrendItems] = useState<ThreatTrendItem[]>(INITIAL_TREND_ITEMS);

  // Incoming test snippet to be analyzed in the WhatsApp simulator
  const [incomingTestSnippet, setIncomingTestSnippet] = useState<{ text: string; id: number } | null>(null);

  // Background heartbeat incrementing metrics realistically
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        inspectedToday: prev.inspectedToday + Math.floor(Math.random() * 2) + 1,
      }));
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    sounds.enabled = nextVal;
  };

  const handleToggleWaTheme = () => {
    setWaTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Called when user clicks "Report to Community Radar" inside WhatsApp simulator
  const handleReportThreatToRadar = (verdict: Verdict, snippet: string) => {
    // 1. Increment metrics
    setMetrics((prev) => {
      const isDigitalArrest = verdict.category === 'Digital Arrest Extortion';
      const isApk = verdict.category === 'Malicious Side-loaded APK';
      const isPhishing = verdict.category === 'Phishing & KYC Harvester';

      return {
        inspectedToday: prev.inspectedToday + 1,
        digitalArrestIntercepted: isDigitalArrest ? prev.digitalArrestIntercepted + 1 : prev.digitalArrestIntercepted,
        apksFlagged: isApk ? prev.apksFlagged + 1 : prev.apksFlagged,
        phishingDomainsBlacklisted: isPhishing ? prev.phishingDomainsBlacklisted + 1 : prev.phishingDomainsBlacklisted,
        citizenReports: prev.citizenReports + 1,
      };
    });

    // 2. Add to live trend items at top
    const newTrend: ThreatTrendItem = {
      id: `report-${Date.now()}`,
      title: `Citizen Reported: ${verdict.category} Signature`,
      category: 
        verdict.category === 'Digital Arrest Extortion' ? 'Digital Arrest' :
        verdict.category === 'Malicious Side-loaded APK' ? 'Malicious APK' : 'Phishing',
      risk: verdict.risk,
      targetSector: 'Active Community Submission',
      sampleSnippet: snippet.slice(0, 110) + '...',
      spikeRegion: 'Your Local Region',
      spikePercentage: Math.floor(Math.random() * 25) + 30,
      timeAgo: 'Just now',
      reportsCount: 1,
      presetText: snippet,
    };

    setTrendItems((prev) => [newTrend, ...prev]);

    // 3. Show confirmation toast
    setToastMessage(`🛡️ Threat reported! Anonymized signature added to Community Threat Radar.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Click on "Test in Simulator" from right column
  const handleSelectTrendPreset = (snippet: string) => {
    setIncomingTestSnippet({ text: snippet, id: Date.now() });
    setMobileTab('simulator');
    // Scroll smoothly to simulator on mobile
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Show confirmation toast
    setToastMessage('Scam loaded into WhatsApp simulator for inspection! 🛡️');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#0b141a] text-[#e9edef] flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* 1. TOP EMERGENCY BAR */}
      <EmergencyBar onOpenExplainer={() => setExplainerModalOpen(true)} />

      {/* 2. PRIMARY NAVBAR */}
      <Navbar
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        waTheme={waTheme}
        onToggleWaTheme={handleToggleWaTheme}
        onOpenDeployModal={() => setDeployModalOpen(true)}
        onOpenExplainer={() => setExplainerModalOpen(true)}
      />

      {/* 3. TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-950 border border-emerald-500/60 text-emerald-200 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 4. HERO CONTEXT BANNER */}
      <div className="border-b border-[#222e35] bg-gradient-to-b from-[#111b21] to-[#0b141a] px-4 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/40 uppercase tracking-wider">
                Active Threat Defense Architecture
              </span>
              <span className="text-xs text-[#8696a0] hidden sm:inline">•</span>
              <span className="text-xs text-[#8696a0] hidden sm:inline">
                Targeting Phishing, Digital Arrest Extortion &amp; Predatory APKs
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
              Real-Time Scam Detection &amp; Cyber Awareness Platform
            </h2>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setInCallModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900/60 border border-cyan-700/50 text-cyan-300 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>In-Call Warning Demo</span>
            </button>

            <button
              onClick={() => setDigestModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#202c33] hover:bg-[#2a3942] border border-[#2a3942] text-gray-200 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Weekly Digest #48</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. RESPONSIVE MOBILE VIEW SWITCHER TABS */}
      <div className="lg:hidden max-w-7xl mx-auto w-full px-4 pt-3">
        <div className="grid grid-cols-2 p-1 rounded-xl bg-[#111b21] border border-[#222e35]">
          <button
            onClick={() => setMobileTab('simulator')}
            className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'simulator'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-[#8696a0] hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Agent Simulator</span>
          </button>

          <button
            onClick={() => setMobileTab('radar')}
            className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'radar'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-[#8696a0] hover:text-white'
            }`}
          >
            <Radio className="w-4 h-4 text-rose-400" />
            <span>Community Threat Radar</span>
          </button>
        </div>
      </div>

      {/* 6. MAIN DUAL-COLUMN LAYOUT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: WhatsApp Web Agent Simulator (5 or 6 cols on lg) */}
        <section
          className={`lg:col-span-6 xl:col-span-5 flex flex-col ${
            mobileTab === 'simulator' ? 'block' : 'hidden lg:flex'
          }`}
        >
          <div className="mb-2 flex items-center justify-between text-xs text-[#8696a0] px-1">
            <span className="font-semibold text-gray-300 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              WhatsApp Web Guardian Engine
            </span>
            <span className="text-[11px]">Paste text, drag APK or pick presets</span>
          </div>

          <WhatsAppSimulator
            theme={waTheme}
            onReportThreatToRadar={handleReportThreatToRadar}
            onTriggerInCallDemo={() => setInCallModalOpen(true)}
            incomingTestSnippet={incomingTestSnippet}
          />
        </section>

        {/* RIGHT COLUMN: Community Live Threat Radar & Awareness Hub (7 cols on lg) */}
        <section
          className={`lg:col-span-6 xl:col-span-7 flex flex-col ${
            mobileTab === 'radar' ? 'block' : 'hidden lg:flex'
          }`}
        >
          <div className="mb-2 flex items-center justify-between text-xs text-[#8696a0] px-1">
            <span className="font-semibold text-gray-300 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-rose-400" />
              Live Citizen Intelligence Feed
            </span>
            <span className="text-[11px] text-emerald-400">Synchronized with I4C &amp; CERT-In</span>
          </div>

          <ThreatRadar
            metrics={metrics}
            trendItems={trendItems}
            onSelectTrendPreset={handleSelectTrendPreset}
            onOpenDigestModal={() => setDigestModalOpen(true)}
            onOpenInCallDemo={() => setInCallModalOpen(true)}
            onOpenExplainer={() => setExplainerModalOpen(true)}
          />
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer className="border-t border-[#222e35] bg-[#0c1317] py-6 px-4 text-xs text-[#8696a0]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-semibold text-gray-300">
              Cyber Security Awareness Platform: AI WhatsApp Guardian &amp; Community Scam Defense
            </p>
            <p className="mt-1 text-[11px]">
              Equipping citizens against Phishing, Digital Arrest Extortion, and Predatory APKs.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button
              onClick={() => setDeployModalOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Vercel CLI Deployment Guide</span>
            </button>
            <button
              onClick={() => setExplainerModalOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Digital Arrest Guide
            </button>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              cybercrime.gov.in
            </a>
          </div>
        </div>
      </footer>

      {/* 8. MODAL OVERLAYS */}
      <InCallAudioModal
        isOpen={inCallModalOpen}
        onClose={() => setInCallModalOpen(false)}
      />

      <WeeklyDigestModal
        isOpen={digestModalOpen}
        onClose={() => setDigestModalOpen(false)}
      />

      <DigitalArrestExplainerModal
        isOpen={explainerModalOpen}
        onClose={() => setExplainerModalOpen(false)}
      />

      <VercelDeployModal
        isOpen={deployModalOpen}
        onClose={() => setDeployModalOpen(false)}
      />
    </div>
  );
}

