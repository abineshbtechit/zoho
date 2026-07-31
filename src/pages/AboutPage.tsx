import React from 'react';
import { Heart, ShieldCheck, Award, Users, Stethoscope, Building2, BookOpen, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  setActiveTab: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Mission & Healthcare Ethics
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Saving Lives Through Verified Organ Matching
        </h1>
        <p className="text-slate-600 text-base font-medium leading-relaxed">
          LifeLink is an advanced organ donation management platform engineered to connect donors, patients, and hospital transplant teams with zero friction and maximum ethical integrity.
        </p>
      </div>

      {/* THREE CORE PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 shadow-lg space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Heart className="w-6 h-6 fill-emerald-600" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Altruistic Pledging</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Every registered donor receives a digital verified Organ Pledge ID Card. We empower individuals to make informed, voluntary pledges that save lives.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 shadow-lg space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Doctor Verification</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            To maintain medical validity, all donor health records and recipient requests must be verified by attending doctors before entering the matching engine.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 shadow-lg space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Ethical Allocation</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Organ distribution strictly follows medical urgency indices, blood and tissue compatibility matrices, and non-discriminatory national organ registries.
          </p>
        </div>

      </div>

      {/* ORGAN COMPATIBILITY & IMPACT MATRIX */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Medical Knowledge Base</span>
          <h2 className="text-3xl font-black">Organs & Tissues Eligible for Donation</h2>
          <p className="text-xs text-slate-400">
            A single donor can donate multiple vital organs and tissues upon certified medical consent.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
            <span className="text-emerald-400 font-bold block">♥ Kidney</span>
            <span className="text-slate-400 text-[11px]">Can be donated by living or deceased donors. Most requested organ.</span>
          </div>

          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
            <span className="text-emerald-400 font-bold block">♥ Liver</span>
            <span className="text-slate-400 text-[11px]">Capable of regenerating. Living donor partial lobe transplants available.</span>
          </div>

          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
            <span className="text-cyan-400 font-bold block">♥ Heart</span>
            <span className="text-slate-400 text-[11px]">Critical life-saving organ. Requires immediate cold-ischemia transit timing.</span>
          </div>

          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
            <span className="text-cyan-400 font-bold block">♥ Lungs</span>
            <span className="text-slate-400 text-[11px]">Single or double lung transplants for end-stage respiratory disease.</span>
          </div>

          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
            <span className="text-amber-400 font-bold block">♥ Pancreas</span>
            <span className="text-slate-400 text-[11px]">Restores insulin regulation for severe type-1 diabetes patients.</span>
          </div>

          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
            <span className="text-amber-400 font-bold block">♥ Cornea</span>
            <span className="text-slate-400 text-[11px]">Restores sight to individuals affected by corneal blindness.</span>
          </div>

          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
            <span className="text-purple-400 font-bold block">♥ Bone Marrow</span>
            <span className="text-slate-400 text-[11px]">Stem cell transplants for leukemia and lymphoma patients.</span>
          </div>

          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
            <span className="text-purple-400 font-bold block">♥ Heart Valves / Tissue</span>
            <span className="text-slate-400 text-[11px]">Enhances recovery for burn victims and pediatric cardiac defect repairs.</span>
          </div>
        </div>
      </div>

    </div>
  );
};
