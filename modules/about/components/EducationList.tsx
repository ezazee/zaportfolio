"use client";

import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { TbSchool as EducationIcon } from "react-icons/tb";
import { useTranslations } from "next-intl";

import { LuPlus as PlusIcon } from "react-icons/lu";
import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import AuthorActions from "@/common/components/elements/AuthorActions";
import ConfirmDialog from "@/common/components/elements/ConfirmDialog";
import { EducationProps } from "@/common/types/education";
import { useIsAuthor } from "@/hooks/useIsAuthor";
import { fetcher } from "@/services/fetcher";

import EducationCard from "./EducationCard";
import EducationFormModal from "./EducationFormModal";

type EducationItem = EducationProps & { id?: number; is_show?: boolean };

const transformRow = (row: any): EducationItem => ({
  id: row.id,
  school: row.school,
  major: { en: row.major_en || "", id: row.major_id || "" },
  logo: row.logo || "",
  location: row.location || "",
  degree: { en: row.degree_en || "", id: row.degree_id || "" },
  start_year: row.start_year,
  end_year: row.end_year,
  link: row.link || "",
  GPA: row.gpa || undefined,
  is_show: row.is_show,
});

const EducationList = () => {
  const t = useTranslations("AboutPage.education");
  const isAuthor = useIsAuthor();

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<EducationItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EducationItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, mutate } = useSWR("/api/education", fetcher);
  const educations: EducationItem[] = data?.map(transformRow).filter((e: EducationItem) => e.is_show !== false) ?? [];

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const payload = {
        school: formData.school,
        major_en: formData.major_en,
        major_id: formData.major_id,
        logo: formData.logo || null,
        location: formData.location,
        degree_en: formData.degree_en,
        degree_id: formData.degree_id,
        start_year: formData.start_year,
        end_year: formData.end_year,
        link: formData.link || null,
        gpa: formData.gpa || null,
        is_show: formData.is_show,
        display_order: formData.display_order || 0,
      };
      if (editData?.id) {
        await axios.put(`/api/education/${editData.id}`, payload);
      } else {
        await axios.post("/api/education", payload);
      }
      await mutate();
      setFormOpen(false);
      setEditData(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    setIsDeleting(true);
    try {
      await axios.delete(`/api/education/${deleteTarget.id}`);
      await mutate();
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const openEdit = (edu: EducationItem) => {
    setEditData(edu);
    setFormOpen(true);
  };

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <SectionHeading title={t("title")} icon={<EducationIcon />} />
        <SectionSubHeading>
          <p>{t("sub_title")}</p>
        </SectionSubHeading>
      </div>

      {isAuthor && (
        <button
          onClick={() => { setEditData(null); setFormOpen(true); }}
          className="flex items-center gap-2 rounded-xl border border-dashed border-accent px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/5"
        >
          <PlusIcon size={16} />
          Tambah Pendidikan
        </button>
      )}

      <div className="grid grid-cols-1 gap-4">
        {educations.map((item, index) => (
          <AuthorActions
            key={item.id ?? index}
            onEdit={() => openEdit(item)}
            onDelete={item.id ? () => setDeleteTarget(item) : undefined}
          >
            <EducationCard {...item} />
          </AuthorActions>
        ))}
      </div>

      <EducationFormModal
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditData(null); }}
        onSubmit={handleSubmit}
        initialData={editData ? {
          school: editData.school,
          major_en: editData.major.en,
          major_id: editData.major.id,
          logo: editData.logo || "",
          location: editData.location || "",
          degree_en: editData.degree.en,
          degree_id: editData.degree.id,
          start_year: editData.start_year,
          end_year: typeof editData.end_year === "object"
            ? (editData.end_year as any).en
            : String(editData.end_year),
          link: editData.link || "",
          gpa: editData.GPA || "",
          is_show: editData.is_show ?? true,
          display_order: 0,
        } : undefined}
        isLoading={isSubmitting}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        message={`Hapus pendidikan "${deleteTarget?.school}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </section>
  );
};

export default EducationList;
