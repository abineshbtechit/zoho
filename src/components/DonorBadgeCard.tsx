import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, ShieldCheck, Download, Sparkles, QrCode, Award } from 'lucide-react';
import { Donor } from '../types';

interface DonorBadgeCardProps {
  donor: Donor;
  triggerConfetti?: boolean;
}

export const DonorBadgeCard: React.FC<DonorBadgeCardProps> = ({ donor, triggerConfetti = false }) => {
  useEffect(() => {
    if (triggerConfetti) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#06b6d4', '#10b981'],
      });
    }
  }, [triggerConfetti]);

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-emerald-500/30 relative overflow-hidden space-y-6">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* TOP BRAND BAR */}
      <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-md">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Heart className="w-5 h-5 text-emerald-400 fill-emerald-400" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-extrabold tracking-tight">LifeLink</h3>
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              Verified Digital Organ Pledge ID
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            <span>Official Donor</span>
          </span>
        </div>
      </div>

      {/* MAIN CARD BODY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 items-center">
        
        {/* DONOR AVATAR / INITIALS */}
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 p-1 shadow-xl shadow-emerald-950/50">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
              <span className="text-3xl font-black text-emerald-400">
                {donor.fullName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400">Pledge Date</p>
            <p className="text-xs font-bold text-slate-200">{donor.pledgeDate}</p>
          </div>
        </div>

        {/* DONOR DETAILS */}
        <div className="md:col-span-2 space-y-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Donor Name</span>
            <h2 className="text-2xl font-black tracking-tight text-white">{donor.fullName}</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">Blood Group</span>
              <span className="text-lg font-extrabold text-emerald-400">{donor.bloodGroup}</span>
            </div>

            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">Donor ID Code</span>
              <span className="text-xs font-mono font-bold text-cyan-300">{donor.donorCode}</span>
            </div>

            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">Organ Health Score</span>
              <span className="text-sm font-black text-emerald-300">{donor.organConditionScore}/100</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Pledged Organs & Tissues
            </span>
            <div className="flex flex-wrap gap-1.5">
              {donor.organsToDonate.map((organ) => (
                <span
                  key={organ}
                  className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                >
                  ♥ {organ}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* FOOTER ACTIONS & QR PLACEHOLDER */}
      <div className="pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 relative z-10">
        <div className="flex items-center space-x-2">
          <QrCode className="w-8 h-8 text-slate-300 p-1 bg-slate-800 rounded" />
          <div>
            <p className="text-[11px] font-semibold text-slate-300">Affiliated Hospital:</p>
            <p className="text-xs text-emerald-400 font-bold">{donor.hospitalAffiliation}</p>
          </div>
        </div>

        <button
          onClick={handlePrintCard}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/30 flex items-center space-x-1.5"
          id="btn-print-donor-badge"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Save Digital Donor Card</span>
        </button>
      </div>
    </div>
  );
};
