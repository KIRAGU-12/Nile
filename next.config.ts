import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The lecture notes are read from the filesystem at runtime (src/lib/curriculum/units.ts).
  // Make sure those markdown files are shipped with the serverless build so the unit
  // pages, chat retrieval and quizzes keep working when the site is hosted.
  outputFileTracingIncludes: {
    "/courses/[code]": ["./src/lib/curriculum/notes/**/*"],
    "/api/agent/chat": ["./src/lib/curriculum/notes/**/*"],
    "/api/quiz/grade": ["./src/lib/curriculum/notes/**/*"],
    "/api/quiz/explain": ["./src/lib/curriculum/notes/**/*"],
  },
};

export default nextConfig;
