'use client';

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Check,
  AlertTriangle,
  Download,
  Share2,
  Calendar,
  Smartphone,
  ExternalLink,
  Users
} from 'lucide-react';

interface WeeklyDigestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WeeklyDigestModal({ isOpen, onClose }: WeeklyDigestModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyDigest = () => {
    const digestText = `🛡️ *CyberRaksha Weekly Citizen Safety Digest #48* 🛡️\n` +
      `Date: Sunday, November 2026\n\n` +
      `🔥 *Modus Operandi of the Week:* Digital Arrest via WhatsApp Video Calls\n` +
      `- Scammers impersonate Mumbai/Delhi Police & Customs.\n` +
      `- They claim illegal drugs were found in a FedEx/DHL parcel in your name.\n` +
      `- FACT: Digital Arrest DOES NOT EXIST in Indian Law.\n\n` +
      `🚫 *5 Newly Blacklisted Predatory APKs:*\n` +
      `1. InstantLoan-Approval-v2.apk\n` +
      `2. PM-Kisan-DirectCredit.apk\n` +
      `3. Electricity-Bill-Support.apk\n` +
      `4. QuickCash-5min-Disburse.apk\n` +
      `5. WhatsApp-Gold-Premium.apk\n\n` +
      `💡 *Golden Rule for Elders:*\n` +
      `Never pay any bail, penalty, or verification fee over UPI. Dial 1930 immediately!`;

    navigator.clipboard.writeText(digestText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#0c1317] border border-[#222e35] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#111b21] border-b border-[#222e35] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Citizen Weekly Safety Digest</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-700/50 font-bold">
                  ISSUE #48
                </span>
              </h3>
              <p className="text-xs text-[#8696a0]">
                Proactive community intelligence sent to 450,000+ Indian families
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

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          {/* Top banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-teal-950/40 to-[#111b21] border border-emerald-800/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-sm">Every Sunday Morning Protection</h4>
                <p className="text-xs text-emerald-200 mt-0.5">
                  Summarizes the latest cyber syndicates operating across WhatsApp, Telegram, and SMS.
                </p>
              </div>
            </div>
            <button
              onClick={handleCopyDigest}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Forward to WhatsApp'}</span>
            </button>
          </div>

          {/* Section 1: Top Modus Operandi */}
          <div className="bg-[#111b21] border border-rose-900/40 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>1. Modus Operandi of the Week: Digital Arrest Extortion</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-xs">
              Syndicates pose as Crime Branch or CBI officials over WhatsApp video calls. They show forged Supreme Court warrants,
              fake police uniforms, and claim an international courier with illegal narcotics or contraband has been detected
              under your Aadhaar. They coerce victims into staying on video for hours and transferring lakhs to &quot;RBI escrow accounts&quot;.
            </p>
            <div className="p-2.5 rounded-xl bg-rose-950/50 border border-rose-800/40 text-rose-200 text-xs font-semibold">
              ⚠️ FACT: No police force or court in India has the legal authority to arrest anyone via video call or demand money online.
            </div>
          </div>

          {/* Section 2: Top Flagged APKs */}
          <div className="bg-[#111b21] border border-amber-900/40 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
              <Smartphone className="w-4 h-4" />
              <span>2. New Blacklisted Malicious APKs This Week</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-[#182229] border border-[#222e35] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white">InstantLoan-Approval-v2.apk</span>
                  <p className="text-[11px] text-[#8696a0]">Steals contact list &amp; SMS OTPs</p>
                </div>
                <span className="text-[10px] text-rose-400 font-bold bg-rose-950 px-1.5 py-0.5 rounded">
                  Trojan
                </span>
              </div>

              <div className="p-2 rounded-lg bg-[#182229] border border-[#222e35] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white">Electricity-Bill-Update.apk</span>
                  <p className="text-[11px] text-[#8696a0]">Remote access screen recorder</p>
                </div>
                <span className="text-[10px] text-rose-400 font-bold bg-rose-950 px-1.5 py-0.5 rounded">
                  Spyware
                </span>
              </div>

              <div className="p-2 rounded-lg bg-[#182229] border border-[#222e35] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white">PM-Kisan-DirectCredit.apk</span>
                  <p className="text-[11px] text-[#8696a0]">Banking credential phishing</p>
                </div>
                <span className="text-[10px] text-rose-400 font-bold bg-rose-950 px-1.5 py-0.5 rounded">
                  Phishing
                </span>
              </div>

              <div className="p-2 rounded-lg bg-[#182229] border border-[#222e35] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white">WhatsApp-Gold-Plus.apk</span>
                  <p className="text-[11px] text-[#8696a0]">Exfiltrates private chat databases</p>
                </div>
                <span className="text-[10px] text-rose-400 font-bold bg-rose-950 px-1.5 py-0.5 rounded">
                  Backdoor
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Senior Citizen Checklist */}
          <div className="bg-[#111b21] border border-emerald-900/40 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
              <Users className="w-4 h-4" />
              <span>3. Senior Citizen &amp; Family Protection Checklist</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
              <li>Advise parents to disconnect any WhatsApp video call showing people in police uniforms.</li>
              <li>Turn off &quot;Install Unknown Apps&quot; in Android Settings &gt; Security.</li>
              <li>Remember that banks NEVER ask you to click links to update KYC (RBI mandatory guideline).</li>
              <li>Save National Cyber Crime Helpline number: <strong>1930</strong> on speed dial.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#111b21] border-t border-[#222e35] flex items-center justify-between text-xs">
          <span className="text-[#8696a0]">Published by CyberRaksha Awareness Collective</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#202c33] hover:bg-[#2a3942] text-white rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

