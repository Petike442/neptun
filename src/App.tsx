/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  NEPTUN_CLASSES, 
  DEFAULT_PREFERENCES 
} from './data/defaultSchedule';
import { UserPreferences } from './types/schedule';
import { generateSmartStudyBlocks } from './utils/studyPlanner';
import { generateIcsString, downloadIcsFile } from './utils/icsGenerator';

import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { PreferencesBar } from './components/PreferencesBar';
import { TimetableGrid } from './components/TimetableGrid';
import { TableView } from './components/TableView';
import { NeptunCourseList } from './components/NeptunCourseList';
import { AiAdvisor } from './components/AiAdvisor';
import { IcsExportModal } from './components/IcsExportModal';
import { EventDetailModal } from './components/EventDetailModal';
import { IPhoneGuideModal } from './components/IPhoneGuideModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { OfflineIndicator } from './components/OfflineIndicator';

import { 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Info,
  GraduationCap,
  Smartphone
} from 'lucide-react';

interface AuthUser {
  username: string;
  name: string;
  role: string;
}

export default function App() {
  // Authentication state
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem('neptun_user_session') || sessionStorage.getItem('neptun_user_session');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading auth session', e);
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<'grid' | 'table' | 'courses' | 'advisor'>('grid');
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isIcsModalOpen, setIsIcsModalOpen] = useState(false);
  const [isIPhoneGuideOpen, setIsIPhoneGuideOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);

  // Intelligently compute study blocks whenever chronotype or study hour limits change
  const studyBlocks = useMemo(() => {
    return generateSmartStudyBlocks({
      chronotype: preferences.chronotype,
      maxStudyHoursPerDay: preferences.maxStudyHoursPerDay,
    });
  }, [preferences.chronotype, preferences.maxStudyHoursPerDay]);

  // Total class duration in minutes
  const classesDurationMinutes = useMemo(() => {
    return NEPTUN_CLASSES.reduce((acc, c) => acc + c.durationMinutes, 0);
  }, []);

  const handleUpdatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }));
  };

  const handleDownloadIcsDirectly = () => {
    const icsContent = generateIcsString({
      classes: NEPTUN_CLASSES,
      studyBlocks: studyBlocks,
      preferences: preferences,
      includeClasses: true,
      includeStudyBlocks: preferences.includeStudyBlocks,
    });

    downloadIcsFile(icsContent, 'egyetemi_orarend_tanulasterv.ics');
    setDownloadNotification('Sikeres letöltés! iPhone-on a Safari megkérdezi, hogy hozzáadod-e a naptárhoz (Összes hozzáadása).');
    setTimeout(() => setDownloadNotification(null), 5000);
  };

  const handleLogout = () => {
    localStorage.removeItem('neptun_user_session');
    sessionStorage.removeItem('neptun_user_session');
    setCurrentUser(null);
  };

  // If user is not authenticated, show the LoginScreen
  if (!currentUser) {
    return <LoginScreen onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenIcsModal={() => setIsIcsModalOpen(true)}
        onDownloadIcs={handleDownloadIcsDirectly}
        onOpenIPhoneGuide={() => setIsIPhoneGuideOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 pb-24 md:pb-8">
        
        {/* iPhone Quick Action Promo Bar for Mobile Users */}
        <div className="md:hidden bg-gradient-to-r from-blue-950/70 via-indigo-950/50 to-slate-900 border border-blue-500/30 rounded-2xl p-3.5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-white block">iPhone Naptár & Kezdőképernyő</span>
              <span className="text-[10px] text-blue-200/80">Használd natív appként Safariból!</span>
            </div>
          </div>
          <button
            onClick={() => setIsIPhoneGuideOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shrink-0 shadow-md shadow-blue-950 transition-all active:scale-95"
          >
            Útmutató
          </button>
        </div>

        {/* Download notification banner */}
        {downloadNotification && (
          <div className="bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 px-4 py-3 rounded-2xl flex items-center justify-between text-xs animate-in slide-in-from-top duration-300 shadow-xl">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{downloadNotification}</span>
            </div>
            <button
              onClick={() => setDownloadNotification(null)}
              className="text-emerald-400 hover:text-white text-xs font-semibold ml-3"
            >
              Rendben
            </button>
          </div>
        )}

        {/* 1. Statistics Bar */}
        <StatsBar
          classesDurationMinutes={classesDurationMinutes}
          studyBlocks={preferences.includeStudyBlocks ? studyBlocks : []}
        />

        {/* 2. Preferences & Control Bar */}
        <PreferencesBar
          preferences={preferences}
          onUpdatePreferences={handleUpdatePreferences}
        />

        {/* 3. Main Dynamic Content */}
        {activeTab === 'grid' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  Heti Órarend és Tanulási Beosztás
                </h2>
                <p className="text-xs text-slate-400">
                  Érintsd meg bármelyik tanórát a pontos terem, oktató és felkészülési tanácsok megtekintéséhez!
                </p>
              </div>
              <button
                onClick={() => setIsIPhoneGuideOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>iPhone szinkronizálás</span>
              </button>
            </div>

            <TimetableGrid
              classes={NEPTUN_CLASSES}
              studyBlocks={studyBlocks}
              showStudyBlocks={preferences.includeStudyBlocks}
              onSelectEvent={setSelectedEvent}
            />
          </section>
        )}

        {activeTab === 'table' && (
          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                Heti Órarend és Tanulási Terv Részletes Táblázatban
              </h2>
              <p className="text-xs text-slate-400">
                Idősávokra bontott, átlátható napirend órákkal, termekkel, oktatókkal és fókuszált tanulási blokkokkal.
              </p>
            </div>

            <TableView
              classes={NEPTUN_CLASSES}
              studyBlocks={preferences.includeStudyBlocks ? studyBlocks : []}
              onSelectEvent={setSelectedEvent}
            />
          </section>
        )}

        {activeTab === 'courses' && (
          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                Neptun Hivatalos Tárgylista és Kreditkövetelmények
              </h2>
              <p className="text-xs text-slate-400">
                A félévre felvett 11 kurzus, pontos termekkel, oktatókkal és kreditpontokkal (összesen 28 kredit).
              </p>
            </div>

            <NeptunCourseList />
          </section>
        )}

        {activeTab === 'advisor' && (
          <section>
            <AiAdvisor
              chronotype={preferences.chronotype}
              maxStudyHours={preferences.maxStudyHoursPerDay}
            />
          </section>
        )}

        {/* 4. Curriculum Summary Box */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-white font-bold mb-2">
            <Info className="w-4 h-4 text-emerald-400" />
            Neptunból Felvett Tárgyak Akadémiai Áttekintése (28 Kredit):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
            <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
              <span className="font-bold text-slate-200 block">Kalkulus I. (ea. + gy.)</span>
              <span className="text-[11px] text-slate-400">E.C.I.121 & E.C.I.124 • 5 kredit</span>
              <p className="text-[11px] text-indigo-300 mt-1">Csütörtök 08:00 és 11:50. Kulcstárgy, heti típusfeladat-gyakorlás javasolt.</p>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
              <span className="font-bold text-slate-200 block">Magasszintű programozás I. (ea. + gy.)</span>
              <span className="text-[11px] text-slate-400">E.C.I.124, E.C.I.110 & E.C.I.108 • 6 kredit</span>
              <p className="text-[11px] text-emerald-300 mt-1">Hétfő 13:40 (ea.) & Szerda dupla labor (11:50 & 15:30).</p>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
              <span className="font-bold text-slate-200 block">Információábrázolás & Algoritmusok</span>
              <span className="text-[11px] text-slate-400">E.C.I.111 & E.C.I.124 • 5 kredit</span>
              <p className="text-[11px] text-amber-300 mt-1">Kedd 10:00 (gy.) & 13:40 (ea.). Számrendszerek és pszeudokódok.</p>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
              <span className="font-bold text-slate-200 block">Az informatika logikai alapjai</span>
              <span className="text-[11px] text-slate-400">E.C.I.110 & E.C.I.124 • 5 kredit</span>
              <p className="text-[11px] text-teal-300 mt-1">Hétfő 17:20 (gy.) & Szerda 10:00 (ea.). Ítéletkalkulus és normálformák.</p>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
              <span className="font-bold text-slate-200 block">Számítógépes rendszerek (ea.)</span>
              <span className="text-[11px] text-slate-400">E.C.I.124 • 3 kredit</span>
              <p className="text-[11px] text-cyan-300 mt-1">Csütörtök 10:00 - 11:40. Neumann-modell, processzor, memóriakezelés.</p>
            </div>
            <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
              <span className="font-bold text-slate-200 block">Startup (HSUP) & Testnevelés</span>
              <span className="text-[11px] text-slate-400">Online & E.E.-.CSAR/B • 4 kredit</span>
              <p className="text-[11px] text-rose-300 mt-1">Online HSUP modulok + Csütörtök 13:40 vívás gyakorlat.</p>
            </div>
          </div>
        </section>

      </main>

      {/* Desktop Footer (hidden bottom padding accommodates mobile nav) */}
      <footer className="border-t border-slate-800/80 bg-slate-900/40 py-6 text-center text-xs text-slate-500 mb-14 md:mb-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Neptun Heti Órarend & Fókuszált Tanulástervező • Bejelentkezve: <span className="font-mono text-slate-300">{currentUser.username}</span>
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>RFC 5545 .ics</span>
            <span>•</span>
            <span>Apple Calendar</span>
            <span>•</span>
            <span>iOS Standalone PWA</span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (iOS Tab Bar style) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenIPhoneGuide={() => setIsIPhoneGuideOpen(true)}
        onDownloadIcs={handleDownloadIcsDirectly}
      />

      {/* Offline Status Toast */}
      <OfflineIndicator />

      {/* Modal: iPhone / iOS Guide */}
      <IPhoneGuideModal
        isOpen={isIPhoneGuideOpen}
        onClose={() => setIsIPhoneGuideOpen(false)}
        onDownloadIcs={handleDownloadIcsDirectly}
      />

      {/* Modal: iCalendar code export */}
      <IcsExportModal
        isOpen={isIcsModalOpen}
        onClose={() => setIsIcsModalOpen(false)}
        classes={NEPTUN_CLASSES}
        studyBlocks={studyBlocks}
        preferences={preferences}
      />

      {/* Modal: Event detail preview */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

    </div>
  );
}
