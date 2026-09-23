export type DayOfWeek = 1 | 2 | 3 | 4 | 5; // 1 = Hétfő, 5 = Péntek

export type ActivityType = 
  | 'elmelet' 
  | 'gyakorlat' 
  | 'tanulas' 
  | 'szunet' 
  | 'szabadido';

export type SubjectCategory = 
  | 'programming' 
  | 'math' 
  | 'logic' 
  | 'systems' 
  | 'methodology' 
  | 'humanities' 
  | 'startup' 
  | 'sport' 
  | 'general';

export interface RegisteredCourse {
  name: string;
  code: string;
  credits: number;
  semester: number;
  requirement: 'Kollokvium' | 'Gyakorlati jegy' | 'Aláírás';
  typeText?: string;
  hasInPersonClass: boolean;
  dayTime?: string;
  room?: string;
  instructor?: string;
  kurzusKod?: string;
}

export interface ClassEvent {
  id: string;
  name: string;
  shortName: string;
  type: 'elmelet' | 'gyakorlat' | 'elearning';
  dayOfWeek: DayOfWeek;
  dayName: string;
  startTime: string; // "08:00"
  endTime: string;   // "09:40"
  durationMinutes: number;
  room?: string;
  instructor?: string;
  kurzusKod?: string;
  category: SubjectCategory;
  headerColorClass: string;
  cardColorClass: string;
  description?: string;
  neptunColor: 'green' | 'amber';
  courseCode?: string;
  credits?: number;
  requirement?: 'Kollokvium' | 'Gyakorlati jegy' | 'Aláírás';
  isElearning?: boolean;
}

export interface StudyBlock {
  id: string;
  title: string;
  dayOfWeek: DayOfWeek;
  dayName: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  relatedSubject: string;
  focusGoal: string;
  technique: string; // pl. "Pomodoro (2x50 perc)", "Kódolási gyakorlat", "Feladatmegoldás"
  colorClass: string;
  isCustom?: boolean;
}

export interface FixedActivity {
  id: string;
  title: string;
  type: 'edzes' | 'ebed' | 'munka' | 'szabadido';
  dayOfWeek: DayOfWeek;
  dayName: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  location?: string;
  description?: string;
  colorClass: string;
}

export type Chronotype = 'early' | 'balanced' | 'night';

export interface UserPreferences {
  chronotype: Chronotype;
  maxStudyHoursPerDay: number;
  includeStudyBlocks: boolean;
  reminderMinutes: number;
  semesterStartDate: string; // YYYY-MM-DD
  semesterWeeks: number;
}
