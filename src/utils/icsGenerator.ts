import { ClassEvent, StudyBlock, UserPreferences } from '../types/schedule';

export interface IcsExportOptions {
  classes: ClassEvent[];
  studyBlocks: StudyBlock[];
  preferences: UserPreferences;
  includeClasses: boolean;
  includeStudyBlocks: boolean;
}

// Format date to iCalendar local date string: YYYYMMDDTHHMMSS
function formatIcsDateTime(dateStr: string, timeStr: string): string {
  // dateStr is 'YYYY-MM-DD', timeStr is 'HH:mm'
  const cleanDate = dateStr.replace(/-/g, '');
  const cleanTime = timeStr.replace(':', '') + '00';
  return `${cleanDate}T${cleanTime}`;
}

// Compute the exact date of a day of week (1 = Monday ... 5 = Friday) relative to semester start Monday
function getDateForDayOfWeek(semesterStartMonday: string, dayOfWeek: number): string {
  const [year, month, day] = semesterStartMonday.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  // Add offset (dayOfWeek - 1)
  date.setDate(date.getDate() + (dayOfWeek - 1));
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

export function generateIcsString(options: IcsExportOptions): string {
  const {
    classes,
    studyBlocks,
    preferences,
    includeClasses,
    includeStudyBlocks,
  } = options;

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Neptun AI University Planner//HU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Egyetemi Órarend & Tanulásterv',
    'X-WR-CALDESC:Hivatalos Neptun heti órarend és célzott tanulási fókuszblokkok',
    'X-WR-TIMEZONE:Europe/Budapest',
    // Standard VTIMEZONE for Central European Time (Budapest)
    'BEGIN:VTIMEZONE',
    'TZID:Europe/Budapest',
    'X-LIC-LOCATION:Europe/Budapest',
    'BEGIN:DAYLIGHT',
    'TZOFFSETFROM:+0100',
    'TZOFFSETTO:+0200',
    'TZNAME:CEST',
    'DTSTART:19700329T020000',
    'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
    'END:DAYLIGHT',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:+0200',
    'TZOFFSETTO:+0100',
    'TZNAME:CET',
    'DTSTART:19701025T030000',
    'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
    'END:STANDARD',
    'END:VTIMEZONE',
  ];

  const nowUtc = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const weeksCount = preferences.semesterWeeks || 14;

  // 1. Classes
  if (includeClasses) {
    for (const cls of classes) {
      const eventDate = getDateForDayOfWeek(preferences.semesterStartDate, cls.dayOfWeek);
      const dtStart = formatIcsDateTime(eventDate, cls.startTime);
      const dtEnd = formatIcsDateTime(eventDate, cls.endTime);
      const typeLabel = cls.type === 'elmelet' ? 'ea.' : 'gy.';
      const roomTag = cls.room ? ` [${cls.room}]` : '';
      const summary = `🎓 ${cls.shortName || cls.name}${roomTag}`;
      const description = `${cls.name}\\nTerem: ${cls.room || 'Campus'}\\nOktató: ${cls.instructor || 'N/A'}\\nKurzuskód: ${cls.kurzusKod || 'N/A'}\\nTípus: ${typeLabel === 'ea.' ? 'Elméleti előadás' : 'Gyakorlat'}\\nKredit: ${cls.credits || 0} kr\\nKövetelmény: ${cls.requirement || 'Aláírás'}\\nTárgykód: ${cls.courseCode || ''}\\n${escapeIcsText(cls.description || '')}`;

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:neptun-${cls.id}-${eventDate}@neptunplanner.hu`);
      lines.push(`DTSTAMP:${nowUtc}`);
      lines.push(`DTSTART;TZID=Europe/Budapest:${dtStart}`);
      lines.push(`DTEND;TZID=Europe/Budapest:${dtEnd}`);
      lines.push(`RRULE:FREQ=WEEKLY;COUNT=${weeksCount}`);
      lines.push(`SUMMARY:${summary}`);
      lines.push(`DESCRIPTION:${description}`);
      lines.push(`LOCATION:${escapeIcsText(cls.room || 'Egyetem')}`);
      lines.push(`CATEGORIES:Egyetem,Órarend,${typeLabel === 'ea.' ? 'Előadás' : 'Gyakorlat'}`);
      lines.push('STATUS:CONFIRMED');

      // Reminder alarm
      if (preferences.reminderMinutes > 0) {
        lines.push('BEGIN:VALARM');
        lines.push(`TRIGGER:-PT${preferences.reminderMinutes}M`);
        lines.push('ACTION:DISPLAY');
        lines.push(`DESCRIPTION:Óra kezdődik: ${escapeIcsText(cls.name)}`);
        lines.push('END:VALARM');
      }

      lines.push('END:VEVENT');
    }
  }

  // 2. Study Blocks
  if (includeStudyBlocks) {
    for (const blk of studyBlocks) {
      const eventDate = getDateForDayOfWeek(preferences.semesterStartDate, blk.dayOfWeek);
      const dtStart = formatIcsDateTime(eventDate, blk.startTime);
      const dtEnd = formatIcsDateTime(eventDate, blk.endTime);
      const summary = `📚 ${blk.title}`;
      const description = `Kapcsolódó tárgy: ${escapeIcsText(blk.relatedSubject)}\\nMódszertan: ${escapeIcsText(blk.technique)}\\nCélkitűzés: ${escapeIcsText(blk.focusGoal)}`;

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:study-${blk.id}-${eventDate}@neptunplanner.hu`);
      lines.push(`DTSTAMP:${nowUtc}`);
      lines.push(`DTSTART;TZID=Europe/Budapest:${dtStart}`);
      lines.push(`DTEND;TZID=Europe/Budapest:${dtEnd}`);
      lines.push(`RRULE:FREQ=WEEKLY;COUNT=${weeksCount}`);
      lines.push(`SUMMARY:${summary}`);
      lines.push(`DESCRIPTION:${description}`);
      lines.push('LOCATION:Könyvtár / Otthoni íróasztal');
      lines.push('CATEGORIES:Tanulás,Fókusz,Önálló munka');
      lines.push('STATUS:CONFIRMED');

      lines.push('BEGIN:VALARM');
      lines.push('TRIGGER:-PT10M');
      lines.push('ACTION:DISPLAY');
      lines.push(`DESCRIPTION:Tanulási blokk indul 10 perc múlva: ${escapeIcsText(blk.title)}`);
      lines.push('END:VALARM');

      lines.push('END:VEVENT');
    }
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export function downloadIcsFile(icsContent: string, fileName = 'egyetemi_orarend_tanulasterv.ics') {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
