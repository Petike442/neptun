import React, { useState } from 'react';
import { DAYS_CONFIG } from '../data/defaultSchedule';
import { ClassEvent, StudyBlock } from '../types/schedule';
import { 
  BookOpen, 
  Clock, 
  Check, 
  Copy, 
  MapPin, 
  User,
  GraduationCap
} from 'lucide-react';

interface TableViewProps {
  classes: ClassEvent[];
  studyBlocks: StudyBlock[];
  onSelectEvent: (event: any) => void;
}

interface TimelineEntry {
  id: string;
  dayOfWeek: number;
  dayName: string;
  startTime: string;
  endTime: string;
  title: string;
  categoryType: 'elmelet' | 'gyakorlat' | 'tanulas';
  courseCode?: string;
  kurzusKod?: string;
  instructor?: string;
  credits?: number;
  requirement?: string;
  room?: string;
  location?: string;
  notes?: string;
  technique?: string;
  rawEvent: any;
}

export const TableView: React.FC<TableViewProps> = ({
  classes,
  studyBlocks,
  onSelectEvent,
}) => {
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  const [copied, setCopied] = useState(false);

  // Merge and sort all items chronologically by day and startTime
  const allEntries: TimelineEntry[] = [];

  // 1. Classes
  classes.forEach((c) => {
    allEntries.push({
      id: c.id,
      dayOfWeek: c.dayOfWeek,
      dayName: c.dayName,
      startTime: c.startTime,
      endTime: c.endTime,
      title: c.name,
      categoryType: c.type === 'elmelet' ? 'elmelet' : 'gyakorlat',
      courseCode: c.courseCode,
      kurzusKod: c.kurzusKod,
      instructor: c.instructor,
      credits: c.credits,
      requirement: c.requirement,
      room: c.room,
      location: c.room,
      notes: c.description,
      rawEvent: { ...c, eventKind: 'class' },
    });
  });

  // 2. Study blocks
  studyBlocks.forEach((s) => {
    allEntries.push({
      id: s.id,
      dayOfWeek: s.dayOfWeek,
      dayName: s.dayName,
      startTime: s.startTime,
      endTime: s.endTime,
      title: `[Fókusz] ${s.title}`,
      categoryType: 'tanulas',
      room: 'Könyvtár / Otthon',
      location: 'Könyvtár / Otthoni íróasztal',
      notes: `${s.focusGoal} (${s.technique})`,
      technique: s.technique,
      rawEvent: { ...s, eventKind: 'study' },
    });
  });

  // Sort by day, then start time
  allEntries.sort((a, b) => {
    if (a.dayOfWeek !== b.dayOfWeek) {
      return a.dayOfWeek - b.dayOfWeek;
    }
    return a.startTime.localeCompare(b.startTime);
  });

  const filteredEntries = selectedDay === 'all' 
    ? allEntries 
    : allEntries.filter((e) => e.dayOfWeek === selectedDay);

  const getBadge = (type: TimelineEntry['categoryType']) => {
    switch (type) {
      case 'elmelet':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Elmélet (ea.)
          </span>
        );
      case 'gyakorlat':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
            Gyakorlat (gy.)
          </span>
        );
      case 'tanulas':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Tanulás (Fókusz)
          </span>
        );
    }
  };

  const handleCopyMarkdown = () => {
    let md = '# Heti Egyetemi Órarend és Tanulási Terv\n\n';
    md += '| Nap | Idősáv | Típus | Tantárgy | Terem | Oktató | Tárgykód / Kurzuskód |\n';
    md += '| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n';
    
    allEntries.forEach((e) => {
      const typeStr = e.categoryType === 'elmelet' ? 'Elmélet (ea.)' : e.categoryType === 'gyakorlat' ? 'Gyakorlat (gy.)' : 'Tanulási blokk';
      const codeStr = e.courseCode ? `${e.courseCode} [${e.kurzusKod || '-'}] (${e.credits || 0} kr)` : '-';
      md += `| ${e.dayName} | ${e.startTime} - ${e.endTime} | ${typeStr} | ${e.title} | ${e.room || '-'} | ${e.instructor || '-'} | ${codeStr} |\n`;
    });

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Table toolbar */}
      <div className="p-4 bg-slate-850 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Day filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedDay === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Összes nap ({allEntries.length})
          </button>
          {DAYS_CONFIG.map((d) => {
            const count = allEntries.filter((e) => e.dayOfWeek === d.day).length;
            return (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                  selectedDay === d.day
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>{d.name}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Action: Copy markdown */}
        <button
          onClick={handleCopyMarkdown}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition-colors shadow-sm shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Táblázat kimásolva!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Markdown másolása</span>
            </>
          )}
        </button>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/60 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4 w-24">Nap</th>
              <th className="py-3 px-4 w-28">Idősáv</th>
              <th className="py-3 px-4 w-32">Típus</th>
              <th className="py-3 px-4">Tantárgy & Oktató</th>
              <th className="py-3 px-4 w-36">Terem</th>
              <th className="py-3 px-4 w-44">Tárgykód / Kurzuskód</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 text-xs">
            {filteredEntries.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  Nincs bejegyzés a kiválasztott napra.
                </td>
              </tr>
            ) : (
              filteredEntries.map((entry) => {
                const isStudy = entry.categoryType === 'tanulas';

                return (
                  <tr
                    key={entry.id}
                    onClick={() => onSelectEvent(entry.rawEvent)}
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                  >
                    {/* Nap */}
                    <td className="py-3 px-4 font-semibold text-slate-300">
                      {entry.dayName}
                    </td>

                    {/* Idősáv */}
                    <td className="py-3 px-4 font-mono font-medium text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{entry.startTime} - {entry.endTime}</span>
                      </div>
                    </td>

                    {/* Típus Badge */}
                    <td className="py-3 px-4">
                      {getBadge(entry.categoryType)}
                    </td>

                    {/* Cím & Oktató */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {entry.title}
                      </div>
                      {entry.instructor ? (
                        <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-500 shrink-0" />
                          <span>{entry.instructor}</span>
                        </div>
                      ) : entry.notes ? (
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                          {entry.notes}
                        </p>
                      ) : null}
                    </td>

                    {/* Terem Kiemelve */}
                    <td className="py-3 px-4">
                      {entry.room ? (
                        <span className="inline-flex items-center gap-1 font-mono font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded text-xs shadow-sm">
                          <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                          {entry.room}
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">—</span>
                      )}
                    </td>

                    {/* Tárgykód & Kurzuskód */}
                    <td className="py-3 px-4">
                      {entry.courseCode ? (
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1">
                            <span className="font-mono text-[11px] text-slate-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                              {entry.courseCode}
                            </span>
                            {entry.credits !== undefined && (
                              <span className="text-[10px] text-emerald-400 font-bold">
                                {entry.credits} kr
                              </span>
                            )}
                          </div>
                          {entry.kurzusKod && (
                            <span className="text-[10px] text-slate-400 font-mono block">
                              Kurzus: {entry.kurzusKod}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Önálló fókusz</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
