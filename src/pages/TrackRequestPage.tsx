import React, { useState } from 'react';
import { Search, Activity, CheckCircle2, Clock, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import { DonorBadgeCard } from '../components/DonorBadgeCard';

interface TrackRequestPageProps {
  setActiveTab: (tab: string) => void;
}

export const TrackRequestPage: React.FC<TrackRequestPageProps> = ({ setActiveTab }) => {
  const [code, setCode] = useState('LNK-REQ-4412');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await api.trackCode(code.trim());
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'No active donor pledge or organ request found with this code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* HEADER */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <Search className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Track Organ Pledge & Request Status
        </h1>
        <p className="text-slate-600 text-sm font-medium max-w-xl mx-auto">
          Enter your unique LifeLink reference code (e.g. <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-emerald-700">LNK-REQ-4412</code> or <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-emerald-700">LNK-DNR-8821</code>) to check live status.
        </p>
      </div>

      {/* SEARCH INPUT BAR */}
      <div className="bg-white/80 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto space-y-4">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter LNK-REQ-XXXX or LNK-DNR-XXXX"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider focus:outline-none focus:border-emerald-500"
              id="input-track-code"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-2xl text-xs shadow-md shadow-emerald-600/20 transition-all shrink-0"
            id="btn-submit-track"
          >
            {loading ? 'Searching Registry...' : 'Track Record'}
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
          <span>Try sample codes:</span>
          <button onClick={() => { setCode('LNK-REQ-4412'); }} className="text-emerald-600 hover:underline font-mono font-bold">LNK-REQ-4412</button>
          <span>•</span>
          <button onClick={() => { setCode('LNK-DNR-8821'); }} className="text-emerald-600 hover:underline font-mono font-bold">LNK-DNR-8821</button>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-200 max-w-2xl mx-auto text-center">
          {error}
        </div>
      )}

      {/* RESULTS SECTION */}
      {result && (
        <div className="max-w-3xl mx-auto space-y-6">
          {result.type === 'recipient' ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest block">Recipient Organ Request</span>
                  <h3 className="text-2xl font-black text-slate-900">{result.data.fullName}</h3>
                </div>
                <span className="bg-cyan-100 text-cyan-800 text-xs font-black px-3 py-1 rounded-full uppercase">
                  {result.data.status}
                </span>
              </div>

              {/* TIMELINE PROGRESS BAR */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Transplant Progression Timeline</span>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-extrabold">
                  <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
                    1. Submitted
                  </div>
                  <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
                    2. Doctor Verified
                  </div>
                  <div className={`p-2 rounded-xl border ${result.data.status === 'matched' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                    3. Match Found
                  </div>
                  <div className="p-2 bg-slate-50 text-slate-400 rounded-xl border border-slate-200">
                    4. Transplant Scheduled
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-medium bg-slate-50 p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Requested Organ</span>
                  <p className="font-extrabold text-slate-900">{result.data.requestedOrgan}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Blood Group</span>
                  <p className="font-extrabold text-cyan-600">{result.data.bloodGroup}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Hospital</span>
                  <p className="font-bold text-slate-800">{result.data.hospitalName}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Attending Doctor</span>
                  <p className="font-bold text-slate-800">{result.data.attendingDoctor}</p>
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                  Verified Digital Organ Pledge Record
                </span>
              </div>
              <DonorBadgeCard donor={result.data} />
            </div>
          )}
        </div>
      )}

    </div>
  );
};
