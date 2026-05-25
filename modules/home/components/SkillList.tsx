"use client";

import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { BiCodeAlt as SkillsIcon } from "react-icons/bi";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { LuPlus as PlusIcon, LuPencil as PencilIcon, LuTrash2 as TrashIcon, LuEyeOff as HideIcon } from "react-icons/lu";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import ConfirmDialog from "@/common/components/elements/ConfirmDialog";
import { STACKS } from "@/common/constants/stacks";
import SkillTag from "@/common/components/elements/SkillTag";
import { useIsAuthor } from "@/hooks/useIsAuthor";
import { fetcher } from "@/services/fetcher";
import SkillFormModal, { SkillFormData } from "./SkillFormModal";

const CATEGORIES = ["Semua", "Utama", "Frontend", "Backend", "Database", "Tools"];

interface SkillRow {
  id: number;
  name: string;
  icon_key: string;
  background: string;
  color: string;
  category: string;
  is_active: boolean;
  display_order: number;
}

const SkillList = () => {
  const t = useTranslations("HomePage");
  const isAuthor = useIsAuthor();

  const [activeCategory, setActiveCategory] = useState("Semua");
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<SkillRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SkillRow | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showHidden, setShowHidden] = useState(false);

  const { data, isLoading, mutate } = useSWR<SkillRow[]>("/api/skills", fetcher);

  const skills: SkillRow[] = data ?? [];
  const visibleSkills = skills.filter((s) => s.is_active);
  const hiddenSkills = skills.filter((s) => !s.is_active);

  const displaySkills = (isAuthor && showHidden ? skills : visibleSkills).filter(
    (s) => activeCategory === "Semua" || s.category === activeCategory,
  );

  const getCount = (category: string) => {
    const base = isAuthor && showHidden ? skills : visibleSkills;
    if (category === "Semua") return base.length;
    return base.filter((s) => s.category === category).length;
  };

  const resolveIcon = (iconKey: string) => STACKS[iconKey]?.icon ?? STACKS["Github"].icon;
  const resolveColor = (s: SkillRow) => s.color || STACKS[s.icon_key]?.color;
  const resolveBg = (s: SkillRow) => s.background || STACKS[s.icon_key]?.background;

  const handleSubmit = async (formData: SkillFormData) => {
    setIsSubmitting(true);
    try {
      if (editData) {
        await axios.put(`/api/skills/${editData.id}`, formData);
      } else {
        await axios.post("/api/skills", formData);
      }
      await mutate();
      setFormOpen(false);
      setEditData(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (skill: SkillRow) => {
    await axios.put(`/api/skills/${skill.id}`, { is_active: !skill.is_active });
    await mutate();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await axios.delete(`/api/skills/${deleteTarget.id}`);
      await mutate();
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 dark:backdrop-blur-md">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <SectionHeading title={t("skills.title")} icon={<SkillsIcon />} />
          <SectionSubHeading>
            <p>{t("skills.sub_title")}</p>
          </SectionSubHeading>
        </div>
        {isAuthor && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHidden((v) => !v)}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs transition ${showHidden ? "bg-accent/10 text-accent" : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"}`}
              title={showHidden ? "Sembunyikan yang non-aktif" : "Tampilkan semua skill"}
            >
              <HideIcon size={13} />
              {showHidden ? `${hiddenSkills.length} hidden` : "Show all"}
            </button>
            <button
              onClick={() => { setEditData(null); setFormOpen(true); }}
              className="flex items-center gap-1 rounded-lg border border-dashed border-accent px-3 py-1.5 text-xs font-medium text-accent transition hover:bg-accent/5"
            >
              <PlusIcon size={13} />
              Tambah
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 py-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? "bg-[#fbe400] text-[#020617] shadow-lg shadow-[#fbe400]/20"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
            }`}
          >
            {category}
            <span className={`rounded-full px-2 py-0.5 text-[10px] ${
              activeCategory === category
                ? "bg-black/10 text-black/80"
                : "bg-neutral-200 text-neutral-600 dark:bg-slate-700 dark:text-slate-200"
            }`}>
              {getCount(category)}
            </span>
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex flex-wrap gap-3 py-2">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
          ))}
        </div>
      )}

      <motion.div layout className="flex flex-wrap gap-3 py-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <AnimatePresence mode="popLayout">
          {!isLoading && displaySkills.map((skill) => (
            <motion.div
              layout key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className={`group relative ${!skill.is_active ? "opacity-40" : ""}`}
            >
              <SkillTag
                name={skill.name}
                icon={resolveIcon(skill.icon_key)}
                color={resolveColor(skill)}
                background={resolveBg(skill)}
              />
              {isAuthor && (
                <div className="absolute -right-1 -top-1 hidden items-center gap-0.5 group-hover:flex">
                  <button
                    onClick={() => handleToggleActive(skill)}
                    className="rounded-full bg-white p-0.5 shadow dark:bg-neutral-800"
                    title={skill.is_active ? "Sembunyikan" : "Tampilkan"}
                  >
                    <HideIcon size={10} className={skill.is_active ? "text-neutral-400" : "text-accent"} />
                  </button>
                  <button
                    onClick={() => { setEditData(skill); setFormOpen(true); }}
                    className="rounded-full bg-white p-0.5 shadow dark:bg-neutral-800"
                    title="Edit"
                  >
                    <PencilIcon size={10} className="text-neutral-400 hover:text-accent" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(skill)}
                    className="rounded-full bg-white p-0.5 shadow dark:bg-neutral-800"
                    title="Hapus"
                  >
                    <TrashIcon size={10} className="text-neutral-400 hover:text-red-500" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <SkillFormModal
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditData(null); }}
        onSubmit={handleSubmit}
        initialData={editData ? {
          name: editData.name,
          icon_key: editData.icon_key,
          background: editData.background,
          color: editData.color,
          category: editData.category,
          is_active: editData.is_active,
          display_order: editData.display_order,
        } : undefined}
        isLoading={isSubmitting}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        message={`Hapus skill "${deleteTarget?.name}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </section>
  );
};

export default SkillList;
