import React, { useState } from 'react';
import { Heart, Activity, ShieldCheck, User as UserIcon, LogOut, ChevronDown, Sparkles, Layers, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCatalystModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenCatalystModal }) => {
  const { user, logout, switchRole } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roleSwitching, setRoleSwitching] = useState(false);

  const handleRoleChange = async (role: UserRole) => {
    setRoleSwitching(true);
    await switchRole(role);
    setRoleSwitching(false);
    setDropdownOpen(false);

    if (role === 'admin') setActiveTab('admin-dashboard');
    else if (role === 'donor') setActiveTab('donor-dashboard');
    else if (role === 'recipient') setActiveTab('recipient-dashboard');
  };

  const getRoleLabel = (role?: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Medical Administrator';
      case 'donor':
        return 'Registered Donor';
      case 'recipient':
        return 'Organ Recipient';
      default:
        return 'Guest User';
    }
  };

  const getRoleBadgeStyle = (role?: UserRole) => {
    switch (role) {
      case 'admin':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'donor':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'recipient':
        return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-emerald-100/80 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 text-left focus:outline-none group"
            id="nav-logo-button"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-cyan-500 p-0.5 shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Heart className="w-6 h-6 text-emerald-600 fill-emerald-600 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
                  Life<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">Link</span>
                </span>
                <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  Medical
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Organ Donation Management System
              </p>
            </div>
          </button>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                activeTab === 'home'
                  ? 'bg-white text-emerald-800 shadow-sm shadow-emerald-900/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
              id="nav-link-home"
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                activeTab === 'about'
                  ? 'bg-white text-emerald-800 shadow-sm shadow-emerald-900/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
              id="nav-link-about"
            >
              About
            </button>

            <button
              onClick={() => setActiveTab('track')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 flex items-center space-x-1.5 ${
                activeTab === 'track'
                  ? 'bg-white text-emerald-800 shadow-sm shadow-emerald-900/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
              id="nav-link-track"
            >
              <Search className="w-3.5 h-3.5 text-emerald-600" />
              <span>Track Request</span>
            </button>

            {/* ROLE DASHBOARD BUTTON */}
            {user?.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin-dashboard')}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 flex items-center space-x-1.5 ${
                  activeTab === 'admin-dashboard'
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'text-amber-800 hover:bg-amber-100/60'
                }`}
                id="nav-link-admin"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Portal</span>
              </button>
            )}

            {user?.role === 'donor' && (
              <button
                onClick={() => setActiveTab('donor-dashboard')}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 flex items-center space-x-1.5 ${
                  activeTab === 'donor-dashboard'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-emerald-800 hover:bg-emerald-100/60'
                }`}
                id="nav-link-donor-dash"
              >
                <Heart className="w-4 h-4" />
                <span>Donor Hub</span>
              </button>
            )}

            {user?.role === 'recipient' && (
              <button
                onClick={() => setActiveTab('recipient-dashboard')}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 flex items-center space-x-1.5 ${
                  activeTab === 'recipient-dashboard'
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                    : 'text-cyan-800 hover:bg-cyan-100/60'
                }`}
                id="nav-link-recipient-dash"
              >
                <Activity className="w-4 h-4" />
                <span>Recipient Hub</span>
              </button>
            )}
          </nav>

          {/* ACTION BUTTONS & ROLE SWITCHER */}
          <div className="flex items-center space-x-3">

            {/* ZOHO CATALYST BADGE */}
            <button
              onClick={onOpenCatalystModal}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-slate-100 text-xs font-semibold hover:bg-slate-800 border border-slate-700 shadow-sm transition-all"
              title="View Zoho Catalyst Deployment Configuration"
              id="btn-catalyst-info"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zoho Catalyst</span>
            </button>

            {/* QUICK ROLE SWITCHER DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-200 shadow-sm ${getRoleBadgeStyle(
                  user?.role
                )}`}
                id="btn-role-dropdown"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>{getRoleLabel(user?.role)}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Switch Role for Live Demo
                    </p>
                    <p className="text-xs font-semibold text-slate-800 truncate">
                      {user?.name || 'Guest User'}
                    </p>
                  </div>

                  <div className="py-1 space-y-1">
                    <button
                      onClick={() => handleRoleChange('admin')}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                        user?.role === 'admin'
                          ? 'bg-amber-50 text-amber-900 font-bold'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                      id="role-switch-admin"
                    >
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        <span>Admin (Dr. Vance)</span>
                      </div>
                      {user?.role === 'admin' && <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">Active</span>}
                    </button>

                    <button
                      onClick={() => handleRoleChange('donor')}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                        user?.role === 'donor'
                          ? 'bg-emerald-50 text-emerald-900 font-bold'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                      id="role-switch-donor"
                    >
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-emerald-600" />
                        <span>Donor (John Miller)</span>
                      </div>
                      {user?.role === 'donor' && <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded">Active</span>}
                    </button>

                    <button
                      onClick={() => handleRoleChange('recipient')}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                        user?.role === 'recipient'
                          ? 'bg-cyan-50 text-cyan-900 font-bold'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                      id="role-switch-recipient"
                    >
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-cyan-600" />
                        <span>Recipient (Marcus Vance)</span>
                      </div>
                      {user?.role === 'recipient' && <span className="text-[10px] bg-cyan-200 text-cyan-900 px-1.5 py-0.5 rounded">Active</span>}
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setActiveTab('login');
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                      id="btn-goto-login"
                    >
                      <UserIcon className="w-3.5 h-3.5" />
                      <span>Log in / Register as New User</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ACTION CTA BUTTONS */}
            <button
              onClick={() => setActiveTab('donor-register')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 hover:-translate-y-0.5 transition-all flex items-center space-x-1.5"
              id="nav-btn-pledge"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Register Donor</span>
            </button>

            <button
              onClick={() => setActiveTab('organ-request')}
              className="hidden sm:flex bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-slate-900/10 hover:-translate-y-0.5 transition-all items-center space-x-1.5 border border-slate-800"
              id="nav-btn-request"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Request Organ</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
