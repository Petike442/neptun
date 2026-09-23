import React, { useState } from 'react';
import { 
  Sparkles, 
  Brain, 
  CheckCircle2, 
  Lightbulb, 
  ArrowRight, 
  MessageSquare, 
  Send,
  Zap,
  Target,
  Clock,
  GraduationCap,
  Award
} from 'lucide-react';
import { Chronotype } from '../types/schedule';

interface AiAdvisorProps {
  chronotype: Chronotype;
  maxStudyHours: number;
}

interface AdvisorFAQ {
  id: string;
  question: string;
  badge: string;
  answer: string;
  actionPoints: string[];
}

const FAQ_ITEMS: AdvisorFAQ[] = [
  {
    id: 'kalkulus',
    question: 'Hogyan éljem túl és abszolváljam sikeresen a Kalkulus I.-et?',
    badge: 'Kalkulus I. Túlélőkalauz',
    answer: 'A Mérnökinformatikus és Programtervező Bsc képzéseken a Kalkulus I. a legnagyobb lemorzsolódással járó szűrőtárgy. A legnagyobb hiba, ha valaki csak passzívan nézi az előadást („értem, amit a tanár ír a táblára”), de önállóan nem vezet le példákat ceruzával papíron.',
    actionPoints: [
      'Gyakorlat előtti áttekintés: A csütörtök 08:00-as gyakorlat előtt szerda este nézd át a heti definíciókat (határérték, környezetes definíció, differenciálási szabályok).',
      'Ceruzás munka: Oldj meg hetente legalább 8-10 típusfeladatot önállóan, puskázás nélkül.',
      'Szuper-Péntek: Használd ki a pénteki kontaktóra-mentességet 90 perc tiszta matematikai fókuszra!',
    ],
  },
  {
    id: 'prog',
    question: 'Hogyan készüljek fel a Magasszintű programozás I. előadásra és laborra?',
    badge: 'Programozás I. Labor Stratégia',
    answer: 'A hétfői előadás (13:40 [E.C.I.124]) után szerdán dupla számítógépes labortermi gyakorlat következik: 11:50-13:30 (E.C.I.110) és 15:30-17:10 (E.C.I.108). Ha a gépek elé úgy ülsz le, hogy ott próbálod először megérteni a szintaxist, a laboridő szintaktikai és memóriahibák keresésével fog eltelni.',
    actionPoints: [
      'Kedd délutáni felkészülés: Kedd 16:00-17:30 között gépeld be és próbáld ki a mintapéldákat saját gépen.',
      'Azonnali lezárás: A szerdai dupla labor után 17:40-kor szánj 50 percet a 110-es és 108-as laborokon felmerült feladatok lezárására és commitolására.',
      'Verziókezelés: Használj Git repository-t minden kódhoz és laborfeladathoz.',
    ],
  },
  {
    id: 'vizsga_stratégia',
    question: 'Hogyan osszam meg a figyelmemet az 5 Kollokvium és 5 Gyakorlati jegy között?',
    badge: 'Kollokvium & Gyak.jegy Menedzsment',
    answer: 'A felvett 28 kredited két egyenlő részre oszlik: 5 tárgyból évközi számonkérés és gyakorlati jegy a cél (pl. Kalkulus gy., Prog gy., Logika gy., Algoritmizálás gy., HSUP), míg 5 elméleti tárgyból kollokvium vár rád a vizsgaidőszakban.',
    actionPoints: [
      'Szorgalmi időszak = Gyakorlati jegyek biztosítása: Ha a heti beadandókat és mini-ZH-kat maximálisan teljesíted, a vizsgaidőszakban már csak az elméletre kell koncentrálnod.',
      'Folyamatos előadás-kivonatolás: Az elméleti előadásokból (Logika, Kalkulus ea., Prog ea., Rendszerek ea., Algoritmizálás ea.) készíts fejezetenként 1-2 oldalas összefoglalót a félév során.',
      'Startup vállalkozás (HSUP): 4 kredites e-learning tárgy! Ne hagyd az utolsó hétre, a heti mikrotananyagokat kedd reggelente 60 perc alatt tudd le.',
    ],
  },
  {
    id: 'pentek',
    question: 'Mi a legoptimálisabb stratégia a teljesen üres Péntekre?',
    badge: 'A „Szuper-Péntek” Elv',
    answer: 'Az órarended legnagyobb kincse a teljesen szabad Péntek (0 kontaktóra). Két út áll előtted: vagy elalszod a napot és vasárnap éjszaka kapkodsz a beadandókkal, vagy péntek délelőtt 10:00 és 12:30 között elintézed a heti Deep Work fókuszblokkot.',
    actionPoints: [
      '10:00 - 12:30 Deep Work blokk: Zárj be minden zavaró tényezőt, és fejezd be a heti két legnehezebb feladatot.',
      '13:00-tól szabad hétvége: Péntek kora délutántól vasárnap estig bűntudat nélkül pihenhetsz, kikapcsolódhatsz.',
      '3 napos feltöltődés: Hétfőn csak 13:40-kor van az első órád, így a hétfő délelőtt is kényelmes indulást biztosít!',
    ],
  },
];

export const AiAdvisor: React.FC<AiAdvisorProps> = ({ chronotype, maxStudyHours }) => {
  const [selectedFaq, setSelectedFaq] = useState<string>('kalkulus');
  const [customQuestion, setCustomQuestion] = useState('');
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  const activeFaq = FAQ_ITEMS.find((f) => f.id === selectedFaq) || FAQ_ITEMS[0];

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setIsThinking(true);
    setTimeout(() => {
      let response = '';
      const q = customQuestion.toLowerCase();

      if (q.includes('kalkulus') || q.includes('matek') || q.includes('zh')) {
        response = `A te Neptun órarended alapján a Kalkulus I. gyakorlatod csütörtökön 08:00-kor, az előadásod 11:50-kor van. A legjobb taktika: szerda este (18:00-19:20 között) oldj meg 3 határértékes vagy sorozatos feladatot, és jelöld be kérdőjellel a nehezen érthető lépéseket, hogy csütörtök reggel 8-kor azonnal fel tudd tenni a gyakorlatvezetőnek!`;
      } else if (q.includes('programozás') || q.includes('kód') || q.includes('c++') || q.includes('labor')) {
        response = `A Magasszintű programozási nyelvek I.-ből hétfőn délután előadásod van (13:40, E.C.I.124 terem), szerdán pedig két gyakorlati idősávod: 11:50-13:30 (E.C.I.110) és 15:30-17:10 (E.C.I.108). Kedd délután feltétlenül szánj időt a kódolásra! Így a szerdai laborokon nem az alap szintaktikai hibákkal fogsz küzdeni, hanem azonnal megszerezheted a jó gyakorlati jegyet.`;
      } else if (q.includes('hsup') || q.includes('startup')) {
        response = `A Startup vállalkozás indítása I. (NBG_GI960G4) 4 kredites e-learning tárgy! A leghatékonyabb beosztás: kedd reggelente 08:45-09:45 között, az Információábrázolás gyakorlat előtt végezd el az aktuális heti leckét és tesztet. Így nem torlódik a félév végére!`;
      } else if (q.includes('ritmus') || q.includes('este') || q.includes('alvás')) {
        response = `Mivel jelenleg „${chronotype === 'night' ? 'Éjszakai bagoly' : chronotype === 'early' ? 'Korán kelő' : 'Kiegyensúlyozott'}” beállításon vagy és napi ${maxStudyHours} óra tanulást terveztél, javaslom, hogy a hétfő reggeleket és péntekeket használd ki a mély fókuszú feladatokra, és csütörtök este 23:00 előtt térj nyugovóra, hogy a pénteki Deep Work blokkot maximális hatékonysággal indíthasd.`;
      } else {
        response = `Az egyetemi órarended kiváló szerkezetű: a hétfő délelőtt és a teljes péntek óramentes! Ezzel a 11 tantárggyal (28 kredit) heti ~${maxStudyHours * 5} óra tervezett tanulási blokk bőven elegendő a kiváló átlag megszerzéséhez anélkül, hogy a hétvégéidet fel kellene áldoznod.`;
      }

      setCustomAnswer(response);
      setIsThinking(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            AI Egyetemi Tanácsadó Engine
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Stratégiai Tanulási Terv az Informatikus Órarendedhez
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Az órarended elemzése alapján azonosítottuk a kritikus tárgyakat (Kalkulus I., Programozás I., Logikai alapok), a természetes lyukasórákat és a vizsgakövetelményeket, hogy minimalizáld a stresszt és maximalizáld a tanulmányi eredményedet.
          </p>
        </div>
      </div>

      {/* Main Grid: Subject Survival Guides & Advice */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Topics selector */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
            Témakörök & Taktikák:
          </div>
          {FAQ_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedFaq(item.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                selectedFaq === item.id
                  ? 'bg-slate-850 border-emerald-500/50 shadow-md text-white'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 block mb-0.5">
                  {item.badge}
                </span>
                <span className="text-xs font-bold leading-snug block">
                  {item.question}
                </span>
              </div>
              <ArrowRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                selectedFaq === item.id ? 'text-emerald-400 translate-x-1' : 'opacity-40'
              }`} />
            </button>
          ))}

          {/* Quick Stats Pill */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 mt-4 text-xs space-y-2">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Aktív Tanulási Profil:
            </div>
            <div className="text-slate-400 flex items-center justify-between">
              <span>Ritmus típus:</span>
              <strong className="text-white capitalize font-medium">{chronotype}</strong>
            </div>
            <div className="text-slate-400 flex items-center justify-between">
              <span>Napi tanulási keret:</span>
              <strong className="text-emerald-400 font-medium">{maxStudyHours} óra / nap</strong>
            </div>
            <div className="text-slate-400 flex items-center justify-between">
              <span>Felvett kreditek:</span>
              <strong className="text-emerald-400 font-medium">28 kredit (11 tárgy)</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Advice Card */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
              <Target className="w-3.5 h-3.5" />
              {activeFaq.badge}
            </div>

            <h3 className="text-lg font-bold text-white mb-3">
              {activeFaq.question}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              {activeFaq.answer}
            </p>

            <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Konkrét Cselekvési Lépések:
              </div>
              <ul className="space-y-2.5">
                {activeFaq.actionPoints.map((pt, i) => (
                  <li key={i} className="text-xs text-slate-200 flex items-start gap-2.5 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              Időzítsd a fókuszblokkokat a heti órarendedbe!
            </span>
            <span className="text-emerald-400 font-semibold">Tudományosan igazolt Pomodoro módszer</span>
          </div>
        </div>

      </div>

      {/* Interactive Ask AI Consultant */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">Kérdezz az AI Időbeosztás Tanácsadótól</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Tegyél fel egyedi kérdést a vizsgaidőszakról, beadandókról, vagy kérj tanácsot az időbeosztásod finomhangolásához!
        </p>

        <form onSubmit={handleAsk} className="flex gap-2 mb-4">
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Pl.: Hogyan osszam be a szerdai napomat a programozás gyakorlat előtt és után?"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button
            type="submit"
            disabled={isThinking || !customQuestion.trim()}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
          >
            {isThinking ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Tanács kérése</span>
              </>
            )}
          </button>
        </form>

        {customAnswer && (
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 text-xs text-emerald-200 animate-in fade-in duration-200 leading-relaxed flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-1">AI Tanácsadó válasza:</strong>
              {customAnswer}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
