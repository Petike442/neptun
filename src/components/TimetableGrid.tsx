import React, { useState } from 'react';
import { DAYS_CONFIG } from '../data/defaultSchedule';
import { ClassEvent, StudyBlock } from '../types/schedule';
import { 
  BookOpen, 
  MapPin, 
  Sparkles, 
  Clock, 
  CheckCircle, 
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Layers,
  User,
  Coffee
} from 'lucide-react';

interface TimetableGridProps {
  classes: ClassEvent[];
  studyBlocks: StudyBlock[];
  showStudyBlocks: boolean;
  onSelectEvent: (event: any) => void;
}

// Convert "HH:mm" to minutes from 07:30
const START_HOUR = 7.5; // 07:30
const END_HOUR = 20.5;   // 20:30
const TOTAL_MINUTES = (END_HOUR - START_HOUR) * 60;

function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function getPositionStyle(startTime: string, endTime: string) {
  const startMins = timeToMinutes(startTime);
  const endMins = timeToMinutes(endTime);
  const baseMins = START_HOUR * 60;

  const topPercent = Math.max(0, ((startMins - baseMins) / TOTAL_MINUTES) * 100);
  const duration = endMins - startMins;
  const heightPercent = Math.max(3, (duration / TOTAL_MINUTES) * 100);

  return {
    top: `${topPercent}%`,
    height: `${heightPercent}%`,
  };
}

export const TimetableGrid: React.FC<TimetableGridProps> = ({
  classes,
  studyBlocks,
  showStudyBlocks,
  onSelectEvent,
}) => {
  // Mode: 'full' (desktop 5-day grid) or 'day' (mobile daily card stack)
  // On mobile (< 768px), day view provides a native iPhone look, but user can toggle
  const [mobileMode, setMobileMode] = useState<'day' | 'grid'>('day');
  const [activeDayIndex, setActiveDayIndex] = useState<number>(1); // default to Hétfő (day 1)

  // Hours markers: 08:00, 09:00, ... 20:00
  const hours = Array.from({ length: 13 }, (_, i) => 8 + i);

  const activeDay = DAYS_CONFIG.find((d) => d.day === activeDayIndex) || DAYS_CONFIG[0];
  const activeDayClasses = classes.filter((c) => c.dayOfWeek === activeDay.day);
  const activeDayStudy = showStudyBlocks 
    ? studyBlocks.filter((s) => s.dayOfWeek === activeDay.day)
    : [];

  // Combine day items for daily mobile view and sort chronologically
  const dayItems = [
    ...activeDayClasses.map((c) => ({ ...c, itemType: 'class' as const })),
    ...activeDayStudy.map((s) => ({ ...s, itemType: 'study' as const })),
  ].sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
      {/* Neptun banner header */}
      <div className="bg-slate-850 px-4 py-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="font-semibold text-white">Neptun Heti Órarend</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">2026. Őszi Félév (Bsc 1.)</span>
        </div>

        {/* View mode toggle on mobile */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
          {/* Day / Week Switcher for Mobile */}
          <div className="flex md:hidden bg-slate-900 p-0.5 rounded-xl border border-slate-750">
            <button
              onClick={() => setMobileMode('day')}
              className={`px-3 py-1 rounded-lg font-medium text-xs transition-all ${
                mobileMode === 'day'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Napi kártyák
            </button>
            <button
              onClick={() => setMobileMode('grid')}
              className={`px-3 py-1 rounded-lg font-medium text-xs transition-all ${
                mobileMode === 'grid'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              5 Napos háló
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /> Neptun Órák
            </span>
            {showStudyBlocks && (
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-purple-500 inline-block" /> Fókusz Tanulás
              </span>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE-OPTIMIZED DAY VIEW (Active on small screens when mobileMode === 'day') */}
      <div className={`md:hidden ${mobileMode === 'day' ? 'block' : 'hidden'}`}>
        
        {/* Day Selector Ribbon (iPhone segmented style) */}
        <div className="bg-slate-950/70 p-2 border-b border-slate-800 flex items-center justify-between gap-1 overflow-x-auto">
          {DAYS_CONFIG.map((d) => {
            const isSelected = activeDayIndex === d.day;
            const classCount = classes.filter((c) => c.dayOfWeek === d.day).length;

            return (
              <button
                key={d.day}
                onClick={() => setActiveDayIndex(d.day)}
                className={`flex-1 min-w-[62px] py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950 font-bold scale-[1.02]'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                <span className="text-[11px] uppercase tracking-wider">{d.shortName}</span>
                <span className={`text-base font-extrabold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {d.date}
                </span>
                <span className={`text-[9px] mt-0.5 px-1 rounded ${
                  isSelected ? 'bg-emerald-700 text-emerald-100' : 'text-slate-500'
                }`}>
                  {classCount > 0 ? `${classCount} óra` : 'Szabad'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Daily Schedule Cards List */}
        <div className="p-4 space-y-3 bg-slate-900/50 min-h-[380px]">
          
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 pb-1">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              {activeDay.name}i napirend
            </span>
            <span>{dayItems.length} bejegyzés</span>
          </div>

          {dayItems.length === 0 ? (
            <div className="p-8 text-center bg-slate-950/40 border border-slate-800 rounded-2xl space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Coffee className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Nincs kontaktórád erre a napra!</h4>
              <p className="text-xs text-slate-400">
                {activeDay.isFreeDay 
                  ? 'Pénteken 0 jelenléti óra van. Remek alkalom önálló felkészülésre vagy pihenésre!'
                  : 'Nincsenek órák rögzítve.'}
              </p>
            </div>
          ) : (
            dayItems.map((item: any) => {
              const isClass = item.itemType === 'class';
              const isLecture = item.type === 'elmelet';
              const isHsup = item.id?.includes('hsup');

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectEvent({ ...item, eventKind: isClass ? 'class' : 'study' })}
                  className={`p-3.5 rounded-2xl border transition-all active:scale-[0.98] cursor-pointer shadow-md ${
                    isClass
                      ? isLecture
                        ? 'border-emerald-500/50 bg-emerald-950/40 hover:bg-emerald-950/60'
                        : 'border-teal-500/50 bg-teal-950/40 hover:bg-teal-950/60'
                      : isHsup
                      ? 'border-amber-500/50 bg-amber-950/40 hover:bg-amber-950/60'
                      : 'border-purple-500/50 bg-purple-950/40 hover:bg-purple-950/60'
                  }`}
                >
                  {/* Top Bar: Time & Category */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-xl border border-slate-800">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      {item.startTime} - {item.endTime}
                    </span>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg ${
                        isClass
                          ? isLecture
                            ? 'bg-emerald-600 text-white'
                            : 'bg-teal-600 text-white'
                          : isHsup
                          ? 'bg-amber-600 text-white'
                          : 'bg-purple-600 text-white'
                      }`}
                    >
                      {isClass 
                        ? (isLecture ? 'Elmélet (ea.)' : 'Gyakorlat (gy.)') 
                        : 'Fókusz tanulás'}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                    {item.name || item.title}
                  </h4>

                  {/* Highlights: Room & Instructor */}
                  <div className="space-y-1.5 pt-1 border-t border-slate-800/80">
                    {item.room && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono font-bold text-xs">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Terem: {item.room}</span>
                      </div>
                    )}

                    {item.instructor && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-300">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{item.instructor}</span>
                      </div>
                    )}

                    {item.focusGoal && (
                      <p className="text-xs text-purple-200 mt-1">
                        🎯 {item.focusGoal}
                      </p>
                    )}
                  </div>

                  {/* Bottom Footer: Code & Credits */}
                  {isClass && (
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 mt-2 border-t border-slate-800/60 font-mono">
                      <span>{item.kurzusKod || item.courseCode}</span>
                      <span className="font-sans font-bold text-emerald-400">
                        {item.credits ? `${item.credits} kredit` : 'Aláírás'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* FULL WEEK GRID (Visible on desktop OR when mobile user toggles to 5-day grid) */}
      <div className={`${mobileMode === 'day' ? 'hidden md:block' : 'block'} overflow-x-auto`}>
        <div className="min-w-[850px]">
          
          {/* Days header */}
          <div className="grid grid-cols-[60px_repeat(5,1fr)] bg-slate-850/80 border-b border-slate-800 sticky top-0 z-20">
            <div className="p-3 text-center text-xs font-semibold text-slate-400 border-r border-slate-800">
              Idő
            </div>
            {DAYS_CONFIG.map((day) => (
              <div
                key={day.day}
                className={`p-3 text-center border-r border-slate-800 last:border-r-0 ${
                  day.isFreeDay ? 'bg-emerald-950/20' : ''
                }`}
              >
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  {day.name}
                </div>
                <div className="text-lg font-extrabold text-white mt-0.5">
                  {day.date}
                </div>
                {day.isFreeDay && (
                  <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
                    Kontaktóra-mentes 🎉
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Grid body */}
          <div className="relative grid grid-cols-[60px_repeat(5,1fr)] h-[900px] select-none">
            
            {/* Left hour column */}
            <div className="relative border-r border-slate-800 bg-slate-900/60">
              {hours.map((hour) => {
                const hourMins = hour * 60;
                const baseMins = START_HOUR * 60;
                const topPercent = ((hourMins - baseMins) / TOTAL_MINUTES) * 100;
                return (
                  <div
                    key={hour}
                    className="absolute w-full text-right pr-2 text-[11px] font-mono font-medium text-slate-400 -translate-y-2.5"
                    style={{ top: `${topPercent}%` }}
                  >
                    {String(hour).padStart(2, '0')}:00
                  </div>
                );
              })}
            </div>

            {/* Horizontal guideline lines across all columns */}
            <div className="absolute inset-0 left-[60px] pointer-events-none">
              {hours.map((hour) => {
                const hourMins = hour * 60;
                const baseMins = START_HOUR * 60;
                const topPercent = ((hourMins - baseMins) / TOTAL_MINUTES) * 100;
                return (
                  <div
                    key={hour}
                    className="absolute w-full border-t border-slate-800/60"
                    style={{ top: `${topPercent}%` }}
                  />
                );
              })}
            </div>

            {/* 5 Day Columns */}
            {DAYS_CONFIG.map((day) => {
              const dayClasses = classes.filter((c) => c.dayOfWeek === day.day);
              const dayStudy = showStudyBlocks
                ? studyBlocks.filter((s) => s.dayOfWeek === day.day)
                : [];

              return (
                <div
                  key={day.day}
                  className={`relative border-r border-slate-800/80 last:border-r-0 ${
                    day.isFreeDay ? 'bg-emerald-950/5' : ''
                  }`}
                >
                  {/* Empty state hint on Friday */}
                  {day.isFreeDay && !showStudyBlocks && (
                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-slate-400 text-xs">
                        <p className="font-semibold text-emerald-400">Pénteken nincs órád!</p>
                        <p className="text-[11px] mt-1 text-slate-500">Teljesen szabad nap.</p>
                      </div>
                    </div>
                  )}

                  {/* 1. Neptun Classes */}
                  {dayClasses.map((cls) => {
                    const pos = getPositionStyle(cls.startTime, cls.endTime);
                    const isLecture = cls.type === 'elmelet';
                    return (
                      <div
                        key={cls.id}
                        onClick={() => onSelectEvent({ ...cls, eventKind: 'class' })}
                        style={pos}
                        className={`absolute left-1 right-1 rounded-xl p-2 cursor-pointer shadow-md transition-all duration-150 hover:z-30 hover:scale-[1.02] hover:shadow-xl flex flex-col justify-between overflow-hidden border ${
                          isLecture
                            ? 'border-emerald-500/70 bg-emerald-950/85 text-emerald-100 hover:border-emerald-400'
                            : 'border-teal-500/70 bg-teal-950/85 text-teal-100 hover:border-teal-400'
                        }`}
                      >
                        {/* Header badge & time */}
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span
                              className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                isLecture ? 'bg-emerald-600 text-white' : 'bg-teal-600 text-white'
                              }`}
                            >
                              {isLecture ? 'Elmélet (ea.)' : 'Gyakorlat (gy.)'}
                            </span>
                            <span className="text-[10px] font-mono font-semibold text-slate-300">
                              {cls.startTime} - {cls.endTime}
                            </span>
                          </div>

                          {/* Subject name */}
                          <div className="text-xs font-bold leading-tight line-clamp-2 text-white">
                            {cls.shortName || cls.name}
                          </div>
                        </div>

                        {/* Room and Instructor info */}
                        <div className="my-1 space-y-0.5">
                          {cls.room && (
                            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-950/90 border border-slate-700/80 text-[10px] font-mono font-bold text-amber-300 shadow-sm max-w-full truncate">
                              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                              <span className="truncate">Terem: {cls.room}</span>
                            </div>
                          )}

                          {cls.instructor && (
                            <div className="text-[10px] text-slate-300 truncate opacity-90 pl-0.5">
                              {cls.instructor}
                            </div>
                          )}
                        </div>

                        {/* Course code & Credits */}
                        <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1 border-t border-slate-700/50">
                          <span className="font-mono text-[9px] text-emerald-300 truncate">
                            {cls.kurzusKod || cls.courseCode}
                          </span>
                          <span className="text-[9px] font-bold text-slate-300">
                            {cls.credits ? `${cls.credits} kr` : ''}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* 2. Study Blocks */}
                  {dayStudy.map((sb) => {
                    const pos = getPositionStyle(sb.startTime, sb.endTime);
                    const isHsup = sb.id.includes('hsup');
                    return (
                      <div
                        key={sb.id}
                        onClick={() => onSelectEvent({ ...sb, eventKind: 'study' })}
                        style={pos}
                        className={`absolute left-1 right-1 rounded-lg p-2 cursor-pointer shadow-sm transition-all duration-150 hover:z-30 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between overflow-hidden border ${
                          isHsup
                            ? 'border-amber-500/60 bg-amber-950/80 text-amber-100'
                            : 'border-purple-500/60 bg-purple-950/80 text-purple-100'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              isHsup ? 'bg-amber-600 text-white' : 'bg-purple-600 text-white'
                            }`}
                          >
                            {sb.startTime} - {sb.endTime}
                          </span>
                          <span className="text-[9px] font-semibold text-purple-200 flex items-center gap-1">
                            <BookOpen className="w-2.5 h-2.5" /> Fókusz
                          </span>
                        </div>
                        <div className="text-xs font-semibold leading-tight line-clamp-2 text-white">
                          {sb.title}
                        </div>
                        <div className="text-[10px] text-slate-300 truncate">
                          {sb.technique}
                        </div>
                      </div>
                    );
                  })}

                </div>
              );
            })}

          </div>

        </div>
      </div>
    </div>
  );
};
