import React from 'react';
import { Sparkles, Activity, CheckCircle2 } from 'lucide-react';

interface MatchingScoreBadgeProps {
  score: number; // 0 - 100
  donorBlood: string;
  recipientBlood: string;
  organType: string;
}

export const MatchingScoreBadge: React.FC<MatchingScoreBadgeProps> = ({
  score,
  donorBlood,
  recipientBlood,
  organType,
}) => {
  const getBadgeColor = (s: number) => {
    if (s >= 90) return 'from-emerald-500 to-teal-500 text-emerald-950 border-emerald-300';
    if (s >= 80) return 'from-cyan-500 to-blue-500 text-cyan-950 border-cyan-300';
    return 'from-amber-500 to-orange-500 text-amber-950 border-amber-300';
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Compatibility Score</span>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-gradient-to-r ${getBadgeColor(score)} text-white shadow-sm`}>
          {score}% Match
        </span>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-500"
          style={{ width: `${score}%` }}
        ></div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 pt-0.5">
        <span>Organ: <strong className="text-slate-800">{organType}</strong></span>
        <span>Blood: <strong className="text-emerald-700">{donorBlood}</strong> → <strong className="text-cyan-700">{recipientBlood}</strong></span>
      </div>
    </div>
  );
};
