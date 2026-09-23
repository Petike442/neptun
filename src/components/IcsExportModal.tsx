import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Smartphone, 
  Calendar as CalendarIcon, 
  Settings2, 
  Bell, 
  CheckCircle,
  FileCode,
  Sparkles,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { generateIcsString, downloadIcsFile } from '../utils/icsGenerator';
import { ClassEvent, StudyBlock, UserPreferences } from '../types/schedule';

interface IcsExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  classes: ClassEvent[];
  studyBlocks: StudyBlock[];
  preferences: UserPreferences;
}

export const IcsExportModal: React.FC<IcsExportModalProps> = ({
  isOpen,
  onClose,
  classes,
  studyBlocks,
  preferences,
}) => {
  const [includeClasses, setIncludeClasses] = useState(true);
  const [includeStudyBlocks, setIncludeStudyBlocks] = useState(true);
  const [reminderMinutes, setReminderMinutes] = useState(15);
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const currentPrefs: UserPreferences = {
    ...preferences,
    reminderMinutes,
  };

  const icsCode = generateIcsString({
    classes,
    studyBlocks,
    preferences: currentPrefs,
    includeClasses,
    includeStudyBlocks,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(icsCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    downloadIcsFile(icsCode, 'egyetemi_orarend_tanulasterv.ics');
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const eventCount = (icsCode.match(/BEGIN:VEVENT/g) || []).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Naptár Export Kód (.ics)
                <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {eventCount} naptáresemény / hét
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                1-kattintásos import iPhone Naptárba (Apple Calendar), Google Naptárba vagy Outlookba
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Options toolbar */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Settings2 className="w-3.5 h-3.5 text-emerald-400" />
                Exportálandó Rétegek:
              </span>
              <span className="text-[11px] text-slate-500">
                Félév kezdete: 2026.09.21 (14 hét ismétlődés)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer bg-slate-900 p-3 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                <input
                  type="checkbox"
                  checked={includeClasses}
                  onChange={(e) => setIncludeClasses(e.target.checked)}
                  className="rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 w-4 h-4"
                />
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-slate-200 font-semibold block">Hivatalos Neptun Órák</span>
                    <span className="text-[11px] text-slate-400">Előadások és laborgyakorlatok termekkel, kódokkal</span>
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer bg-slate-900 p-3 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                <input
                  type="checkbox"
                  checked={includeStudyBlocks}
                  onChange={(e) => setIncludeStudyBlocks(e.target.checked)}
                  className="rounded text-purple-500 focus:ring-purple-500 accent-purple-500 w-4 h-4"
                />
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <div>
                    <span className="text-slate-200 font-semibold block">Javasolt Tanulási Blokkok</span>
                    <span className="text-[11px] text-slate-400">Kalkulus, Prog I., HSUP startup célzott idősávok</span>
                  </div>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-3 border-t border-slate-850">
              <span className="flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                Óra / Blokkindító értesítés:
              </span>
              <select
                value={reminderMinutes}
                onChange={(e) => setReminderMinutes(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value={0}>Nincs értesítés</option>
                <option value={10}>10 perccel előtte</option>
                <option value={15}>15 perccel előtte (ajánlott)</option>
                <option value={30}>30 perccel előtte</option>
              </select>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/30 p-4 rounded-xl">
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Akadémiai Naptár Készen Áll
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Töltsd le közvetlenül .ics fájlként, vagy másold ki az alábbi kódot.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopy}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Kimásolva!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-indigo-400" />
                    <span>Kód Másolása</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/40 flex items-center justify-center gap-1.5 active:scale-95"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>Letöltve!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>.ics Fájl Letöltése</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Instructions Tabs for Apple & Google */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <Smartphone className="w-4 h-4 text-slate-400" />
                iPhone / iPad / Mac Import:
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Kattints a <strong className="text-white">.ics Fájl Letöltése</strong> gombra.</li>
                <li>Nyisd meg a letöltött fájlt a Fájlok vagy Letöltések mappából.</li>
                <li>Az iOS felajánlja: <em>"Összes hozzáadása a Naptárhoz"</em>.</li>
                <li>Válassz ki egy dedikált (pl. "Egyetem") naptárat, és kész!</li>
              </ol>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <CalendarIcon className="w-4 h-4 text-blue-400" />
                Google Naptár (Web & Android):
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Töltsd le a számítógépen a fenti <strong className="text-white">.ics fájlt</strong>.</li>
                <li>Nyisd meg a <span className="text-blue-300 underline">calendar.google.com</span> oldalt.</li>
                <li>Jobb felül: Fogaskerék (Beállítások) &rarr; <em>Importálás és exportálás</em>.</li>
                <li>Válaszd ki az .ics fájlt, válaszd ki a naptárat, majd kattints az <em>Importálás</em> gombra!</li>
              </ol>
            </div>
          </div>

          {/* Raw Code Block */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span className="flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                Egybefüggő iCalendar (.ics) Forráskód:
              </span>
              <button
                onClick={handleCopy}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-[11px]"
              >
                {copied ? 'Kimásolva' : 'Kód másolása vágólapra'}
              </button>
            </div>

            <div className="relative">
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-300/90 overflow-x-auto max-h-56 select-all scrollbar-thin">
                {icsCode}
              </pre>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Időzóna: Europe/Budapest (CET/CEST automatikus téli-nyári időszámítással)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium"
          >
            Bezárás
          </button>
        </div>
      </div>
    </div>
  );
};
