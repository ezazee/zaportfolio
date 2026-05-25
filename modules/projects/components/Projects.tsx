"use client";

import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { LuPlus as PlusIcon } from "react-icons/lu";
import { ProjectItem } from "@/common/types/projects";
import { fetcher } from "@/services/fetcher";
import { useIsAuthor } from "@/hooks/useIsAuthor";

import EmptyState from "@/common/components/elements/EmptyState";
import AuthorActions from "@/common/components/elements/AuthorActions";
import ConfirmDialog from "@/common/components/elements/ConfirmDialog";
import ProjectCard from "./ProjectCard";
import ProjectSkeleton from "./ProjectSkeleton";
import ProjectFormModal from "./ProjectFormModal";
import FilterHeader from "./FilterHeader";

const Projects = () => {
  const t = useTranslations("ProjectsPage");
  const locale = useLocale();
  const params = useSearchParams();
  const isAuthor = useIsAuthor();

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<ProjectItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProjectItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const type = params.get("type") || "Semua";
  const search = params.get("search");

  const queryParams = new URLSearchParams();
  if (type !== "Semua") queryParams.set("type", type);
  if (search) queryParams.set("search", search);

  const apiUrl = `/api/projects${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

  const { data, isLoading, error, mutate } = useSWR(apiUrl, fetcher);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        stacks: typeof formData.stacks === "string"
          ? formData.stacks.split(",").map((s: string) => s.trim()).filter(Boolean)
          : formData.stacks,
      };
      if (editData) {
        await axios.put(`/api/projects/${editData.slug}`, payload);
      } else {
        await axios.post("/api/projects", payload);
      }
      await mutate();
      setFormOpen(false);
      setEditData(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await axios.delete(`/api/projects/${deleteTarget.slug}`);
      await mutate();
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const openEdit = (item: ProjectItem) => {
    setEditData(item);
    setFormOpen(true);
  };

  const filteredProjects: ProjectItem[] = data || [];

  return (
    <section className="space-y-6">
      <FilterHeader />

      {isAuthor && (
        <button
          onClick={() => { setEditData(null); setFormOpen(true); }}
          className="flex items-center gap-2 rounded-xl border border-dashed border-accent px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/5"
        >
          <PlusIcon size={16} />
          Tambah Project
        </button>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      )}

      {error && <EmptyState message={t("error")} />}

      {filteredProjects?.length === 0 && !isLoading && (
        <EmptyState message={t("no_data")} />
      )}

      {!isLoading && !error && filteredProjects?.length !== 0 && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2">
          {filteredProjects?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AuthorActions
                onEdit={() => openEdit(item)}
                onDelete={() => setDeleteTarget(item)}
              >
                <ProjectCard {...item} />
              </AuthorActions>
            </motion.div>
          ))}
        </div>
      )}

      <ProjectFormModal
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditData(null); }}
        onSubmit={handleSubmit}
        initialData={editData ? {
          title: editData.title,
          slug: editData.slug,
          description_en: editData.description.en,
          description_id: editData.description.id,
          image: editData.image,
          link_demo: editData.link_demo ?? undefined,
          link_github: editData.link_github ?? undefined,
          stacks: Array.isArray(editData.stacks) ? editData.stacks.join(", ") : editData.stacks,
          category: editData.category,
          type: editData.type,
          is_show: editData.is_show,
          is_featured: editData.is_featured,
        } : undefined}
        isLoading={isSubmitting}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        message={`Hapus project "${deleteTarget?.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </section>
  );
};

export default Projects;
