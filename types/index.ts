export type RiskLevel = 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS';

export type ThreatCategory = 
  | 'Phishing & KYC Harvester'
  | 'Digital Arrest Extortion'
  | 'Malicious Side-loaded APK'
  | 'Legitimate / Safe Notice'
  | 'Job & Investment Scam'
  | 'Utility / Electricity Scam';

export type Language = 'en' | 'hi' | 'kn' | 'ta';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Verdict {
  risk: RiskLevel;
  category: ThreatCategory;
  score: number; // 0 to 100
  confidence: number; // 0 to 100
  explanations: Record<Language, string>;
  actionAdvices: Record<Language, string[]>;
  detectedFlags: string[];
  threatIndicators: {
    label: string;
    detail: string;
    severity: 'high' | 'medium' | 'low';
  }[];
  fakeDomain?: string;
  officialAlternative?: string;
  apkPackageName?: string;
  apkDangerousPermissions?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  attachment?: {
    name: string;
    size: string;
    type: 'apk' | 'image' | 'doc' | 'link';
  };
  timestamp: string;
  verdict?: Verdict;
  reportedToRadar?: boolean;
}

export interface ThreatTrendItem {
  id: string;
  title: string;
  category: 'Phishing' | 'Digital Arrest' | 'Malicious APK' | 'Job / Task Scam';
  risk: RiskLevel;
  targetSector: string;
  sampleSnippet: string;
  spikeRegion: string;
  spikePercentage: number;
  timeAgo: string;
  reportsCount: number;
  presetText?: string;
}

export interface RadarMetrics {
  inspectedToday: number;
  digitalArrestIntercepted: number;
  apksFlagged: number;
  phishingDomainsBlacklisted: number;
  citizenReports: number;
}

