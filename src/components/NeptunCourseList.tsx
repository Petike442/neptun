import React from 'react';
import { OFFICIAL_REGISTERED_COURSES } from '../data/defaultSchedule';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Rocket, 
  Clock, 
  FileText,
  AlertCircle
} from 'lucide-react';

export const NeptunCourseList: React.FC = () => {
  const totalCredits = OFFICIAL_REGISTERED_COURSES.reduce((acc, c) => acc + c.credits, 0);
  const examCourses = OFFICIAL_REGISTERED_COURSES.filter((c) => c.requirement === 'Kollokvium');
  const practiceCourses = OFFICIAL_REGISTERED_COURSES.filter((c) => c.requirement === 'Gyakorlati jegy');
  const signatureCourses = OFFICIAL_REGISTERED_COURSES.filter((c) => c.requirement === 'Aláírás');

  return (
    <div className="space-y-6">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Összes Felvett Kredit</span>
            <GraduationCap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-white">{totalCredits}</span>
            <span className="text-xs text-emerald-400 font-bold">kredit</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">11 tárgy • 1. félév (Bsc)</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Kollokvium (Vizsga)</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-blue-300">{examCourses.length}</span>
            <span className="text-xs text-slate-400">tárgy</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{examCourses.reduce((a, b) => a + b.credits, 0)} kredit (vizsgaidőszakban)</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Gyakorlati Jegy</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-emerald-300">{practiceCourses.length}</span>
            <span className="text-xs text-slate-400">tárgy</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{practiceCourses.reduce((a, b) => a + b.credits, 0)} kredit (évközi ZH + beadandó)</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">HSUP Startup I.</span>
            <Rocket className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-amber-300">4</span>
            <span className="text-xs text-amber-400 font-bold">kredit</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Online e-learning platform</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 bg-slate-850 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Hivatalos Neptun Tárgylista (11 kurzus)
            </h3>
            <p className="text-xs text-slate-400">
              A Neptun rendszerben rögzített hivatalos tantárgyaid, tárgykódok és követelmények
            </p>
          </div>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
            1. Szemeszter • 28 Kredit
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/60 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Tantárgy neve</th>
                <th className="py-3 px-4 w-32">Tárgykód</th>
                <th className="py-3 px-4 w-28">Terem</th>
                <th className="py-3 px-4 w-20 text-center">Kredit</th>
                <th className="py-3 px-4 w-36">Követelmény</th>
                <th className="py-3 px-4">Időpont & Oktató</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-xs">
              {OFFICIAL_REGISTERED_COURSES.map((course) => {
                const isHsup = course.code === 'NBG_GI960G4';
                return (
                  <tr
                    key={course.code}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      isHsup ? 'bg-amber-950/15' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-white flex items-center gap-2">
                        {isHsup && <Rocket className="w-4 h-4 text-amber-400 shrink-0" />}
                        <span>{course.name}</span>
                        {course.typeText && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                            {course.typeText}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-slate-300">
                      <div className="space-y-0.5">
                        <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 inline-block">
                          {course.code}
                        </span>
                        {course.kurzusKod && (
                          <span className="text-[10px] text-slate-400 block font-sans">
                            {course.kurzusKod}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {course.room ? (
                        <span className="inline-flex items-center gap-1 font-mono font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded text-[11px]">
                          {course.room}
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block font-extrabold text-sm text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {course.credits}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {course.requirement === 'Kollokvium' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Kollokvium (Vizsga)
                        </span>
                      )}
                      {course.requirement === 'Gyakorlati jegy' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Gyakorlati jegy
                        </span>
                      )}
                      {course.requirement === 'Aláírás' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-500/20 text-slate-300 border border-slate-500/30">
                          Aláírás megszerzése
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className={isHsup ? 'text-amber-300 font-medium' : ''}>
                            {course.dayTime}
                          </span>
                        </div>
                        {course.instructor && (
                          <div className="text-[11px] text-slate-400 pl-5">
                            Oktató: <span className="text-slate-200">{course.instructor}</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* HSUP Note Box */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/30 border border-amber-500/40 rounded-2xl p-5 shadow-lg flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
          <Rocket className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            HSUP (Hungarian Startup University Program) Taktikai Tanács
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
              4 Kredit!
            </span>
          </h4>
          <p className="text-slate-300 leading-relaxed">
            A HSUP egy országos felsőoktatási online startup képzés, amelynek <strong>nincs kötelező tantermi órája a Neptunban</strong>. Helyette hétről hétre online modulokat, videókat és kvízeket kell elvégezned az e-learning platformon (vagy mobilos applikációban), félév végén pedig egy startup koncepciót (One-pagert) kell leadni.
          </p>
          <p className="text-amber-200/90 font-medium pt-1">
            💡 <strong>Tipp az órarendhez:</strong> A kedd reggeli 08:45–09:45-ös szabad idősávba beiktattunk egy fix heti HSUP fókuszblokkot, hogy a heti teszteket és modulokat mindig határidőre letudd!
          </p>
        </div>
      </div>

    </div>
  );
};
