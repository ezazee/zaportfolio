import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// Seed from STACKS constant — icon stored as icon_key (same as skill name)
const SKILLS_DATA = [
  { name: "HTML", icon_key: "HTML", background: "#f97316", color: "text-orange-500", category: "Frontend", is_active: true, display_order: 1 },
  { name: "CSS", icon_key: "CSS", background: "#3b82f6", color: "text-blue-500", category: "Frontend", is_active: true, display_order: 2 },
  { name: "JavaScript", icon_key: "JavaScript", background: "#facc15", color: "text-yellow-400", category: "Frontend", is_active: true, display_order: 3 },
  { name: "TypeScript", icon_key: "TypeScript", background: "#3178c6", color: "text-blue-500", category: "Frontend", is_active: true, display_order: 4 },
  { name: "Bootstrap", icon_key: "Bootstrap", background: "#7c3aed", color: "text-violet-600", category: "Frontend", is_active: true, display_order: 5 },
  { name: "TailwindCSS", icon_key: "TailwindCSS", background: "#38bdf8", color: "text-sky-400", category: "Utama", is_active: true, display_order: 6 },
  { name: "Vite", icon_key: "Vite", background: "#a855f7", color: "text-purple-500", category: "Frontend", is_active: true, display_order: 7 },
  { name: "React.js", icon_key: "React.js", background: "#22d3ee", color: "text-cyan-400", category: "Utama", is_active: true, display_order: 8 },
  { name: "Next.js", icon_key: "Next.js", background: "#404040", color: "text-neutral-50", category: "Utama", is_active: true, display_order: 9 },
  { name: "Node.js", icon_key: "Node.js", background: "#16a34a", color: "text-green-600", category: "Utama", is_active: true, display_order: 10 },
  { name: "Express.js", icon_key: "Express.js", background: "#525252", color: "text-neutral-200", category: "Backend", is_active: true, display_order: 11 },
  { name: "PHP", icon_key: "PHP", background: "#818cf8", color: "text-indigo-400", category: "Backend", is_active: true, display_order: 12 },
  { name: "Laravel", icon_key: "Laravel", background: "#b91c1c", color: "text-red-600", category: "Utama", is_active: true, display_order: 13 },
  { name: "MySQL", icon_key: "MySQL", background: "#0e7490", color: "text-cyan-700", category: "Database", is_active: true, display_order: 14 },
  { name: "PostgreSQL", icon_key: "PostgreSQL", background: "#336791", color: "text-blue-400", category: "Database", is_active: true, display_order: 15 },
  { name: "MongoDB", icon_key: "MongoDB", background: "#16a34a", color: "text-green-500", category: "Database", is_active: true, display_order: 16 },
  { name: "Git", icon_key: "Git", background: "#ea580c", color: "text-orange-500", category: "Tools", is_active: true, display_order: 17 },
  { name: "Github", icon_key: "Github", background: "#24292e", color: "text-neutral-100", category: "Tools", is_active: true, display_order: 18 },
  { name: "Npm", icon_key: "Npm", background: "#cc3534", color: "text-red-400", category: "Tools", is_active: true, display_order: 19 },
  { name: "Yarn", icon_key: "Yarn", background: "#2c8ebb", color: "text-sky-400", category: "Tools", is_active: true, display_order: 20 },
  { name: "Figma", icon_key: "Figma", background: "#ec4899", color: "text-pink-500", category: "Tools", is_active: true, display_order: 21 },
  { name: "Photoshop", icon_key: "Photoshop", background: "#001e36", color: "text-blue-300", category: "Tools", is_active: true, display_order: 22 },
  { name: "CorelDraw", icon_key: "CorelDraw", background: "#007940", color: "text-green-400", category: "Tools", is_active: true, display_order: 23 },
  // Inactive skills
  { name: "Vue.js", icon_key: "Vue.js", background: "#42b883", color: "text-green-400", category: "Frontend", is_active: false, display_order: 24 },
  { name: "Firebase", icon_key: "Firebase", background: "#f59e0b", color: "text-amber-500", category: "Database", is_active: false, display_order: 25 },
  { name: "Supabase", icon_key: "Supabase", background: "#3ecf8e", color: "text-emerald-500", category: "Database", is_active: false, display_order: 26 },
  { name: "Redux", icon_key: "Redux", background: "#7c3aed", color: "text-violet-500", category: "Frontend", is_active: false, display_order: 27 },
  { name: "Prisma", icon_key: "Prisma", background: "#0f766e", color: "text-teal-500", category: "Backend", is_active: false, display_order: 28 },
  { name: "Docker", icon_key: "Docker", background: "#2563eb", color: "text-blue-500", category: "Tools", is_active: false, display_order: 29 },
  { name: "Go", icon_key: "Go", background: "#0ea5e9", color: "text-sky-500", category: "Backend", is_active: false, display_order: 30 },
];

const main = async () => {
  console.log(`Seeding ${SKILLS_DATA.length} skills...`);
  const { error } = await supabase.from("skills").insert(SKILLS_DATA);
  if (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
  console.log(`Done! Inserted ${SKILLS_DATA.length} skills.`);
};

main();
