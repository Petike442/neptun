import { StudyBlock, Chronotype } from '../types/schedule';

export interface StudyPlanOptions {
  chronotype: Chronotype;
  maxStudyHoursPerDay: number;
}

export function generateSmartStudyBlocks(options: StudyPlanOptions): StudyBlock[] {
  const { chronotype, maxStudyHoursPerDay } = options;

  // HÉTFŐ blocks (13:40 Prog ea., 17:20 Logika gy.)
  const monBlocks: StudyBlock[] = [];
  if (chronotype === 'early') {
    monBlocks.push({
      id: 'study-mon-1',
      title: 'Kalkulus I. & Logika átnézés',
      dayOfWeek: 1,
      dayName: 'Hétfő',
      startTime: '09:30',
      endTime: '11:30',
      durationMinutes: 120,
      relatedSubject: 'Kalkulus I. & Logika',
      focusGoal: 'Heti célok kitűzése, alapfogalmak áttekintése friss fejjel',
      technique: 'Deep Work (2x50 perc)',
      colorClass: 'border-l-4 border-l-purple-500 bg-purple-950/30 text-purple-200',
    });
  } else if (chronotype === 'balanced') {
    monBlocks.push({
      id: 'study-mon-1',
      title: 'Logikai alapok rákészülés',
      dayOfWeek: 1,
      dayName: 'Hétfő',
      startTime: '15:40',
      endTime: '17:00',
      durationMinutes: 80,
      relatedSubject: 'Az informatika logikai alapjai (NBT_IM723G3)',
      focusGoal: 'Ítéletkalkulus feladatok átismétlése a 17:20-as gyakorlat előtt a könyvtárban',
      technique: 'Spaced Practice',
      colorClass: 'border-l-4 border-l-purple-500 bg-purple-950/30 text-purple-200',
    });
    if (maxStudyHoursPerDay >= 2) {
      monBlocks.push({
        id: 'study-mon-2',
        title: 'Prog I. előadás kódpróba',
        dayOfWeek: 1,
        dayName: 'Hétfő',
        startTime: '19:45',
        endTime: '20:45',
        durationMinutes: 60,
        relatedSubject: 'Magasszintű programozási nyelvek I. (NBT_IM812K3)',
        focusGoal: 'A délutáni előadás C/C++ kódjainak kipróbálása saját gépen',
        technique: 'Aktív kódolás (Hands-on)',
        colorClass: 'border-l-4 border-l-indigo-500 bg-indigo-950/30 text-indigo-200',
      });
    }
  } else {
    // Night owl
    monBlocks.push({
      id: 'study-mon-1',
      title: 'Esti fókusz: Programozás & Logika',
      dayOfWeek: 1,
      dayName: 'Hétfő',
      startTime: '19:40',
      endTime: '21:40',
      durationMinutes: 120,
      relatedSubject: 'Prog I. & Logika',
      focusGoal: 'Gyakorlati feladatok megoldása, kódírás zavartalan esti csendben',
      technique: 'Éjszakai Flow blokk',
      colorClass: 'border-l-4 border-l-purple-500 bg-purple-950/30 text-purple-200',
    });
  }

  // KEDD blocks (10:00 Info gy., 13:40 Info ea. | 18:00 Edzés)
  // Reggel 10-ig szabad! Ideális a HSUP (Startup) online modulhoz!
  const tueBlocks: StudyBlock[] = [];
  tueBlocks.push({
    id: 'study-tue-hsup',
    title: '🚀 HSUP Startup I. modul & kvíz',
    dayOfWeek: 2,
    dayName: 'Kedd',
    startTime: '08:45',
    endTime: '09:45',
    durationMinutes: 60,
    relatedSubject: 'Startup vállalkozás indítása I. (NBG_GI960G4 - 4 kredit)',
    focusGoal: 'Heti e-learning tananyag áttekintése, tesztek és one-pager kitöltése',
    technique: 'E-learning Micro-learning',
    colorClass: 'border-l-4 border-l-amber-500 bg-amber-950/30 text-amber-200',
  });

  tueBlocks.push({
    id: 'study-tue-1',
    title: 'Algoritmus & Info előkészítés',
    dayOfWeek: 2,
    dayName: 'Kedd',
    startTime: '12:45',
    endTime: '13:30',
    durationMinutes: 45,
    relatedSubject: 'Információábrázolás és algoritmizálás (NBT_PI272K2)',
    focusGoal: 'Lyukasóra fókusz: reggeli gyakorlati jegyzetek átfutása az elmélet előtt',
    technique: 'Micro-review',
    colorClass: 'border-l-4 border-l-purple-500 bg-purple-950/30 text-purple-200',
  });

  if (chronotype !== 'night') {
    tueBlocks.push({
      id: 'study-tue-2',
      title: 'Programozás I. labor felkészülés',
      dayOfWeek: 2,
      dayName: 'Kedd',
      startTime: '16:00',
      endTime: '17:30',
      durationMinutes: 90,
      relatedSubject: 'Magasszintű programozási nyelvek I. gy. (NBI_PI100G3)',
      focusGoal: 'Gép előtti feladatmegoldás a szerdai gyakorlatra',
      technique: 'Konzol / IDE feladatgyakorlás',
      colorClass: 'border-l-4 border-l-indigo-500 bg-indigo-950/30 text-indigo-200',
    });
  } else {
    // Night owl
    tueBlocks.push({
      id: 'study-tue-2',
      title: 'Szerdai labor kódolás (Esti Flow)',
      dayOfWeek: 2,
      dayName: 'Kedd',
      startTime: '20:30',
      endTime: '21:45',
      durationMinutes: 75,
      relatedSubject: 'Magasszintű programozási nyelvek I. gy. (NBI_PI100G3)',
      focusGoal: 'C/C++ algoritmusok tesztelése a holnapi labor előtt',
      technique: 'Éjszakai kódolás',
      colorClass: 'border-l-4 border-l-indigo-500 bg-indigo-950/30 text-indigo-200',
    });
  }

  // SZERDA blocks (10:00 Logika ea. [E.C.I.124], 11:50 Prog gy. 1 [E.C.I.110], 15:30 Prog gy. 2 [E.C.I.108])
  // Reggel 10-ig szintén kényelmesen szabad!
  const wedBlocks: StudyBlock[] = [];
  if (chronotype === 'early') {
    wedBlocks.push({
      id: 'study-wed-early',
      title: 'Logika & Prog bemelegítés',
      dayOfWeek: 3,
      dayName: 'Szerda',
      startTime: '08:45',
      endTime: '09:45',
      durationMinutes: 60,
      relatedSubject: 'Az informatika logikai alapjai',
      focusGoal: 'A 10:00-s előadás előtti friss átnézés',
      technique: 'Aktív felidézés',
      colorClass: 'border-l-4 border-l-purple-500 bg-purple-950/30 text-purple-200',
    });
  }

  wedBlocks.push({
    id: 'study-wed-1',
    title: 'Prog I. dupla labor lezárás & debug',
    dayOfWeek: 3,
    dayName: 'Szerda',
    startTime: '17:40',
    endTime: '18:30',
    durationMinutes: 50,
    relatedSubject: 'Magasszintű programozási nyelvek I.',
    focusGoal: 'A 108-as és 110-es laborokon írt kódok commitolása és tesztelése',
    technique: 'Debug Sprint',
    colorClass: 'border-l-4 border-l-indigo-500 bg-indigo-950/30 text-indigo-200',
  });

  if (chronotype === 'night') {
    wedBlocks.push({
      id: 'study-wed-2',
      title: 'Csütörtöki Kalkulus & Rendszerek átnézés',
      dayOfWeek: 3,
      dayName: 'Szerda',
      startTime: '19:45',
      endTime: '21:00',
      durationMinutes: 75,
      relatedSubject: 'Kalkulus I. gy. (NBT_IM730G3)',
      focusGoal: 'Határérték mintapéldák levezetése a másnap 08:00-as Kalkulus gy. előtt',
      technique: 'Mintapélda levezetés',
      colorClass: 'border-l-4 border-l-purple-500 bg-purple-950/30 text-purple-200',
    });
  } else {
    wedBlocks.push({
      id: 'study-wed-2',
      title: 'Kalkulus I. rákészülés a reggeli órára',
      dayOfWeek: 3,
      dayName: 'Szerda',
      startTime: '19:00',
      endTime: '20:15',
      durationMinutes: 75,
      relatedSubject: 'Kalkulus I. gy. (NBT_IM730G3)',
      focusGoal: 'A holnapi csütörtök 8:00-as Kalkulus gyakorlat típusfeladatainak átnézése',
      technique: 'Matematikai levezetés',
      colorClass: 'border-l-4 border-l-purple-500 bg-purple-950/30 text-purple-200',
    });
  }

  // CSÜTÖRTÖK blocks (08:00 Kalkulus gy., 10:00 Rendszerek ea., 11:50 Kalkulus ea., 13:40 Tesi | 18:00 Edzés)
  const thuBlocks: StudyBlock[] = [];
  if (chronotype === 'night') {
    thuBlocks.push({
      id: 'study-thu-1',
      title: 'Kalkulus & Rendszerek összefoglaló',
      dayOfWeek: 4,
      dayName: 'Csütörtök',
      startTime: '20:30',
      endTime: '21:45',
      durationMinutes: 75,
      relatedSubject: 'Kalkulus I. & Számítógépes rendszerek (NBI_PI101K3)',
      focusGoal: 'A mai előadás és gyakorlat anyagának szintetizálása, feljegyzések',
      technique: 'Cornell jegyzetelés',
      colorClass: 'border-l-4 border-l-purple-500 bg-purple-950/30 text-purple-200',
    });
  } else {
    thuBlocks.push({
      id: 'study-thu-1',
      title: 'Kalkulus & Rendszerek összegzés',
      dayOfWeek: 4,
      dayName: 'Csütörtök',
      startTime: '16:30',
      endTime: '17:35',
      durationMinutes: 65,
      relatedSubject: 'Kalkulus I. & Számítógépes rendszerek',
      focusGoal: 'A mai órák lényegének összegzése még friss fejjel délután',
      technique: 'Aktív felidézés (Active Recall)',
      colorClass: 'border-l-4 border-l-purple-500 bg-purple-950/30 text-purple-200',
    });
  }

  // PÉNTEK blocks (Szuper-Péntek: 0 kontaktóra!)
  const friBlocks: StudyBlock[] = [];
  const friStart = chronotype === 'early' ? '09:30' : chronotype === 'night' ? '11:00' : '10:00';
  const friEnd = chronotype === 'early' ? '12:00' : chronotype === 'night' ? '13:30' : '12:30';

  friBlocks.push({
    id: 'study-fri-1',
    title: 'Szuper-Péntek: Heti Fő Deep Work',
    dayOfWeek: 5,
    dayName: 'Péntek',
    startTime: friStart,
    endTime: friEnd,
    durationMinutes: 150,
    relatedSubject: 'Kalkulus I. házi & Prog I. beadandó',
    focusGoal: 'A hét két legfontosabb feladatának letudása, hogy a teljes hétvége szabad maradhasson!',
    technique: 'Deep Work (3 x 45 perc)',
    colorClass: 'border-l-4 border-l-emerald-500 bg-emerald-950/30 text-emerald-200',
  });

  return [...monBlocks, ...tueBlocks, ...wedBlocks, ...thuBlocks, ...friBlocks];
}

export function calculateWeeklyStats(
  classesDurationMinutes: number,
  studyBlocks: StudyBlock[]
) {
  const totalStudyMinutes = studyBlocks.reduce((acc, b) => acc + b.durationMinutes, 0);
  const totalClassesMinutes = classesDurationMinutes;
  const totalCommitmentMinutes = totalClassesMinutes + totalStudyMinutes;

  return {
    classHours: Math.round((totalClassesMinutes / 60) * 10) / 10,
    studyHours: Math.round((totalStudyMinutes / 60) * 10) / 10,
    totalCommitmentHours: Math.round((totalCommitmentMinutes / 60) * 10) / 10,
    dailyAverageStudyHours: Math.round((totalStudyMinutes / 5 / 60) * 10) / 10,
  };
}
