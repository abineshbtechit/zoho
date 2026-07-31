import React, { useEffect, useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2, Clock, Phone, Stethoscope, Plus, Sparkles, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Recipient, Match } from '../types';
import { MatchingScoreBadge } from '../components/MatchingScoreBadge';

interface RecipientDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const RecipientDashboard: React.FC<RecipientDashboardProps> = ({ setActiveTab }) => {
  const { user } = useAuth();
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipient = async () => {
      try {
        if (user?.id) {
          const res = await api.getRecipientByUserId(user.id);
          setRecipient(res);
          if (res?.matchId) {
            const matches = await api.getMatches();
            const found = matches.find(m => m.id === res.matchId);
            if (found) setMatch(found);
          }
        }
      } catch (err) {
        console.warn('Failed to load recipient:', err);
      } finally {
        setLoading(false);
      }
    };
    loadRecipient();
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-bold text-slate-500">Loading Recipient Portal...</p>
      </div>
    );
  }

  if (!recipient) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-cyan-100 text-cyan-600 rounded-3xl flex items-center justify-center mx-auto shadow-md">
          <Activity className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black text-slate-900">No Active Organ Request Found</h2>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          If you or a loved one requires an organ transplant, submit an organ request with your attending physician details.
        </p>
        <button
          onClick={() => setActiveTab('organ-request')}
          className="bg-cyan-600 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg shadow-cyan-600/30 hover:bg-cyan-700 transition-all text-xs inline-flex items-center space-x-2"
          id="btn-dash-request-now"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Organ Request</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
              Organ Recipient Request Tracking
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
              recipient.status === 'matched' ? 'bg-emerald-100 text-emerald-800' :
              recipient.status === 'approved' ? 'bg-cyan-100 text-cyan-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {recipient.status}
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Patient: {recipient.fullName}
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 font-bold text-slate-700">
            Request Code: {recipient.requestCode}
          </span>
        </div>
      </div>

      {/* MATCH FOUND ALERT CARD (IF MATCHED) */}
      {match ? (
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 border border-emerald-500/40 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-emerald-700/60 pb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
              <h3 className="text-lg font-black tracking-tight text-white">Compatible Donor Match Found!</h3>
            </div>
            <span className="bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase">
              {match.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Matched Organ</span>
                <p className="text-2xl font-black text-white">{match.organType} Transplant</p>
              </div>

              <div className="text-xs space-y-1 text-slate-300">
                <p>Donor Name: <strong className="text-white">{match.donorName}</strong></p>
                <p>Blood Compatibility: <strong className="text-emerald-400">{match.donorBloodGroup}</strong> → <strong className="text-cyan-400">{match.recipientBloodGroup}</strong></p>
                <p>Transplant Hospital: <strong className="text-white">{match.hospitalName}</strong></p>
              </div>
            </div>

            <MatchingScoreBadge
              score={match.compatibilityScore}
              donorBlood={match.donorBloodGroup}
              recipientBlood={match.recipientBloodGroup}
              organType={match.organType}
            />
          </div>

          <p className="text-xs bg-emerald-950/80 p-3 rounded-xl border border-emerald-500/30 text-emerald-200 font-medium">
            <strong>Transplant Coordinator Note:</strong> {match.notes}
          </p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-black text-lg">
            <Clock className="w-5 h-5 text-amber-500 animate-spin" />
            <span>Queued in Automated LifeLink Donor Search Engine</span>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Your request for <strong className="text-cyan-700 font-bold">{recipient.requestedOrgan}</strong> ({recipient.bloodGroup}) is currently active. Our matching engine continuously scans verified donor pledges across partner hospitals.
          </p>
        </div>
      )}

      {/* REQUEST DETAILS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="text-sm font-black text-slate-900 flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-600" />
            <span>Request Summary & Urgency</span>
          </h3>

          <div className="space-y-3 text-xs font-medium">
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
              <span>Requested Organ:</span>
              <strong className="text-sm font-extrabold text-slate-900">{recipient.requestedOrgan}</strong>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
              <span>Patient Blood Group:</span>
              <strong className="text-sm font-extrabold text-cyan-600">{recipient.bloodGroup}</strong>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
              <span>Urgency Index:</span>
              <span className={`px-2.5 py-0.5 rounded-full font-black uppercase text-[10px] ${
                recipient.urgencyLevel === 'critical' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {recipient.urgencyLevel} Urgency
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="text-sm font-black text-slate-900 flex items-center space-x-2">
            <Stethoscope className="w-4 h-4 text-emerald-600" />
            <span>Attending Doctor & Hospital</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Hospital Name:</span>
              <span className="font-bold text-slate-900 text-sm">{recipient.hospitalName}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Attending Doctor:</span>
              <span className="font-bold text-slate-900">{recipient.attendingDoctor} ({recipient.doctorPhone})</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
