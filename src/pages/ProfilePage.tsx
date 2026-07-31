import React from 'react';
import { User, Mail, Phone, ShieldCheck, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProfilePageProps {
  setActiveTab: (tab: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ setActiveTab }) => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 p-1 shadow-xl mx-auto flex items-center justify-center">
          <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user?.name}</h1>
        <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{user?.role} Profile</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">
          Account Details & Preferences
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Email</span>
            <span className="font-bold text-slate-900">{user?.email}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Blood Group</span>
            <span className="font-bold text-emerald-600">{user?.bloodGroup || 'O+'}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone</span>
            <span className="font-bold text-slate-900">{user?.phone || '+1 (555) 000-0000'}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">System ID</span>
            <span className="font-mono text-slate-600">{user?.id}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => {
              logout();
              setActiveTab('login');
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-red-50 text-red-600 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors"
            id="btn-profile-logout"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>

          <button
            onClick={() => setActiveTab(user?.role === 'donor' ? 'donor-dashboard' : user?.role === 'recipient' ? 'recipient-dashboard' : 'admin-dashboard')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
            id="btn-profile-goto-dashboard"
          >
            Go to Portal
          </button>
        </div>
      </div>

    </div>
  );
};
