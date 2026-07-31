import React, { useState } from 'react';
import { X, Layers, Database, ShieldCheck, Server, Globe, CheckCircle, Code, Copy, Terminal } from 'lucide-react';
import { CATALYST_TABLE_SCHEMAS, CORS_WHITELIST_GUIDANCE, CatalystHelper } from '../services/catalystClient';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatalystDeploymentModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const guide = CatalystHelper.getDeploymentGuide();

  if (!isOpen) return null;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Layers className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Zoho Catalyst Architecture & Deployment
              </h2>
              <p className="text-xs font-semibold text-slate-500">
                Frontend (Slate) • Backend (AppSail) • Data Store • Catalyst Auth
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            id="btn-close-catalyst-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* HOSTING & SPECIFICATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center space-x-2 text-emerald-600">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Frontend Hosting</span>
            </div>
            <p className="text-sm font-extrabold text-slate-900">Zoho Catalyst Slate</p>
            <p className="text-[11px] text-slate-500">Static React 19 SPA build output (/dist)</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center space-x-2 text-cyan-600">
              <Server className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Backend Hosting</span>
            </div>
            <p className="text-sm font-extrabold text-slate-900">Zoho Catalyst AppSail</p>
            <p className="text-[11px] text-slate-500">Node.js Express MVC API server</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center space-x-2 text-purple-600">
              <Database className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Database</span>
            </div>
            <p className="text-sm font-extrabold text-slate-900">Catalyst Data Store</p>
            <p className="text-[11px] text-slate-500">Users, Donors, Recipients, Matches</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center space-x-2 text-amber-600">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Authentication</span>
            </div>
            <p className="text-sm font-extrabold text-slate-900">Catalyst Auth Service</p>
            <p className="text-[11px] text-slate-500">JWT Token & Role RBAC</p>
          </div>
        </div>

        {/* PORT BINDING RULE HIGHLIGHT */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1 text-emerald-900">
            <p className="font-extrabold">Dynamic Catalyst Port Binding Compliance</p>
            <p>
              The Express server dynamically reads <code className="bg-emerald-100 px-1.5 py-0.5 rounded font-mono font-bold">process.env.X_ZOHO_CATALYST_LISTEN_PORT</code> to prevent hardcoded port conflicts in AppSail runtime environments.
            </p>
          </div>
        </div>

        {/* DATA STORE SCHEMAS */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
            <Database className="w-4 h-4 text-emerald-600" />
            <span>Catalyst Data Store Schema Design</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CATALYST_TABLE_SCHEMAS.map((table) => (
              <div key={table.tableName} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-900 text-slate-100 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    Table: {table.tableName}
                  </span>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                    {table.columns.length} Columns
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px] font-mono text-slate-300">
                  {table.columns.map((col) => (
                    <div key={col.name} className="flex items-center justify-between bg-slate-800/60 px-2 py-1 rounded">
                      <span>{col.name}</span>
                      <span className="text-cyan-400 text-[9px]">{col.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CLI DEPLOYMENT COMMANDS */}
        <div className="space-y-2">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-slate-700" />
            <span>Catalyst CLI Deployment Commands</span>
          </h3>
          <div className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs space-y-2 relative">
            {guide.cliCommands.map((cmd, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-500">$</span>
                  <span>{cmd}</span>
                </div>
                <button
                  onClick={() => handleCopy(cmd, i)}
                  className="text-slate-500 hover:text-white p-1 rounded transition-colors"
                  title="Copy command"
                >
                  {copiedIndex === i ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CORS GUIDANCE */}
        <div className="p-4 rounded-2xl bg-slate-100 text-slate-800 text-xs font-mono space-y-1">
          <p className="font-bold text-slate-900 font-sans">CORS Whitelist & Security Rules:</p>
          <pre className="whitespace-pre-wrap text-[11px] text-slate-700 leading-relaxed">
            {CORS_WHITELIST_GUIDANCE}
          </pre>
        </div>

      </div>
    </div>
  );
};
