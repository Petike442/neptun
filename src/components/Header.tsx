import React from 'react';
import { 
  Calendar, 
  Download, 
  Code, 
  Sparkles, 
  BookOpen, 
  Clock, 
  ShieldCheck, 
  Smartphone,
  User,
  LogOut
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  onOpenIcsModal: () => void;
  onDownloadIcs: () => void;
  onOpenIPhoneGuide: () => void;
  activeTab: 'grid' | 'table' | 'courses' | 'advisor';
  setActiveTab: (tab: 'grid' | 'table' | 'courses' | 'advisor') => void;
  currentUser?: { username: string; name: string; role: string } | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenIcsModal,
  onDownloadIcs,
  onOpenIPhoneGuide,
  activeTab,
  setActiveTab,
  currentUser,
  onLogout,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30 pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-bold shrink-0">
                <Calendar className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Neptun Órarend & AI Tervező
                  </h1>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Neptun Validált
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Informatika Bsc • Termekkel, oktatókkal és iPhone szinkronizációval
                </p>
              </div>
            </div>

            {/* Mobile header controls */}
            <div className="flex md:hidden items-center gap-2">
              {currentUser && (
                <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-2 py-1 rounded-xl text-[11px] font-mono font-bold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{currentUser.username}</span>
                </div>
              )}

              <button
                onClick={onOpenIPhoneGuide}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold"
                title="iPhone használat"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>iPhone</span>
              </button>

              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Kijelentkezés"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation & Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Nav tabs (hidden on mobile, handled by MobileBottomNav) */}
            <div className="hidden md:flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 items-center">
              <button
                onClick={() => setActiveTab('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'grid'
                    ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                Heti Háló
              </button>
              <button
                onClick={() => setActiveTab('table')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'table'
                    ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                Idősávos Táblázat
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'courses'
                    ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
                <span>Felvett Tárgyak (28 kr)</span>
              </button>
              <button
                onClick={() => setActiveTab('advisor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'advisor'
                    ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                AI Tanácsadó
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5 w-full md:w-auto justify-end">
              <PWAInstallButton onOpenIPhoneGuide={onOpenIPhoneGuide} />

              <button
                onClick={onOpenIcsModal}
                className="hidden sm:flex px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium transition-colors items-center gap-1.5"
                title="Megtekintés és Kód másolása"
              >
                <Code className="w-3.5 h-3.5 text-indigo-400" />
                <span>.ICS Kód</span>
              </button>
              
              <button
                onClick={onDownloadIcs}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-900/30 transition-all flex items-center gap-1.5 active:scale-95"
                title="Naptár importálás iPhone és Google Naptárhoz"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Naptár Export (.ics)</span>
                <span className="sm:hidden">Naptár (.ics)</span>
              </button>

              {/* User Profile & Logout (Desktop) */}
              {currentUser && (
                <div className="hidden md:flex items-center gap-2 pl-2 ml-1 border-l border-slate-800">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700/80 text-xs">
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-mono font-bold text-white">{currentUser.username}</span>
                  </div>

                  {onLogout && (
                    <button
                      onClick={onLogout}
                      className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Kijelentkezés"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
