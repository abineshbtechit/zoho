import React from 'react';
import { Heart, Activity, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface ChooseRolePageProps {
  setActiveTab: (tab: string) => void;
}

export const ChooseRolePage: React.FC<ChooseRolePageProps> = ({ setActiveTab }) => {
  const { switchRole } = useAuth();

  const handleSelectRole = async (role: UserRole) => {
    await switchRole(role);
    if (role === 'admin') setActiveTab('admin-dashboard');
    else if (role === 'donor') setActiveTab('donor-dashboard');
    else if (role === 'recipient') setActiveTab('recipient-dashboard');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          User Role Selector
        </span>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Choose How You Wish to Access LifeLink
        </h1>
        <p className="text-slate-600 text-sm font-medium max-w-xl mx-auto">
          Select your portal below to enter with a pre-configured verified demo profile or log in with custom credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* DONOR CARD */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6 hover:shadow-2xl hover:border-emerald-300 transition-all group flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md">
              <Heart className="w-7 h-7 fill-emerald-600" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">Role 01</span>
              <h3 className="text-2xl font-black text-slate-900">Organ Donor</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Pledge your organs, manage health details, view your official Digital Organ Donor Pledge Badge, and track donation status.
            </p>
          </div>

          <button
            onClick={() => handleSelectRole('donor')}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2"
            id="btn-choose-donor"
          >
            <span>Enter as Registered Donor</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* RECIPIENT CARD */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6 hover:shadow-2xl hover:border-cyan-300 transition-all group flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center shadow-md">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest block">Role 02</span>
              <h3 className="text-2xl font-black text-slate-900">Organ Recipient</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Submit an organ request with doctor details, track verification progress, and view compatibility matching updates.
            </p>
          </div>

          <button
            onClick={() => handleSelectRole('recipient')}
            className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-cyan-600/20 transition-all flex items-center justify-center space-x-2"
            id="btn-choose-recipient"
          >
            <span>Enter as Organ Recipient</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* ADMIN CARD */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-6 hover:shadow-2xl hover:border-amber-400 transition-all group flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shadow-md border border-amber-500/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Role 03</span>
              <h3 className="text-2xl font-black text-white">Medical Admin</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Access the complete management portal to verify donors/recipients, execute algorithmic matching, and inspect activity logs.
            </p>
          </div>

          <button
            onClick={() => handleSelectRole('admin')}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-2xl shadow-md shadow-amber-500/20 transition-all flex items-center justify-center space-x-2"
            id="btn-choose-admin"
          >
            <span>Enter as Medical Admin</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

    </div>
  );
};
