# Cyber Security Awareness Platform: AI WhatsApp Guardian & Community Scam Defense

A modern, interactive, full-stack prototype built with **Next.js 15 (App Router)**, **Tailwind CSS**, and **Lucide React**, targeting three major fraud vectors targeting citizens:
1. **Phishing links & fake banking/KYC credential harvesters** (e.g. SBI/HDFC/PAN card spoofing).
2. **Digital Arrest scams** (coercive video calls pretending to be Mumbai Crime Branch, CBI, or Customs with fake warrants).
3. **Malicious APKs** (side-loaded predatory loan spyware and Trojan downloaders).

---

## 🌟 Key Features

### 1. WhatsApp Web Agent Simulator (Left Column)
- **WhatsApp Web UI**: Authentic Dark/Light theme, verified bot badge, online indicator, audio effects, read receipts.
- **Interactive Quick Presets**:
  - `[Phishing URL] Fake SBI KYC alert: http://sbi-kyc-verify-login.top/auth`
  - `[Digital Arrest] Impersonation script: 'DCP Crime Branch here. Narcotics found in parcel registered under your ID. Transfer bail security deposit immediately to avoid digital arrest.'`
  - `[Malicious APK] Upload: InstantLoan-Approval-v2.apk`
  - `[Safe Notice] Real notification: 'Amazon delivery update: Your package #8492 is out for delivery.'`
- **Chat Capabilities**:
  - Free-form text input & drag-and-drop file/APK upload.
  - Animated 700ms typing indicator.
  - Web Audio synthesis for message sound effects and alert alarms.
- **Structured Agent Verdict Cards**:
  - Risk Pill: `[SAFE 🟢]`, `[SUSPICIOUS 🟡]`, `[DANGEROUS 🔴]` with glowing hazard animation.
  - Threat Category Badge & Threat Score (0–100).
  - Plain-language explanation breakdown.
  - Clear, actionable safety advice.
  - **Dynamic Multilingual Selector**: Switch tips instantly between **English, Hindi (हिन्दी), Kannada (ಕನ್ನಡ), and Tamil (தமிழ்)**.
  - **"Report to Community Radar"**: Increments live community counters and injects anonymized threats into the regional radar stream.

### 2. Community Live Threat Radar & Awareness Hub (Right Column)
- **Live Counter Metrics**:
  - Total Scams Inspected Today
  - Digital Arrest Attempts Intercepted
  - Malicious APKs Flagged
  - High-Risk Phishing Domains Blacklisted
- **Scam Trend Feed ("Trending in Your Region")**:
  - Filterable by Category (All, Phishing, Digital Arrest, Malicious APK).
  - Regional spike percentages (+46% in Maharashtra, +72% in Bengaluru).
  - "Test in Simulator" button to load threats directly into the WhatsApp simulator.
- **Weekly Safety Digest Simulator**:
  - Sunday morning digest preview with top modus operandi, Senior Citizen protection rules, and blacklisted APKs.
- **Roadmap Spotlight: Real-Time In-Call Audio Warning Engine**:
  - Live interactive modal simulating on-device acoustic detection during active extortion calls with waveform visualizer.
- **Citizen Legal Guide**:
  - Anatomy of Digital Arrest fraud and statutory clarification (Digital Arrest is 100% fake and unconstitutional under CrPC / BNSS).

---

## 🚀 1-Click Vercel CLI Deployment

This repository is optimized for zero-config Vercel deployment:

### Step 1: Initialize Vercel Project Link
In the project root directory, run:
```bash
npx vercel
```
*When prompted, sign in via your browser, confirm your team, and accept the default build settings.*

### Step 2: Deploy to Production
```bash
npx vercel --prod
```
Vercel will output your live URL (e.g. `https://cyber-guardian-platform.vercel.app`).

---

## 🛠️ Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Production Build Check
```bash
npm run build
```
Verify that the output reports zero build or type errors.

