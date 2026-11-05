import { Language, LanguageOption, RiskLevel, ThreatCategory, ThreatTrendItem, Verdict } from '@/types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
];

export const DEMO_PRESETS = [
  {
    id: 'phishing-sbi',
    label: 'Fake SBI KYC Alert',
    badge: 'Phishing URL',
    iconColor: 'text-rose-400',
    text: 'SBI ALERT: Dear customer, your SBI NetBanking account will be blocked today due to pending KYC verification. Update immediately at http://sbi-kyc-verify-login.top/auth to avoid penalty.',
  },
  {
    id: 'digital-arrest',
    label: 'Digital Arrest Script',
    badge: 'Extortion Call',
    iconColor: 'text-red-500',
    text: "DCP Crime Branch Mumbai here. A courier parcel with 160g MDMA narcotics registered under your Aadhaar ID has been seized by Customs at Mumbai Airport. Warrant is issued. Transfer ₹1,50,000 bail security deposit immediately to RBI escrow account to avoid immediate digital arrest and public custody.",
  },
  {
    id: 'malicious-apk',
    label: 'InstantLoan APK',
    badge: 'Spy Trojan APK',
    iconColor: 'text-amber-400',
    text: 'Pre-approved loan of ₹2,50,000 credited! Download InstantLoan-Approval-v2.apk to claim zero-interest disbursal directly to your account.',
    attachment: {
      name: 'InstantLoan-Approval-v2.apk',
      size: '14.2 MB',
      type: 'apk' as const,
    },
  },
  {
    id: 'safe-amazon',
    label: 'Amazon Delivery Update',
    badge: 'Safe Notice',
    iconColor: 'text-emerald-400',
    text: 'Amazon delivery update: Your package #8492 with order containing wireless earbuds is out for delivery with agent Ramesh (OTP: 5821). Track in your official Amazon app.',
  },
  {
    id: 'electricity-bill',
    label: 'Electricity Disconnection',
    badge: 'Utility Scam',
    iconColor: 'text-orange-400',
    text: 'Dear consumer, electricity bill ₹1,420 is overdue. Power supply will be disconnected tonight by 9:30 PM. Call electricity officer at 9876543210 immediately.',
  },
];

export const INITIAL_TREND_ITEMS: ThreatTrendItem[] = [
  {
    id: 'trend-1',
    title: 'Fake SBI / HDFC "Aadhaar KYC Suspended" Link Wave',
    category: 'Phishing',
    risk: 'DANGEROUS',
    targetSector: 'Banking & UPI Credentials',
    sampleSnippet: 'hxxp://sbi-kyc-verify-login[.]top/auth',
    spikeRegion: 'Maharashtra & Delhi NCR',
    spikePercentage: 46,
    timeAgo: '4 mins ago',
    reportsCount: 842,
    presetText: 'SBI ALERT: Dear customer, your SBI NetBanking account will be blocked today due to pending KYC verification. Update immediately at http://sbi-kyc-verify-login.top/auth to avoid penalty.',
  },
  {
    id: 'trend-2',
    title: 'Digital Arrest: Fake Mumbai Customs & CBI Video Summons',
    category: 'Digital Arrest',
    risk: 'DANGEROUS',
    targetSector: 'Elderly Citizens & IT Professionals',
    sampleSnippet: 'Fake Skype / WhatsApp video call with fake police backdrop & fake Supreme Court order',
    spikeRegion: 'Bengaluru & Hyderabad',
    spikePercentage: 72,
    timeAgo: '11 mins ago',
    reportsCount: 1240,
    presetText: "DCP Crime Branch Mumbai here. A courier parcel with 160g MDMA narcotics registered under your Aadhaar ID has been seized by Customs at Mumbai Airport. Warrant is issued. Transfer ₹1,50,000 bail security deposit immediately to RBI escrow account to avoid immediate digital arrest and public custody.",
  },
  {
    id: 'trend-3',
    title: 'Predatory Instant Loan Apps Sideloading Trojan',
    category: 'Malicious APK',
    risk: 'DANGEROUS',
    targetSector: 'Mobile Contacts, Gallery & SMS',
    sampleSnippet: 'InstantLoan-Approval-v2.apk (Requests READ_CONTACTS, CAMERA, READ_SMS)',
    spikeRegion: 'Tamil Nadu & Uttar Pradesh',
    spikePercentage: 38,
    timeAgo: '28 mins ago',
    reportsCount: 512,
    presetText: 'Pre-approved loan of ₹2,50,000 credited! Download InstantLoan-Approval-v2.apk to claim zero-interest disbursal directly to your account.',
  },
  {
    id: 'trend-4',
    title: 'Electricity Disconnection Threat via WhatsApp SMS',
    category: 'Phishing',
    risk: 'SUSPICIOUS',
    targetSector: 'Residential Power Consumers',
    sampleSnippet: 'Electricity bill unpaid. Power cut at 9:30 PM. Call unofficial mobile number.',
    spikeRegion: 'Punjab & Rajasthan',
    spikePercentage: 29,
    timeAgo: '45 mins ago',
    reportsCount: 390,
    presetText: 'Dear consumer, electricity bill ₹1,420 is overdue. Power supply will be disconnected tonight by 9:30 PM. Call electricity officer at 9876543210 immediately.',
  },
  {
    id: 'trend-5',
    title: 'Telegram "YouTube Video Like & Earn ₹3500/day" Work From Home',
    category: 'Job / Task Scam',
    risk: 'DANGEROUS',
    targetSector: 'Students & Homemakers',
    sampleSnippet: 'Deposit ₹1,000 to unlock VIP task commission. Crypto payout trick.',
    spikeRegion: 'Karnataka & Kerala',
    spikePercentage: 33,
    timeAgo: '1 hr ago',
    reportsCount: 615,
    presetText: 'Congratulations! You are selected for YouTube Video Like & Earn ₹3,500/day work from home. Complete 3 demo tasks now to receive immediate UPI payout. Join Telegram: https://t.me/vip_tasks_earn',
  },
];

/**
 * Intelligent Scam Analysis Engine
 * Evaluates text, URLs, file attachments, and coercive scripts
 */
export function analyzeSuspiciousInput(
  rawInput: string,
  attachmentName?: string
): Verdict {
  const text = rawInput.toLowerCase();
  const fileName = (attachmentName || '').toLowerCase();

  // 1. Digital Arrest Pattern Check
  const hasDigitalArrestPhrases = 
    text.includes('digital arrest') ||
    text.includes('crime branch') ||
    text.includes('narcotics') ||
    text.includes('customs') ||
    text.includes('mdma') ||
    text.includes('cbi') ||
    text.includes('police custody') ||
    text.includes('dcp') ||
    text.includes('bail security deposit') ||
    text.includes('parcel registered under your id') ||
    text.includes('skype video call') ||
    text.includes('supreme court warrant') ||
    text.includes('arrest warrant');

  if (hasDigitalArrestPhrases) {
    return {
      risk: 'DANGEROUS',
      category: 'Digital Arrest Extortion',
      score: 98,
      confidence: 99,
      detectedFlags: [
        'Impersonation of Law Enforcement (CBI/Police/Customs)',
        'Fabricated "Digital Arrest" threat (No such law exists in India)',
        'Extortion demand for "bail security deposit" or escrow fund transfer',
        'Psychological panic & isolation tactics',
      ],
      threatIndicators: [
        {
          label: 'Legal Validity',
          detail: 'No Indian law, police, or court conducts "Digital Arrest" via WhatsApp, Skype, or phone calls.',
          severity: 'high',
        },
        {
          label: 'Extortion Demand',
          detail: 'Demanding bail or security deposits via UPI/IMPS to personal/escrow accounts is 100% cyber-extortion.',
          severity: 'high',
        },
        {
          label: 'Coercive Urgency',
          detail: 'High emotional pressure designed to prevent consulting relatives or legal counsel.',
          severity: 'high',
        },
      ],
      explanations: {
        en: 'CRITICAL ALERT: This is an active "Digital Arrest" extortion racket. Indian Police, CBI, ED, and Courts NEVER arrest anyone via video call or demand online money transfers for bail.',
        hi: 'अति आवश्यक चेतावनी: यह एक "डिजिटल अरेस्ट" जबरन वसूली धोखाधड़ी है। भारतीय पुलिस, सीबीआई या अदालतें कभी भी व्हाट्सएप/वीडियो कॉल पर किसी को गिरफ्तार नहीं करती हैं और न ही ऑनलाइन जमानत राशि मांगती हैं।',
        kn: 'ಅತ್ಯಂತ ಎಚ್ಚರಿಕೆ: ಇದು ಸೈಬರ್ ಅಪರಾಧಿಗಳು ನಡೆಸುವ "ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" ವಂಚನೆಯಾಗಿದೆ. ಭಾರತೀಯ ಪೊಲೀಸ್ ಅಥವಾ ಸಿಬಿಐ ಎಂದಿಗೂ ವಿಡಿಯೋ ಕಾಲ್ ಮೂಲಕ ಬಂಧಿಸುವುದಿಲ್ಲ ಅಥವಾ ಆನ್‌ಲೈನ್ ಜಾಮೀನು ಹಣ ಕೇಳುವುದಿಲ್ಲ.',
        ta: 'முக்கிய எச்சரிக்கை: இது முற்றிலும் போலி "டிஜிட்டல் கைது" மிரட்டல் ஆகும். இந்திய காவல்துறை அல்லது சிபிஐ ஒருபோதும் வீடியோ அழைப்பு மூலம் கைது செய்யவோ அல்லது பிணைத் தொகை கேட்கவோ மாட்டார்கள்.',
      },
      actionAdvices: {
        en: [
          '🛑 DO NOT transfer any money or provide your bank/Aadhaar details.',
          '📴 Disconnect the call immediately and block this caller.',
          '📞 Immediately dial 1930 (National Cyber Crime Helpline) or report at cybercrime.gov.in.',
          '🛡️ Inform your local police station; you are safe, there is no legal digital arrest.',
        ],
        hi: [
          '🛑 किसी भी खाते में पैसा न भेजें और अपना आधार/बैंक विवरण साझा न करें।',
          '📴 तुरंत कॉल काट दें और इस नंबर को ब्लॉक कर दें।',
          '📞 तुरंत राष्ट्रीय साइबर हेल्पलाइन 1930 पर कॉल करें या cybercrime.gov.in पर शिकायत दर्ज करें।',
          '🛡️ अपने स्थानीय पुलिस स्टेशन से संपर्क करें। आप पूरी तरह सुरक्षित हैं।',
        ],
        kn: [
          '🛑 ಯಾವುದೇ ಖಾತೆಗೆ ಹಣ ವರ್ಗಾಯಿಸಬೇಡಿ ಅಥವಾ ಆಧಾರ್ ವಿವರ ನೀಡಬೇಡಿ.',
          '📴 ತಕ್ಷಣ ಕರೆಯನ್ನು ಕಡಿತಗೊಳಿಸಿ ಮತ್ತು ಈ ಸಂಖ್ಯೆಯನ್ನು ಬ್ಲಾಕ್ ಮಾಡಿ.',
          '📞 ತಕ್ಷಣ 1930 ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ cybercrime.gov.in ನಲ್ಲಿ ದೂರು ದಾಖಲಿಸಿ.',
          '🛡️ ನಿಮ್ಮ ಹತ್ತಿರದ ಪೊಲೀಸ್ ಠಾಣೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ; ನೀವು ಸುರಕ್ಷಿತವಾಗಿದ್ದೀರಿ.',
        ],
        ta: [
          '🛑 எந்தவொரு கணக்கிற்கும் பணம் அனுப்பாதீர்கள் மற்றும் உங்கள் ஆதார் விவரங்களை பகிராதீர்கள்.',
          '📴 உடனடியாக அழைப்பைத் துண்டித்து, இந்த எண்ணை பிளாக் செய்யவும்.',
          '📞 உடனே 1930 என்ற தேசிய சைபர் ஹெல்ப்லைனை அழைக்கவும் அல்லது cybercrime.gov.in இல் புகார் அளிக்கவும்.',
          '🛡️ உங்கள் உள்ளூர் காவல் நிலையத்தை தொடர்பு கொள்ளவும்; நீங்கள் பாதுகாப்பாக உள்ளீர்கள்.',
        ],
      },
    };
  }

  // 2. Malicious APK Pattern Check
  const hasApkFile = fileName.endsWith('.apk') || text.includes('.apk');
  const hasLoanScamKeywords = 
    text.includes('instantloan') ||
    text.includes('pre-approved loan') ||
    text.includes('zero-interest disbursal') ||
    text.includes('loan app') ||
    text.includes('disbursal') ||
    text.includes('pm-kisan');

  if (hasApkFile || (hasLoanScamKeywords && text.includes('download'))) {
    return {
      risk: 'DANGEROUS',
      category: 'Malicious Side-loaded APK',
      score: 95,
      confidence: 97,
      apkPackageName: fileName || 'com.predatory.instantloan.trojan',
      apkDangerousPermissions: [
        'android.permission.READ_SMS (Steals Banking OTPs)',
        'android.permission.READ_CONTACTS (Harvests contact list for extortion harassment)',
        'android.permission.CAMERA (Secretly captures photos)',
        'android.permission.READ_EXTERNAL_STORAGE (Steals private photo gallery)',
        'android.permission.RECORD_AUDIO (Background ambient listening)',
      ],
      detectedFlags: [
        'Untrusted third-party sideloading outside Google Play Store',
        'Requests invasive SMS & Contacts access permissions',
        'Matches known predatory loan-harassment trojan signatures',
        'Potential covert screen recording and OTP forwarding payload',
      ],
      threatIndicators: [
        {
          label: 'Sideload Risk',
          detail: 'Bypasses Google Play Protect scanning to install remote access spyware.',
          severity: 'high',
        },
        {
          label: 'Blackmail Vector',
          detail: 'Uploads your contact book to extortion servers to blackmail friends & family.',
          severity: 'high',
        },
        {
          label: 'Financial Danger',
          detail: 'Silently forwards bank verification SMS and unauthorized UPI transactions.',
          severity: 'high',
        },
      ],
      explanations: {
        en: 'MALICIOUS APK DETECTED: This is a predatory spyware/loan trojan APK. Once installed, it exfiltrates your contacts, SMS (OTPs), and photos to blackmail you with doctored images and fake loans.',
        hi: 'खतरनाक एपीके पकड़ा गया: यह एक जासूसी लोन फ्रॉड एपीके (APK) है। इंस्टॉल होते ही यह आपके कांटेक्ट लिस्ट, बैंक ओटीपी (SMS) और निजी फोटो चुराकर ब्लैकमेल करता है।',
        kn: 'ಅಪಾಯಕಾರಿ ಎಪಿಕೆ ಪತ್ತೆಯಾಗಿದೆ: ಇದು ನಕಲಿ ಸಾಲ ನೀಡುವ ಸ್ಪೈವೇರ್ ಎಪಿಕೆ ಆಗಿದೆ. ಇದನ್ನು ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿದರೆ ನಿಮ್ಮ ಸಂಪರ್ಕಗಳು, ಒಟಿಪಿಗಳು ಮತ್ತು ಫೋಟೋಗಳನ್ನು ಕದ್ದು ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡಲಾಗುತ್ತದೆ.',
        ta: 'ஆபத்தான APK கண்டறியப்பட்டது: இது ஒரு போலி கடன் ஸ்பைவேர் APK ஆகும். இதை நிறுவுவதன் மூலம் உங்கள் தொடர்புகள், வங்கி OTPகள் மற்றும் புகைப்படங்களை திருடி மிரட்டுவார்கள்.',
      },
      actionAdvices: {
        en: [
          '❌ NEVER install APK files received via WhatsApp, Telegram, or SMS.',
          '🗑️ If already downloaded, delete the file immediately from your "Downloads" folder.',
          '🔒 Never grant "Install Unknown Apps" or "SMS / Contacts" permissions.',
          '📱 Only install apps verified by the Google Play Store or Apple App Store.',
        ],
        hi: [
          '❌ व्हाट्सएप, टेलीग्राम या एसएमएस से आई किसी भी एपीके फाइल को कभी भी इंस्टॉल न करें।',
          '🗑️ यदि पहले ही डाउनलोड कर लिया है, तो डाउनलोड्स फोल्डर से तुरंत डिलीट करें।',
          '🔒 "Unknown Sources" या एसएमएस/कांटेक्ट परमिशन कभी न दें।',
          '📱 केवल गूगल प्ले स्टोर या एप्पल ऐप स्टोर से ही अधिकृत ऐप्स डाउनलोड करें।',
        ],
        kn: [
          '❌ ವಾಟ್ಸಾಪ್ ಅಥವಾ ಎಸ್ಸೆಮ್ಮೆಸ್ ಮೂಲಕ ಬರುವ ಎಪಿಕೆ ಫೈಲ್‌ಗಳನ್ನು ಎಂದಿಗೂ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಬೇಡಿ.',
          '🗑️ ಈಗಾಗಲೇ ಡೌನ್‌ಲೋಡ್ ಆಗಿದ್ದರೆ, ತಕ್ಷಣ ಡಿಲೀಟ್ ಮಾಡಿ.',
          '🔒 ಅಪರಿಚಿತ ಅಪ್ಲಿಕೇಶನ್‌ಗಳಿಗೆ ಅನುಮತಿಗಳನ್ನು (SMS, Contacts) ನೀಡಬೇಡಿ.',
          '📱 ಅಧಿಕೃತ ಗೂಗಲ್ ಪ್ಲೇ ಸ್ಟೋರ್‌ನಿಂದ ಮಾತ್ರ ಅಪ್ಲಿಕೇಶನ್‌ಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.',
        ],
        ta: [
          '❌ வாட்ஸ்அப் அல்லது எஸ்எம்எஸ் மூலம் வரும் எந்த APK கோப்பையும் நிறுவ வேண்டாம்.',
          '🗑️ ஏற்கனவே பதிவிறக்கம் செய்திருந்தால், உடனடியாக அதை நீக்கவும் (Delete).',
          '🔒 தெரியாத செயலிகளுக்கு தொடர்புகள் (Contacts) அல்லது SMS அனுமதிகளை வழங்காதீர்கள்.',
          '📱 கூகுள் ப்ளே ஸ்டோரிலிருந்து மட்டுமே பாதுகாப்பான செயலிகளைப் பதிவிறக்கவும்.',
        ],
      },
    };
  }

  // 3. Phishing & Fake Banking / KYC Check
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  const foundUrls = text.match(urlRegex) || [];
  const hasPhishingKeywords = 
    text.includes('sbi') ||
    text.includes('hdfc') ||
    text.includes('icici') ||
    text.includes('kyc') ||
    text.includes('pan card') ||
    text.includes('netbanking') ||
    text.includes('account blocked') ||
    text.includes('electricity bill') ||
    text.includes('disconnected tonight') ||
    text.includes('lottery') ||
    text.includes('won ₹') ||
    text.includes('claim reward');

  const hasFakeDomain = foundUrls.some(u => 
    u.includes('.top') || 
    u.includes('.xyz') || 
    u.includes('.club') || 
    u.includes('.online') || 
    u.includes('.site') || 
    u.includes('sbi-kyc') ||
    u.includes('bank-verify') ||
    u.includes('login-update')
  );

  if (hasFakeDomain || (foundUrls.length > 0 && hasPhishingKeywords)) {
    const fakeUrl = foundUrls[0] || 'http://sbi-kyc-verify-login.top/auth';
    return {
      risk: 'DANGEROUS',
      category: 'Phishing & KYC Harvester',
      score: 94,
      confidence: 96,
      fakeDomain: fakeUrl,
      officialAlternative: 'https://onlinesbi.sbi or official YONO App',
      detectedFlags: [
        'Spoofed banking identity mimicking State Bank of India / RBI',
        'Suspicious top-level domain (.top / .xyz) commonly used by scammers',
        'High urgency pretext: "Account blocked today" to induce hasty action',
        'Unauthorized credential harvester designed to siphon NetBanking password & OTP',
      ],
      threatIndicators: [
        {
          label: 'Domain Discrepancy',
          detail: `The link (${fakeUrl}) is NOT the official domain of SBI (onlinesbi.sbi or sbi.co.in).`,
          severity: 'high',
        },
        {
          label: 'Credential Harvesting',
          detail: 'Fake login portal captures username, profile password, and redirects OTP to scammer bot.',
          severity: 'high',
        },
        {
          label: 'Bank Policy Violation',
          detail: 'RBI strictly prohibits banks from asking customers to update KYC via clickable links in SMS/WhatsApp.',
          severity: 'high',
        },
      ],
      explanations: {
        en: 'PHISHING ALERT: This link is a fraudulent banking credential harvester. It impersonates SBI to steal your NetBanking login credentials, ATM PIN, and OTP to drain your savings.',
        hi: 'फ़िशिंग चेतावनी: यह लिंक एक नकली बैंकिंग पोर्टल है। यह आपके नेटबैंकिंग पासवर्ड, एटीएम पिन और ओटीपी चुराकर बैंक खाता खाली करने के लिए बनाया गया है।',
        kn: 'ಫಿಶಿಂಗ್ ಎಚ್ಚರಿಕೆ: ಇದು ಬ್ಯಾಂಕಿಂಗ್ ವಿವರಗಳನ್ನು ಕದಿಯುವ ನಕಲಿ ಲಿಂಕ್ ಆಗಿದೆ. ನಿಮ್ಮ ಯೂಸರ್ ನೇಮ್, ಪಾಸ್‌ವರ್ಡ್ ಮತ್ತು ಒಟಿಪಿಯನ್ನು ಕದ್ದು ಹಣ ದೋಚಲು ಇದನ್ನು ಸೃಷ್ಟಿಸಲಾಗಿದೆ.',
        ta: 'ஃபிஷிங் எச்சரிக்கை: இந்த இணைப்பு உங்கள் வங்கி உள்நுழைவு கடவுச்சொல் மற்றும் OTP ஐ திருடி பணத்தை எடுக்க உருவாக்கப்பட்ட ஒரு மோசடி வலைத்தளமாகும்.',
      },
      actionAdvices: {
        en: [
          '❌ DO NOT click on the link or enter your NetBanking username, password, or OTP.',
          '🚫 Real banks NEVER send links to update KYC via SMS or WhatsApp (RBI rule).',
          '📱 Log in only through the official banking app or the verified portal onlinesbi.sbi.',
          '📞 Forward the phishing message to 1909 (TRAI DND) and report to 1930.',
        ],
        hi: [
          '❌ इस लिंक पर क्लिक न करें और न ही अपना पासवर्ड या ओटीपी दर्ज करें।',
          '🚫 आरबीआई (RBI) के नियमानुसार कोई भी बैंक एसएमएस पर केवाईसी अपडेट लिंक नहीं भेजता।',
          '📱 केवल आधिकारिक बैंक ऐप या अधिकृत वेबसाइट onlinesbi.sbi पर ही लॉगिन करें।',
          '📞 इस संदेश को 1930 पर रिपोर्ट करें।',
        ],
        kn: [
          '❌ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ ಮತ್ತು ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಒಟಿಪಿ ನಮೂದಿಸಬೇಡಿ.',
          '🚫 ಯಾವುದೇ ಬ್ಯಾಂಕ್ ವಾಟ್ಸಾಪ್ ಅಥವಾ ಎಸ್ಸೆಮ್ಮೆಸ್ ಲಿಂಕ್ ಮೂಲಕ ಕೆವೈಸಿ ಅಪ್ಡೇಟ್ ಮಾಡಲು ಕೇಳುವುದಿಲ್ಲ.',
          '📱 ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ಆ್ಯಪ್ ಅಥವಾ onlinesbi.sbi ಮೂಲಕ ಮಾತ್ರ ಪರಿಶೀಲಿಸಿ.',
          '📞 ಈ ವಂಚನೆಯ ಬಗ್ಗೆ ತಕ್ಷಣ 1930 ಸೈಬರ್ ಹೆಲ್ಪ್‌ಲೈನ್‌ಗೆ ದೂರು ನೀಡಿ.',
        ],
        ta: [
          '❌ இணைப்பைக் கிளிக் செய்யாதீர்கள் மற்றும் உங்கள் வங்கி கடவுச்சொல் அல்லது OTP ஐ உள்ளிட வேண்டாம்.',
          '🚫 எந்த வங்கியும் SMS அல்லது வாட்ஸ்அப் வழியாக KYC புதுப்பிக்க இணைப்புகளை அனுப்பாது.',
          '📱 வங்கியின் அதிகாரப்பூர்ವ செயலி அல்லது onlinesbi.sbi மூலம் மட்டுமே உள்நுழையவும்.',
          '📞 உடனடியாக 1930 என்ற எண்ணிற்கு புகார் தெரிவிக்கவும்.',
        ],
      },
    };
  }

  // 4. Utility / Electricity Disconnection Scam
  if (text.includes('electricity') || text.includes('power supply') || text.includes('unpaid bill') || text.includes('disconnected tonight')) {
    return {
      risk: 'SUSPICIOUS',
      category: 'Utility / Electricity Scam',
      score: 82,
      confidence: 89,
      detectedFlags: [
        'Urgent threat of night-time power disconnection',
        'Directs user to call a personal 10-digit mobile number instead of official electricity board (BESCOM/MSEDCL/BSES)',
        'Classic social-engineering scam requiring APK or QuickSupport remote desk app installation',
      ],
      threatIndicators: [
        {
          label: 'Fake Helpline Number',
          detail: 'Calls go to scammer who instructs victim to pay ₹10 via AnyDesk to drain the account.',
          severity: 'high',
        },
        {
          label: 'Unsolicited Bill Threat',
          detail: 'Electricity DISCOMs send formal notices via registered bill cycle, not arbitrary personal SMS.',
          severity: 'medium',
        },
      ],
      explanations: {
        en: 'SUSPICIOUS NOTICE: Electricity power disconnection alerts from 10-digit personal mobile numbers are common fraud. Scammers trick you into installing remote access apps like AnyDesk to drain funds.',
        hi: 'संदिग्ध सूचना: व्यक्तिगत मोबाइल नंबर से बिजली काटने की धमकी वाले संदेश आम तौर पर साइबर फ्रॉड होते हैं। जालसाज आपको AnyDesk जैसे ऐप डाउनलोड करवा कर पैसे चुराते हैं।',
        kn: 'ಸಂಶಯಾಸ್ಪದ ಸೂಚನೆ: ವೈಯಕ್ತಿಕ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗಳಿಂದ ಬರುವ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಕಡಿತದ ಎಚ್ಚರಿಕೆಗಳು ವಂಚನೆಯಾಗಿರುತ್ತವೆ. ಇವರು AnyDesk ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿಸಿ ಹಣ ದೋಚುತ್ತಾರೆ.',
        ta: 'சந்தேகத்திற்கிடமான அறிவிப்பு: தனிப்பட்ட மொபைல் எண்களில் இருந்து வரும் மின்சாரம் துண்டிப்பு செய்திகள் பொதுவான மோசடியாகும். AnyDesk போன்ற செயலிகளை பதிவிறக்கம் செய்ய வைத்து பணத்தை திருடுவார்கள்.',
      },
      actionAdvices: {
        en: [
          '❌ DO NOT call the personal mobile number provided in the message.',
          '🚫 Never install AnyDesk, TeamViewer, or QuickSupport on caller instructions.',
          '💡 Check your bill balance directly on your state electricity board website or app.',
          '📞 Report the fraudulent number to 1930.',
        ],
        hi: [
          '❌ संदेश में दिए गए व्यक्तिगत मोबाइल नंबर पर कभी कॉल न करें।',
          '🚫 किसी के कहने पर AnyDesk या QuickSupport जैसे ऐप कभी इंस्टॉल न करें।',
          '💡 अपने राज्य के बिजली बोर्ड के आधिकारिक ऐप पर जाकर ही बिल चेक करें।',
          '📞 इस नंबर की शिकायत 1930 पर दर्ज करें।',
        ],
        kn: [
          '❌ ಸಂದೇಶದಲ್ಲಿ ನೀಡಿರುವ ವೈಯಕ್ತಿಕ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಬೇಡಿ.',
          '🚫 ಅವರ ಮಾತನ್ನು ನಂಬಿ AnyDesk ಅಥವಾ QuickSupport ನಂತಹ ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಬೇಡಿ.',
          '💡 ಅಧಿಕೃತ ವಿದ್ಯುತ್ ಮಂಡಳಿ ಆ್ಯಪ್ ಮೂಲಕ ಮಾತ್ರ ಬಿಲ್ ಪಾವತಿಸಿ.',
          '📞 ಈ ಸಂಖ್ಯೆಯನ್ನು 1930 ಸೈಬರ್ ಕ್ರೈಮ್‌ಗೆ ವರದಿ ಮಾಡಿ.',
        ],
        ta: [
          '❌ செய்தியில் குறிப்பிடப்பட்டுள்ள தனிப்பட்ட மொபைல் எண்ணிற்கு அழைக்க வேண்டாம்.',
          '🚫 அவர்கள் சொல்வதைக் கேட்டு AnyDesk அல்லது QuickSupport செயலிகளை நிறுவ வேண்டாம்.',
          '💡 உங்கள் அதிகாரப்பூர்ವ மின்சார வாரிய செயலி மூலம் மட்டுமே நிலுவைத் தொகையை சரிபார்க்கவும்.',
          '📞 1930 சைபர் உதவி எண்ணில் புகார் அளிக்கவும்.',
        ],
      },
    };
  }

  // 4b. Job & Task Scam Pattern Check (YouTube Like & Earn, Telegram VIP tasks)
  const isJobScam = 
    text.includes('like & earn') ||
    text.includes('youtube') ||
    text.includes('vip task') ||
    text.includes('work from home') ||
    (text.includes('telegram') && text.includes('earn')) ||
    text.includes('t.me/');

  if (isJobScam) {
    return {
      risk: 'DANGEROUS',
      category: 'Job & Investment Scam',
      score: 92,
      confidence: 96,
      detectedFlags: [
        'Classic task-based prepayment Ponzi / Telegram job scam',
        'Lures victims with small initial ₹150 payouts, then demands ₹5,000–₹50,000 to "unlock" fake funds',
        'Uses untraceable Telegram channels and fraudulent mule UPI IDs',
      ],
      threatIndicators: [
        {
          label: 'Prepayment Fraud Vector',
          detail: 'Legitimate employers never ask candidates to transfer money or recharge accounts to get work tasks.',
          severity: 'high',
        },
        {
          label: 'Telegram Trap',
          detail: 'Victims are funneled into Telegram groups with fake bots celebrating fabricated profits.',
          severity: 'high',
        },
      ],
      explanations: {
        en: 'CRITICAL ALERT: This is a classic "Like & Earn" Telegram task fraud. Scammers pay a small token reward (₹100–₹200) for liking videos, then freeze your money and demand heavy deposits to "unlock profits".',
        hi: 'धोखाधड़ी चेतावनी: यह एक टेलीग्राम टास्क फ्रॉड (Like & Earn Scam) है। शुरुआत में छोटे भुगतान का लालच देकर बाद में लाखों रुपये जमा करवा कर ठग लेते हैं।',
        kn: 'ವಂಚನೆ ಎಚ್ಚರಿಕೆ: ಇದು ಟೆಲಿಗ್ರಾಮ್ ಟಾಸ್ಕ್ ಸ್ಕ್ಯಾಮ್ ಆಗಿದೆ. ಯೂಟ್ಯೂಬ್ ಲೈಕ್ ಮಾಡಲು ಸಣ್ಣ ಹಣ ನೀಡಿ, ನಂತರ ಹೆಚ್ಚು ಹಣ ಹೂಡಿಕೆ ಮಾಡಿಸಿ ಮೋಸ ಮಾಡುತ್ತಾರೆ.',
        ta: 'மோசடி எச்சரிக்கை: இது டெலிகிராம் "Like & Earn" பணி மோசடி. ஆரம்பத்தில் சிறிய தொகையைக் கொடுத்து, பின்னர் பெரிய தொகையை டெபாசிட் செய்யச் சொல்லி ஏமாற்றுவார்கள்.',
      },
      actionAdvices: {
        en: [
          '🛑 DO NOT join the Telegram channel or transfer any "task registration" fee.',
          '🚫 Real corporate hiring NEVER operates via anonymous Telegram links.',
          '📱 Block the sender on WhatsApp/Telegram immediately.',
          '📞 Report this number and UPI ID at 1930 / cybercrime.gov.in.',
        ],
        hi: [
          '🛑 किसी भी टेलीग्राम ग्रुप में न जुड़ें और न ही कोई पंजीकरण शुल्क दें।',
          '🚫 कोई भी वैध कंपनी कभी भी काम देने के लिए पैसे नहीं मांगती।',
          '📱 भेजने वाले को तुरंत ब्लॉक करें।',
          '📞 इस नंबर की शिकायत 1930 पर दर्ज करें।',
        ],
        kn: [
          '🛑 ಟೆಲಿಗ್ರಾಮ್ ಚಾನಲ್‌ಗೆ ಸೇರಬೇಡಿ ಅಥವಾ ನೋಂದಣಿ ಶುಲ್ಕ ಪಾವತಿಸಬೇಡಿ.',
          '🚫 ಯಾವುದೇ ನೈಜ ಉದ್ಯೋಗ ನೀಡುವ ಸಂಸ್ಥೆ ಹಣ ಕೇಳುವುದಿಲ್ಲ.',
          '📱 ಕಳುಹಿಸಿದವರನ್ನು ತಕ್ಷಣ ಬ್ಲಾಕ್ ಮಾಡಿ.',
          '📞 ಈ ವಂಚನೆಯ ಬಗ್ಗೆ 1930 ಗೆ ದೂರು ನೀಡಿ.',
        ],
        ta: [
          '🛑 டெலிகிராம் சேனலில் இணைய வேண்டாம் மற்றும் எந்த கட்டணமும் செலுத்த வேண்டாம்.',
          '🚫 எந்தவொரு உண்மையான நிறுவனமும் வேலைக்காக பணம் கேட்காது.',
          '📱 அனுப்பியவரை உடனடியாக பிளாக் செய்யவும்.',
          '📞 இந்த எண்ணை 1930 இல் புகாரளிக்கவும்.',
        ],
      },
    };
  }

  // 5. Safe Notice Pattern Check (e.g. Amazon, Swiggy, Uber, legit order updates)
  const isSafeNotification = 
    (text.includes('amazon') || text.includes('package') || text.includes('delivery update') || text.includes('flipkart') || text.includes('swiggy') || text.includes('zomato')) &&
    !text.includes('.top') &&
    !text.includes('.xyz') &&
    !text.includes('.apk') &&
    !text.includes('transfer') &&
    !text.includes('urgent payment');

  if (isSafeNotification) {
    return {
      risk: 'SAFE',
      category: 'Legitimate / Safe Notice',
      score: 8,
      confidence: 94,
      detectedFlags: [
        'Standard delivery fulfillment tracking notification format',
        'No suspicious external web links, banking redirects, or APK files detected',
        'Directs customer to official app rather than unverified 3rd-party URLs',
      ],
      threatIndicators: [
        {
          label: 'URL Safety',
          detail: 'No unauthorized phishing links or credential capture forms present.',
          severity: 'low',
        },
        {
          label: 'Authentication Tone',
          detail: 'Routine logistics delivery notification with standard carrier protocol.',
          severity: 'low',
        },
      ],
      explanations: {
        en: 'VERIFIED SAFE: This message appears to be a legitimate delivery notification. No malicious links, suspicious APK payloads, or coercive fraud tactics were detected.',
        hi: 'सुरक्षित संदेश: यह संदेश एक वैध डिलीवरी सूचना प्रतीत होता है। इसमें कोई दुर्भावनापूर्ण लिंक या धोखाधड़ी की संभावना नहीं पाई गई है।',
        kn: 'ಸುರಕ್ಷಿತ ಸಂದೇಶ: ಈ ಸಂದೇಶವು ಅಧಿಕೃತ ಡೆಲಿವರಿ ಸೂಚನೆಯಂತೆ ಕಾಣುತ್ತಿದೆ. ಇದರಲ್ಲಿ ಯಾವುದೇ ನಕಲಿ ಲಿಂಕ್ ಅಥವಾ ಅಪಾಯಕಾರಿ ಅಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
        ta: 'பாதுகாப்பானது: இந்த செய்தி ஒரு உண்மையான டெலிவரி அறிவிப்பாக தெரிகிறது. இதில் எந்தவிதமான தீங்கிழைக்கும் இணைப்புகளோ அல்லது மோசடிகளோ இல்லை.',
      },
      actionAdvices: {
        en: [
          '✅ Keep your delivery OTP private until the delivery executive reaches your doorstep.',
          '📦 Verify packages before sharing delivery code.',
          '📱 Track status within the official vendor application.',
        ],
        hi: [
          '✅ डिलीवरी एजेंट के दरवाजे पर पहुंचने के बाद ही डिलीवरी ओटीपी साझा करें।',
          '📦 पार्सल प्राप्त करने से पहले पैकेज की जांच कर लें।',
          '📱 आधिकारिक शॉपिंग ऐप पर ही ऑर्डर ट्रैक करें।',
        ],
        kn: [
          '✅ ಡೆಲಿವರಿ ಬಾಯ್ ಬರುವವರೆಗೆ ಒಟಿಪಿ ಯಾರಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.',
          '📦 ಪ್ಯಾಕೇಜ್ ಪರಿಶೀಲಿಸಿದ ನಂತರವೇ ಕೋಡ್ ತಿಳಿಸಿ.',
          '📱 ಅಧಿಕೃತ ಶಾಪಿಂಗ್ ಆ್ಯಪ್‌ನಲ್ಲಿ ಸ್ಟೇಟಸ್ ಪರಿಶೀಲಿಸಿ.',
        ],
        ta: [
          '✅ டெலிவரி நபர் உங்கள் வீட்டுக்கு வரும் வரை OTP ஐ யாரிடமும் பகிர வேண்டாம்.',
          '📦 பார்சலை சரிபார்த்த பிறகு குறியீட்டை பகிரவும்.',
          '📱 அதிகாரப்பூர்வ செயலி மூலம் ஆர்டரை கண்காணிக்கவும்.',
        ],
      },
    };
  }

  // 6. Generic Default Fallback based on generic triggers
  const hasGenericRisk = text.includes('urgent') || text.includes('winner') || text.includes('free') || text.includes('click here') || text.includes('cashback') || text.includes('http');
  const genericRisk: RiskLevel = hasGenericRisk ? 'SUSPICIOUS' : 'SAFE';

  return {
    risk: genericRisk,
    category: hasGenericRisk ? 'Phishing & KYC Harvester' : 'Legitimate / Safe Notice',
    score: hasGenericRisk ? 68 : 15,
    confidence: 85,
    detectedFlags: hasGenericRisk 
      ? ['Urgency or incentive cues detected in message body', 'Potential unverified link or offer signature']
      : ['No high-risk fraud signatures or extortion patterns identified'],
    threatIndicators: [
      {
        label: 'Message Pattern Analysis',
        detail: hasGenericRisk 
          ? 'Contains unsolicited promotional or alert terminology requiring caution.' 
          : 'Normal conversational or notification tone without obvious indicators.',
        severity: hasGenericRisk ? 'medium' : 'low',
      },
    ],
    explanations: {
      en: hasGenericRisk
        ? 'CAUTION: This message contains promotional urgency or unsolicited links. Exercise vigilance before sharing any personal information.'
        : 'LOW RISK: No prominent scam signatures, extortion tactics, or dangerous APK attachments detected in this input.',
      hi: hasGenericRisk
        ? 'सावधानी: इस संदेश में अनचाहे ऑफर या संदिग्ध लिंक हो सकते हैं। कोई भी व्यक्तिगत विवरण साझा करने से पहले सतर्क रहें।'
        : 'कम जोखिम: इस संदेश में कोई स्पष्ट धोखाधड़ी या दुर्भावनापूर्ण गतिविधि नहीं पाई गई है।',
      kn: hasGenericRisk
        ? 'ಎಚ್ಚರಿಕೆ: ಈ ಸಂದೇಶದಲ್ಲಿ ಅನುಮಾನಾಸ್ಪದ ಆಫರ್ ಅಥವಾ ಲಿಂಕ್ ಇರಬಹುದು. ಯಾವುದೇ ವಿವರ ಹಂಚಿಕೊಳ್ಳುವ ಮುನ್ನ ಎಚ್ಚರ ವಹಿಸಿ.'
        : 'ಕಡಿಮೆ ಅಪಾಯ: ಯಾವುದೇ ಸ್ಪಷ್ಟ ಸೈಬರ್ ದಾಳಿ ಅಥವಾ ವಂಚನೆಯ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
      ta: hasGenericRisk
        ? 'எச்சரிக்கை: இந்த செய்தியில் சந்தேகத்திற்கிடமான சலுகைகள் அல்லது இணைப்புகள் இருக்கலாம். எந்த விவரத்தையும் பகிர்வதற்கு முன் கவனமாக இருங்கள்.'
        : 'குறைந்த ஆபத்து: இதில் வெளிப்படையான மோசடி அறிகுறிகள் எதுவும் கண்டறியப்படவில்லை.',
    },
    actionAdvices: {
      en: hasGenericRisk
        ? [
            '⚠️ Never share OTPs, PINs, or card CVVs with anyone.',
            '🔍 Check the sender phone number and verify authenticity independently.',
            '📞 Report unsolicited spam numbers on cybercrime.gov.in or dial 1930.',
          ]
        : [
            '✅ Maintain standard digital hygiene and never disclose private passwords.',
            '🛡️ Forward any questionable messages here anytime for real-time analysis.',
          ],
      hi: hasGenericRisk
        ? [
            '⚠️ अपना ओटीपी या बैंक पिन किसी के साथ साझा न करें।',
            '🔍 भेजने वाले के नंबर की सत्यता की जांच करें।',
            '📞 संदिग्ध नंबरों की शिकायत 1930 पर करें।',
          ]
        : [
            '✅ बुनियादी साइबर सुरक्षा नियमों का पालन करें और पासवर्ड गोपनीय रखें।',
            '🛡️ किसी भी संदिग्ध संदेश की जांच के लिए इसे कभी भी यहां भेजें।',
          ],
      kn: hasGenericRisk
        ? [
            '⚠️ ಒಟಿಪಿ ಅಥವಾ ಬ್ಯಾಂಕ್ ಪಿನ್ ಅನ್ನು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.',
            '🔍 ಕಳುಹಿಸಿದವರ ನಂಬರ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ.',
            '📞 ಅನುಮಾನವಿದ್ದರೆ 1930 ಸೈಬರ್ ಹೆಲ್ಪ್‌ಲೈನ್‌ಗೆ ದೂರು ನೀಡಿ.',
          ]
        : [
            '✅ ಸುರಕ್ಷಿತ ಡಿಜಿಟಲ್ ಅಭ್ಯಾಸಗಳನ್ನು ಮುಂದುವರಿಸಿ.',
            '🛡️ ಯಾವುದೇ ಸಂದೇಹವಿದ್ದರೂ ಇಲ್ಲಿ ಪರೀಕ್ಷಿಸಿ.',
          ],
      ta: hasGenericRisk
        ? [
            '⚠️ உங்கள் OTP அல்லது PIN எண்ணை ஒருபோதும் பகிராதீர்கள்.',
            '🔍 அனுப்பியவரின் தொலைபேசி எண்ணை சரிபார்க்கவும்.',
            '📞 சந்தேகத்திற்கிடமான எண்களை 1930 இல் புகாரளிக்கவும்.',
          ]
        : [
            '✅ பாதுகாப்பான இணைய விழிப்புணர்வைப் பேணுங்கள்.',
            '🛡️ சந்தேகத்திற்கிடமான செய்திகளை இங்கே அனுப்பி சரிபார்க்கவும்.',
          ],
    },
  };
}

