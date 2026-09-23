import React from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  BookOpen, 
  CheckCircle, 
  Lightbulb,
  FileText,
  Calendar,
  GraduationCap,
  User,
  Compass,
  Award
} from 'lucide-react';

interface EventDetailModalProps {
  event: any | null;
  onClose: () => void;
}

function getRoomDetails(room?: string): { building: string; floor: string; roomNum: string; note: string } | null {
  if (!room) return null;
  if (room.includes('CSAR')) {
    return {
      building: 'E épület (Sportcsarnok)',
      floor: 'Földszint',
      roomNum: 'CSAR/B vívópálya',
      note: 'Párbajfelkészítés és vívás gyakorlati edzőterem',
    };
  }
  if (room.startsWith('E.C.I.')) {
    const num = room.replace('E.C.I.', '');
    const isLab = num === '108' || num === '110' || num === '111';
    const isLectureHall = num === '124';
    return {
      building: 'E épület (Campus Főépület)',
      floor: 'I. emelet (C szárny)',
      roomNum: `${num}-es terem`,
      note: isLectureHall 
        ? 'Nagy egyetemi előadóterem' 
        : isLab 
        ? 'Számítógépes informatika labor' 
        : 'Szemináriumi oktatóterem',
    };
  }
  return null;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  const isClass = event.eventKind === 'class';
  const isStudy = event.eventKind === 'study';
  const roomInfo = getRoomDetails(event.room);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-850 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {isClass ? (
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <BookOpen className="w-4 h-4" />
              </span>
            ) : (
              <span className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Lightbulb className="w-4 h-4" />
              </span>
            )}

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isClass ? `Neptun ${event.type === 'elmelet' ? 'Elméleti Előadás (ea.)' : 'Gyakorlat / Labor (gy.)'}` : 'Javasolt Tanulási Fókuszblokk'}
              </span>
              <h3 className="text-base font-bold text-white leading-tight">
                {event.name || event.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
          
          {/* Time & Day info */}
          <div className="grid grid-cols-2 gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-500 block mb-0.5">Nap & Időtartam:</span>
              <div className="font-semibold text-slate-200 flex items-center gap-1.5 text-sm">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {event.dayName} {event.startTime} - {event.endTime}
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                {event.durationMinutes} perc
              </span>
            </div>

            <div>
              <span className="text-slate-500 block mb-0.5">Terem / Helyszín:</span>
              <div className="font-bold text-amber-300 flex items-center gap-1.5 text-sm truncate font-mono">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{event.room || event.location || 'Campus / Íróasztal'}</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block truncate">
                {roomInfo ? roomInfo.note : isClass ? 'Jelenléti egyetemi óra' : 'Fókuszált egyéni munka'}
              </span>
            </div>
          </div>

          {/* Detailed Room Guide if available */}
          {roomInfo && (
            <div className="bg-amber-950/20 border border-amber-500/30 p-3 rounded-xl flex items-start gap-2.5">
              <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 text-xs block">
                  Campus Terem Navigáció: {event.room}
                </span>
                <p className="text-amber-100 text-[11px] mt-0.5">
                  <span className="font-semibold">{roomInfo.building}</span> • {roomInfo.floor} • <span className="font-semibold">{roomInfo.roomNum}</span>
                </p>
                <p className="text-[10px] text-amber-300/80 mt-0.5">
                  Típus: {roomInfo.note}
                </p>
              </div>
            </div>
          )}

          {/* Instructor & Course Info */}
          {isClass && (
            <div className="bg-slate-850 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
              {event.instructor && (
                <div className="flex items-center gap-2 pb-2 border-b border-slate-750">
                  <User className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Oktató</span>
                    <span className="text-xs font-semibold text-white">{event.instructor}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 text-center pt-0.5">
                <div>
                  <span className="text-slate-400 text-[10px] block">Tárgykód</span>
                  <span className="font-mono text-emerald-400 font-bold text-xs">{event.courseCode || '—'}</span>
                  {event.kurzusKod && (
                    <span className="text-[10px] text-slate-400 block mt-0.5">[{event.kurzusKod}]</span>
                  )}
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Kredit</span>
                  <span className="text-white font-bold text-xs">{event.credits ?? '—'} kr</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Követelmény</span>
                  <span className="text-teal-300 font-semibold text-xs">{event.requirement || 'Aláírás'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Description / Content */}
          {event.description && (
            <div>
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Tantervi tartalom:
              </span>
              <p className="text-slate-300 leading-relaxed bg-slate-850/50 p-3 rounded-lg border border-slate-800/80">
                {event.description}
              </p>
            </div>
          )}

          {/* Focus Goal & Technique for study blocks */}
          {isStudy && (
            <div className="space-y-2 bg-purple-950/20 border border-purple-500/30 p-3.5 rounded-xl">
              <div>
                <span className="font-bold text-purple-300 uppercase tracking-wider block mb-0.5">
                  Fókusz Célkitűzés:
                </span>
                <p className="text-purple-100">{event.focusGoal}</p>
              </div>
              <div>
                <span className="font-bold text-purple-300 uppercase tracking-wider block mb-0.5">
                  Alkalmazott Módszertan:
                </span>
                <p className="text-purple-200 font-mono">{event.technique}</p>
              </div>
            </div>
          )}

          {/* Tips for academic success */}
          {isClass && (
            <div className="bg-emerald-950/20 border border-emerald-500/30 p-3.5 rounded-xl">
              <span className="font-bold text-emerald-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                Sikeres teljesítési tanács:
              </span>
              <p className="text-emerald-200/90 leading-relaxed">
                {event.type === 'elmelet'
                  ? 'Az előadások után készíts saját szavas kivonatot még aznap este. Az elméleti definíciók és bizonyítások képezik a kollokvium alapját!'
                  : 'A gyakorlatokra érkezz előre felkészülten, hogy a laboridőben a feladatok kódolására és a hibák megbeszélésére koncentrálhass.'}
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-850 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold transition-colors"
          >
            Bezárás
          </button>
        </div>
      </div>
    </div>
  );
};
