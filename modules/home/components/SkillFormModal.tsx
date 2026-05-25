"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { LuX as XIcon } from "react-icons/lu";

const CATEGORIES = ["Utama", "Frontend", "Backend", "Database", "Tools"] as const;

const ICON_KEYS = [
  "HTML", "CSS", "JavaScript", "TypeScript", "Bootstrap", "TailwindCSS", "Vite",
  "React.js", "Next.js", "Node.js", "Express.js", "PHP", "Laravel",
  "MySQL", "PostgreSQL", "MongoDB", "Firebase", "Supabase",
  "Git", "Github", "Npm", "Yarn", "Figma", "Photoshop", "CorelDraw",
  "Vue.js", "Astro.js", "Redux", "Prisma", "Nest.js", "Go",
  "Kotlin", "Docker", "Jest", "Zod",
];

export interface SkillFormData {
  name: string;
  icon_key: string;
  background: string;
  color: string;
  category: string;
  is_active: boolean;
  display_order: number;
}

interface SkillFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SkillFormData) => Promise<void>;
  initialData?: SkillFormData;
  isLoading?: boolean;
}

const SkillFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }: SkillFormModalProps) => {
  const { register, handleSubmit, reset, watch } = useForm<SkillFormData>({
    defaultValues: initialData ?? {
      name: "", icon_key: "", background: "#888888",
      color: "text-neutral-500", category: "Frontend",
      is_active: true, display_order: 0,
    },
  });

  useEffect(() => {
    reset(initialData ?? {
      name: "", icon_key: "", background: "#888888",
      color: "text-neutral-500", category: "Frontend",
      is_active: true, display_order: 0,
    });
  }, [initialData, isOpen, reset]);

  const bgColor = watch("background");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                {initialData ? "Edit Skill" : "Tambah Skill"}
              </h2>
              <button onClick={onClose} className="rounded-lg p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">
                <XIcon size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">Nama</label>
                  <input {...register("name", { required: true })}
                    placeholder="React.js"
                    className="w-full rounded-lg bg-neutral-50 p-2 text-sm text-neutral-900 outline outline-neutral-300 dark:bg-neutral-800 dark:text-neutral-50 dark:outline-neutral-700"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">Icon Key</label>
                  <select {...register("icon_key", { required: true })}
                    className="w-full rounded-lg bg-neutral-50 p-2 text-sm text-neutral-900 outline outline-neutral-300 dark:bg-neutral-800 dark:text-neutral-50 dark:outline-neutral-700"
                  >
                    <option value="">Pilih icon</option>
                    {ICON_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">Background (hex)</label>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 flex-shrink-0 rounded-lg border border-neutral-300 dark:border-neutral-700" style={{ backgroundColor: bgColor }} />
                    <input {...register("background")} type="text" placeholder="#f97316"
                      className="w-full rounded-lg bg-neutral-50 p-2 text-sm text-neutral-900 outline outline-neutral-300 dark:bg-neutral-800 dark:text-neutral-50 dark:outline-neutral-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">Color (Tailwind)</label>
                  <input {...register("color")} placeholder="text-orange-500"
                    className="w-full rounded-lg bg-neutral-50 p-2 text-sm text-neutral-900 outline outline-neutral-300 dark:bg-neutral-800 dark:text-neutral-50 dark:outline-neutral-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">Kategori</label>
                  <select {...register("category")}
                    className="w-full rounded-lg bg-neutral-50 p-2 text-sm text-neutral-900 outline outline-neutral-300 dark:bg-neutral-800 dark:text-neutral-50 dark:outline-neutral-700"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">Display Order</label>
                  <input {...register("display_order", { valueAsNumber: true })} type="number"
                    className="w-full rounded-lg bg-neutral-50 p-2 text-sm text-neutral-900 outline outline-neutral-300 dark:bg-neutral-800 dark:text-neutral-50 dark:outline-neutral-700"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                <input {...register("is_active")} type="checkbox" className="accent-accent" />
                Tampilkan (is_active)
              </label>

              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={isLoading}
                  className="flex-1 rounded-xl bg-accent py-2 text-sm font-semibold text-dark transition hover:bg-amber-400 disabled:opacity-60"
                >
                  {isLoading ? "Menyimpan..." : "Simpan"}
                </button>
                <button type="button" onClick={onClose}
                  className="rounded-xl border border-neutral-300 px-4 py-2 text-sm text-neutral-600 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
                >
                  Batal
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SkillFormModal;
