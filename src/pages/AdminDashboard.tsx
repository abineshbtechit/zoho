import React, { useEffect, useState } from 'react';
import {
  ShieldCheck,
  Users,
  Heart,
  Activity,
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  Play,
  Clock,
  FileText,
  Filter,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { api } from '../services/api';
import { Donor, Recipient, Match, ActivityLog, BloodGroup, OrganType } from '../types';
import { MatchingScoreBadge } from '../components/MatchingScoreBadge';

interface AdminDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setActiveTab }) => {
  const [activeSubTab, setActiveSubTab] = useState<'donors' | 'recipients' | 'matching' | 'logs'>('donors');
  
  const [stats, setStats] = useState<any>(null);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodFilter, setBloodFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Reject Modal State
  const [rejectModal, setRejectModal] = useState<{ open: boolean; type: 'donor' | 'recipient'; id: string; name: string } | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [sData, dData, rData, mData, lData] = await Promise.all([
        api.getAdminStats(),
        api.getDonors(),
        api.getRecipients(),
        api.getMatches(),
        api.getLogs(),
      ]);
      setStats(sData);
      setDonors(dData);
      setRecipients(rData);
      setMatches(mData);
      setLogs(lData);
    } catch (err) {
      console.warn('Admin load data error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Donor Approval Actions
  const handleApproveDonor = async (id: string) => {
    await api.updateDonorStatus(id, 'approved');
    loadData();
  };

  const handleOpenReject = (type: 'donor' | 'recipient', id: string, name: string) => {
    setRejectReason('');
    setRejectModal({ open: true, type, id, name });
  };

  const handleConfirmReject = async () => {
    if (!rejectModal) return;
    if (rejectModal.type === 'donor') {
      await api.updateDonorStatus(rejectModal.id, 'rejected', rejectReason || 'Incomplete medical clearance');
    } else {
      await api.updateRecipientStatus(rejectModal.id, 'rejected', rejectReason || 'Unverified hospital documentation');
    }
    setRejectModal(null);
    loadData();
  };

  // Recipient Approval Actions
  const handleApproveRecipient = async (id: string) => {
    await api.updateRecipientStatus(id, 'approved');
    loadData();
  };

  // Run Matching Engine
  const handleRunMatching = async () => {
    await api.runMatchingEngine();
    loadData();
  };

  // Update Match Status
  const handleUpdateMatchStatus = async (matchId: string, newStatus: Match['status']) => {
    await api.updateMatchStatus(matchId, newStatus);
    loadData();
  };

  // Filtering Logic
  const filteredDonors = donors.filter(d => {
    const matchesSearch = d.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || d.donorCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBlood = bloodFilter === 'ALL' || d.bloodGroup === bloodFilter;
    const matchesStatus = statusFilter === 'ALL' || d.approvalStatus === statusFilter;
    return matchesSearch && matchesBlood && matchesStatus;
  });

  const filteredRecipients = recipients.filter(r => {
    const matchesSearch = r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || r.requestCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBlood = bloodFilter === 'ALL' || r.bloodGroup === bloodFilter;
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return matchesSearch && matchesBlood && matchesStatus;
  });

  if (loading && !stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-bold text-slate-500">Loading Medical Admin Console...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* ADMIN HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-extrabold text-amber-900 uppercase tracking-widest bg-amber-100 px-2.5 py-0.5 rounded-md">
              Medical Administrator Control Center
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight pt-1">
            LifeLink Admin Portal
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={loadData}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
            title="Refresh Data"
            id="btn-admin-refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleRunMatching}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black px-5 py-2.5 rounded-xl text-xs shadow-md shadow-emerald-600/20 flex items-center space-x-2 transition-all"
            id="btn-admin-run-matching"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Execute Algorithmic Matcher</span>
          </button>
        </div>
      </div>

      {/* TOP STATISTICAL ANALYTICS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Total Donors</span>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-black text-slate-900">{stats?.totalDonors || 0}</p>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {stats?.pendingDonors || 0} Pending
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Active Requests</span>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-black text-slate-900">{stats?.totalRecipients || 0}</p>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
              {stats?.criticalRecipients || 0} Critical
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Matches Generated</span>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-black text-slate-900">{stats?.totalMatches || 0}</p>
            <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">
              {stats?.activeMatches || 0} Active
            </span>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-3xl shadow-md space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-emerald-400 tracking-wider">Transplants Completed</span>
          <p className="text-3xl font-black text-white">{stats?.completedTransplants || 0}</p>
        </div>

      </div>

      {/* SUB-TAB NAVIGATION */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">
        <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveSubTab('donors')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeSubTab === 'donors'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            id="admin-subtab-donors"
          >
            Donor Approvals ({donors.length})
          </button>

          <button
            onClick={() => setActiveSubTab('recipients')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeSubTab === 'recipients'
                ? 'bg-white text-cyan-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            id="admin-subtab-recipients"
          >
            Recipient Requests ({recipients.length})
          </button>

          <button
            onClick={() => setActiveSubTab('matching')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeSubTab === 'matching'
                ? 'bg-white text-teal-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            id="admin-subtab-matching"
          >
            Organ Matching Engine ({matches.length})
          </button>

          <button
            onClick={() => setActiveSubTab('logs')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeSubTab === 'logs'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            id="admin-subtab-logs"
          >
            Audit Logs
          </button>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        {(activeSubTab === 'donors' || activeSubTab === 'recipients') && (
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-slate-400"
                id="input-admin-search"
              />
            </div>

            <select
              value={bloodFilter}
              onChange={(e) => setBloodFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
              id="select-admin-blood-filter"
            >
              <option value="ALL">All Blood Groups</option>
              {(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as BloodGroup[]).map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: DONORS TABLE */}
      {activeSubTab === 'donors' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Donor Name & Code</th>
                  <th className="p-4">Blood</th>
                  <th className="p-4">Pledged Organs</th>
                  <th className="p-4">Condition Score</th>
                  <th className="p-4">Hospital Partner</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredDonors.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <p className="font-extrabold text-slate-900">{d.fullName}</p>
                      <p className="font-mono text-[10px] text-slate-400">{d.donorCode}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded font-black bg-emerald-100 text-emerald-800 text-[11px]">
                        {d.bloodGroup}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {d.organsToDonate.map(o => (
                          <span key={o} className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                            {o}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-emerald-600">
                      {d.organConditionScore}/100
                    </td>
                    <td className="p-4 text-slate-600">
                      {d.hospitalAffiliation}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        d.approvalStatus === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                        d.approvalStatus === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {d.approvalStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1">
                      {d.approvalStatus !== 'approved' && (
                        <button
                          onClick={() => handleApproveDonor(d.id)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] shadow-sm transition-all"
                          id={`btn-approve-donor-${d.id}`}
                        >
                          Approve
                        </button>
                      )}
                      {d.approvalStatus !== 'rejected' && (
                        <button
                          onClick={() => handleOpenReject('donor', d.id, d.fullName)}
                          className="px-3 py-1 bg-slate-100 hover:bg-red-50 text-red-600 rounded-lg font-bold text-[11px] transition-all"
                          id={`btn-reject-donor-${d.id}`}
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: RECIPIENTS TABLE */}
      {activeSubTab === 'recipients' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Patient & Request Code</th>
                  <th className="p-4">Requested Organ</th>
                  <th className="p-4">Blood</th>
                  <th className="p-4">Urgency</th>
                  <th className="p-4">Hospital & Doctor</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredRecipients.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <p className="font-extrabold text-slate-900">{r.fullName}</p>
                      <p className="font-mono text-[10px] text-slate-400">{r.requestCode}</p>
                    </td>
                    <td className="p-4 font-black text-cyan-700">
                      {r.requestedOrgan}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded font-black bg-cyan-100 text-cyan-800 text-[11px]">
                        {r.bloodGroup}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        r.urgencyLevel === 'critical' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {r.urgencyLevel}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">
                      <p className="font-bold text-slate-800">{r.hospitalName}</p>
                      <p className="text-[10px]">{r.attendingDoctor}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        r.status === 'matched' ? 'bg-emerald-100 text-emerald-800' :
                        r.status === 'approved' ? 'bg-cyan-100 text-cyan-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1">
                      {r.status !== 'approved' && r.status !== 'matched' && (
                        <button
                          onClick={() => handleApproveRecipient(r.id)}
                          className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold text-[11px] shadow-sm transition-all"
                          id={`btn-approve-rec-${r.id}`}
                        >
                          Approve
                        </button>
                      )}
                      {r.status !== 'rejected' && (
                        <button
                          onClick={() => handleOpenReject('recipient', r.id, r.fullName)}
                          className="px-3 py-1 bg-slate-100 hover:bg-red-50 text-red-600 rounded-lg font-bold text-[11px] transition-all"
                          id={`btn-reject-rec-${r.id}`}
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ORGAN MATCHING ENGINE */}
      {activeSubTab === 'matching' && (
        <div className="space-y-6">
          <div className="bg-emerald-950 text-white p-6 rounded-3xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>LifeLink Compatibility Matching Engine</span>
              </h3>
              <p className="text-xs text-emerald-200">
                Automated scanning pairs verified organ donors with active recipients using HLA tissue suitability, blood matrix, and critical urgency scores.
              </p>
            </div>

            <button
              onClick={handleRunMatching}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs shadow-lg transition-all shrink-0"
              id="btn-trigger-matching-subtab"
            >
              Run Automated Search
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches.map((m) => (
              <div key={m.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Match ID: {m.id}</span>
                    <h4 className="text-lg font-black text-slate-900">{m.organType} Transplant Match</h4>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    m.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                    m.status === 'scheduled' ? 'bg-cyan-100 text-cyan-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {m.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-medium bg-slate-50 p-3 rounded-2xl">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Donor</span>
                    <p className="font-extrabold text-slate-900">{m.donorName}</p>
                    <p className="text-emerald-600 font-bold">{m.donorBloodGroup}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Recipient</span>
                    <p className="font-extrabold text-slate-900">{m.recipientName}</p>
                    <p className="text-cyan-600 font-bold">{m.recipientBloodGroup}</p>
                  </div>
                </div>

                <MatchingScoreBadge
                  score={m.compatibilityScore}
                  donorBlood={m.donorBloodGroup}
                  recipientBlood={m.recipientBloodGroup}
                  organType={m.organType}
                />

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">Hospital: {m.hospitalName}</span>
                  <div className="flex space-x-1">
                    {m.status !== 'completed' && (
                      <button
                        onClick={() => handleUpdateMatchStatus(m.id, 'completed')}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold rounded-lg"
                        id={`btn-match-complete-${m.id}`}
                      >
                        Complete Transplant
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOGS */}
      {activeSubTab === 'logs' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>System Audit & Activity History</span>
          </h3>

          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-slate-900">{log.action}</span>
                    <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-mono font-bold text-slate-700">
                      {log.performedBy}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{log.details}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">
              Reject {rejectModal.type === 'donor' ? 'Donor' : 'Recipient'} Request
            </h3>
            <p className="text-xs text-slate-600">
              Please specify the medical or administrative reasoning for rejecting <strong>{rejectModal.name}</strong>.
            </p>

            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Reason for rejection (e.g. Incomplete lab tests, hospital mismatch)..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
              id="input-reject-reason"
            />

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setRejectModal(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                id="btn-cancel-reject"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-red-700"
                id="btn-confirm-reject"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
