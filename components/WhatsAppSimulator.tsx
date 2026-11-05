'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  Send,
  Paperclip,
  Smile,
  Mic,
  MoreVertical,
  Search,
  Phone,
  Video,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Share2,
  Radio,
  FileCode,
  Globe,
  Trash2,
  UploadCloud,
  CheckCheck,
  Languages,
  ChevronDown,
  Info
} from 'lucide-react';
import { ChatMessage, Language, RiskLevel, Verdict } from '@/types';
import { DEMO_PRESETS, SUPPORTED_LANGUAGES, analyzeSuspiciousInput } from '@/data/scamDatabase';
import { sounds } from '@/utils/audioEffects';

interface WhatsAppSimulatorProps {
  theme: 'dark' | 'light';
  onReportThreatToRadar: (verdict: Verdict, snippet: string) => void;
  onTriggerInCallDemo: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-system-intro',
    sender: 'system',
    text: '🔒 End-to-end simulated security engine active. Messages are scanned in-memory with privacy protection. Try sending any link, extortion script, or APK to inspect threats.',
    timestamp: '10:00 AM',
  },
  {
    id: 'msg-welcome',
    sender: 'agent',
    text: 'Namaste! 🙏 I am your **CyberRaksha AI Guardian**. Forward any suspicious WhatsApp forward, bank SMS, job offer, or APK file here.\n\nI will instantly analyze red flags, expose fraud vectors like **Digital Arrest** or **Phishing**, and provide safety advice in **English, हिन्दी, ಕನ್ನಡ, or தமிழ்**.',
    timestamp: '10:01 AM',
  },
];

export function WhatsAppSimulator({
  theme,
  onReportThreatToRadar,
  onTriggerInCallDemo,
}: WhatsAppSimulatorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<{
    name: string;
    size: string;
    type: 'apk' | 'image' | 'doc' | 'link';
  } | null>(null);
  const [reportedMessageIds, setReportedMessageIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handler to analyze and respond
  const handleProcessSubmission = (textToSend: string, attachmentObj = selectedAttachment) => {
    if (!textToSend.trim() && !attachmentObj) return;

    sounds.playSend();

    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: textToSend.trim(),
      attachment: attachmentObj || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setSelectedAttachment(null);
    setIsTyping(true);

    // 700ms simulated analysis & typing delay as required
    setTimeout(() => {
      const verdict = analyzeSuspiciousInput(userMsg.text, userMsg.attachment?.name);

      if (verdict.risk === 'DANGEROUS') {
        sounds.playWarning();
      } else {
        sounds.playReply();
      }

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: verdict.explanations[selectedLanguage],
        verdict,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, agentMsg]);
    }, 700);
  };

  const handlePresetClick = (preset: typeof DEMO_PRESETS[0]) => {
    handleProcessSubmission(preset.text, preset.attachment);
  };

  const handleReportClick = (messageId: string, verdict: Verdict, originalText: string) => {
    if (reportedMessageIds[messageId]) return;

    setReportedMessageIds((prev) => ({ ...prev, [messageId]: true }));
    onReportThreatToRadar(verdict, originalText || 'User-reported suspicious WhatsApp forward');
  };

  const handleCopyAlert = (msg: ChatMessage) => {
    if (!msg.verdict) return;
    const v = msg.verdict;
    const copyText = `🚨 *CYBER THREAT WARNING - CyberRaksha AI* 🚨\n\n` +
      `*Threat Category:* ${v.category}\n` +
      `*Risk Level:* ${v.risk} (${v.score}/100)\n\n` +
      `*Summary:* ${v.explanations[selectedLanguage]}\n\n` +
      `*Emergency Actions:*\n` +
      v.actionAdvices[selectedLanguage].map((a) => `• ${a}`).join('\n') +
      `\n\n📞 Dial 1930 or visit cybercrime.gov.in to report cyber frauds.`;

    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(copyText);
      setCopiedId(msg.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const isApk = file.name.endsWith('.apk');
      setSelectedAttachment({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: isApk ? 'apk' : 'doc',
      });
      if (isApk && !inputValue) {
        setInputValue(`Uploaded suspicious APK file for sandboxed inspection: ${file.name}`);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const isApk = file.name.endsWith('.apk');
      setSelectedAttachment({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: isApk ? 'apk' : 'doc',
      });
      if (isApk && !inputValue) {
        setInputValue(`Uploaded file: ${file.name}`);
      }
    }
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    setReportedMessageIds({});
  };

  const isDark = theme === 'dark';

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative flex flex-col h-[760px] max-h-[85vh] rounded-2xl overflow-hidden border shadow-2xl transition-all duration-300 ${
        isDark
          ? 'bg-[#111b21] border-[#222e35] text-[#e9edef]'
          : 'bg-[#ffffff] border-gray-300 text-gray-900 shadow-slate-300/60'
      }`}
    >
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
        accept=".apk,.pdf,.txt,.png,.jpg,.jpeg"
      />

      {/* Drag & drop overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-50 bg-emerald-950/85 backdrop-blur-sm border-2 border-dashed border-emerald-400 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <UploadCloud className="w-16 h-16 text-emerald-400 animate-bounce mb-3" />
          <h3 className="text-xl font-bold text-white mb-1">Drop File for Sandboxed Security Scan</h3>
          <p className="text-sm text-emerald-200">
            Accepts .apk, .pdf, screenshots, or malicious scripts for instant analysis
          </p>
        </div>
      )}

      {/* WhatsApp Top Header */}
      <div
        className={`px-4 py-3 flex items-center justify-between border-b select-none transition-colors ${
          isDark
            ? 'bg-[#202c33] border-[#2a3942]'
            : 'bg-[#f0f2f5] border-gray-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold shadow-md">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#202c33] rounded-full" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-semibold tracking-tight">CyberRaksha Guardian AI</h2>
              <span
                className="bg-emerald-500 text-white rounded-full p-0.5"
                title="Verified Official Cyber Safety Bot"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              online • End-to-end Threat Analysis
            </p>
          </div>
        </div>

        {/* WhatsApp Web Action Icons */}
        <div className="flex items-center gap-1">
          {/* Audio call button that triggers In-call roadmap demo */}
          <button
            onClick={onTriggerInCallDemo}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isDark
                ? 'hover:bg-[#374248] text-[#aebac1] hover:text-white'
                : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
            }`}
            title="Simulate In-Call Real-Time Audio Threat Warning"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
          </button>

          <button
            onClick={clearChat}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isDark
                ? 'hover:bg-[#374248] text-[#aebac1] hover:text-white'
                : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
            }`}
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Demo Preset Chips Bar */}
      <div
        className={`px-3 py-2 border-b overflow-x-auto flex items-center gap-2 text-xs no-scrollbar ${
          isDark ? 'bg-[#182229] border-[#222e35]' : 'bg-[#f7f8fa] border-gray-200'
        }`}
      >
        <span className="font-semibold text-[11px] uppercase tracking-wider text-emerald-400 shrink-0 flex items-center gap-1">
          <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
          Presets:
        </span>

        {DEMO_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handlePresetClick(preset)}
            className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 shadow-sm hover:scale-[1.02] ${
              isDark
                ? 'bg-[#202c33] hover:bg-[#2a3942] border-[#2a3942] text-[#d1d7db]'
                : 'bg-white hover:bg-emerald-50 border-gray-300 hover:border-emerald-300 text-gray-800'
            }`}
          >
            <span className={`text-[10px] font-bold uppercase ${preset.iconColor}`}>
              [{preset.badge}]
            </span>
            <span>{preset.label}</span>
          </button>
        ))}
      </div>

      {/* Language Quick-Selector Bar for Verdicts */}
      <div
        className={`px-3 py-1.5 border-b flex items-center justify-between text-xs ${
          isDark ? 'bg-[#111b21] border-[#222e35] text-[#8696a0]' : 'bg-[#eef0f2] border-gray-200 text-gray-600'
        }`}
      >
        <div className="flex items-center gap-1 text-[11px]">
          <Languages className="w-3.5 h-3.5 text-emerald-400" />
          <span>Safety Advice Language:</span>
        </div>

        <div className="flex items-center gap-1">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                selectedLanguage === lang.code
                  ? 'bg-emerald-600 text-white font-bold'
                  : isDark
                  ? 'bg-[#202c33] text-[#8696a0] hover:text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Body Area */}
      <div
        className={`flex-1 p-4 overflow-y-auto space-y-4 ${
          isDark ? 'wa-chat-bg-dark' : 'wa-chat-bg-light'
        }`}
      >
        {messages.map((msg) => {
          if (msg.sender === 'system') {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <div
                  className={`text-[11px] px-3 py-1.5 rounded-lg max-w-md text-center shadow-sm ${
                    isDark
                      ? 'bg-[#182229]/90 text-[#8696a0] border border-[#222e35]'
                      : 'bg-[#fff5c4] text-amber-900 border border-amber-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          }

          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[82%] rounded-2xl p-3 shadow-md transition-all ${
                  isUser
                    ? isDark
                      ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none'
                      : 'bg-[#d9fdd3] text-gray-900 rounded-tr-none border border-emerald-200'
                    : isDark
                    ? 'bg-[#202c33] text-[#e9edef] rounded-tl-none border border-[#2a3942]'
                    : 'bg-white text-gray-900 rounded-tl-none border border-gray-200'
                }`}
              >
                {/* Optional attachment preview */}
                {msg.attachment && (
                  <div
                    className={`flex items-center gap-3 p-2.5 rounded-xl mb-2 text-xs border ${
                      isDark
                        ? 'bg-[#111b21]/70 border-[#2a3942] text-white'
                        : 'bg-emerald-50 border-emerald-200 text-gray-900'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <FileCode className="w-5 h-5" />
                    </div>
                    <div className="truncate flex-1">
                      <p className="font-semibold truncate">{msg.attachment.name}</p>
                      <p className="text-[10px] text-[#8696a0]">
                        {msg.attachment.size} • {msg.attachment.type.toUpperCase()} File
                      </p>
                    </div>
                  </div>
                )}

                {/* Primary Message text */}
                <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed break-words">
                  {msg.text}
                </div>

                {/* STRUCTURED AGENT VERDICT CARD */}
                {msg.verdict && (
                  <div className="mt-3 pt-3 border-t border-[#374248]/40 space-y-3">
                    {/* Header Pill & Score */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {msg.verdict.risk === 'DANGEROUS' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-rose-600 text-white shadow-md shadow-rose-950 hazard-glow">
                            <AlertOctagon className="w-3.5 h-3.5" />
                            DANGEROUS 🔴
                          </span>
                        )}
                        {msg.verdict.risk === 'SUSPICIOUS' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 shadow-md">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            SUSPICIOUS 🟡
                          </span>
                        )}
                        {msg.verdict.risk === 'SAFE' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-md">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            SAFE 🟢
                          </span>
                        )}

                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                            isDark
                              ? 'bg-[#111b21] border-[#2a3942] text-emerald-400'
                              : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          }`}
                        >
                          {msg.verdict.category}
                        </span>
                      </div>

                      <div className="text-[11px] font-mono text-[#8696a0]">
                        Threat Score:{' '}
                        <span
                          className={`font-bold ${
                            msg.verdict.score > 70
                              ? 'text-rose-400'
                              : msg.verdict.score > 30
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {msg.verdict.score}/100
                        </span>
                      </div>
                    </div>

                    {/* Threat Indicators List */}
                    {msg.verdict.threatIndicators && msg.verdict.threatIndicators.length > 0 && (
                      <div
                        className={`p-2.5 rounded-xl text-xs space-y-1.5 border ${
                          isDark
                            ? 'bg-[#111b21]/80 border-[#2a3942]'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <p className="font-semibold text-[11px] uppercase tracking-wider text-gray-400 flex items-center gap-1">
                          <Info className="w-3 h-3 text-emerald-400" />
                          Identified Threat Indicators:
                        </p>
                        {msg.verdict.threatIndicators.map((ind, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px]">
                            <span
                              className={`shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 ${
                                ind.severity === 'high'
                                  ? 'bg-rose-500'
                                  : ind.severity === 'medium'
                                  ? 'bg-amber-400'
                                  : 'bg-emerald-400'
                              }`}
                            />
                            <span>
                              <strong className="text-gray-200">{ind.label}:</strong>{' '}
                              <span className="text-[#8696a0]">{ind.detail}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Malicious APK Specific Permissions Inspector */}
                    {msg.verdict.apkDangerousPermissions && (
                      <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/40 text-xs">
                        <p className="font-bold text-rose-300 text-[11px] uppercase mb-1">
                          Dangerous APK Permissions Requested:
                        </p>
                        <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-rose-200">
                          {msg.verdict.apkDangerousPermissions.map((perm, idx) => (
                            <li key={idx}>{perm}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Clear Action Advice in Selected Language */}
                    <div
                      className={`p-2.5 rounded-xl border text-xs space-y-1.5 ${
                        msg.verdict.risk === 'DANGEROUS'
                          ? 'bg-rose-950/30 border-rose-800/30 text-rose-100'
                          : msg.verdict.risk === 'SUSPICIOUS'
                          ? 'bg-amber-950/30 border-amber-800/30 text-amber-100'
                          : 'bg-emerald-950/30 border-emerald-800/30 text-emerald-100'
                      }`}
                    >
                      <p className="font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Recommended Action ({SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage)?.name}):
                      </p>
                      <ul className="space-y-1 text-xs">
                        {msg.verdict.actionAdvices[selectedLanguage]?.map((adv, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span>{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons: Report to Community Radar & Share */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <button
                        onClick={() =>
                          handleReportClick(msg.id, msg.verdict!, msg.text)
                        }
                        disabled={reportedMessageIds[msg.id]}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          reportedMessageIds[msg.id]
                            ? 'bg-emerald-800/60 text-emerald-200 border border-emerald-600/40 cursor-default'
                            : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md hover:scale-[1.02]'
                        }`}
                      >
                        <Radio className="w-3.5 h-3.5" />
                        <span>
                          {reportedMessageIds[msg.id]
                            ? 'Reported to Community Radar! 🛡️'
                            : 'Report to Community Radar (+1)'}
                        </span>
                      </button>

                      <button
                        onClick={() => handleCopyAlert(msg)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isDark
                            ? 'bg-[#111b21] hover:bg-[#2a3942] border-[#2a3942] text-[#8696a0] hover:text-white'
                            : 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700'
                        }`}
                        title="Copy clean alert to forward to WhatsApp Family & Elders"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>{copiedId === msg.id ? 'Copied to Clipboard!' : 'Forward Alert'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Timestamp and Read status */}
                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#8696a0]">
                  <span>{msg.timestamp}</span>
                  {isUser && <CheckCheck className="w-3.5 h-3.5 text-sky-400" />}
                </div>
              </div>
            </div>
          );
        })}

        {/* Animated 700ms Typing Indicator */}
        {isTyping && (
          <div className="flex items-start animate-fade-in">
            <div
              className={`rounded-2xl rounded-tl-none p-3 shadow-md flex items-center gap-2 border ${
                isDark
                  ? 'bg-[#202c33] border-[#2a3942] text-[#8696a0]'
                  : 'bg-white border-gray-200 text-gray-600'
              }`}
            >
              <div className="flex items-center gap-1 px-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.3s]" />
              </div>
              <span className="text-xs italic">
                CyberRaksha is scanning threat vectors &amp; domain headers...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Selected file attachment chip before sending */}
      {selectedAttachment && (
        <div
          className={`px-4 py-2 border-t flex items-center justify-between text-xs animate-fade-in ${
            isDark ? 'bg-[#182229] border-[#222e35]' : 'bg-emerald-50 border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2 truncate">
            <FileCode className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold truncate">{selectedAttachment.name}</span>
            <span className="text-[10px] text-[#8696a0]">({selectedAttachment.size})</span>
          </div>
          <button
            onClick={() => setSelectedAttachment(null)}
            className="text-rose-400 hover:text-rose-300 font-bold ml-2 text-xs cursor-pointer"
          >
            Remove
          </button>
        </div>
      )}

      {/* Chat Input Bar */}
      <div
        className={`p-3 border-t flex items-center gap-2 ${
          isDark ? 'bg-[#202c33] border-[#2a3942]' : 'bg-[#f0f2f5] border-gray-200'
        }`}
      >
        {/* Attachment button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`p-2 rounded-full transition-colors cursor-pointer ${
            isDark
              ? 'hover:bg-[#374248] text-[#8696a0] hover:text-white'
              : 'hover:bg-gray-200 text-gray-600'
          }`}
          title="Attach suspicious APK, PDF, or screenshot"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Input Field */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleProcessSubmission(inputValue);
          }}
          className="flex-1 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Paste suspicious WhatsApp message, SMS, link, or script..."
            className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors ${
              isDark
                ? 'bg-[#2a3942] text-white placeholder-[#8696a0]'
                : 'bg-white text-gray-900 placeholder-gray-400 border border-gray-300'
            }`}
          />

          {inputValue.trim() || selectedAttachment ? (
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all cursor-pointer hover:scale-105 shrink-0"
              title="Inspect with CyberRaksha AI"
            >
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                // Simulate suspicious voice note
                handleProcessSubmission(
                  'Simulated Suspicious Voice Note: "DCP Crime Branch speaking. Your Aadhaar is linked to illegal parcel. Transfer bail guarantee right now."',
                  undefined
                );
              }}
              className={`p-2.5 rounded-full transition-colors cursor-pointer shrink-0 ${
                isDark
                  ? 'hover:bg-[#374248] text-[#8696a0] hover:text-emerald-400'
                  : 'hover:bg-gray-200 text-gray-600 hover:text-emerald-600'
              }`}
              title="Simulate Voice Note / Audio Message Analysis"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
