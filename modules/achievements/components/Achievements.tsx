"use client";

import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { LuPlus as PlusIcon } from "react-icons/lu";
import { AchievementItem } from "@/common/types/achievements";
import { fetcher } from "@/services/fetcher";
import { useIsAuthor } from "@/hooks/useIsAuthor";

import EmptyState from "@/common/components/elements/EmptyState";
import AuthorActions from "@/common/components/elements/AuthorActions";
import ConfirmDialog from "@/common/components/elements/ConfirmDialog";
import AchievementCard from "./AchievementCard";
import AchievementSkeleton from "./AchievementSkeleton";
import AchievementFormModal from "./AchievementFormModal";
import FilterHeader from "./FilterHeader";

const Achievements = () => {
  const t = useTranslations("AchievementsPage");
  const locale = useLocale();
  const params = useSearchParams();
  const isAuthor = useIsAuthor();

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<AchievementItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AchievementItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const type = params.get("type");
  const category = params.get("category");
  const search = params.get("search");

  const { data: categoriesData } = useSWR(
    `/api/achievements/categories?locale=${locale}`,
    fetcher,
  );
  const { data: typesData } = useSWR(
    `/api/achievements/types?locale=${locale}`,
    fetcher,
  );

  const queryParams = new URLSearchParams();
  if (category) queryParams.append("category", category);
  if (type) queryParams.append("type", type);
  if (search) queryParams.append("search", search);

  const apiUrl = `/api/achievements${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

  const { data, isLoading, error, mutate } = useSWR(apiUrl, fetcher);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      if (editData) {
        await axios.put(`/api/achievements/${editData.id}`, formData);
      } else {
        await axios.post("/api/achievements", formData);
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
      await axios.delete(`/api/achievements/${deleteTarget.id}`);
      await mutate();
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const openEdit = (item: AchievementItem) => {
    setEditData(item);
    setFormOpen(true);
  };

  const filteredAchievements: AchievementItem[] = data
    ?.filter((item: AchievementItem) => {
      const matchesShow = item?.is_show;

      const matchesCategory =
        !category ||
        item?.category.en === category ||
        item?.category.id === category;

      const matchesType =
        !type || item?.type.en === type || item?.type.id === type;

      return matchesShow && matchesType && matchesCategory;
    })
    .sort(
      (a: AchievementItem, b: AchievementItem) =>
        new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime()
    );

  return (
    <section className="space-y-4">
      <FilterHeader
        categoryOptions={categoriesData}
        typeOptions={typesData}
        totalData={filteredAchievements?.length || 0}
      />

      {isAuthor && (
        <button
          onClick={() => { setEditData(null); setFormOpen(true); }}
          className="flex items-center gap-2 rounded-xl border border-dashed border-accent px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/5"
        >
          <PlusIcon size={16} />
          Tambah Achievement
        </button>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <AchievementSkeleton key={i} />
          ))}
        </div>
      )}

      {error && <EmptyState message={t("error")} />}

      {filteredAchievements?.length === 0 && (
        <EmptyState message={t("no_data")} />
      )}

      {!isLoading && !error && filteredAchievements?.length !== 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAchievements?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <AuthorActions
                onEdit={() => openEdit(item)}
                onDelete={() => setDeleteTarget(item)}
              >
                <AchievementCard {...item} />
              </AuthorActions>
            </motion.div>
          ))}
        </div>
      )}

      <AchievementFormModal
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditData(null); }}
        onSubmit={handleSubmit}
        initialData={editData ? {
          name_en: editData.name.en,
          name_id: editData.name.id,
          issuing_organization_en: editData.issuing_organization.en,
          issuing_organization_id: editData.issuing_organization.id,
          credential_id: editData.credential_id,
          type_en: editData.type.en,
          type_id: editData.type.id,
          category_en: editData.category.en,
          category_id: editData.category.id,
          url_credential: editData.url_credential,
          issue_date: editData.issue_date,
          image: editData.image,
          is_show: editData.is_show,
        } : undefined}
        isLoading={isSubmitting}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        message={`Hapus achievement "${deleteTarget?.name.en}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </section>
  );
};

export default Achievements;
