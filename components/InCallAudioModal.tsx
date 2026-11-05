'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  PhoneOff,
  Volume2,
  ShieldAlert,
  Mic,
  Activity,
  AlertOctagon,
  Sparkles,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { sounds } from '@/utils/audioEffects';

interface InCallAudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InCallAudioModal({ isOpen, onClose }: InCallAudioModalProps) {
  const [callActive, setCallActive] = useState(false);
  const [threatDetected, setThreatDetected] = useState(false);
  const [transcriptIndex, setTranscriptIndex] = useState(0);

  const transcriptLines = [
    { speaker: 'Scammer', text: 'Hello, this is Inspector Sanjay Kumar from Mumbai Crime Branch Headquarters.', delay: 1000 },
    { speaker: 'Scammer', text: 'Your Aadhaar card was used in an illegal courier containing 140 grams of contraband narcotics.', delay: 2800 },
    { speaker: 'Scammer', text: 'An emergency warrant is issued. You are placed under DIGITAL ARREST right now.', delay: 4800, flag: true },
    { speaker: 'Scammer', text: 'Do not disconnect this call or talk to family. Immediately transfer ₹1,50,000 security deposit to the RBI verification account.', delay: 7000, flag: true },
  ];

  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    let t3: NodeJS.Timeout;
    let t4: NodeJS.Timeout;

    if (isOpen) {
      setCallActive(true);
      setThreatDetected(false);
      setTranscriptIndex(0);

      t1 = setTimeout(() => setTranscriptIndex(1), 1200);
      t2 = setTimeout(() => setTranscriptIndex(2), 3000);
      t3 = setTimeout(() => {
        setTranscriptIndex(3);
        setThreatDetected(true);
        sounds.playWarning();
      }, 5000);
      t4 = setTimeout(() => setTranscriptIndex(4), 7200);
    } else {
      setCallActive(false);
      setThreatDetected(false);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0c1317] border border-cyan-800/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top Header */}
        <div className="px-5 py-3.5 bg-[#111b21] border-b border-[#222e35] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Real-Time In-Call Audio Warning Engine</span>
                <span className="text-[10px] bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-700/50">
                  INTERACTIVE SIMULATOR
                </span>
              </h3>
              <p className="text-[11px] text-[#8696a0]">
                Demonstrating edge acoustic scam detection on active voice calls
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

        {/* Simulator Screen Body */}
        <div className="p-5 space-y-4">
          {/* Simulated Active Call Card */}
          <div className="bg-[#111b21] border border-[#222e35] rounded-2xl p-4 text-center relative overflow-hidden">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 border-2 border-rose-500/50 flex items-center justify-center text-rose-400 mb-2 shadow-lg">
              <PhoneOff className="w-8 h-8 animate-pulse text-rose-400" />
            </div>

            <h4 className="text-base font-bold text-white">
              Unknown Caller: &quot;Mumbai Crime Branch (HQ)&quot;
            </h4>
            <p className="text-xs text-rose-400 font-medium mt-0.5">
              +91 98XXX XXXXX • WhatsApp Audio Call • 00:24
            </p>

            {/* Simulated Live Audio Waveform */}
            <div className="mt-4 flex items-center justify-center gap-1.5 h-12 bg-[#0b141a] rounded-xl px-4 border border-[#222e35]">
              <span className="text-[10px] text-cyan-400 font-mono mr-2">AUDIO DSP:</span>
              <div className="flex items-center gap-1 h-8">
                <span className="w-1.5 bg-cyan-400 rounded-full animate-wave-1" />
                <span className="w-1.5 bg-cyan-400 rounded-full animate-wave-2" />
                <span className="w-1.5 bg-cyan-400 rounded-full animate-wave-3" />
                <span className="w-1.5 bg-cyan-400 rounded-full animate-wave-4" />
                <span className="w-1.5 bg-cyan-400 rounded-full animate-wave-5" />
                <span className="w-1.5 bg-cyan-400 rounded-full animate-wave-1" />
                <span className="w-1.5 bg-cyan-400 rounded-full animate-wave-3" />
                <span className="w-1.5 bg-cyan-400 rounded-full animate-wave-2" />
                <span className="w-1.5 bg-cyan-400 rounded-full animate-wave-5" />
                <span className="w-1.5 bg-cyan-400 rounded-full animate-wave-4" />
              </div>
              <span className="text-[10px] text-emerald-400 font-mono ml-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ON-DEVICE SCANNING
              </span>
            </div>
          </div>

          {/* Real-Time Live Transcript with Highlighting */}
          <div className="bg-[#111b21] border border-[#222e35] rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#8696a0] font-semibold border-b border-[#222e35] pb-1.5">
              <span className="flex items-center gap-1">
                <Mic className="w-3.5 h-3.5 text-cyan-400" />
                Real-Time Audio Stream Transcription:
              </span>
              <span className="text-cyan-400">Zero Audio Saved (Local Model)</span>
            </div>

            <div className="space-y-2 pt-1 max-h-36 overflow-y-auto">
              {transcriptLines.slice(0, transcriptIndex).map((line, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border text-xs leading-relaxed animate-fade-in ${
                    line.flag
                      ? 'bg-rose-950/60 border-rose-700/60 text-rose-200 font-medium'
                      : 'bg-[#182229] border-[#222e35] text-gray-300'
                  }`}
                >
                  <strong className={line.flag ? 'text-rose-400' : 'text-gray-400'}>
                    [{line.speaker}]:
                  </strong>{' '}
                  {line.text}
                  {line.flag && (
                    <span className="ml-2 text-[10px] uppercase font-black bg-rose-600 text-white px-1.5 py-0.5 rounded">
                      FLAGGED THREAT
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* DANGER WARNING OVERLAY TRIGGERED */}
          {threatDetected && (
            <div className="bg-rose-950/90 border-2 border-rose-500 rounded-2xl p-4 text-rose-100 shadow-2xl hazard-glow animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-rose-600 text-white shrink-0">
                  <AlertOctagon className="w-6 h-6 animate-bounce" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <span>⚠️ EMERGENCY IN-CALL ALERT TRIGGERED</span>
                  </h4>
                  <p className="text-xs text-rose-200 mt-1 leading-relaxed">
                    <strong>&quot;Digital Arrest&quot; Extortion Pattern Detected!</strong> The caller is falsely impersonating
                    Crime Branch police and demanding illegal fund transfers.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <PhoneOff className="w-4 h-4" />
                      <span>DISCONNECT &amp; BLOCK CALLER NOW</span>
                    </button>
                    <a
                      href="tel:1930"
                      className="px-3 py-2 bg-black/40 hover:bg-black/60 text-white font-bold text-xs rounded-xl border border-rose-400/50 transition-colors"
                    >
                      Call Cyber Helpline 1930
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-[#111b21] border-t border-[#222e35] flex items-center justify-between text-xs text-[#8696a0]">
          <span>Privacy Guaranteed: Acoustic features extracted in volatile RAM</span>
          <button
            onClick={onClose}
            className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
          >
            Close Simulator
          </button>
        </div>
      </div>
    </div>
  );
}

