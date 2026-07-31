import React from 'react';
import { Heart, Home, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  setActiveTab: (tab: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ setActiveTab }) => {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto shadow-md">
        <Heart className="w-8 h-8 text-slate-400" />
      </div>

      <div className="space-y-2">
        <h1 className="text-5xl font-black text-slate-900">404</h1>
        <h2 className="text-xl font-bold text-slate-700">Page Not Found</h2>
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          The healthcare resource or portal view you are looking for does not exist or has been moved.
        </p>
      </div>

      <button
        onClick={() => setActiveTab('home')}
        className="bg-emerald-600 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all text-xs inline-flex items-center space-x-2"
        id="btn-404-home"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to LifeLink Home</span>
      </button>
    </div>
  );
};
