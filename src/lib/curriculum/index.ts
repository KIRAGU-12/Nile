import type { Course, CurriculumMeta } from "./types";
import { YEAR_1 } from "./year1";
import { YEAR_2 } from "./year2";
import { YEAR_3 } from "./year3";
import { YEAR_4 } from "./year4";

export const YEARS: Record<number, Course[]> = {
  1: YEAR_1,
  2: YEAR_2,
  3: YEAR_3,
  4: YEAR_4,
};

export const ALL_COURSES: Course[] = [
  ...YEAR_1,
  ...YEAR_2,
  ...YEAR_3,
  ...YEAR_4,
];

export const COURSES_BY_CODE: Record<string, Course> = ALL_COURSES.reduce(
  (acc, c) => {
    acc[c.code] = c;
    return acc;
  },
  {} as Record<string, Course>
);

export function courseSlug(code: string): string {
  return code.toLowerCase().replace(/\s+/g, "-");
}

export const COURSES_BY_SLUG: Record<string, Course> = ALL_COURSES.reduce(
  (acc, c) => {
    acc[courseSlug(c.code)] = c;
    return acc;
  },
  {} as Record<string, Course>
);

export function getCourse(code: string): Course | undefined {
  return COURSES_BY_CODE[code];
}

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES_BY_SLUG[slug];
}

export function coursePath(code: string): string {
  return `/courses/${courseSlug(code)}`;
}

export function getCoursesBySemester(semester: number): Course[] {
  return ALL_COURSES.filter((c) => c.semester === semester).sort((a, b) =>
    a.title.localeCompare(b.title)
  );
}

export function getCoursesByYear(year: number): Course[] {
  return ALL_COURSES.filter((c) => c.year === year).sort((a, b) => a.semester - b.semester);
}

export const SEMESTER_TITLES: Record<number, string> = {
  1: "Year 1, Semester 1",
  2: "Year 1, Semester 2",
  3: "Year 2, Semester 3",
  4: "Year 2, Semester 4",
  5: "Year 3, Semester 5",
  6: "Year 3, Semester 6",
  7: "Year 4, Semester 7",
  8: "Year 4, Semester 8",
};

export const CURRICULUM_META: CurriculumMeta = {
  program: "Bachelor of Education (Arts) in English and Literature",
  university: "Nile — Kenyan University Curriculum (English & Literature)",
  duration: "4 years (8 semesters)",
  mode: "Full-time and Open, Distance and e-Learning (ODeL) modes",
  entryRequirement:
    "KCSE mean grade C+ (or equivalent) with a minimum of C+ in English, or a relevant Diploma. International Baccalaureate or equivalent qualifications also accepted.",
  totalUnits: ALL_COURSES.length,
  description:
    "A four-year degree preparing students for teaching English and Literature in Kenyan secondary schools and for further academic study. It combines literary studies (British, American, African and world literatures), the English language (history, linguistics, applied linguistics) and professional education and teaching practice.",
};
