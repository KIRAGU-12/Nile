export interface SetBook {
  title: string;
  author: string;
  year?: string;
  edition?: string;
  publisher?: string;
  note?: string;
}

export interface KeyAuthor {
  name: string;
  lifespan?: string;
  nationality?: string;
  notableWorks?: string[];
  bio: string;
}

export interface Course {
  code: string;
  title: string;
  year: 1 | 2 | 3 | 4;
  semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  credits: number;
  description: string;
  learningOutcomes: string[];
  topics: { title: string; notes: string }[];
  setBooks: SetBook[];
  keyAuthors: KeyAuthor[];
  notes: string;
}

export interface CurriculumMeta {
  program: string;
  university: string;
  duration: string;
  mode: string;
  entryRequirement: string;
  totalUnits: number;
  description: string;
}
