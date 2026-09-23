import React from 'react';
import { Calendar, Clock, BookOpen, Sparkles, Smartphone, Download } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'grid' | 'table' | 'courses' | 'advisor';
  setActiveTab: (tab: 'grid' | 'table' | 'courses' | 'advisor') => void;
  onOpenIPhoneGuide: () => void;
  onDownloadIcs: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenIPhoneGuide,
  onDownloadIcs,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 pb-[env(safe-area-inset-bottom,8px)] pt-1 px-2 shadow-2xl">
      <div className="grid grid-cols-5 items-center justify-around">
        {/* 1. Grid */}
        <button
          onClick={() => setActiveTab('grid')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            activeTab === 'grid'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'grid' ? 'bg-emerald-500/20' : ''}`}>
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Órarend</span>
        </button>

        {/* 2. Table */}
        <button
          onClick={() => setActiveTab('table')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            activeTab === 'table'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'table' ? 'bg-emerald-500/20' : ''}`}>
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Idősávok</span>
        </button>

        {/* 3. Courses */}
        <button
          onClick={() => setActiveTab('courses')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            activeTab === 'courses'
              ? 'text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'courses' ? 'bg-emerald-500/20' : ''}`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Tárgyak</span>
        </button>

        {/* 4. AI Advisor */}
        <button
          onClick={() => setActiveTab('advisor')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            activeTab === 'advisor'
              ? 'text-amber-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-lg ${activeTab === 'advisor' ? 'bg-amber-500/20' : ''}`}>
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Tanácsadó</span>
        </button>

        {/* 5. iPhone / Apple Sync */}
        <button
          onClick={onOpenIPhoneGuide}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-blue-400 hover:text-blue-300 transition-all group"
        >
          <div className="p-1 rounded-lg bg-blue-500/20 text-blue-400 group-hover:scale-105 transition-transform">
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">iPhone</span>
        </button>
      </div>
    </nav>
  );
};
