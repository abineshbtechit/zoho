import React, { useState } from 'react';
import {
  Heart,
  Activity,
  ShieldCheck,
  Search,
  Sparkles,
  Users,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Clock,
  Award,
  ChevronDown,
  Building2,
  FileCheck2,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { BloodGroup } from '../types';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
  const [selectedBlood, setSelectedBlood] = useState<BloodGroup>('O-');
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Blood Compatibility Map
  const bloodCompatibilityMap: Record<BloodGroup, { canGiveTo: BloodGroup[]; canReceiveFrom: BloodGroup[]; note: string }> = {
    'O-': {
      canGiveTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      canReceiveFrom: ['O-'],
      note: 'Universal Organ & Red Cell Donor. Extremely vital for critical emergency transplants.',
    },
    'O+': {
      canGiveTo: ['O+', 'A+', 'B+', 'AB+'],
      canReceiveFrom: ['O-', 'O+'],
      note: 'Most common blood group. High demand across all hospital networks.',
    },
    'A-': {
      canGiveTo: ['A-', 'A+', 'AB-', 'AB+'],
      canReceiveFrom: ['O-', 'A-'],
      note: 'Can donate to any A or AB positive or negative recipient.',
    },
    'A+': {
      canGiveTo: ['A+', 'AB+'],
      canReceiveFrom: ['O-', 'O+', 'A-', 'A+'],
      note: 'Compatible with A+ and AB+ organ recipients.',
    },
    'B-': {
      canGiveTo: ['B-', 'B+', 'AB-', 'AB+'],
      canReceiveFrom: ['O-', 'B-'],
      note: 'Rare blood group with high priority matching urgency.',
    },
    'B+': {
      canGiveTo: ['B+', 'AB+'],
      canReceiveFrom: ['O-', 'O+', 'B-', 'B+'],
      note: 'Compatible with B+ and AB+ recipients.',
    },
    'AB-': {
      canGiveTo: ['AB-', 'AB+'],
      canReceiveFrom: ['O-', 'A-', 'B-', 'AB-'],
      note: 'Can receive from any Rh-negative blood donor.',
    },
    'AB+': {
      canGiveTo: ['AB+'],
      canReceiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      note: 'Universal Recipient. Can safely accept organ transplants from any blood group.',
    },
  };

  const faqs = [
    {
      q: 'Who can register as an organ donor on LifeLink?',
      a: 'Anyone aged 18 or older can register as an organ donor. Individuals under 18 can register with parent or legal guardian consent. Medical suitability is verified by licensed attending doctors upon pledge.',
    },
    {
      q: 'How does the LifeLink Automated Matching Engine work?',
      a: 'Our algorithm checks verified donor and recipient profiles across exact or compatible blood group matrices, HLA tissue markers, medical urgency index (Critical / High / Moderate), and geographic proximity between partner hospitals.',
    },
    {
      q: 'Is my medical and personal data protected?',
      a: 'Yes. LifeLink adheres to strict HIPAA and GDPR data privacy standards. All medical records are encrypted, and identity details are only revealed to authorized hospital transplant coordinators.',
    },
    {
      q: 'Can living donors donate organs on LifeLink?',
      a: 'Yes. Living donors can register to donate a Kidney, segment of Liver, or Bone Marrow. Deceased pledge donors can pledge Heart, Lungs, Pancreas, Cornea, and Tissue.',
    },
    {
      q: 'How do admins and doctors verify donor/recipient requests?',
      a: 'Licensed medical administrators review uploaded hospital documentation, attending physician certifications, and laboratory renal/cardiac tests before setting approval status to Approved.',
    },
  ];

  const filteredFaqs = faqs.filter(
    f => f.q.toLowerCase().includes(faqSearch.toLowerCase()) || f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        {/* Soft Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-emerald-100/60 via-cyan-100/40 to-white rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* HERO TEXT */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Next-Gen Healthcare Organ Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Connecting Hope, <br />
                <span className="gradient-text">Saving Lives Globally.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl">
                LifeLink simplifies organ donation through verified medical profiles, automated blood group compatibility matching, and real-time hospital coordination.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('donor-register')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-4 rounded-xl font-bold text-sm shadow-xl shadow-emerald-200 emerald-glow transition-all flex items-center space-x-2"
                  id="hero-btn-pledge"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>Register as Organ Donor</span>
                </button>

                <button
                  onClick={() => setActiveTab('organ-request')}
                  className="bg-white hover:bg-slate-50 text-slate-800 px-7 py-4 rounded-xl font-bold text-sm border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex items-center space-x-2"
                  id="hero-btn-request"
                >
                  <Activity className="w-5 h-5 text-cyan-600" />
                  <span>Request Organ Transplant</span>
                </button>
              </div>

              {/* KEY TRUST BADGES */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-700">Verified Doctors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-700">HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-700">Instant Matching</span>
                </div>
              </div>

            </div>

            {/* HERO FLOATING GLASS CARDS & STATS */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80 space-y-6 relative z-10">
                
                {/* TOP STAT */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Live Impact Metric</span>
                    <span className="text-3xl font-black text-slate-900">1,482 Lives Saved</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-extrabold">
                    <Heart className="w-6 h-6 fill-emerald-600" />
                  </div>
                </div>

                {/* MATCHING PREVIEW CARD */}
                <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Live Match Found</span>
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-extrabold">
                      98% Compatibility
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-medium border-t border-slate-800 pt-3">
                    <div>
                      <p className="text-slate-400 text-[10px]">Donor</p>
                      <p className="font-bold text-white">Elena Rostova (A+)</p>
                      <p className="text-[11px] text-emerald-400 font-mono">Pledged: Kidney</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px]">Recipient</p>
                      <p className="font-bold text-white">Marcus Vance (A+)</p>
                      <p className="text-[11px] text-cyan-400 font-mono">Urgency: High</p>
                    </div>
                  </div>
                </div>

                {/* QUICK ACTION BANNER */}
                <button
                  onClick={() => setActiveTab('track')}
                  className="w-full py-3.5 px-4 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 rounded-2xl text-xs font-bold border border-emerald-200 transition-all flex items-center justify-between group"
                  id="hero-btn-track-quick"
                >
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-emerald-600" />
                    <span>Track existing request (Code e.g. LNK-REQ-4412)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>

              {/* FLOATING GLASS DECORATIVE BADGES */}
              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-slate-200 hidden sm:flex items-center space-x-3 z-20">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600 font-black">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">42 Partner Hospitals</p>
                  <p className="text-[10px] text-slate-500">Connected in real-time</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* EDITORIAL GLASS METRICS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass p-6 rounded-2xl hover:-translate-y-0.5 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Active Donors</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Heart className="w-4 h-4 fill-emerald-600" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tight">1,482</p>
            <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center">
              <span className="status-dot bg-emerald-500"></span> +12% from last month
            </p>
          </div>

          <div className="glass p-6 rounded-2xl hover:-translate-y-0.5 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Pending Requests</span>
              <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-600">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tight">24</p>
            <p className="text-xs font-semibold text-cyan-600 mt-1 flex items-center">
              <span className="status-dot bg-cyan-500"></span> High urgency priority
            </p>
          </div>

          <div className="glass p-6 rounded-2xl hover:-translate-y-0.5 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Match Accuracy</span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tight">98.4%</p>
            <p className="text-xs font-semibold text-amber-600 mt-1 flex items-center">
              <span className="status-dot bg-amber-500"></span> Exceeds 95% threshold
            </p>
          </div>

          <div className="glass p-6 rounded-2xl hover:-translate-y-0.5 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">Hospital Nodes</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tight">42 Networks</p>
            <p className="text-xs font-semibold text-indigo-600 mt-1 flex items-center">
              <span className="status-dot bg-indigo-500"></span> Real-time synchronization
            </p>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE BLOOD GROUP COMPATIBILITY MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80 space-y-8">
          
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              Interactive Medical Tool
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Organ & Blood Group Compatibility Matrix
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              Select a blood group to instantly visualize compatibility rules for organ transplantation.
            </p>
          </div>

          {/* BLOOD SELECTOR PILLS */}
          <div className="flex flex-wrap gap-2">
            {(['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] as BloodGroup[]).map((bg) => (
              <button
                key={bg}
                onClick={() => setSelectedBlood(bg)}
                className={`px-5 py-2.5 rounded-2xl font-black text-sm transition-all duration-200 ${
                  selectedBlood === bg
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                id={`btn-blood-${bg.replace('+', 'pos').replace('-', 'neg')}`}
              >
                {bg}
              </button>
            ))}
          </div>

          {/* COMPATIBILITY RESULTS DISPLAY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* CAN DONATE TO */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-emerald-800 tracking-wider">
                  Can Donate Organs To:
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Donor Role
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {bloodCompatibilityMap[selectedBlood].canGiveTo.map((targetBg) => (
                  <span
                    key={targetBg}
                    className="px-3 py-1.5 rounded-xl text-xs font-black bg-emerald-600 text-white shadow-sm"
                  >
                    {targetBg}
                  </span>
                ))}
              </div>
            </div>

            {/* CAN RECEIVE FROM */}
            <div className="bg-cyan-50/70 border border-cyan-200/80 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-cyan-800 tracking-wider">
                  Can Safely Accept Organs From:
                </span>
                <span className="text-xs font-bold text-cyan-600 bg-cyan-100 px-2.5 py-0.5 rounded-full">
                  Recipient Role
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {bloodCompatibilityMap[selectedBlood].canReceiveFrom.map((srcBg) => (
                  <span
                    key={srcBg}
                    className="px-3 py-1.5 rounded-xl text-xs font-black bg-cyan-600 text-white shadow-sm"
                  >
                    {srcBg}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <p className="text-xs font-semibold text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <strong>Medical Note for {selectedBlood}:</strong> {bloodCompatibilityMap[selectedBlood].note}
          </p>

        </div>
      </section>

      {/* 3. HOW IT WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
            Streamlined Healthcare Flow
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            How LifeLink Works
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            From pledge to transplant coordination in four secure, verified steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg font-black">
              01
            </div>
            <h3 className="text-lg font-black text-slate-900">User Registration</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Donors pledge organs and recipients submit medical requests with attending doctor details.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center text-lg font-black">
              02
            </div>
            <h3 className="text-lg font-black text-slate-900">Medical Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Medical administrators review blood tests, hospital records, and physician clearances.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-lg font-black">
              03
            </div>
            <h3 className="text-lg font-black text-slate-900">Algorithmic Match</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Automated matching engine scores compatibility across blood type, organ condition, and urgency.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg font-black">
              04
            </div>
            <h3 className="text-lg font-black text-slate-900">Transplant Execution</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Partner hospitals schedule surgical teams and coordinate organ transport logistics.
            </p>
          </div>

        </div>
      </section>

      {/* 4. STATISTICS COUNTER SECTION */}
      <section className="bg-slate-900 text-white py-16 border-y border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <p className="text-4xl sm:text-5xl font-black text-emerald-400">1,482+</p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Lives Saved</p>
            </div>

            <div className="space-y-1">
              <p className="text-4xl sm:text-5xl font-black text-cyan-400">890+</p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Registered Donors</p>
            </div>

            <div className="space-y-1">
              <p className="text-4xl sm:text-5xl font-black text-amber-400">98.4%</p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Match Accuracy Score</p>
            </div>

            <div className="space-y-1">
              <p className="text-4xl sm:text-5xl font-black text-teal-400">42</p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Partner Hospital Networks</p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Have Questions About Organ Donation?
          </h2>
          
          {/* SEARCH BAR */}
          <div className="relative max-w-md mx-auto pt-4">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-7" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm text-sm font-medium focus:outline-none focus:border-emerald-500"
              id="input-faq-search"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between hover:bg-slate-50 transition-colors"
                id={`btn-faq-${idx}`}
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-3xl font-black tracking-tight">Ready to Become a Gift of Life?</h2>
            <p className="text-sm text-emerald-100 font-medium">
              One registered organ donor can save up to 8 lives and improve 75 others. Register your pledge today.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('donor-register')}
              className="bg-slate-900 text-white hover:bg-slate-800 px-6 py-3.5 rounded-2xl font-black text-xs shadow-lg transition-all"
              id="cta-bottom-pledge"
            >
              Register as Donor
            </button>
            <button
              onClick={() => setActiveTab('organ-request')}
              className="bg-white text-emerald-900 hover:bg-emerald-50 px-6 py-3.5 rounded-2xl font-black text-xs shadow-lg transition-all"
              id="cta-bottom-request"
            >
              Request Organ
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
