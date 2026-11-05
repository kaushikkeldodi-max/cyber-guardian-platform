'use client';

import React from 'react';
import {
  X,
  ShieldAlert,
  Gavel,
  PhoneOff,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  FileText
} from 'lucide-react';

interface DigitalArrestExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DigitalArrestExplainerModal({
  isOpen,
  onClose,
}: DigitalArrestExplainerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#0c1317] border border-rose-800/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-red-950 via-[#111b21] to-[#111b21] border-b border-rose-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30">
              <ShieldAlert className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Citizen Advisory: Anatomy of &quot;Digital Arrest&quot; Fraud</span>
              </h3>
              <p className="text-xs text-rose-300">
                Official awareness guide based on Indian Cyber Crime Coordination Centre (I4C) alerts
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
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          {/* Legal Reality Highlight Box */}
          <div className="p-4 rounded-2xl bg-rose-950/60 border-2 border-rose-600/70 text-rose-100 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-black text-sm uppercase">
              <Gavel className="w-5 h-5" />
              <span>LEGAL FACT: &quot;DIGITAL ARREST&quot; DOES NOT EXIST IN INDIAN LAW</span>
            </div>
            <p className="leading-relaxed">
              Under the Indian Criminal Procedure Code (CrPC) and Bharatiya Nagarik Suraksha Sanhita (BNSS),
              <strong> no police agency, CBI, NIA, ED, or judge can legally arrest, detain, or interrogating any citizen via video calls</strong> (WhatsApp, Skype, Zoom, or Telegram).
              Any demand for money or online &quot;bail deposit&quot; is 100% cyber extortion.
            </p>
          </div>

          {/* The 4 Stages of Digital Arrest Scams */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>How Cyber Syndicates Execute The Scam:</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#111b21] border border-[#222e35] space-y-1">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                  Stage 1: The Fake Parcel Hook
                </span>
                <p className="font-semibold text-white">Customs / FedEx Delivery Alert</p>
                <p className="text-xs text-[#8696a0]">
                  Victim receives a call stating a parcel containing illegal narcotics (MDMA, passports, credit cards)
                  bound for Taiwan or Dubai has been seized at Mumbai Airport under their Aadhaar ID.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#111b21] border border-[#222e35] space-y-1">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                  Stage 2: Impersonation &amp; Stagecraft
                </span>
                <p className="font-semibold text-white">Fake Police Station Backdrop</p>
                <p className="text-xs text-[#8696a0]">
                  They transfer call to a WhatsApp video caller wearing a police uniform, sitting in front of a fake
                  police logo. They display forged Supreme Court arrest warrants with victim&apos;s name.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#111b21] border border-[#222e35] space-y-1">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                  Stage 3: Psychological Isolation
                </span>
                <p className="font-semibold text-white">&quot;You Are In Digital Custody&quot;</p>
                <p className="text-xs text-[#8696a0]">
                  Scammers order the victim not to disconnect the camera, leave the room, or speak with family members
                  under threat of instant physical police raid and public humiliation.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#111b21] border border-[#222e35] space-y-1">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                  Stage 4: Financial Drain
                </span>
                <p className="font-semibold text-white">&quot;RBI Verification Escrow Account&quot;</p>
                <p className="text-xs text-[#8696a0]">
                  Victim is coerced into liquidating mutual funds, FDs, and savings to transfer funds to a mule bank account
                  under the false promise of &quot;verifying clean money&quot; within 30 minutes.
                </p>
              </div>
            </div>
          </div>

          {/* Action Checklist */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-100 space-y-2">
            <h4 className="font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>What To Do If You Or A Family Member Receives This Call:</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-200">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">1.</span>
                <span><strong>Hang up immediately:</strong> Disconnect the call without arguing or panicking.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">2.</span>
                <span><strong>Block the caller:</strong> Mark the number as SPAM on WhatsApp and your dialer.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">3.</span>
                <span><strong>Dial 1930 immediately:</strong> The National Cybercrime Helpline will report the mule account and freeze any unauthorized outflows within the golden hour.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">4.</span>
                <span><strong>File a complaint:</strong> Submit screenshots and phone numbers at <strong>cybercrime.gov.in</strong>.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#111b21] border-t border-[#222e35] flex items-center justify-between">
          <a
            href="tel:1930"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Helpline 1930</span>
          </a>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#202c33] hover:bg-[#2a3942] text-white text-xs font-semibold cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
