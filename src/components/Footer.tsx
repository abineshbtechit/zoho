import React from 'react';
import { Heart, Phone, ShieldCheck, Mail, Globe, Layers, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenCatalystModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenCatalystModal }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center p-0.5 shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Life<span className="text-emerald-400">Link</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering healthcare organ donation ecosystems. LifeLink matches registered organ donors and recipients securely using medical compatibility scoring, blood group matrices, and doctor verification.
            </p>

            {/* EMERGENCY HOTLINE BANNER */}
            <div className="inline-flex items-center space-x-3 bg-emerald-950/70 border border-emerald-500/30 px-4 py-2.5 rounded-2xl">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 animate-pulse">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                  24/7 Transplant Emergency Hotline
                </p>
                <p className="text-sm font-extrabold text-white">
                  1-800-LIFELINK <span className="text-xs font-normal text-slate-400">(1-800-543-3546)</span>
                </p>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-200 mb-4">
              Platform Features
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button onClick={() => setActiveTab('donor-register')} className="hover:text-emerald-400 transition-colors">
                  Organ Donor Registration
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('organ-request')} className="hover:text-emerald-400 transition-colors">
                  Recipient Request Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('track')} className="hover:text-emerald-400 transition-colors">
                  Track Request Status
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-emerald-400 transition-colors">
                  Blood Group Compatibility
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('donor-dashboard')} className="hover:text-emerald-400 transition-colors">
                  Digital Organ Pledge Card
                </button>
              </li>
            </ul>
          </div>

          {/* MEDICAL & ADMIN */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-200 mb-4">
              Admin & Medical
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button onClick={() => setActiveTab('admin-dashboard')} className="hover:text-amber-400 transition-colors flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Dashboard</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('login')} className="hover:text-emerald-400 transition-colors">
                  Hospital Partner Login
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('choose-role')} className="hover:text-emerald-400 transition-colors">
                  Choose Role Switcher
                </button>
              </li>
              <li>
                <button onClick={onOpenCatalystModal} className="hover:text-cyan-400 transition-colors flex items-center space-x-1">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Zoho Catalyst Specs</span>
                </button>
              </li>
            </ul>
          </div>

          {/* TECH STACK & HOSTING */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-200 mb-4">
              Powered By Catalyst
            </h4>
            <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>Frontend:</span>
                <span className="text-emerald-400 font-mono">Slate</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>Backend API:</span>
                <span className="text-cyan-400 font-mono">AppSail</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>Database:</span>
                <span className="text-amber-400 font-mono">Data Store</span>
              </div>
              <button
                onClick={onOpenCatalystModal}
                className="w-full mt-2 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold transition-all flex items-center justify-center space-x-1"
                id="btn-footer-catalyst"
              >
                <span>View Catalyst Setup</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM LEGAL DISCLAIMER */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} LifeLink Organ Donation Management System. Built for Healthcare Excellence.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">HIPAA & GDPR Compliance Guidelines</span>
            <span className="hover:text-slate-400 cursor-pointer">Ethical Organ Allocation Rules</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
