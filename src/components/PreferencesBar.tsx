import React from 'react';
import { Sun, Moon, Sunrise, Sliders, BookOpen, Layers, Bell } from 'lucide-react';
import { Chronotype, UserPreferences } from '../types/schedule';

interface PreferencesBarProps {
  preferences: UserPreferences;
  onUpdatePreferences: (updates: Partial<UserPreferences>) => void;
}

export const PreferencesBar: React.FC<PreferencesBarProps> = ({
  preferences,
  onUpdatePreferences,
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* 1. Napi ritmus / Chronotype */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            Napi Ritmus:
          </span>
          <div className="inline-flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => onUpdatePreferences({ chronotype: 'early' })}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                preferences.chronotype === 'early'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sunrise className="w-3.5 h-3.5 text-amber-400" />
              Korán kelő
            </button>
            <button
              onClick={() => onUpdatePreferences({ chronotype: 'balanced' })}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                preferences.chronotype === 'balanced'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-emerald-400" />
              Kiegyensúlyozott
            </button>
            <button
              onClick={() => onUpdatePreferences({ chronotype: 'night' })}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                preferences.chronotype === 'night'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              Éjszakai bagoly
            </button>
          </div>
        </div>

        {/* 2. Napi max tanulási idő (Slider) */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            Napi Tanulási Keret: <strong className="text-white normal-case text-sm ml-1 font-bold">{preferences.maxStudyHoursPerDay} óra</strong>
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500">1h</span>
            <input
              type="range"
              min="1.0"
              max="4.0"
              step="0.5"
              value={preferences.maxStudyHoursPerDay}
              onChange={(e) => onUpdatePreferences({ maxStudyHoursPerDay: parseFloat(e.target.value) })}
              className="w-28 sm:w-36 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <span className="text-[11px] text-slate-500">4h</span>
          </div>
        </div>

        {/* 3. Layer switches */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            Naptár Réteg:
          </span>

          <button
            onClick={() => onUpdatePreferences({ includeStudyBlocks: !preferences.includeStudyBlocks })}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 border ${
              preferences.includeStudyBlocks
                ? 'bg-purple-950/40 text-purple-300 border-purple-500/40 shadow-sm'
                : 'bg-slate-950 text-slate-500 border-slate-800 line-through opacity-60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Fókuszált Tanulási Blokkok</span>
          </button>
        </div>

      </div>
    </div>
  );
};
