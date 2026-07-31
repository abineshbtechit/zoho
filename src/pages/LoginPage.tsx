import React, { useState } from 'react';
import { Heart, Lock, Mail, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface LoginPageProps {
  setActiveTab: (tab: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setActiveTab }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@lifelink.org');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, selectedRole);
      if (selectedRole === 'admin') setActiveTab('admin-dashboard');
      else if (selectedRole === 'donor') setActiveTab('donor-dashboard');
      else setActiveTab('recipient-dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (demoEmail: string, role: UserRole) => {
    setEmail(demoEmail);
    setSelectedRole(role);
    setLoading(true);
    try {
      await login(demoEmail, role);
      if (role === 'admin') setActiveTab('admin-dashboard');
      else if (role === 'donor') setActiveTab('donor-dashboard');
      else setActiveTab('recipient-dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-cyan-500 p-0.5 shadow-lg mx-auto flex items-center justify-center">
          <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
            <Heart className="w-6 h-6 text-emerald-400 fill-emerald-400" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
        <p className="text-xs text-slate-500 font-medium">Log in to manage organ donation registries</p>
      </div>

      {/* QUICK DEMO PRESETS */}
      <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 space-y-2">
        <span className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-wider block flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>1-Click Demo Logins</span>
        </span>
        <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
          <button
            onClick={() => handleQuickDemoLogin('admin@lifelink.org', 'admin')}
            className="py-1.5 bg-amber-500 text-slate-950 rounded-xl hover:bg-amber-400 transition-colors shadow-sm"
            id="demo-login-admin"
          >
            Admin
          </button>
          <button
            onClick={() => handleQuickDemoLogin('john.miller@example.com', 'donor')}
            className="py-1.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-colors shadow-sm"
            id="demo-login-donor"
          >
            Donor
          </button>
          <button
            onClick={() => handleQuickDemoLogin('marcus.vance@example.com', 'recipient')}
            className="py-1.5 bg-cyan-600 text-white rounded-xl hover:bg-cyan-500 transition-colors shadow-sm"
            id="demo-login-recipient"
          >
            Recipient
          </button>
        </div>
      </div>

      {/* LOGIN FORM */}
      <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-5">
        
        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Select Target Role</label>
            <div className="grid grid-cols-3 gap-2">
              {(['donor', 'recipient', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`py-2 text-xs font-bold capitalize rounded-xl border transition-all ${
                    selectedRole === r
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                  id={`login-role-${r}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
                id="input-login-email"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
                id="input-login-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5"
            id="btn-submit-login"
          >
            {loading ? <span>Logging in...</span> : (
              <>
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-3 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            Don't have an account?{' '}
            <button
              onClick={() => setActiveTab('register')}
              className="font-bold text-emerald-600 hover:underline"
              id="btn-goto-register"
            >
              Create New Account
            </button>
          </p>
        </div>

      </div>

    </div>
  );
};
