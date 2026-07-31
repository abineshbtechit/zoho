import React, { useEffect, useState } from 'react';
import { Heart, ShieldCheck, Clock, Award, Activity, AlertCircle, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Donor } from '../types';
import { DonorBadgeCard } from '../components/DonorBadgeCard';

interface DonorDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const DonorDashboard: React.FC<DonorDashboardProps> = ({ setActiveTab }) => {
  const { user } = useAuth();
  const [donor, setDonor] = useState<Donor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDonor = async () => {
      try {
        if (user?.id) {
          const res = await api.getDonorByUserId(user.id);
          setDonor(res);
        }
      } catch (err) {
        console.warn('Failed to load donor:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDonor();
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-bold text-slate-500">Loading Donor Hub...</p>
      </div>
    );
  }

  if (!donor) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-md">
          <Heart className="w-8 h-8 fill-emerald-600" />
        </div>
        <h2 className="text-3xl font-black text-slate-900">No Active Donor Pledge Found</h2>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          You have not pledged your organs yet. Register your pledge today to receive your digital Organ Pledge ID badge.
        </p>
        <button
          onClick={() => setActiveTab('donor-register')}
          className="bg-emerald-600 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 transition-all text-xs inline-flex items-center space-x-2"
          id="btn-dash-pledge-now"
        >
          <Plus className="w-4 h-4" />
          <span>Complete Organ Donor Pledge</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* DASHBOARD HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Registered Organ Donor Profile
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
              donor.approvalStatus === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {donor.approvalStatus}
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome, {donor.fullName}
          </h1>
        </div>

        <button
          onClick={() => setActiveTab('donor-register')}
          className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm flex items-center space-x-1.5"
          id="btn-edit-donor-pledge"
        >
          <Heart className="w-4 h-4 text-emerald-600" />
          <span>Update Pledge / Organs</span>
        </button>
      </div>

      {/* APPROVAL STATUS BANNER */}
      {donor.approvalStatus === 'pending' && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-amber-900 text-xs">
          <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-extrabold">Medical Verification In Progress</p>
            <p className="text-[11px] text-amber-800/80">
              Your pledge record (Code: <strong className="font-mono">{donor.donorCode}</strong>) is currently undergoing doctor verification at {donor.hospitalAffiliation}. Once verified, your status will update to Approved.
            </p>
          </div>
        </div>
      )}

      {/* DIGITAL DONOR PLEDGE CARD */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
          Digital Verified Organ Pledge Card
        </h3>
        <DonorBadgeCard donor={donor} triggerConfetti={donor.approvalStatus === 'approved'} />
      </div>

      {/* MEDICAL SPECIFICATIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="text-sm font-black text-slate-900 flex items-center space-x-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Organ Health & Medical Evaluation</span>
          </h3>

          <div className="space-y-3 text-xs font-medium text-slate-600">
            <div className="flex justify-between items-center">
              <span>Organ Viability Index:</span>
              <span className="font-extrabold text-emerald-600 text-sm">{donor.organConditionScore}/100 Score</span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{ width: `${donor.organConditionScore}%` }}
              ></div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Medical Notes:</span>
              <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {donor.medicalHistory}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="text-sm font-black text-slate-900 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-cyan-600" />
            <span>Emergency Contact & Hospital</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Hospital Partner:</span>
              <span className="font-bold text-slate-900 text-sm">{donor.hospitalAffiliation}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Emergency Contact:</span>
              <span className="font-bold text-slate-900">{donor.emergencyContactName} ({donor.emergencyContactPhone})</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
