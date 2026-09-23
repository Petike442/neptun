import React from 'react';
import { BookOpen, Clock, Sparkles, GraduationCap, Award, CalendarDays } from 'lucide-react';
import { calculateWeeklyStats } from '../utils/studyPlanner';
import { StudyBlock } from '../types/schedule';

interface StatsBarProps {
  classesDurationMinutes: number;
  studyBlocks: StudyBlock[];
}

export const StatsBar: React.FC<StatsBarProps> = ({
  classesDurationMinutes,
  studyBlocks,
}) => {
  const stats = calculateWeeklyStats(classesDurationMinutes, studyBlocks);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
      {/* 1. Felvett Kreditek */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 shadow-sm hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-xs font-medium">Féléves Kredit</span>
          <GraduationCap className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-white tracking-tight">28</span>
          <span className="text-xs text-emerald-400 font-bold">kredit</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1">11 Neptun kurzus (1. félév)</p>
      </div>

      {/* 2. Kontaktórák */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 shadow-sm hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-xs font-medium">Egyetemi Kontaktóra</span>
          <BookOpen className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-white tracking-tight">{stats.classHours}</span>
          <span className="text-xs text-slate-400">óra / hét</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1">11 tanóra / idősáv + HSUP e-learning</p>
      </div>

      {/* 3. Tanulási blokkok */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 shadow-sm hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-xs font-medium">Fókuszált Tanulás</span>
          <Clock className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-indigo-300 tracking-tight">{stats.studyHours}</span>
          <span className="text-xs text-slate-400">óra / hét</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1">~{stats.dailyAverageStudyHours} óra / nap célorientáltan</p>
      </div>

      {/* 4. Szuper-Péntek */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 shadow-sm hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-xs font-medium">Pénteki státusz</span>
          <CalendarDays className="w-4 h-4 text-amber-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-emerald-400 tracking-tight">0 kontaktóra</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1">100% szabadnap vagy Deep Work</p>
      </div>

      {/* 5. Egyensúly index */}
      <div className="col-span-2 sm:col-span-4 lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-850 border border-emerald-500/20 rounded-xl p-3 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-xs font-medium text-emerald-400">Akadémiai Terhelés</span>
          <Sparkles className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Ideális eloszlás</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-[82%]" />
          </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-1">Összesen {stats.totalCommitmentHours} óra / hét tanulmányi ráfordítás</p>
      </div>
    </div>
  );
};
